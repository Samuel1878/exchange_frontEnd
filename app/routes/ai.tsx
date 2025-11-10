import type { Route } from "./+types/home";
import AiScreen from "~/screens/ai";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Ai Strategy" },
    { name: "description", content: "Welcome" },
  ];
}

export default function AI() {
  return <AiScreen />;
}
