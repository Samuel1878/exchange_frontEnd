import React, { useCallback, useEffect } from "react";
import type { FunctionComponent } from "react";
// import useWebSocket from "react-use-websocket";

// import { Container, TableContainer } from "./styles";
import PriceLevelRow from "./priceLevelRow";
import Spread from "./spread";
import { useAppDispatch, useAppSelector } from "~/utils/redux";
import {
  addAsks,
  addBids,
  addExistingState,
  selectAsks,
  selectBids,
  type LevelType,
} from "~/context/slices/orderBook";
import { MOBILE_WIDTH, ORDERBOOK_LEVELS } from "~/consts";
import DepthVisualizer from "./depthVisulizer";

import { formatPrice, ProductsMap } from "../../util/index";
import { formatNumber } from "~/utils/helpers";
import useWebSocket from "react-use-websocket";
import { orderBookSnapAPI } from "~/api/chartAPI";
import { selectTicker } from "~/context/slices/IndividualMiniTicker";
import type { aggTradeStreams } from "~/context/slices/tradeSlice";
// const WSS_FEED_URL: string = "wss://www.cryptofacilities.com/ws/v1";

export enum OrderType {
  BIDS,
  ASKS,
}

interface OrderBookProps {

  productId: string;
 
  option
}

interface Delta {
  bids: string[][];
  asks: string[][];
}

const OrderBook: FunctionComponent<OrderBookProps> = ({

  productId,

  option
}) => {
  const bids:LevelType[]= useAppSelector(selectBids);
  const asks: LevelType[] = useAppSelector(selectAsks);
   const ticker = useAppSelector(selectTicker);
  const dispatch = useAppDispatch();
    const aggTrade:aggTradeStreams[] = useAppSelector((state)=>state.aggTrade.aggTrade);
  const { sendJsonMessage, getWebSocket } = useWebSocket(`wss://stream.binance.com:9443/ws/${productId}@depth5`, {
    onOpen: () => console.log("OrderBook WebSocket connection opened."),
    onClose: () => console.log("OrderBook WebSocket connection closed."),
    shouldReconnect: (closeEvent) => true,
    onMessage: (event: WebSocketEventMap["message"]) => processMessages(event),
  });


  const processMessages = (event: { data: string }) => {
    const response = JSON.parse(event.data);
      process(response);
    
  };

  const getSnapOrderBook = async () => {
    const response = await orderBookSnapAPI(productId)
    const data = response?.data 
    console.log(data)
      let bidMap = [];
        if (data && data.bids && data.bids.length) {
       
          for (let [price, qty] of data.bids) {
            if (Number(qty) >= 0) {
              bidMap.push([price, qty]);
            }
          }
        }
            let askMap = []
              if (data.asks && data.asks.length) {
  
      for (let [price, qty] of data.asks) {
        if (Number(qty) >= 0) {
          askMap.push([price, qty])
        }
      }
    }
    dispatch(addExistingState({product_id:productId, bids:bidMap, asks:askMap}));
  }
  useEffect(()=>{
    getSnapOrderBook()
  },[])

  // useEffect(() => {
  //   function connect(product: string) {
  //     const unSubscribeMessage = {
  //       event: "unsubscribe",
  //       feed: "book_ui_1",
  //       product_ids: [ProductsMap[product]],
  //     };
  //     sendJsonMessage(unSubscribeMessage);

  //     const subscribeMessage = {
  //       event: "subscribe",
  //       feed: "book_ui_1",
  //       product_ids: [product],
  //     };
  //     sendJsonMessage(subscribeMessage);
  //   }

  //   if (isFeedKilled) {
  //     getWebSocket()?.close();
  //   } else {
  //     connect(productId);
  //   }
  // }, [isFeedKilled, productId, sendJsonMessage, getWebSocket]);

  const process = (data: Delta) => {
    if (data.bids && data.bids.length) {
      let bidMap = []
      for (let [price, qty] of data.bids) {
        if (Number(qty) >= 0) {
          bidMap.push([price, qty])
        }
      }
      dispatch(addBids(bidMap))
    }
      if (data.asks && data.asks.length) {
      let askMap = []
      for (let [price, qty] of data.asks) {
        if (Number(qty) >= 0) {
          askMap.push([price, qty])
        }
      }
      dispatch(addAsks(askMap))
    }
  };



  const buildPriceLevels = (
    levels: LevelType[],
    orderType: OrderType = OrderType.BIDS
  ): React.ReactNode => {
    const sortedLevelsByPrice: LevelType[] = [...levels].sort(
      (currentLevel: LevelType, nextLevel: LevelType): number => {
        let result: number = 0;
          return result = nextLevel.price - currentLevel.price;
      }
    );
    return sortedLevelsByPrice.map((level, idx) => {
      return (
        <div key={level.depth + idx} className="m-1 overflow-hidden">
          <DepthVisualizer
            key={level.depth}
       
            depth={Number(level.depth)}
            orderType={orderType}
          />
          <PriceLevelRow
            key={level.amount + level.total}
            total={level.total.toString()}
            size={level.amount.toString()}
            price={formatPrice(level.price)}
            type={orderType}
          />
        </div>
      );
    });
  }

  return (
    <div
      className={`flex flex-col justify-between h-full bg-gray-900 relative  after:h-full after:block after:absolute after:left-0 z-0 `}
    >
      <table className={`flex w-full flex-col bg-gray-900`}>
        <div className="flex justify-between pb-1">
          <p className=" text-gray-500 text-sm">Price(USDT)</p>
          
          <p className=" text-gray-500 text-sm">Amount(BTC)</p>
          <p className="hidden md:block text-gray-500 text-sm">Total</p>
        </div>
        <div>
          {option === "both" || option === "ask"
            ? buildPriceLevels(asks, OrderType.ASKS)
            : null}
        </div>
      </table>
      <div className="flex gap-1 items-baseline-last">
        <p
          className={`text-xl font-semibold ${aggTrade[0]?.isBuyerMarket ? "text-green-400" : "text-red-500"}`}
        >
          {formatPrice(Number(aggTrade[0]?.price) || 0)}
        </p>
        <p className="text-xs text-gray-500">
          ${formatPrice(Number(aggTrade[0]?.price) || 0)}
        </p>
      </div>
      <table className={`flex w-full flex-col`}>
        {/* <TitleRow windowWidth={windowWidth} reversedFieldsOrder={true} /> */}
        <title>ASK</title>
        <div>
          {option === "both" || option === "bid"
            ? buildPriceLevels(bids, OrderType.BIDS)
            : null}
        </div>
      </table>
    </div>
  );
};

export default OrderBook;
