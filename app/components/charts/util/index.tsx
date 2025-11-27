import dayjs from "dayjs";
import type { TimeFormatterFn } from "lightweight-charts";
type DataRange = "1s" | "15m" | "1h" | "4h" | "1d" |
 "1w" | "1m" | "3m" | "5m" | "30m" | "2h" | "6h"| "8h" 
 | "12h" | "3d" | "1M";
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
    maximumFractionDigits: 7,
  });
};
export const localizationFormater :  Record<
"locale",
  {
    formatter: TimeFormatterFn<string>;
  }
> = {
  "locale":{
    formatter:(t)=>dayjs(t).format("YYYY/MMM/DD hh:mm:ss")
  }
}
export const dataRangeMap: Record<
  DataRange,
  {
    formatter: TimeFormatterFn<string>;
  }
> = {
  "1s": {
    formatter: (t) => dayjs(t).format("hh:mm:ss"),
  },
  "1m": {
    formatter: (t) => dayjs(t).format("hh:mm"),
  },
  "3m": {
    formatter: (t) => dayjs(t).format("hh:mm"),
  },
  "5m": {
    formatter: (t) => dayjs(t).format("hh:mm"),
  },
  "15m": {
    formatter: (t) => dayjs(t).format("hh:mm"),
  },
  "30m": {
    formatter: (t) => dayjs(t).format("DD hh:mm"),
  },
  "1h": {
    formatter: (t) => dayjs(t).format("MM/DD hh"),
  },
  "2h": {
    formatter: (t) => dayjs(t).format("MM/DD hh:mm"),
  },
  "4h": {
    formatter: (t) => dayjs(t).format("MM/DD hh"),
  },
  "6h": {
    formatter: (t) => dayjs(t).format("MM/DD hh:mm"),
  },
  "8h": {
    formatter: (t) => dayjs(t).format("MM/DD hh:mm"),
  },
  "12h": {
    formatter: (t) => dayjs(t).format("YY/MM/DD hh:mm"),
  },
  "1d": {
    formatter: (t) => dayjs(t).format("YYYY/MM/DD"),
  },
  "1w": {
    formatter: (t) => {
      const dateObj = dayjs(t);
      return `${dateObj.format("YYYY/MM/DD")}`;
    },
  },
  "3d": {
    formatter: (t) => {
      const dateObj = dayjs(t);
      return `${dateObj.format("YYYY/MM/DD")}`;
    },
  },
  "1M": {
    formatter: (t) => {
      const dateObj = dayjs(t);
      return `${dateObj.format("YYYY/MM")}`;
    },
  },
} as const;
