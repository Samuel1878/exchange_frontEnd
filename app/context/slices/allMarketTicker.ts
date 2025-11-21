import { createSlice, current } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export type TickSliceType = {
  symbol: string;
  priceChange: string;
  priceChangePercent: string;
  lowPrice: string;
  highPrice: string;
  quoteVolume: string;
  baseVolume: string;
  lastPrice:string;
};
type sliceType = {
  btcusdt: TickSliceType;
  ethusdt: TickSliceType;
  solusdt: TickSliceType;
  xrpusdt: TickSliceType;
  dogeusdt: TickSliceType;
  adausdt: TickSliceType;
  avaxusdt: TickSliceType;
  linkusdt: TickSliceType;
  dotusdt: TickSliceType;
  ltcusdt: TickSliceType;
  shibusdt: TickSliceType;
  etcusdt: TickSliceType;
  manausdt: TickSliceType;
  uniusdt: TickSliceType;
  bchusdt: TickSliceType;
  trxusdt: TickSliceType;
  xlmusdt: TickSliceType;
  atom: TickSliceType;
  nearusdt: TickSliceType;
  pepeusdt: TickSliceType;
};
const initialState: sliceType = {
  btcusdt: null,
  ethusdt: null,
  solusdt: null,
  xrpusdt: null,
  dogeusdt: null,
  adausdt: null,
  avaxusdt: null,
  linkusdt: null,
  dotusdt: null,
  ltcusdt: null,
  shibusdt: null,
  etcusdt: null,
  manausdt: null,
  uniusdt: null,
  bchusdt: null,
  trxusdt: null,
  xlmusdt: null,
  atom: null,
  nearusdt: null,
  pepeusdt: null,
};

const addDeltas = (state: sliceType, data, coin: string) => {
  let ticker: TickSliceType = {
    symbol: data.s,
    priceChange: data.p,
    priceChangePercent: data.P,
    lowPrice: data.l,
    highPrice: data.h,
    quoteVolume: data.q,
    baseVolume: data.v,
    lastPrice:data.c
  };
  state[coin] = ticker;
};
export const allMarketTickerSlice = createSlice({
  name: "allMarketTickerSlice",
  initialState,
  reducers: {
    // addTopData: (state, { payload }) => {
    //   switch (payload.stream) {
    //     case "btcusdt@ticker":
    //       addDeltas(state, payload.data, "btcusdt");
    //       break;
    //     case "ethusdt@ticker":
    //       addDeltas(state, payload.data, "ethusdt");
    //       break;
    //     case "solusdt@ticker":
    //       addDeltas(state, payload.data, "solusdt");
    //       break;
    //     case "xrpusdt@ticker":
    //       addDeltas(state, payload.data, "xrpusdt");
    //       break;
    //     case "dogeusdt@ticker":
    //       addDeltas(state, payload.data, "dogeusdt");
    //       break;
    //     default:
    //       break;
    //   }
    // },
    addData: (state, { payload }) => {
        switch (payload?.stream) {
          case "btcusdt@ticker":
            addDeltas(state, payload.data, "btcusdt");
            break;
          case "ethusdt@ticker":
            addDeltas(state, payload.data, "ethusdt");
            break;
          case "solusdt@ticker":
            addDeltas(state, payload.data, "solusdt");
            break;
          case "xrpusdt@ticker":
            addDeltas(state, payload.data, "xrpusdt");
            break;
          case "dogeusdt@ticker":
            addDeltas(state, payload.data, "dogeusdt");
            break;
          case "adausdt@ticker":
            addDeltas(state, payload.data, "adausdt");
            break;
          case "avaxusdt@ticker":
            addDeltas(state, payload.data, "avaxusdt");
            break;
          case "linkusdt@ticker":
            addDeltas(state, payload.data, "linkusdt");
            break;
          case "dotusdt@ticker":
            addDeltas(state, payload.data, "dotusdt");
            break;
          case "ltcusdt@ticker":
            addDeltas(state, payload.data, "ltcusdt");
            break;
          case "shibusdt@ticker":
            addDeltas(state, payload.data, "shibusdt");
            break;
          case "etcusdt@ticker":
            addDeltas(state, payload.data, "etcusdt");
            break;
          case "manausdt@ticker":
            addDeltas(state, payload.data, "manausdt");
            break;
          case "uniusdt@ticker":
            addDeltas(state, payload.data, "uniusdt");
            break;
          case "bchusdt@ticker":
            addDeltas(state, payload.data, "bchusdt");
            break;
          case "trxusdt@ticker":
            addDeltas(state, payload.data, "trxusdt");
            break;
          case "xlmusdt@ticker":
            addDeltas(state, payload.data, "xlmusdt");
            break;
          case "atomusdt@ticker":
            addDeltas(state, payload.data, "atomusdt");
            break;
          case "nearusdt@ticker":
            addDeltas(state, payload.data, "nearusdt");
            break;
          case "pepeusdt@ticker":
            addDeltas(state, payload.data, "pepeusdt");
            break;
          default:
            break;
        }
    },
  },
});

export const { addData } = allMarketTickerSlice.actions;

export const selectTopTickers = (state: RootState) => {
  let TopTickers = [
    state.allMarketTickerSlice.btcusdt,
    state.allMarketTickerSlice.ethusdt,
    state.allMarketTickerSlice.solusdt,
    state.allMarketTickerSlice.xrpusdt,
    state.allMarketTickerSlice.dogeusdt,
  ];
  return TopTickers;
};

export const selectAllTickers = (state: RootState) => {
  let Tickers = [state.allMarketTickerSlice];
  return Tickers;
};

export default allMarketTickerSlice.reducer;
