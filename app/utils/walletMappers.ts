// store/mappers.ts
// import type{ AssetBalance, WalletBalance, UserWallet } from "./types";



// utils/walletApiMapper.ts

import type { WalletBalance, WalletType, AssetBalance, ApiWallet, UserWallet } from "~/utils/types";
// const mapWalletType = (type: string) => {
//   switch (type.toLowerCase()) {
//     case "spot":
//       return "SPOT";
//     case "funding":
//       return "FUNDING";
//     case "financial":
//       return "FINANCIAL";
//     default:
//       return "SPOT";
//   }
// };

// const mapWallet = (wallet: UserWallet): WalletBalance => {
//   const assets: AssetBalance[] = wallet.UserAsset.map((a) => {
//     const available = parseFloat(a.AvailableBalance);
//     const locked = parseFloat(a.LockedBalance);

//     const availableUSDT = parseFloat(a.AvailableBalanceUSDT || "0");
//     const lockedUSDT = parseFloat(a.LockedBalanceUSDT || "0");

//     return {
//       currency: a.Currency,

//       available,
//       locked,

//       availableUSDT,
//       lockedUSDT,

//       total: available + locked,
//       totalUSDT: availableUSDT + lockedUSDT,
//     };
//   });

//   return {
//     walletType: mapWalletType(wallet.WalletType),
//     assets,
//     walletUSDT: assets.reduce((sum, a) => sum + a.totalUSDT, 0),
//   };
// };
// export {mapWallet}

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
    totalLockedUSDT:w.lockedUSDT
    // walletUSDT: assets.reduce((s, a) => s + a.totalUSDT, 0),
  };
};

