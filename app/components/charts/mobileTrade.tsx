import { websocketClient } from "@massive.com/client-js";
import { useEffect, useRef, useState } from "react";
import { FiInfo } from "react-icons/fi";
import { IoMdArrowDropdown } from "react-icons/io";
import { Form } from "react-router";
import { FaMinus, FaPlus } from "react-icons/fa";
import { GoArrowSwitch } from "react-icons/go";
import { OrderBookFilterBtn } from "./components/buttons";
import { BottomDrawerOptions } from "./components/bottomDrawer";
import * as echarts from "echarts";
import { getOptions } from "./configs/miniOrderConfig";

import ReactECharts from "echarts-for-react";
import OrderBook from "./components/orderBook/orderBook";
import App from "./components/ordeBookTest";
import { useAppDispatch, useAppSelector } from "~/utils/redux";
import { selectTicker } from "~/context/slices/IndividualMiniTicker";
import { changeTotalLevel } from "~/context/slices/orderBook";
import Trade from "./components/trade";
import OrderHistory from "./components/orderHistory";

export default function ({product_id, openMobileTrade, closeMobileTrade}) {
     const ticker = useAppSelector(selectTicker);
   const [openLimitDrawer, setOpenLimitDrawer] = useState(false);
   const [isBuy, setIsBuy] = useState<boolean>(true);
   const [isLimit, setIsLimit] = useState(true);
  const [option, setOptions] = useState("both");
  const [openDrawer, setOpenDrawer] = useState(false);
  const orderBookRef = useRef(null);
  const [orderBookFilter, setOrderBookFilter] = useState("0.00001");
   const dispatch = useAppDispatch();
  const toggleAction = () => {
    if (option === "both") {
      setOptions("bid");
      // dispatch(changeTotalLevel(7))
      return;
    } else if (option === "bid") {
      setOptions("ask");
      //  dispatch(changeTotalLevel(14));
      return;
    } else {
      // dispatch(changeTotalLevel(14))
      setOptions("both");
    }
  };



  return (
    <div className="p-2 bg-gray-900">
      <header className="flex justify-between items-center">
        <div className="flex gap-4 items-end">
          <button className="text-gray-50 font-medium text-xl">
            BTC/USDT
            <span></span>
          </button>
          <p
            className={`font-semibold text-sm ${ticker?.priceChangePercent?.startsWith("+", 0) ? "text-green-500" : "text-red-500"}`}
          >
            {ticker?.priceChangePercent || "0"} %
          </p>
        </div>
        <button onClick={closeMobileTrade}>
          <img
            src="../../assets/icons/mini_cs.svg"
            color={"#f0b90b"}
            className="w-6"
          />
        </button>
      </header>
      <div className="flex gap-3 mt-6 ">
        <div id="orderBook" className="flex-4 flex flex-col  justify-between">
          <OrderBook
           
            productId={product_id}
            option={option}
          />
          {/* <App/> */}
          <div className="flex gap-2 mt-2 items-center px-1">
            <button
              onClick={() => setOpenDrawer(true)}
              className="flex rounded-sm h-8 text-gray-50 flex-1 items-center justify-around bg-gray-700"
            >
              {orderBookFilter}
              <IoMdArrowDropdown />
            </button>
            <OrderBookFilterBtn option={option} toggleAction={toggleAction} />
          </div>
        </div>
        <Trade
          isBuy={isBuy}
          isLimit={isLimit}
          setOpenLimitDrawer={setOpenLimitDrawer}
          setIsBuy={setIsBuy}
        />
      </div>
      <OrderHistory/>
      <BottomDrawerOptions
        openDrawer={openLimitDrawer}
        toggle={() => setIsLimit((prev) => !prev)}
        setOpenDrawer={setOpenLimitDrawer}
        data={[{ value: "limit" }, { value: "market" }]}
      />
      <BottomDrawerOptions
        openDrawer={openDrawer}
        setOrderBookFilter={setOrderBookFilter}
        setOpenDrawer={setOpenDrawer}
        data={[
          { value: "0.000001" },
          { value: "0.00001" },
          { value: "0.0001" },
          { value: "0.001" },
          { value: "0.01" },
          { value: "0.1" },
        ]}
      />
    </div>
  );
}
