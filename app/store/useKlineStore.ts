import type {
  CandlestickData,
  HistogramData,
  UTCTimestamp,
  LineData,
} from "lightweight-charts";
import moment from "moment";
import {
  LineSeries,
  type SeriesProps,
} from "lightweight-charts-react-components";
import type { SeriesType } from "lightweight-charts";
import { type ComponentType } from "react";
import { create } from "zustand";
import {
  calcEMA,
  calcMA,
  computeIncrementalEMA,
} from "~/utils/indicators";
export const upColor = "#00c951";
export const downColor = "#fb2c36";
export type CompareSeriesType = "MA1" | "MA2" | "MA3" | "EMA1" | "EMA2" | "EMA3";
export type CompareSeriesMap<T extends CompareSeriesType, P extends SeriesType> = {
  [key in T]: {
    Component: ComponentType<SeriesProps<P> | any>;
    data: LineData[];
    options?: SeriesProps<P>["options"];
  };
};
export interface BinanceKlineStream {
  e: string; // Event type
  E: number; // Event time
  s: string; // Symbol
  k: {
    t: number; // Kline start time
    T: number; // Kline close time
    s: string; // Symbol
    i: string; // Interval
    f: number; // First trade ID
    L: number; // Last trade ID
    o: string; // Open price
    c: string; // Close price
    h: string; // High price
    l: string; // Low price
    v: string; // Base asset volume
    n: number; // Number of trades
    x: boolean; // Is this kline closed?
    q: string; // Quote asset volume
    V: string; // Taker buy base asset volume
    Q: string; // Taker buy quote asset volume
    B: string; // Ignore
  };
}
export type BinanceUiKline = [
  number, // Kline open time
  string, // Open price
  string, // High price
  string, // Low price
  string, // Close price
  string, // Volume
  number, // Kline close time
  string, // Quote asset volume
  number, // Number of trades
  string, // Taker buy base asset volume
  string, // Taker buy quote asset volume
  string, // Unused field. Ignore.
];
interface KlineState {
  candles: CandlestickData[];
  histogram: HistogramData[];
  indicators: CompareSeriesMap<CompareSeriesType, SeriesType>;
  applySnapShot: (key: string, list: BinanceUiKline) => void;
  applyStream: (key: string, data: BinanceKlineStream) => void;
  reset: () => void;
}
export const useKlineStore = create<KlineState>((set, get) => {
  return {
    candles: [],
    histogram: [],
    indicators: {
      MA1: {
        data: [],
        Component: LineSeries,
        options: {
          color: "#fcba03",
          priceLineVisible: false,
          lineWidth: 1,
          crosshairMarkerVisible: false,

          lastValueVisible: false,
        },
      },
      MA2: {
        data: [],
        Component: LineSeries,
        options: {
          color: "#ba03fc",
          priceLineVisible: false,
          lineWidth: 1,
          crosshairMarkerVisible: false,
          lastValueVisible: false,
        },
      },
      MA3: {
        data: [],
        Component: LineSeries,
        options: {
          color: "#5203fc",
          priceLineVisible: false,
          lineWidth: 1,
          crosshairMarkerVisible: false,
          lastValueVisible: false,
        },
      },
      EMA1: {
        data: [],
        Component: LineSeries,
        options: {
          color: "#039dfc",
          priceLineVisible: false,

          lineWidth: 1,
          crosshairMarkerVisible: false,
          lastValueVisible: false,
        },
      },
      EMA2: {
        data: [],
        Component: LineSeries,
        options: {
          color: "#fc6b03",
          priceLineVisible: false,
          lineWidth: 1,
          crosshairMarkerVisible: false,
          lastValueVisible: false,
        },
      },
      EMA3: {
        data: [],
        Component: LineSeries,
        options: {
          color: "#fc0362",
          priceLineVisible: false,
          lineWidth: 1,
          crosshairMarkerVisible: false,
          lastValueVisible: false,
        },
      },
    },
    applySnapShot: async (key, data) => {
      // const data = await list;
      let candles: CandlestickData[] = [];
      let histogram: HistogramData[] = [];
      for (const e of data) {
        candles.push({
          time: e[0] as UTCTimestamp,
          open: Number(e[1]),
          high: Number(e[2]),
          low: Number(e[3]),
          close: Number(e[4]),
        });
        histogram.push({
          value: Number(e[5]),
          time: e[0] as UTCTimestamp,
          color: Number(e[4]) > Number(e[1]) ? upColor : downColor,
        });
      }
      const MA1 = calcMA(candles, 7);
      const MA2 = calcMA(candles, 25);
      const MA3 = calcMA(candles, 99);

      const EMA1 = calcEMA(candles, 9);
      const EMA2 = calcEMA(candles, 21);
      const EMA3 = calcEMA(candles, 55);

      set({
        candles,
        histogram,
        indicators: {
          MA1: { ...get().indicators.MA1, data: MA1 },
          MA2: { ...get().indicators.MA2, data: MA2 },
          MA3: { ...get().indicators.MA3, data: MA3 },
          EMA1: { ...get().indicators.EMA1, data: EMA1 },
          EMA2: { ...get().indicators.EMA2, data: EMA2 },
          EMA3: { ...get().indicators.EMA3, data: EMA3 },
        },
      });
    },
    applyStream: (key, data) => {
      const { candles, histogram, indicators } = get();
      const k = data.k;
      const t = k.t as UTCTimestamp;
      const close = Number(k.c);
      const last = candles.at(-1);
      const lastHis = histogram.at(-1);

      if (k.x && (!last || last.time !== t)) {
        /////PUSH NEW STREAM
        candles.push({
          time: t,
          open: Number(k?.o),
          high: Number(k?.h),
          low: Number(k?.l),
          close: Number(k?.c),
        });
        histogram.push({
          value: Number(k.v),
          time: t,
          color: close > Number(k?.o) ? upColor : downColor,
        });
        // ---- INDICATORS: append FINAL values ----
        // ---- MA incremental ----
        const take = (period: number) =>
          candles.length < period
            ? close
            : candles.slice(-period).reduce((a, c) => a + c.close, 0) / period;

        indicators.MA1.data.push({ time: t, value: take(7) });
        indicators.MA2.data.push({ time: t, value: take(25) });
        indicators.MA3.data.push({ time: t, value: take(99) });

        // ---- EMA incremental ----
        const EMA = (key: CompareSeriesType, period: number) => {
          const prev = indicators[key].data.at(-1)?.value ?? close;
          return computeIncrementalEMA(prev, close, period);
        };

        indicators.EMA1.data.push({ time: t, value: EMA("EMA1", 9) });
        indicators.EMA2.data.push({ time: t, value: EMA("EMA2", 21) });
        indicators.EMA3.data.push({ time: t, value: EMA("EMA3", 55) });

        set({ candles, histogram, indicators });
        return;
      }
      if (last && last.time === t) {
        //////UPDATING ON LIVE
        last.high = Number(k.h);
        last.low = Number(k.l);
        last.close = Number(k.c);
        last.open = Number(k.o);
        lastHis.color = Number(k?.c) > Number(k?.o) ? upColor : downColor;
        lastHis.time = t;
        lastHis.value = Number(k.v);

        const recalcMA = (period: number) =>
          candles.length < period
            ? close
            : candles.slice(-period).reduce((a, c) => a + c.close, 0) / period;

        indicators.MA1.data[indicators.MA1.data.length - 1] = {
          time: t,
          value: recalcMA(7),
        };

        indicators.MA2.data[indicators.MA2.data.length - 1] = {
          time: t,
          value: recalcMA(25),
        };

        indicators.MA3.data[indicators.MA3.data.length - 1] = {
          time: t,
          value: recalcMA(99),
        };

        const recalcEMA = (key: CompareSeriesType, period: number) => {
          const prev = indicators[key].data.at(-2)?.value ?? close;
          return computeIncrementalEMA(prev, close, period);
        };

        indicators.EMA1.data[indicators.EMA1.data.length - 1] = {
          time: t,
          value: recalcEMA("EMA1", 9),
        };

        indicators.EMA2.data[indicators.EMA2.data.length - 1] = {
          time: t,
          value: recalcEMA("EMA2", 21),
        };

        indicators.EMA3.data[indicators.EMA3.data.length - 1] = {
          time: t,
          value: recalcEMA("EMA3", 55),
        };

        set({ candles, histogram, indicators });
      }
    },

    reset: () =>
      set({
        candles: [],
        histogram: [],
        indicators: {
          MA1: { ...get().indicators.MA1, data: [] },
          MA2: { ...get().indicators.MA2, data: [] },
          MA3: { ...get().indicators.MA3, data: [] },
          EMA1: { ...get().indicators.EMA1, data: [] },
          EMA2: { ...get().indicators.EMA2, data: [] },
          EMA3: { ...get().indicators.EMA3, data: [] },
        },
      }),
  };
});
// import type {
//   CandlestickData,
//   HistogramData,
//   UTCTimestamp,
//   LineData,
// } from "lightweight-charts";
// import {
//   LineSeries,
//   type SeriesProps,
// } from "lightweight-charts-react-components";
// import { create } from "zustand";

// import { calcEMA, calcMA, computeIncrementalEMA } from "~/utils/indicators";

// export const upColor = "#00c951";
// export const downColor = "#fb2c36";

// /* -----------------------------------------------------
//    TYPES
// ----------------------------------------------------- */

// type CompareSeriesType = "MA1" | "MA2" | "MA3" | "EMA1" | "EMA2" | "EMA3";

// type CompareSeriesMap<T extends CompareSeriesType> = {
//   [key in T]: {
//     Component: any;
//     data: LineData[];
//     options?: any;
//   };
// };

// export interface BinanceKlineStream {
//   k: {
//     t: number;
//     o: string;
//     c: string;
//     h: string;
//     l: string;
//     v: string;
//     x: boolean;
//   };
// }

// export type BinanceUiKline = [
//   number, // time
//   string,
//   string,
//   string,
//   string,
//   string,
// ];

// /* -----------------------------------------------------
//    STORE
// ----------------------------------------------------- */

// interface KlineState {
//   candles: CandlestickData[];
//   histogram: HistogramData[];
//   indicators: CompareSeriesMap<CompareSeriesType>;

//   applySnapShot: (list: Promise<BinanceUiKline[]>) => void;
//   applyStream: (data: BinanceKlineStream) => void;
//   reset: () => void;
// }

// export const useKlineStore = create<KlineState>((set, get) => ({
//   candles: [],
//   histogram: [],

//   indicators: {
//     MA1: {
//       Component: LineSeries,
//       data: [],
//       options: { color: "#fcba03", priceLineVisible: false, lineWidth: 1 },
//     },
//     MA2: {
//       Component: LineSeries,
//       data: [],
//       options: { color: "#ba03fc", priceLineVisible: false, lineWidth: 1 },
//     },
//     MA3: {
//       Component: LineSeries,
//       data: [],
//       options: { color: "#5203fc", priceLineVisible: false, lineWidth: 1 },
//     },
//     EMA1: {
//       Component: LineSeries,
//       data: [],
//       options: { color: "#039dfc", priceLineVisible: false, lineWidth: 1 },
//     },
//     EMA2: {
//       Component: LineSeries,
//       data: [],
//       options: { color: "#fc6b03", priceLineVisible: false, lineWidth: 1 },
//     },
//     EMA3: {
//       Component: LineSeries,
//       data: [],
//       options: { color: "#fc0362", priceLineVisible: false, lineWidth: 1 },
//     },
//   },

//   /* -----------------------------------------------------
//      APPLY SNAPSHOT (REST DATA)
//   ----------------------------------------------------- */

//   applySnapShot: async (list) => {
//     const raw = await list;

//     const candles: CandlestickData[] = [];
//     const histogram: HistogramData[] = [];

//     for (let e of raw) {
//       const c = {
//         time: e[0] as UTCTimestamp,
//         open: Number(e[1]),
//         high: Number(e[2]),
//         low: Number(e[3]),
//         close: Number(e[4]),
//       };

//       candles.push(c);

//       histogram.push({
//         time: e[0] as UTCTimestamp,
//         value: Number(e[5]),
//         color: c.close >= c.open ? upColor : downColor,
//       });
//     }

//     // Compute all indicator series fresh
//     const MA1 = calcMA(candles, 7);
//     const MA2 = calcMA(candles, 25);
//     const MA3 = calcMA(candles, 99);

//     const EMA1 = calcEMA(candles, 9);
//     const EMA2 = calcEMA(candles, 21);
//     const EMA3 = calcEMA(candles, 55);

//     set({
//       candles,
//       histogram,
//       indicators: {
//         MA1: { ...get().indicators.MA1, data: MA1 },
//         MA2: { ...get().indicators.MA2, data: MA2 },
//         MA3: { ...get().indicators.MA3, data: MA3 },
//         EMA1: { ...get().indicators.EMA1, data: EMA1 },
//         EMA2: { ...get().indicators.EMA2, data: EMA2 },
//         EMA3: { ...get().indicators.EMA3, data: EMA3 },
//       },
//     });
//   },

//   /* -----------------------------------------------------
//      APPLY STREAM (REAL-TIME BINANCE)
//   ----------------------------------------------------- */

//   applyStream: (data) => {
//     const k = data.k;
//     const t = k.t as UTCTimestamp;
//     const close = Number(k.c);

//     const candles = [...get().candles];
//     const histogram = [...get().histogram];
//     const indicators = structuredClone(get().indicators);

//     const last = candles.at(-1);

//     // ----- CASE A: NEW FINAL CANDLE -----
//     if (k.x && (!last || last.time !== t)) {
//       const newCandle = {
//         time: t,
//         open: Number(k.o),
//         high: Number(k.h),
//         low: Number(k.l),
//         close,
//       };

//       candles.push(newCandle);

//       histogram.push({
//         time: t,
//         value: Number(k.v),
//         color: close >= Number(k.o) ? upColor : downColor,
//       });

//       // ---- MA incremental ----
//       const take = (period: number) =>
//         candles.length < period
//           ? null
//           : candles.slice(-period).reduce((a, c) => a + c.close, 0) / period;

//       indicators.MA1.data.push({ time: t, value: take(7) });
//       indicators.MA2.data.push({ time: t, value: take(25) });
//       indicators.MA3.data.push({ time: t, value: take(99) });

//       // ---- EMA incremental ----
//       const EMA = (key: CompareSeriesType, period: number) => {
//         const prev = indicators[key].data.at(-1)?.value ?? close;
//         return computeIncrementalEMA(prev, close, period);
//       };

//       indicators.EMA1.data.push({ time: t, value: EMA("EMA1", 9) });
//       indicators.EMA2.data.push({ time: t, value: EMA("EMA2", 21) });
//       indicators.EMA3.data.push({ time: t, value: EMA("EMA3", 55) });

//       set({ candles, histogram, indicators });
//       return;
//     }

//     // ----- CASE B: LIVE UPDATE SAME INTERVAL -----
//     if (last && last.time === t) {
//       const updated = {
//         ...last,
//         open: Number(k.o),
//         high: Number(k.h),
//         low: Number(k.l),
//         close,
//       };

//       candles[candles.length - 1] = updated;

//       histogram[histogram.length - 1] = {
//         time: t,
//         value: Number(k.v),
//         color: close >= Number(k.o) ? upColor : downColor,
//       };

//       const recalcMA = (period: number) =>
//         candles.length < period
//           ? null
//           : candles.slice(-period).reduce((a, c) => a + c.close, 0) / period;

//       indicators.MA1.data[indicators.MA1.data.length - 1] = {
//         time: t,
//         value: recalcMA(7),
//       };

//       indicators.MA2.data[indicators.MA2.data.length - 1] = {
//         time: t,
//         value: recalcMA(25),
//       };

//       indicators.MA3.data[indicators.MA3.data.length - 1] = {
//         time: t,
//         value: recalcMA(99),
//       };

//       const recalcEMA = (key: CompareSeriesType, period: number) => {
//         const prev = indicators[key].data.at(-2)?.value ?? close;
//         return computeIncrementalEMA(prev, close, period);
//       };

//       indicators.EMA1.data[indicators.EMA1.data.length - 1] = {
//         time: t,
//         value: recalcEMA("EMA1", 9),
//       };

//       indicators.EMA2.data[indicators.EMA2.data.length - 1] = {
//         time: t,
//         value: recalcEMA("EMA2", 21),
//       };

//       indicators.EMA3.data[indicators.EMA3.data.length - 1] = {
//         time: t,
//         value: recalcEMA("EMA3", 55),
//       };

//       set({ candles, histogram, indicators });
//     }
//   },

//   /* -----------------------------------------------------
//      RESET ON INTERVAL CHANGE
//   ----------------------------------------------------- */
//   reset: () =>
//     set({
//       candles: [],
//       histogram: [],
//       indicators: {
//         MA1: { ...get().indicators.MA1, data: [] },
//         MA2: { ...get().indicators.MA2, data: [] },
//         MA3: { ...get().indicators.MA3, data: [] },
//         EMA1: { ...get().indicators.EMA1, data: [] },
//         EMA2: { ...get().indicators.EMA2, data: [] },
//         EMA3: { ...get().indicators.EMA3, data: [] },
//       },
//     }),
// }));
