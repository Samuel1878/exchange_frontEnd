import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  layout("routes/layout/rootLayout.tsx", [
    layout("routes/layout/navBarLayout.tsx", [
      index("routes/home.tsx"),
      ...prefix("market", [
        index("./routes/market/market.tsx"),
        route(":type", "./routes/market/price/[type].tsx"),
      ]),
      route("ai", "./routes/ai.tsx"),
      ...prefix("trade", [
        route(":pair", "./routes/trade.tsx"),
        route("convert/:from/:to", "./routes/convert.tsx"),
      ]),
      ...prefix("charity", [
        index("./routes/charity/charity.tsx"),
        route("projects", "./routes/charity/projects/index.tsx"),
        route("projects/:id", "./routes/charity/projects/[type].tsx"),
      ]),
      route("wallet", "./routes/wallet.tsx"),
      ...prefix("finance", [
        ...prefix("earn", [
          index("./routes/earn/index.tsx"),
          route(":type", "./routes/earn/subscribe/[type].tsx"),
        ]),
        route("loans", "./routes/loan.tsx"),
      ]),
      route("trends", "./routes/news/index.tsx"),
      ...prefix("ico", [
        index("./routes/ico/index.tsx"),
        route("announcement/:type", "./routes/ico/announcement/[type].tsx"),
      ]),
      route("deposit", "./routes/deposit.tsx"),
      route("term","./routes/TermsAndServer.tsx"),
      route("privacy","./routes/privacy.tsx"),
      route("about","./routes/about.tsx"),
    ]),

    route("login", "./routes/auth/login.tsx"),
    route("register", "./routes/auth/register.tsx"),
  ]),
] satisfies RouteConfig;
