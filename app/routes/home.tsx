import type { Route } from "./+types/home";
import HomeScreen from "~/screens/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Home" },
    { name: "description", content: "Welcome" },
  ];
}

export default function Home() {
  return <HomeScreen />;
}
