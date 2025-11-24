// useOrderbookStore.ts
import {create} from "zustand";
import {produce} from "immer";

type PriceKey = number;
export type Level = [number, number];

interface OrderbookState {
  bids: Record<PriceKey, number>;
  asks: Record<PriceKey, number>;
  lastUpdateId: number | null;
  symbol: string | null;
  snapshotLoaded: boolean;

  // actions
  setSnapshot: (payload: {
    lastUpdateId: number;
    bids: Level[];
    asks: Level[];
    symbol?: string;
  }) => void;
  applyDiffs: (diffs: any[]) => void; // apply batch of Binance diff events
  reset: () => void;
}

export const useOrderbookStore = create<OrderbookState>((set, get) => ({
  bids: {},
  asks: {},
  lastUpdateId: null,
  symbol: null,
  snapshotLoaded: false,

  setSnapshot: ({ lastUpdateId, bids, asks, symbol }) =>
    set(() => ({
      lastUpdateId,
      bids: Object.fromEntries(bids.map(([p, q]) => [Number(p), Number(q)])),
      asks: Object.fromEntries(asks.map(([p, q]) => [Number(p), Number(q)])),
      snapshotLoaded: true,
      symbol: symbol ?? null,
    })),

  applyDiffs: (diffs) =>
    set(
      produce((state: OrderbookState) => {
        // diffs is an array of depth events from WS
        // if (!state.snapshotLoaded || state.lastUpdateId == null) return;

        for (const data of diffs) {
          const { U, u, b = [], a = [] } = data; // Binance depth format
          // skip if already applied
          if (u <= (state.lastUpdateId ?? 0)) continue;

          // Ensure continuity: first event after snapshot must have U <= lastUpdateId+1 <= u
          if (U > (state.lastUpdateId ?? 0) + 1) {
            // Out-of-sync: indicate by clearing snapshot flag (caller should resync)
            state.snapshotLoaded = false;
            return;
          }

          // apply bids
          for (const [pRaw, qRaw] of b) {
            const p = Number(pRaw);
            const q = Number(qRaw);
            if (q === 0) {
              delete state.bids[p];
            } else {
              state.bids[p] = q;
            }
          }

          // apply asks
          for (const [pRaw, qRaw] of a) {
            const p = Number(pRaw);
            const q = Number(qRaw);
            if (q === 0) {
              delete state.asks[p];
            } else {
              state.asks[p] = q;
            }
          }

          state.lastUpdateId = u;
        }
      })
    ),

  reset: () =>
    set({
      bids: {},
      asks: {},
      lastUpdateId: null,
      snapshotLoaded: false,
      symbol: null,
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
