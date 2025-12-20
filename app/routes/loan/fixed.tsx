import React, { useState } from "react";
import { Link } from "react-router";
import FAQ from "~/components/homeComponents/f&q";
import { FixedFAQList } from "~/consts/faqLists";
import {
  FixedAdvantagesList,
  FixedLoanWork,
  FixedSupplierWork,
} from "~/consts/miniLists";
import { useWalletStore } from "~/store/useUserWalletStore";
import { Coins, vip_banner } from "~/utils";
const coins = [
    "USDT",
    "USDC",
    "ETH",
    "SOL",
    "TRX"
]
enum SelectedCoin {
    usdt = "USDT",
    usdc = "USDC",
    eth = "ETH",
    sol = "SOL",
    trx = "TRX"
}
export default function FixedLoan() {
  const accessToken = useWalletStore.getState().accessToken;
  const isLoggedIn = useWalletStore.getState().isLoggedIn;
  const [isSupplier, setIsSupplier] = useState(false);
  const [coin ,setCoin] = useState<SelectedCoin>(SelectedCoin.usdt)
  return (
    <main className="bg-gray-900 lg:bg-gray-950">
      <section id="heroFix" className="flex flex-col lg:items-center">
        <article className="flex flex-col gap-4 lg:gap-y-8">
          <div className="text-gray-300 space-y-10">
            <div className="flex flex-col lg:items-center md:items-start lg:flex-row lg:justify-between lg:gap-6">
              <div className=" mb-4 lg:space-x-7">
                <h1 className="text-lg lg:text-2xl text-amber-300 font-extrabold font-sans">
                  FIXED RATE LOANS
                </h1>
                <h2 className="text-2xl font-bold lg:text-3xl text-amber-50 xl:py-4 mb-4">
                  Borrow with Your Chosen Fixed Interest Rate and Duration
                </h2>
                <div className="flex gap-4">
                  <div className="md:border-r border-r-gray-800 md:pr-4">
                    <p className="text-gray-500 text-xs md:text-sm">
                      Total Borrowed
                    </p>
                    <p className="text-gray-50 font-semibold mt-1 md:text-xl text-lg">
                      $319.1M
                    </p>
                  </div>
                  <div className="md:border-r border-r-gray-800 md:pr-4">
                    <p className="text-gray-500 text-xs md:text-sm">
                      Current Orders
                    </p>
                    <p className="text-gray-50 font-semibold mt-1 text-lg md:text-xl">
                      $12.7M
                    </p>
                  </div>
                  <div className="hidden md:flex flex-col justify-between">
                    <p className="text-gray-500 text-xs md:text-sm">
                      Customized Interest Rate
                    </p>
                    <p className="text-gray-500 text-xs md:text-sm">
                      Multi-Asset Collateral Supported
                    </p>
                  </div>
                </div>
              </div>
              {isLoggedIn ? (
                <div className="flex flex-col px-4 py-2 border border-gray-800 rounded-xl w-full md:w-1/3">
                  <div className="cursor-pointer w-full px-2 py-2 my-2 space-y-2 lg:hover:bg-gray-900 hover:bg-gray-800 rounded-lg">
                    <p className="text-gray-50 font-semibold text-sm">
                      Pending Orders
                    </p>
                    <p className="text-gray-600 text-xs font-medium">
                      Check and manage unmatched orders
                    </p>
                  </div>
                  <div className="h-0.5 bg-gray-800 opacity-50" />
                  <div className="cursor-pointer w-full px-2 py-2 my-2 space-y-2 hover:bg-gray-800 hover:lg:bg-gray-900 rounded-lg">
                    <p className="text-gray-50 font-semibold text-sm">
                      Pending Orders
                    </p>
                    <p className="text-gray-600 text-xs font-medium">
                      Check and manage unmatched orders
                    </p>
                  </div>
                </div>
              ) : (
                <div className="block sm:block my-4 lg:my-0 lg:space-y-2 md:space-y-2">
                  <div
                    className="flex flex-2 border items-center border-amber-300 p-4 gap-2 rounded-2xl"
                    style={{ backgroundColor: "rgba(240, 185, 11,.03)" }}
                  >
                    <div className="md:p-4">
                      <p className="text-lg font-bold mb-1">
                        Flexible Rate Loans
                      </p>
                      <span className="text-sm">
                        Borrow for Spot/Margin/Futures Trading or staking to
                        earn high APY.
                      </span>
                      <p className="text-amber-300 mt-2 font-semibold text-sm">
                        <Link to="/finance/loans">Explore Now</Link>
                      </p>
                    </div>

                    <img
                      src={vip_banner}
                      alt=""
                      className="lg:w-[180px] w-[100px]"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          <aside className="flex w-full py-10">
            <div className="flex gap-1 lg:gap-2">
              {coins.map((e) => (
                <div
                  onClick={() => setCoin(SelectedCoin[e.toLowerCase()])}
                  className={`cursor-pointer hover:bg-gray-800 hover:text-gray-50 rounded-lg text-sm lg:text-md font-bold flex gap-2 h-9 lg:h-12 items-center justify-center px-2 lg:px-4 ${e === coin ? "bg-gray-800 text-gray-50" : "bg-gray-900 lg:bg-gray-950 text-gray-500"}`}
                >
                  <img src={Coins[e]} className="w-5 lg:w-6 rounded-full" />
                  <p>{e}</p>
                </div>
              ))}
            </div>
          </aside>
          <div className="my-6">
            <p className="text-gray-50 font-bold text-lg my-6">
              How Do Fixed Rate Loans Work?
            </p>
            <div className="flex gap-6 border-b border-b-gray-800 mb-4">
              <p
                onClick={() => setIsSupplier(false)}
                className={`cursor-pointer text-md font-semibold pb-2 ${!isSupplier ? "text-gray-50 border-b-2 border-b-amber-300" : "text-gray-500 border-b-0"}`}
              >
                As a Borrower
              </p>
              <p
                onClick={() => setIsSupplier(true)}
                className={`cursor-pointer text-md font-semibold pb-2 ${isSupplier ? "text-gray-50 border-b-2 border-b-amber-300" : "text-gray-500 border-b-0"}`}
              >
                As a Supplier
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6 gap-8 lg:gap-6">
              {isSupplier
                ? FixedSupplierWork.map((e) => (
                    <div
                      key={e.id}
                      className="p-4 border-0 md:border md:border-gray-700 md:rounded-xl"
                    >
                      <div className="flex flex-row md:flex-col gap-4 items-start md:gap-6">
                        {e.image}
                        <div className="flex flex-col gap-2 md:gap-4">
                          <p className="text-gray-50 text-md font-semibold">
                            {e.title}
                          </p>
                          <p className="text-gray-500 text-sm">
                            {e.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                : FixedLoanWork.map((e) => (
                    <div
                      key={e.id}
                      className="p-4 border-0 md:border md:border-gray-700 md:rounded-xl"
                    >
                      <div className="flex flex-row md:flex-col gap-4 items-start md:gap-6">
                        {e.image}
                        <div className="flex flex-col gap-2 md:gap-4">
                          <p className="text-gray-50 text-md font-semibold">
                            {e.title}
                          </p>
                          <p className="text-gray-500 text-sm">
                            {e.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
          <div className="my-6">
            <p className="text-gray-50 font-bold text-lg">
              Fixed Rate Loans Advantages
            </p>
            <div className="grid mt-5 grid-cols-1 md:grid-cols-6 gap-8 lg:gap-6">
              {FixedAdvantagesList.map((e) => (
                <div className="md:col-span-3 border-0 md:border md:border-gray-700 md:rounded-xl">
                  <div className="flex flex-row md:flex-col p-4 md:p-4 gap-4 items-start md:gap-6">
                    {e.image}
                    <div className="flex flex-col gap-2 md:gap-4">
                      <p className="text-gray-50 text-md font-semibold">
                        {e.title}
                      </p>
                      <p className="text-gray-500 text-sm">{e.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <FAQ list={FixedFAQList} />
        </article>
      </section>
    </main>
  );
}
