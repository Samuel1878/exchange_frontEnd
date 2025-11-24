import { useEffect, useRef } from "react";
import useWebSocket from "react-use-websocket";
import { useAggTradeStore } from "~/store/useAggTradeStore";
// import { useWebSocketManager } from "./wsManager";
import { rafThrottle } from "~/utils/helpers";
// import { useWebSocket } from "react-use-websocket";
// import { useAggTradeStore } from "./useAggTradeStore";

export function useDepthAggTrades(streams: string[], pair: string) {
  const push = useAggTradeStore((s) => s.pushTrade);
  //   const flush = useAggTradeStore((s) => s.flush);

  const { sendJsonMessage, lastMessage, readyState } = useWebSocket(
    "wss://stream.binance.com:9443/stream",
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
      if (response?.stream === pair + "@aggTrade") {
      push({
        id: response?.data.a,
        price: Number(response?.data.p),
        amount: Number(Number(response?.data.q).toFixed(5)),
        time: Number(response?.data.T),
        maker: response.data.m,
      });
      return;
    } else {
      console.log(response);
    }
  });
  useEffect(() => {
    const params = streams.map((s) => `${s}`);
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
