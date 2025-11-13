import { websocketClient } from "@massive.com/client-js";
import { useEffect, useRef, useState } from "react";
import { FiInfo } from "react-icons/fi";
import { IoMdArrowDropdown } from "react-icons/io";
import { Form } from "react-router";
import { FaMinus, FaPlus } from "react-icons/fa";
import { GoArrowSwitch } from "react-icons/go";
import { OrderBookFilterBtn } from "./components/buttons";
import { BottomDrawerOptions } from "./components/bottomDrawer";
  import * as echarts from 'echarts';
import { getOptions } from "./configs/miniOrderConfig";
import { colorGreen, colorGreenOpacity, colorRed, colorRedOpacity, priceFormatter, ProductIds } from "./util";
import ReactECharts from 'echarts-for-react';
import OrderBook from "./components/orderBook/orderBook";

export default function () {
  const [isBuy, setIsBuy] = useState<boolean>(true);
  const [isLimit, setIsLimit] = useState(true);
  const [option, setOptions] = useState("both");
  const [openDrawer, setOpenDrawer] = useState(false);
  const orderBookRef = useRef(null)
  const [orderBookFilter, setOrderBookFilter] = useState("0.00001")
  const [openLimitDrawer, setOpenLimitDrawer] = useState(false);
   const [productId, setProductId] = useState(ProductIds.XBTUSD);
  const [isFeedKilled, setIsFeedKilled] = useState(false);
  const toggleAction = () => {
    if (option === "both") {
      setOptions("bid");
      return;
    } else if (option === "bid") {
      setOptions("ask");
      return;
    } else {
      setOptions("both");
    }
  };




 
  const toggleFeed = (): void => {
    setIsFeedKilled(!isFeedKilled);
  }

  return (
    <div className="p-2 bg-gray-900">
      <header className="flex justify-between items-center">
        <div className="flex gap-4 items-end">
          <button className="text-gray-50 font-medium text-xl">
            BTC/USDT
            <span></span>
          </button>
          <p className="text-green-500 font-semibold text-sm">0.5239 % </p>
        </div>
        <button>
          <img
            src="../../assets/icons/mini_cs.svg"
            color={"#f0b90b"}
            className="w-6"
          />
        </button>
      </header>
      <div className="flex gap-3 mt-6">
        <div id="orderBook" className="flex-4 flex flex-col">
          <div className="flex gap-2">
            <button onClick={()=>setOpenDrawer(true)} className="flex rounded-lg text-gray-50 flex-1 items-center justify-around bg-gray-700">
             {orderBookFilter}
              <IoMdArrowDropdown />
            </button>
            <OrderBookFilterBtn option={option} toggleAction={toggleAction} />
          </div>
          <OrderBook windowWidth={80} productId={productId} isFeedKilled={isFeedKilled}/>
        

        </div>
        <div id="trde" className="flex-5 flex flex-col gap-4">
          <div className="flex gap-1">
            <button
              onClick={() => setIsBuy(true)}
              className={`flex-1 h-12 rounded-lg font-bold justify-center items-center text-gray-50  ${isBuy ? "bg-green-400" : "bg-gray-800"}`}
            >
              Buy
            </button>
            <button
              onClick={() => setIsBuy(false)}
              className={`flex-1 h-12 rounded-lg font-bold justify-center items-center text-gray-50  ${!isBuy ? "bg-red-500" : "bg-gray-800"}`}
            >
              Sell
            </button>
          </div>
          <button onClick={()=>setOpenLimitDrawer(true)} className="h-12 flex justify-between text-gray-50 bg-gray-800 items-center px-4 rounded-md">
            <FiInfo />

            {isLimit ? "Limit" : "Market"}
            <IoMdArrowDropdown />
          </button>
          <input
            className="outline-gray-700 outline-1 focus:outline-amber-400 rounded-md text-center h-12 w-full text-gray-50"
            placeholder="Price (USDT)"
          />
          <input
            className="outline-gray-700 outline-1 focus:outline-amber-400 rounded-md text-center h-12 w-full text-gray-50"
            placeholder="Total (USDT)"
          />
          <div className="flex outline-gray-700 outline-1 focus:outline-amber-400 rounded-md p-2 h-14 ">
            <button className="bg-gray-800 rounded-sm px-3">
              <FaMinus color="#fff"/>
            </button>
            <input
              className=" text-center focus:outline-0 w-full placeholder:text-sm text-gray-50"
              placeholder="Amount (BTC)"
            />
            <button className="bg-gray-800 rounded-sm px-3">
              <FaPlus color="#fff"/>
            </button>
          </div>
          <div className="flex justify-between gap-2">
            <button className="py-1 flex-1 items-center bg-gray-800 rounded-sm text-gray-50">
              25%
            </button>
            <button className="py-1 flex-1 items-center bg-gray-800 rounded-sm text-gray-50">
              50%
            </button>
            <button className="py-1 flex-1 items-center bg-gray-800 rounded-sm text-gray-50">
              75%
            </button>
            <button className="py-1 flex-1 items-center bg-gray-800 rounded-sm text-gray-50">
              100%
            </button>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-lg text-gray-400 ">Avilable</p>
            <div className="flex gap-2">
              <p className="text-gray-50">0 USDT</p>
              <button>
                <GoArrowSwitch />
              </button>
            </div>
          </div>
          <button
            className={`h-12 text-center rounded-lg font-medium text-gray-50  ${isBuy ? "bg-green-400" : "bg-red-500"}`}
          >
            {isBuy ? "Buy" : "Sell"}
          </button>
        </div>
      </div>
      <BottomDrawerOptions openDrawer={openLimitDrawer} toggle={()=>setIsLimit((prev)=>!prev)} setOpenDrawer={setOpenLimitDrawer} data={[{value:"limit"},{value:"market"}]}/>
        <BottomDrawerOptions openDrawer={openDrawer} setOrderBookFilter={setOrderBookFilter} setOpenDrawer={setOpenDrawer} data={[{value:"0.000001"},{value:"0.00001"},{value:"0.0001"},{value:"0.001"},{value:"0.01"}, {value:"0.1"}]}/>
    </div>
  );
}
