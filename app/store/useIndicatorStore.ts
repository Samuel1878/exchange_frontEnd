import { create } from "zustand";
import { useKlineStore } from "./useKlineStore";
import { calcEMA, calcMA, calcWMA } from "~/utils/indicators";

// ---- indicator calculators imported below ----
type Selected = {
  ma?: number[];
  ema?: number[];
  wma?: number[];
};
type Indicator = {
  7?: number[];
  25?: number[];
  99?: number[];
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
    const candles = useKlineStore.getState().candles;
    const sel = get().selected;

    const indicators = {
      ma: {},
      ema: {},
      wma: {},
    };

    sel.ma?.length && sel.ma.forEach((p) => (indicators.ma[p] = calcMA(candles, p)));
    sel.ema?.length && sel.ema.forEach((p) => (indicators.ema[p] = calcEMA(candles, p)));
    sel.wma?.length && sel.wma.forEach((p) => (indicators.wma[p] = calcWMA(candles, p)));
    set({ indicators });
  },
}));
