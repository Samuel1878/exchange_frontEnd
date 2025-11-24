import { useTickersStore, type BinanceTickers } from "~/store/useTickersStore";
// import { useWebSocketManager } from "./wsManager";
import { useEffect, useRef } from "react";
import { createBatcher, rafThrottle } from "~/utils/throttleBatcher";
import useWebSocket from "react-use-websocket";

export function useTickers (symbols: string[]){
       const applyBatch = useTickersStore((s) => s.applyBatch);
        const { sendJsonMessage, lastMessage, readyState } = useWebSocket(
          "wss://stream.binance.com:9443/stream",
          {
            share: false,
            onOpen: () =>
              console.log("WebSocket Manager is Opened for Tickers"),
            onClose: () =>
              console.log("WebSocket Manager is closed for Tickers"),
            shouldReconnect: (closeEvent) => true,
            reconnectAttempts: 10,
            reconnectInterval: (attemptNumber) =>
              Math.min(Math.pow(2, attemptNumber) * 1000, 10000),
            onMessage: (event: WebSocketEventMap["message"]) => process(event),
          }
        );
 
        const batcher = useRef(
          createBatcher((arr: BinanceTickers[]) => {
            const mapped = arr.map((d: BinanceTickers) => ({
              symbol: d.s,
              priceChange: d.p,
              priceChangePercent: d.P,
              lowPrice: d.l,
              highPrice: d.h,
              quoteVolume: d.q,
              baseVolume: d.v,
              lastPrice: d.c,
            }));
// console.log(mapped);
            applyBatch(mapped);
          }, 100)
        ).current;
    const process = (event: {data:string})=> {
            const response = JSON.parse(event.data);
             if (response?.result ===null || response.data?.result === null) return;
            batcher.push(response.data)

    }

    useEffect(()=>{
        const params = symbols.map((s)=> `${s}`);
       symbols.length&& sendJsonMessage({method:"SUBSCRIBE", params, id:Date.now()});
        symbols.length && console.log("SUBSCRIBED", params);
        return ()=> {
            symbols.length && sendJsonMessage({method:"UNSUBSCRIBE", params, id:Date.now()})
            symbols.length && console.log("UNSUBSCRIBE", params);
        };
    },[symbols.join(",")]);

    // useEffect(()=>{
    //     if (!lastMessage) return;
    //     // if (lastMessage?. === null) return
    //     const streamData = lastMessage && lastMessage?.data ? JSON.parse(lastMessage?.data):null
    //     if (streamData?.data?.result === null) return
    //     // console.log("lastMessage" , lastMessage)
    //     if (streamData?.data?.e === "24hrTicker") batcher.push(streamData?.data);
    // },[lastMessage])
}