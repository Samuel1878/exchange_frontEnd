import type { aggTradeStreams } from "~/context/slices/tradeSlice";
import { useAppSelector } from "~/utils/redux";
import { formatPrice } from "../util";
import moment from "moment"
const TradingPriceRow = ({e}:{e:aggTradeStreams})=>{
    const time = moment(e.time).format("hh:mm:ss")
    return (
      <div className="flex pr-2 w-full justify-between items-center mb-1">
        <div className="flex-1 ">
          <p
            className={`text-sm ${e.isBuyerMarket ? "text-green-400" : "text-red-500"}`}
          >
            {formatPrice(Number(e.price))}
          </p>
        </div>
        <div className="flex-1 justify-between flex gap-8">
          <p className="text-sm text-gray-50">{e.amount}</p>
          <p className="text-sm text-gray-50">{time}</p>
        </div>
      </div>
    );
}


export default function ({product_id}) {
    const data:aggTradeStreams[] = useAppSelector((state)=>state.aggTrade.aggTrade)
    return (
      <div className="pb-4">
        <div className="flex justify-between py-2 px-4">
          <p className="text-gray-500 text-sm font-semibold">Price (USDT)</p>
          <p className="text-gray-500 text-sm font-semibold">Amount(BTC)</p>
          <p className="text-gray-500 text-sm font-semibold">Time</p>
        </div>
        <div className="overflow-y-auto h-100 pl-4">
          {data.map((e) => {
            return <TradingPriceRow e={e} />;
          })}
        </div>
      </div>
    );
}