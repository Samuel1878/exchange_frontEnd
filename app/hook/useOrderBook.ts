// useOrderbook.ts
import { useEffect, useRef } from "react";
import useWebSocket from "react-use-websocket";
import { createBatcher } from "~/utils/orderBookHelper";
import { useOrderbookStore } from "~/store/useOrderBookStore";

/**
 * Usage: useOrderbook("btcusdt", { batchMs: 100 })
 */
export function useOrderbook(symbol: string, opts?: { batchMs?: number }) {
  const batchMs = opts?.batchMs ?? 100; // tune between 50..200ms based on perf
  const setSnapshot = useOrderbookStore((s) => s.setSnapshot);
  const applyDiffs = useOrderbookStore((s) => s.applyDiffs);
  const reset = useOrderbookStore((s) => s.reset);

  const bufferRef = useRef<any[]>([]);
  const snapshotLoadedRef = useRef(false);

  // batcher groups many diff events before calling applyDiffs once
  const batcherRef = useRef(createBatcher<any>((items) => {
    // items is an array of diff events
    applyDiffs(items);
  }, batchMs));

  // Shared websocket: we will use BINANCE multiplexing. Keep share:true so other hooks can reuse.
  const stream = `${symbol.toLowerCase()}@depth@1000ms`; // or @depth for raw diffs
  const { sendJsonMessage, lastMessage } = useWebSocket(
    `wss://stream.binance.com:9443/ws/${stream}`,
    {
      share: true,
      onOpen: () => console.log("WebSocket Manager is Opened for OrderBook Diff"),
      onClose: () => console.log("WebSocket Manager is closed for OrderBook Diff"),
      shouldReconnect: (closeEvent) => true,
      reconnectAttempts: 10,
      reconnectInterval: (attemptNumber) =>
        Math.min(Math.pow(2, attemptNumber) * 1000, 10000),

      onMessage: (event: WebSocketEventMap["message"]) => {
        bufferRef.current.push(event.data);
      },
    }
  );
  // 1) fetch snapshot on mount or when snapshot lost
  useEffect(() => {
    let active = true;
    snapshotLoadedRef.current = true;
    // snapshotLoadedRef.current = false;
    sendJsonMessage({
      method: "SUBSCRIBE",
      params: [stream],
      id: Date.now(),
    });
    // (async () => {
    //   try {
    //     // Reset store while syncing to avoid stale state
    //     reset();

    //     // GET REST snapshot
    //     const url = https://api.binance.com/api/v3/depth?symbol=${symbol.toUpperCase()}&limit=1000;
    //     const res = await fetch(url);
    //     if (!active) return;
    //     const snap = await res.json();

    //     // apply snapshot
    //     setSnapshot({
    //       lastUpdateId: snap.lastUpdateId,
    //       bids: snap.bids.map((b: any) => [Number(b[0]), Number(b[1])]),
    //       asks: snap.asks.map((a: any) => [Number(a[0]), Number(a[1])]),
    //       symbol,
    //     });

    //     snapshotLoadedRef.current = true;

    //     // apply buffered diffs that arrived before snapshot
    //     if (bufferRef.current.length) {
    //       batcherRef.current.push(bufferRef.current.splice(0));
    //     }

    //     // ensure we are subscribed (multiplexed) to stream
    //     sendJsonMessage({
    //       method: "SUBSCRIBE",
    //       params: [ ${symbol.toLowerCase()}@depth@100ms ],
    //       id: Date.now()
    //     });
    //   } catch (err) {
    //     console.error("snapshot error", err);
    //   }
    // })();

    return () => {
      active = false;
      // unsubscribe
      try {
        sendJsonMessage({
          method: "UNSUBSCRIBE",
          params: [stream],
          id: Date.now(),
        });
      } catch {}
      batcherRef.current.forceFlush();
    };
  }, [symbol]);

  // 2) on websocket messages, buffer diffs until snapshot loaded, then push to batcher
//   useEffect(() => {
//     if (!lastMessage) return;
//     let data: any;
//     try {
//       data = JSON.parse(lastMessage.data);
//     } catch {
//       return;
//     }

//     // Depth update event structure can be: { e: 'depthUpdate', E, s, U, u, b, a }
//     if (data && data.e === "depthUpdate" && data.s && data.s.toLowerCase() === symbol.toLowerCase()) {
//       if (!snapshotLoadedRef.current) {
//         // buffer until snapshot loaded
//         bufferRef.current.push(data);
//       } else {
//         batcherRef.current.push(data);
//       }
//     }
//   }, [lastMessage]);
}