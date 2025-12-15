import FooterSection from "~/components/footer";
import { useEffect, useMemo, useState } from "react";

import { redirect, useFetcher, useLocation, useNavigation } from "react-router";
import type { Route } from "./+types/[type]";
import { BCH, BTC, BTCETH, Coins, ETH, LTC, XRP } from "~/utils";
import { PairImage } from "~/components/coinPair";
import type { EarnProductsType } from "~/utils/types";
import { useAuthStore } from "~/store/useUserDataStore";
import { calculateUserBalances } from "~/utils/helpers";
import { user } from "~/consts";
import moment from "moment";
import { formatPrice } from "~/components/charts/util";
import { NoData } from "~/components/loading/noData";
import { subscribeEarnProductAPI } from "~/api/earnAPI";
import { Spinner } from "~/components/ui/spinner";
interface LoaderDataParams {
  type: string | null;
}
export async function clientLoader({
  params,
}: {
  params: { type?: string };
}): Promise<LoaderDataParams> {
  const isLoggedIn = useAuthStore.getState().isLoggedIn;
  if (!isLoggedIn) {
    throw redirect("/");
  }
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
    const url = new URL(request.url);
    const id = url.searchParams.get("product_id");
    // const asset = formData.get("asset");
    const accessToken = useAuthStore.getState().accessToken;
    if (intent === "subscribe") {
      const response = await subscribeEarnProductAPI({
        Amount:Number(amount),
        EarnId:Number(id)
      } , accessToken)
      if (response){
        return {
          success: true,
          message: "Subscription successful!",
          data: { amount, id },
        };
      }
      return {
        success:false,
        message: "Subscription failed",
      }
   
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
  const coin = loaderData?.type;
  const [loading, setLoading] = useState(false);
  const { wallet } = useAuthStore();
  const [availableAmount, setAvailableAmount] = useState("");
  const location = useLocation();
  const product: EarnProductsType = location.state?.product;
  const [subscriptionAmount, setSubscriptionAmount] = useState("");
  const [useAutoSubscribe, setUseAutoSubscribe] = useState(true);
  const fetcher = useFetcher();
  let isSubmitting = fetcher.state === "submitting";

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
  useEffect(() => {
    if (coin) {
      const fin = wallet?.filter((e) => e.WalletType === "financial");
      for (let index = 0; index < fin?.length; index++) {
        const element = fin[index];
        const data = element?.UserAsset?.find(
          (e) => e?.Currency?.toUpperCase() === coin.toUpperCase()
        );
        setAvailableAmount(data?.AvailableBalance || "0");
      }
    }
  }, [coin]);

  let hasZeroBalance = useMemo(
    () => Number(availableAmount) === 0,
    [availableAmount]
  );

  const handleMaxAmount = () => {
    setSubscriptionAmount(availableAmount);
  };
  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (hasZeroBalance) {
      setSubscriptionAmount("0");
      return;
    }
    if (value > (availableAmount || 0)) {
      setSubscriptionAmount((availableAmount || 0).toString());
      return;
    }
    if (value === "" || (!isNaN(value) && parseFloat(value) >= 0)) {
      setSubscriptionAmount(value);
    }
  };
  if (!product || !coin){
    throw redirect("finance/earn");
  }
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
                    Subscribe to {product?.FromCoin} Earn
                  </h2>
                  <p className="text-gray-400 mb-6">
                    Earn rewards by subscribing to our {product?.FromCoin} Earn
                    program. Choose your subscription amount and enjoy
                    competitive interest rates.
                  </p>

                  <div className="my-4">
                    <span className="text-white">Subscription Product</span>
                    <div className="flex gap-2 items-center my-4">
                      {product?.IsFlexible ? (
                        <img
                          src={Coins[product?.FromCoin.toUpperCase()]}
                          alt={product?.FromCoin}
                          width={30}
                          height={30}
                          className="rounded-full"
                        />
                      ) : (
                        <PairImage
                          first={product.FromCoin}
                          second={product.ToCoin}
                          width={30}
                        />
                      )}

                      <span className="font-semibold">{product?.FromCoin}</span>
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
                          min={product?.MinAmount}
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
                            {coin}
                          </span>
                        </div>
                      </div>

                      <div className="flex justify-between text-sm mt-2">
                        <span
                          className={`${
                            hasZeroBalance ? "text-gray-500" : "text-gray-400"
                          }`}
                        >
                          Available: {availableAmount} {coin}
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
                        // onClick={subscribeHandler}
                        name="intent"
                        value="subscribe"
                        type="submit"
                        disabled={
                          hasZeroBalance || isSubmitting || !subscriptionAmount
                        }
                        className={`w-full py-3 px-4 rounded-lg font-semibold transition disabled:opacity-50 duration-200 cursor-pointer ${
                          hasZeroBalance
                            ? "bg-amber-300 text-gray-950 cursor-not-allowed opacity-50"
                            : "bg-amber-300 hover:bg-amber-300 text-gray-950"
                        }`}
                      >
                        {isSubmitting ? (
                          <div className="flex items-center justify-center">
                            <Spinner color={"#111"} />
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
                        <span className="text-white">{product?.FromCoin}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">
                          Subscription Amount:
                        </span>
                        <span className="text-white">
                          {subscriptionAmount
                            ? `${subscriptionAmount} ${coin}`
                            : "-"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Estimated APR:</span>
                        <span className=" text-green-300">
                          {product?.MinApr}% ~ {product?.MaxApr}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">
                          Estimated Earnings:
                        </span>
                        <span className="text-white">
                          {subscriptionAmount
                            ? `$ ${(parseFloat(subscriptionAmount) * 0.08).toFixed(2)} ~ ${(parseFloat(subscriptionAmount) * 0.12).toFixed(2)}`
                            : "-"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">
                          Investment Amount:
                        </span>
                        <span className="text-white">
                          $ {formatPrice(Number(product?.MinAmount))}-
                          {formatPrice(Number(product?.MaxAmount))}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Transaction Fee:</span>
                        <span className="text-white">0.001% of ROI</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Operating Time:</span>
                        <span className="text-white">
                          {product?.IsFlexible
                            ? "Anytime"
                            : product?.DurationDays + " Days"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Start Date:</span>
                        <span className="text-white">
                          {new Date().toISOString().split("T", 1)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">End Date:</span>
                        <span className="text-white">
                          {moment()
                            .set("days", product?.DurationDays)
                            .toISOString()
                            .split("T", 1)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Redemption Date:</span>
                        <span className="flex items-center">
                          {moment()
                            .set("days", product?.DurationDays)
                            .toISOString()
                            .split("T", 1)}
                        </span>
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
                          <NoData />
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
