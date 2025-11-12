import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  layout("routes/layout/navBarLayout.tsx", [
    index("routes/home.tsx"),
    route("market", "./routes/market.tsx"),
    route("ai", "./routes/ai.tsx"),
    ...prefix("trade", [
      route(":type", "./routes/trade.tsx")
    ])
  ]),
] satisfies RouteConfig;
