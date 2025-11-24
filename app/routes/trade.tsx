import { useCallback, useEffect, useState } from "react";
import type { Route } from "./+types/trade";
import { useLoaderData } from "react-router";
import MobileChart from "~/components/charts/mobileTrade";
import { useAppDispatch } from "~/utils/redux";
import { addTicker } from "~/context/slices/IndividualMiniTicker";
import ChartScreen from "~/components/charts/tradeChart";
import useWindowDimensions from "~/hook/windowWidth";
import { addAggTrade } from "~/context/slices/tradeSlice";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { addAsks, addBids } from "~/context/slices/orderBook";
import { rafThrottle } from "~/utils/helpers";
import axios from "axios";
// import { useTickers } from "~/hook/useTickers";
import { useDepthAggTrades } from "~/hook/useAggTrade";
import { useTickers } from "~/hook/useTickers";
import { useOrderbook } from "~/hook/useOrderBook";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Trade" }, { name: "description", content: "Trading" }];
}
interface Delta {
  bids: string[][];
  asks: string[][];
}

export async function clientLoader({
  params,
  request,
}: Route.ClientLoaderArgs) {
  const pair = params.pair;
  const url = new URL(request.url);
  const type = url.searchParams.get("type");
  return { type, pair };
}

export async function clientAction({ request }: Route.ClientActionArgs) {}

export default function SpotScreen({ loaderData }: Route.ComponentProps) {
  const { width } = useWindowDimensions();
  const { type, pair } = loaderData;
  const [isMobileTrade, setIsMobileTrade] = useState(width < 768);
  const isMobile = width < 768;
  const openMobileTrade = () => setIsMobileTrade(true);
  const closeMobileTrade = () => setIsMobileTrade(false);
  // const [currentStream, setCurrentStream] = useState<null | string[]>(null);
// const dispatch = useAppDispatch()
  useDepthAggTrades([`${pair}@aggTrade`], pair);
  useOrderbook(pair)
//   const {  readyState, sendJsonMessage } =
//     useWebSocket(`wss://stream.binance.com:9443/stream`, {
//       onOpen: () => {
//         console.log("WebSocket Connection Opened");
//       },
//       onClose: () => console.log("WebSocket Connection Closed"),
//       shouldReconnect: (closeEvent) => true,
//       reconnectAttempts: 10,
//       reconnectInterval: (attemptNumber) =>
//         Math.min(Math.pow(2, attemptNumber) * 1000, 10000),
//       onMessage: (event: WebSocketEventMap["message"]) =>
//         processMessages(event),
//     });
//   const processMessages = rafThrottle((event: { data: string }) => {
//     const response = JSON.parse(event.data);
//     if (response?.stream === pair + "@depth20@1000ms") {
//       processDepth(response?.data);
//       return
//     } else if (response?.stream === pair + "@ticker") {
//       dispatch(addTicker(response?.data));
//       return
//     } else if (response?.stream === pair + "@aggTrade") {
//       dispatch(addAggTrade(response?.data));
//       return
//     } else {
//       console.log(response);
//     }
//   })
//   const processDepth = (data: Delta) => {
//     if (data.bids && data.bids.length) {
//       let bidMap = [];
//       for (let [price, qty] of data.bids) {
//         if (Number(qty) >= 0) {
//           bidMap.push([price, qty]);
//         }
//       }
//       dispatch(addBids(bidMap));
//     }
//     if (data.asks && data.asks.length) {
//       let askMap = [];
//       for (let [price, qty] of data.asks) {
//         if (Number(qty) >= 0) {
//           askMap.push([price, qty]);
//         }
//       }
//       dispatch(addAsks(askMap));
//     }
//   };

//   const sendSubscriptionMessage = useCallback(
//     (streamNames: string[], method: string) => {
//       const message = {
//         method: method,
//         params: streamNames,
//         id: 1,
//       };
//       sendJsonMessage(message);
//       console.log(`${method} request sent for ${streamNames}`);
//     },
//     [sendJsonMessage]
//   );

//   const switchStream = useCallback(
//     (newStream) => {
//       if (currentStream && readyState === ReadyState.OPEN) {
//         sendSubscriptionMessage(currentStream, "UNSUBSCRIBE");
//       }
//       setCurrentStream(newStream);
//     },
//     [currentStream, readyState, sendSubscriptionMessage]
//   );

//   useEffect(() => {
//     if (readyState === ReadyState.OPEN && currentStream) {
//       sendSubscriptionMessage(currentStream, "SUBSCRIBE");
//     }

//     return () => {
//       //send unsubscribe here on unmount, but often managing this via state is cleaner
//     };
//   }, [readyState, currentStream, sendSubscriptionMessage]);
//   useEffect(() => {
//     pair &&
//       switchStream([pair + "@aggTrade", pair + "@depth20@1000ms", pair + "@ticker"]);
//   }, [pair]);
  return (
    <main
      className="lg:flex lg:justify-center bg-gray-900 lg:bg-black"
      id={"spot"}
    >
      {isMobile && isMobileTrade ? (
        <MobileChart
          pair={pair}
          type={type}
          openMobileTrade={openMobileTrade}
          closeMobileTrade={closeMobileTrade}
        />
      ) : (
        <ChartScreen
          pair={pair}
          openMobileTrade={openMobileTrade}
          type={type}
        />
      )}
    </main>
  );
}
