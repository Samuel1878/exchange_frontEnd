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

type CoinResult = {
  symbol: string;
  name: string;
  balance: number;
  valueUSDT: number;
};
type CoinSortedResult = {
  symbol: string;
  name: string;
  balance: number;
  valueUSDT: number;
};

const buildCoinResult = (
  balanceMap: Record<string, AssetBalance>
): AssetBalance[] =>
  Object.values(AllCoinNames).map((coin) => {
    const found = balanceMap[coin.symbol] || {
      total: 0,
      totalUSDT: 0,
      available: 0,
      availableUSDT: 0,
      locked: 0,
      lockedUSDT: 0,
    };

    return {
      currency: coin.symbol,
      name: coin.name,
      total:found.total,
      totalUSDT:found.totalUSDT,
      available:found.available,
      availableUSDT:found.availableUSDT,
      locked:found.locked,
      lockedUSDT:found.lockedUSDT

    };
  });
  
export function getSortedCoinsNoFilter(assets: AssetBalance[]): AssetBalance[] {
  const balanceMap: Record<string, AssetBalance> = {};

   assets?.forEach((a) => {
     if (!balanceMap[a.currency]) {
       balanceMap[a.currency] = {
         total: 0,
         totalUSDT: 0,
         available: 0,
         availableUSDT: 0,
         locked: 0,
         lockedUSDT: 0,
       };
     }
     balanceMap[a.currency].total += a.total;
     balanceMap[a.currency].totalUSDT += a.totalUSDT;
     balanceMap[a.currency].available += a.available;
     balanceMap[a.currency].availableUSDT += a.availableUSDT;
     balanceMap[a.currency].locked += a.locked;
     balanceMap[a.currency].lockedUSDT += a.lockedUSDT;
   });
  return buildCoinResult(balanceMap).sort((a, b) => b.availableUSDT - a.availableUSDT);
}
export function getSortedCoins(
  assets: AssetBalance[],
  page: number,
  size: number,
  search = ""
): AssetBalance[] {
  const balanceMap: Record<string, AssetBalance> = {};

  assets?.forEach((a) => {
    if (!balanceMap[a.currency]) {
      balanceMap[a.currency] = { total: 0, totalUSDT: 0 , available:0, availableUSDT:0, locked:0, lockedUSDT:0};
    }
    balanceMap[a.currency].total += a.total;
    balanceMap[a.currency].totalUSDT += a.totalUSDT;
    balanceMap[a.currency].available += a.available;
    balanceMap[a.currency].availableUSDT += a.availableUSDT;
    balanceMap[a.currency].locked +=a.locked;
    balanceMap[a.currency].lockedUSDT +=a.lockedUSDT
  });

  let result = buildCoinResult(balanceMap);

  if (search) {
    const q = search.toLowerCase();
    result = result.filter(
      (r) =>
        r.currency.toLowerCase().includes(q) || r.name.toLowerCase().includes(q)
    );
  }

  result.sort((a, b) => b.availableUSDT - a.availableUSDT);

  const start = (page - 1) * size;
  return result.slice(start, start + size);
}


export function getSortedCoinsForWithdrawals(wallets: WalletBalance): AssetBalance[] {
  const balanceMap: Record<string, AssetBalance> = {};

  wallets.assets?.forEach((a) => {
    if (!balanceMap[a.currency]) {
      balanceMap[a.currency] = { total: 0, totalUSDT: 0 , available:0, availableUSDT:0, locked:0, lockedUSDT:0};
    }
    balanceMap[a.currency].total += a.total;
    balanceMap[a.currency].totalUSDT += a.totalUSDT;
    balanceMap[a.currency].available += a.available;
    balanceMap[a.currency].availableUSDT += a.availableUSDT;
    balanceMap[a.currency].locked +=a.locked;
    balanceMap[a.currency].lockedUSDT +=a.lockedUSDT
  });

  return buildCoinResult(balanceMap).sort((a, b) => b.availableUSDT - a.availableUSDT);
}
