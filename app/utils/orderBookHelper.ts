// orderbookUtils.ts
export type Level = [number, number]; // [price, qty]

// Simple batcher: collect items, call handler every ms
export function createBatcher<T>(handler: (items: T[]) => void, ms = 100) {
  let queue: T[] = [];
  let timer: number | null = null;

  function flush() {
    if (queue.length) {
      const items = queue;
      queue = [];
      handler(items);
    }
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  }

  return {
    push(item: T | T[]) {
      if (Array.isArray(item)) queue.push(...item);
      else queue.push(item);
      if (timer == null) {
        timer = window.setTimeout(flush, ms);
      }
    },
    forceFlush() {
      flush();
    },
  };
}

// Group depth into buckets with tickSize (e.g., 0.01, 0.1, 1)
export function groupDepth(levels: Level[], tickSize: number) {
  const map = new Map<number, number>();
  for (const [price, qty] of levels) {
    const bucket = Math.floor(price / tickSize) * tickSize;
    const prev = map.get(bucket) ?? 0;
    map.set(bucket, prev + qty);
  }
  return Array.from(map.entries())
    .map(([p, q]) => [p, q] as Level)
    .sort((a, b) => a[0] - b[0]);
}

// Add cumulative totals to ascending levels. For bids (desc) reverse before calling.
export function addCumulative(levels: Level[]) {
  let cum = 0;
  return levels.map(([price, qty]) => {
    cum += qty;
    return { price, qty, cumulative: cum };
  });
}
