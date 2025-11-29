import { create } from "zustand";
import { useKlineStore, type BinanceKlineStream } from "./useKlineStore";
import { calcEMA, calcMA, calcWMA } from "~/utils/indicators";
import type {
  CandlestickData,
  LineData,
  UTCTimestamp,
} from "lightweight-charts";
import {
  LineSeries,
  type SeriesProps,
} from "lightweight-charts-react-components";
import type { SeriesType } from "lightweight-charts";
import type { ComponentType } from "react";

type CompareSeriesType = "MA1" | "MA2" | "MA3" | "EMA1" | "EMA2" | "EMA3";

type CompareSeriesMap<T extends CompareSeriesType, P extends SeriesType> = {
  [key in T]: {
    Component: ComponentType<SeriesProps<P>>;
    data: LineData[];
    options?: SeriesProps<P>["options"];
    chipColor: string;
  };
};
// ---- indicator calculators imported below ----
type Selected = {
  ma?: number[];
  ema?: number[];
  wma?: number[];
};
// type Indicator = {
//   7?: CompareSeriesMap;
//   25?: LineData[];
//   99?: LineData[];
// };
// type Indicators = {
//   ma: Indicator;
//   ema: Indicator;
//   wma: Indicator;
// };
type IndicatorStore = {
  selected: Selected;
  indicators: CompareSeriesMap<CompareSeriesType, SeriesType>;
  setSelected: (type: string, value: number[]) => void;
  computeIndicators: (data: BinanceKlineStream) => void;
  addSnapShot: (data: CandlestickData[]) => void;
};
export const useIndicatorStore = create<IndicatorStore>((set, get) => ({
  selected: {
    ma: [7, 25, 99],
    ema: [],
  },

  indicators: {
    MA1: {
      data: [],
      Component: LineSeries,
      chipColor: "yellow",
      options: {
        color: "yellow",
      },
    },
    MA2: {
      data: [],
      Component: LineSeries,
      chipColor: "orange",
      options: {
        color: "orange",
      },
    },
    MA3: {
      data: [],
      Component: LineSeries,
      chipColor: "red",
      options: {
        color: "red",
      },
    },
    EMA1: {
      data: [],
      Component: LineSeries,
      chipColor: "green",
      options: {
        color: "green",
      },
    },
    EMA2: {
      data: [],
      Component: LineSeries,
      chipColor: "blue",
      options: {
        color: "blue",
      },
    },
    EMA3: {
      data: [],
      Component: LineSeries,
      chipColor: "purple",
      options: {
        color: "purple",
      },
    },
  },

  setSelected: (type: string, value: number[]) =>
    set((s) => ({
      selected: { [type]: value },
    })),
  addSnapShot: (data: CandlestickData[]) => {
    const current = get().indicators;
    current.MA1.data = calcMA(data, 7);
    current.MA2.data = calcMA(data, 25);
    current.MA3.data = calcMA(data, 99);
    current.EMA1.data = calcEMA(data, 9);
    current.EMA2.data = calcEMA(data, 21);
    current.EMA3.data = calcEMA(data, 55);
  },
  computeIndicators: (data: BinanceKlineStream) => {
    const current = get().indicators;
    const k = data?.k;
    const t = k.t;
    const MA1Last = current.MA1.data[current?.MA1?.data.length - 1];
    const window7 = []
    if (!MA1Last || MA1Last.time !== t) {
        window7.push(k.c);
        if (window7.length > 7){
          window7.shift()
        }
        const ma1 = window7.length === 7 ? window7.reduce((a, c)=>a+c, 0)/7:null;
        current.MA1.data.push({value:ma1, time:t as UTCTimestamp})
    }
  },
}));
