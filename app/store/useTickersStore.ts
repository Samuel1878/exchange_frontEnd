import { create } from "zustand";
const TOP_TICKERS = ["btcusdt", "ethusdt", "solusdt", "xrpusdt", "dogeusdt"];
export type BinanceTickers = {
  e: string,  // Event type
  E: number, // Event time
  s: string,      // Symbol
  p: string,   // Price change
  P: string,     // Price change percent
  w: string,    // Weighted average price
  x: string,    // First trade(F)-1 price (first trade before the 24hr rolling window)
  c: string,     // Last price
  Q: string,      // Last quantity
  b: string,   // Best bid price
  B: string,         // Best bid quantity
  a: string,      // Best ask price
  A: string,      // Best ask quantity
  o: string,     // Open price
  h: string,     // High price
  l: string,     // Low price
  v: string,      // Total traded base asset volume
  q: string,         // Total traded quote asset volume
  O: number,             // Statistics open time
  C: number,      // Statistics close time
  F: number,             // First trade ID
  L: number,         // Last trade Id
  n: number          // Total number of trades
}
export type Ticker = {
  symbol: string;
  priceChange: string;
  priceChangePercent: string;
  lowPrice: string;
  highPrice: string;
  quoteVolume: string;
  baseVolume: string;
  lastPrice: string;
};
export type Tickers = {
  btcusdt: Ticker;
  ethusdt: Ticker;
  solusdt: Ticker;
  xrpusdt: Ticker;
  dogeusdt: Ticker;
  adausdt: Ticker;
  avaxusdt: Ticker;
  linkusdt: Ticker;
  dotusdt: Ticker;
  ltcusdt: Ticker;
  shibusdt: Ticker;
  etcusdt: Ticker;
  manausdt: Ticker;
  uniusdt: Ticker;
  bchusdt: Ticker;
  trxusdt: Ticker;
  xlmusdt: Ticker;
  atomusdt: Ticker;
  nearusdt: Ticker;
  pepeusdt: Ticker;
};
type TickersState = {
  tickers: Tickers | {};
  applyBatch: (list: Ticker[]) => void;
//   topTickers:()=> Ticker[];
};
export const useTickersStore = create<TickersState>((set)=> ({
    tickers:{},
    applyBatch: (list) => set((s)=>{
        const copy = {...s.tickers};
    for (const t of list)  {
        copy[t.symbol?.toLowerCase()] = t;
    }
        return {tickers:copy}
    }),
}))