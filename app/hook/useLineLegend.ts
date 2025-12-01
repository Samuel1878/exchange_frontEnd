import React, { useCallback, useRef, useState } from "react";

import type {
  ISeriesApi,
  LineData,
  MouseEventParams,
  Time,
  UTCTimestamp,
  WhitespaceData,
} from "lightweight-charts";
export type LineLegend = {
  value?: string;
  time: UTCTimestamp | string;
  color?: string;
};

export type MultiLegend = Record<string, LineLegend | null>;

const isLineData = (
  d: LineData<Time> | WhitespaceData<Time>
): d is LineData<Time> => {
  return (
    (d as LineData<Time>).value !== undefined && (d as any).time !== undefined
  );
};

export const useMultiLegend = (
  showLegend: boolean,
  seriesItems: Array<{ key: string; ref: React.RefObject<any> }>
) => {
  const [legend, setLegend] = useState<MultiLegend>({});
  const legendRef = useRef({});
  const [, forceUpdate] = useState(0);
  let frame = 0;

  // const updateLegend = (next) => {
  //   legendRef.current = next;
  //   cancelAnimationFrame(frame);
  //   frame = requestAnimationFrame(() => forceUpdate((x) => x + 1));
  // };

  const getSeriesApiFromRef = (
    ref: React.RefObject<any>
  ): ISeriesApi<"Line"> | null => {
    if (!ref || !ref.current) return null;
    try {
      const maybeApi =
        typeof ref.current.api === "function" ? ref.current.api() : ref.current;
      return maybeApi ?? null;
    } catch {
      return null;
    }
  };

  const getLast = (ref: React.RefObject<any>): LineLegend | null => {
    const api = getSeriesApiFromRef(ref);
    if (!api) return null;
    const d = api.dataByIndex(Number.MAX_SAFE_INTEGER, -1);
    if (!d || !isLineData(d)) return null;
    return {
      value: Number(d.value).toFixed(6),
      time: d.time as UTCTimestamp,
      color: (api.options && (api.options() as any).color) || undefined,
    };
  };

  const onCrosshairMoveMulti = useCallback(
    (p: MouseEventParams) => {
      if (!showLegend) return;

      setLegend((prev) => {
        const next: MultiLegend = { ...prev };

        seriesItems.forEach(({ key, ref }) => {
          const api = getSeriesApiFromRef(ref);
          if (!api) {
            next[key] = null;
            return;
          }

          if (!p?.time) {
            next[key] = getLast(ref);
            return;
          }

          const seriesPoint = p.seriesData.get(api);
          if (!seriesPoint || !isLineData(seriesPoint)) {
            next[key] = null;
            return;
          }

          next[key] = {
            value: Number(seriesPoint.value).toFixed(6),
            time: seriesPoint.time as UTCTimestamp,
            color: (api.options && (api.options() as any).color) || undefined,
          };
        });

        return next;
      });
    },
    [showLegend, seriesItems]
  );

  return { legend, onCrosshairMoveMulti, getSeriesApiFromRef };
};


