import FooterSection from "~/components/footer";
import FlexibleImage from "assets/images/simple-earn-v2.svg";
import LockedImage from "assets/images/bnb-staking-v2.svg";
import AdvancedImage from "assets/images/high-yield-2.svg";
import { Card, CardContent } from "~/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import { Funnel, Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";

import { useFetcher, useNavigate } from "react-router";
import React, { Activity, memo, useEffect, useMemo, useState } from "react";
import { formatTotalPrice } from "~/utils/helpers";
import { PairImage } from "~/components/coinPair";
import { Coins } from "~/utils";
import { getEarnProductAPI, subscribeEarnProductAPI } from "~/api/earnAPI";
// import { useAuthStore } from "~/store/useUserDataStore";
import type { EarnProductsType } from "~/utils/types";
import { Spinner } from "~/components/ui/spinner";
import type { Route } from "./+types";
import { useWalletStore } from "~/store/useUserWalletStore";
import { useWalletAssets } from "~/utils/walletSelectors";


export async function clientAction({
  params,
  request,
}: Route.ClientActionArgs) {
  try {
    const formData = await request.formData();
    const intent = formData.get("intent") as string;
    const amount = formData.get("amount") as string;
    const id = formData.get("product_id") as string;
    const coin = formData.get("coin") as string;
    const accessToken = useWalletStore.getState().accessToken
    // const accessToken = useAuthStore.getState().accessToken;
      const response = await subscribeEarnProductAPI({
        Amount:Number(amount),
        EarnId:Number(id),
        FromCoin:coin
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
  } catch (error) {
    console.error("Error in subscription:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Subscription failed",
    };
  }
}
export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const isLoggedIn = useWalletStore.getState().isLoggedIn;
  const response = await getEarnProductAPI();
  if (response) {
    return { products: response?.data || null, isLoggedIn };
  }
}
const SubcribeModal = 
  ({
    open,
    toggleOpen,
    product,
  }: {
    open: boolean;
    toggleOpen: () => void;
    product: EarnProductsType;
  }) => {
    const fetcher = useFetcher()
      const [loading, setLoading] = useState(false);
      const isLoggedIn = useWalletStore.getState().isLoggedIn;
      const financialWallet = useWalletAssets("FINANCIAL");
      const [availableAmount, setAvailableAmount] = useState(0);
      const [subscriptionAmount, setSubscriptionAmount] = useState("");
      const [isProductRules, setIsProductRules] = useState(false);
      const [useAutoSubscribe, setUseAutoSubscribe] = useState(true);

      let isSubmitting = fetcher.state === "submitting";
   const handleSubmit = (e: React.FormEvent) => {
     e.preventDefault();
     fetcher.submit(e.currentTarget as HTMLFormElement);
   };
    useEffect(() => {
    
        if (product && isLoggedIn) {
          financialWallet.forEach((e)=>{
            if (e.currency.toUpperCase() === product?.FromCoin.toUpperCase())return setAvailableAmount(e.available)
          })
        }
      }, [isLoggedIn, product]);
    
      let hasZeroBalance = useMemo(
        () => availableAmount === 0,
        [availableAmount]
      );
    
      const handleMaxAmount = () => {
        setSubscriptionAmount(availableAmount.toString());
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
    return (
      <React.Fragment>
        <Dialog
          open={open}
          onOpenChange={(e) => {
            setSubscriptionAmount("");

            toggleOpen();
          }}
        >
          <DialogTrigger></DialogTrigger>

          <DialogContent className="bg-gray-800 ring-0 border-0 p-5  md:p-8">
            <fetcher.Form method="post" onSubmit={handleSubmit}>
              <DialogHeader className="mb-4">
                <div className="flex gap-3 items-center">
                  <DialogTitle
                    onClick={() => setIsProductRules(false)}
                    className={`text-md font-medium text-gray-50 ${isProductRules ? "border-b-0" : " border-b-2 border-amber-400"}`}
                  >
                    Subcribe
                  </DialogTitle>

                  <DialogTitle
                    onClick={() => setIsProductRules(true)}
                    className={`text-md font-medium text-gray-50 ${!isProductRules ? "border-b-0" : " border-b-2 border-amber-400"}`}
                  >
                    Product Rules
                  </DialogTitle>
                </div>

                <DialogDescription></DialogDescription>
              </DialogHeader>
              {isProductRules ? (
                <div className="min-h-1/2 flex flex-col w-full">
                  <dl itemType="1">
                    <dt>Reward</dt>
                    <dd>
                      <p>
                        Rewards Your respective subscribed Locked Product APR is
                        subject to change on a daily basis. These rewards are
                        accrued the day after subscription, starting at 07:00
                        local time.
                      </p>
                      <p>
                        You will start receiving reward distributions in your
                        Spot Wallet the day after accrual starts (two days after
                        subscription) between 07:00 and 15:00 local time. Daily
                        Rewards = Deposited Assets * APR/365 (to certain decimal
                        places, depending on the cryptocurrency)
                      </p>
                    </dd>
                  </dl>
                </div>
              ) : (
                <div className="w-full space-y-4">
                  <div className="flex border border-gray-700 rounded-md p-4 justify-between items-center">
                    <div>
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
                            first={product?.FromCoin}
                            second={product?.ToCoin}
                            width={30}
                          />
                        )}

                        {product?.IsFlexible ? (
                          <span className="font-bold text-gray-50">
                            {product?.FromCoin}
                          </span>
                        ) : (
                          <span className="font-bold text-gray-50">
                            {product?.FromCoin} - {product?.ToCoin}
                          </span>
                        )}
                      </div>
                      <div className="text-left">
                        <p className="text-xs text-gray-400">APR</p>
                        <p className="font-semibold text-sm text-green-400">
                          {product?.MinApr} ~ {product?.MaxApr}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-4 items-end">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          product?.IsFlexible
                            ? "bg-blue-500/20 text-blue-400"
                            : "bg-amber-500/20 text-amber-400"
                        }`}
                      >
                        {product?.IsFlexible ? "Flexible" : "Locked"}
                      </span>
                      <p className="font-semibold text-sm text-gray-50">
                        {product?.IsFlexible
                          ? "Anytime"
                          : product?.DurationDays + " Days"}
                      </p>

                      <p className="text-md text-gray-50">
                        {formatTotalPrice(Number(product?.MinAmount))} -{" "}
                        {formatTotalPrice(Number(product?.MaxAmount))}
                      </p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-300 mb-2 font-semibold">
                      Amount
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
                          {product?.FromCoin}
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-between text-sm mt-2">
                      <span
                        className={`${
                          hasZeroBalance ? "text-gray-500" : "text-gray-400"
                        }`}
                      >
                        Available: {availableAmount} {product?.FromCoin}
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
                      <div className="text-red-400 text-xs mt-2 flex items-center">
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
                    <div className="w-full"></div>
                    {fetcher.data && (
                      <div
                        className={`mt-4 p-2 rounded text-xs ${
                          fetcher.data.success
                            ? "bg-green-900 text-green-300"
                            : "bg-red-900 text-red-300"
                        }`}
                      >
                        {fetcher.data.success
                          ? fetcher.data.message
                          : fetcher.data.message}
                      </div>
                    )}
                    <div className="flex items-center space-x-4 mt-2">
                      <input
                        type="checkbox"
                        id="autoSubscribe"
                        checked={useAutoSubscribe}
                        onChange={() => setUseAutoSubscribe(!useAutoSubscribe)}
                        className="w-4 h-4 text-amber-300 bg-gray-800 border-gray-600 rounded focus:ring-amber-300"
                      />
                      <label
                        htmlFor="autoSubscribe"
                        className="text-gray-300 text-xs"
                      >
                        I have read and agree to the Terms and Conditions
                      </label>
                    </div>
                  </div>
                </div>
              )}
              <DialogFooter>
                {isProductRules ? null : (
                  <div className="flex items-center w-full">
                    <input
                      type="hidden"
                      name="product_id"
                      value={product?.Id}
                    />
                    <input
                      type="hidden"
                      name="coin"
                      value={product?.FromCoin}
                    />
                    <button
                      name="intent"
                      value="subscribe"
                      type="submit"
                      disabled={
                        hasZeroBalance || isSubmitting || !subscriptionAmount ||!isLoggedIn
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
                )}
              </DialogFooter>
            </fetcher.Form>
          </DialogContent>
        </Dialog>
      </React.Fragment>
    );
  }



export default function EarnIndex({ loaderData }: Route.ComponentProps) {
  const { products, isLoggedIn } = loaderData;
  const [searchTerm, setSearchTerm] = useState("");
  const [durationFilter, setDurationFilter] = useState("all");
  const [filteredProducts, setFilteredProducts] = useState<EarnProductsType[]>([])
  const [modalState, setModalState] = useState<{
    open: boolean;
    product: EarnProductsType | null;
  }>({
    open: false,
    product: null,
  });


  useEffect(()=>{
  const filtered = products
    ? products?.filter((product) => {
        const matchesSearch =
          product.FromCoin.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.FromCoin.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesDuration =
          durationFilter === "all" ||
          (durationFilter === "flexible" && product.IsFlexible === true) ||
          (durationFilter === "locked" && product.IsFlexible === false);

        return matchesSearch && matchesDuration;
      })
    : [];
    setFilteredProducts(filtered)
  },[durationFilter, searchTerm])

  return (
    <main className="bg-gray-900 lg:bg-gray-950 min-h-screen overflow-x-hidden">

      <SubcribeModal
        open={modalState.open}
        product={modalState.product}
        toggleOpen={() =>
          setModalState((s) => ({ product: null, open: false }))
        }
      />
      <section id="hero" className="flex flex-col lg:items-center">
        <article
          id="hero1"
          className="flex flex-col gap-4 lg:gap-y-8 lg:max-w-6xl w-full"
        >
          <div className="w-full">
            <div className="text-gray-300 p-6 md:p-5 space-y-10">
              <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
                <div className="p-4 md:p-8">
                  <h1 className="text-2xl md:text-5xl font-bold text-white">
                    Advanced Earn
                  </h1>
                  <p className="text-sm md:text-lg mt-4 text-gray-200">
                    Benefit from our innovative products that are designed to
                    help navigate the various market scenarios.
                  </p>
                  <p className="text-xs font-light md:text-sm mt-2 text-gray-600">
                    *Advanced Earn products involve higher risks. See our
                    <span className="text-amber-400 mx-2"> FAQ </span>
                    for more information.
                  </p>
                </div>
                <div className="hidden lg:flex items-center justify-center">
                  <img
                    src={AdvancedImage}
                    alt="Advanced Earn"
                    className="w-full max-w-md h-auto"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <Carousel
                  opts={{
                    align: "start",
                    loop: true,
                  }}
                  className="w-full relative"
                >
                  <CarouselContent>
                    {products
                      ? products
                          ?.filter((e) => e.RiskLevel === "high")
                          .map((item) => (
                            <CarouselItem
                              key={item.Id}
                              className="md:basis-1/2 lg:basis-1/3"
                            >
                              <div className="p-1">
                                <Card
                                  className="bg-gray-800 border border-gray-700 hover:border-gray-600 cursor-pointer transition-all duration-200 w-full h-full"
                                  onClick={
                                    () =>
                                      setModalState({
                                        open: true,
                                        product: item,
                                      })
                                  }
                                >
                                  <CardContent className="p-4 flex flex-col justify-between h-32">
                                    <div className="text-sm text-white relative">
                                      <div className="absolute -top-10 items-end -right-4">
                                        <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-2xl">
                                          HOT
                                        </span>
                                      </div>
                                      <div className="grid grid-cols-2 gap-2 mb-3">
                                        <div className="flex flex-row gap-2 items-center">
                                          {item.IsFlexible ? (
                                            <img
                                              src={
                                                Coins[
                                                  item?.FromCoin?.toUpperCase()
                                                ]
                                              }
                                              alt={item?.FromCoin}
                                              width={32}
                                              height={32}
                                              className="rounded-full"
                                            />
                                          ) : (
                                            <PairImage
                                              first={item.FromCoin}
                                              second={item.ToCoin}
                                              width={40}
                                            />
                                          )}
                                          <div>
                                            <p className="font-semibold">
                                              {item.FromCoin}
                                            </p>
                                          </div>
                                        </div>
                                        <div className="text-right">
                                          <p className="text-xs text-gray-400">
                                            {item.IsFlexible
                                              ? "Flexible"
                                              : "Locked"}
                                          </p>
                                          <p className="font-semibold text-sm">
                                            {item.IsFlexible
                                              ? "Anytime"
                                              : item.DurationDays + " Days"}
                                          </p>
                                        </div>
                                      </div>
                                      <div className="grid grid-cols-2 gap-2">
                                        <div className="text-left">
                                          <p className="text-xs text-gray-400">
                                            APR
                                          </p>
                                          <p className="font-semibold text-sm text-green-400">
                                            {item.MinApr} ~ {item.MaxApr}
                                          </p>
                                        </div>
                                        <div className="text-right">
                                          <p className="text-xs text-gray-400">
                                            Minimum
                                          </p>
                                          <p className="font-semibold text-sm">
                                            {formatTotalPrice(Number(item.MinAmount))}
                                          </p>
                                          <p className="text-xs text-gray-400">
                                            Maximum
                                          </p>
                                          <p className="font-semibold text-sm">
                                            {formatTotalPrice(
                                              Number(item.MaxAmount)
                                            )}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>
                              </div>
                            </CarouselItem>
                          ))
                      : null}
                  </CarouselContent>
                  <CarouselPrevious className="absolute -left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 border-gray-700 hover:bg-gray-700 text-white" />
                  <CarouselNext className="absolute -right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 border-gray-700 hover:bg-gray-700 text-white" />
                </Carousel>
              </div>
              <div className="space-y-6 text-white">
                <div className="grid lg:grid-cols-2 gap-4 items-center">
                  <div className="flex justify-center">
                    <img
                      src={FlexibleImage}
                      alt="Flexible Earn"
                      className="w-40 lg:w-40 h-auto"
                    />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Flexible Earn</h2>
                    <p className="text-sm md:text-md text-gray-500">
                      Enjoy the freedom to deposit and withdraw your assets at
                      any time while earning competitive interest rates. Perfect
                      for those who value liquidity and flexibility in their
                      investment strategy.
                    </p>
                  </div>
                </div>
                <div className="grid lg:grid-cols-2 gap-4 items-center">
                  <div className="order-2 lg:order-1">
                    <h2 className="text-2xl font-bold mb-4">Locked Earn</h2>
                    <p className="text-sm md:text-md text-gray-500">
                      Maximize your returns by committing your assets for a
                      fixed period. Our Locked Earn products offer higher
                      interest rates in exchange for locking your funds, making
                      them ideal for investors looking for stable and
                      predictable income.
                    </p>
                  </div>
                  <div className="flex justify-center order-1 lg:order-2">
                    <img
                      src={LockedImage}
                      alt="Locked Earn"
                      className="w-40 lg:w-40 h-auto"
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-6 text-white">
                <div className="flex gap-2 lg:flex-row lg:gap-4 items-center justify-between w-full">
                  <div className="relative w-full lg:w-96 flex items-center">
                    <input
                      type="text"
                      placeholder="Search Coins"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full py-2 px-10 text-gray-300 bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent rounded-lg transition-all duration-200"
                    />
                    <Search
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                      size={18}
                    />
                  </div>
                  <div className="w-auto">
                    <Select
                      value={durationFilter}
                      onValueChange={setDurationFilter}
                    >
                      <SelectTrigger className="w-full h-12 lg:w-48 m-0 bg-gray-800 border border-gray-700 rounded-lg px-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent hover:bg-gray-700">
                        <SelectValue placeholder="Select Range" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border border-gray-700 text-white">
                        <SelectItem
                          value="all"
                          className="hover:bg-gray-700 rounded cursor-pointer"
                        >
                          All Durations
                        </SelectItem>
                        <SelectItem
                          value="flexible"
                          className="hover:bg-gray-700 rounded cursor-pointer"
                        >
                          Flexible
                        </SelectItem>
                        <SelectItem
                          value="locked"
                          className="hover:bg-gray-700 rounded cursor-pointer"
                        >
                          Locked
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <h2 className="text-xl font-bold mb-4">
                    Explore Our Advanced Earn Products
                  </h2>

                  {/* Results Count */}
                  <div className="text-sm text-gray-400">
                    Showing {filteredProducts?.length} of {products?.length}{" "}
                    products
                  </div>

                  <div className="hidden lg:grid grid-cols-5 text-sm font-semibold py-4 px-6 rounded-lg text-gray-400">
                    <div>Coin</div>
                    <div className="text-center">APR</div>
                    <div className="text-center">Duration</div>
                    <div className="text-center">Type</div>
                    <div className="text-center">Action</div>
                  </div>

                  {filteredProducts?.length === 0 ? (
                    <div className="text-center py-8 text-gray-400">
                      No products found matching your filters.
                    </div>
                  ) : (
                    filteredProducts?.map((item) => (
                      <div
                        key={item.Id}
                        className="grid grid-cols-2 lg:grid-cols-5 p-4 lg:p-6 rounded-xl gap-4"
                      >
                        <div className="flex items-center gap-3">
                          {item.IsFlexible ? (
                            <img
                              src={Coins[item.FromCoin.toUpperCase()]}
                              alt={item.FromCoin}
                              width={30}
                              height={30}
                              className="rounded-full"
                            />
                          ) : (
                            <PairImage
                              first={item.FromCoin}
                              second={item.ToCoin}
                              width={30}
                            />
                          )}
                          <div className="flex flex-col">
                            <span className="font-semibold">
                              {item.FromCoin}
                            </span>
                            <span className="text-xs text-gray-400">
                              {item.IsFlexible ? "Flexible" : "Locked"}
                            </span>
                          </div>
                        </div>
                        <div className="text-right lg:text-center text-green-400 font-semibold">
                          {item.MinApr} ~ {item.MaxApr}
                        </div>
                        <div className="hidden lg:block text-center text-gray-300">
                          {item.IsFlexible ? "Anytime" : item.DurationDays}
                        </div>
                        <div className="hidden lg:block text-center">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              item.IsFlexible
                                ? "bg-blue-500/20 text-blue-400"
                                : "bg-amber-500/20 text-amber-400"
                            }`}
                          >
                            {item.IsFlexible ? "Flexible" : "Locked"}
                          </span>
                        </div>
                        <div className="col-span-2 lg:col-span-1 flex justify-end lg:justify-center">
                          <button
                            
                            className="w-full lg:w-auto bg-amber-300 hover:bg-amber-300 text-gray-900 font-medium py-2 px-6 rounded-lg transition-colors cursor-pointer"
                            onClick={
                              () =>
                                setModalState({
                                  open: true,
                                  product: item,
                                })
                              // navigate(
                              //   `${item.FromCoin}?product_id=${item.Id}`,
                              //   {
                              //     state: { product: item },
                              //   }
                              // )
                            }
                          >
                            Subscribe
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
              <div className="space-y-6 text-white">
                <div>
                  <h2 className="text-2xl font-bold mb-6">
                    Why Choose Advanced Earn?
                  </h2>
                  <ul className="grid md:grid-cols-2 gap-4 text-gray-300">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>
                        Competitive Interest Rates: Benefit from some of the
                        best rates in the market.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>
                        Flexible Options: Choose between flexible and locked
                        products to suit your investment style.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>
                        User-Friendly Platform: Easy to navigate and manage your
                        investments.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>
                        Secure and Reliable: Your assets are protected with
                        industry-leading security measures.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </article>
      </section>
      <FooterSection />
    </main>
  );
}
