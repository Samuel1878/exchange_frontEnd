import { useContext, useEffect, useState } from "react"
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";
import { IoClose, IoSearch } from "react-icons/io5";
import { BsSortDown, BsSortUp, BsSortUpAlt } from "react-icons/bs";
import { AllMarketTickerContext } from "~/context/socketContext/AllMarketTickerContext";
import { useAppSelector } from "~/utils/redux";
import { selectAllTickers, type sliceType, type TickSliceType } from "~/context/slices/allMarketTicker";
import { ScrollArea } from "~/components/ui/scroll-area";
import { CoinPairs } from "~/consts/pairs";
import { formatPrice } from "../util";
import { Coins } from "~/utils";
import { useNavigate } from "react-router";
import useWindowDimensions from "~/hook/windowWidth";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "~/components/ui/drawer";
import { X } from "lucide-react";
import { useTickersStore } from "~/store/useTickersStore";
import { useTickers } from "~/hook/useTickers";
enum Filter {
    usdt = "usdt",
    spot = "spot",
    cross = "cross",
    future = "future",

}
export default function ({currentPair, isOpen, setIsOpen}) {
    const [search, setSearch] = useState<string>("");
    const [filter, setFilter] = useState<Filter>(Filter.usdt);
    const [priceSort, setPriceSort] = useState(false);
    const [changeSort, setChangeSort] = useState(false);
    // const {switchStream} = useContext(AllMarketTickerContext);
    const {tickers} = useTickersStore()
     const { width } = useWindowDimensions();
  // const dispatch = useAppDispatch();
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
    const navigation = useNavigate()
      // useEffect(() => {
      //   console.log("Send stream message for Market Data in Trade")
      //   switchStream([
      //     "btcusdt@ticker",
      //     "ethusdt@ticker",
      //     "solusdt@ticker",
      //     "xrpusdt@ticker",
      //     "dogeusdt@ticker",
      //     "adausdt@ticker",
      //     "avaxusdt@ticker",
      //     "linkusdt@ticker",
      //     "dotusdt@ticker",
      //     "ltcusdt@ticker",
      //     "shibusdt@ticker",
      //     "etcusdt@ticker",
      //     "manausdt@ticker",
      //     "uniusdt@ticker",
      //     "bchusdt@ticker",
      //     "trxusdt@ticker",
      //     "xlmusdt@ticker",
      //     "atomusdt@ticker",
      //     "nearusdt@ticker",
      //     "pepeusdt@ticker",
      //   ]);
      // }, []);
    const BuildPairs = ({data}) => {
  
          let pairs = data;
           if (search){
            pairs = data.filter((e) =>
              e?.symbol?.toLowerCase().startsWith(search?.toLowerCase())
            );
          }
          else if (priceSort){
            pairs= data.sort((a, b)=> Number(a?.lastPrice) - Number(b?.lastPrice))
           
          } else if (changeSort){
            pairs= data.sort((a, b)=>Number(a?.priceChangePercent) -Number( b?.priceChangePercent))
          
          } 
     
       
       return pairs?.map((e: TickSliceType, i) => (
         <div key={i} className="flex justify-between my-4 lg:my-2 cursor-pointer" onClick={()=>navigation(`/trade/${e?.symbol?.toLowerCase()}?type=${filter===Filter.usdt?Filter.spot:filter}`)}>
           <p className="font-semibold text-xs text-gray-50 flex gap-1">
             <img
               src={Coins[CoinPairs[e?.symbol?.toLowerCase()]?.names[0]]}
               width={15}
               className="overflow-hidden rounded-full"
             />
             {CoinPairs[e?.symbol?.toLowerCase()]?.label}
           </p>
           <p className="font-medium text-xs text-gray-50">
             {formatPrice(Number(e?.lastPrice))}
           </p>
           <p
             className={`text-xs font-medium ${e?.priceChangePercent?.startsWith("-", 0) ? "text-red-500" : "text-green-400"}`}
           >
             {Number(e?.priceChangePercent)?.toFixed(2)}%
           </p>
         </div>
       ));
       
    }
    return (
      <>
        {width > 1024 ? (
          <aside className="">
            <div className="p-3 pb-1 border-b-2 border-gray-900">
              <div className="h-10 w-full border-2 border-gray-800 rounded-md hover:border-amber-400 flex items-center">
                <IoSearch className="mx-2" color="#555" size={30} />
                <input
                  type={"text"}
                  value={search}
                  className="h-full w-full outline-0 text-gray-50"
                  onChange={(e) => setSearch(e.target.value)}
                />
                <IoClose
                  color="#555"
                  className={`mx-2 right-2 absolute ${search ? "block" : "hidden"}`}
                  size={30}
                  onClick={() => setSearch("")}
                />
              </div>
              <div className="flex mt-3 gap-2">
                <p
                  className={`font-bold text-sm xl:text-md cursor-pointer ${filter === Filter.usdt ? "text-gray-50 border-b-4 border-amber-400" : "text-gray-500"}`}
                  onClick={() => setFilter(Filter.usdt)}
                >
                  USDT
                </p>
                <p
                  className={`font-bold text-sm xl:text-md cursor-pointer ${filter === Filter.spot ? "text-gray-50 border-b-4 border-amber-400" : "text-gray-500"}`}
                  onClick={() => setFilter(Filter.spot)}
                >
                  Spot
                </p>
                <p
                  className={`font-bold text-sm xl:text-md cursor-pointer ${filter === Filter.cross ? "text-gray-50 border-b-4 border-amber-400" : "text-gray-500"}`}
                  onClick={() => setFilter(Filter.cross)}
                >
                  Margin
                </p>
                <p
                  className={`font-bold text-sm xl:text-md cursor-pointer ${filter === Filter.future ? "text-gray-50 border-b-4 border-amber-400" : "text-gray-500"}`}
                  onClick={() => setFilter(Filter.future)}
                >
                  Future
                </p>
              </div>
            </div>
            <div className="flex p-2 justify-between">
              <div
                onClick={() => setPriceSort((prev) => !prev)}
                className="text-gray-600 text-xs font-semibold flex items-center gap-1 cursor-pointer"
              >
                Price
                {priceSort ? (
                  <BsSortUpAlt size={15} />
                ) : (
                  <BsSortDown size={15} />
                )}
              </div>
              <div
                onClick={() => setChangeSort((prev) => !prev)}
                className="text-gray-600 text-xs font-semibold flex items-center gap-1 cursor-pointer"
              >
                24h Change
                {changeSort ? (
                  <BsSortUpAlt size={15} />
                ) : (
                  <BsSortDown size={15} />
                )}
              </div>
            </div>
            <ScrollArea className="h-94 w-full lg:px-2 xl:px-3 pr-3">
              <BuildPairs data={Object.values(tickers)} />
            </ScrollArea>
          </aside>
        ) : (
          <Drawer open={isOpen} onClose={() => setIsOpen(false)}>
            <DrawerContent className="bg-gray-900">
              <DrawerTitle className="flex w-full mb-2 justify-between px-4 text-gray-50 text-2xl font-medium">
                Market
                <DrawerClose className="">
                  <X color="#fff" />
                </DrawerClose>
              </DrawerTitle>

              <div className="p-3 pb-1 border-b-2 border-gray-900">
                <div className="h-10 w-full border-2 border-gray-800 rounded-md hover:border-amber-400 flex items-center">
                  <IoSearch className="mx-2" color="#555" size={30} />
                  <input
                    type={"text"}
                    value={search}
                    className="h-full w-full outline-0 text-gray-50"
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <IoClose
                    color="#555"
                    className={`mx-2 right-2 absolute ${search ? "block" : "hidden"}`}
                    size={30}
                    onClick={() => setSearch("")}
                  />
                </div>
                <div className="flex mt-3 gap-2">
                  <p
                    className={`font-bold text-sm xl:text-md cursor-pointer ${filter === Filter.usdt ? "text-gray-50 border-b-4 border-amber-400" : "text-gray-500"}`}
                    onClick={() => setFilter(Filter.usdt)}
                  >
                    USDT
                  </p>
                  <p
                    className={`font-bold text-sm xl:text-md cursor-pointer ${filter === Filter.spot ? "text-gray-50 border-b-4 border-amber-400" : "text-gray-500"}`}
                    onClick={() => setFilter(Filter.spot)}
                  >
                    Spot
                  </p>
                  <p
                    className={`font-bold text-sm xl:text-md cursor-pointer ${filter === Filter.cross ? "text-gray-50 border-b-4 border-amber-400" : "text-gray-500"}`}
                    onClick={() => setFilter(Filter.cross)}
                  >
                    Margin
                  </p>
                  <p
                    className={`font-bold text-sm xl:text-md cursor-pointer ${filter === Filter.future ? "text-gray-50 border-b-4 border-amber-400" : "text-gray-500"}`}
                    onClick={() => setFilter(Filter.future)}
                  >
                    Future
                  </p>
                </div>
              </div>

              <div className="flex p-2 justify-between">
                <div
                  onClick={() => setPriceSort((prev) => !prev)}
                  className="text-gray-600 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                >
                  Price
                  {priceSort ? (
                    <BsSortUpAlt size={15} />
                  ) : (
                    <BsSortDown size={15} />
                  )}
                </div>

                <div
                  onClick={() => setChangeSort((prev) => !prev)}
                  className="text-gray-600 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                >
                  24h Change
                  {changeSort ? (
                    <BsSortUpAlt size={15} />
                  ) : (
                    <BsSortDown size={15} />
                  )}
                </div>
              </div>
              <ScrollArea className="h-100 md:h-full w-full px-4">
                <BuildPairs data={Object.values(tickers)} />
              </ScrollArea>
              <DrawerDescription></DrawerDescription>
            </DrawerContent>
          </Drawer>
        )}
      </>
    );
}