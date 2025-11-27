import { useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";
import { useKlineStore } from "~/store/useKlineStore";
import { rafThrottle } from "~/utils/helpers";

export const useKlines = (symbol: string, interval: string) => {
  const applySnapShot = useKlineStore((s) => s.applySnapShot);
  const applyStream = useKlineStore((s) => s.applyStream);
  const { sendJsonMessage } = useWebSocket(`wss://stream.binance.com:9443/ws`, {
    share: false,
    onOpen: () => console.log("WebSocket Manager is Opened for Kline"),
    onClose: () => console.log("WebSocket Manager is closed for Kline"),
    shouldReconnect: (closeEvent) => true,
    reconnectAttempts: 10,
    reconnectInterval: (attemptNumber) =>
      Math.min(Math.pow(2, attemptNumber) * 1000, 10000),
    onMessage: (event: WebSocketEventMap["message"]) => processMessages(event),
  });

  const processMessages = rafThrottle((event: { data: string }) => {
    const response = JSON.parse(event.data);
    if (response?.result === null || response?.data?.result === null) return;
    //  console.log(response);
    applyStream(interval, response);
  });
  useEffect(() => {
    (async () => {
      await fetch(
        `http://localhost:3000/kline/${symbol.toUpperCase()}?interval=${interval}`
      ).then((e) => {
        applySnapShot(interval, e.json());
      }).catch(()=> console.log("Getting kline via REST api is failed")
      );
    })();
  }, [symbol, interval]);
  useEffect(() => {
    const params = [`${symbol.toLowerCase()}@kline_${interval}`];
    sendJsonMessage({ method: "SUBSCRIBE", params, id: Date.now() });
    console.log("SUBSCRIBED", params);
    return () => {
      sendJsonMessage({ method: "UNSUBSCRIBE", params, id: Date.now() });
      console.log("UNSUBSCRIBE", params);
    };
  }, [interval, symbol]);
};
