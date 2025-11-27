import { useCallback, useRef, useState } from "react";
import { getTooltipPosition, type TooltipOptions } from "./tooltipHook";
// import { useSize } from "@/common/useSize";
import type { SeriesApiRef } from "lightweight-charts-react-components";
import type {
    CandlestickData,
  MouseEventHandler,
  MouseEventParams,
  Time,
} from "lightweight-charts";
import type { RefObject } from "react";
import { useSize } from "./useSize";

type BasicTooltipData = {
  show: boolean;
  low: string;
  close:string;
  high:string;
  open:string;
  time?: string;
//   position: {
//     x: number | null;
//     y: number | null;
//   };
};

const getShowTooltip = (param: MouseEventParams) => {
  return (
    param.time !== undefined &&
    param.point !== undefined &&
    param.point?.x > 0 &&
    param.point?.y > 0
  );
};

const useBasicTooltip = (
  containerRef: RefObject<HTMLElement | null>,
  options: TooltipOptions
) => {
  const seriesRef = useRef<SeriesApiRef<"Candlestick">>(null);
  const size = useSize(containerRef);
  const containerWidth = size?.width;
  const containerHeight = size?.height;
  const emptyTooltipData: BasicTooltipData = {
    show: false,
    high: "-",
    low:"-",
    close:"-",
    open:"-",
    // position: {
    //   x: null,
    //   y: null,
    // },
  };
  const [tooltipData, setTooltipData] =
    useState<BasicTooltipData>(emptyTooltipData);

  const onCrosshairMove: MouseEventHandler<Time> = useCallback(
    (param) => {
      if (!seriesRef.current || !containerWidth || !containerHeight) {
        return;
      }
      if (!getShowTooltip(param)) {
        setTooltipData(emptyTooltipData);
        return;
      }
      const seriesApi = seriesRef.current.api();
      if (!seriesApi) {
        setTooltipData(emptyTooltipData);
        return;
      }
      const data = param.seriesData.get(seriesApi) as CandlestickData | undefined;
      if (!data) {
        setTooltipData(emptyTooltipData);
        return;
      }
      const close = data.close !== undefined ? data.close.toFixed(2) : "-";
      const high = data.high !== undefined ? data.high.toFixed(2) : "-";
      const low = data.low !== undefined ? data.low.toFixed(2) : "-";
      const open = data.high !== undefined ? data.open.toFixed(2) : "-";
      const time = param.time as string;
      setTooltipData((prev) =>
        prev.time !== time
          ? {
              show: true,
              close,
              high,
              low,
              open,
              time

            }
          : prev
      );
    },
    [containerWidth, containerHeight, options]
  );

  return {
    onCrosshairMove,
    tooltipData,
    seriesRef,
  };
};


export { useBasicTooltip };
            //   position: getTooltipPosition(
            //     param,
            //     containerWidth,
            //     containerHeight,
            //     "anchor",
            //     options
            //   ),