// useOrderbookStore.ts
import { create } from "zustand";
import { produce } from "immer";
export interface LevelType {
  price: number;
  amount: number;
  total: number;
  depth: string;
}
export interface OrderbookState {
  bids: LevelType[];
  asks: LevelType[];
  totalLevel: number;
  lastUpdateId: number | null;
  applyDiffs: (diffs: BinanceResponse) => void;
  reset: () => void;
  addSnapShot: (data: BinanceResponse) => void;
}
export interface BinanceResponse {
  lastUpdateId: number;
  bids: string[][];
  asks: string[][];
}
function initialApply(deltas: string[][]) {
  let data = [];
  deltas.forEach(([price, size]) => {
    if (Number(size) >= 0) {
      let p = Number(price);
      let a = Number(Number(size).toFixed(6));
      let t = Number((p * a).toFixed(2));
      let depth = "0";
      if (p >= 1000) {
        depth = ((t / p) * 100).toString();
      } else if (p < 1000) {
        depth = ((t / p) * 10).toString();
      } else if (p < 100) {
        depth = (t / p).toString();
      } else if (p < 10) {
        depth = (t / p / 10).toString();
      }

      data.push({ price, p, amount: a, total: t, depth: depth });
    }
  });
  return data;
}
export const useOrderbookStore = create<OrderbookState>((set, get) => ({
  bids: [],
  asks: [],
  totalLevel: 36,
  lastUpdateId: null,
  addSnapShot: (data) =>
    set((s) => ({
      lastUpdateId: data.lastUpdateId,
      bids: initialApply(data.bids),
      asks: initialApply(data.asks),
      totalLevel: 36,
    })),
  applyDiffs: (diffs: BinanceResponse) =>
    set(
      produce((state: OrderbookState) => {
        function applyDeltas(levels: LevelType[], deltas: string[][]) {
          const updated = [...levels];

          deltas.forEach(([price, size]) => {
            if (Number(size) >= 0) {
              let p = Number(price);
              let a = Number(Number(size).toFixed(6));
              let t = Number((p * a).toFixed(2));

              let depth = "0";
              if (p >= 1000) {
                depth = ((t / p) * 100).toString();
              } else if (p < 1000) {
                depth = ((t / p) * 10).toString();
              } else if (p < 100) {
                depth = (t / p).toString();
              } else if (p < 10) {
                depth = (t / p / 10).toString();
              }
              updated.push({ price: p, amount: a, total: t, depth: depth });
            }
          });

          return updated.slice(
            updated.length - state.totalLevel,
            updated.length
          );
        }
        const { lastUpdateId, bids, asks } = diffs;
        if (lastUpdateId === null) {
          state.lastUpdateId = lastUpdateId;
          state.asks = initialApply(asks);
          state.bids = initialApply(bids);
          return;
        }
        // if (lastUpdateId !== null && state.lastUpdateId > lastUpdateId) return;
        if (lastUpdateId !== null && state.lastUpdateId < lastUpdateId) {
          state.lastUpdateId = lastUpdateId;
          state.asks = applyDeltas(state.asks, asks);
          state.bids = applyDeltas(state.bids, bids);
        }
      })
    ),

  reset: () =>
    set({
      bids: [],
      asks: [],
      lastUpdateId: null,
    }),
}));

// import {create} from "zustand";
// import {produce} from "immer";

// type Level = [price: number, qty: number];

// interface OrderbookState {
//   bids: Record<number, number>; // price -> qty
//   asks: Record<number, number>;
//   lastUpdateId: number | null;

//   setSnapshot: (snap: {
//     lastUpdateId: number;
//     bids: Level[];
//     asks: Level[];
//   }) => void;
//   applyDiffs: (diffs: any[]) => void; // apply batched diffs
//   reset: () => void;
// }

// export const useOrderbookStore = create<OrderbookState>((set, get) => ({
//   bids: {},
//   asks: {},
//   lastUpdateId: null,
//   setSnapshot: ({ lastUpdateId, bids, asks }) =>
//     set(() => ({
//       lastUpdateId,
//       bids: Object.fromEntries(bids.map(([p, q]) => [p, q])),
//       asks: Object.fromEntries(asks.map(([p, q]) => [p, q])),
//     })),
//   applyDiffs: (diffs) =>
//     set(
//       produce((state: OrderbookState) => {
//         for (const d of diffs) {
//           const { U, u, b = [], a = [] } = d; // Binance depth diff
//           if (!state.lastUpdateId) continue;
//           // basic sequence check - more robust checks needed in production
//           if (u <= state.lastUpdateId) continue;
//           // apply bids
//           for (const [p, q] of b) {
//             const price = Number(p);
//             const qty = Number(q);
//             if (qty === 0) delete state.bids[price];
//             else state.bids[price] = qty;
//           }
//           // apply asks
//           for (const [p, q] of a) {
//             const price = Number(p);
//             const qty = Number(q);
//             if (qty === 0) delete state.asks[price];
//             else state.asks[price] = qty;
//           }
//           state.lastUpdateId = u;
//         }
//       })
//     ),
//   reset: () => set({ bids: {}, asks: {}, lastUpdateId: null }),
// }));
