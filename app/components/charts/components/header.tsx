import type { TickerSteams } from "~/context/slices/IndividualMiniTicker";
import { useAppDispatch, useAppSelector } from "~/utils/redux";
import { formatPrice } from "../util";
import { Link } from "react-router";
import type { aggTradeStreams } from "~/context/slices/tradeSlice";

export default function ({pair}) {
  const dispatch = useAppDispatch()
  const ticker :TickerSteams= useAppSelector((state)=>state.tickerStreamsPerDay.ticker);
  const aggTrade:aggTradeStreams[] = useAppSelector((state)=>state.aggTrade.aggTrade);
  return (
    <header className="flex justify-between md:rounded-b-sm px-4 pb-2 bg-gray-900 lg:bg-gray-950 items-end md:pt-4 md:items-center">
      <div className="space-y-2 flex flex-col md:items-center flex-1 md:flex-row md:justify-between md:mb-2">
        <div className="flex items-center gap-2">
          <img src="../../assets/coins/btc_eth.png" className="w-10" />
          <div>
            <p className="text-md font-bold md:text-lg text-gray-50">{pair}</p>
            <Link to={""} className="text-gray-400 hidden md:block">
              Price
            </Link>
          </div>
        </div>
        <div className="">
          <p className={`text-3xl font-bold md:text-xl ${aggTrade[aggTrade.length - 1].isBuyerMarket? "text-green-400":"text-red-500"}`}>
            {Number(aggTrade[aggTrade.length - 1]?.price).toFixed(2)}
          </p>

          <p className="hidden md:block text-xs text-gray-50">
            ${" "}
            {formatPrice(
              Number(Number(aggTrade[aggTrade.length - 1]?.price).toFixed(2))
            )}
          </p>
          <div className="flex md:hidden gap-2 ">
            <p className="text-sm text-gray-50">
              ${" "}
              {formatPrice(
                Number(Number(aggTrade[aggTrade.length - 1]?.price).toFixed(2))
              )}
            </p>
            <p
              className={`text-sm ${ticker?.priceChangePercent?.startsWith("+", 0) ? "text-green-500" : " text-red-500"}`}
            >
              {Number(ticker?.priceChangePercent)}%
            </p>
          </div>
        </div>
        <div className="hidden md:block">
          <p className="text-xs text-gray-500">24h Change</p>
          <div className="flex items-center gap-2">
            <p
              className={`font-bold text-xs ${ticker?.priceChange?.startsWith("+", 0) ? "text-green-500" : " text-red-500"}`}
            >
              {Number(ticker?.priceChange).toFixed(2)}
            </p>
            <p
              className={` text-xs ${ticker?.priceChangePercent?.startsWith("+", 0) ? "text-green-500" : " text-red-500"}`}
            >
              {Number(ticker?.priceChangePercent)}%
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-between flex-1 ">
        <div className="space-y-2 md:flex md:flex-1 md:justify-around">
          <div>
            <p className="text-gray-500 text-xs">24h High</p>
            <p className="text-xs text-gray-50">
              {Number(ticker?.highPrice).toFixed(2)}
            </p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">24h Low</p>
            <p className="text-xs text-gray-50">
              {Number(ticker?.lowPrice).toFixed(2)}
            </p>
          </div>
        </div>
        <div className="space-y-2 md:flex md:flex-1 md:justify-around">
          <div>
            <p className="text-gray-500 text-xs">24h Vol(BTC)</p>
            <p className="text-xs text-gray-50">
              {formatPrice(Number(Number(ticker?.baseVolume).toFixed(2)))}
            </p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">24h Vol(USDT)</p>
            <p className="text-xs text-gray-50">
              {formatPrice(Number(Number(ticker?.quoteVolume).toFixed(2)))}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
