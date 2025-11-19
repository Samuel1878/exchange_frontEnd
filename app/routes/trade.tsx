import { useState } from "react";
import type { Route } from "./+types/trade";
import { useLoaderData, useSearchParams } from "react-router";
import { TradeButton } from "~/components/charts/components/buttons";
import MobileChart from "~/components/charts/mobileTrade";
import { useAppDispatch } from "~/utils/redux";
import useWebSocket from "react-use-websocket";
import { addTicker } from "~/context/slices/IndividualMiniTicker";
import ChartScreen from "~/components/charts/tradeChart";
import useWindowDimensions from "~/hook/windowWidth";
import { addAggTrade } from "~/context/slices/tradeSlice";
export function meta({}: Route.MetaArgs) {
  return [{ title: "Trade" }, { name: "description", content: "Trading" }];
}

export async function clientLoader({
  params,
  request,
}: Route.ClientLoaderArgs) {
  const type = params.type;
  const url = new URL(request.url);
  url.searchParams.set("pair", "btcusdt");
  const pair = url.searchParams.get("pair");

  return { type, pair };
}
export async function clientAction({ request }: Route.ClientActionArgs) {}

export default function SpotScreen({ loaderData }: Route.ComponentProps) {
  const { width } = useWindowDimensions();
  const { type, pair } = useLoaderData<typeof clientLoader>();
  const [isMobileTrade, setIsMobileTrade] = useState( width < 768)
  const dispatch = useAppDispatch();
  const isMobile = width < 768;
  const openMobileTrade = () => setIsMobileTrade(true);
  const closeMobileTrade = () => setIsMobileTrade(false);
  
  const { sendJsonMessage, getWebSocket } = useWebSocket(
    `wss://stream.binance.com:9443/ws/${pair}@ticker`,
    {
      onOpen: () => console.log("Ticker WebSocket connection opened."),
      onClose: () => console.log("Ticker WebSocket connection closed."),
      shouldReconnect: (closeEvent) => true,
      onMessage: (event: WebSocketEventMap["message"]) =>
        processMessages(event),
    }
  );

  const processMessages = (event: { data: string }) => {
    const response = JSON.parse(event.data);
    dispatch(addTicker(response));
  };
  const processAggTrade = (event:{data:string}) => {
    const resonse = JSON.parse(event.data);
    dispatch(addAggTrade(resonse))
  }
  useWebSocket(`wss://stream.binance.com:9443/ws/${pair}@aggTrade`, {
    onOpen:()=>console.log("AggTrade Websocket is opened"),
    onClose:()=>console.log("AggTrade Websocket is closed"),
    shouldReconnect:()=>true,
    onMessage:(event:WebSocketEventMap["message"]) => processAggTrade(event)
  })

  return (
    <main className="" id={"spot"}>
      {isMobile && isMobileTrade ? (
        <MobileChart product_id={pair} openMobileTrade={openMobileTrade} closeMobileTrade={closeMobileTrade} />
      ) : (
        <ChartScreen product_id={pair} openMobileTrade={openMobileTrade} type={type}/>
      )}
    </main>
  );
}
