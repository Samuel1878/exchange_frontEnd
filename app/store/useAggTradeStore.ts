import {create} from "zustand";
export interface AggTrade {
    id:number;
    price:number;
    time:number;
    amount:number;
    maker:boolean
}
interface AggTradeState {
    trades: AggTrade[];
    pushTrade: (t:AggTrade)=> void;
    // flush : ()=> void;
}

export const useAggTradeStore =  create<AggTradeState>((set, get)=> {
    let buffer: any[] = []
    let lastFlush = 0;
    const FLUSH_INTERVAL = 1000/30;
    const MAX_TRADES = 20;
    const flush = () => {
        const now = performance.now();
        if (now - lastFlush < FLUSH_INTERVAL) return;
        const newTrades = [...buffer];
        buffer = [];
        lastFlush = now;
        if (newTrades.length ===0)return;
        set((state:any)=>{
            const combined = [...newTrades , ...state.trades];
            if (combined.length > MAX_TRADES) combined.length = MAX_TRADES;
            return {trades:combined}
        })
    }
    return {
      trades: [],

      pushTrade: (t) => {
        buffer.push(t);
        flush()
        // let updated = [...get().trades]
        //  updated.unshift(t);
        //  if (updated.length > 20) {
        //     get().trades = updated.slice(0, 20);
        //     return
        //  }
        //  get().trades = updated
      },
    };
})