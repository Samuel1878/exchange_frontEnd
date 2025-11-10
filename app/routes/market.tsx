import type { Route } from "./+types/home";
import MarketScreen from "~/screens/market";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Home" },
    { name: "description", content: "Welcome" },
  ];
}

export default function Market() {
  return <MarketScreen />;
}
