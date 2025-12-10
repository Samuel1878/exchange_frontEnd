import React, { useCallback, useEffect } from "react";
import type { FunctionComponent } from "react";
import PriceLevelRow from "./priceLevelRow";
import DepthVisualizer from "./depthVisulizer";

import { formatPrice} from "../../util/index";
import { CoinPairs } from "~/consts/pairs";
import useWindowDimensions from "~/hooks/windowWidth";
import { formatTotalPrice } from "~/utils/helpers";
import { useOrderbookStore, type LevelType } from "~/store/useOrderBookStore";
import { useAggTradeStore } from "~/store/useAggTradeStore";

export enum OrderType {
  BIDS,
  ASKS,
}

interface OrderBookProps {
  pair: string;
  option;
  type?:string;
}
const OrderBook: FunctionComponent<OrderBookProps> = ({
  pair,
  type="partial",
  option,
}) => {

  const {width} = useWindowDimensions();
  const {bids, asks} = useOrderbookStore();
  const {trades} = useAggTradeStore()
  let isLg = width>=1024;

  const buildPriceLevels = (
    levels: LevelType[],
    orderType: OrderType = OrderType.BIDS
  ): React.ReactNode => {
    const sortedLevelsByPrice: LevelType[] = [...levels].sort(
      (currentLevel: LevelType, nextLevel: LevelType): number => {
        let result: number = 0;
        return (result = nextLevel.price - currentLevel.price);
      }
    );
    return sortedLevelsByPrice.map((level, idx) => {
      if (option==="both" && isLg && idx>17){
        return
      }
      if (option==="both" && !isLg && idx>6){
        return
      }
      if (option!=="both" && !isLg && idx>13){
        return
      }
      return (
        <div key={level.depth + idx} className="overflow-hidden relative">
          <DepthVisualizer
            key={level.depth}
            depth={Number(level.depth)}
            orderType={orderType}
          />
          <PriceLevelRow
            key={level.amount + level.total}
            total={formatTotalPrice(level.total)}
            size={formatPrice(level.amount)}
            price={formatPrice(level.price)}
            type={orderType}
          />
        </div>
      );
    });
  };
 
  return (
    <div
      className={`flex flex-col justify-between h-full lg:min-w-55 xl:w-70 2xl:w-85 bg-gray-900 lg:bg-gray-950 relative `}
    >
      <div className={`flex w-full flex-col bg-gray-900 lg:bg-gray-950`}>
        <div className="flex justify-between pb-1">
          <p className=" text-gray-500 text-sm">Price(USDT)</p>

          <p className=" text-gray-500 text-sm">
            Amount({CoinPairs[pair].names[0]})
          </p>
          <p className="hidden md:block text-gray-500 text-sm">Total</p>
        </div>
        <div className="">
          {option === "both" || option === "ask"
            ? buildPriceLevels(asks, OrderType.ASKS)
            : null}
        </div>
      </div>

      <div className="flex gap-1 items-baseline-last">
        <p
          className={`text-2xl md:text-xl font-semibold ${trades[0]?.maker ? "text-green-400" : "text-red-500"}`}
        >
          {formatPrice(Number(trades[0]?.price) || 0)}
        </p>

        <p className="text-xs text-gray-500">
          ${formatPrice(Number(trades[0]?.price) || 0)}
        </p>
      </div>
      <div className={`flex w-full flex-col`}>
        <title>ASK</title>
        <div className="">
          {option === "both" || option === "bid"
            ? buildPriceLevels(bids, OrderType.BIDS)
            : null}
        </div>
      </div>
    </div>
  );
};

export default OrderBook;
