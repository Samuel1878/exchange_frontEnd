import { Activity, useCallback, useEffect, useState } from "react";
import type { Route } from "./+types/trade";
import MobileChart from "~/components/charts/mobileTrade";
import ChartScreen from "~/components/charts/tradeChart";
import useWindowDimensions from "~/hooks/windowWidth";
import { useDepthAggTrades } from "~/hooks/useAggTrade";
import { useOrderbook } from "~/hooks/useOrderBook";
import { useKlines } from "~/hooks/useKline";
import { useTickers } from "~/hooks/useTickers";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Trade" }, { name: "description", content: "Trading" }];
}
interface Delta {
  bids: string[][];
  asks: string[][];
}

export async function clientLoader({
  params,
  request,
}: Route.ClientLoaderArgs) {
  const pair = params.pair;
  const url = new URL(request.url);
  const type = url.searchParams.get("type");
  return { type, pair };
}

export async function clientAction({ request }: Route.ClientActionArgs) {}

export default function SpotScreen({ loaderData }: Route.ComponentProps) {
  const { width } = useWindowDimensions();
  const { type, pair } = loaderData;
  const [isMobileTrade, setIsMobileTrade] = useState(width < 768);
  const [isBuy, setIsBuy] = useState(true);
  const isMobile = width < 768;
  const openMobileTrade = () => setIsMobileTrade(true);
  const closeMobileTrade = () => setIsMobileTrade(false);
  useDepthAggTrades([`${pair}@aggTrade`], pair);
  useOrderbook([`${pair}@depth20@1000ms`], pair);
  useTickers([
    "btcusdt@ticker",
    "ethusdt@ticker",
    "solusdt@ticker",
    "xrpusdt@ticker",
    "dogeusdt@ticker",
    "adausdt@ticker",
    "avaxusdt@ticker",
    "linkusdt@ticker",
    "dotusdt@ticker",
    "ltcusdt@ticker",
    "shibusdt@ticker",
    "etcusdt@ticker",
    "manausdt@ticker",
    "uniusdt@ticker",
    "bchusdt@ticker",
    "trxusdt@ticker",
    "xlmusdt@ticker",
    "atomusdt@ticker",
    "nearusdt@ticker",
    "pepeusdt@ticker",
  ]);
  return (
    <main
      className="lg:flex lg:justify-center bg-gray-900 lg:bg-black overflow-x-hidden"
      id={"spot"}
    >
      <Activity mode={isMobile && isMobileTrade ? "visible" : "hidden"}>
        <MobileChart
          pair={pair}
          type={type}
          isBuy={isBuy}
          setIsBuy={setIsBuy}
          openMobileTrade={openMobileTrade}
          closeMobileTrade={closeMobileTrade}
        />
      </Activity>
      <Activity mode={isMobile && isMobileTrade ? "hidden" : "visible"}>
        <ChartScreen
          pair={pair}
          isBuy={isBuy}
          setIsBuy={setIsBuy}
          openMobileTrade={openMobileTrade}
          type={type}
        />
      </Activity>
      {/* {isMobile && isMobileTrade ? (
        
      ) : (
       
      )} */}
    </main>
  );
}
