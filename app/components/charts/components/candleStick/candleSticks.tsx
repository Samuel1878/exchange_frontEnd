
import { useEffect, useMemo, useRef, useState, type FC, type ReactNode } from "react";

import {  CrosshairMode } from "lightweight-charts";
import {
  Chart,
  LineSeries,
  HistogramSeries,
  PriceScale,
  TimeScale,
  TimeScaleFitContentTrigger,
  Pane,
  CandlestickSeries,
} from "lightweight-charts-react-components";
import useWindowDimensions from "~/hook/windowWidth";
import TimeSeries from "./timeSeries";
import { useKlines } from "~/hook/useKline";
import { useKlineStore } from "~/store/useKlineStore";
import { useLegendStore } from "~/store/useLegendStore";
import { useLegend } from "~/hook/useLegend";
import { dataRangeMap, localizationFormater } from "../../util";
import { useIndicatorStore } from "~/store/useIndicatorStore";

enum Showing {
  chart = "chart",
  trade = "trade",
  info = "info",
}
export enum Period {
  oneSecound = "1s",
  fifteenMinute = "15m",
  oneHour = "1h",
  fourHour = "4h",
  oneDay = "1d",
  oneWeek = "1w",
  threeDay = "3d",
  oneMonth = "1M",

  oneMinute = "1m",
  threeMinute = "3m",
  fiveMinute = "5m",
  thirty = "30m",
  twoHour = "2h",
  sixHour = "6h",
  eightHour = "8h",
  twelveHour = "12h",
}

type LegendProps = {
  children: ReactNode;
};

const Legend: FC<LegendProps> = ({ children }) => {
  return <div className="absolute top-0 left-0 p-1 z-20">{children}</div>;
};

export default function ({ pair, type }) {
  const { legendVisible, setLegendVisible } = useLegendStore();
   const { candles, histogram, reset } = useKlineStore();
   const {indicators ,selected} = useIndicatorStore()
  const [showing, setShowing] = useState<Showing>(Showing.chart);
  const [period, setPeriod] = useState(
    type === "future" ? Period.oneSecound : Period.oneDay
  );
  useKlines(pair, period);
console.log(indicators)
  const { width } = useWindowDimensions();
  const upColor = "#00c951";
  const downColor = "#fb2c36";
  const containerRef = useRef<HTMLDivElement>(null);
   const { ref, legendData, onCrosshairMove } = useLegend(
     legendVisible
   );

  const clonedData = structuredClone(candles);

  const togglePeriod = (p:Period) =>{ 
    reset();
    setPeriod(p)
    useKlines(pair, period);
  }
  return (
    <section className="bg-gray-900 lg:bg-gray-950 mt-1 rounded-lg ">
      <nav className="flex w-full p-3 pb-0 gap-4">
        <div
          onClick={() => setShowing(Showing.chart)}
          className="cursor-pointer"
        >
          <p
            className={`font-medium text-sm md:text-lg ${showing === Showing.chart ? "text-gray-100 border-b-3 border-amber-400" : "text-gray-500 "}`}
          >
            Chart
          </p>
        </div>
        <div
          className="md:hidden cursor-pointer"
          onClick={() => setShowing(Showing.trade)}
        >
          <p
            className={` font-medium text-sm ${showing === Showing.trade ? "text-gray-100 border-b-3 border-amber-400" : "text-gray-500 "}`}
          >
            Trades
          </p>
        </div>
        <div
          onClick={() => setShowing(Showing.info)}
          className="cursor-pointer"
        >
          <p
            className={`font-medium text-sm md:text-lg ${showing === Showing.info ? "text-gray-100 border-b-3 border-amber-400" : "text-gray-500 "}`}
          >
            Info
          </p>
        </div>
      </nav>
      <TimeSeries period={period} setPeriod={togglePeriod} />

      <article className="min-h-130 md:min-h-100">
        <div className="bg-gray-900 lg:bg-gray-950">
          <Chart
            ref={containerRef}
            containerProps={{ style: { flexGrow: "1", position: "relative" } }}
            options={{
              width:
                width >= 1024
                  ? width / 1.85
                  : width > 768
                    ? width * 0.65
                    : width,
              height: 530, //"300px", //chartContainerRef.current.clientHeight,
              layout: {
                background: { color: "transparent" },
                textColor: "rgba(255, 255, 255, 0.9)",
                panes: {
                  enableResize: true,
                  separatorColor: "rgba(100,100,100,.4)",
                },
              },
              grid: {
                vertLines: {
                  color: "rgba(100,100,100,.1)",
                },
                horzLines: {
                  color: "rgba(100,100,100,.1)",
                },
              },
              crosshair: {
                mode: CrosshairMode.Normal,
              },
              localization: {
                timeFormatter: localizationFormater["locale"].formatter,
              },
              timeScale: {
                tickMarkFormatter: dataRangeMap[period].formatter,
                borderColor: "#485c7b",
              },
            }}
            onCrosshairMove={onCrosshairMove}
          >
            <Pane stretchFactor={2}>
              <CandlestickSeries
                ref={ref}
                data={clonedData}
                options={{
                  upColor: upColor,
                  downColor: downColor,
                  borderDownColor: downColor,
                  borderUpColor: upColor,
                  wickDownColor: downColor,
                  wickUpColor: upColor,
                }}
              />
              {legendData !== null && legendVisible && (
                <Legend>
                  <div className="flex gap-2 flex-wrap">
                    <p className="text-gray-400 text-sm">{legendData.time}</p>
                    <p className="text-gray-400 text-xs font-medium">
                      Open{" "}
                      <span
                        className="text-xs ml-1 font-medium"
                        style={{ color: legendData.color }}
                      >
                        {legendData.open}
                      </span>
                    </p>
                    <p className="text-gray-400 text-xs font-medium">
                      High{" "}
                      <span
                        className="text-xs ml-1 font-medium"
                        style={{ color: legendData.color }}
                      >
                        {legendData.high}
                      </span>
                    </p>
                    <p className="text-gray-400 text-xs font-medium">
                      Low{" "}
                      <span
                        className="text-xs ml-1 font-medium"
                        style={{ color: legendData.color }}
                      >
                        {legendData.low}
                      </span>
                    </p>
                    <p className="text-gray-400 text-xs font-medium">
                      Close{" "}
                      <span
                        className="text-xs ml-1 font-medium"
                        style={{ color: legendData.color }}
                      >
                        {legendData.close}
                      </span>
                    </p>
                    <p className="text-gray-400 text-xs font-medium">
                      Change{" "}
                      <span
                        className="text-xs ml-1 font-medium"
                        style={{ color: legendData.color }}
                      >
                        {legendData.change}
                      </span>
                    </p>
                  </div>
                </Legend>
              )}
             {/* {selected?.ma?.length ? ( <LineSeries
                data={indicators.ma[7]}
                options={{ color: "green", lineWidth: 1 }}
              />):null} */}
            </Pane>
            <Pane>
              <HistogramSeries
                data={histogram}
                options={{ priceLineVisible: false }}
              />
            </Pane>
            <TimeScale>
              <TimeScaleFitContentTrigger deps={[period]} />
            </TimeScale>
          </Chart>
        </div>
      </article>
    </section>
  );
}
