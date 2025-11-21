import { Slider } from "~/components/ui/slider";
import { CoinPairs } from "~/consts/pairs";
import { TradeButton } from "./buttons";
import { useSearchParams } from "react-router";

export default function ({ isLimit, type, pair ,setIsLimit}) {
    let [searchParams, setSearchParams] = useSearchParams();

  return (
    <div className="flex flex-col w-full h-full">
      <div className="p-3 border-b-2 border-b-gray-800 w-full flex gap-6">
        <div
          onClick={() => setSearchParams({ type: "spot" })}
          className={`font-semibold text-lg cursor-pointer ${type === "spot" ? "text-gray-50" : "text-gray-700"}`}
        >
          Spot
        </div>
        <div
          onClick={() => setSearchParams({ type: "cross" })}
          className={`font-semibold text-lg cursor-pointer  ${type === "cross" ? "text-gray-50" : "text-gray-700"}`}
        >
          Cross
        </div>
        <div
          onClick={() => setSearchParams({ type: "future" })}
          className={`font-semibold text-lg cursor-pointer ${type === "future" ? "text-gray-50" : "text-gray-700"}`}
        >
          Future
        </div>
      </div>
      <div className="p-3 flex gap-6">
        <div
          onClick={() => setIsLimit(false)}
          className={`font-semibold text-md cursor-pointer  ${!isLimit ? "text-gray-50" : "text-gray-600"}`}
        >
          Market
        </div>
        <div
          onClick={() => setIsLimit(true)}
          className={`font-semibold text-md cursor-pointer ${isLimit ? "text-gray-50" : "text-gray-600"}`}
        >
          {type==="future"? "Time":"Limit"}
        </div>
      </div>
      <div className="flex gap-3 2xl:gap-6 px-3 2xl:px-6 h-full pb-3">
        <div className="flex-1 flex h-full w-full flex-col justify-between">
          <div className="h-full w-full space-y-2">
            <div
              className={`border-2 border-gray-700 ${isLimit ? "bg-gray-950 hover:border-amber-400" : "bg-gray-900"} group rounded-md w-full h-12 flex justify-between px-2 items-center  `}
            >
              <p className="text-gray-500">Price</p>
              <input
                className="w-full h-full focus:outline-0 text-gray-100"
                dir="rtl"
                placeholder={isLimit ? "USDT" : "Market Price"}
                disabled={!isLimit}
              />
            </div>
            <div className="border-2 border-gray-700 group rounded-md w-full h-12 flex justify-between px-2 items-center hover:border-amber-400">
              <p className="text-gray-500">Amount</p>
              <input
                className="w-full h-full focus:outline-0 text-gray-100"
                dir="rtl"
                placeholder={CoinPairs[pair].names[0]}
              />
            </div>
            <Slider max={100} className="mt-4" />
          </div>
          <div className="w-full space-y-2">
            <div className="flex w-full justify-between">
              <p className="text-sm font-light text-gray-600">Avbl</p>
              <p className="text-sm text-gray-50">- USDT</p>
            </div>
            <div
              className={`w-full justify-between ${type === "spot" ? "flex" : "hidden"}`}
            >
              <p className="text-sm font-light text-gray-600">Max Buy</p>
              <p className="text-sm text-gray-50">
                --{CoinPairs[pair].names[0]}
              </p>
            </div>
            <TradeButton
              textStyle="font-semibold text-lg text-gray-50"
              style="bg-green-400 w-full h-12"
              label="Buy"
              action={() => console.log("Buy")}
            />
          </div>
        </div>
        <div className="flex-1 flex w-full flex-col justify-between">
          <div className="h-full w-full space-y-2">
            <div
              className={`border-2 border-gray-700 ${isLimit ? "bg-gray-950 hover:border-amber-400" : "bg-gray-900"} rounded-md w-full h-12 flex justify-between px-2 items-center`}
            >
              <p className="text-gray-500">Price</p>
              <input
                className="w-full h-full focus:outline-0 text-gray-100"
                dir="rtl"
                placeholder={isLimit ? "USDT" : "Market Price"}
                disabled={!isLimit}
              />
            </div>
            <div className="border-2 border-gray-700 rounded-md w-full h-12 flex justify-between px-2 items-center hover:border-amber-400">
              <p className="text-gray-500">Amount</p>
              <input
                className="w-full h-full focus:outline-0 text-gray-100"
                dir="rtl"
                placeholder={CoinPairs[pair].names[0]}
              />
            </div>
            <Slider max={100} className="mt-4" />
          </div>
          <div className="w-full space-y-2">
            <div className="flex w-full justify-between">
              <p className="text-sm font-light text-gray-600">Avbl</p>
              <p className="text-sm text-gray-50">
                - {CoinPairs[pair].names[0]}
              </p>
            </div>
            <div
              className={`w-full justify-between ${type === "spot" ? "flex" : "hidden"}`}
            >
              <p className="text-sm font-light text-gray-600">Max Sell</p>
              <p className="text-sm text-gray-50">--USDT</p>
            </div>
            <TradeButton
              textStyle="font-semibold text-lg text-gray-50"
              style="bg-red-500 w-full h-12"
              label="Sell"
              action={() => console.log("SELL")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
