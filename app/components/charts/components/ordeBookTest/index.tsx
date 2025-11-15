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
const priceData = [];
const volumeData = [];
const averageData = []; // Volume weighted average price
const macdData = []; // MACD histogram data
const macdLineData = []; // MACD line (DIF) data
const signalLineData = []; // Signal line (DEA) data
let sumPrice = 0;
let sumVolume = 0;
const sTime = new Date("2025-10-16 09:30:00").getTime();
const eTime = new Date("2025-10-16 15:00:00").getTime();
const breakStartTime = new Date("2025-10-16 11:30:00").getTime();
const breakEndTime = new Date("2025-10-16 13:00:00").getTime();
// MACD algorithm parameters
const shortPeriod = 12; // Short-term EMA period, typically 12
const longPeriod = 26; // Long-term EMA period, typically 26
const signalPeriod = 9; // Signal line EMA period, typically 9
let time = sTime;
let price = 0;
let direction = 1; // 1 for up, -1 for down
let maxAbs = 0;
const lastClose = 50; // Close value of yesterday
const colorGreen = "#47b262";
const colorRed = "#eb5454";
const colorGray = "#888";
const colorGreenOpacity = "rgba(71, 178, 98, 0.2)";
const colorRedOpacity = "rgba(235, 84, 84, 0.2)";
const matrixMargin = 10;
const chartWidth = 500;
const chartHeight = 500;
const matrixWidth = chartWidth - matrixMargin * 2;
const matrixHeight = chartHeight - matrixMargin * 2;
const orderData = [];
const orderCat = [];
const orderCount = 14;
const getPriceColor = (price) => {
  return price === lastClose
    ? colorGray
    : price > lastClose
      ? colorRed
      : colorGreen;
};
const priceFormatter = (value) => {
  const result = Math.round(value * 100) / 100 + "";
  // Adding padding 0 if needed
  let dotIndex = result.indexOf(".");
  if (dotIndex < 0) {
    return result + ".00";
  } else if (dotIndex === result.length - 2) {
    return result + "0";
  }
  return result;
};



let orderPrice = price - (0.01 * orderCount) / 2;
for (let i = 0; i < orderCount; ++i) {
  if (price === orderPrice) {
    continue;
  }
  orderPrice += 0.01;
  orderCat.push(orderPrice);
  const amount = Math.round(Math.random() * 200) + 10;
  const isLower = orderPrice < price;
  orderData.push({
    value: amount,
    itemStyle: {
      color: isLower ? colorGreenOpacity : colorRedOpacity,
    },
    label: {
      formatter:
        `{name|${isLower ? "Bid" : "Ask"}} ` +
        `{${isLower ? "green" : "red"}|${priceFormatter(orderPrice)}} ` +
        `{amount|(${amount})}`,
      rich: {
        red: {
          color: colorRed,
        },
        green: {
          color: colorGreen,
        },
        amount: {
          color: "#666",
        },
        name: {
          fontWeight: "bold",
          color: "#444",
        },
      },
    },
  });
}
console.log(orderData)
const getTitle = (text, subtext, coord) => {
  return {
    text: text,
    subtext: subtext,
    left: 2,
    top: 2,
    padding: 0,
    textStyle: {
      fontSize: 12,
      fontWeight: "bold",
      color: "#444",
    },
    subtextStyle: {
      fontSize: 10,
      color: "#666",
    },
    itemGap: 0,
    coordinateSystem: "matrix",
    coord: coord,
  };
};
const titles = [
  // getTitle("Volume", Math.round(sumVolume / 1000) + "B", [0, 5]),
  // getTitle("MACD", "", [0, 4]),
  getTitle("Order Book", "", [4, 0]),
  // getTitle("Depth", "", [4, 5]),
];


export default function App() {
  const option = {
    title: titles,
    xAxis: [
      {
        type: "time",
        show: false,
        breaks: [
          {
            start: breakStartTime,
            end: breakEndTime,
            gap: 0,
          },
        ],
      },
    ],
    yAxis: [
      {
        type: "category",
        gridIndex: 0,
        show: false,
      },
    ],
    grid: [
      {
        coordinateSystem: "matrix",
        coord: [4, 0],
        top: 15,
        bottom: 2,
        left: 2,
        right: 2,
      },
    ],
    series: [
      {
        name: "Order Book",
        type: "bar",
        xAxisIndex: 0,
        yAxisIndex: 0,
        data: orderData,
        barWidth: "90%",
        label: {
          show: true,
          position: "insideRight",
        },
      },
    ],
  };
  return (
    <div>
     
      <ReactEChartsCore
        style={{ height: 400 }}
        opts={{ height: 400 }}
        echarts={echarts}
        option={option}
        notMerge
        lazyUpdate
        
      />
    </div>
  );
}