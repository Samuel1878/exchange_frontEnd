import dayjs from "dayjs";
import type { TimeFormatterFn } from "lightweight-charts";
type DataRange = "1s" | "15m" | "1h" | "4h" | "1d" | "1w";
export const priceFormatter = (value) => {
  if (!value) {
    return "0.0000";
  }
  const result = Math.round(value * 100) / 100 + "";
  // Adding padding 0 if needed
  let dotIndex = result.indexOf(".");
  if (dotIndex < 0) {
    return result + ".00";
  } else if (dotIndex === result.length - 2) {
    return result + "0";
  }
  return result;
};
export const formatPrice = (arg: number): string => {
  if (!arg) {
    return "0.0000";
  }
  return arg.toLocaleString("en", {
    useGrouping: true,
    minimumFractionDigits: 2,
    maximumFractionDigits:7
  });
};

export const dataRangeMap: Record<
  DataRange,
  {
    formatter: TimeFormatterFn<string>;
  }
> = {
  "1s": {
    formatter: (t) => dayjs(t).format("YYYY-MM-DD hh:mm:ss"),
  },
  "15m": {
    formatter: (t) => dayjs(t).format("YYYY-MM-DD hh:mm"),
  },
  "1h": {
    formatter: (t) => dayjs(t).format("YYYY-MM-DD hh"),
  },
  "4h":{
   formatter: (t) => dayjs(t).format("YYYY-MM-DD hh"),
  },
  "1d": {
    formatter: (t) => dayjs(t).format("YYYY-MM-DD"),
  },
  "1w": {
    formatter: (t) => {
      const dateObj = dayjs(t);
      return `${dateObj.format("YYYY-MM-DD")}`;
    },
  },
} as const;
