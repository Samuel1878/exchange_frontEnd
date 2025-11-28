import dayjs from "dayjs";
import { useCallback, useRef, useState } from "react";
import type { SeriesApiRef } from "lightweight-charts-react-components";
import type { CandlestickData } from "lightweight-charts";
import type {
  ISeriesApi,
  MouseEventParams,
  Time,
  WhitespaceData,
} from "lightweight-charts";
import { downColor, upColor } from "~/utils/helpers";
import moment from "moment";
import { useKlineStore } from "~/store/useKlineStore";

type LegendData = {
  open?: string;
  high?: string;
  low?: string;
  close?: string;
  time: string;
  color?: string;
  change?: string;
};

// const seriesData = generateOHLCData(40);

const isCandlestickData = (
  data: CandlestickData<Time> | WhitespaceData<Time>
): data is CandlestickData<Time> => {
  return "close" in data && "open" in data && "high" in data && "low" in data;
};

const timeToString = (time: Time): string => {
  if (typeof time === "number") {
    return dayjs(time * 1000).format("YYYY-MM-DD");
  }

  if (typeof time === "object") {
    const date = new Date(time.year, time.month - 1, time.day);
    return dayjs(date).format("YYYY-MM-DD");
  }

  return time;
};

const mapCandlestickDataToLegendData = ({
  open,
  high,
  low,
  close,
  time,
}: CandlestickData): LegendData => {
  const decreased = open > close;
  const sign = decreased ? "-" : "+";
  const difference = Math.abs(close - open);

  return {
    open: open.toFixed(1),
    high: high.toFixed(1),
    low: low.toFixed(1),
    close: close.toFixed(1),
    time: moment(time).format("YYYY/MM/DD hh:mm"),
    color: decreased ? downColor : upColor,
    change: `${sign}${difference.toFixed(1)} (${sign}${((difference / open) * 100).toFixed(2)}%)`,
  };
};

const getLastBarLegendData = (
  s: ISeriesApi<"Candlestick">
): LegendData | null => {
  const data = s.dataByIndex(Number.MAX_SAFE_INTEGER, -1);

  if (!data) {
    return null;
  }

  if (!isCandlestickData(data)) {
    return null;
  }

  return mapCandlestickDataToLegendData(data);
};

const useLegend = (showLegend: boolean) => {
    const { candles} = useKlineStore()
  const ref = useRef<SeriesApiRef<"Candlestick">>(null);
  const [legendData, setLegendData] = useState<LegendData | null>(() =>
   candles?.length && mapCandlestickDataToLegendData(candles[candles.length - 1])
  );

  const onCrosshairMove = useCallback(
    (param: MouseEventParams) => {
      if (!showLegend) {
        return;
      }

      if (!ref.current) {
        return;
      }

      const seriesApi = ref.current.api();
      if (!seriesApi) {
        return;
      }

      if (!param) {
        return;
      }

      if (!param.time) {
        const lastBarData = getLastBarLegendData(seriesApi);
        setLegendData((prev) =>
          prev?.time !== lastBarData?.time ? lastBarData : prev
        );
        return;
      }

      const data = param.seriesData.get(seriesApi) as
        | CandlestickData<Time>
        | WhitespaceData<Time>;

      if (!isCandlestickData(data)) {
        setLegendData(null);
        return;
      }

      const newLegendData = mapCandlestickDataToLegendData(data);
      setLegendData((prev) =>
        prev?.time !== newLegendData.time ? newLegendData : prev
      );
    },
    [setLegendData, showLegend]
  );

  return {
    ref,
    legendData,
    onCrosshairMove,
  };
};

export { useLegend };
