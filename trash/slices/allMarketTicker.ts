// import { createSelector, createSlice, current } from "@reduxjs/toolkit";
// import type { RootState } from "../store";
// const TOP_TICKERS = ["btcusdt", "ethusdt", "solusdt", "xrpusdt", "dogeusdt"];

// export type TickSliceType = {
//   symbol: string;
//   priceChange: string;
//   priceChangePercent: string;
//   lowPrice: string;
//   highPrice: string;
//   quoteVolume: string;
//   baseVolume: string;
//   lastPrice:string;
// };
// export type sliceType = {
//   btcusdt: TickSliceType;
//   ethusdt: TickSliceType;
//   solusdt: TickSliceType;
//   xrpusdt: TickSliceType;
//   dogeusdt: TickSliceType;
//   adausdt: TickSliceType;
//   avaxusdt: TickSliceType;
//   linkusdt: TickSliceType;
//   dotusdt: TickSliceType;
//   ltcusdt: TickSliceType;
//   shibusdt: TickSliceType;
//   etcusdt: TickSliceType;
//   manausdt: TickSliceType;
//   uniusdt: TickSliceType;
//   bchusdt: TickSliceType;
//   trxusdt: TickSliceType;
//   xlmusdt: TickSliceType;
//   atomusdt: TickSliceType;
//   nearusdt: TickSliceType;
//   pepeusdt: TickSliceType;
// };
// type initType = {
//   tickers : sliceType | {}
// }
// const initialState:initType = {
//     tickers:{}
// };

// const addDeltas = (data) => {
//   let ticker: TickSliceType = {
//     symbol: data.s,
//     priceChange: data.p,
//     priceChangePercent: data.P,
//     lowPrice: data.l,
//     highPrice: data.h,
//     quoteVolume: data.q,
//     baseVolume: data.v,
//     lastPrice: data.c,
//   };
//   return ticker
// };
// export const allMarketTickerSlice = createSlice({
//   name: "allMarketTickerSlice",
//   initialState,
//   reducers: {

//     addData: (state, { payload }) => {
//       if (payload?.data){
//       const { s: symbol } = payload.data;
//       state.tickers[symbol.toLowerCase()] = addDeltas(payload.data);
//       }
       
//     },
//   },
// });

// export const { addData } = allMarketTickerSlice.actions;

// export const selectTopTickers = createSelector(
//   (state: RootState) => state.allMarketTickerSlice.tickers,
//   (tickers) => TOP_TICKERS.map((key) => tickers[key] || null)
// );

// export const selectAllTickers = createSelector(
//   (state: RootState) => state.allMarketTickerSlice.tickers,
//   (tickers) => Object.values(tickers).sort((a:TickSliceType, b:TickSliceType)=> Number(b?.lastPrice )- Number(a?.lastPrice))
// );



// export default allMarketTickerSlice.reducer;
