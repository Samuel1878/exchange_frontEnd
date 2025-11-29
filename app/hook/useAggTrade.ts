import { useEffect, useRef } from "react";
import useWebSocket from "react-use-websocket";
import { LOCAL_URL } from "~/consts";
import { useAggTradeStore } from "~/store/useAggTradeStore";
// import { useWebSocketManager } from "./wsManager";
import { rafThrottle } from "~/utils/helpers";
// import { useWebSocket } from "react-use-websocket";
// import { useAggTradeStore } from "./useAggTradeStore";

export function useDepthAggTrades(streams: string[], pair: string) {
  
  const push = useAggTradeStore((s) => s.pushTrade);
    const addSnapShot = useAggTradeStore((s) => s.addSnapShot);

  const { sendJsonMessage, lastMessage, readyState } = useWebSocket(
    "wss://stream.binance.com:9443/ws",
    {
      share: false,
      onOpen: () => console.log("WebSocket Manager is Opened for DepthAgg"),
      onClose: () => console.log("WebSocket Manager is closed for DepthAgg"),
      shouldReconnect: (closeEvent) => true,
      reconnectAttempts: 10,
      reconnectInterval: (attemptNumber) =>
        Math.min(Math.pow(2, attemptNumber) * 1000, 10000),
      onMessage: (event: WebSocketEventMap["message"]) =>
        processMessages(event),
      
    }
  );

  const processMessages = rafThrottle((event: { data: string }) => {
    const response = JSON.parse(event.data);
    if (response?.result === null || response?.data?.result === null) return; 
      push({
        id: response?.a,
        price: Number(response?.p),
        amount: Number(Number(response?.q).toFixed(5)),
        time: Number(response?.T),
        maker: response?.m,
      });
     

  });
  useEffect(() => {
    const params = streams.map((s) => `${s}`);
    (async()=>{
      const response = await fetch(LOCAL_URL + "/aggtrade/" + pair.toUpperCase());
      const data = await response.json();
      if (data.length){
        console.log(data)
        addSnapShot(data)
      }
    })()
    streams.length &&
      sendJsonMessage({ method: "SUBSCRIBE", params, id: Date.now() });
    streams.length && console.log("SUBSCRIBED", params);
    return () => {
      streams.length &&
        sendJsonMessage({ method: "UNSUBSCRIBE", params, id: Date.now() });
      streams.length && console.log("UNSUBSCRIBE", params);
    };
  }, [streams.join(",")]);
}
