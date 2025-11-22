export const colorGray = '#888';
export const colorGreenOpacity = 'rgba(71, 178, 98, 0.2)';
export const colorRedOpacity = 'rgba(235, 84, 84, 0.2)';
export const colorGreen = '#47b262';
export const colorRed = '#eb5454';
export const priceFormatter = (value) => {
  if (!value){
    return "0.0000"
  }
  const result = Math.round(value * 100) / 100 + '';
  // Adding padding 0 if needed
  let dotIndex = result.indexOf('.');
  if (dotIndex < 0) {
    return result + '.00';
  } else if (dotIndex === result.length - 2) {
    return result + '0';
  }
  return result;
};
export const formatPrice = (arg: number): string => {
  if (!arg){
    return "0.0000"
  }
    return arg.toLocaleString("en", {
      useGrouping: true,
      minimumFractionDigits: 2,
    });
  };

export const ProductIds = {
  btcusdt: 'BTC/USDT',
  ethusdt: 'ETH/USDT'
};


export const ProductsMap: any = [
  {
    id: 1,
    value: "btcusdt",
    label: "BTC/USDT",
  },
  {
    id: 1,
    value: "btcusdt",
    label: "BTC/USDT",
  },
  {
    id: 1,
    value: "btcusdt",
    label: "BTC/USDT",
  },
  {
    id: 1,
    value: "btcusdt",
    label: "BTC/USDT",
  },
  {
    id: 1,
    value: "btcusdt",
    label: "BTC/USDT",
  },
  {
    id: 1,
    value: "btcusdt",
    label: "BTC/USDT",
  },
  {
    id: 1,
    value: "btcusdt",
    label: "BTC/USDT",
  },
  {
    id: 1,
    value: "btcusdt",
    label: "BTC/USDT",
  },
  {
    id: 1,
    value: "btcusdt",
    label: "BTC/USDT",
  },
  {
    id: 1,
    value: "btcusdt",
    label: "BTC/USDT",
  },
  {
    id: 1,
    value: "btcusdt",
    label: "BTC/USDT",
  },
  {
    id: 1,
    value: "btcusdt",
    label: "BTC/USDT",
  },
];