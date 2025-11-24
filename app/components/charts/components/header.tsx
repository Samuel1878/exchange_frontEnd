import type { TickerSteams } from "~/context/slices/IndividualMiniTicker";
import { useAppDispatch, useAppSelector } from "~/utils/redux";
import { formatPrice } from "../util";
import { Link } from "react-router";
import type { aggTradeStreams } from "~/context/slices/tradeSlice";
import { CoinPairs } from "~/consts/pairs";
import { FaRegStar } from "react-icons/fa6";
import { FiArrowUpRight } from "react-icons/fi";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import { useTickers } from "~/hook/useTickers";
import { useTickersStore } from "~/store/useTickersStore";
import { useAggTradeStore } from "~/store/useAggTradeStore";

export default function ({pair , openPairs, setOpenPairs}) {
  // const ticker :TickerSteams= useAppSelector((state)=>state.tickerStreamsPerDay.ticker);
  const {tickers} = useTickersStore();
  const {trades} = useAggTradeStore()
  // const aggTrade:aggTradeStreams[] = useAppSelector((state)=>state.aggTrade.aggTrade);
  return (
    <header className="flex justify-between md:rounded-b-sm px-4 pb-2 lg:mt-1 bg-gray-900 lg:rounded-md lg:bg-gray-950 items-end md:pt-4 lg:pt-3 md:items-center">
      <div className="space-y-2 flex flex-col md:items-center flex-1 md:flex-4 md:flex-row md:justify-between md:mb-2">
        <div className="flex items-center gap-2">
          <div className="hidden md:inline xl:mx-2 cursor-pointer">
            <FaRegStar color="#777" size={25} />
          </div>
          <img src="../../assets/coins/btc_eth.png" className="w-10" />
          <div>
            <p className="text-md font-bold md:text-2xl text-gray-50 flex items-center">
              {CoinPairs[pair].label}
              {openPairs ? (
                <BiSolidUpArrow
                  onClick={() => setOpenPairs(false)}
                  className="block lg:hidden ml-3 cursor-pointer"
                  color="#fff"
                  size={15}
                />
              ) : (
                <BiSolidDownArrow
                  onClick={() => setOpenPairs(true)}
                  className="block lg:hidden ml-3 cursor-pointer"
                  color="#fff"
                  size={15}
                />
              )}
            </p>
            <Link
              to={`/market/${pair}`}
              className="text-gray-400 hidden md:flex md:items-center md:gap-1 "
            >
              <span className="hidden md:block ">
                {CoinPairs[pair].names[2]}
              </span>
              Price
              <FiArrowUpRight size={19} color="#888" />
            </Link>
          </div>
        </div>
        <div className="">
          <p
            className={`text-3xl font-bold md:text-xl xl:text-2xl ${trades[0]?.maker ? "text-green-400" : "text-red-500"}`}
          >
            {formatPrice(Number(trades[0]?.price))}
          </p>

          <p className="hidden md:block text-xs text-gray-50">
            $ {formatPrice(Number(Number(trades[0]?.price)?.toFixed(2)))}
          </p>
          <div className="flex md:hidden gap-2 ">
            <p className="text-sm text-gray-50">
              $ {formatPrice(Number(Number(trades[0]?.price).toFixed(2)))}
            </p>
            <p
              className={`text-sm  ${tickers[pair]?.priceChangePercent?.startsWith("-", 0) ? "text-red-500" : " text-green-400"}`}
            >
              {Number(tickers[pair]?.priceChangePercent)}%
            </p>
          </div>
        </div>
        <div className="hidden md:block">
          <p className="text-xs text-gray-500">24h Change</p>
          <div className="flex items-center gap-2">
            <p
              className={`font-bold text-xs xl:text-md lg:font-semibold ${tickers[pair]?.priceChange?.startsWith("-", 0) ? "text-red-500" : " text-green-400"}`}
            >
              {Number(tickers[pair]?.priceChange)?.toFixed(2) || 0.0}
            </p>
            <p
              className={` text-xs xl:text-md lg:font-semibold ${tickers[pair]?.priceChangePercent?.startsWith("-", 0) ? "text-red-500" : " text-green-400"}`}
            >
              {Number(tickers[pair]?.priceChangePercent) || 0.0}%
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-between flex-1 md:flex-3 lg:flex-4">
        <div className="space-y-2 md:flex md:flex-1 md:justify-around">
          <div>
            <p className="text-gray-500 text-xs ">24h High</p>
            <p className="text-xs text-gray-50 xl:text-md xl:font-bold lg:font-semibold">
              {Number(tickers[pair]?.highPrice)?.toFixed(2) || 0.0}
            </p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">24h Low</p>
            <p className="text-xs text-gray-50 xl:text-md xl:font-bold lg:font-semibold">
              {Number(tickers[pair]?.lowPrice)?.toFixed(2) || 0.0}
            </p>
          </div>
        </div>
        <div className="space-y-2 md:flex md:flex-1 md:justify-around">
          <div>
            <p className="text-gray-500 text-xs">
              24h Vol({CoinPairs[pair].names[0]})
            </p>
            <p className="text-xs text-gray-50 xl:text-md xl:font-bold lg:font-semibold">
              {formatPrice(Number(Number(tickers[pair]?.baseVolume)?.toFixed(2))) ||
                0.0}
            </p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">24h Vol(USDT)</p>
            <p className="text-xs text-gray-50 xl:font-bold lg:font-semibold">
              {formatPrice(Number(Number(tickers[pair]?.quoteVolume)?.toFixed(2))) ||
                0.0}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
