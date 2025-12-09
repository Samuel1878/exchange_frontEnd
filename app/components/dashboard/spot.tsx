import { useState } from "react";
import { TradeButton } from "../charts/components/buttons";
import { useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Container } from "./overview";
import { AllCoinNames } from "~/consts/pairs";
import { Coins } from "~/utils";

export default function SpotWallet() {
  const [balanceShow, setBalanceShow] = useState(true);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  return (
    <Container>
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
          {balanceShow ? "0.020291" : "********"} USDT
        </div>
        <div className="text-gray-200 text-sm">
          ≈ $ {balanceShow ? "0.020291" : "********"}
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
            label="Transfer"
            style="bg-gray-800 hover:bg-gray-950 lg:hover:bg-gray-900 h-10 w-full md:w-40"
            textStyle="text-gray-100 font-semibold"
            action={() => navigate("/trade/btcusdt?type=spot")}
          />
        </div>
      </div>
      <div className="mt-8">
        <p className="text-2xl font-bold text-gray-100">Spot</p>
        <div className="" id="balanceTable">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {Object.entries(AllCoinNames).map((e) => {
            return (
              <div className="flex justify-between items-center my-6">
                <div className="flex gap-4 items-center">
                  <img
                    src={Coins[e[1].symbol]}
                    style={{ width: 30, height: 30, borderRadius: "100%" }}
                  />
                  <div>
                    <p className="text-lg font-bold text-gray-50">
                      {e[1].symbol}
                    </p>
                    <p className="text-md font-bold text-gray-700">
                      {e[1].name}
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 items-center">
                  <div>
                    <p className="text-gray-50 font-medium text-md">{1000}</p>
                    <p className="text-gray-700 font-medium text-md">$ {100}</p>
                  </div>
                  <button>
                    :
                    :
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Container>
  );
}
