import { createSlice, current } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export interface aggTradeStreams {
    price:string;
    time:string;
    amount:string;
    isBuyerMarket:boolean

}
export interface TradeState {
  symbol: string;
  aggTrade:aggTradeStreams[]
}

const initialState: TradeState = {
  symbol: "btcusdt",
  aggTrade: [],
};

const addData = (state:TradeState, payload) => {
    let updated = [...state.aggTrade]
    let data: aggTradeStreams = {
        price :payload.p,
        time :payload.T,
        amount:Number(payload?.q)?.toFixed(5),
        isBuyerMarket:payload.m
    }
    updated.unshift(data)
    if (updated.length > 10){
        return updated.slice(0, 20);
    }
    return updated


};
export const aggTradeSlice = createSlice({
  name: "aggTrade",
  initialState,
  reducers: {
    addAggTrade(state, { payload }) {
      state.symbol = payload.s;
      const returnData = addData(state, payload);
      state.aggTrade = returnData
     
    },
  },
});

export const { addAggTrade } = aggTradeSlice.actions;

export const selectSymbol = (state: RootState) => state.aggTrade.symbol;
export const selectAggTrade = (state: RootState) => state.aggTrade.aggTrade;

export default aggTradeSlice.reducer;
