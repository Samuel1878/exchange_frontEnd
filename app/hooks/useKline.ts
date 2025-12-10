import type { UTCTimestamp } from "lightweight-charts";
import { memo, useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";
import { LOCAL_URL } from "~/consts";
import { useKlineStore, type BinanceUiKline } from "~/store/useKlineStore";
import { rafThrottle } from "~/utils/helpers";

export const useKlines = (symbol: string, interval: string) => {
  const applySnapShot = useKlineStore((s) => s.applySnapShot);
  const [url, setUrl] = useState("wss://stream.binance.com:9443/ws");
  const applyStream = useKlineStore((s) => s.applyStream);

  const { sendJsonMessage } = useWebSocket(url, {
    share: false,
    onOpen: () => console.log("WebSocket Manager is Opened for Kline"),
    onClose: () => console.log("WebSocket Manager is closed for Kline"),
    shouldReconnect: (closeEvent) => true,
    reconnectAttempts: 10,
    reconnectInterval: (attemptNumber) =>
      Math.min(Math.pow(2, attemptNumber) * 1000, 10000),
    onMessage: (event: WebSocketEventMap["message"]) => processMessages(event),
    onError: (event) => {
      setUrl("wss://stream.binance.com:433/ws");
      console.log(event);
    },
  });

  const processMessages = rafThrottle((event: { data: string }) => {
    const response = JSON.parse(event.data);
    if (response?.result === null || response?.data?.result === null) return;
    //  console.log(response);
    applyStream(interval, response);
  });
  useEffect(() => {
      (async () => {
        const response = await fetch(
          `${LOCAL_URL}/kline/${symbol.toUpperCase()}?interval=${interval}`
        );
        const data = await response.json();
        applySnapShot(interval, data);
        console.log("KLINE SNAPSHOT FETCHED");
      })();
    const params = [`${symbol.toLowerCase()}@kline_${interval}`];
    sendJsonMessage({ method: "SUBSCRIBE", params, id: Date.now() });
    console.log("SUBSCRIBED", params);
    return () => {
      sendJsonMessage({ method: "UNSUBSCRIBE", params, id: Date.now() });
      console.log("UNSUBSCRIBE", params);
    };
  }, [interval, symbol]);
}
