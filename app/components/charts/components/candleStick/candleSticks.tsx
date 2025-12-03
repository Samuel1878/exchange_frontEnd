import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FC,
  type ReactNode,
} from "react";

import { CrosshairMode, type MouseEventParams } from "lightweight-charts";
import {
  Chart,
  HistogramSeries,
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
import {
  dataRangeMap,
  localizationFormater,
  typedObjectEntries,
} from "../../util";
import { useCompareSeriesStore } from "~/store/useCompareSeriesStore";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { useMultiLegend } from "~/hook/useLineLegend";
import CandleStickInfo from "./info";
import AggTradeView from "../aggTradeView";

import OrderBook from "../orderBook/orderBook";

enum Showing {
  chart = "chart",
  trade = "trade",
  info = "info",
  depth = "depth",
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
const upColor = "#00c951";
const downColor = "#fb2c36";
export default function ({ pair, type }) {
  const [period, setPeriod] = useState(
    type === "future" ? Period.oneSecound : Period.oneDay
  );
  useKlines(pair, period);
  const { legendVisible, setLegendVisible } = useLegendStore();
  const { visibleSeries } = useCompareSeriesStore();
  const { candles, histogram, reset, indicators } = useKlineStore();
  const [showing, setShowing] = useState<Showing>(Showing.chart);
  const { width } = useWindowDimensions();
  const containerRef = useRef<HTMLDivElement>(null);
  const clonedData = structuredClone(candles);
  const clonedHis = structuredClone(histogram);
  const seriesMap = typedObjectEntries(indicators);
  const [showLegend, setShowLegend] = useState(true);
  // const [originalView, setOriginalView] = useState(true);
  const togglePeriod = (p: Period) => {
    reset();
    setPeriod(p);
  };

  const seriesRefs = useRef<Record<string, React.RefObject<any>>>({});
  useEffect(() => {
    seriesMap.forEach(([key]) => {
      if (!seriesRefs.current[key]) {
        seriesRefs.current[key] = React.createRef();
      }
    });
  }, [seriesMap]);

  const seriesListForLegend = useMemo(
    () =>
      seriesMap
        .filter(([key]) => visibleSeries.includes(key))
        .map(([key]) => ({
          key,
          ref: seriesRefs.current[key],
        })),
    [seriesMap, visibleSeries]
  );
  const { ref, legendData, onCrosshairMove } = useLegend(legendVisible);
  const { legend, onCrosshairMoveMulti } = useMultiLegend(
    showLegend,
    seriesListForLegend
  );
  const handleCrosshair = useCallback(
    (param: MouseEventParams) => {
      onCrosshairMoveMulti(param);
      onCrosshairMove(param);
    },
    [onCrosshairMoveMulti, onCrosshairMove]
  );
  return (
    <section className="bg-gray-900 lg:bg-gray-950 mt-1 rounded-none md:rounded-lg ">
      <nav className="flex w-full p-3 pb-0 gap-4">
        {/* <div className="flex flex-1 gap-4"> */}
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
          {/* <div className="flex gap-4">
            <div
              className={`cursor-pointer font-medium text-sm md:text-lg ${showing === Showing.chart ? "text-gray-100" : "text-gray-600"}`}
              onClick={() => {
                setShowing(Showing.chart);
              }}
            >
              Original View
            </div>
            <div
              className={`cursor-pointer font-medium text-sm md:text-lg ${showing === Showing.depth ? "text-gray-100" : "text-gray-600"}`}
              onClick={() => {
                setShowing(Showing.depth);
              }}
            >
              Depth
            </div>
          </div> */}
        {/* </div> */}
      </nav>
      {showing === Showing.chart ? (
        <TimeSeries period={period} setPeriod={togglePeriod} />
      ) : null}

      <article
        className="min-h-130 md:min-h-100"
        style={{
          height: 530,
          width:
            width >= 1024 ? width / 1.85 : width > 768 ? width * 0.65 : width,
        }}
      >
        <div className="bg-gray-900 lg:bg-gray-950">
          {showing === Showing.chart ? (
            <Chart
              ref={containerRef}
              containerProps={{
                style: { flexGrow: "1", position: "relative" },
              }}
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
                    separatorColor: "rgba(30, 41, 57,.5)",
                  },
                },
                grid: {
                  vertLines: {
                    color: "rgba(30, 41, 57, .2)",
                  },
                  horzLines: {
                    color: "rgba(30, 41, 57, .2)",
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
                  borderColor: "rgb(30, 41, 57)",
                },
              }}
              onCrosshairMove={handleCrosshair}
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
                        <p className="text-gray-600 text-sm">
                          {legendData.time}
                        </p>
                        <p className="text-gray-600 text-xs font-medium">
                          Open{" "}
                          <span
                            className="text-xs ml-1 font-medium"
                            style={{ color: legendData.color }}
                          >
                            {legendData.open}
                          </span>
                        </p>
                        <p className="text-gray-600 text-xs font-medium">
                          High{" "}
                          <span
                            className="text-xs ml-1 font-medium"
                            style={{ color: legendData.color }}
                          >
                            {legendData.high}
                          </span>
                        </p>
                        <p className="text-gray-600 text-xs font-medium">
                          Low{" "}
                          <span
                            className="text-xs ml-1 font-medium"
                            style={{ color: legendData.color }}
                          >
                            {legendData.low}
                          </span>
                        </p>
                        <p className="text-gray-600 text-xs font-medium">
                          Close{" "}
                          <span
                            className="text-xs ml-1 font-medium"
                            style={{ color: legendData.color }}
                          >
                            {legendData.close}
                          </span>
                        </p>
                        <p className="text-gray-600 text-xs font-medium">
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
                  <div className="z-20 flex gap-2 p-1 mt-2 outline-0 flex-wrap hover:border-1 hover:border-gray-700 rounded-sm">
                    <div
                      className="cursor-pointer"
                      onClick={() => setShowLegend((prev) => !prev)}
                    >
                      {showLegend ? (
                        <IoIosArrowDown color="#777" size={16} />
                      ) : (
                        <IoIosArrowForward color="#777" size={16} />
                      )}
                    </div>
                    {showLegend &&
                      Object.entries(legend)?.map(([key, entry]) => (
                        <div key={key} className="mr-3">
                          {entry ? (
                            <div className="text-xs flex gap-2">
                              <div className="text-xs text-gray-600 font-medium">
                                {key}
                              </div>
                              <span
                                className="text-xs font-medium"
                                style={{ color: entry.color ?? undefined }}
                              >
                                {entry.value}
                              </span>
                            </div>
                          ) : (
                            <div className="text-xs text-gray-500"></div>
                          )}
                        </div>
                      ))}
                  </div>
                </Legend>

                {seriesMap
                  .filter(([key]) => visibleSeries.includes(key))
                  .map(([key, { Component, data, options }], index) => {
                    return (
                      <Component
                        ref={seriesRefs.current[key]}
                        key={key}
                        data={structuredClone(data)}
                        options={options}
                      />
                    );
                  })}
              </Pane>
              <Pane>
                <HistogramSeries
                  data={clonedHis}
                  options={{ priceLineVisible: false, lastValueVisible: false }}
                />
              </Pane>
              <TimeScale>
                <TimeScaleFitContentTrigger deps={[period]} />
              </TimeScale>
            </Chart>
          ) : null}
          {showing === Showing.trade ? (
            <div
              className="border-t-2 border-t-gray-800 block md:hidden pr-2"
              style={{
                width:
                  width >= 1024
                    ? width / 1.85
                    : width > 768
                      ? width * 0.65
                      : width,
                height: 530,
              }}
            >
              <AggTradeView pair={pair} />
            </div>
          ) : null}
          {showing === Showing.info ? (
            <div
              className="border-t-2 border-t-gray-800"
              style={{
                width:
                  width >= 1024
                    ? width / 1.85
                    : width > 768
                      ? width * 0.65
                      : width,
                height: 530,
              }}
            >
              <CandleStickInfo pair={pair} />
            </div>
          ) : null}
          {showing === Showing.depth ? (
            <div
              className="border-t-2 border-t-gray-800"
              style={{
                width:
                  width >= 1024
                    ? width / 1.85
                    : width > 768
                      ? width * 0.65
                      : width,
                height: 530,
              }}
            >
              <OrderBook pair={pair} option="both" type="depth" />
            </div>
          ) : null}
        </div>
      </article>
    </section>
  );
}
