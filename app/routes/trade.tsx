import { useState } from "react";
import type { Route } from "./+types/trade";
import { useLoaderData, useSearchParams } from "react-router";
import { TradeButton } from "~/components/charts/components/buttons";
import MobileChart from "~/components/charts/mobileChart";
export function meta({}: Route.MetaArgs) {
  return [{ title: "Trade" }, { name: "description", content: "Trading" }];
}

export async function clientLoader({ params , request}: Route.ClientLoaderArgs) {
  const type = params.type;
  const url = new URL(request.url);
  url.searchParams.set("pair", "BTC_USDT")
  const pair = url.searchParams.get("pair");

  return {type, pair};
}
export async function clientAction({ request }: Route.ClientActionArgs) {}
export default function SpotScreen({ loaderData }: Route.ComponentProps) {
  const {type ,pair} = useLoaderData<typeof clientLoader>();

  

  return (
    <main className="" id={"trade"}>
      <div className="bg-gray-950 md:hidden">
        <MobileChart/>

      </div>
      <div className="hidden md:block">

      </div>
    </main>
  );
}
