import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { BTC, Coins, USER } from "~/utils";
import { TradeButton } from "../charts/components/buttons";
import { useNavigate } from "react-router";
import HomeMiniChart from "../miniCharts/homeMiniChart";
import AiMiniChart from "../miniCharts/aiMiniChart";

import { formatTotalPrice } from "~/utils/helpers";
import { formatPrice } from "../charts/util";
import type { AssetBalance, WalletBalance } from "~/utils/types";
import { useWalletStore } from "~/store/useUserWalletStore";
import { useCombinedWalletAssets, useTotalUSDT, useUser } from "~/utils/walletSelectors";
import { AllCoinNames } from "~/consts/pairs";
import { NoData } from "../loading/noData";
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
export default function OverView() {
  const [balanceShow, setBalanceShow] = useState(true);
  const navigate = useNavigate();
  const user = useUser()
  const totalUSDT = useTotalUSDT()
  const assetList = useCombinedWalletAssets()

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
              {user?.username ?? ""}
            </p>
            <p className="text-gray-600">{user?.phone ?? ""}</p>
            <p className="text-gray-600">{user?.email ?? ""}</p>
            <div className="flex gap-2 mt-1">
              <div
                className={`text-gray-50 text-xs p-1 px-3 rounded-full bg-gray-600 capitalize`}
              >
                {user?.accountLevel}
              </div>
              <div
                className={`text-gray-50 text-xs p-1 px-3 capitalize rounded-full cursor-pointer ${user?.kycStatus === "verified" ? "bg-green-500" : "bg-red-400"}`}
              >
                {user?.kycStatus}
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
      <div className=" my-4 border-0 lg:border lg:border-gray-700 lg:rounded-lg p-4 w-full">
        <h1>Wallets</h1>
        {}
      </div>
      <aside className="border-0 lg:border lg:border-gray-700 p-4 lg:rounded-lg w-full ">
        <h1>My Assets</h1>
        <div className="flex justify-between items-center w-full my-4 px-2">
          <div className="flex flex-1 justify-between">
            <p className="text-xs text-gray-500">Coin</p>
            <p className="text-xs text-gray-500 text-right">Total</p>
          </div>
          <div className="hidden md:flex flex-1">
            <p className="text-xs text-gray-500 text-right flex flex-1 justify-end">
              Available
            </p>
            <p className="text-xs text-gray-500 text-right flex flex-1 justify-end">
              Locked
            </p>
          </div>
          <div className="hidden lg:block w-20 text-right text-xs text-gray-500">
            Trade
          </div>
        </div>
        {totalUSDT ? (
          assetList?.map((e) =>{ 
            let pair = e.currency === "USDT" ? "btcusdt": e.currency.toLowerCase() + "usdt"
            return (
              <div
                onClick={() => navigate(`/trade/${pair}?type=spot`)}
                className="flex justify-between items-center w-full py-4 md:px-0 lg:px-2 cursor-pointer hover:bg-gray-950 lg:hover:bg-black rounded-md"
              >
                <div className="flex flex-1 justify-between items-center">
                  <div className="flex items-center gap-3">
                    <img src={Coins[e.currency]} className="w-8 rounded-full" />
                    <div>
                      <p className="text-gray-50 font-bold text-md">
                        {e.currency}
                      </p>
                      <p className="text-gray-600 font-medium text-sm">
                        {AllCoinNames[e.currency.toLowerCase()].name}
                      </p>
                    </div>
                  </div>
                  <div className=" text-right">
                    <p className="text-sm text-gray-100 font-semibold">
                      {e.total.toFixed(4) + " " + e.currency}
                    </p>
                    <p className="text-xs font-medium text-gray-600">
                      ${e.totalUSDT}
                    </p>
                  </div>
                </div>
                <div className="hidden md:flex flex-1">
                  <div className=" text-right flex flex-1 justify-end flex-col">
                    <p className="text-sm text-gray-100 font-semibold">
                      {e.available.toFixed(4) + " " + e.currency}
                    </p>
                    <p className="text-xs font-medium text-gray-600">
                      ${e.availableUSDT}
                    </p>
                  </div>
                  <div className=" text-right flex flex-1 justify-end flex-col">
                    <p className="text-sm text-gray-100 font-semibold">
                      {e.locked.toFixed(4) + " " + e.currency}
                    </p>
                    <p className="text-xs font-medium text-gray-600">
                      ${e.lockedUSDT}
                    </p>
                  </div>
                </div>
                <div className="hidden lg:block w-20 text-right text-xs text-amber-300 underline">
                  Trade
                </div>
              </div>
            );})
        ) : (
          <NoData />
        )}
      </aside>
      <aside></aside>
    </Container>
  );
}
