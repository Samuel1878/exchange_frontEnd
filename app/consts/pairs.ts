import type { NetworksMap } from "~/utils/types";

export const CoinPairs = {
  btcusdt: {
    value: "btcusdt",
    label: "BTC/USDT",
    names: ["BTC", "USDT", "Bitcoin", "Tether"],
  },
  ethusdt: {
    value: "ethusdt",
    label: "ETH/USDT",
    names: ["ETH", "USDT", "Ethereum", "Tether"],
  },
  solusdt: {
    value: "solusdt",
    label: "SOL/USDT",
    names: ["SOL", "USDT", "Solana", "Tether"],
  },
  xrpusdt: {
    value: "xrpusdt",
    label: "XRP/USDT",
    names: ["XRP", "USDT", "Ripple", "Tether"],
  },
  dogeusdt: {
    value: "dogeusdt",
    label: "DOGE/USDT",
    names: ["DOGE", "USDT", "Dogecoin", "Tether"],
  },
  adausdt: {
    value: "adausdt",
    label: "ADA/USDT",
    names: ["ADA", "USDT", "Cardano", "Tether"],
  },
  avaxusdt: {
    value: "avaxusdt",
    label: "AVAX/USDT",
    names: ["AVAX", "USDT", "Avalanche", "Tether"],
  },
  linkusdt: {
    value: "linkusdt",
    label: "LINK/USDT",
    names: ["LINK", "USDT", "Chainlink", "Tether"],
  },
  dotusdt: {
    value: "dotusdt",
    label: "DOT/USDT",
    names: ["DOT", "USDT", "Polkadot", "Tether"],
  },
  ltcusdt: {
    value: "ltcusdt",
    label: "LTC/USDT",
    names: ["LTC", "USDT", "Litecoin", "Tether"],
  },
  shibusdt: {
    value: "shibusdt",
    label: "SHIB/USDT",
    names: ["SHIB", "USDT", "Shiba Inu", "Tether"],
  },
  etcusdt: {
    value: "etcusdt",
    label: "ETC/USDT",
    names: ["ETC", "USDT", "Ethereum Classic", "Tether"],
  },
  manausdt: {
    value: "manausdt",
    label: "MANA/USDT",
    names: ["MANA", "USDT", "Decentraland", "Tether"],
  },
  uniusdt: {
    value: "uniusdt",
    label: "UNI/USDT",
    names: ["UNI", "USDT", "Uniswap", "Tether"],
  },
  bchusdt: {
    value: "bchusdt",
    label: "BCH/USDT",
    names: ["BCH", "USDT", "Bitcoin Cash", "Tether"],
  },
  trxusdt: {
    value: "trxusdt",
    label: "TRX/USDT",
    names: ["TRX", "USDT", "Tron", "Tether"],
  },
  xlmusdt: {
    value: "xlmusdt",
    label: "XLM/USDT",
    names: ["XLM", "USDT", "Stellar Lumens", "Tether"],
  },
  atomusdt: {
    value: "atomusdt",
    label: "ATOM/USDT",
    names: ["ATOM", "USDT", "Cosmos", "Tether"],
  },
  nearusdt: {
    value: "nearusdt",
    label: "NEAR/USDT",
    names: ["NEAR", "USDT", "NEAR Protocol", "Tether"],
  },
  pepeusdt: {
    value: "pepeusdt",
    label: "PEPE/USDT",
    names: ["PEPE", "USDT", "Pepe", "Tether"],
  },
};
export const StableCoins = {
  usdt: {
    name: "Tether",
    symbol: "USDT",
  },
  usdc: {
    name: "USD Coin",
    symbol: "USDC",
  },
};
export const AltCoins = {
  btc: {
    name: "Bitcoin",
    symbol: "BTC",
  },
  eth: {
    name: "Ethereum",
    symbol: "ETH",
  },
  sol: {
    name: "Solana",
    symbol: "SOL",
  },
  xrp: {
    name: "Ripple",
    symbol: "XRP",
  },
  doge: {
    name: "Dogecoin",
    symbol: "DOGE",
  },
  ada: {
    name: "Cardano",
    symbol: "ADA",
  },
  avax: {
    name: "Avalanche",
    symbol: "AVAX",
  },
  link: {
    name: "Chainlink",
    symbol: "LINK",
  },
  dot: {
    name: "Polkadot",
    symbol: "DOT",
  },
  ltc: {
    name: "Litecoin",
    symbol: "LTC",
  },
  shib: {
    name: "Shiba Inu",
    symbol: "SHIB",
  },
  etc: {
    name: "Ethereum Classic",
    symbol: "ETC",
  },
  mana: {
    name: "Decentraland",
    symbol: "MANA",
  },
  uni: {
    name: "Uniswap",
    symbol: "UNI",
  },
  bch: {
    name: "Bitcoin Cash",
    symbol: "BCH",
  },
  trx: {
    name: "Tron",
    symbol: "TRX",
  },
  xlm: {
    name: "Stellar Lumens",
    symbol: "XLM",
  },
  atom: {
    name: "Cosmos",
    symbol: "ATOM",
  },
  near: {
    name: "NEAR Protocol",
    symbol: "NEAR",
  },
  pepe: {
    name: "pepe",
    symbol: "PEPE",
  },
};
export const AllCoinNames = {
  ...AltCoins,
  ...StableCoins,
};

export const Networks: NetworksMap= {
  usdt: [
    { name: "Ethereum (ERC20)", fee: 1, mini: 10 },
    { name: "Tron (TRC20)", fee: 1, mini: 10 },
    { name: "BNB Smart Chain (BEP20)", fee: 0.01, mini: 10 },
    { name: "Solana (SOL)", fee: 0.6, mini: 10 },
    { name: "Polygon", fee: 0.03, mini: 10 },
  ],

  usdc: [
    { name: "Ethereum (ERC20)", fee: 1.2, mini: 20 },
    { name: "Solana (SOL)", fee: 0.5, mini: 10 },
    { name: "BNB Smart Chain (BEP20)", fee: 0, mini: 10 },
    { name: "Polygon", fee: 0.032, mini: 10 },
  ],

  btc: [
    { name: "Bitcoin", fee: 0.000015, mini: 0.00012 },
    { name: "Lightning", fee: 0.000001, mini: 0.00002 },
    { name: "BNB Smart Chain (BEP20)", fee: 0.0000003, mini: 0.0000006 },
    { name: "Ethereum (ERC20)", fee: 0.000011, mini: 0.000022 },
  ],

  eth: [
    { name: "Ethereum (ERC20)", fee: 0.0002, mini: 0.002 },
    { name: "Arbitrum One", fee: 0.00002, mini: 0.0003 },
    { name: "Optimism", fee: 0.00001, mini: 0.00002 },
    { name: "BNB Smart Chain (BEP20)", fee: 0.0000086, mini: 0.000017 },
  ],

  sol: [
    { name: "Solana", fee: 0.001, mini: 0.1 },
    { name: "BNB Smart Chain (BEP20)", fee: 0.0002, mini: 0.0004 },
  ],

  xrp: [
    { name: "XRP Ledger", fee: 0.2, mini: 2 },
    { name: "Ethereum (ERC20)", fee: 0.49, mini: 0.98 },
    { name: "BNB Smart Chain (BEP20)", fee: 0.013, mini: 0.026 },
  ],

  doge: [
    { name: "Dogecoin", fee: 4, mini: 8 },
    { name: "BNB Smart Chain (BEP20)", fee: 0.19, mini: 0.38 },
  ],

  ada: [
    { name: "Cardano", fee: 0.8, mini: 2 },
    { name: "BNB Smart Chain (BEP20)", fee: 0.055, mini: 0.13 },
  ],
  avax: [{ name: "Avalanche C-Chain", fee: 0.004, mini: 0.008 }],
  link: [{ name: "Ethereum (ERC20)", fee: 0.073, mini: 0.15 }],
  dot: [
    { name: "Ethereum (ERC20)", fee: 0.49, mini: 0.98 },
    { name: "Polkadot", fee: 0.05, mini: 1 },
  ],
  ltc: [{ name: "Litecoin", mini: 0.002, fee: 0.0001 }],
  shib: [{ name: "Ethereum (ERC20)", fee: 119279, mini: 238558 }],
  etc: [{ name: "Ethereum Classic", mini: 0.02, fee: 0.002 }],
  mana: [{ name: "Ethereum (ERC20)", fee: 6.87, mini: 13 }],
  uni: [{ name: "Ethereum (ERC20)", fee: 0.18, mini: 0.36 }],
  bch: [
    { name: "Bitcoin Cash", mini: 0.002, fee: 0.0002 },
    { name: "Ethereum (ERC20)", mini: 0.0034, fee: 0.0017 },
  ],
  trx: [
    { name: "Tron (TRC20)", mini: 30, fee: 1.5 },
    { name: "Ethereum (ERC20)", mini: 7.32, fee: 3.66 },
  ],
  xlm: [{ name: "Stellar", mini: 10, fee: 0.005 }],
  atom: [{ name: "Cosmos", mini: 0.04, fee: 0.02 }],
  near: [{ name: "NEAR Protocol", mini: 0.6, fee: 0.018 }],
  pepe: [{ name: "Ethereum (ERC20)", mini: 456952, fee: 228476 }],
};
