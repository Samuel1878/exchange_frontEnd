import type { CandlestickData, LineData, UTCTimestamp } from "lightweight-charts";

export const calcMA = (candles:CandlestickData[], period:number):LineData[] => {
  const out = [];
  let sum = 0;

  for (let i = 0; i < candles.length; i++) {
    sum += candles[i].close;

    if (i >= period) {
      sum -= candles[i - period].close;
    }

    out.push({
      time: candles[i].time as UTCTimestamp,
      value: i >= period - 1 ? sum / period : null,
    });
  }

  return out;
};

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