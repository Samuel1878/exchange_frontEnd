// import { useCallback, useState } from "react";
// import moment from "moment";
// import type {
//   ISeriesApi,
//   MouseEventParams,
//   Time,
//   CandlestickData,
//   LineData,
//   WhitespaceData,
// } from "lightweight-charts";

// // ---- type guards ----
// const isCandle = (
//   d: CandlestickData<Time> | WhitespaceData<Time>
// ): d is CandlestickData<Time> =>
//   "open" in d && "high" in d && "low" in d && "close" in d;

// const isLine = (
//   d: LineData<Time> | WhitespaceData<Time>
// ): d is LineData<Time> => "value" in d;

// // ---- legend types ----
// export type CandleLegend = {
//   type: "candle";
//   time: string;
//   open: string;
//   high: string;
//   low: string;
//   close: string;
//   color: string;
//   change: string;
// };

// export type LineLegend = {
//   type: "line";
//   time: string;
//   value: string;
//   color: string;
// };

// export type CombinedLegend = {
//   candle: CandleLegend | null;
//   lines: Record<string, LineLegend | null>;
// };

// // ---- hook ----
// export const useCombinedLegend = ({
//   candleRef,
//   lineSeries, // [{ id, ref }]
//   showLegend,
// }) => {
//   const [legend, setLegend] = useState<CombinedLegend>({
//     candle: null,
//     lines: {},
//   });

//   const readLast = (api: ISeriesApi<any>, type: "candle" | "line") => {
//     const d = api.dataByIndex(Number.MAX_SAFE_INTEGER, -1);
//     if (!d) return null;

//     if (type === "candle" && isCandle(d)) {
//       const decreased = d.close < d.open;
//       const color = decreased ? "#ef4444" : "#22c55e";
//       const diff = Math.abs(d.close - d.open);
//       const sign = decreased ? "-" : "+";

//       return {
//         type: "candle",
//         time: moment(d.time).format("YYYY/MM/DD HH:mm"),
//         open: d.open.toFixed(2),
//         high: d.high.toFixed(2),
//         low: d.low.toFixed(2),
//         close: d.close.toFixed(2),
//         color,
//         change: `${sign}${diff.toFixed(2)} (${((diff / d.open) * 100).toFixed(
//           2
//         )}%)`,
//       } as CandleLegend;
//     }

//     if (type === "line" && isLine(d)) {
//       return {
//         type: "line",
//         time: moment(d.time).format("YYYY/MM/DD HH:mm"),
//         value: d.value.toFixed(6),
//         color: api.options().color || "#999",
//       } as LineLegend;
//     }

//     return null;
//   };

//   const onCrosshairMove = useCallback(
//     (param: MouseEventParams) => {
//       if (!showLegend) return;

//       const candleApi = candleRef.current;
//       if (!candleApi) return;

//       const nextCandle = !param?.time
//         ? readLast(candleApi, "candle")
//         : (() => {
//             const d = param.seriesData.get(candleApi);
//             if (!d || !isCandle(d)) return null;

//             const decreased = d.close < d.open;
//             const color = decreased ? "#ef4444" : "#22c55e";
//             const diff = Math.abs(d.close - d.open);
//             const sign = decreased ? "-" : "+";

//             return {
//               type: "candle",
//               time: moment(d.time).format("YYYY/MM/DD HH:mm"),
//               open: d.open.toFixed(2),
//               high: d.high.toFixed(2),
//               low: d.low.toFixed(2),
//               close: d.close.toFixed(2),
//               color,
//               change: `${sign}${diff.toFixed(2)} (${(
//                 (diff / d.open) *
//                 100
//               ).toFixed(2)}%)`,
//             };
//           })();

//       const nextLines: Record<string, LineLegend | null> = {};

//       lineSeries.forEach(({ id, ref }) => {
//         const api = ref.current;
//         if (!api) {
//           nextLines[id] = null;
//           return;
//         }

//         if (!param?.time) {
//           nextLines[id] = readLast(api, "line");
//           return;
//         }

//         const d = param.seriesData.get(api);

//         if (!d || !isLine(d)) {
//           nextLines[id] = null;
//           return;
//         }

//         nextLines[id] = {
//           type: "line",
//           time: moment(d.time).format("YYYY/MM/DD HH:mm"),
//           value: d.value.toFixed(6),
//           color: api.options().color || "#999",
//         };
//       });

//       setLegend({
//         candle: nextCandle,
//         lines: nextLines,
//       });
//     },
//     [showLegend, candleRef, lineSeries]
//   );

//   return { legend, onCrosshairMove };
// };

// import { useCallback, useState } from "react";
// import dayjs from "dayjs";
// import type {
//   ISeriesApi,
//   MouseEventParams,
//   Time,
//   LineData,
//   CandlestickData,
//   WhitespaceData,
// } from "lightweight-charts";

// // ---------- type guards ----------
// const isLine = (
//   d: LineData<Time> | WhitespaceData<Time>
// ): d is LineData<Time> => "value" in d;

// const isCandle = (
//   d: CandlestickData<Time> | WhitespaceData<Time>
// ): d is CandlestickData<Time> =>
//   "open" in d && "high" in d && "low" in d && "close" in d;

// // ---------- formatting ----------
// const t2s = (t: Time) =>
//   typeof t === "number"
//     ? dayjs(t * 1000).format("YY/MM/DD HH:mm")
//     : t.toString();

// // ---------- legend shapes ----------
// export type CandleLegend = {
//   type: "candlestick";
//   open: string;
//   high: string;
//   low: string;
//   close: string;
//   time: string;
//   color: string;
//   change: string;
// };

// export type LineLegend = {
//   type: "line";
//   value: string;
//   time: string;
//   color: string;
// };

// export type UnifiedLegend = Record<string, CandleLegend | LineLegend | null>;

// export type SeriesItem = {
//   id: string;
//   type: "line" | "candlestick";
//   ref: React.RefObject<ISeriesApi<any>>;
// };

// // ---------- hook ----------
// export const useUnifiedLegend = (
//   showLegend: boolean,
//   seriesList: SeriesItem[]
// ) => {
//   const [legend, setLegend] = useState<UnifiedLegend>({});

//   const readLastBar = (item: SeriesItem) => {
//     const api = item.ref.current;
//     if (!api) return null;

//     const d = api.dataByIndex(Number.MAX_SAFE_INTEGER, -1);
//     if (!d) return null;

//     if (item.type === "candlestick" && isCandle(d)) {
//       const decreased = d.close < d.open;
//       const color = decreased ? "#e64c4c" : "#4caf50";
//       const diff = Math.abs(d.close - d.open);
//       const sign = decreased ? "-" : "+";

//       return {
//         type: "candlestick",
//         open: d.open.toFixed(2),
//         high: d.high.toFixed(2),
//         low: d.low.toFixed(2),
//         close: d.close.toFixed(2),
//         time: t2s(d.time),
//         color,
//         change: `${sign}${diff.toFixed(2)} (${((diff / d.open) * 100).toFixed(
//           2
//         )}%)`,
//       } as CandleLegend;
//     }

//     if (item.type === "line" && isLine(d)) {
//       return {
//         type: "line",
//         value: d.value.toFixed(6),
//         time: t2s(d.time),
//         color: api.options().color,
//       } as LineLegend;
//     }

//     return null;
//   };

//   const onCrosshairMove = useCallback(
//     (p: MouseEventParams) => {
//       if (!showLegend) return;

//       setLegend((prev) => {
//         const next = { ...prev };

//         seriesList.forEach((item) => {
//           const api = item.ref.current;
//           if (!api) return;

//           // No crosshair → last bar fallback
//           if (!p?.time) {
//             next[item.id] = readLastBar(item);
//             return;
//           }

//           const d = p.seriesData.get(api);

//           if (!d) {
//             next[item.id] = null;
//             return;
//           }

//           if (item.type === "candlestick" && isCandle(d)) {
//             const decreased = d.close < d.open;
//             const color = decreased ? "#e64c4c" : "#4caf50";
//             const diff = Math.abs(d.close - d.open);
//             const sign = decreased ? "-" : "+";

//             next[item.id] = {
//               type: "candlestick",
//               open: d.open.toFixed(2),
//               high: d.high.toFixed(2),
//               low: d.low.toFixed(2),
//               close: d.close.toFixed(2),
//               time: t2s(d.time),
//               color,
//               change: `${sign}${diff.toFixed(2)} (${(
//                 (diff / d.open) *
//                 100
//               ).toFixed(2)}%)`,
//             } as CandleLegend;

//             return;
//           }

//           if (item.type === "line" && isLine(d)) {
//             next[item.id] = {
//               type: "line",
//               value: d.value.toFixed(6),
//               time: t2s(d.time),
//               color: api.options().color,
//             } as LineLegend;

//             return;
//           }

//           // not valid
//           next[item.id] = null;
//         });

//         return next;
//       });
//     },
//     [showLegend, seriesList]
//   );

//   return { legend, onCrosshairMove };
// };
