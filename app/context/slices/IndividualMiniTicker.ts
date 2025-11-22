
import { createSlice, current } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export interface TickerSteams {
    priceChange: string;
    priceChangePercent:string;
    lowPrice:string;
    highPrice:string;
    quoteVolume:string;
    baseVolume:string;
    

}
export interface TickerState {
    symbol:string;
    ticker:TickerSteams | null

}

const initialState: TickerState = {
    symbol:"btcusdt",
    ticker:null
};

const addData = (payload) => {
    let data: TickerSteams = {
      priceChange: payload.p,
      priceChangePercent: payload.P,
      lowPrice: payload.l,
      highPrice: payload.h,
      quoteVolume: payload.q,
      baseVolume: payload.v,
    };
   return data
}
export const tickerSlice = createSlice({
  name: "tickerStreamsPerDay",
  initialState,
  reducers: {
    updateTicker(state, { payload }) {
     const data = addData(payload)
      state.ticker = data;
    },

    addTicker(state, { payload }) {
        state.symbol = payload.s;
        const data = addData(payload);
        state.ticker = data;
    },
   
  },
});

export const {
  updateTicker,
  addTicker,
} = tickerSlice.actions;

export const selectSymbol = (state: RootState) => state.tickerStreamsPerDay.symbol;
export const selectTicker = (state: RootState) => state.tickerStreamsPerDay.ticker;


export default tickerSlice.reducer;
