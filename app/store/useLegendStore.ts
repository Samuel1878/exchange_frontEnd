import { create } from "zustand";

interface LegendStore {
  legendVisible: boolean;
  setLegendVisible: () => void;
}

const useLegendStore = create<LegendStore>((set, get) => ({
  legendVisible: true,
  setLegendVisible: () => set({ legendVisible: !get().legendVisible }),
}));

export { useLegendStore };
