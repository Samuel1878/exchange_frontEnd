import { ChartCandlestick, ChartLine } from "lucide-react";

enum Period {
  oneSecound = "1s",
  fifteenMinute = "15m",
  oneHour = "1h",
  fourHour = "4h",
  oneDay = "1d",
  oneWeek = "1w",
}
export default function ({period, setPeriod}) {
    return (
      <div className="flex gap-4 p-2 pl-4 border-y-2 border-y-gray-900 items-center">
        <p
          onClick={() => setPeriod(Period.oneSecound)}
          className={`text-sm font-medium cursor-pointer ${period === Period.oneSecound ? "text-gray-50" : "text-gray-500"}`}
        >
          1s
        </p>
        <p
          onClick={() => setPeriod(Period.fifteenMinute)}
          className={`text-sm font-medium cursor-pointer ${period === Period.fifteenMinute ? "text-gray-50" : "text-gray-500"}`}
        >
          15m
        </p>
        <p
          onClick={() => setPeriod(Period.oneHour)}
          className={`text-sm font-medium cursor-pointer ${period === Period.oneHour ? "text-gray-50" : "text-gray-500"}`}
        >
          1H
        </p>
        <p
          onClick={() => setPeriod(Period.fourHour)}
          className={`text-sm font-medium cursor-pointer ${period === Period.fourHour ? "text-gray-50" : "text-gray-500"}`}
        >
          4H
        </p>
        <p
          onClick={() => setPeriod(Period.oneDay)}
          className={`text-sm font-medium cursor-pointer ${period === Period.oneDay ? "text-gray-50" : "text-gray-500"}`}
        >
          1D
        </p>
        <p
          onClick={() => setPeriod(Period.oneWeek)}
          className={`text-sm font-medium cursor-pointer ${period === Period.oneWeek ? "text-gray-50" : "text-gray-500"}`}
        >
          1W
        </p>
        <div>
          <ChartLine color="rgb(110,110,110)" width={16} />
        </div>
        <div>
          <ChartCandlestick color="rgb(110,110,110)" width={16} />
        </div>
      </div>
    );
}