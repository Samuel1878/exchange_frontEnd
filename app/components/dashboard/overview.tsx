import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuthStore } from "~/store/useUserDataStore";
import { BTC, USER } from "~/utils";
import { TradeButton } from "../charts/components/buttons";
import { useNavigate } from "react-router";
import HomeMiniChart from "../miniCharts/homeMiniChart";
import AiMiniChart from "../miniCharts/aiMiniChart";

import { formatTotalPrice } from "~/utils/helpers";
import CustomActiveShapePieChart from "./piChart";
import { formatPrice } from "../charts/util";
export function Container({ children }) {
  return (
    <React.Fragment>
      <section className="bg-gray-900 lg:bg-gray-950 flex flex-col items-center min-h-dvh">
        <article className="max-w-6xl w-full text-gray-50 p-4 min-h-dvh">
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
        className="flex items-center py-4 justify-between w-full gap-4"
      >
        <div className="flex items-center gap-2">
          <img src={USER} width={50} className="rounded-full" />
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
                className={`text-gray-50 text-xs p-1 px-3 capitalize rounded-full cursor-pointer ${user?.KycStatus === "verified" ? "bg-green-500" : "bg-red-400"}`}
              >
                {user?.KycStatus}
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="border border-gray-800 p-2 rounded-md cursor-pointer">
            Edit
          </div>
        </div>
      </div>
      <div className="mt-6 flex flex-col lg:flex-row justify-between w-full lg:border lg:border-gray-700 lg:p-6 lg:rounded-lg">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-gray-50 text-sm font-medium lg:text-lg lg:font-semibold">
            Estimated Balance
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
          <div className="text-gray-200 font-bold text-3xl lg:font-extrabold">
            {balanceShow ? (formatPrice(totalUSDT) ?? 0) : "********"} USDT
          </div>
          <div className="text-gray-200 text-sm font-semibold">
            ≈ $ {balanceShow ? (formatTotalPrice(totalUSDT) ?? 0) : "********"}
          </div>
        </div>

        <div className="flex gap-4 w-full mt-6 lg:mt-0 lg:w-auto">
          <TradeButton
            label="Deposit"
            style="bg-gray-800 hover:bg-gray-950 lg:hover:bg-gray-900 h-10 w-full md:w-40 lg:w-auto px-0 lg:px-4"
            textStyle="text-gray-100 font-semibold"
            action={() => navigate("/deposit")}
          />
          <TradeButton
            label="Withdraw"
            style="bg-gray-800 hover:bg-gray-950 lg:hover:bg-gray-900 h-10 w-full md:w-40 lg:w-auto px-0 lg:px-4"
            textStyle="text-gray-100 font-semibold"
            action={() => navigate("/withdraw")}
          />
          <TradeButton
            label="Trade"
            style="bg-gray-800 hover:bg-gray-950 lg:hover:bg-gray-900 h-10 w-full md:w-40 lg:w-auto px-0 lg:px-4"
            textStyle="text-gray-100 font-semibold"
            action={() => navigate("/trade/btcusdt?type=spot")}
          />
        </div>
      </div>
      <div className="flex items-center">
        
        <CustomActiveShapePieChart walletTotals={walletTotals} />
        <div>
          <p>{walletTotals?.spot}</p>
        </div>
      </div>
      <aside className="border-0 lg:border lg:border-gray-700 lg:rounded-lg p-4 ">
        <h1>My Assets</h1>
      </aside>
      {/* <div className="my-10">
        <HomeMiniChart />
      </div>
      <div className="">
        <AiMiniChart />
      </div> */}
    </Container>
  );
}
