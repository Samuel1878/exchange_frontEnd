import { create } from "zustand";
export interface AggTrade {
  id: number;
  price: number;
  time: number;
  amount: number;
  maker: boolean;
}
type RestRes = {
  a: number; // Aggregate tradeId
  p: string; // Price
  q: string; // Quantity
  f: number; // First tradeId
  l: number; // Last tradeId
  T: number; // Timestamp
  m: boolean; // Was the buyer the maker?
  M: boolean; // Was the trade the best price match?
};
interface AggTradeState {
  trades: AggTrade[];
  pushTrade: (t: AggTrade) => void;
  addSnapShot: (data: RestRes[]) => void;
}

export const useAggTradeStore = create<AggTradeState>((set, get) => {
  let buffer: any[] = [];
  let lastFlush = 0;
  const FLUSH_INTERVAL = 1000 / 30;
  const MAX_TRADES = 20;
  const flush = () => {
    const now = performance.now();
    if (now - lastFlush < FLUSH_INTERVAL) return;
    const newTrades = [...buffer];
    buffer = [];
    lastFlush = now;
    if (newTrades.length === 0) return;
    set((state: any) => {
      const combined = [...newTrades, ...state.trades];
      if (combined.length > MAX_TRADES) combined.length = MAX_TRADES;
      return { trades: combined };
    });
  };
  // const applySnapData = (data:Promise<RestRes[]>):AggTrade[]=> {

  //     return snap;
  // }
  return {
    trades: [],
    addSnapShot: (data) => {
        console.log("snap AGG", data)
      let snap: AggTrade[] = [];
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        snap.push({
          id: element?.a,
          price: Number(element?.p),
          time: element?.T,
          amount: Number(element?.q),
          maker: element?.m,
        });
       
      }
       get().trades = snap;
    },
    pushTrade: (t) => {
      buffer.push(t);
      flush();
    },
  };
});
