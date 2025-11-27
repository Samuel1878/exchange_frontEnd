import type { CandlestickData, HistogramData, UTCTimestamp } from "lightweight-charts";
import moment from "moment";
import { create } from "zustand";
export const upColor = "#00c951";
export const downColor = "#fb2c36";
interface BinanceKlineStream {
  e: string; // Event type
  E: number; // Event time
  s: string; // Symbol
  k: {
    t: number; // Kline start time
    T: number; // Kline close time
    s: string; // Symbol
    i: string; // Interval
    f: number; // First trade ID
    L: number; // Last trade ID
    o: string; // Open price
    c: string; // Close price
    h: string; // High price
    l: string; // Low price
    v: string; // Base asset volume
    n: number; // Number of trades
    x: boolean; // Is this kline closed?
    q: string; // Quote asset volume
    V: string; // Taker buy base asset volume
    Q: string; // Taker buy quote asset volume
    B: string; // Ignore
  };
};
type BinanceUiKline = [
  number, // Kline open time
  string, // Open price
  string, // High price
  string, // Low price
  string, // Close price
  string, // Volume
  number, // Kline close time
  string, // Quote asset volume
  number, // Number of trades
  string, // Taker buy base asset volume
  string, // Taker buy quote asset volume
  string, // Unused field. Ignore.
];
interface KlineState {
    candles:CandlestickData[];
    histogram:HistogramData[];
    applySnapShot:(key:string, list:Promise<BinanceUiKline[]>) => void;
    applyStream:(key:string, data:BinanceKlineStream)=> void;
    reset : ()=>void
}
export const useKlineStore = create<KlineState>((set, get)=> {

    return{
        candles:[],
        histogram:[],
        applySnapShot:async(key, list)=> {
            const data = await list;
            console.log("raw", data)
            let candles:CandlestickData[] = [];
            let histogram:HistogramData[] = [];
            for (let index = 0; index < data.length; index++) {
                const e = data[index];
                let c = {
                  time: e[0] as UTCTimestamp,
                  open: Number(e[1]),
                  high: Number(e[2]),
                  low: Number(e[3]),
                  close: Number(e[4]),
                //   customValues:(e[0]).toString()
                };  
           let h = {
             value: Number(e[5]),
             time: e[0] as UTCTimestamp,
             color: Number(e[4]) > Number(e[1]) ? upColor : downColor,
             //  customValues:e[0]
           };
           candles.push(c);
           histogram.push(h)
            }
            console.log("formated", candles)
            get().candles = candles;
            get().histogram = histogram;
           
        },
        applyStream:(key, data)=>{
            const current = get().candles;
             const his = get().histogram;
            if (!current) return;
            const k = data?.k;
            const t = k.t;
            const last = current[current?.length -1]
            const hisCurrent = his[his?.length -1]
            if (!last || last.time !==t) {
               current.push({
                 time: t as UTCTimestamp,
                 open: Number(k?.o),
                 high: Number(k?.h),
                 low: Number(k?.l),
                 close: Number(k?.c),
               });
                his.push({
                  value: Number(k.v),
                  time: t as UTCTimestamp,
                  color: Number(k?.c) > Number(k?.o) ? upColor : downColor,
                });
                return
            }else {
                last.high = Number(k.h);
                last.low = Number(k.l);
                last.close = Number(k.c);
                last.open = Number(k.o);
                hisCurrent.color =
                  Number(k?.c) > Number(k?.o) ? upColor : downColor;
                 hisCurrent.time = t as UTCTimestamp;
                 hisCurrent.value = Number(k.v);
            }

            
        },
        reset: ()=> {
            set({
                candles:[],
                histogram:[],

            })
        }
    }
})