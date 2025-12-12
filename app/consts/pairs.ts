
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

export const Networks = {
    usdt: [
      "Ethereum (ERC20)",
      "Tron (TRC20)",
      "BNB Smart Chain (BEP20)",
      "Solana (SOL)",
      "Polygon",
    ],
    usdc: [
      "Ethereum (ERC20)",
      "Solana (SOL)",
      "Tron (TRC20)",
      "BNB Smart Chain (BEP20)",
      "Polygon",
    ],

    btc: [
      "Bitcoin",
      "Lightning",
      "BNB Smart Chain (BEP20)",
      "Polygon",
      "Tron (TRC20)",
    ],
    eth: [
      "Ethereum",
      "Arbitrum One",
      "Optimism",
      "BNB Smart Chain (BEP20)",
      "Polygon",
    ],
    sol: [
      "Solana",
      "Ethereum (ERC20)",
      "BNB Smart Chain (BEP20)",
      "Polygon",
      "Tron (TRC20)",
    ],
    xrp: [
      "XRP Ledger",
      "Ethereum (ERC20)",
      "BNB Smart Chain (BEP20)",
      "Polygon",
      "Solana",
    ],
    doge: [
      "Dogecoin",
      "BNB Smart Chain (BEP20)",
      "Ethereum (ERC20)",
      "Polygon",
      "Tron (TRC20)",
    ],
    ada: [
      "Cardano",
      "BNB Smart Chain (BEP20)",
      "Ethereum (ERC20)",
      "Polygon",
      "Solana",
    ],
    avax: [
      "Avalanche C-Chain",
      "Ethereum",
      "BNB Smart Chain (BEP20)",
      "Polygon",
      "Arbitrum One",
    ],
    link: [
      "Ethereum (ERC20)",
      "Arbitrum One",
      "Optimism",
      "Polygon",
      "BNB Smart Chain (BEP20)",
    ],
    dot: [
      "Polkadot",
      "Ethereum (ERC20)",
      "BNB Smart Chain (BEP20)",
      "Polygon",
      "Solana",
    ],
    ltc: [
      "Litecoin",
      "BNB Smart Chain (BEP20)",
      "Ethereum (ERC20)",
      "Tron (TRC20)",
      "Polygon",
    ],
    shib: [
      "Ethereum (ERC20)",
      "BNB Smart Chain (BEP20)",
      "Polygon",
      "Solana",
      "Arbitrum",
    ],
    etc: [
      "Ethereum Classic",
      "Ethereum (ERC20)",
      "BNB Smart Chain (BEP20)",
      "Polygon",
      "Arbitrum",
    ],
    mana: [
      "Ethereum (ERC20)",
      "Polygon",
      "BNB Smart Chain (BEP20)",
      "Solana",
      "Tron (TRC20)",
    ],
    uni: [
      "Ethereum (ERC20)",
      "Arbitrum One",
      "Optimism",
      "Polygon",
      "BNB Smart Chain (BEP20)",
    ],
    bch: [
      "Bitcoin Cash",
      "Ethereum (ERC20)",
      "BNB Smart Chain (BEP20)",
      "Polygon",
      "Tron (TRC20)",
    ],
    trx: [
      "Tron (TRC20)",
      "BNB Smart Chain (BEP20)",
      "Ethereum (ERC20)",
      "Polygon",
      "Solana",
    ],
    xlm: [
      "Stellar",
      "Ethereum (ERC20)",
      "BNB Smart Chain (BEP20)",
      "Polygon",
      "Solana",
    ],
    atom: [
      "Cosmos",
      "Ethereum (ERC20)",
      "BNB Smart Chain (BEP20)",
      "Polygon",
      "Solana",
    ],
    near: [
      "NEAR",
      "Ethereum (ERC20)",
      "Aurora",
      "BNB Smart Chain (BEP20)",
      "Polygon",
    ],
    pepe: [
      "Ethereum (ERC20)",
      "BNB Smart Chain (BEP20)",
      "Polygon",
      "Solana",
      "Arbitrum One",
    ],
  }
