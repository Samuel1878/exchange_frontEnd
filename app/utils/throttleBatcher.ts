// throttleBatcher.ts
type Handler<T> = (batch: T[]) => void;

export function createBatcher<T>(handler: Handler<T>, ms = 100) {
  let queue: T[] = [];
  let timer: number | null = null;
  let raf = 0;

  function flush() {
    if (queue.length) {
      const copy = queue;
      queue = [];
      handler(copy);
    }
    timer = null;
    if (raf) {
      cancelAnimationFrame(raf);
      raf = 0;
    }
  }

  return {
    push(item: T) {
      queue.push(item);
      if (!timer) {
        // use rAF then setTimeout to align to paint but also limit frequency
        raf = requestAnimationFrame(() => {
          timer = window.setTimeout(flush, ms);
        });
      }
    },
    forceFlush() {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      flush();
    },
  };
}

export function rafThrottle(fn: (...args: any[]) => void) {
  let running = false;
  return (...args: any[]) => {
    if (running) return;
    running = true;
    requestAnimationFrame(() => {
      fn(...args);
      running = false;
    });
  };
}