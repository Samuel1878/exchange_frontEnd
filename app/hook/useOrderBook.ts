// useOrderbook.ts
import { useEffect, useRef } from "react";
import useWebSocket from "react-use-websocket";
import { createBatcher } from "~/utils/orderBookHelper";
import {
  useOrderbookStore,
  type BinanceResponse,
} from "~/store/useOrderBookStore";
import { rafThrottle } from "~/utils/helpers";

/**
 * Usage: useOrderbook("btcusdt", { batchMs: 100 })
 */
export function useOrderbook(stream: string[]) {
  const applyDiffs = useOrderbookStore((s) => s.applyDiffs);
  const reset = useOrderbookStore((s) => s.reset);

  // const stream = `${symbol.toLowerCase()}@depth20@1000ms`; // or @depth for raw diffs
  const { sendJsonMessage, lastMessage } = useWebSocket(
    `wss://stream.binance.com:9443/ws/${stream}`,
    {
      share: true,
      onOpen: () =>
        console.log("WebSocket Manager is Opened for OrderBook Diff"),
      onClose: () =>
        console.log("WebSocket Manager is closed for OrderBook Diff"),
      shouldReconnect: (closeEvent) => true,
      reconnectAttempts: 10,
      reconnectInterval: (attemptNumber) =>
        Math.min(Math.pow(2, attemptNumber) * 1000, 10000),

      onMessage: (event: WebSocketEventMap["message"]) => {
        processMessages(event);
      },
    }
  );
  const processMessages = rafThrottle((event: { data: string }) => {
    const response = JSON.parse(event?.data);
    if (response?.result === null || response?.data?.result === null) return;
    applyDiffs(response);
  });
  useEffect(() => {
    sendJsonMessage({
      method: "SUBSCRIBE",
      params: stream,
      id: Date.now(),
    });
    console.log("SUBSCRIBE", stream)

    return () => {
      // unsubscribe
      try {
        sendJsonMessage({
          method: "UNSUBSCRIBE",
          params: stream,
          id: Date.now(),
        });
        reset();
        console.log("UNSCRIBE", stream)
      } catch {}
    };
  }, [stream.join(",")]);
}
