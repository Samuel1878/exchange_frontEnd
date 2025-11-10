import SpotScreen from "~/screens/trade/spot";
import type { Route } from "./+types/spot";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Spot" },
    { name: "description", content: "Spot Trading" },
  ];
}

export default function Sport() {
  return <SpotScreen />;
}
