
// import useWebSocket from "react-use-websocket";
// export type SocketKey = "individulStore" | "kline" | "tickers";

// const URLS: Record<SocketKey, string> = {
//   individulStore: "wss://stream.binance.com:9443/stream",
//   kline: "wss://stream.binance.com:9443/ws",
//   tickers: "wss://stream.binance.com:9443/stream",
// };

// export function useWebSocketManager(key:string) {

//   const { sendJsonMessage, lastMessage, readyState } = useWebSocket(URLS[key], {
//     share: true, 
//     onOpen:()=>console.log("WebSocket Manager is Opened", key),
//     onClose:()=>console.log("WebSocket Manager is closed" , key),
//     shouldReconnect: (closeEvent) => true,
//     reconnectAttempts: 10,
//     reconnectInterval: (attemptNumber) =>
//       Math.min(Math.pow(2, attemptNumber) * 1000, 10000),
//   });
//   return {sendJsonMessage, lastMessage , readyState}
// }