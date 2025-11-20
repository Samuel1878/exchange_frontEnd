import { FaMinus, FaPlus } from "react-icons/fa";
import { FiInfo } from "react-icons/fi";
import { GoArrowSwitch } from "react-icons/go";
import { IoMdArrowDropdown } from "react-icons/io";
import { Link } from "react-router";
import { CoinPairs } from "~/consts/pairs";

export default function ({ isBuy, isLimit, setIsBuy, setOpenLimitDrawer ,pair}) {
  return (
    <div
      id="trde"
      className="flex-5 flex flex-col justify-between gap-4 min-h-110"
    >
      <div className="px-4 py-2 border-b-0 md:border-b-2 border-b-gray-800  flex gap-4 ">
        <div className={`font-semibold text-lg `}>Spot</div>
        <div className={`font-semibold text-lg `}>Cross</div>
        <div className={`font-semibold text-lg `}>Future</div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex gap-1">
          <button
            onClick={() => setIsBuy(true)}
            className={`flex-1 h-10 rounded-md font-bold justify-center items-center text-gray-50  ${isBuy ? "bg-green-400" : "bg-gray-800"}`}
          >
            Buy
          </button>
          <button
            onClick={() => setIsBuy(false)}
            className={`flex-1 h-10 rounded-md font-bold justify-center items-center text-gray-50  ${!isBuy ? "bg-red-500" : "bg-gray-800"}`}
          >
            Sell
          </button>
        </div>
        <button
          onClick={() => setOpenLimitDrawer(true)}
          className="h-10 flex justify-between text-gray-50 bg-gray-800 items-center px-4 rounded-md"
        >
          <FiInfo />

          {isLimit ? "Limit" : "Market"}
          <IoMdArrowDropdown />
        </button>
        <input
          className="outline-gray-700 outline-1 focus:outline-amber-400 rounded-md text-center h-10 w-full text-gray-50"
          placeholder="Price (USDT)"
        />
        <input
          className="outline-gray-700 outline-1 focus:outline-amber-400 rounded-md text-center h-10 w-full text-gray-50"
          placeholder="Total (USDT)"
        />
        <div className="flex outline-gray-700 outline-1 focus:outline-amber-400 rounded-md p-2 h-14 ">
          <button className="bg-gray-800 rounded-sm px-3">
            <FaMinus color="#fff" />
          </button>
          <input
            className=" text-center focus:outline-0 w-full placeholder:text-sm text-gray-50"
            placeholder={`Amount ${CoinPairs[pair].names[0]}`}
          />
          <button className="bg-gray-800 rounded-sm px-3">
            <FaPlus color="#fff" />
          </button>
        </div>
        <div className="flex justify-between gap-2">
          <button className="py-1 flex-1 items-center bg-gray-800 rounded-sm text-gray-50">
            25%
          </button>
          <button className="py-1 flex-1 items-center bg-gray-800 rounded-sm text-gray-50">
            50%
          </button>
          <button className="py-1 flex-1 items-center bg-gray-800 rounded-sm text-gray-50">
            75%
          </button>
          <button className="py-1 flex-1 items-center bg-gray-800 rounded-sm text-gray-50">
            100%
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <p className="text-md text-gray-400 ">Avilable</p>
          <div className="flex gap-2">
            <p className="text-gray-50">0 USDT</p>
            <button>
              <GoArrowSwitch color="#fff" />
            </button>
          </div>
        </div>

        <button
          className={`h-10 text-center rounded-md font-medium text-gray-50  ${isBuy ? "bg-green-400" : "bg-red-500"}`}
        >
          {isBuy ? "Buy" : "Sell"}
        </button>
      </div>
    </div>
  );
}
