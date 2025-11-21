import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useAppDispatch } from "~/utils/redux";
import { addData } from "../slices/allMarketTicker";
import { rafThrottle } from "~/utils/helpers";

export const AllMarketTickerContext = createContext(null);

export default function AllMarketTickerProvider({ children }) {
  const [currentStream, setCurrentStream] = useState<null | string[]>(null);
  const dispatch = useAppDispatch();
  const { readyState, sendJsonMessage } = useWebSocket(
    `wss://stream.binance.com:9443/stream`,
    {
      onOpen: () => {
        console.log("AllMarket Ticker WebSocket Connection Opened");
      },
      onClose: () =>
        console.log("AllMarket Ticker WebSocket Connection Closed"),
      shouldReconnect: (closeEvent) => true,
      reconnectAttempts: 10,
      reconnectInterval: (attemptNumber) =>
        Math.min(Math.pow(2, attemptNumber) * 1000, 10000),
      onMessage: (event: WebSocketEventMap["message"]) => throttledTrade(event),
    }
  );
//   const processMessages = (event: { data: string }) => {
//     const response = JSON.parse(event.data);
//     dispatch(addData(response));
 

//   };
     const throttledTrade = rafThrottle((event: { data: string }) => {
       const response = JSON.parse(event.data);
       dispatch(addData(response));
     });

//   const throttledTradeUpdate = throttl((dispatch, data) => {
//     dispatch(updateAggTrade(data));
//   }, 150); // u
  const sendSubscriptionMessage = useCallback(
    (streamNames: string[], method: string) => {
      const message = {
        method: method,
        params: streamNames,
        id: 2,
      };
      sendJsonMessage(message);
      console.log(`${method} request sent for ${streamNames}`);
    },
    [sendJsonMessage]
  );

  const switchStream = useCallback(
    (newStream: string[]) => {
      if (currentStream && readyState === ReadyState.OPEN) {
        sendSubscriptionMessage(currentStream, "UNSUBSCRIBE");
      }
      setCurrentStream(newStream);
    },
    [currentStream, readyState, sendSubscriptionMessage]
  );

  useEffect(() => {
    if (readyState === ReadyState.OPEN && currentStream) {
      sendSubscriptionMessage(currentStream, "SUBSCRIBE");
    }
    return () => {
      //send unsubscribe here on unmount, but often managing this via state is cleaner
    };
  }, [readyState, currentStream, sendSubscriptionMessage]);

  return (
    <AllMarketTickerContext.Provider value={{ switchStream }}>
      {children}
    </AllMarketTickerContext.Provider>
  );
}
