export default function () {
  return (
    <section className="bg-gray-900 mt-1 rounded-lg">
      <nav className="flex w-full p-3 gap-4 ">
        <div>
          <p>Chart</p>
        </div>
        <div className="md:hidden ">
          <p>OrderBook</p>
        </div>
        <div className="md:hidden">
          <p>Trades</p>
        </div>
        <div>
          <p>Info</p>
        </div>
      </nav>
      <div className="flex gap-2 p-2 border-y-2 border-y-gray-800">
        <p>1s</p>
        <p>1m</p>
        <p>15m</p>
        <p>1H</p>
        <p>1D</p>
        <p>1W</p>
      </div>
      <article className="min-h-130 md:min-h-100"></article>
    </section>
  );
}
