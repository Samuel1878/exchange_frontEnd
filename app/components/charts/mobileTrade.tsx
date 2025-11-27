
import { useEffect, useRef, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { OrderBookFilterBtn } from "./components/buttons";
import { BottomDrawerOptions } from "./components/bottomDrawer";
import OrderBook from "./components/orderBook/orderBook";
import Trade from "./components/trade";
import OrderHistory from "./components/orderHistory";
import { CoinPairs } from "~/consts/pairs";
import { useTickersStore } from "~/store/useTickersStore";

export default function ({ pair, openMobileTrade, closeMobileTrade, type }) {
  const [openLimitDrawer, setOpenLimitDrawer] = useState(false);
  const [isBuy, setIsBuy] = useState<boolean>(true);
  const [isLimit, setIsLimit] = useState(false);
  const [option, setOptions] = useState("both");
  const [openDrawer, setOpenDrawer] = useState(false);
  const orderBookRef = useRef(null);
  const [orderBookFilter, setOrderBookFilter] = useState("0.00001");
  const {tickers} = useTickersStore()
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
            {CoinPairs[pair].label}
            <span></span>
          </button>
          <p
            className={`font-semibold text-sm ${tickers[pair]?.priceChangePercent?.startsWith("-", 0) ? "text-red-500" : "text-green-400"}`}
          >
            {tickers[pair]?.priceChangePercent || "0"} %
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
      <div className="flex gap-2 mt-6 mb-1">
        <div id="orderBook" className="flex-4 flex flex-col  justify-between">
          <OrderBook pair={pair} option={option} />
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
          pair={pair}
        />
      </div>
      <OrderHistory />
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
          { value: "0.00001" },
          { value: "0.0001" },
          { value: "0.001" },
          { value: "0.01" },
          { value: "0.1" },
          { value: "1" },
        ]}
      />
    </div>
  );
}
