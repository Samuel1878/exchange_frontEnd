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
    route("market", "./routes/market/market.tsx"),
    ...prefix("market/price", [
      route(":type", "./routes/market/price/[type].tsx")
    ]),
    route("ai", "./routes/ai.tsx"),

    ...prefix("trade", [
      route(":type", "./routes/trade.tsx")
    ]),
    route("charity", "./routes/charity/charity.tsx"),

    ...prefix("charity/", [

      route("projects", "./routes/charity/projects/index.tsx"),
      route("projects/:id", "./routes/charity/projects/[type].tsx"),
    ]),
    route("asset", "./routes/wallet.tsx"),
    ...prefix("earn", [
      route("loans", "./routes/loan.tsx"),
    ])
  ]),
] satisfies RouteConfig;
