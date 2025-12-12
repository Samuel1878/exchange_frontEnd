import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuthStore } from "~/store/useUserDataStore";
import { BTC } from "~/utils";
import { TradeButton } from "../charts/components/buttons";
import { useNavigate } from "react-router";
import HomeMiniChart from "../miniCharts/homeMiniChart";
import AiMiniChart from "../miniCharts/aiMiniChart";

import { formatNumber, formatTotalPrice } from "~/utils/helpers";
import CustomActiveShapePieChart from "./piChart";
export function Container({ children }) {
  return (
    <React.Fragment>
      <section className="bg-gray-900 lg:bg-gray-950 flex flex-col items-center overflow-y-auto min-h-full">
        <article className="max-w-6xl w-full text-gray-50 p-4">
          {children}
        </article>
      </section>
    </React.Fragment>
  );
}
export default function OverView({walletTotals, totalUSDT}:{
  walletTotals:Record<string, number>, totalUSDT:number
}) {
  const { user } = useAuthStore();
  const [balanceShow, setBalanceShow] = useState(true);
  const navigate = useNavigate();
  return (
    <Container>
      <div
        id="profile"
        className="flex items-center py-4 justify-between w-full "
      >
        <div className="flex items-center gap-2">
          <img src={BTC} width={50} />
          <div className="relative">
            <p className="text-gray-50 text-md font-semibold">
              {user?.UserName || user?.Phone || user?.Email}
            </p>
            <p className="text-gray-600">{user?.Phone}</p>
            {/* {user?.Email ? (
              <p className="text-gray-600 text-sm">{user?.Email}</p>
            ) : (
              <p className="text-sm font-semibold text-red-300 cursor-pointer">
                Bind Email
              </p>
            )} */}
            <div className="flex gap-2 mt-1">
              <div
                className={`text-gray-50 text-xs p-1 px-3 rounded-full bg-gray-600 capitalize`}
              >
                {user?.AccountLevel}
              </div>
              <div
                className={`text-gray-50 text-xs p-1 px-3 capitalize rounded-full cursor-pointer ${user?.KycStatus === "verified"? "bg-green-500" :"bg-red-400"}`}
              >
                {user?.KycStatus}
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="border-1 border-gray-800 p-2 rounded-md cursor-pointer">
            Edit
          </div>
        </div>
      </div>
      <div className="mt-6">
        <div className="flex items-center gap-2 text-gray-50 text-sm font-medium">
          Your Estimated Balance
          <button
            className="cursor-pointer"
            onClick={() => setBalanceShow((prev) => !prev)}
          >
            {balanceShow ? (
              <FaEye color="#d6d6d6" />
            ) : (
              <FaEyeSlash color="#d6d6d6" />
            )}
          </button>
        </div>
        <div className="text-gray-50 font-bold text-3xl">
          {balanceShow ? formatNumber(totalUSDT)??0 : "********"} USDT
        </div>
        <div className="text-gray-200 text-sm">
          ≈ $ {balanceShow ? formatTotalPrice(totalUSDT) ??0 : "********"}
        </div>
        <div className="flex gap-4 w-full mt-6">
          <TradeButton
            label="Deposit"
            style="bg-gray-800 h-10 w-full md:w-40"
            textStyle="text-gray-100 font-semibold"
            action={() => navigate("/deposit")}
          />
          <TradeButton
            label="Withdraw"
            style="bg-gray-800 hover:bg-gray-950 lg:hover:bg-gray-900 h-10 w-full md:w-40"
            textStyle="text-gray-100 font-semibold"
            action={() => navigate("/withdraw")}
          />
          <TradeButton
            label="Trade"
            style="bg-gray-800 hover:bg-gray-950 lg:hover:bg-gray-900 h-10 w-full md:w-40"
            textStyle="text-gray-100 font-semibold"
            action={() => navigate("/trade/btcusdt?type=spot")}
          />
        </div>
      </div>
      <div className="p-2">
        <CustomActiveShapePieChart/>
      </div>
      <div className="my-10">
        <HomeMiniChart />
      </div>
      <div className="">
        <AiMiniChart />
      </div>
    </Container>
  );
}
