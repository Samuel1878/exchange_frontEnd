
import { OrderBookFilterBtnWeb, TradeButton } from "./components/buttons";
import CandleSticks from "./components/candleStick/candleSticks";
import Header from "./components/header";
import Trade from "./components/trade";
import { useState } from "react";
import { BottomDrawerOptions } from "./components/bottomDrawer";
import OrderBook from "./components/orderBook/orderBook";
import AggTradeView from "./components/aggTradeView";
import OrderHistory from "./components/orderHistory";
import LgTrade from "./components/lgTrade";
import TradingPairs from "./components/tradingPairs";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

export default function ({ pair, openMobileTrade, type, setIsBuy ,isBuy}) {
  const [openLimitDrawer, setOpenLimitDrawer] = useState(false);
  // const [isBuy, setIsBuy] = useState<boolean>(false);
  const [isLimit, setIsLimit] = useState(false);
  const [option, setOptions] = useState("both");
  const [openPairs, setOpenPairs] = useState(false);
  const [value, setValue] = useState("0.0001");

  return (
    <div className="space-y-1 bg-black pb-1">
      <div className="lg:flex">
        <div className="lg:w-full">
          <div>
            <Header
              pair={pair}
              openPairs={openPairs}
              setOpenPairs={setOpenPairs}
            />
          </div>
          <div className="flex">
            <div className="md:flex-2 w-full lg:flex lg:flex-row-reverse lg:justify-between">
              <div>
                <CandleSticks pair={pair} type={type} />
                <div className="hidden lg:flex lg:flex-1 bg-gray-950 mt-1 rounded-sm lg:h-100">
                  <LgTrade
                    isLimit={isLimit}
                    type={type}
                    pair={pair}
                    setIsLimit={setIsLimit}
                  />
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
                    <p className="text-gray-50 font-semibold md:text-lg">
                      Order Book
                    </p>
                  </div>
                  <div className="px-4 p-2 flex justify-between items-center">
                    <OrderBookFilterBtnWeb
                      option={option}
                      setAction={setOptions}
                    />
                    <Select value={value} onValueChange={setValue}>
                      <SelectTrigger className="w-[100px] h-10 text-gray-50 text-md font-semibold border-0 outline-0 ring-0">
                        <SelectValue
                          aria-label={value}
                          className="text-gray-50 text-md font-semibold border-0 outline-0 ring-0"
                        >
                          {value}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 ring-0">
                        <SelectGroup>
                          <SelectItem
                            value="1"
                            className="text-gray-50 text-md font-semibold hover:bg-gray-900 "
                          >
                            1
                          </SelectItem>
                          <SelectItem
                            value="0.1"
                            className="text-gray-50 text-md font-semibold"
                          >
                            0.1
                          </SelectItem>
                          <SelectItem
                            value="0.01"
                            className="text-gray-50 text-md font-semibold"
                          >
                            0.01
                          </SelectItem>
                          <SelectItem
                            value="0.001"
                            className="text-gray-50 text-md font-semibold"
                          >
                            0.001
                          </SelectItem>
                          <SelectItem
                            value="0.0001"
                            className="text-gray-50 text-md font-semibold"
                          >
                            0.0001
                          </SelectItem>
                          <SelectItem
                            value="0.00001"
                            className="text-gray-50 text-md font-semibold"
                          >
                            0.00001
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
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
          <div className="w-full bg-gray-950 mt-1 ml-1 rounded-sm flex-1 lg:min-w-50 xl:w-70 2xl:w-85">
            {/* <AllMarketTickerProvider> */}
            <TradingPairs
              currentPair={pair}
              isOpen={openPairs}
              setIsOpen={setOpenPairs}
            />
            {/* </AllMarketTickerProvider> */}
          </div>
          <div className="hidden lg:flex lg:flex-col flex-1 lg:ml-1 lg:mt-1 bg-gray-950 rounded-sm">
            <div className="p-2 px-4 border-b-2 border-b-gray-700 lg:border-b-gray-900">
              <p className="text-gray-50 font-semibold">Market Trades</p>
            </div>
            <AggTradeView pair={pair} />
          </div>
        </div>
      </div>
      <OrderHistory />

      <div className="fixed z-50 flex gap-2 bottom-0 right-0 left-0 bg-gray-900 px-4 py-2 pb-4 md:hidden">
        <TradeButton
          action={()=>{
            openMobileTrade();
            setIsBuy(true)
          }}
          textStyle="font-semibold text-gray-50"
          style="bg-green-400 w-1/2 h-10"
          label="Buy"
        />
        <TradeButton
          action={()=>{
            openMobileTrade();
            setIsBuy(false)
          }}
          textStyle="font-semibold text-gray-50"
          style="bg-red-500 w-1/2 h-10"
          label="Sell"
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
