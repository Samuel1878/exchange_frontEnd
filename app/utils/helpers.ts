import { ORDERBOOK_LEVELS } from "~/consts";

export const upColor = "#00c951";
export const downColor = "#fb2c36";
export const groupByPrice = (levels: number[][]): number[][] => {
  return levels
    .map((level, idx) => {
      const nextLevel = levels[idx + 1];
      const prevLevel = levels[idx - 1];

      if (nextLevel && level[0] === nextLevel[0]) {
        return [level[0], level[1] + nextLevel[1]];
      } else if (prevLevel && level[0] === prevLevel[0]) {
        return [];
      } else {
        return level;
      }
    })
    .filter((level) => level.length > 0);
};

export const formatNumber = (arg: number): string => {
  return new Intl.NumberFormat("en-US").format(arg);
};


export function formatLevels(map) {
  let levels = Object.entries(map)
  return levels.slice(0, ORDERBOOK_LEVELS).map(([p, q]) => {
      let cumulative = Number(p) * Number(q)
   
    return { price: p, amount: q, total: cumulative };
  });
}

export const formatTotalPrice = (num:number):string => {
  if (!num){
    return "0.00"
  }
  if (num <1000) return num.toFixed(2).toString();
  const units = ["", "k", "M", "B", "T"];
  let unitIndex = 0;
  let value = num;
  while (value>= 1000 && unitIndex<units.length -1){
    value/=1000;
    unitIndex++
  }
  return value.toFixed(2).replace(/\.00$/, "") + units[unitIndex]
}



export function rafThrottle<T extends (...args: any[]) => void>(func: T) {
  let ticking = false;
  let lastArgs: any[];

  return (...args: Parameters<T>) => {
    lastArgs = args;

    if (!ticking) {
      ticking = true;
      requestAnimationFrame(() => {
        func(...lastArgs);
        ticking = false;
      });
    }
  };
}

