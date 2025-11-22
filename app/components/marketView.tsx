import { useContext, useEffect, useState } from "react";
import SlotCounter from "react-slot-counter";
import { FaRegStar } from "react-icons/fa6";
import { Link, useNavigate } from "react-router";
import { AllMarketTickerContext } from "~/context/socketContext/AllMarketTickerContext";
import { useAppSelector } from "~/utils/redux";
import {
  selectAllTickers,
  type sliceType,
  type TickSliceType,
} from "~/context/slices/allMarketTicker";
import { CoinPairs } from "~/consts/pairs";
import { formatPrice } from "./charts/util";
import { formatTotalPrice } from "~/utils/helpers";
import { Coins } from "~/utils";
const cryptoTabs = [
//   { label: "Favorites", Id: "1" },
  { label: "Crypto", Id: "1" },
  { label: "US_stocks", Id: "2" },
  { label: "FX", Id: "3" },
];

export default function () {
  const [activeTab, setActiveTab] = useState("Crypto");
  const navigate = useNavigate();
  const { switchStream } = useContext(AllMarketTickerContext);
  const tickers = useAppSelector(selectAllTickers);

  useEffect(() => {
    switchStream([
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
  }, []);

  const buildMarketRow = (tickers) => {
    return tickers.map((e) => {
        // console.log(e)
      return (
    
        <tr
          key={e?.symbol}
          className="cursor-pointer hover:bg-gray-800 lg:hover:bg-gray-900 "
          onClick={() => navigate(`price/${e?.symbol}`)}
        >
          <td className="flex items-center space-x-2 px-4 py-5">
            <FaRegStar className="w-9 h-6" />
            <img
              src={Coins[CoinPairs[e?.symbol?.toLowerCase()]?.names[0]]}
              width={30}
              className="rounded-full overflow-hidden"
            />
            <span className="font-light text-gray-400 text-md">
              <span className="font-bold text-gray-50 text-lg mr-1">
                {CoinPairs[e?.symbol?.toLowerCase()]?.names[0]}
              </span>
              {CoinPairs[e?.symbol?.toLowerCase()]?.names[2] || ""}
            </span>
          </td>
          <td className="text-right px-4 py-3">
            <p className="text-gray-50 font-bold  text-lg ">
              {formatPrice(Number(e?.lastPrice)) || "0.0000"}
            </p>
            <p className="text-gray-400 text-sm">
              ${formatPrice(Number(e?.lastPrice)) || "0.0000"}
            </p>
          </td>
          <td
            className={`text-right px-4 py-3 font-semibold text-md ${
              e?.priceChangePercent?.startsWith("-")
                ? "text-red-500"
                : "text-green-400"
            }`}
          >
            <p className="">{formatPrice(Number(e?.priceChange))}</p>
            {e?.priceChangePercent}%
          </td>
          <td className="hidden md:table-cell text-right px-4 py-3 font-semibold text-md lg:text-lg text-gray-50">
            {formatPrice(Number(e?.highPrice))}
          </td>
          <td className="hidden md:table-cell text-right px-4 py-3 font-semibold text-md lg:text-lg text-gray-50">
            {formatPrice(Number(e?.lowPrice))}
          </td>
          <td className="hidden lg:table-cell text-right px-4 py-3 font-semibold text-md lg:text-lg text-gray-50">
            {formatTotalPrice(Number(e?.baseVolume))}
          </td>
          <td className="hidden lg:table-cell text-right px-4 py-3 font-semibold text-md lg:text-lg text-gray-50">
            ${formatTotalPrice(Number(e?.quoteVolume))}
          </td>
        </tr>
      );
    });
  };
  return (
    <section id="hero" className="flex flex-col lg:items-center flex-1 ">
      <article
        id="hero1"
        className="flex flex-col gap-4 lg:gap-y-8 lg:max-w-6xl xl:min-w-6xl"
      >
        <div className="lg:max-w-6xl md:max-w-7xl">
          <div className=" text-gray-300 p-6 md:p-5 space-y-10">
            {/* Tabs */}
            <h1 className="text-gray-100 font-semibold font-xl lg:text-xl">
              Overview
            </h1>
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

            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className=" text-gray-400 text-md">
                  <tr>
                    <th className="text-left px-4 py-2">Name</th>
                    <th className="text-right px-4 py-2">Price</th>
                    <th className="text-right px-4 py-2">24h Change</th>
                    <th className="hidden md:table-cell text-right px-4 py-2">
                      24h High
                    </th>
                    <th className="hidden md:table-cell text-right px-4 py-2">
                      24h low
                    </th>
                    <th className="hidden lg:table-cell text-right px-4 py-2">
                      24h Volume
                    </th>
                    <th className="hidden lg:table-cell text-right px-4 py-2">
                      24h Vol(USDT)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {activeTab === "Crypto" ? buildMarketRow(tickers) : null}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}
