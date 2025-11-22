// import { createSlice, current } from '@reduxjs/toolkit';
// import type { RootState } from "../store";
// import { groupByTicketSize } from "~/utils/helpers";
// import { ORDERBOOK_LEVELS } from "~/consts";

// export interface OrderbookState {
//   market: string;
//   rawBids: number[][];
//   bids: number[][];
//   maxTotalBids: number;
//   rawAsks: number[][];
//   asks: number[][];
//   maxTotalAsks: number;
//   groupingSize: number;
// }

// const initialState: OrderbookState = {
//   market: 'PI_XBTUSD', // PI_ETHUSD
//   rawBids: [],
//   bids: [],
//   maxTotalBids: 0,
//   rawAsks: [],
//   asks: [],
//   maxTotalAsks: 0,
//   groupingSize: .5,
// };
// const limitOrderbookLevels = (
//   orders: number[][],
//   limit: number
// ): number[][] => {
//   return orders.slice(0, limit);}
// const removePriceLevel = (price: number, levels: number[][]): number[][] => levels.filter(level => level[0] !== price);

// const updatePriceLevel = (updatedLevel: number[], levels: number[][]): number[][] => {
//   return levels.map(level => {
//     if (level[0] === updatedLevel[0]) {
//       level = updatedLevel;
//     }
//     return level;
//   });
// };

// const levelExists = (deltaLevelPrice: number, currentLevels: number[][]): boolean => currentLevels.some(level => level[0] === deltaLevelPrice);

// const addPriceLevel = (deltaLevel: number[], levels: number[][]): number[][] => {
//   return [ ...levels, deltaLevel ];
// };

// /**
//  *  If the size returned by a delta is 0 then
//  that price level should be removed from the orderbook,
//  otherwise you can safely overwrite the state of that
//  price level with new data returned by that delta.

//  - The orders returned by the feed are in the format
//  of [price, size][].
//  * @param currentLevels Existing price levels - `bids` or `asks`
//  * @param orders Update of a price level
//  */
// const applyDeltas = (currentLevels: number[][], orders: number[][]): number[][] => {
//   let updatedLevels: number[][] = currentLevels;

//   orders.forEach((deltaLevel) => {
//     const deltaLevelPrice = deltaLevel[0];
//     const deltaLevelSize = deltaLevel[1];

//     // If new size is zero - delete the price level
//     if (deltaLevelSize === 0 && updatedLevels.length > ORDERBOOK_LEVELS) {
//       updatedLevels = removePriceLevel(deltaLevelPrice, updatedLevels);
//     } else {
//       // If the price level exists and the size is not zero, update it
//       if (levelExists(deltaLevelPrice, currentLevels)) {
//         updatedLevels = updatePriceLevel(deltaLevel, updatedLevels);
//       } else {
//         // If the price level doesn't exist in the orderbook and there are less than 25 levels, add it
//         if (updatedLevels.length < ORDERBOOK_LEVELS) {
//           updatedLevels = addPriceLevel(deltaLevel, updatedLevels);
//         }
//       }
//     }
//   });

//   return updatedLevels;
// }

// const addTotalSums = (orders: number[][]): number[][] => {
//   const totalSums: number[] = [];

//   return orders.map((order: number[], idx) => {
//     const size: number = order[1];
//     if (typeof order[2] !== 'undefined') {
//       return order;
//     } else {
//       const updatedLevel = [ ...order ];
//       const totalSum: number = idx === 0 ? size : size + totalSums[idx - 1];
//       updatedLevel[2] = totalSum;
//       totalSums.push(totalSum);
//       return updatedLevel;
//     }
//   });
// };

// const addDepths = (orders: number[][], maxTotal: number): number[][] => {

//   return orders.map(order => {
//     if (typeof order[3] !== 'undefined') {
//       return order;
//     } else {
//       const calculatedTotal: number = order[2];
//       const depth = (calculatedTotal / maxTotal) * 100;
//       const updatedOrder = [ ...order ];
//       updatedOrder[3] = depth;
//       return updatedOrder;
//     }
//   });
// };

// const getMaxTotalSum = (orders: number[][]): number => {

//   const totalSums: number[] = orders.map(order => order[2]);
//     console.log(totalSums);
//   return Math.max.apply(Math, totalSums);
// }

// export const orderbookSlice = createSlice({
//   name: 'orderbook',
//   initialState,
//   reducers: {
//     addBids: (state, { payload }) => {
//       const currentTicketSize: number = current(state).groupingSize;
//       const groupedCurrentBids: number[][] = groupByTicketSize(payload, currentTicketSize);
//       const updatedBids: number[][] = addTotalSums(
//         applyDeltas(
//           groupByTicketSize(current(state).rawBids, currentTicketSize),
//           groupedCurrentBids
//         )
//       );

//       state.maxTotalBids = getMaxTotalSum(updatedBids);
//       state.bids = addDepths(updatedBids, current(state).maxTotalBids);
//           //  state.bids = limitOrderbookLevels(state.bids, ORDERBOOK_LEVELS);

//     },
//     addAsks: (state, { payload }) => {
//       const currentTicketSize: number = current(state).groupingSize;
//       const groupedCurrentAsks: number[][] = groupByTicketSize(payload, currentTicketSize);
//       const updatedAsks: number[][] = addTotalSums(
//         applyDeltas(
//           groupByTicketSize(current(state).rawAsks, currentTicketSize),
//           groupedCurrentAsks
//         )
//       );

//       state.maxTotalAsks = getMaxTotalSum(updatedAsks);
//       state.asks = addDepths(updatedAsks, current(state).maxTotalAsks);
   
//           //  state.asks = limitOrderbookLevels(state.asks, ORDERBOOK_LEVELS);
//     },
//     addExistingState: (state, { payload }) => {
//       const rawBids: number[][] = payload.bids;
//       const rawAsks: number[][] = payload.asks;
//       const bids: number[][] = addTotalSums(
//         groupByTicketSize(rawBids, current(state).groupingSize)
//       );
//       const asks: number[][] = addTotalSums(
//         groupByTicketSize(rawAsks, current(state).groupingSize)
//       );

//       state.market = payload["product_id"];
//       state.rawBids = rawBids;
//       state.rawAsks = rawAsks;
//       state.maxTotalBids = getMaxTotalSum(bids);
//       state.maxTotalAsks = getMaxTotalSum(asks);
//       state.bids = addDepths(bids, current(state).maxTotalBids);
//       state.asks = addDepths(asks, current(state).maxTotalAsks);
//       // state.bids = limitOrderbookLevels(state.bids, ORDERBOOK_LEVELS);
//       // state.asks = limitOrderbookLevels(state.asks, ORDERBOOK_LEVELS);
//     },
//     setGrouping: (state, { payload }) => {
//       state.groupingSize = payload;
//     },
//     clearOrdersState: (state) => {
//       state.bids = [];
//       state.asks = [];
//       state.rawBids = [];
//       state.rawAsks = [];
//       state.maxTotalBids = 0;
//       state.maxTotalAsks = 0;
//     }
//   }
// });

// export const { addBids, addAsks, addExistingState, setGrouping, clearOrdersState } = orderbookSlice.actions;

// export const selectBids = (state: RootState): number[][] => state.orderbook.bids;
// export const selectAsks = (state: RootState): number[][] => state.orderbook.asks;
// export const selectGrouping = (state: RootState): number => state.orderbook.groupingSize;
// export const selectMarket = (state: RootState): string => state.orderbook.market;

// export default orderbookSlice.reducer;















// import { createSlice, current } from "@reduxjs/toolkit";
// import type { RootState } from "../store";
// import { ORDERBOOK_LEVELS } from "~/consts";

// export interface OrderbookState {
//   market: string;
//   rawBids: number[][];
//   bids: number[][];
//   maxTotalBids: number;
//   rawAsks: number[][];
//   asks: number[][];
//   maxTotalAsks: number;
//   groupingSize: number; // This might no longer be necessary if you're not grouping
// }

// const initialState: OrderbookState = {
//   market: "PI_XBTUSD",
//   rawBids: [],
//   bids: [],
//   maxTotalBids: 0,
//   rawAsks: [],
//   asks: [],
//   maxTotalAsks: 0,
//   groupingSize: 0.5,
// };

// // Ensure you only keep the top ORDERBOOK_LEVELS bids and asks
// const limitOrderbookLevels = (
//   orders: number[][],
//   limit: number
// ): number[][] => {
//   return orders.slice(0, 5);
// };

// // If we apply deltas, we need to update the levels, but now we only show the top levels
// const applyDeltas = (
//   currentLevels: number[][],
//   orders: number[][]
// ): number[][] => {
//   let updatedLevels: number[][] = currentLevels;

//   orders.forEach((deltaLevel) => {
//     const deltaLevelPrice = deltaLevel[0];
//     const deltaLevelSize = deltaLevel[1];

//     if (deltaLevelSize === 0) {
//       updatedLevels = updatedLevels.filter(
//         (level) => level[0] !== deltaLevelPrice
//       ); // Remove price level
//     } else {
//       const levelIndex = updatedLevels.findIndex(
//         (level) => level[0] === deltaLevelPrice
//       );
//       if (levelIndex >= 0) {
//         updatedLevels[levelIndex] = deltaLevel; // Update existing level
//       } else if (updatedLevels.length < ORDERBOOK_LEVELS) {
//         updatedLevels.push(deltaLevel); // Add new level if space available
//       }
//     }
//   });

//   return updatedLevels;
// };

// export const orderbookSlice = createSlice({
//   name: "orderbook",
//   initialState,
//   reducers: {
//     addBids: (state, { payload }) => {
//       const updatedBids = applyDeltas(state.rawBids, payload);
//       state.rawBids = updatedBids;
//       state.bids = limitOrderbookLevels(updatedBids, ORDERBOOK_LEVELS); // Limit to top levels
//     },
//     addAsks: (state, { payload }) => {
//       const updatedAsks = applyDeltas(state.rawAsks, payload);
//       state.rawAsks = updatedAsks;
//       state.asks = limitOrderbookLevels(updatedAsks, ORDERBOOK_LEVELS); // Limit to top levels
//     },
//     addExistingState: (state, { payload }) => {
//       const rawBids = payload.bids;
//       const rawAsks = payload.asks;

//       state.market = payload["product_id"];
//       state.rawBids = rawBids;
//       state.rawAsks = rawAsks;
//       state.bids = limitOrderbookLevels(rawBids, ORDERBOOK_LEVELS);
//       state.asks = limitOrderbookLevels(rawAsks, ORDERBOOK_LEVELS);
//     },
//     clearOrdersState: (state) => {
//       state.bids = [];
//       state.asks = [];
//       state.rawBids = [];
//       state.rawAsks = [];
//       state.maxTotalBids = 0;
//       state.maxTotalAsks = 0;
//     },
//   },
// });

// export const { addBids, addAsks, addExistingState, clearOrdersState } =
//   orderbookSlice.actions;

// export const selectBids = (state: RootState): number[][] =>
//   state.orderbook.bids;
// export const selectAsks = (state: RootState): number[][] =>
//   state.orderbook.asks;
// export const selectMarket = (state: RootState): string =>
//   state.orderbook.market;

// export default orderbookSlice.reducer;













// import { createSlice, current } from "@reduxjs/toolkit";
// import type { RootState } from "../store";
// import { ORDERBOOK_LEVELS } from "~/consts";

// export interface OrderbookState {
//   market: string;
//   rawBids: number[][];
//   bids: number[][];
//   maxTotalBids: number;
//   rawAsks: number[][];
//   asks: number[][];
//   maxTotalAsks: number;
//   groupingSize: number; // This might no longer be necessary if you're not grouping
// }

// const initialState: OrderbookState = {
//   market: "PI_XBTUSD",
//   rawBids: [],
//   bids: [],
//   maxTotalBids: 0,
//   rawAsks: [],
//   asks: [],
//   maxTotalAsks: 0,
//   groupingSize: 0.5,
// };

// // Ensure you only keep the top ORDERBOOK_LEVELS bids and asks
// const limitOrderbookLevels = (
//   orders: number[][],
//   limit: number
// ): number[][] => {
//   return orders.slice(0, 5);
// };

// // Calculate the total sum of sizes for each price level
// const addTotalSums = (orders: number[][]): number[][] => {
//   const totalSums: number[] = [];

//   return orders.map((order, idx) => {
//     const size: number = order[1];

//     // The total sum is just the size at that price level (for now)
//     const updatedLevel = [...order];
//     const totalSum: number = idx === 0 ? size : size + totalSums[idx - 1];
//     updatedLevel[2] = totalSum; // Store the cumulative sum

//     totalSums.push(totalSum);
//     return updatedLevel;
//   });
// };

// // Calculate depth as a percentage of the max total size for bids or asks
// const addDepths = (orders: number[][], maxTotal: number): number[][] => {
//   return orders.map((order) => {
//     const calculatedTotal = order[2] || 0; // Make sure to use the totalSum if it exists
//     const depth = (calculatedTotal / maxTotal) * 100;

//     const updatedOrder = [...order];
//     updatedOrder[3] = depth; // Add depth percentage

//     return updatedOrder;
//   });
// };

// // If we apply deltas, we need to update the levels, but now we only show the top levels
// const applyDeltas = (
//   currentLevels: number[][],
//   orders: number[][]
// ): number[][] => {
//   let updatedLevels: number[][] = currentLevels;

//   orders.forEach((deltaLevel) => {
//     const deltaLevelPrice = deltaLevel[0];
//     const deltaLevelSize = deltaLevel[1];

//     if (deltaLevelSize === 0) {
//       updatedLevels = updatedLevels.filter(
//         (level) => level[0] !== deltaLevelPrice
//       ); // Remove price level
//     } else {
//       const levelIndex = updatedLevels.findIndex(
//         (level) => level[0] === deltaLevelPrice
//       );
//       if (levelIndex >= 0) {
//         updatedLevels[levelIndex] = deltaLevel; // Update existing level
//       } else if (updatedLevels.length < ORDERBOOK_LEVELS) {
//         updatedLevels.push(deltaLevel); // Add new level if space available
//       }
//     }
//   });

//   return updatedLevels;
// };

// export const orderbookSlice = createSlice({
//   name: "orderbook",
//   initialState,
//   reducers: {
//     addBids: (state, { payload }) => {
//       const updatedBids = applyDeltas(state.rawBids, payload);
//       state.rawBids = updatedBids;

//       // Add total sums and depth
//       const updatedBidsWithTotals = addTotalSums(updatedBids);
//       state.maxTotalBids = Math.max(
//         ...updatedBidsWithTotals.map((order) => order[2] || 0)
//       ); // Get max total sum for bids
//       state.bids = addDepths(updatedBidsWithTotals, state.maxTotalBids); // Add depth

//       // Limit to top ORDERBOOK_LEVELS
//       state.bids = limitOrderbookLevels(state.bids, ORDERBOOK_LEVELS);
//     },
//     addAsks: (state, { payload }) => {
//       const updatedAsks = applyDeltas(state.rawAsks, payload);
//       state.rawAsks = updatedAsks;

//       // Add total sums and depth
//       const updatedAsksWithTotals = addTotalSums(updatedAsks);
//       state.maxTotalAsks = Math.max(
//         ...updatedAsksWithTotals.map((order) => order[2] || 0)
//       ); // Get max total sum for asks
//       state.asks = addDepths(updatedAsksWithTotals, state.maxTotalAsks); // Add depth

//       // Limit to top ORDERBOOK_LEVELS
//       state.asks = limitOrderbookLevels(state.asks, ORDERBOOK_LEVELS);
//     },
//     addExistingState: (state, { payload }) => {
//       const rawBids = payload.bids;
//       const rawAsks = payload.asks;

//       state.market = payload["product_id"];
//       state.rawBids = rawBids;
//       state.rawAsks = rawAsks;

//       // Add total sums and depth
//       const rawBidsWithTotals = addTotalSums(rawBids);
//       const rawAsksWithTotals = addTotalSums(rawAsks);

//       state.maxTotalBids = Math.max(
//         ...rawBidsWithTotals.map((order) => order[2] || 0)
//       );
//       state.maxTotalAsks = Math.max(
//         ...rawAsksWithTotals.map((order) => order[2] || 0)
//       );

//       state.bids = addDepths(rawBidsWithTotals, state.maxTotalBids);
//       state.asks = addDepths(rawAsksWithTotals, state.maxTotalAsks);

//       // Limit to top ORDERBOOK_LEVELS
//       state.bids = limitOrderbookLevels(state.bids, ORDERBOOK_LEVELS);
//       state.asks = limitOrderbookLevels(state.asks, ORDERBOOK_LEVELS);
//     },
//     clearOrdersState: (state) => {
//       state.bids = [];
//       state.asks = [];
//       state.rawBids = [];
//       state.rawAsks = [];
//       state.maxTotalBids = 0;
//       state.maxTotalAsks = 0;
//     },
//   },
// });

// export const { addBids, addAsks, addExistingState, clearOrdersState } =
//   orderbookSlice.actions;

// export const selectBids = (state: RootState): number[][] =>
//   state.orderbook.bids;
// export const selectAsks = (state: RootState): number[][] =>
//   state.orderbook.asks;
// export const selectMarket = (state: RootState): string =>
//   state.orderbook.market;

// export default orderbookSlice.reducer;












// import { createSlice } from "@reduxjs/toolkit";
// import type {PayloadAction} from "@reduxjs/toolkit"
// import type { RootState } from "../store";

// const ORDERBOOK_LEVELS =5; // Define the number of levels to show

// export interface OrderbookState {
//   market: string;
//   rawBids: number[][]; // [price, size]
//   rawAsks: number[][]; // [price, size]
//   bids: number[][]; // Processed bids (top levels)
//   asks: number[][]; // Processed asks (top levels)
//   maxTotalBids: number;
//   maxTotalAsks: number;
// }

// const initialState: OrderbookState = {
//   market: "BTCUSDT", // Default market
//   rawBids: [],
//   rawAsks: [],
//   bids: [],
//   asks: [],
//   maxTotalBids: 0,
//   maxTotalAsks: 0,
// };

// // Utility function to update the price levels
// const applyDeltas = (
//   currentLevels: number[][],
//   delta: number[][]
// ): number[][] => {
//   let updatedLevels = [...currentLevels];

//   delta.forEach(([price, size]) => {
//     const index = updatedLevels.findIndex((level) => level[0] === price);
//     if (size === 0) {
//       // Remove price level if size is 0
//       updatedLevels = updatedLevels.filter((level) => level[0] !== price);
//     } else if (index !== -1) {
//       // Update existing price level
//       updatedLevels[index] = [price, size];
//     } else {
//       // Add new price level
//       if (updatedLevels.length < ORDERBOOK_LEVELS) {
//         updatedLevels.push([price, size]);
//       }
//     }
//   });

//   // Sort by price (ascending for asks, descending for bids)
//   // updatedLevels.sort((a, b) => a[0] - b[0]);

//   return updatedLevels;
// };

// // Calculate the total sum and depth for the orderbook
// const calculateDepth = (levels: number[][], maxTotal: number) => {
//   let total = 0;
//   return levels.map(([price, size]) => {
//     total += size;
//     const depth = (total / maxTotal) * 100; // Depth as a percentage of the total
//     return [price, size, total, depth];
//   });
// };

// // Get the maximum total size from an array of levels
// const getMaxTotal = (levels: number[][]): number => {
//   return levels[0][0]
//   return levels.reduce((acc, [_, size]) => acc + size, 0);
// };

// const orderbookSlice = createSlice({
//   name: "orderbook",
//   initialState,
//   reducers: {
//     // Add new bids (incoming delta)
//     addBids: (state, action: PayloadAction<number[][]>) => {
//       const updatedBids = applyDeltas(state.rawBids, action.payload);
//       state.rawBids = updatedBids;

//       // Calculate total sum and depth
//       state.maxTotalBids = getMaxTotal(updatedBids);
//       state.bids = calculateDepth(updatedBids, state.maxTotalBids).slice(
//         0,
//         ORDERBOOK_LEVELS
//       );
//     },

//     // Add new asks (incoming delta)
//     addAsks: (state, action: PayloadAction<number[][]>) => {
//       const updatedAsks = applyDeltas(state.rawAsks, action.payload);
//       state.rawAsks = updatedAsks;

//       // Calculate total sum and depth
//       state.maxTotalAsks = getMaxTotal(updatedAsks);
//       state.asks = calculateDepth(updatedAsks, state.maxTotalAsks).slice(
//         0,
//         ORDERBOOK_LEVELS
//       );
//     },

//     // Initialize the orderbook with existing state (e.g., when the WebSocket connects)
//     addExistingState: (
//       state,
//       action: PayloadAction<{
//         bids: number[][];
//         asks: number[][];
//         market: string;
//       }>
//     ) => {
//       const { bids, asks, market } = action.payload;

//       state.market = market;
//       state.rawBids = bids;
//       state.rawAsks = asks;

//       // Calculate total sums and depths for existing state
//       state.maxTotalBids = getMaxTotal(bids);
//       state.maxTotalAsks = getMaxTotal(asks);
//       state.bids = calculateDepth(bids, state.maxTotalBids).slice(
//       0,
//         ORDERBOOK_LEVELS
//       );
//       state.asks = calculateDepth(asks, state.maxTotalAsks).slice(
//         0,
//         ORDERBOOK_LEVELS
//       );
//     },

//     // Clear the orderbook state (e.g., reset or logout)
//     clearOrdersState: (state) => {
//       state.rawBids = [];
//       state.rawAsks = [];
//       state.bids = [];
//       state.asks = [];
//       state.maxTotalBids = 0;
//       state.maxTotalAsks = 0;
//     },
//   },
// });

// export const { addBids, addAsks, addExistingState, clearOrdersState } =
//   orderbookSlice.actions;

// export const selectBids = (state: RootState): number[][] =>
//   state.orderbook.bids;
// export const selectAsks = (state: RootState): number[][] =>
//   state.orderbook.asks;
// export const selectMarket = (state: RootState): string =>
//   state.orderbook.market;

// export default orderbookSlice.reducer;
import { createSlice, current } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { ORDERBOOK_LEVELS } from "~/consts";
export interface LevelType {
  price: number;
  amount:number;
  total:number;
  depth:string;

}
export interface OrderbookState {
  market: string;
  bids: LevelType[];
  asks: LevelType[];
  groupingSize: number;
  totalLevel:number,
  lastUpdateId:number
}

const initialState: OrderbookState = {
  market: "",
  bids: [],
  asks: [],
  groupingSize:5,
  totalLevel:36,
  lastUpdateId:null
};

/** Apply delta updates Binance style */
function applyDeltas(levels: LevelType[], deltas: string[][]) {
  const updated = [...levels];
 
  deltas.forEach(([price, size]) => {
    let p = Number(price);
    let a = Number(Number(size).toFixed(6));
    let t = Number((p*a).toFixed(2));
    let depth  =( (t/p) * 100).toString();
    //  if (updated.length > colSize) {
    //   set
    //  }
    updated.push({price:p, amount:a, total:t,depth:depth }) 
  });

  return updated;
}
const addSnapData = (levels:string[][]) => {
  let snap :LevelType[]= []
  levels.forEach(([price, size]) => {
    let p = Number(price);
    let a = Number(Number(size).toFixed(5));
    let t = Number((p*a).toFixed(2));
    let depth  =( (t/p) * 100).toString();
       snap.push({ price: p, amount: a, total: t, depth: depth }); 
  })
  return snap

}
export const orderbookSlice = createSlice({
  name: "orderbook",
  initialState,
  reducers: {
    addBids(state, { payload }) {
      const curr = current(state).bids;
      const updated = applyDeltas(curr, payload);
      state.bids = updated.slice(
        updated.length - state.totalLevel,
        updated.length
      );
    },

    addAsks(state, { payload }) {
      const curr = current(state).asks;
      const updated = applyDeltas(curr, payload);
      state.asks = updated.slice(
        updated.length - state.totalLevel,
        updated.length
      );
    },
    changeTotalLevel (state, {payload}){
      state.totalLevel = payload
    },
    addLastUpdatedId (state, {payload}){
      state.lastUpdateId = payload
    },
    /** Initial snapshot load */
    addExistingState(state,  {payload}) {
      state.market = payload.product_id;
      state.bids = addSnapData(payload.bids);
      state.asks = addSnapData(payload.asks);
    },

    clearOrdersState(state) {
      state.bids = [];
      state.asks = [];
    },
  },
});

export const { addBids, addAsks,changeTotalLevel, addExistingState, clearOrdersState ,addLastUpdatedId} =
  orderbookSlice.actions;

export const selectBids = (state: RootState) => state.orderbook.bids;
export const selectAsks = (state: RootState) => state.orderbook.asks;
export const selectMarket = (state: RootState) => state.orderbook.market;

export default orderbookSlice.reducer;
