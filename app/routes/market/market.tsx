import FooterSection from "~/components/footer";
// import MarketView from "~/components/marketView";

import { useContext, useEffect, useState } from "react";
import { FaRegStar } from "react-icons/fa6";
import { Link, useNavigate } from "react-router";
import { CoinPairs } from "~/consts/pairs";
import { formatPrice } from "~/components/charts/util/index";
import { formatTotalPrice } from "~/utils/helpers";
import { Coins } from "~/utils";
import { useTickers } from "~/hooks/useTickers";
import { useTickersStore, type Ticker } from "~/store/useTickersStore";
import type { Route } from "./+types/market";
import { LOCAL_URL } from "~/consts";
export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const response = await fetch(LOCAL_URL + "/global", {
    method: "GET",
  });

  const data = await response.json();
  if (data) {
    // console.log("")
    return { data };
  }
}
const cryptoTabs = [
  //   { label: "Favorites", Id: "1" },
  { label: "Crypto", Id: "1" },
  { label: "US_stocks", Id: "2" },
  { label: "FX", Id: "3" },
];
const TR = ({ children }) => (
  <th className="hidden lg:table-cell text-right px-4 py-2">{children}</th>
);
const TD = ({ children }) => (
  <td className="hidden md:table-cell text-right px-4 py-3 font-semibold text-md lg:text-lg text-gray-50">
    {children}
  </td>
);
export default function Market({ loaderData }: Route.ComponentProps) {
  const [activeTab, setActiveTab] = useState("Crypto");
  const navigate = useNavigate();
  const { data } = loaderData;
  // console.log(data);
  useTickers([
    "btcusdt@ticker",
    "ethusdt@ticker",
    "solusdt@ticker",
    "xrpusdt@ticker",
    "dogeusdt@ticker",
    "adausdt@ticker",
    "avaxusdt@ticker",
    "linkusdt@ticker",
    "dotusdt@ticker",
    "ltcusdt@ticker",
    "shibusdt@ticker",
    "etcusdt@ticker",
    "manausdt@ticker",
    "uniusdt@ticker",
    "bchusdt@ticker",
    "trxusdt@ticker",
    "xlmusdt@ticker",
    "atomusdt@ticker",
    "nearusdt@ticker",
    "pepeusdt@ticker",
  ]);
  const { tickers } = useTickersStore();
  const BuildMarketRow = (tickers) => {
    return Object?.values(tickers)?.map((ticker: Ticker) => {
      return (
        <tr
          key={ticker?.symbol}
          className="cursor-pointer hover:bg-gray-800 lg:hover:bg-gray-900 "
          onClick={() => navigate(`${ticker?.symbol.toLowerCase()}`)}
        >
          <td className="flex items-center space-x-2 px-2 md:px-4 py-5">
            <FaRegStar className="md:w-9 md:h-6 w-5 h-3" />
            <img
              src={Coins[CoinPairs[ticker?.symbol?.toLowerCase()]?.names[0]]}
              width={30}
              className="rounded-full overflow-hidden"
            />
            <span className="font-light text-gray-400 text-xs md:text-md">
              <span className="font-bold text-gray-50 lg:text-sm md:text-lg mr-1">
                {CoinPairs[ticker?.symbol?.toLowerCase()]?.names[0]}
              </span>
              {CoinPairs[ticker?.symbol?.toLowerCase()]?.names[2] || ""}
            </span>
          </td>
          <td className="text-right px-4 py-3">
            <p className="text-gray-50 font-bold  text-sm md:text-lg ">
              {formatPrice(Number(ticker?.lastPrice)) || "0.0000"}
            </p>
            <p className="text-gray-400 text-xs md:text-sm">
              ${formatPrice(Number(ticker?.lastPrice)) || "0.0000"}
            </p>
          </td>
          <td
            className={`text-right px-2 py-3 font-semibold text-sm md:text-md ${
              ticker?.priceChangePercent?.startsWith("-")
                ? "text-red-500"
                : "text-green-400"
            }`}
          >
            <p className="">{formatPrice(Number(ticker?.priceChange))}</p>
            {ticker?.priceChangePercent}%
          </td>
          <TD>{formatPrice(Number(ticker?.highPrice))}</TD>
          <TD>{formatPrice(Number(ticker?.lowPrice))}</TD>
          <TD> {formatTotalPrice(Number(ticker?.baseVolume))}</TD>
          <TD>${formatTotalPrice(Number(ticker?.quoteVolume))}</TD>
        </tr>
      );
    });
  };
  return (
    <main className="bg-gray-900 lg:bg-gray-950 flex flex-col min-h-svh overflow-hidden justify-between">
      <section id="hero" className="flex flex-col lg:items-center flex-1 ">
        <article
          id="hero1"
          className="flex flex-col gap-4 lg:gap-y-8 lg:max-w-6xl xl:min-w-6xl"
        >
          <div className="lg:max-w-6xl md:max-w-7xl">
            <div className=" text-gray-300 p-4 md:p-5 space-y-10">
              {/* Tabs */}
              <h1 className="text-gray-100 font-semibold font-xl lg:text-xl">
                Market Overview
              </h1>
              <div className="space-y-4">
                <div className="flex flex-1 items-center justify-around">
                  <div className="flex flex-col items-center">
                    <p className="text-lg font-bold text-gray-100 lg:text-2xl">
                      ${formatTotalPrice(data?.market_cap_usd)}
                    </p>
                    <p className="font-medium text-xs text-gray-500 md:text-sm">
                      Total Market Cap
                    </p>
                  </div>
                  <div className="flex flex-col items-center">
                    <p className="text-lg font-bold text-gray-100 lg:text-2xl">
                      ${formatTotalPrice(data?.volume_24h_usd)}
                    </p>
                    <p className="font-medium text-xs text-gray-500 md:text-sm">
                      24h Volume
                    </p>
                  </div>
                  <div className="flex flex-col items-center">
                    <p className="text-lg font-bold text-gray-100 lg:text-2xl">
                      ${formatTotalPrice(data?.market_cap_ath_value)}
                    </p>
                    <p className="font-medium text-xs text-gray-500 md:text-sm">
                      Market Value(ath)
                    </p>
                  </div>
                </div>
                <div className="flex flex-1 items-center justify-around border-1 border-gray-600 p-4 rounded-md">
                  <div className="flex flex-col items-center">
                    <p
                      className={`text-sm lg:text-lg font-bold ${data?.market_cap_change_24h?.toString().startsWith("-", 0) ? "text-red-500" : "text-green-400"} `}
                    >
                      {formatTotalPrice(data?.market_cap_change_24h)}%
                    </p>
                    <p className="font-medium text-xs text-gray-500 md:text-sm">
                      24h Change
                    </p>
                  </div>
                  <div className="flex flex-col items-center">
                    <p
                      className={`text-sm lg:text-lg font-bold ${data?.volume_24h_change_24h?.toString().startsWith("-", 0) ? "text-red-500" : "text-green-400"} `}
                    >
                      {formatTotalPrice(data?.volume_24h_change_24h)}%
                    </p>
                    <p className="font-medium text-xs text-gray-500 md:text-sm">
                      24h Volume
                    </p>
                  </div>
                  <div className="flex flex-col items-center">
                    <p className="text-sm font-bold lg:text-lg text-gray-100">
                      ${formatTotalPrice(data?.volume_24h_ath_value)}
                    </p>
                    <p className="font-medium text-xs text-gray-500 md:text-sm">
                      24h Value
                    </p>
                  </div>
                  <div className="flex flex-col items-center">
                    <p className="text-sm lg:text-lg font-bold text-gray-100">
                      {formatTotalPrice(data?.bitcoin_dominance_percentage)}%
                    </p>
                    <p className="font-medium text-xs text-gray-500 md:text-sm">
                      BTC dominance
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex space-x-4 mb-6">
                {cryptoTabs.map(({ label }) => (
                  <button
                    key={label}
                    onClick={() => setActiveTab(label)}
                    className={`px-3 py-1 ${
                      activeTab === label
                        ? "text-gray-100 border-b-2 border-b-amber-300"
                        : "hover:text-gray-100"
                    }`}
                  >
                    {label.replaceAll("_", " ")}
                  </button>
                ))}
              </div>

              {/* Table */}

              <div className="">
                <table className="min-w-full">
                  <thead className=" text-gray-400 text-xs md:text-md">
                    <tr>
                      <th className="text-left px-4 py-2">Name</th>
                      <th className="text-right px-4 py-2">Price</th>
                      <th className="text-right md:px-4 py-2">24h Change</th>
                      <TR>24h High</TR>

                      <TR> 24h low</TR>

                      <TR> 24h Volume</TR>

                      <TR> 24h Vol(USDT)</TR>
                    </tr>
                  </thead>
                  <tbody>
                    {BuildMarketRow(tickers)}
                    {/* {activeTab === "Crypto" ?Object?.values(tickers).map((ticker)=><BuildMarketRow ticker={ticker}/>) : null} */}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </article>
      </section>
      <FooterSection />
    </main>
  );
}
