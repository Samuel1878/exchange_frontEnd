import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type FC,
  type ReactNode,
} from "react";

import { CrosshairMode } from "lightweight-charts";
import {
  Chart,
  LineSeries,
  HistogramSeries,
  PriceScale,
  TimeScale,
  TimeScaleFitContentTrigger,
  Pane,
  CandlestickSeries,
  BarSeries,
  type SeriesApiRef,
} from "lightweight-charts-react-components";
import useWindowDimensions from "~/hook/windowWidth";
import TimeSeries from "./timeSeries";
import { useKlines } from "~/hook/useKline";
import { useKlineStore } from "~/store/useKlineStore";
import { useLegendStore } from "~/store/useLegendStore";
import { useLegend } from "~/hook/useLegend";
import {
  dataRangeMap,
  localizationFormater,
  typedObjectEntries,
} from "../../util";
import { useCompareSeriesStore } from "~/store/useCompareSeriesStore";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { useMultiLegend } from "~/hook/useLineLegend";
// import { useCombinedLegend } from "~/hook/useUnifiedLegend";

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
  const [period, setPeriod] = useState(
      type === "future" ? Period.oneSecound : Period.oneDay
    );
  // useKlines(pair, period);
  const { legendVisible, setLegendVisible } = useLegendStore();
  const { visibleSeries } = useCompareSeriesStore();
  const { candles, histogram, reset, indicators } = useKlineStore();
  const [showing, setShowing] = useState<Showing>(Showing.chart);
  const { width } = useWindowDimensions();
  const upColor = "#00c951";
  const downColor = "#fb2c36";
  const containerRef = useRef<HTMLDivElement>(null);
  const { ref, legendData, onCrosshairMove } = useLegend(legendVisible);
  const clonedData = structuredClone(candles);
  const clonedHis = structuredClone(histogram);
  const seriesMap = typedObjectEntries(indicators);
  const [showLegend, setShowLegend] = useState(true);
  // const ref = useState<SeriesApiRef<"Candlestick">>();
  const togglePeriod = (p: Period) => {
    reset();
    setPeriod(p);
    // useKlines(pair, period);
  };
  const lineRefs = useRef<Record<string, any>>({});

  // ensure refs exist
  seriesMap.forEach(([key]) => {
    if (!lineRefs.current[key]) {
      lineRefs.current[key] = { current: null };
    }
  });

  // const { legend, onCrosshairMove } = useCombinedLegend({
  //   showLegend: legendVisible,
  //   candleRef: ref,
  //   lineSeries: seriesMap
  //     .filter(([key]) => visibleSeries.includes(key))
  //     .map(([key]) => ({
  //       id: key,
  //       ref: lineRefs.current[key],
  //     })),
  // });
    // const seriesRefs = useRef<Record<string, any>>({});

    // seriesMap.forEach(([key]) => {
    //   if (!seriesRefs.current[key]) {
    //     seriesRefs.current[key] = { current: null };
    //   }
    // });

    // // Prepare list for legend hook
    // const seriesListForLegend = seriesMap
    //   .filter(([key]) => visibleSeries.includes(key))
    //   .map(([key]) => ({
    //     id: key,
    //     ref: seriesRefs.current[key],
    //   }));

    // const { legend, onCrosshairMoveMulti } = useMultiLegend(
    //   showLegend,
    //   seriesListForLegend
    // );
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
            <Pane stretchFactor={3}>
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

              <Legend>
                <div className="flex gap-2 p-1 outline-0 flex-wrap hover:border-1 hover:border-gray-700 rounded-sm">
                  <div className="cursor-pointer" onClick={setLegendVisible}>
                    {legendVisible ? (
                      <IoIosArrowDown color="#777" size={16} />
                    ) : (
                      <IoIosArrowForward color="#777" size={16} />
                    )}
                  </div>
                  {legendData !== null && legendVisible && (
                    <>
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
                    </>
                  )}
                </div>
              </Legend>

              {seriesMap
                .filter(([key]) => visibleSeries.includes(key))
                .map(([key, { Component, data, options }], index) => (
                  <Component
                    key={key}
                    data={structuredClone(data)}
                    options={options}
                  />
                ))}
            </Pane>
            <Pane>
              <HistogramSeries
                data={clonedHis}
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
