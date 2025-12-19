import { useState } from "react";
import { TradeButton } from "../charts/components/buttons";
import { useNavigate } from "react-router";
import {
  FaChevronLeft,
  FaChevronRight,
  FaExchangeAlt,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { Container } from "./overview";
import { AllCoinNames } from "~/consts/pairs";
import { Coins } from "~/utils";
import type { WalletBalance } from "~/utils/types";
import { getSortedCoins } from "~/utils/helpers";
import { IoIosSearch } from "react-icons/io";
import { useWallet } from "~/utils/walletSelectors";
import { BiDotsVertical } from "react-icons/bi";

export default function FundingWallet({
  toggleTransfer,
}: {
  toggleTransfer: () => void;
}) {
  const [balanceShow, setBalanceShow] = useState(true);
  const [query, setQuery] = useState("");
  const fundingWallet = useWallet("FUNDING");
  const [page, setPage] = useState(1);
  const size = 10;
  const list = getSortedCoins(
    fundingWallet && fundingWallet?.assets,
    page,
    size,
    query
  );
  // const list = getSortedCoins(assets && assets[0]?.assets, page, size, query);
  const navigate = useNavigate();
  return (
    <Container>
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
            {balanceShow ? (fundingWallet.totalUSDT ?? 0) : "********"} USDT
          </div>
          <div className="text-gray-200 text-sm font-semibold">
            ≈ $ {balanceShow ? fundingWallet.totalUSDT * 0.999 : "********"}
          </div>
        </div>

        <div className="flex gap-4 w-full mt-6 lg:mt-0 lg:w-auto">
          <TradeButton
            label="Deposit"
            style="bg-gray-800 rounded-sm hover:bg-gray-950 lg:hover:bg-gray-900 h-10 w-full md:w-40 lg:w-auto px-0 lg:px-4"
            textStyle="text-gray-100 font-semibold"
            action={() => navigate("/deposit")}
          />
          <TradeButton
            label="Withdraw"
            style="bg-gray-800 rounded-sm hover:bg-gray-950 lg:hover:bg-gray-900 h-10 w-full md:w-40 lg:w-auto px-0 lg:px-4"
            textStyle="text-gray-100 font-semibold"
            action={() => navigate("/withdraw")}
          />
          <TradeButton
            label="Transfer"
            style="bg-gray-800 rounded-sm hover:bg-gray-950 lg:hover:bg-gray-900 h-10 w-full md:w-40 lg:w-auto px-0 lg:px-4"
            textStyle="text-gray-100 font-semibold"
            action={toggleTransfer}
          />
        </div>
      </div>
      <div className="mt-8 border-0 lg:border lg:border-gray-700 p-3 lg:p-5 rounded-lg">
        <div className="flex justify-between items-center">
          <p className="text-lg lg:text-2xl font-bold text-gray-100">Spot</p>
          <div className="flex justify-between items-center gap-2">
            <div className="border w-60 px-4 flex items-center gap-3 border-gray-700 lg:w-100 h-10 outline-0 rounded-full text-gray-300 focus:border-gray-300">
              <IoIosSearch />
              <input
                type="search"
                value={query}
                placeholder="Search"
                onChange={(e) => setQuery(e.target.value)}
                className="outline-0 w-full h-full"
              />
            </div>
          </div>
        </div>

        <div className="mt-4" id="balanceTable">
          <div className="flex justify-between mt-8">
            <div className="flex-1 justify-between flex">
              <p className="text-gray-600 font-medium text-sm">Coin</p>
              <p className="text-gray-600 font-medium text-sm">Amount</p>
            </div>
            <div className="flex-1 justify-between hidden md:flex">
              <p className="text-gray-600 font-medium text-sm flex-1 text-right">
                Available
              </p>
              <p className="text-gray-600 font-medium text-sm flex-1 text-right hidden lg:block">
                Locked
              </p>
            </div>
            <div className="text-gray-600 font-medium text-sm w-16 text-right">
              Action
            </div>
          </div>
          {list &&
            list?.map((c) => (
              <div
                className="flex justify-between items-center py-4 my-2 cursor-pointer"
                // to={"/trade/" + c.symbol.toLowerCase() + "usdt" + "?type=spot"}
              >
                <div className="flex-1 justify-between flex">
                  <div className="flex gap-4 items-center">
                    <img
                      src={Coins[c.currency.toUpperCase()]}
                      style={{ width: 30, height: 30, borderRadius: "100%" }}
                    />
                    <div>
                      <p className="text-lg font-bold text-gray-50">
                        {c.currency}
                      </p>
                      <p className="text-md font-bold text-gray-700">
                        {c.name}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-center">
                    <div className="text-right">
                      <p className="text-gray-50 font-medium text-md">
                        {c.total.toFixed(6)}
                      </p>
                      <p className="text-gray-700 font-medium text-md">
                        $ {c.totalUSDT.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex-1 justify-between hidden md:flex">
                  <div className="text-right flex-1">
                    <p className="text-gray-50 font-medium text-md">
                      {c.available.toFixed(6)}
                    </p>
                    <p className="text-gray-700 font-medium text-md">
                      $ {c.availableUSDT.toFixed(2)}
                    </p>
                  </div>
                  <div className="text-right flex-1 hidden lg:block">
                    <p className="text-gray-50 font-medium text-md">
                      {c.locked.toFixed(6)}
                    </p>
                    <p className="text-gray-700 font-medium text-md">
                      $ {c.lockedUSDT.toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="text-gray-600 font-medium text-sm pl-6 text-right">
                  <BiDotsVertical color="#999" size={20} />
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
              disabled={list?.length < size}
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
