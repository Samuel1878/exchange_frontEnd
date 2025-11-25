// // useOrderbookSelectors.ts
// import { useMemo } from "react";
// import {shallow} from "zustand/shallow";
// import { useOrderbookStore} from "~/store/useOrderBookStore";
// import { groupDepth, addCumulative } from "~/utils/orderBookHelper";
// import type { Level } from "~/store/useOrderBookStore";
// /**
//  * Returns sorted top N bids (desc) and asks (asc) as arrays of [price, qty]
//  */
// export function useSortedOrderbook(limit = 50) {
//   const { bids, asks } = useOrderbookStore(
//     (s) => ({ bids: s.bids, asks: s.asks }),
//     shallow
//   );

//   return useMemo(() => {
//     const bidsArr: Level[] = Object.entries(bids).map(([p, q]) => [
//       Number(p),
//       q,
//     ]);
//     const asksArr: Level[] = Object.entries(asks).map(([p, q]) => [
//       Number(p),
//       q,
//     ]);

//     bidsArr.sort((a, b) => b[0] - a[0]);
//     asksArr.sort((a, b) => a[0] - b[0]);

//     return {
//       bids: bidsArr.slice(0, limit),
//       asks: asksArr.slice(0, limit),
//     };
//   }, [bids, asks, limit]);
// }

// /**
//  * Returns grouped + cumulative arrays based on a tickSize (e.g., 1, 0.1)
//  */
// // export function useGroupedOrderbook(tickSize = 1, limit = 50) {
// //   const { bids, asks } = useOrderbookStore(
// //     (s) => ({ bids: s.bids, asks: s.asks }),
// //     shallow
// //   );

// //   return useMemo(() => {
// //     const bidsArr: Level[] = Object.entries(bids).map(([p, q]) => [
// //       Number(p),
// //       q,
// //     ]);
// //     const asksArr: Level[] = Object.entries(asks).map(([p, q]) => [
// //       Number(p),
// //       q,
// //     ]);

// //     bidsArr.sort((a, b) => b[0] - a[0]);
// //     asksArr.sort((a, b) => a[0] - b[0]);

// //     const groupedBids = groupDepth(bidsArr, tickSize)
// //       .sort((a, b) => b[0] - a[0])
// //       .slice(0, limit);
// //     const groupedAsks = groupDepth(asksArr, tickSize)
// //       .sort((a, b) => a[0] - b[0])
// //       .slice(0, limit);

// //     return {
// //       bids: addCumulative(groupedBids),
// //       asks: addCumulative(groupedAsks),
// //     };
// //   }, [bids, asks, tickSize, limit]);
// // }
