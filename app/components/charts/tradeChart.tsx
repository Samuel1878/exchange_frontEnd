import { FiInfo } from "react-icons/fi";
import { OrderBookFilterBtnWeb, TradeButton } from "./components/buttons";
import CandleSticks from "./components/candleSticks";
import Header from "./components/header";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaMinus, FaPlus } from "react-icons/fa";
import Trade from "./components/trade";
import { useState } from "react";
import { BottomDrawerOptions } from "./components/bottomDrawer";
import OrderBook from "./components/orderBook/orderBook";
import AggTradeView from "./components/aggTradeView";
import OrderHistory from "./components/orderHistory";
import LgTrade from "./components/lgTrade";

export default function ({ pair, openMobileTrade, type }) {
   const [openLimitDrawer, setOpenLimitDrawer] = useState(false);
     const [isBuy, setIsBuy] = useState<boolean>(false);
     const [isLimit, setIsLimit] = useState(true);
     const [option, setOptions] = useState("both");

  return (
    <div className="space-y-1 bg-black pb-1">
      <div className="lg:flex">
        <div className="lg:w-full">
          <div>
            <Header pair={pair} />
          </div>
          <div className="flex">
            {/* <div className="hidden lg:flex lg:mr-1">
              <div className="bg-gray-900 lg:bg-gray-950 mt-1 rounded-sm flex-1 lg:max-w-200 lg:flex lg:flex-col">
                <div className="p-2 px-4 border-b-2 border-b-gray-700">
                  <p className="text-gray-50 font-semibold">Order Book</p>
                </div>
                <div className="px-4 p-2">
                  <OrderBookFilterBtnWeb
                    option={option}
                    setAction={setOptions}
                  />
                </div>
                <div className="px-4">
                  <OrderBook productId={product_id} option={option} />
                </div>
              </div>
            </div> */}
            <div className="md:flex-2 w-full lg:flex lg:flex-row-reverse lg:justify-between">
              <div>
                <CandleSticks pair={pair} type={type} />
                <div className="hidden lg:flex lg:flex-1 bg-gray-950 mt-1 rounded-sm lg:h-100">
                  <LgTrade isLimit={isLimit} type={type} pair={pair}/>
                </div>
              </div>

              <div className="hidden md:flex  md:gap-1 lg:w-full">
                <div className="flex-1 bg-gray-900 mt-1 rounded-sm lg:hidden">
                  <div className="p-2 px-4 border-b-2 border-b-gray-700 lg:border-b-gray-900">
                    <p className="text-gray-50 font-semibold">Market Trades</p>
                  </div>
                  <div className="lg:hidden">
                    <AggTradeView pair={pair} />
                  </div>
                </div>

                <div className="bg-gray-900 lg:bg-gray-950 mt-1 flex-1 lg:mr-1 rounded-sm lg:flex lg:flex-col">
                  <div className="p-2 px-4 border-b-2 border-b-gray-700 lg:border-b-gray-900">
                    <p className="text-gray-50 font-semibold">Order Book</p>
                  </div>
                  <div className="px-4 p-2">
                    <OrderBookFilterBtnWeb
                      option={option}
                      setAction={setOptions}
                    />
                  </div>
                  <div className="px-4">
                    <OrderBook pair={pair} option={option} />
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden md:block p-2 bg-gray-900 ml-1 mt-1 rounded-t-sm md:flex-1 lg:hidden">
              <Trade
                isBuy={isBuy}
                isLimit={isLimit}
                setOpenLimitDrawer={setOpenLimitDrawer}
                setIsBuy={setIsBuy}
                pair={pair}
              />
            </div>
          </div>
        </div>
        <div className="hidden lg:flex lg:flex-col">
          <div className="w-full bg-gray-950 mt-1 ml-1 rounded-sm flex-1 lg:min-w-50 xl:w-70 2xl:w-85"></div>
          <div className="hidden lg:flex lg:flex-col flex-1 lg:ml-1 lg:mt-1 bg-gray-950 rounded-sm">
            <div className="p-2 px-4 border-b-2 border-b-gray-700 lg:border-b-gray-900">
              <p className="text-gray-50 font-semibold">Market Trades</p>
            </div>
            <AggTradeView pair={pair} />
          </div>
        </div>
      </div>
      <OrderHistory />

      <div className="fixed bottom-0 right-0 left-0 bg-gray-900 px-4 py-2 pb-4 md:hidden">
        <TradeButton
          action={openMobileTrade}
          textStyle="font-semibold"
          style="bg-amber-400 w-full h-10"
          label="Trade"
        />
      </div>
      <BottomDrawerOptions
        openDrawer={openLimitDrawer}
        toggle={() => setIsLimit((prev) => !prev)}
        setOpenDrawer={setOpenLimitDrawer}
        data={[{ value: "limit" }, { value: "market" }]}
      />
    </div>
  );
}
