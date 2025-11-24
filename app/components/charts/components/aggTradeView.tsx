import type { aggTradeStreams } from "~/context/slices/tradeSlice";
import { useAppSelector } from "~/utils/redux";
import { formatPrice } from "../util";
import moment from "moment";
import { CoinPairs } from "~/consts/pairs";
import { ScrollArea } from "~/components/ui/scroll-area";
import { useAggTradeStore, type AggTrade } from "~/store/useAggTradeStore";
;
const TradingPriceRow = ({ e }: { e: AggTrade }) => {
  const time = moment(e.time).format("hh:mm:ss");
  return (
    <div className="flex  w-full justify-between items-center mb-1" key={e.time}>
      <div className="flex-1 ">
        <p
          className={`text-sm ${e.maker ? "text-green-400" : "text-red-500"}`}
        >
          {formatPrice(e.price)}
        </p>
      </div>
      <div className="flex-1 justify-between flex gap-8 lg:gap-3">
        <p className="text-sm text-gray-50">{e.amount}</p>
        <p className="text-sm text-gray-50">{time}</p>
      </div>
    </div>
  );
};

export default function ({ pair }) {
  // const data: aggTradeStreams[] = useAppSelector(
  //   (state) => state.aggTrade.aggTrade
  // );

  const {trades} = useAggTradeStore()
  return (
    <div className="pb-4 bg-gray-900 lg:bg-gray-950 lg:rounded-md lg:min-w-55 xl:w-70 2xl:w-85">
      <div className="flex justify-between py-2 px-4">
        <p className="text-gray-500 text-sm font-semibold">Price (USDT)</p>
        <p className="text-gray-500 text-sm font-semibold">
          Amount({CoinPairs[pair].names[0]})
        </p>
        <p className="text-gray-500 text-sm font-semibold">Time</p>
      </div>
      <ScrollArea className="h-100 w-full pr-2 pl-4 lg:h-120 lg:pr-2">
        {trades?.map((e, i) => {
          return <TradingPriceRow e={e} key={i} />;
        })}
      </ScrollArea>
    </div>
  );
}
