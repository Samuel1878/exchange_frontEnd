import { create } from "zustand";

type CompareSeriesType = "MA1" | "MA2" | "MA3" | "EMA1" | "EMA2" | "EMA3";
interface CompareSeriesStore {
  visibleSeries: string[];
  toggleSeriesVisibility: (series: CompareSeriesType) => void;
}
export const useCompareSeriesStore = create<CompareSeriesStore>((set) => ({
  visibleSeries: ["MA1", "MA2", "MA3"],
  toggleSeriesVisibility: (series) =>
    set((state) => {
      const isSelected = state.visibleSeries.includes(series);
      return {
        visibleSeries: isSelected
          ? state.visibleSeries.filter((s) => s !== series)
          : [...state.visibleSeries, series],
      };
    }),
}));
