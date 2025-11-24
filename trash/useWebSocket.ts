// import { useEffect } from "react";
// import useWebSocket, { ReadyState } from "react-use-websocket";
// import { create } from "zustand";

// const SOCKET_URL = "wss://stream.binance.com:9443/ws";

// // Store subscriptions globally
// const useMarketStore = create<{
//   streams: Set<string>;
//   addStream: (s: string[]) => void;
//   removeStream: (s: string[]) => void;
// }>((set, get) => ({
//   streams: new Set(),

//   addStream: (arr) =>
//     set((state) => {
//       arr.forEach((i) => state.streams.add(i));
//       return { streams: new Set(state.streams) };
//     }),

//   removeStream: (arr) =>
//     set((state) => {
//       arr.forEach((i) => state.streams.delete(i));
//       return { streams: new Set(state.streams) };
//     }),
// }));

// export function useBinanceSocket() {
//   const { streams } = useMarketStore();

//   const { sendJsonMessage, lastMessage, readyState } = useWebSocket(
//     SOCKET_URL,
//     {
//       share: true, // <-- 🔥 KEY: enables global reuse
//       shouldReconnect: (closeEvent) => true,
//       reconnectAttempts: 10,
//       reconnectInterval: (attemptNumber) =>
//         Math.min(Math.pow(2, attemptNumber) * 1000, 10000),
//     }
//   );

//   // Auto subscribe when streams change
//   useEffect(() => {
//     if (streams.size > 0) {
//       sendJsonMessage({
//         method: "SUBSCRIBE",
//         params: Array.from(streams),
//         id: Date.now(),
//       });
//     }
//   }, [streams]);

//   return { lastMessage, readyState };
// }

// // also export store helpers
// export const BinanceStreams = {
//   subscribe: (s: string[]) => useMarketStore.getState().addStream(s),
//   unsubscribe: (s: string[]) => useMarketStore.getState().removeStream(s),
// };
