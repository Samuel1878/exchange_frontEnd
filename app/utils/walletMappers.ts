
import type { WalletBalance, WalletType, AssetBalance, ApiWallet, UserWallet } from "~/utils/types";

const mapWalletType = (type: string): WalletType => {
  switch (type.toLowerCase()) {
    case "spot":
      return "SPOT";
    case "funding":
      return "FUNDING";
    case "financial":
      return "FINANCIAL";
    default:
      return "SPOT";
  }
};

export const mapWalletApiToStore = (w: ApiWallet): WalletBalance => {
  const assets: AssetBalance[] = w.assets.map((a) => ({
    currency: a.asset,

    available: a.available,
    locked: a.locked,

    availableUSDT: a.availableUSDT,
    lockedUSDT: a.lockedUSDT,

    total: a.available + a.locked,
    totalUSDT: a.availableUSDT + a.lockedUSDT,
  }));

  return {
    walletType: mapWalletType(w.walletType),
    assets,
    totalAvailableUSDT:w.availableUSDT,
    totalLockedUSDT:w.lockedUSDT,
    totalUSDT:w.availableUSDT + w.lockedUSDT
  };
};

