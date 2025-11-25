import { ChartCandlestick, ChartLine } from "lucide-react";
import { useMemo, useRef, useState, type FC, type ReactNode } from "react";

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
let timeSeries = [];
type TooltipProps = {
  // x: number | null;
  // y: number | null;
  show: boolean;
  children: ReactNode;
  ariaLabel: string;
  // width: number;
  // height: number;
  // sx?: SxProps;
};
export default function ({ pair, type }) {
  const [showing, setShowing] = useState<Showing>(Showing.chart);
  const [period, setPeriod] = useState(
    type === "future" ? Period.oneSecound : Period.oneDay
  );
  const { width } = useWindowDimensions();
  const upColor = "#00c951";
  const downColor = "#fb2c36";
  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipWidth = 120;
  const tooltipHeight = 60;
  const basicTooltipOpts = useMemo(
    () => ({
      tooltipHeight,
      tooltipWidth,
      yOffset: 12,
      xOffset: 12,
    }),
    [tooltipHeight, tooltipWidth]
  );
  const {
    onCrosshairMove,
    tooltipData: { time, high, low, open, close, show },
    seriesRef,
  } = useBasicTooltip(containerRef, basicTooltipOpts);

  const Tooltip: FC<TooltipProps> = ({
    show,
    children,
    ariaLabel,
  }) => {
    return (
      <div className={`flex p-2 absolute top-4 left-2 z-20 gap-2`} aria-label={ariaLabel}>
        {children}
      </div>
    );
  };
  // lg:min-w-125 xl:min-w-150 2xl:min-w-210
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
      <TimeSeries period={period} setPeriod={setPeriod} />

      <article className="min-h-130 md:min-h-100">
        <div className="bg-gray-900 lg:bg-gray-950">
          <Chart
            ref={containerRef}
            containerProps={{ style: { flexGrow: "1", position: "relative" } }}
            options={{
              width: width > 1024 ? width / 1.85 : width>768? width*.65 :width,
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

              // priceScale: {
              //   borderColor: "#485c7b",
              // },
              timeScale: {
                borderColor: "#485c7b",
              },
            }}
            onCrosshairMove={onCrosshairMove}
          >
            <Pane stretchFactor={2}>
              <CandlestickSeries
                ref={seriesRef}
                data={priceData}
                options={{
                  upColor: upColor,
                  downColor: downColor,
                  borderDownColor: downColor,
                  borderUpColor: upColor,
                  wickDownColor: downColor,
                  wickUpColor: upColor,
                }}
              />
              <Tooltip
                show={show}
                // x={position.x}
                // y={position.y}
                ariaLabel={`Tooltip with chart data for time ${time}`}
                // width={tooltipWidth}
                // height={tooltipHeight}
              >
                <p className="text-gray-50">{time}</p>
                <p className="text-gray-50"> Open {open}</p>
                <p className="text-gray-50">High {high}</p>
                <p className="text-gray-50">Low {low}</p>
                <p className="text-gray-50">Close {close}</p>
              </Tooltip>
              {/* <PriceScale id="left" options={{textColor:}} /> */}
            </Pane>
            <Pane>
              <HistogramSeries
                data={volumeData}
                options={{ color: "yellow" }}
              />
              {/* <LineSeries
                data={volumeData}
                options={{ color: "green", lineWidth: 1 }}
              /> */}
            </Pane>
            <TimeScale>
              <TimeScaleFitContentTrigger deps={[]} />
            </TimeScale>
          </Chart>
        </div>
      </article>
    </section>
  );
}
