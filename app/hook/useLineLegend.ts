import { useCallback, useState } from "react";
import dayjs from "dayjs";
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
  time: UTCTimestamp;
  color?: string;
};

export type MultiLegend = Record<string, LineLegend | null>;

const isLineData = (
  d: LineData<Time> | WhitespaceData<Time>
): d is LineData<Time> => {
  return "value" in d;
};

const timeToString = (t: Time) => {
  if (typeof t === "number") return dayjs(t * 1000).format("YY/MM/DD HH:mm");
  return t.toString();
};

export const useMultiLegend = (
  showLegend: boolean,
  seriesItems: Array<{ id: string; ref: React.RefObject<ISeriesApi<"Line">> }>
) => {
  const [legend, setLegend] = useState<MultiLegend>({});

  const getLast = (api: ISeriesApi<"Line">): LineLegend | null => {
    const d = api.dataByIndex(Number.MAX_SAFE_INTEGER, -1);
    if (!d || !isLineData(d)) return null;
    return {
      value: d.value.toFixed(6),
      time: d.time as UTCTimestamp,
      color: api.options().color,
    };
  };

  const onCrosshairMoveMulti = useCallback(
    (p: MouseEventParams) => {
      if (!showLegend) return;

      setLegend((prev) => {
        const next = { ...prev };

        seriesItems.forEach(({ id, ref }) => {
          const api = ref.current;
          if (!api) return;

          // No crosshair time → fallback to last
          if (!p?.time) {
            next[id] = getLast(api);
            return;
          }

          const point = p.seriesData.get(api);

          if (!point || !isLineData(point)) {
            next[id] = null;
            return;
          }

          next[id] = {
            value: point.value.toFixed(6),
            time: point.time as UTCTimestamp,
            color: api.options().color,
          };
        });

        return next;
      });
    },
    [showLegend, seriesItems]
  );

  return { legend, onCrosshairMoveMulti };
};

// import type { ISeriesApi, LineData, MouseEventParams, SeriesType, Time, WhitespaceData } from "lightweight-charts";
// import type { SeriesApiRef } from "lightweight-charts-react-components";
// import { useCallback, useRef, useState, type RefObject } from "react";
// import { useCompareSeriesStore } from "~/store/useCompareSeriesStore";
// import { useKlineStore, type CompareSeriesMap, type CompareSeriesType } from "~/store/useKlineStore";
// type LegendData = {
//   MA1: LineData;
//   MA2: LineData;
//   MA3: LineData;
//   EMA1: LineData;
//   EMA2: LineData;
//   EMA3: LineData;
// };
// const isCandlestickData = (
//   data: LineData<Time> | WhitespaceData<Time>
// ): data is LineData<Time> => {
//   return "value" in data ;
// };
// const mapIndicatorDataToLegendData = (
//  indicators: CompareSeriesMap<CompareSeriesType, SeriesType>
// ): LegendData => {
//   return {
//     MA1: {
//       value: indicators.MA1.data?.at(-1).value ?? null,
//       time: indicators.MA1.data?.at(-1).time ?? null,
//     },
//     MA2: {
//       value: indicators.MA2.data?.at(-1).value ?? null,
//       time: indicators.MA2.data?.at(-1).time ?? null,
//     },
//     MA3: {
//       value: indicators.MA3.data?.at(-1).value ?? null,
//       time: indicators.MA3.data?.at(-1).time ?? null,
//     },
//     EMA1: {
//       value: indicators.EMA1.data?.at(-1).value ?? null,
//       time: indicators.EMA1.data?.at(-1).time ?? null,
//     },
//     EMA2: {
//       value: indicators.EMA2.data?.at(-1).value ?? null,
//       time: indicators.EMA2.data?.at(-1).time ?? null,
//     },
//     EMA3: {
//       value: indicators.EMA3.data?.at(-1).value ?? null,
//       time: indicators.EMA3.data?.at(-1).time ?? null,
//     },
//   };
// };
// const mapLineDataToLegendData = (data: LineData): LegendData => {
//   return {
//     MA1:{
//         value:data.value
//     }
//   }
// };
// const getLastBarLegendData = (
//   s: ISeriesApi<"Line">
// ): LegendData | null => {
//   const data = s.dataByIndex(Number.MAX_SAFE_INTEGER, -1);

//   if (!data) {
//     return null;
//   }

//   if (!isCandlestickData(data)) {
//     return null;
//   }

//   return mapLineDataToLegendData(data);
// };
// const useLegend = (showLegend: boolean) => {
//     const { indicators} = useKlineStore();
//     const {visibleSeries} = useCompareSeriesStore()
//   const ref =  Array<RefObject<SeriesApiRef<"Line"> | null>>;
//   const [legendData, setLegendData] = useState<LegendData | null>(
//     () => visibleSeries?.length && mapIndicatorDataToLegendData(indicators)
//   );

//   const onCrosshairMove = useCallback(
//     (param: MouseEventParams) => {
//       if (!showLegend) {
//         return;
//       }
//       for (let index = 0; index < ref.length; index++) {
//         const element = ref[index];
//         element.current.
//          if (!element.current) {
//            return;
//          }
//          const seriesApi = element.current.api();
//          if (!seriesApi) {
//            return;
//          }

//          if (!param) {
//            return;
//          }
//           if (!param.time) {
//             const lastBarData = getLastBarLegendData(seriesApi);
//             setLegendData((prev) =>
//               prev?.time !== lastBarData?.time ? lastBarData : prev
//             );
//             return;
//           }

//       }

//       const data = param.seriesData.get(seriesApi) as
//         | CandlestickData<Time>
//         | WhitespaceData<Time>;

//       if (!isCandlestickData(data)) {
//         setLegendData(null);
//         return;
//       }

//       const newLegendData = mapCandlestickDataToLegendData(data);
//       setLegendData((prev) =>
//         prev?.time !== newLegendData.time ? newLegendData : prev
//       );
//     },
//     [setLegendData, showLegend]
//   );

//   return {
//     ref,
//     legendData,
//     onCrosshairMove,
//   };
// };

// export { useLegend };
