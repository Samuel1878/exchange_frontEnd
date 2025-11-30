import type { CandlestickData, LineData, UTCTimestamp } from "lightweight-charts";

export const calcMA = (candles:CandlestickData[], period:number):LineData[] => {
  const out = [];
  // let sum = 0;

  // for (let i = 0; i < candles.length; i++) {
  //   sum += candles[i].close;

  //   if (i >= period) {
  //     sum -= candles[i - period].close;
  //   }

  //   out.push({
  //     time: candles[i].time as UTCTimestamp,
  //     value: sum / period,
  //   });
  // }
 for (let i = period - 1; i < candles.length; i++) {
   const sum = candles
     .slice(i - period + 1, i + 1)
     .reduce((acc, curr) => acc + curr.close, 0);
   const avg = sum / period;
   out.push({ time: candles[i].time, value: avg });
 }

  return out;
};
// export const calcMAOnce = (close , time , period):LineData=>{
  // i >= period - 1 ? 
//   return { time , };
// }
export const calcEMA = (candles: CandlestickData[], period: number): LineData[] => {
  const out = [];
  const k = 2 / (period + 1);

  let prev = candles[0]?.close ?? 0;

  for (let i = 0; i < candles.length; i++) {
    const price = candles[i].close;
    const ema = i === 0 ? price : price * k + prev * (1 - k);
    prev = ema;

    out.push({
      time: candles[i].time as UTCTimestamp,
      value: ema,
    });
  }

  return out;
};
export const calcWMA = (candles: CandlestickData[], period: number): LineData[] => {
  const out = [];
  const denominator = (period * (period + 1)) / 2; // 1+2+..+period

  for (let i = 0; i < candles.length; i++) {
    if (i < period - 1) {
      out.push({ time: candles[i].time, value: null });
      continue;
    }

    let num = 0;
    let weight = 1;

    for (let j = i - period + 1; j <= i; j++) {
      num += candles[j].close * weight;
      weight++;
    }

    out.push({
      time: candles[i].time as UTCTimestamp,
      value: num / denominator,
    });
  }

  return out;
};


// 🔧 Utility: incremental MA
export function computeIncrementalMA(candles: CandlestickData[], period: number) {
  if (candles.length < period) return null;

  let sum = 0;
  for (let i = candles.length - period; i < candles.length; i++) {
    sum += candles[i].close;
  }
  return sum / period;
}

// 🔧 Utility: incremental EMA
export function computeIncrementalEMA(prev: number | null, close: number, period: number) {
  const k = 2 / (period + 1);

  if (!prev) return close; // first EMA fallback

  return close * k + prev * (1 - k);
}
