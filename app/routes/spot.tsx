import SpotScreen from "~/screens/spot";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Spot" },
    { name: "description", content: "Spot Trading" },
  ];
}

export default function Home() {
  return <SpotScreen />;
}
