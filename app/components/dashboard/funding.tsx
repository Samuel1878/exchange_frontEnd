import { useState } from "react";
import { TradeButton } from "../charts/components/buttons";
import { useNavigate } from "react-router";
import {
  FaChevronLeft,
  FaChevronRight,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { Container } from "./overview";
import { AllCoinNames } from "~/consts/pairs";
import { Coins } from "~/utils";
import type { WalletBalance } from "~/utils/types";
import { getSortedCoins } from "~/utils/helpers";

export default function FundingWallet({
  walletDetails,
  walletTotals,
}: {
  walletDetails: WalletBalance[];
  walletTotals: Record<string, number>;
}) {
  const [balanceShow, setBalanceShow] = useState(true);
  const [query, setQuery] = useState("");
  const assets = walletDetails.filter((e) => e.walletType === "funding");
  const [page, setPage] = useState(1);
  const size = 10;
  const list = getSortedCoins(assets[0].assets, page, size, query);
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
          {balanceShow ? walletTotals?.funding : "********"} USDT
        </div>
        <div className="text-gray-200 text-sm">
          ≈ $ {balanceShow ? walletTotals?.funding : "********"}
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
        <p className="text-2xl font-bold text-gray-100">Funding</p>
        <div className="mt-4" id="balanceTable">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border-1 px-4 border-gray-700 w-100 h-10 outline-0 rounded-lg text-gray-300 focus:border-gray-300"
          />
          {list.map((c) => (
            <div className="flex justify-between items-center my-6">
              <div className="flex gap-4 items-center">
                <img
                  src={Coins[c.symbol.toUpperCase()]}
                  style={{ width: 30, height: 30, borderRadius: "100%" }}
                />
                <div>
                  <p className="text-lg font-bold text-gray-50">{c.symbol}</p>
                  <p className="text-md font-bold text-gray-700">{c.name}</p>
                </div>
              </div>

              <div className="flex gap-4 items-center">
                <div className="text-right">
                  <p className="text-gray-50 font-medium text-md">
                    {c.balance.toFixed(6)}
                  </p>
                  <p className="text-gray-700 font-medium text-md">
                    $ {c.valueUSDT.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))}
          <div className="flex gap-4 justify-center">
            <button
              className="text-gray-600 flex gap-2 items-center text-md "
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              <FaChevronLeft />
              Prev
            </button>
            <button
              className="text-gray-600 flex gap-2 items-center text-md "
              disabled={list.length < size}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
}
