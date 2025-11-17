import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./slices/authSlice";
import orderbookReducer from './slices/orderBook';
import tickerSlice from "./slices/IndividualMiniTicker";
import  aggTradeSlice  from "./slices/tradeSlice";

const store = configureStore({
  reducer: {
    auth: AuthSlice,
    orderbook: orderbookReducer,
    tickerStreamsPerDay:tickerSlice,
    aggTrade:aggTradeSlice
  },
});
export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
