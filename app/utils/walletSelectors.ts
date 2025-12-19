import { useWalletStore } from "~/store/useUserWalletStore";
import type { WalletType } from "./types";



export const useUser = () => useWalletStore((s) => s.user);

export const useWallet = (type: WalletType) =>
  useWalletStore((s) => s.wallets[type]);

export const useWalletAssets = (type: WalletType) =>
  useWalletStore((s) => s.wallets[type].assets);

// export const useWalletTotal = (type: WalletType) =>
//   useWalletStore((s) => s.wallets[type].walletUSDT);
export const useCombinedWalletAssets = () => {
  const fin = useWalletAssets("FINANCIAL");
  const fun = useWalletAssets("FUNDING");
  const spot = useWalletAssets("SPOT");

  const allAssets = [...fin, ...fun, ...spot];

  const mergedMap: Record<
    string,
    {
      currency?: string;
      available: number;
      locked: number;
      availableUSDT: number;
      lockedUSDT: number;
      total: number;
      totalUSDT: number;
    }
  > = {};

  allAssets.forEach((a) => {
    if (!mergedMap[a.currency]) {
      mergedMap[a.currency] = { ...a };
    } else {
      mergedMap[a.currency].available += a.available;
      mergedMap[a.currency].locked += a.locked;
      mergedMap[a.currency].availableUSDT += a.availableUSDT;
      mergedMap[a.currency].lockedUSDT += a.lockedUSDT;
      mergedMap[a.currency].total += a.total;
      mergedMap[a.currency].totalUSDT += a.totalUSDT;
    }
  });

  return Object.values(mergedMap);
};
export const useTotalUSDT = () => useWalletStore((s) => s.totalUSDT);
