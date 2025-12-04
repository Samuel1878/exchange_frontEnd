import { GiReceiveMoney } from "react-icons/gi";
import { RiExchange2Fill, RiGlobalFill } from "react-icons/ri";

import { IoGrid } from "react-icons/io5";
import { BiSupport } from "react-icons/bi";
import { BiDownload } from "react-icons/bi";
import { RiBarChart2Fill } from "react-icons/ri";
import { BsCurrencyExchange } from "react-icons/bs";
import type { JSX } from "react";
import { SiParitysubstrate } from "react-icons/si";
import { AiFillQuestionCircle } from "react-icons/ai";
import { FaLightbulb } from "react-icons/fa";
import { FaFileContract } from "react-icons/fa6";
import { GiTimeTrap } from "react-icons/gi";
import { GrMoney } from "react-icons/gr";
import { GiWallet } from "react-icons/gi";
import { FaHandHoldingHeart } from "react-icons/fa";
import { LucideHandCoins } from "lucide-react";

export type menu = {
  value: string;
  label: string;
  description?: string;
  icon?: JSX.Element;
  hasMore?: boolean | false;
};

export const topNavMenu: menu[] = [
  {
    value: "deposit",
    label: "deposit",
    icon: <GiWallet size={23} color="rgba(120,130,150,1)" />,
  },
  {
    value: "market",
    label: "market",
    icon: <RiBarChart2Fill size={26} color="rgba(120,130,150,1)" />,
  },
  {
    value: "ai",
    label: "ai",
    icon: <FaLightbulb size={23} color="rgba(120,130,150,1)" />,
  },

  {
    value: "trade",
    label: "trade",
    hasMore: true,
    icon: <BsCurrencyExchange size={23} color="rgba(120,130,150,1)" />,
  },
  {
    value: "earn",
    label: "earn",
    hasMore: true,
    icon: <GiReceiveMoney size={23} color="rgba(120,130,150,1)" />,
  },
  {
    value: "more",
    label: "more",
    hasMore: true,
    icon: <IoGrid size={23} color="rgba(120,130,150,1)" />,
  },
];

export const verticalNavMenu: menu[] = [
  ...topNavMenu,
  {
    value: "/#faq",
    label: "faq",
    icon: <AiFillQuestionCircle size={23} color="rgba(120,130,150,1)" />,
  },
  {
    value: "support",
    label: "24/7 chat support",
    icon: <BiSupport size={23} color="rgba(120,130,150,1)" />,
  },
  {
    value: "/#download",
    label: "download",
    icon: <BiDownload size={23} color="rgba(120,130,150,1)" />,
  },
  {
    value: "/",
    label: "language",

    icon: <RiGlobalFill size={23} color="rgba(120,130,150,1)" />,
  },
];

export const tradeMenuList: menu[] = [
  {
    value: "trade/convert/usdt",
    label: "Convert",
    description: "The easiest way to trade at all sizes",
    icon: <RiExchange2Fill size={30} color="rgba(120,130,150,1)" />,
  },
  {
    value: "trade/btcusdt?type=future",
    label: "Future",
    description: "Short cycle, quick returns",
    icon: <GiTimeTrap size={30} color="rgba(120,130,150,1)" />,
  },
  {
    value: "trade/btcusdt?type=spot",
    label: "Spot",
    description: "Buy and sell on the spot market with advanced tools",
    icon: <BsCurrencyExchange size={30} color="rgba(120,130,150,1)" />,
  },
  {
    value: "trade/btcusdt?type=cross",
    label: "Margin",
    description: "Increase your profits with leverage",
    icon: <FaFileContract size={30} color="rgba(120,130,150,1)" />,
  },
];

export const earnMenuList: menu[] = [
  {
    value: "finance/loans",
    label: "Loans",
    description: "Access quick and easy loans with competitive rates",
    icon: <GrMoney size={30} color="rgb(120,130,150)" />,
  },
  {
    value: "finance/earn",
    icon: <GiReceiveMoney size={50} color="rgba(120,130,150,1)" />,
    label: "Advanced Earn",
    description:
      "Maximize your returns with our advanced yield investment products",
  },
];

export const moreMenuList: menu[] = [
  {
    value: "ico",
    label: "ICO",
    icon: <LucideHandCoins size={30} color="rgba(120,130,150,1)" />,
    description:
      "Initial coin offerring with the best price for HODLers",
  },
  {
    value: "trends",
    icon: <RiBarChart2Fill size={30} color="rgba(120,130,150,1)" />,
    label: "Market Trends",
    description: "Expand your knowledge and get the latest insights",
  },
  {
    value: "charity",
    label: "Charity",
    icon: <FaHandHoldingHeart size={30} color="rgba(120,130,150,1)" />,
    description:
      "Blockchain empowers charity to be more transparent, efficient, and traceable",
  },
];

export const dropdownMenus = {
  trade: tradeMenuList,
  earn: earnMenuList,
  more: moreMenuList,
};
