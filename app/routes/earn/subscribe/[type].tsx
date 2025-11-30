
import FooterSection from "~/components/footer";
import { useState } from "react";

import { useFetcher } from "react-router";
import type { Route } from "./+types/[type]";
import { BCH, BTC, BTCETH, ETH, LTC, XRP } from "~/utils";
interface LoaderDataParams {
  type: string | null;
}
export async function clientLoader({
  params,
}: {
  params: { type?: string };
}): Promise<LoaderDataParams> {
  return { type: params.type || null };
}

export async function clientAction({
  params,
  request,
}: Route.ClientActionArgs) {
  try {
    const formData = await request.formData();
    const intent = formData.get("intent");
    const amount = formData.get("amount");
    const asset = formData.get("asset");

    if (intent === "subscribe") {
      // Your subscription logic here
      console.log("Subscribing with:", { amount, asset });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      return {
        success: true,
        message: "Subscription successful!",
        data: { amount, asset },
      };
    }

    return { success: false, error: "Unknown action" };
  } catch (error) {
    console.error("Error in subscription:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Subscription failed",
    };
  }
}

export default function SubscribeTypePage({
  loaderData,
}: {
  loaderData: LoaderDataParams;
}) {
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscriptionAmount, setSubscriptionAmount] = useState("");
  const [selectedAsset, setSelectedAsset] = useState(
    loaderData?.type || "USDT"
  );
  const [useAutoSubscribe, setUseAutoSubscribe] = useState(true);
  const [loading, setLoading] = useState(false);
  const fetcher = useFetcher();
  const availableAssets = [
    { symbol: "USDT", balance: 0, name: "Tether", coin: BTC },
    { symbol: "BUSD", balance: 800.0, name: "Binance USD", coin: BCH },
    { symbol: "BTC", balance: 0.05, name: "Bitcoin", coin: BTC },
    { symbol: "ETH", balance: 2.5, name: "Ethereum", coin: ETH },
    { symbol: "XRP", balance: 1500, name: "Ripple", coin: XRP },
    { symbol: "LTC", balance: 20, name: "Litecoin", coin: LTC },
    { symbol: "BTC-ETH", balance: 1.2, name: "BTC-ETH Combo", coin: BTCETH },
  ];
  const getStatusColor = (status: string) => {
    const colorMap: Record<string, string> = {
      Review: "text-yellow-400",
      completed: "text-green-400",
      Rejected: "text-red-400",
      cancelled: "text-gray-400",
      processing: "text-orange-400",
    };
    return colorMap[status] || "text-gray-400";
  };
  interface DepositItem {
    crypto: string;
    amount: string;
    status: string;
    time: {
      date: Date;
    };
  }
  const DepositData: DepositItem[] = [];
  // Get current selected asset data
  const currentAsset = availableAssets.find((a) => a.symbol === selectedAsset);
  const hasZeroBalance = currentAsset?.balance === 0;

  const handleMaxAmount = () => {
    if (hasZeroBalance) {
      setSubscriptionAmount("0");
      return;
    }

    const maxBalance = currentAsset?.balance || 0;
    setSubscriptionAmount(maxBalance.toString());
  };

  const canSubscribe = () => {
    if (isSubscribing) return false;
    if (!subscriptionAmount) return false;
    if (hasZeroBalance) return false;

    const amount = parseFloat(subscriptionAmount);
    return !isNaN(amount) && amount > 0;
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;

    // If selected asset has 0 balance, always set to 0
    if (hasZeroBalance) {
      setSubscriptionAmount("0");
      return;
    }
    if (value > (currentAsset?.balance || 0)) {
      setSubscriptionAmount((currentAsset?.balance || 0).toString());
      return;
    }
    // Normal validation for assets with balance > 0
    if (value === "" || (!isNaN(value) && parseFloat(value) >= 0)) {
      setSubscriptionAmount(value);
    }
  };

  return (
    <main className="bg-gray-900 lg:bg-gray-950 min-h-screen overflow-x-hidden">
      <section id="hero" className="flex flex-col lg:items-center">
        <article
          id="hero1"
          className="flex flex-col gap-4 lg:gap-y-8 lg:max-w-6xl w-full"
        >
          <div className="w-full">
            <div className="text-gray-300 p-6 md:p-5 space-y-10">
              <div className="grid grid-cols-3 gap-5">
                <div className="col-span-3 lg:col-span-1">
                  <h2 className="text-2xl font-semibold mb-4 text-white">
                    Subscribe to {selectedAsset} Earn
                  </h2>
                  <p className="text-gray-400 mb-6">
                    Earn rewards by subscribing to our {selectedAsset} Earn
                    program. Choose your subscription amount and enjoy
                    competitive interest rates.
                  </p>

                  <div className="mb-4 py-4">
                    <span className="text-white">Subscription Combination</span>
                    <div className="grid grid-cols-3 mb-2 gap-4 mt-3">
                      {selectedAsset === "BTC-ETH" ? (
                        <>
                          <div className="flex items-center space-x-2 mt-2 border rounded border-gray-700 bg-gray-800 p-2">
                            <img src={BTC} alt="BTC" className="w-6 h-6 overflow-hidden rounded-full" />
                            <span className="text-gray-300">BTC</span>
                          </div>
                          <div className="flex items-center space-x-2 mt-2 border rounded border-gray-700 bg-gray-800 p-2">
                            <img src={ETH} alt="ETH" className="w-6 h-6 overflow-hidden rounded-full" />
                            <span className="text-gray-300">ETH</span>
                          </div>
                        </>
                      ) : (
                        <div className="flex items-center gap-3 border rounded border-gray-700 bg-gray-800 p-2">
                          <img
                            src={currentAsset?.coin}
                            alt={selectedAsset}
                            width={30}
                            height={30}
                            className="rounded-full"
                          />
                          <div className="flex flex-col">
                            <span className="font-semibold">
                              {selectedAsset}
                            </span>
                            <span className="text-xs text-gray-400">
                              {currentAsset?.name}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <fetcher.Form method="post">
                    <div className="mb-4">
                      <label className="block text-gray-300 mb-2 font-semibold">
                        Subscription Amount
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          value={subscriptionAmount}
                          onChange={handleAmountChange}
                          name="amount"
                          min="0"
                          step="0.01"
                          placeholder="0.00"
                          disabled={hasZeroBalance}
                          className={`w-full bg-gray-800 border rounded-lg py-3 px-4 text-white text-lg font-semibold focus:outline-none ${
                            hasZeroBalance
                              ? "opacity-50 cursor-not-allowed border-gray-600"
                              : "focus:border-gray-900 border-gray-700"
                          }`}
                        />
                        <div className="absolute right-10 top-1/2 transform -translate-y-1/2">
                          <span
                            className={`font-semibold ${
                              hasZeroBalance ? "text-gray-500" : "text-gray-400"
                            }`}
                          >
                            {selectedAsset}
                          </span>
                        </div>
                      </div>

                      <div className="flex justify-between text-sm mt-2">
                        <span
                          className={`${
                            hasZeroBalance ? "text-gray-500" : "text-gray-400"
                          }`}
                        >
                          Available: {currentAsset?.balance} {selectedAsset}
                        </span>
                        <button
                          onClick={handleMaxAmount}
                          disabled={hasZeroBalance}
                          className={`${
                            hasZeroBalance
                              ? "text-gray-500 cursor-not-allowed"
                              : "text-gray-400 hover:text-amber-300"
                          }`}
                        >
                          MAX
                        </button>
                      </div>

                      {/* Warning message for zero balance assets */}
                      {hasZeroBalance && (
                        <div className="text-red-400 text-sm mt-2 flex items-center">
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Insufficient balance. Please select another asset.
                        </div>
                      )}
                      <div className="flex items-center space-x-4 mt-2">
                        <input
                          type="checkbox"
                          id="autoSubscribe"
                          checked={useAutoSubscribe}
                          onChange={() =>
                            setUseAutoSubscribe(!useAutoSubscribe)
                          }
                          className="w-4 h-4 text-amber-300 bg-gray-800 border-gray-600 rounded focus:ring-amber-300"
                        />
                        <label
                          htmlFor="autoSubscribe"
                          className="text-gray-300 text-sm"
                        >
                          I have read and agree to the Terms and Conditions
                        </label>
                      </div>
                    </div>
                    {fetcher.data && (
                      <div
                        className={`mt-4 p-3 rounded ${
                          fetcher.data.success
                            ? "bg-green-900 text-green-300"
                            : "bg-red-900 text-red-300"
                        }`}
                      >
                        {fetcher.data.success
                          ? fetcher.data.message
                          : fetcher.data.error}
                      </div>
                    )}
                    <div className="mt-6 flex items-center">
                      <button
                        // onClick={handleSubscribe}
                        name="intent"
                        value="subscribe"
                        type="submit"
                        disabled={!canSubscribe()}
                        className={`w-full py-3 px-4 rounded-lg font-semibold transition duration-200 ${
                          !canSubscribe()
                            ? "bg-amber-300 text-gray-950 cursor-not-allowed opacity-50"
                            : "bg-amber-300 hover:bg-amber-300 text-gray-950"
                        }`}
                      >
                        {isSubscribing ? (
                          <div className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-950 mr-2"></div>
                            Processing...
                          </div>
                        ) : hasZeroBalance ? (
                          "Insufficient Balance"
                        ) : !subscriptionAmount ||
                          parseFloat(subscriptionAmount) <= 0 ? (
                          "Enter Amount"
                        ) : (
                          "Confirm Subscription"
                        )}
                      </button>
                    </div>
                  </fetcher.Form>
                </div>

                <div className="col-span-3 lg:col-span-2 mt-10 lg:mt-0">
                  <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-4 text-white">
                      Subscription Summary
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Asset:</span>
                        <span className="text-white">{selectedAsset}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">
                          Subscription Amount:
                        </span>
                        <span className="text-white">
                          {subscriptionAmount
                            ? `${subscriptionAmount} ${selectedAsset}`
                            : "-"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Estimated APR:</span>
                        <span className=" text-green-300">8% ~ 12%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">
                          Estimated Earnings:
                        </span>
                        <span className="text-white">
                          {subscriptionAmount
                            ? `${(parseFloat(subscriptionAmount) * 0.08).toFixed(2)} ~ ${(parseFloat(subscriptionAmount) * 0.12).toFixed(2)} ${selectedAsset}`
                            : "-"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">
                          Investment Amount:
                        </span>
                        <span className="text-white">
                          3500-999999999 {selectedAsset}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Handling Fee:</span>
                        <span className="text-white">0 {selectedAsset}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Operating Time:</span>
                        <span className="text-white">30 Days</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Start Date:</span>
                        <span className="text-white">2025-11-1</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">End Date:</span>
                        <span className="text-white">2025-12-1</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Redemption Date:</span>
                        <span className="flex items-center">2025-12-10</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-6 text-white">
                <h3 className="text-xl font-semibold">
                  Advanced Earn Portfolio
                </h3>
                <div className="">
                  <div className="grid grid-cols-6 gap-4 bg-gray-900 p-4 text-gray-400 font-semibold text-sm">
                    <div className="">Subscription Amount</div>
                    <div className="text-center">Crypto Revenue</div>
                    <div className="text-center">Start Time</div>
                    <div className="text-center">End Time</div>
                    <div className="text-center">Status</div>
                    <div className="text-center">Operation</div>
                  </div>
                  {loading && (
                    <div className="flex flex-col items-center justify-center my-4 h-52">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
                      <span className="mt-3 text-gray-400">
                        Loading content...
                      </span>
                    </div>
                  )}
                  {!loading && (
                    <>
                      {DepositData.length > 5 ? (
                        <>
                          {DepositData.map((r) => (
                            <div
                              key={r.crypto}
                              className="grid grid-cols-6 border p-2 border-gray-700 py-2 rounded-2xl gap-2 mt-3 text-center items-center"
                            >
                              <div className="">
                                {r.time.date.toLocaleDateString()}{" "}
                                {r.time.date.toLocaleTimeString()}
                              </div>
                              <div className="text-center">{r.crypto}</div>
                              <div className="text-center">{r.amount}</div>
                              <div className="text-center">-</div>
                              <div
                                className={`text-center ${getStatusColor(r.status)}`}
                              >
                                {r.status}
                              </div>
                              <div className="text-right">
                                <button className="bg-amber-300 rounded p-2 text-gray-900 text-sm cursor-pointer">
                                  Order Details
                                </button>
                              </div>
                            </div>
                          ))}
                        </>
                      ) : (
                        <div className="flex flex-col items-center justify-center my-8 h-52">
                          <svg
                            width="94"
                            height="70"
                            viewBox="0 0 94 70"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="svg-class"
                          >
                            <path
                              d="M10.4531 10.9219H66.021V44.3999C66.021 53.3608 66.021 57.8412 64.2771 61.2638C62.7432 64.2744 60.2955 66.7221 57.2849 68.2561C53.8623 70 49.3819 70 40.421 70H16.8531C14.6129 70 13.4928 70 12.6372 69.564C11.8845 69.1805 11.2726 68.5686 10.8891 67.8159C10.4531 66.9603 10.4531 65.8402 10.4531 63.6V10.9219Z"
                              fill="white"
                              fillOpacity="0.04"
                            ></path>
                            <path
                              d="M10.922 69.9994C4.88993 69.9994 0 65.1094 0 59.0774H47.0402C47.0402 69.9994 57.4936 69.9994 57.4936 69.9994H10.922Z"
                              fill="url(#paint0_linear_17615_36895)"
                            ></path>
                            <path
                              d="M21.3751 -4.86374e-05C15.3431 -4.86374e-05 10.4531 4.88989 10.4531 10.9219H66.0211C66.0211 -4.86374e-05 76.4745 -4.86374e-05 76.4745 -4.86374e-05H21.3751Z"
                              fill="url(#paint1_linear_17615_36895)"
                            ></path>
                            <rect
                              x="18.8242"
                              y="18.6667"
                              width="25.2954"
                              height="3.5"
                              rx="1.75"
                              fill="white"
                              fillOpacity="0.06"
                            ></rect>
                            <rect
                              x="18.8242"
                              y="30.9166"
                              width="17.6479"
                              height="3.50001"
                              rx="1.75001"
                              fill="white"
                              fillOpacity="0.06"
                            ></rect>
                            <rect
                              x="18.8242"
                              y="43.1665"
                              width="23.5306"
                              height="3.50001"
                              rx="1.75001"
                              fill="white"
                              fillOpacity="0.06"
                            ></rect>
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M84.7764 40.6118C84.7764 48.657 78.2813 55.1788 70.2691 55.1788C62.2569 55.1788 55.7617 48.657 55.7617 40.6118C55.7617 32.5667 62.2569 26.0449 70.2691 26.0449C78.2813 26.0449 84.7764 32.5667 84.7764 40.6118ZM79.5444 40.8507C79.5444 46.1262 75.2852 50.4028 70.0313 50.4028C64.7774 50.4028 60.5183 46.1262 60.5183 40.8507C60.5183 35.5752 64.7774 31.2986 70.0313 31.2986C75.2852 31.2986 79.5444 35.5752 79.5444 40.8507Z"
                              fill="#FCD535"
                            ></path>
                            <path
                              d="M70.0306 50.4028C75.2845 50.4028 79.5436 46.1262 79.5436 40.8507C79.5436 35.5752 75.2845 31.2986 70.0306 31.2986C64.7767 31.2986 60.5176 35.5752 60.5176 40.8507C60.5176 46.1262 64.7767 50.4028 70.0306 50.4028Z"
                              fill="#FCD535"
                              fillOpacity="0.1"
                            ></path>
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M84.4642 55.6269L80.3984 51.4324L81.544 50.3283L85.6098 54.5229L84.4642 55.6269Z"
                              fill="#FCD535"
                            ></path>
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M88.0506 54.7156C87.6005 54.2637 87.0105 54.0377 86.4205 54.0377C85.8305 54.0377 85.2406 54.2637 84.7904 54.7156C84.3403 55.1676 84.1152 55.76 84.1152 56.3524C84.1152 56.9448 84.3403 57.5372 84.7904 57.9892L90.0632 63.2836C90.5133 63.7356 91.1033 63.9616 91.6933 63.9616C92.2832 63.9616 92.8732 63.7356 93.3233 63.2836C93.7735 62.8316 93.9985 62.2392 93.9985 61.6468C93.9985 61.0544 93.7735 60.462 93.3233 60.01L88.0506 54.7156Z"
                              fill="#FCD535"
                            ></path>
                            <defs>
                              <linearGradient
                                id="paint0_linear_17615_36895"
                                x1="32.2204"
                                y1="59.0774"
                                x2="32.2204"
                                y2="69.9994"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop
                                  stopColor="white"
                                  stopOpacity="0.08"
                                ></stop>
                                <stop
                                  offset="1"
                                  stopColor="white"
                                  stopOpacity="0.04"
                                ></stop>
                              </linearGradient>
                              <linearGradient
                                id="paint1_linear_17615_36895"
                                x1="47.4526"
                                y1="10.9219"
                                x2="47.4526"
                                y2="-4.86374e-05"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop
                                  stopColor="white"
                                  stopOpacity="0.04"
                                ></stop>
                                <stop
                                  offset="1"
                                  stopColor="white"
                                  stopOpacity="0.08"
                                ></stop>
                              </linearGradient>
                            </defs>
                          </svg>
                          <span className="mt-3 text-gray-400">
                            No data available
                          </span>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
              <div className="space-y-6 text-white">
                <h3 className="text-xl font-semibold">How to Operate ?</h3>
                <p className="text-gray-400 text-sm">
                  Access a series of exchanges, such as Coinbase, Huobi,
                  Binance, KuCoin, YFX and other globally renowned exchanges,
                  and use algorithms to judge the trends of various currencies,
                  monitor the current market situation in real time. Buy and
                  sell related currencies at high frequency within the price
                  range to achieve arbitrage and ensure that your profits are
                  maximized.
                </p>
              </div>
            </div>
          </div>
        </article>
      </section>
      <FooterSection />
    </main>
  );
}
