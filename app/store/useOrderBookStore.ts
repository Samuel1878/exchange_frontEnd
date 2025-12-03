// useOrderbookStore.ts
import { create } from "zustand";
import { produce } from "immer";
export interface LevelType {
  price: number;
  amount: number;
  total: number;
  depth: string;
  cumulative: number;
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
  let maxQty = 0;
  for (let i = 0; i < deltas.length; i++) {
    const qty = deltas[i][1];
    if (Number(qty) > maxQty) maxQty = Number(qty);
  }
  let cum = 0;
  deltas.forEach(([price, size]) => {
    if (Number(size) >= 0) {
      let p = Number(price);
      let a = Number(Number(size).toFixed(6));
      let t = Number((p * a).toFixed(2));
      cum += t;
      let depth = ((a / maxQty) * 100).toString();
      data.push({
        price,
        p,
        amount: a,
        total: t,
        depth: depth,
        cumulative: cum,
      });
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
          let cumulative = 0;
          let maxQty = 0;
          for (let i = 0; i < deltas.length; i++) {
            const qty = deltas[i][1];
            if (Number(qty) > maxQty) maxQty = Number(qty);
          }
          deltas.forEach(([price, size]) => {
            if (Number(size) >= 0) {
              let p = Number(price);
              let a = Number(Number(size).toFixed(6));
              let t = Number((p * a).toFixed(2));
              cumulative += t;
              let depth = ((a / maxQty) * 100).toString();
              updated.push({
                price: p,
                amount: a,
                total: t,
                depth: depth,
                cumulative: cumulative,
              });
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
