import { useCallback, useEffect, useState } from "react";
import type { Route } from "./+types/trade";
import MobileChart from "~/components/charts/mobileTrade";
import ChartScreen from "~/components/charts/tradeChart";
import useWindowDimensions from "~/hook/windowWidth";

// import { useTickers } from "~/hook/useTickers";
import { useDepthAggTrades } from "~/hook/useAggTrade";

import { useOrderbook } from "~/hook/useOrderBook";
import { useKlines } from "~/hook/useKline";

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
  const isMobile = width < 768;
  const openMobileTrade = () => setIsMobileTrade(true);
  const closeMobileTrade = () => setIsMobileTrade(false);
  useDepthAggTrades([`${pair}@aggTrade`], pair);
  useOrderbook([`${pair}@depth20@1000ms`]);

  return (
    <main
      className="lg:flex lg:justify-center bg-gray-900 lg:bg-black overflow-x-hidden"
      id={"spot"}
    >
      {isMobile && isMobileTrade ? (
        <MobileChart
          pair={pair}
          type={type}
          openMobileTrade={openMobileTrade}
          closeMobileTrade={closeMobileTrade}
        />
      ) : (
        <ChartScreen
          pair={pair}
          openMobileTrade={openMobileTrade}
          type={type}
        />
      )}
    </main>
  );
}
