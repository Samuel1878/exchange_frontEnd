// import {
//   createContext,
//   useCallback,
//   useContext,
//   useEffect,
//   useState,
// } from "react";
// import useWebSocket, { ReadyState } from "react-use-websocket";
// import { useAppDispatch } from "~/utils/redux";
// import { addData } from "../slices/allMarketTicker";
// import { rafThrottle } from "~/utils/helpers";

// export const AllMarketTickerContext = createContext<StreamContextType | null>(
//   null
// );
// interface StreamContextType {
//   switchStream: (streamId: string[]) => void;
//   currentStream: string[] | null;
// }
// export default function AllMarketTickerProvider({ children }) {
//   const [currentStream, setCurrentStream] = useState<null | string[]>(null);
//   const dispatch = useAppDispatch();
//   const { readyState, sendJsonMessage, getWebSocket } = useWebSocket(
//     `wss://stream.binance.com:9443/stream`,
//     {
//       onOpen: () => {
//         console.log("AllMarket Ticker WebSocket Connection Opened");
//       },
//       onClose: () =>
//         console.log("AllMarket Ticker WebSocket Connection Closed"),
//       shouldReconnect: (closeEvent) => true,
//       reconnectAttempts: 10,
//       reconnectInterval: (attemptNumber) =>
//         Math.min(Math.pow(2, attemptNumber) * 1000, 10000),
//       onMessage: (event: WebSocketEventMap["message"]) => throttledTrade(event),
//     }
//   );
//   const throttledTrade = rafThrottle((event: { data: string }) => {
//     const response = JSON.parse(event.data);
//     dispatch(addData(response));
//   });
//   const sendSubscriptionMessage = useCallback(
//     (streamNames: string[], method: string) => {
//       const message = {
//         method: method,
//         params: streamNames,
//         id: 2,
//       };
//       sendJsonMessage(message);
//       console.log(`${method} request sent for ${streamNames}`);
//     },
//     [sendJsonMessage]
//   );

//   const switchStream = useCallback(
//     (newStream: string[]) => {
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
//     return () => {};
//   }, [readyState, currentStream, sendSubscriptionMessage]);

//   return (
//     <AllMarketTickerContext.Provider value={{ switchStream, currentStream }}>
//       {children}
//     </AllMarketTickerContext.Provider>
//   );
// }

// // if (currentStream && readyState === ReadyState.OPEN) {
// //   sendSubscriptionMessage(currentStream, "UNSUBSCRIBE");
// //   console.log("Unsubscribed on unmount:", currentStream);
// // }

// // const ws = getWebSocket();
// // if (ws) {
// //   ws.close(1000, "Provider unmounted"); // Clean close
// //   console.log("WebSocket manually closed");
// // }
