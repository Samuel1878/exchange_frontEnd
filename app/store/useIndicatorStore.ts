import { create } from "zustand";
import { useKlineStore } from "./useKlineStore";
import { calcEMA, calcMA, calcWMA } from "~/utils/indicators";
import type { LineData } from "lightweight-charts";

// ---- indicator calculators imported below ----
type Selected = {
  ma?: number[];
  ema?: number[];
  wma?: number[];
};
type Indicator = {
  7?: LineData[];
  25?: LineData[];
  99?: LineData[];
};
type Indicators = {
  ma: Indicator;
  ema: Indicator;
  wma: Indicator;
};
type IndicatorStore = {
  selected: Selected;
  indicators: Indicators;
  setSelected:(type:string , value:number[])=>void;
  computeIndicators:()=>void
};
export const useIndicatorStore = create<IndicatorStore>((set, get) => ({
  selected: {
    ma: [7 , 25, 99],
    ema: [],
    wma: [],
  },

  indicators: {
    ma: {},
    ema: {},
    wma: {},
  },

  setSelected: (type:string, value:number[]) =>
    set((s) => ({
      selected: { [type]: value },
    })),

  computeIndicators: () => {
    // const candles = useKlineStore.getState().candles;
    // const sel = get().selected;

    // const indicators = {
    //   ma: {},
    //   ema: {},
    //   wma: {},
    // };

    // sel.ma.forEach((p) => (indicators.ma[p] = calcMA(candles, p)));
    // sel.ema.forEach((p) => (indicators.ema[p] = calcEMA(candles, p)));
    // sel.wma.forEach((p) => (indicators.wma[p] = calcWMA(candles, p)));
    // set({ indicators });
  },
}));
