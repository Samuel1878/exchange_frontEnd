import { AllCoinNames, CoinPairs } from "~/consts/pairs";
import type {
  AssetBalance,
  UserData,
  UserWallet,
  WalletBalance,
} from "~/utils/types";

export const upColor = "#00c951";
export const downColor = "#fb2c36";
// export const groupByPrice = (levels: number[][]): number[][] => {
//   return levels
//     .map((level, idx) => {
//       const nextLevel = levels[idx + 1];
//       const prevLevel = levels[idx - 1];

//       if (nextLevel && level[0] === nextLevel[0]) {
//         return [level[0], level[1] + nextLevel[1]];
//       } else if (prevLevel && level[0] === prevLevel[0]) {
//         return [];
//       } else {
//         return level;
//       }
//     })
//     .filter((level) => level.length > 0);
// };

export function formatNumber(value: number): string {
  if (!Number.isFinite(value)) return "0";

  const factor = 1_000_000;

  // floor to 6 decimal places
  const floored = Math.floor(value * factor) / factor;

  // convert to string and remove trailing zeros
  return floored.toFixed(6).replace(/\.?0+$/, "");
}

export const formatTotalPrice = (num: number): string => {
  if (!num) {
    return "0.00";
  }
  if (num < 1000) return num.toFixed(2).toString();
  const units = ["", "k", "M", "B", "T"];
  let unitIndex = 0;
  let value = num;
  while (value >= 1000 && unitIndex < units.length - 1) {
    value /= 1000;
    unitIndex++;
  }
  return value.toFixed(2).replace(/\.00$/, "") + units[unitIndex];
};

export function rafThrottle<T extends (...args: any[]) => void>(func: T) {
  let ticking = false;
  let lastArgs: any[];

  return (...args: Parameters<T>) => {
    lastArgs = args;

    if (!ticking) {
      ticking = true;
      requestAnimationFrame(() => {
        func(...lastArgs);
        ticking = false;
      });
    }
  };
}

export const typedObjectEntries = <T extends object>(
  obj: T
): Array<[keyof T, T[keyof T]]> => {
  return Object.entries(obj) as Array<[keyof T, T[keyof T]]>;
};

export const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i; // simple, reliable email check
export const phoneRe = /^\+?[0-9]{7,15}$/; // E.164-like: optional +, 7-15 digits (no formatting)
export const userNameRe = /^[A-Za-z0-9_.-]{3,20}$/; // alphanumeric + . _ - , length 3-20
export const passwordRe = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/; // min 8, upper, lower, digit, special

// export const calculateUserBalances = (
//   wallet: UserWallet[],
//   prices: Record<string, number>
// ): UserBalanceResult => {
//   if (!wallet)
//     return { walletTotals: null, totalUSDT: null, walletDetails: null };
//   const walletTotals: Record<string, number> = {};
//   console.log(prices)
//   let totalUSDT = 0;
//   const walletDetails = wallet?.map((w) => {
//     let walletUSDT = 0;
//     const assets = w.UserAsset?.map((asset) => {
//       const balance =
//         parseFloat(asset.AvailableBalance) + parseFloat(asset.LockedBalance);
//       const assetUSDT = balance * (prices[asset.Currency?.toUpperCase()] ?? 0);
//       walletUSDT += assetUSDT;
//       return {
//         currency: asset.Currency,
//         balance,
//         valueUSDT: assetUSDT,
//       };
//     });
//     walletTotals[w.WalletType] = walletUSDT;
//     totalUSDT += walletUSDT;
//     return {
//       walletType: w.WalletType,
//       assets,
//       walletUSDT,
//     };
//   });
//   return {
//     walletTotals,
//     totalUSDT,
//     walletDetails,
//   };
// };
// export const extractNonZeroSymbols = (wallets: UserWallet[]): string[] => {
//   const symbols :string[]= []

//   wallets.forEach((wallet) => {
//     wallet.UserAsset?.forEach((asset) => {
//       const balance =
//         parseFloat(asset.AvailableBalance) + parseFloat(asset.LockedBalance);
//       if (asset.Currency === "USDT") return
//       if (balance > 0) {

//         symbols.includes(asset.Currency +"USDT") || symbols.push(asset.Currency +"USDT");
//       }
//     });
//   });

//   return symbols;
// };

// export const calculateCoinForOverview = (
//   wallets: UserWallet[],
//   prices: Record<string, number>
// ) => {
//   const balanceMap: Record<string, { balance: number; valueUSDT: number }> = {};

//   wallets.forEach((wallet) => {
//     wallet.UserAsset?.forEach((asset) => {
//       const balance =
//         parseFloat(asset.AvailableBalance) + parseFloat(asset.LockedBalance);

//       if (balance <= 0) return;

//       if (!balanceMap[asset.Currency]) {
//         balanceMap[asset.Currency] = { balance: 0, valueUSDT: 0 };
//       }

//       const valueUSDT = balance * (prices[asset.Currency] ?? 0);

//       balanceMap[asset.Currency].balance += balance;
//       balanceMap[asset.Currency].valueUSDT += valueUSDT;
//     });
//   });

//   return Object.values(AllCoinNames)
//     .map((coin) => {
//       const found = balanceMap[coin.symbol];
//       if (!found) return {symbol:coin.symbol, name:coin.name, balance:0, valueUSDT:0};

//       return {
//         symbol: coin.symbol,
//         name: coin.name,
//         balance: found.balance,
//         valueUSDT: found.valueUSDT,
//       };
//     })
//     // .filter(Boolean)
//     .sort((a, b) => b!.valueUSDT - a!.valueUSDT);
// };
// export function getSortedCoinsNoFilter(AssetBalance: AssetBalance[]) {
//   const balanceMap: Record<string, { balance: number; valueUSDT: number }> = {};

//   AssetBalance &&
//     AssetBalance.forEach((a) => {
//       if (!balanceMap[a.currency]) {
//         balanceMap[a.currency] = { balance: 0, valueUSDT: 0 };
//       }
//       balanceMap[a.currency].balance += a.balance;
//       balanceMap[a.currency].valueUSDT += a.valueUSDT;
//     });

//   let result = Object.entries(AllCoinNames).map(([key, coin]) => {
//     const found = balanceMap[coin.symbol] || { balance: 0, valueUSDT: 0 };
//     return {
//       symbol: coin.symbol,
//       name: coin.name,
//       balance: found.balance,
//       valueUSDT: found.valueUSDT,
//     };
//   });
//   result = result.sort((a, b) => b.valueUSDT - a.valueUSDT);
//   return result;
// }
// export function getSortedCoins(
//   AssetBalance: AssetBalance[],
//   page: number,
//   size: number,
//   search = ""
// ) {
//   const balanceMap: Record<string, { balance: number; valueUSDT: number }> = {};

//   AssetBalance &&
//     AssetBalance.forEach((a) => {
//       if (!balanceMap[a.currency]) {
//         balanceMap[a.currency] = { balance: 0, valueUSDT: 0 };
//       }
//       balanceMap[a.currency].balance += a.balance;
//       balanceMap[a.currency].valueUSDT += a.valueUSDT;
//       // });
//     });

//   let result = Object.entries(AllCoinNames).map(([key, coin]) => {
//     const found = balanceMap[coin.symbol] || { balance: 0, valueUSDT: 0 };
//     return {
//       symbol: coin.symbol,
//       name: coin.name,
//       balance: found.balance,
//       valueUSDT: found.valueUSDT,
//     };
//   });

//   if (search) {
//     result = result.filter(
//       (r) =>
//         r.symbol.toLowerCase().includes(search.toLowerCase()) ||
//         r.name.toLowerCase().includes(search.toLowerCase())
//     );
//   }
//   result = result.sort((a, b) => b.valueUSDT - a.valueUSDT);

//   const start = (page - 1) * size;
//   return result.slice(start, start + size);
// }

// export function getSortedCoinsForWithdrawls(wallets: WalletBalance[]) {
//   const balanceMap: Record<string, { balance: number; valueUSDT: number }> = {};

//   wallets &&
//     wallets.forEach((wallet) => {
//       if (wallet.walletType === "spot") {
//         wallet.assets.map((a) => {
//           if (!balanceMap[a.currency]) {
//             balanceMap[a.currency] = { balance: 0, valueUSDT: 0 };
//           }
//           balanceMap[a.currency].balance += a.balance;
//           balanceMap[a.currency].valueUSDT += a.valueUSDT;
//         });
//       }
//     });

//   let result = Object.entries(AllCoinNames).map(([key, coin]) => {
//     const found = balanceMap[coin.symbol] || { balance: 0, valueUSDT: 0 };
//     return {
//       symbol: coin.symbol,
//       name: coin.name,
//       balance: found.balance,
//       valueUSDT: found.valueUSDT,
//     };
//   });
//   result = result.sort((a, b) => b.valueUSDT - a.valueUSDT);
//   return result;
// }

// export async function getPrices (prices) {
//     let data = {}

//       if (prices?.length === 1){
//           const response = await getTickerPriceAPI(prices);
//           if (response) {
//             console.log(response)
//                let name = CoinPairs[response?.symbol.toLowerCase()]?.names[0];
//                 data[name] = response?.price
//           }
//         return data
//       }
//         const response = await getTickerPricesAPI(prices);
//         if (response) {
//           response?.map((e) => {
//               console.log(response);
//             let name = CoinPairs[e?.symbol.toLowerCase()]?.names[0]
//             data[name] = e?.price;
//           });
//         }
//         return data

// }

type CoinResult = {
  symbol: string;
  name: string;
  balance: number;
  valueUSDT: number;
};

const buildCoinResult = (
  balanceMap: Record<string, { balance: number; valueUSDT: number }>
): CoinResult[] =>
  Object.values(AllCoinNames).map((coin) => {
    const found = balanceMap[coin.symbol] || { balance: 0, valueUSDT: 0 };

    return {
      symbol: coin.symbol,
      name: coin.name,
      balance: found.balance,
      valueUSDT: found.valueUSDT,
    };
  });
export function getSortedCoinsNoFilter(assets: AssetBalance[]): CoinResult[] {
  const balanceMap: Record<string, { balance: number; valueUSDT: number }> = {};

  assets?.forEach((a) => {
    if (!balanceMap[a.currency]) {
      balanceMap[a.currency] = { balance: 0, valueUSDT: 0 };
    }

    balanceMap[a.currency].balance += a.total;
    balanceMap[a.currency].valueUSDT += a.totalUSDT;
  });

  return buildCoinResult(balanceMap).sort((a, b) => b.valueUSDT - a.valueUSDT);
}
export function getSortedCoins(
  assets: AssetBalance[],
  page: number,
  size: number,
  search = ""
): CoinResult[] {
  const balanceMap: Record<string, { balance: number; valueUSDT: number }> = {};

  assets?.forEach((a) => {
    if (!balanceMap[a.currency]) {
      balanceMap[a.currency] = { balance: 0, valueUSDT: 0 };
    }

    balanceMap[a.currency].balance += a.total;
    balanceMap[a.currency].valueUSDT += a.totalUSDT;
  });

  let result = buildCoinResult(balanceMap);

  if (search) {
    const q = search.toLowerCase();
    result = result.filter(
      (r) =>
        r.symbol.toLowerCase().includes(q) || r.name.toLowerCase().includes(q)
    );
  }

  result.sort((a, b) => b.valueUSDT - a.valueUSDT);

  const start = (page - 1) * size;
  return result.slice(start, start + size);
}
export function getSortedCoinsForWithdrawals(
  wallets: WalletBalance
): CoinResult[] {
  const balanceMap: Record<string, { balance: number; valueUSDT: number }> = {};


    wallets.assets.forEach((a) => {
      if (!balanceMap[a.currency]) {
        balanceMap[a.currency] = { balance: 0, valueUSDT: 0 };
      }

      balanceMap[a.currency].balance += a.available;
      balanceMap[a.currency].valueUSDT += a.availableUSDT;
    });

  return buildCoinResult(balanceMap).sort((a, b) => b.valueUSDT - a.valueUSDT);
}
