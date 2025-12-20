import type { JSX } from "react";
import {
  attractiveFixed,
  BTC,
  BTCETH,
  BTCTRX,
  BTCUSDT,
  confirmOrder,
  Convert,
  efficient,
  ETH,
  ETHTRX,
  Future,
  Margin,
  multiAsset,
  orderMatched,
  orderPlacing,
  repayment,
  selectCollateral,
  Spot,
  stableAndPre,
  trustedManage,
  XRP,
  XRPSOL,
} from "~/utils";

type ailistTypes = {
  maxWinRate: string;
  symbol: string;
  icon?: JSX.Element;
  users: string;
  id: number;
};
export const miniAiList: ailistTypes[] = [
  {
    id: 1,
    maxWinRate: "+24%",
    symbol: "BTC/ETH",
    users: "85",
    icon: <img src={BTCETH} width={36} />,
  },
  {
    id: 2,
    maxWinRate: "+21%",
    symbol: "BTC/USDT",
    users: "173",
    icon: <img src={BTCUSDT} width={36} />,
  },
  {
    id: 3,
    maxWinRate: "+14%",
    symbol: "BTC/TRX",
    users: "59",
    icon: <img src={BTCTRX} width={36} />,
  },
  {
    id: 4,
    maxWinRate: "+12%",
    symbol: "ETH/TRX",
    users: "112",
    icon: <img src={ETHTRX} width={36} />,
  },
  {
    id: 5,
    maxWinRate: "+9%",
    symbol: "XRP/SOL",
    users: "61",
    icon: <img src={XRPSOL} width={36} />,
  },
];

export const overViewCards = [
  {
    id: 1,
    title: "Trade crypto with advanced tools",
    description: "Spot Trading",
    image: <img src={Spot} className="" />,
    url: "spot",
  },
  {
    id: 2,
    title: "The easiest way to trade crypto at 0 fees",
    description: "Convert",
    image: <img src={Convert} className="" />,
    url: "convert",
  },
  {
    id: 3,
    title: "Full range of crypto-derivative instruments",
    description: "Futures",
    image: <img src={Future} className="" />,
    url: "future",
  },
  {
    id: 4,
    title: "Increase your profits with leverage",
    description: "Margin",
    image: <img src={Margin} className="" />,
    url: "margin",
  },
];

export const FixedLoanWork = [
  {
    id: 1,
    title: "01. Order Placing",
    description:
      "Place a Borrow Order or select an existing order from the Borrow Market.",
    image: <img src={orderPlacing} className="w-14" />,
  },
  {
    id: 2,
    title: "02. Select Collateral",
    description:
      "Select collateral asset(s) from the list of your spot wallet assets. The Loan-to-Value (LTV) should be lower than the Initial LTV.",
    image: <img src={selectCollateral} className="w-14" />,
  },
  {
    id: 3,
    title: "03. Confirm Order",
    description:
      "Confirm the order details, including the estimated interest, terms, Margin Call LTV, etc. Your collateral assets will be frozen in your spot wallet once the order is placed.",
    image: <img src={confirmOrder} className="w-14" />,
  },
  {
    id: 4,
    title: "04. Order Matched",
    description:
      "Once the order is matched, your collateral assets will be transferred under Binance's custody. You will receive the borrowed assets minus the pre-calculated interest in your spot wallet. Please monitor the LTV closely to avoid liquidation.",
    image: <img src={orderMatched} className="w-14" />,
  },
  {
    id: 5,
    title: "05. Repayment",
    description:
      "Repay on or before the expiry date to avoid penalties. Note: A 3-times interest penalty accrues every hour during the first 24 hours after the loan order expires. Thereafter, collateral assets will be liquidated to repay the loan order.",
    image: <img src={repayment} className="w-14" />,
  },
];
export const FixedSupplierWork = [
  {
    id: 1,
    title: "01. Order Placing",
    description:
      "Place a Supply Order or select an existing order from the Supply Market.",
    image: <img src={orderPlacing} className="w-14" />,
  },
  {
    id: 2,
    title: "02. Confirm Order",
    description: `Confirm the order details, including the supply amount, terms, interest rate, etc.
Your supply assets will be frozen in your spot wallet once the order is placed. No return interest will accrue before the order is matched.`,

    image: <img src={confirmOrder} className="w-14" />,
  },
  {
    id: 3,
    title: "03. Order Matched",
    description:
      "Once the order is matched, your supply assets will be transferred from your spot wallet and will be principal-protected by Binance for the duration of the loan. Return Interest will start accruing on matching.",
    image: <img src={orderMatched} className="w-14" />,
  },
  {
    id: 4,
    title: "04. Repayment",
    description:"After the order expires, your supplied assets and the Return Interest accumulated during the supply period will be delivered to your Spot Wallet within 24 hours of the expiry date.",
    image: <img src={repayment} className="w-14" />,
  },
];

export const FixedAdvantagesList = [
  {
    id: 1,
    title: "Stable and Predictable Costs for Borrowers",
    description:
      "Lock in a fixed APR for a set duration, eliminating fluctuations and unexpected costs.",
    image: <img src={stableAndPre} className="w-14" />,
  },
  {
    id: 2,
    title: "Efficient Automated Process",
    description:
      "Enjoy a fast, easy, and automated borrowing and lending experience with auto-repay and auto-renew options available.",
    image: <img src={efficient} className="w-14" />,
  },
  {
    id: 3,
    title: "Attractive Fixed APR for Suppliers",
    description: "Supply your assets for a customizable and fixed APR.",
    image: <img src={attractiveFixed} className="w-14" />,
  },
  {
    id: 4,
    title: "Multi-Asset Collateral",
    description:
      "Borrowers can set multiple assets as collateral to reduce the risk of liquidation.",
    image: <img src={multiAsset} className="w-14" />,
  },
  {
    id: 5,
    title: "Trusted Management",
    description:"Binance manages collateral and supplied assets, providing a secure and reliable environment. Supplier's assets are principal protected (in token amount)",
    image: <img src={trustedManage} className="w-14" />,
  },
];