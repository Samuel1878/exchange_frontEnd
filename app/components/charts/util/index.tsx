export const colorGray = '#888';
export const colorGreenOpacity = 'rgba(71, 178, 98, 0.2)';
export const colorRedOpacity = 'rgba(235, 84, 84, 0.2)';
export const colorGreen = '#47b262';
export const colorRed = '#eb5454';
export const priceFormatter = (value) => {
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

export const ProductIds = {
  XBTUSD: 'PI_XBTUSD',
  ETHUSD: 'PI_ETHUSD'
};

const options: any = {
  PI_XBTUSD: [0.5, 1, 2.5],
  PI_ETHUSD: [0.05, 0.1, 0.25]
};

export const ProductsMap: any = {
  "PI_XBTUSD": "PI_ETHUSD",
  "PI_ETHUSD": "PI_XBTUSD",
}
