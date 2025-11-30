import canvas1 from "assets/images/canvas1.png";
import canvas2 from "assets/images/canvas2.png";
import canvas3 from "assets/images/canvas3.png";
import canvas4 from "assets/images/canvas4.png";
import canvas5 from "assets/images/canvas5.png";
import { BTCETH, BTCTRX, BTCUSDT, ETHTRX, XRPSOL } from "~/utils";

export const AiLists = [
  {
    id: 1,
    maxYield: "+24%",
    symbol: "BTC/ETH",
    users: "85",
    maxDrawDown: "23%",
    method: "Heaven and Earth grid",
    miniAmount: 500,
    operatingTime: "3h 57m",
    line: canvas1,
    icon: <img src={BTCETH} width={50} />,
  },
  {
    id: 2,
    maxYield: "+21%",
    symbol: "BTC/USDT",
    users: "173",
    maxDrawDown: "42%",
    method: "ChatGPT Prediction",
    miniAmount: 2500,
    operatingTime: "6h 43m",
    line: canvas2,
    icon: <img src={BTCUSDT} width={50} />,
  },
  {
    id: 3,
    maxYield: "+14%",
    symbol: "BTC/TRX",
    users: "59",
    method: "DeepSeek Analysis",
    miniAmount: 1000,
    operatingTime: "4h 54m",
    maxDrawDown: "31%",
    line: canvas3,
    icon: <img src={BTCTRX} width={50} />,
  },
  {
    id: 4,
    maxYield: "+12%",
    symbol: "ETH/TRX",
    users: "112",
    method: "Infinite grid",
    miniAmount: 2490,
    operatingTime: "4h 16m",
    maxDrawDown: "19%",
    line: canvas4,
    icon: <img src={ETHTRX} width={50} />,
  },
  {
    id: 5,
    maxYield: "+9%",
    method: "Martingale",
    miniAmount: 1500,
    operatingTime: "3h 26m",
    symbol: "XRP/SOL",
    users: "61",
    maxDrawDown: "14%",
    line: canvas5,
    icon: <img src={XRPSOL} width={50} />,
  },
];
