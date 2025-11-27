import { ChartCandlestick, ChartLine } from "lucide-react";
import { Period } from "./candleSticks";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { useState } from "react";
import { FaAngleRight, FaCheck } from "react-icons/fa6";
import { useIndicatorStore } from "~/store/useIndicatorStore";
const pinned = ["Time", "1s", "15m", "1h", "4h", "1d", "1w"];
const available = [
  "1m",
  "3m",
  "5m",
  "30m",
  "2h",
  "6h",
  "8h",
  "12h",
  "3d",
  "1M",
];
export default function ({ period, setPeriod }) {
  const [focus, setFocus] = useState("ma");
  const [ma, setMa] = useState<number[]>([7, 20, 99]);
  const [ema, setEma] = useState<number[]>([]);
  const [wma, setWma] = useState<number[]>([]);
  const {setSelected, computeIndicators} = useIndicatorStore()

  return (
    <div className="flex gap-4 p-2 pl-4 border-y-2 border-y-gray-800 lg:border-y-gray-900 items-center">
      {pinned.map((e) => (
        <p
          onClick={() => setPeriod(e === "Time" ? Period.oneSecound : e)}
          className={`text-sm font-medium cursor-pointer ${period === e ? "text-gray-50" : "text-gray-500"}`}
        >
          {e}
        </p>
      ))}
      <Select value={period} onValueChange={(e) => setPeriod(e)}>
        <SelectTrigger className="text-gray-400 text-md font-semibold border-0 outline-0 ring-0">
          <SelectValue
            aria-label={period}
            className="text-gray-50 text-sm font-semibold border-0 outline-0 ring-0"
          >
            {pinned.includes(period) ? "" : period}
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="space-y-1.5 p-4 bg-gray-900 max-w-100">
          <p className="text-gray-50 font-semibold text-sm">Pinned</p>
          <div className="flex gap-2 flex-wrap mt-3 mb-6">
            {pinned.map((e) => (
              <SelectItem
                value={e}
                className={`w-18 pl-6 text-sm text-gray-100 font-semibold hover:bg-gray-800 ${period === e ? "bg-gray-700" : "bg-gray-800"}`}
              >
                {e}
              </SelectItem>
            ))}
          </div>

          <p className="text-gray-50 font-semibold text-sm">Available</p>
          <div className="flex gap-2 flex-wrap mt-3 mb-6">
            {available.map((e) => (
              <SelectItem
                value={e}
                className={` w-18 pl-6 text-sm text-gray-100 font-semibold hover:bg-gray-800 ${period === e ? "bg-gray-700" : "bg-gray-800"}`}
              >
                {e}
              </SelectItem>
            ))}
          </div>
        </SelectContent>
      </Select>
      <Dialog>
        <DialogTrigger className="p-0 m-0">
          <ChartLine color="rgb(110,110,110)" width={16} />
        </DialogTrigger>
        <DialogContent className="bg-gray-800 lg:bg-gray-900">
          <DialogHeader>
            <DialogTitle className="text-gray-50 font-bold text-lg">
              Indicators
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col">
            <div className="flex-col flex flex-1">
              <div
                // onClick={() => setFocus("ma")}
                className={`flex mb-2 lg:mb-4`}
              >
                <div className="flex gap-2 items-center">
                  <div
                    onClick={() => setFocus("ma")}
                    className={`w-6 h-6 cursor-pointer flex justify-center items-center ${focus === "ma" ? "bg-gray-100 **:block" : "border-1 **:hidden border-gray-100 bg-gray-800"} rounded-md`}
                  >
                    <FaCheck size={20} color="#111" />
                  </div>
                  <p className="text-gray-50 font-bold text-sm lg:text-md mr-3">
                    MA (Moving Average)
                  </p>
                </div>
              </div>
              <div className="flex justify-between ml-6 my-2">
                <div className="flex gap-2">
                  <div
                    onClick={() => {
                      ma.includes(7)
                        ? setMa((prev) => prev.filter((e) => e !== 7))
                        : setMa((prev) => [...prev, 7]);
                    }}
                    className={`w-6 h-6 flex justify-center items-center ${ma.includes(7) ? "bg-gray-100 **:flex" : "border-1 **:hidden border-gray-100 bg-gray-800"} rounded-md`}
                  >
                    <FaCheck size={20} color="#111" />
                  </div>
                  <p className="text-sm lg:text-md font-bold text-gray-50">
                    MA1
                  </p>
                </div>
                <div className="h-8 w-16 rounded-md text-center font-semibold text-gray-50 bg-gray-700 justify-center items-center flex">
                  7
                </div>
              </div>
              <div className="flex justify-between ml-6 my-1 lg:my-2">
                <div className="flex gap-2">
                  <div
                    onClick={() => {
                      ma.includes(20)
                        ? setMa((prev) => prev.filter((e) => e !== 20))
                        : setMa((prev) => [...prev, 20]);
                    }}
                    className={`w-6 h-6 flex justify-center items-center ${ma.includes(20) ? "bg-gray-100 **:flex" : "border-1 **:hidden border-gray-100 bg-gray-800"} rounded-md`}
                  >
                    <FaCheck size={20} color="#111" />
                  </div>
                  <p className="text-sm lg:text-md font-bold text-gray-50">
                    MA2
                  </p>
                </div>
                <div className="h-8 w-16 flex font-semibold text-gray-50 bg-gray-700 justify-center items-center rounded-md">
                  20
                </div>
              </div>
              <div className="flex justify-between ml-6 my-1 lg:my-2">
                <div className="flex gap-2">
                  <div
                    onClick={() => {
                      ma.includes(99)
                        ? setMa((prev) => prev.filter((e) => e !== 99))
                        : setMa((prev) => [...prev, 99]);
                    }}
                    className={`w-6 h-6 flex justify-center items-center ${ma.includes(99) ? "bg-gray-100 **:flex" : "border-1 **:hidden border-gray-100 bg-gray-800"} rounded-md`}
                  >
                    <FaCheck size={20} color="#111" />
                  </div>
                  <p className="text-sm lg:text-md font-bold text-gray-50">
                    MA3
                  </p>
                </div>
                <div className="round-md h-8 w-16 text-center font-semibold text-gray-50 bg-gray-700 flex justify-center items-center rounded-md">
                  99
                </div>
              </div>
            </div>

            <div className="flex-col flex flex-1">
              <div
                // onClick={() => setFocus("ema")}
                className={`flex  mb-2 lg:mb-4`}
              >
                <div className="flex gap-2 items-center">
                  <div
                    onClick={() => setFocus("ema")}
                    className={`w-6 h-6 cursor-pointer flex justify-center items-center ${focus === "ema" ? "bg-gray-100 **:block" : "border-1 **:hidden border-gray-100 bg-gray-800"} rounded-md`}
                  >
                    <FaCheck size={20} color="#111" />
                  </div>
                  <p className="text-gray-50 font-bold text-sm lg:text-md mr-3">
                    EMA (Exponential Moving Average)
                  </p>
                </div>
              </div>
              <div className="flex justify-between ml-6 my-2">
                <div className="flex gap-2">
                  <div
                    onClick={() => {
                      ema.includes(9)
                        ? setEma((prev) => prev.filter((e) => e !== 9))
                        : setEma((prev) => [...prev, 9]);
                    }}
                    className={`w-6 h-6 flex justify-center items-center ${ema.includes(9) ? "bg-gray-100 **:flex" : "border-1 **:hidden border-gray-100 bg-gray-800"} rounded-md`}
                  >
                    <FaCheck size={20} color="#111" />
                  </div>
                  <p className="text-sm lg:text-md font-bold text-gray-50">
                    EMA1
                  </p>
                </div>
                <div className="h-8 w-16 rounded-md text-center font-semibold text-gray-50 bg-gray-700 justify-center items-center flex">
                  9
                </div>
              </div>
              <div className="flex justify-between ml-6 my-1 lg:my-2">
                <div className="flex gap-2">
                  <div
                    onClick={() => {
                      ema.includes(21)
                        ? setEma((prev) => prev.filter((e) => e !== 21))
                        : setEma((prev) => [...prev, 21]);
                    }}
                    className={`w-6 h-6 flex justify-center items-center ${ema.includes(21) ? "bg-gray-100 **:flex" : "border-1 **:hidden border-gray-100 bg-gray-800"} rounded-md`}
                  >
                    <FaCheck size={20} color="#111" />
                  </div>
                  <p className="text-sm lg:text-md font-bold text-gray-50">
                    EMA2
                  </p>
                </div>
                <div className="h-8 w-16 flex font-semibold text-gray-50 bg-gray-700 justify-center items-center rounded-md">
                  21
                </div>
              </div>
              <div className="flex justify-between ml-6 my-1 lg:my-2">
                <div className="flex gap-2">
                  <div
                    onClick={() => {
                      ema.includes(55)
                        ? setEma((prev) => prev.filter((e) => e !== 55))
                        : setEma((prev) => [...prev, 55]);
                    }}
                    className={`w-6 h-6 flex justify-center items-center ${ema.includes(55) ? "bg-gray-100 **:flex" : "border-1 **:hidden border-gray-100 bg-gray-800"} rounded-md`}
                  >
                    <FaCheck size={20} color="#111" />
                  </div>
                  <p className="text-sm lg:text-md font-bold text-gray-50">
                    EMA3
                  </p>
                </div>
                <div className="round-md h-8 w-16 text-center font-semibold text-gray-50 bg-gray-700 flex justify-center items-center rounded-md">
                  55
                </div>
              </div>
            </div>

            <div className="flex-col flex flex-1">
              <div
                // onClick={() => setFocus("wma")}
                className={`flex mb-2 lg:mb-4`}
              >
                <div className="flex gap-2 items-center">
                  <div
                    onClick={() => setFocus("wma")}
                    className={`w-6 h-6 cursor-pointer flex justify-center items-center ${focus === "wma" ? "bg-gray-100 **:block" : "border-1 **:hidden border-gray-100 bg-gray-800"} rounded-md`}
                  >
                    <FaCheck size={20} color="#111" />
                  </div>
                  <p className="text-gray-50 font-bold text-sm lg:text-md mr-3">
                    WMA (Weighted Moving Average)
                  </p>
                </div>
              </div>
              <div className="flex justify-between ml-6 my-2">
                <div className="flex gap-2">
                  <div
                    onClick={() => {
                      wma.includes(7)
                        ? setWma((prev) => prev.filter((e) => e !== 7))
                        : setWma((prev) => [...prev, 7]);
                    }}
                    className={`w-6 h-6 flex justify-center items-center ${wma.includes(7) ? "bg-gray-100 **:flex" : "border-1 **:hidden border-gray-100 bg-gray-800"} rounded-md`}
                  >
                    <FaCheck size={20} color="#111" />
                  </div>
                  <p className="text-sm lg:text-md font-bold text-gray-50">
                    WMA1
                  </p>
                </div>
                <div className="h-8 w-16 rounded-md text-center font-semibold text-gray-50 bg-gray-700 justify-center items-center flex">
                  7
                </div>
              </div>
              <div className="flex justify-between ml-6 my-1 lg:my-2">
                <div className="flex gap-2">
                  <div
                    onClick={() => {
                      wma.includes(20)
                        ? setWma((prev) => prev.filter((e) => e !== 20))
                        : setWma((prev) => [...prev, 20]);
                    }}
                    className={`w-6 h-6 flex justify-center items-center ${wma.includes(20) ? "bg-gray-100 **:flex" : "border-1 **:hidden border-gray-100 bg-gray-800"} rounded-md`}
                  >
                    <FaCheck size={20} color="#111" />
                  </div>
                  <p className="text-sm lg:text-md font-bold text-gray-50">
                    WMA2
                  </p>
                </div>
                <div className="h-8 w-16 flex font-semibold text-gray-50 bg-gray-700 justify-center items-center rounded-md">
                  20
                </div>
              </div>
              <div className="flex justify-between ml-6 my-1 lg:my-2">
                <div className="flex gap-2">
                  <div
                    onClick={() => {
                      wma.includes(25)
                        ? setWma((prev) => prev.filter((e) => e !== 25))
                        : setWma((prev) => [...prev, 25]);
                    }}
                    className={`w-6 h-6 flex justify-center items-center ${wma.includes(25) ? "bg-gray-100 **:flex" : "border-1 **:hidden border-gray-100 bg-gray-800"} rounded-md`}
                  >
                    <FaCheck size={20} color="#111" />
                  </div>
                  <p className="text-sm lg:text-md font-bold text-gray-50">
                    WMA3
                  </p>
                </div>
                <div className="round-md h-8 w-16 text-center font-semibold text-gray-50 bg-gray-700 flex justify-center items-center rounded-md">
                  25
                </div>
              </div>
            </div>
          </div>
          <div onClick={()=>{
            setSelected(focus, focus==="ma"?ma:focus==="ema"?ema:wma);
            computeIndicators()
          }} className="text-gray-950 font-bold text-md px-16 h-10 bg-amber-400 rounded-md flex justify-center items-center cursor-pointer">
                Save
          </div>
        </DialogContent>
      </Dialog>
      <div></div>
      <div>
        <ChartCandlestick color="rgb(110,110,110)" width={16} />
      </div>
    </div>
  );
}

