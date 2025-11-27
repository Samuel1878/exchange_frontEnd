// import { createContext, useCallback, useEffect, useRef, useState } from "react";
// import useWebSocket, { ReadyState } from "react-use-websocket";

// export const WSContext = createContext(null);

// export function WebSocketGlobalProvider({ children }) {
//   const [activeStreams, setActiveStreams] = useState(new Set());
//   const pendingSubs = useRef(new Set()); // streams requested before WS open
//   const pendingUnsubs = useRef(new Set());

//   const { sendJsonMessage, readyState, getWebSocket } = useWebSocket(
//     "wss://stream.binance.com:9443/stream",
//     {
//       share: true, // ← THIS makes the WS truly global
//       shouldReconnect: () => true,
//       reconnectAttempts: 20,
//       reconnectInterval: 3000,
//     }
//   );

//   /** Subscribe streams */
//   const subscribe = useCallback(
//     (streams: string[]) => {
//       streams.forEach((s) => pendingSubs.current.add(s));

//       if (readyState === ReadyState.OPEN) {
//         sendJsonMessage({
//           method: "SUBSCRIBE",
//           params: streams,
//           id: Date.now(),
//         });
//       }
//       console.log("connected", streams)
//       setActiveStreams((prev) => new Set([...prev, ...streams]));
//     },
//     [readyState, sendJsonMessage]
//   );

//   /** Unsubscribe streams */
//   const unsubscribe = useCallback(
//     (streams: string[]) => {
//       streams.forEach((s) => pendingUnsubs.current.add(s));

//       if (readyState === ReadyState.OPEN) {
//         sendJsonMessage({
//           method: "UNSUBSCRIBE",
//           params: streams,
//           id: Date.now(),
//         });
//       }
//       setActiveStreams((prev) => {
//         const set = new Set(prev);
//         streams.forEach((s) => set.delete(s));
//         return set;
//       });
//     },
//     [readyState, sendJsonMessage]
//   );

//   /** Re-subscribe after reconnection */
//   useEffect(() => {
//     if (readyState !== ReadyState.OPEN) return;

//     // Process pending SUBSCRIBES
//     if (pendingSubs.current.size > 0) {
//       sendJsonMessage({
//         method: "SUBSCRIBE",
//         params: Array.from(pendingSubs.current),
//         id: Date.now(),
//       });
//       console.log("reconnect", Array.from(pendingSubs.current));
//       pendingSubs.current.clear();
//     }

//     // Process pending UNSUBSCRIBES
//     if (pendingUnsubs.current.size > 0) {
//       sendJsonMessage({
//         method: "UNSUBSCRIBE",
//         params: Array.from(pendingUnsubs.current),
//         id: Date.now(),
//       });
//       pendingUnsubs.current.clear();
//     }
//   }, [readyState]);

//   /** Auto-close WebSocket if no streams */
//   useEffect(() => {
//     if (activeStreams.size === 0) {
//       const ws = getWebSocket();
//       if (ws && ws.readyState === WebSocket.OPEN) {
//         ws.close(1000, "No active streams");
//       }
//     }
//   }, [activeStreams, getWebSocket]);

//   return (
//     <WSContext.Provider
//       value={{
//         readyState,
//         subscribe,
//         unsubscribe,
//         activeStreams,
//         sendJsonMessage,
//       }}
//     >
//       {children}
//     </WSContext.Provider>
//   );
// }
