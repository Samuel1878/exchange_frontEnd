import { ChartCandlestick, ChartLine } from "lucide-react";
import { useRef, useState } from "react";
import * as echarts from "echarts/core";

import ReactEChartsCore from "echarts-for-react/lib/core";

import {
  TitleComponent,
  GraphicComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  DataZoomComponent,
} from "echarts/components";

import { BarChart, CandlestickChart, LineChart } from "echarts/charts";
import { UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([
  TitleComponent,
  GraphicComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  DataZoomComponent,
  BarChart,
  CandlestickChart,
  LineChart,
  CanvasRenderer,
  UniversalTransition,
]);
import rawData from "~/consts/testKline.json"
enum Showing {
  chart = "chart",
  trade = "trade",
  info = "info"
}
enum Period {
  oneSecound = "1s",
  fifteenMinute = "15m",
  oneHour = "1h",
  fourHour = "4h",
  oneDay = "1d",
  oneWeek = "1w"
}
export default function ({product_id , type}) {
  const [showing, setShowing] = useState<Showing>(Showing.chart);
  const [period, setPeriod] = useState(type === "future"? Period.oneSecound : Period.oneDay);
  const myChart = useRef(null);

  const upColor = "#00c951";
const downColor = "#fb2c36";

function splitData(rawData) {
  let categoryData = [];
  let values = [];
  let volumes = [];
  for (let i = 0; i < rawData.length; i++) {
    categoryData.push([new Date(rawData[i][0]).toLocaleDateString()]);
    values.push([rawData[i][1],rawData[i][4] , rawData[i][3], rawData[i][2] , rawData[i][5]]);
    volumes.push([i, rawData[i][5], rawData[i][1] > rawData[i][4] ? 1 : -1]);
  }
  return {
    categoryData: categoryData,
    values: values,
    volumes: volumes
  };
}
const data = splitData(rawData)
function calculateMA(dayCount, data) {
  var result = [];
  for (var i = 0, len = data.values.length; i < len; i++) {
    if (i < dayCount) {
      result.push('-');
      continue;
    }
    var sum = 0;
    for (var j = 0; j < dayCount; j++) {
      sum += data.values[i - j][1];
    }
    result.push(+(sum / dayCount).toFixed(3));
  }
  return result;
}
  const option = {
    animation: false,
    // legend: {
    //   bottom: 10,
    //   left: 'center',
    //   data: ['Dow-Jones index', 'MA5', 'MA10', 'MA20', 'MA30']
    // },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
      backgroundColor: "rgba(0,0,0,0)",
      padding: 10,
      opacity: 0,
      textStyle: {
        color: "#fff",
      },
    },
    axisPointer: {
      link: [
        {
          xAxisIndex: "all",
        },
      ],
      label: {
        backgroundColor: "#555",
      },
    },
    visualMap: {
      show: false,
      seriesIndex: 5,
      dimension: 2,
      pieces: [
        {
          value: 1,
          color: downColor,
        },
        {
          value: -1,
          color: upColor,
        },
      ],
    },
    grid: [
      {
        left: "0%",
        right: 60,
        height: "75%",
        top: "0%",
      },
      {
        left: "0%",
        right: 60,
        top: "75%",
        height: "20%",
      },
    ],
    xAxis: [
      {
        type: "category",
        data: data.categoryData,
        boundaryGap: false,
        axisLine: { onZero: false },
        axisTick: { show: false },
        splitLine: {
          show: true,
          lineStyle: {
            color: "rgba(100,100,100,.1)",
            width: 1,
          },
        },
        axisLabel: {
          show: false,
        },
        min: "dataMin",
        max: "dataMax",
        axisPointer: {
          z: 100,
          label: {
            show: false,
          },
        },
      },
      {
        type: "category",
        gridIndex: 1,
        data: data.categoryData,
        boundaryGap: false,
        axisLine: { onZero: false },
        axisTick: { show: true },
        splitLine: {
          show: true,
          lineStyle: {
            color: "rgba(100,100,100,.1)",
            width: 1,
          },
        },
        min: "dataMin",
        max: "dataMax",
        axisPointer: {
          z: 100,
        },
      },
    ],
    yAxis: [
      {
        scale: true,
        splitArea: {
          show: false,
        },

        position: "right",
        axisTick: { show: false },
        axisLine: { show: true },
        axisLabel: {
          // margin:10,
          show: true,
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: "rgba(100,100,100,.1)",
            width: 1,
          },
        },
      },
      {
        scale: true,
        gridIndex: 1,

        position: "right",
        splitNumber: 2,
        axisLabel: { show: true },
        axisLine: { show: true },
        axisTick: { show: false },
        splitLine: {
          show: true,
          lineStyle: {
            color: "rgba(100,100,100,.1)",
            width: 1,
          },
        },
      },
    ],
    dataZoom: [
      {
        type: "inside",
        xAxisIndex: [0, 1],
        start: 80,
        end: 100,
        minSpan:2,
        maxSpan:70
      },
    ],
    series: [
      {
        name: "Spot",
        type: "candlestick",
        data: data.values,
        itemStyle: {
          color: upColor,
          color0: downColor,
          borderColor: undefined,
          borderColor0: undefined,
        },
        barWidth: "90%",
      },
      {
        name: "MA5",
        type: "line",
        data: calculateMA(5, data),
        smooth: true,
        lineStyle: {
          opacity: 0.5,
        },
      },
      {
        name: "MA10",
        type: "line",
        data: calculateMA(10, data),
        smooth: true,
        lineStyle: {
          opacity: 0.5,
        },
      },
      {
        name: "MA20",
        type: "line",
        data: calculateMA(20, data),
        smooth: true,
        lineStyle: {
          opacity: 0.5,
        },
      },
      {
        name: "MA30",
        type: "line",
        data: calculateMA(30, data),
        smooth: true,
        lineStyle: {
          opacity: 0.5,
        },
      },
      {
        name: "Volume",
        type: "bar",
        xAxisIndex: 1,
        yAxisIndex: 1,
        data: data.volumes,
        // barGap:"0%"
        barWidth: "90%",
      },
    ],
  };
  return (
    <section className="bg-gray-900 lg:bg-gray-950 mt-1 rounded-lg">
      <nav className="flex w-full p-3 pb-0 gap-4 ">
        <div
          onClick={() => setShowing(Showing.chart)}
          className="cursor-pointer"
        >
          <p
            className={`font-medium text-sm ${showing === Showing.chart ? "text-gray-100 border-b-3 border-amber-400" : "text-gray-500 "}`}
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
            className={`font-medium text-sm  ${showing === Showing.info ? "text-gray-100 border-b-3 border-amber-400" : "text-gray-500 "}`}
          >
            Info
          </p>
        </div>
      </nav>
      <div className="flex gap-4 p-2 pl-4 border-y-1 border-y-gray-800 items-center">
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
      <article className="min-h-130 md:min-h-100" ref={myChart}>
        <ReactEChartsCore
          style={{ height: 520 }}
          opts={{ height: 520 }}
          echarts={echarts}
          option={option}
          notMerge
          lazyUpdate
          
        />
      </article>
    </section>
  );
}
