import { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import { miniCoinList } from "~/consts/miniLists";
import { IoIosArrowForward } from "react-icons/io";
import SlotCounter from "react-slot-counter"
import { AllMarketTickerContext } from "~/context/socketContext/AllMarketTickerContext";
import { useAppSelector } from "~/utils/redux";
import { selectTopTickers, type TickSliceType } from "~/context/slices/allMarketTicker";
import { Loader } from "lucide-react";
import { formatPrice } from "../charts/util";
import { CoinPairs } from "~/consts/pairs";
import { Coins } from "~/utils";

enum lists {
  coin = "coin",
  nft = "nft",
  // stock = "stock",
}

export default function HomeMiniChart() {
  const [focus, setFocus] = useState<lists>(lists.coin);
   const {switchStream} = useContext(AllMarketTickerContext)
   const tickers = useAppSelector(selectTopTickers);
  
  
  useEffect(()=>{
    switchStream([
      "btcusdt@ticker",
      "ethusdt@ticker",
      "solusdt@ticker",
      "xrpusdt@ticker",
      "dogeusdt@ticker",
    ]);
  },[]);
  const BuildMiniPrice = (data) => {

  return data?.map((e: TickSliceType, i) => {
    return (
      <div key={i} className="flex flex-row w-full my-5 ">
        <div className="flex flex-row flex-4 justify-between">
          <div className="flex gap-2 items-center">
            <img src={Coins[CoinPairs[e?.symbol?.toLowerCase()].names[0]]} width={30} className="rounded-full overflow-hidden"/>
            <p className="text-md text-gray-50 font-bold">
              {CoinPairs[e?.symbol?.toLowerCase()]?.names[0]}
            </p>
            <p className="text-sm font-light text-gray-400">
              {CoinPairs[e?.symbol?.toLowerCase()]?.names[2]}
            </p>
          </div>
          {/* <SlotCounter value={e?.price} /> */}
          <p className="text-gray-50 font-bold lg:text-lg">
            $ {formatPrice(Number(e?.lastPrice)) || 0.0}
          </p>
        </div>
        <div className="flex-1 flex justify-end">
          <p
            className={`text-lg font-semibold  ${e?.priceChangePercent?.startsWith("+", 0) ? "text-green-400" : " text-red-500"}`}
          >
            {e?.priceChangePercent || 0.0}%
          </p>
        </div>
      </div>
    );
  });

  }
  return (
    <div className="bg-gray-900 flex flex-col lg:min-w-md items-center xl:min-w-lg md:bg-gray-800 md:rounded-2xl md:p-4 md:px-8 md:mx-8 lg:mx-4">
      <div className="w-full flex items-center justify-center gap-4 md:justify-between">
        <div className="flex items-center justify-center gap-4 md:justify-start">
          <button
          onClick={() => setFocus(lists.coin)}
          className={`p-2 ${focus === lists.coin ? "border-b-2 border-b-amber-300" : "border-0"}`}
        >
          <p
            className={`text-md font-bold ${focus === lists.coin ? "text-gray-50" : "text-gray-400"}`}
          >
            Top Listing
          </p>
        </button>
        <button
          onClick={() => setFocus(lists.nft)}
          className={`p-2 ${focus === lists.nft ? "border-b-2 border-b-amber-300" : "border-0"}`}
        >
          <p
            className={`text-md font-bold  ${focus === lists.nft ? "text-gray-50" : "text-gray-400"}`}
          >
            NFTs
          </p>
        </button>
        </div>
       
        <Link to={"market"} className="text-md font-thin md:flex items-center gap-2 hidden text-gray-500">
          View more <IoIosArrowForward size={14} color="rgba(140,140,140,.7)"/>

        </Link>
      </div>
      {lists.coin === focus ? (
        <div className="w-full">
          {tickers.length ? BuildMiniPrice(tickers):<Loader/>}
        </div>
      ) : (
        <div></div>
      )}
      <Link to={"market"} className="font-thin flex items-center text-sm md:hidden">
        View More <IoIosArrowForward size={14} color="rgba(140,140,140,.7)"/>

      </Link>
    </div>
  );
}
