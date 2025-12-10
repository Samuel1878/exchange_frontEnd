import { AllCoinNames } from "~/consts/pairs";
import type { UserBalanceResult, UserData, WalletBalance } from "~/utils/types";

const calculateUserBalances = (
  user: UserData,
  prices: Record<string, number>
): UserBalanceResult=> {
  const walletTotals: Record<string, number> = {};
  let totalUSDT = 0;
  const walletDetails = user.UserWallet.map((wallet) => {
    let walletUSDT = 0;
    const assets = wallet.UserAsset.map((asset) => {
      const balance =
        parseFloat(asset.AvailableBalance) + parseFloat(asset.LockedBalance);
      const assetUSDT = balance * (prices[asset.Currency] ?? 0);
      walletUSDT += assetUSDT;
      return {
        currency: asset.Currency,
        balance,
        valueUSDT: assetUSDT,
      };
    });
    walletTotals[wallet.WalletType] = walletUSDT;
    totalUSDT += walletUSDT;
    return {
      walletType: wallet.WalletType,
      assets,
      walletUSDT,
    };
  });
  return {
    walletTotals,
    totalUSDT,
    walletDetails,
  };
};
function getSortedCoins(
  walletDetails: WalletBalance[],
  page: number,
  size: number,
  search = ""
) {
  const balanceMap: Record<string, { balance: number; valueUSDT: number }> = {};

  walletDetails.forEach((w) => {
    w.assets.forEach((a) => {
      if (!balanceMap[a.currency]) {
        balanceMap[a.currency] = { balance: 0, valueUSDT: 0 };
      }
      balanceMap[a.currency].balance += a.balance;
      balanceMap[a.currency].valueUSDT += a.valueUSDT;
    });
  });

  let result = Object.entries(AllCoinNames).map(([key, coin])=>{
    const found = balanceMap[coin.symbol] || {balance:0, valueUSDT:0};
    return {
      symbol:coin.symbol,
      name:coin.name,
      balance:found.balance,
      valueUSDT:found.valueUSDT
    }
  })

  if (search) {
    result = result.filter(
      (r) =>
        r.symbol.toLowerCase().includes(search.toLowerCase()) ||
        r.name.toLowerCase().includes(search.toLowerCase())
    );
  }
  result = result.sort((a, b)=> b.valueUSDT - a.valueUSDT)

  const start = (page - 1) * size;
  return result.slice(start, start + size);
}

export { calculateUserBalances, getSortedCoins };