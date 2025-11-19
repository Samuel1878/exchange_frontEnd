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

export default function ({ product_id, openMobileTrade, type }) {
   const [openLimitDrawer, setOpenLimitDrawer] = useState(false);
     const [isBuy, setIsBuy] = useState<boolean>(true);
     const [isLimit, setIsLimit] = useState(true);
     const [option, setOptions] = useState("both");

  return (
    <div className="space-y-1 bg-black">
      <div>
        <Header pair={product_id} />
      </div>
      <div className="flex">
        <div className=" bg-gray-900 rounded-sm md:flex-2 w-full">
          <CandleSticks product_id={product_id} type={type} />
          <div className="hidden md:flex bg-black md:gap-1">
            <div className="flex-1 bg-gray-900 mt-1 rounded-sm">
              <div className="p-2 px-4 border-b-2 border-b-gray-700">
                <p className="text-gray-50 font-semibold">Market Trades</p>
              </div>
              <div className="">
                <AggTradeView product_id={product_id}/>
              </div>
            </div>

            <div className="bg-gray-900 mt-1 rounded-sm flex-1">
              <div className="p-2 px-4 border-b-2 border-b-gray-700">
                <p className="text-gray-50 font-semibold">Order Book</p>
              </div>
              <div className="px-4 p-2">
                <OrderBookFilterBtnWeb option={option} setAction={setOptions} />
              </div>
              <div className="px-4">
                <OrderBook productId={product_id} option={option} />
              </div>
            </div>
          </div>
        </div>
        <div className="hidden md:block p-2 bg-gray-900 ml-1 rounded-t-sm md:flex-1">
          <Trade
            isBuy={isBuy}
            isLimit={isLimit}
            setOpenLimitDrawer={setOpenLimitDrawer}
            setIsBuy={setIsBuy}
          />
        </div>
      </div>

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
