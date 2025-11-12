export default function ({pair}) {
  return (
    <header className="flex justify-between px-4 pb-2 bg-gray-900 lg:bg-gray-950 items-end md:pt-2 md:items-center">
      <div className="space-y-2 flex flex-col flex-1 md:flex-row md:gap-2 md:justify-around">
        <div className="flex items-center gap-2">
          <img src="../../assets/coins/btc_eth.png" className="w-8" />
          <p className="text-md font-bold md:text-lg">
            {pair?.toString().replace("_", "/")}
          </p>
        </div>
        <div>
          <p className="text-2xl font-bold md:text-xl">103,126.82</p>

          <p className="hidden md:block text-xs">$103,126.82</p>
        </div>
        <div className="hidden md:block">
          <p className="font-thin text-xs">24h Change</p>
          <p className="text-green-400">$254.25 +24%</p>
        </div>
        <div className="flex items-center gap-2 md:hidden">
          <p className="font-light text-xs">$103,126.82</p>
          <p className="text-red-600 text-xs">-0.87%</p>
        </div>
      </div>
      <div className="flex justify-between flex-1">
        <div className="space-y-2 md:flex md:flex-1 md:justify-around">
          <div>
            <p className="text-gray-500 font-thin text-xs">24h High</p>
            <p className="text-xs text-gray-50">105,500.00</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">24h Low</p>
            <p className="text-xs text-gray-50">102,437.09</p>
          </div>
        </div>
        <div className="space-y-2 md:flex md:flex-1 md:justify-around">
          <div>
            <p className="text-gray-500 font-thin text-xs">24h Volume(BTC)</p>
            <p className="text-xs text-gray-50">105,500.00</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">24h Volume(USDT)</p>
            <p className="text-xs text-gray-50">102,437.09</p>
          </div>
        </div>
      </div>
    </header>
  );
}
