import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("routes/navBarLayout.tsx", [
    index("routes/home.tsx"),
    route("market", "./routes/market.tsx"),
    route("ai", "./routes/ai.tsx"),
    route("spot", "./routes/spot.tsx"),
  ]),
] satisfies RouteConfig;
