import { ChartCandlestick, ChartLine } from "lucide-react";
import { useEffect, useMemo, useRef, useState, type FC, type ReactNode } from "react";

import { createChart, CrosshairMode } from "lightweight-charts";
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
import { priceData, volumeData } from "~/consts/test";
import rawData from "~/consts/testKline.json";
import moment from "moment";
import useWindowDimensions from "~/hook/windowWidth";
import { useBasicTooltip } from "~/hook/klineTooltip";
import TimeSeries from "./timeSeries";
import { useKlines } from "~/hook/useKline";
import { useKlineStore } from "~/store/useKlineStore";
import { useLegendStore } from "~/store/useLegendStore";
import { useLegend } from "~/hook/useLegend";
import { dataRangeMap } from "../../util";
// import type { FC, ReactNode } from "react";
enum Showing {
  chart = "chart",
  trade = "trade",
  info = "info",
}
enum Period {
  oneSecound = "1s",
  fifteenMinute = "15m",
  oneHour = "1h",
  fourHour = "4h",
  oneDay = "1d",
  oneWeek = "1w",
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
  const [showing, setShowing] = useState<Showing>(Showing.chart);
  const [period, setPeriod] = useState(
    type === "future" ? Period.oneSecound : Period.oneDay
  );
  useKlines(pair, period);

  const { width } = useWindowDimensions();
  const upColor = "#00c951";
  const downColor = "#fb2c36";
  const containerRef = useRef<HTMLDivElement>(null);
   const { ref, legendData, onCrosshairMove } = useLegend(
     legendVisible
   );

  const clonedData = structuredClone(candles);

  const togglePeriod = (p:Period) =>{ 
    setPeriod(p)
    reset()
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
                width > 1024
                  ? width / 1.85
                  : width > 768
                    ? width * 0.65
                    : width,
              height: 530, //"300px", //chartContainerRef.current.clientHeight,
              layout: {
                background: { color: "transparent" },
                textColor: "rgba(255, 255, 255, 0.9)",
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
                timeFormatter: dataRangeMap[period].formatter,
              },
              timeScale: {
                tickMarkFormatter: dataRangeMap[period].formatter,
                borderColor: "#485c7b",
              },
         
            }}
            onCrosshairMove={onCrosshairMove}
          >
            <Pane stretchFactor={2} >
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
                  <div className="flex gap-2">
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
            </Pane>
            <Pane>
              <HistogramSeries
                data={histogram}
                options={{ priceLineVisible: false }}
              />
              {/* <LineSeries
                data={volumeData}
                options={{ color: "green", lineWidth: 1 }}
              /> */}
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
