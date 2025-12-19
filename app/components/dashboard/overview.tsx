import React, { use, useEffect, useOptimistic, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { BTC, Coins, USER } from "~/utils";
import { TradeButton } from "../charts/components/buttons";
import { useNavigate, useSearchParams } from "react-router";
import HomeMiniChart from "../miniCharts/homeMiniChart";
import AiMiniChart from "../miniCharts/aiMiniChart";

import { formatTotalPrice } from "~/utils/helpers";
import { formatPrice } from "../charts/util";
import type {
  AssetBalance,
  EarnProductsType,
  WalletBalance,
} from "~/utils/types";
import { useWalletStore } from "~/store/useUserWalletStore";
import {
  useCombinedWalletAssets,
  useTotalUSDT,
  useUser,
  useWallet,
} from "~/utils/walletSelectors";
import { AllCoinNames } from "~/consts/pairs";
import { NoData } from "../loading/noData";
import { RiCopperCoinFill, RiExchange2Fill } from "react-icons/ri";
import { MdSavings } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { getEarnProductAPI } from "~/api/earnAPI";
import { PairImage } from "../coinPair";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import { Card, CardContent } from "../ui/card";
import { overViewCards } from "~/consts/miniLists";
// import CustomActiveShapePieChart from "./piChart";
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
  const [isEarn, setIsEarn] = useState(true);
  const [earnProducts, setEarnProducts] = useState<null | EarnProductsType[]>(
    null
  );
 const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const user = useUser();
  const totalUSDT = useTotalUSDT();
  const assetList = useCombinedWalletAssets();
  const { wallets } = useWalletStore();
  let limit = 5;
  const [page, setPage] = useState(1);
  const [total ,setTotal] = useState(0)
  const toogleEarn = (e: boolean) =>{ setPage(1); setIsEarn(e)};
  useEffect(() => {
    const fetchEarnProducts = async () => {
      const response = await getEarnProductAPI();
      if (response) {
        console.log(response);
        setEarnProducts(response.data);
        setTotal(response.total)
      }
    };
    fetchEarnProducts();
  }, []);

const totalPages = Math.ceil(total / limit);
const paginatedEarnProducts = earnProducts?.slice(
  (page - 1) * limit,
  page * limit
);
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
            label="History"
            style="bg-gray-800 hover:bg-gray-950 lg:hover:bg-gray-900 h-10 w-full md:w-40 lg:w-auto px-0 lg:px-4"
            textStyle="text-gray-100 font-semibold"
            action={() => navigate("/trade/btcusdt?type=spot")}
          />
        </div>
      </div>
      <div className=" my-4 flex flex-col lg:flex-row items-center w-full">
        <div className="flex-1 h-full">
          {/* <CustomActiveShapePieChart isAnimationActive={true} /> */}
        </div>
        <div className="flex-1 flex flex-col p-4 w-full  border-0  lg:border lg:border-gray-700 lg:rounded-lg">
          <h1>Wallet Overview</h1>
          <div className="flex justify-between my-4">
            <p className="text-xs font-semibold text-gray-600 flex-1">Wallet</p>
            <p className="text-xs font-semibold text-gray-600 text-right flex-1">
              Ratio
            </p>
            <p className="text-xs font-semibold text-gray-600 text-right flex-1">
              Amount
            </p>
          </div>
          {Object.values(wallets).map((e) => (
            <div
              className="flex justify-between items-center my-4 cursor-pointer"
              key={e.walletType}
              onClick={() =>
                setSearchParams("type=" + e.walletType.toLowerCase())
              }
            >
              <div className="flex gap-2 items-center flex-1">
                {e.walletType === "SPOT" && (
                  <RiExchange2Fill size={20} color="#fff" />
                )}
                {e.walletType === "FUNDING" && (
                  <RiCopperCoinFill size={20} color="#fff" />
                )}
                {e.walletType === "FINANCIAL" && (
                  <MdSavings size={20} color="#fff" />
                )}
                <p className="text-gray-50 font-bold capitalize text-lg">
                  {e.walletType.toLowerCase()}
                </p>
              </div>
              <p className="text-right text-sm font-semibold text-green-400 flex-1">
                {((e.totalUSDT / totalUSDT) * 100).toFixed(2)} %
              </p>
              <div className="text-right flex-1">
                <p className="text-gray-50 text-sm">
                  {formatPrice(e.totalUSDT)}
                </p>
                <p className="text-gray-600 text-sm">
                  ${formatPrice(e.totalUSDT * 0.999)}
                </p>
              </div>
            </div>
          ))}
        </div>
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
          assetList?.map((e) => {
            let pair =
              e.currency === "USDT"
                ? "btcusdt"
                : e.currency.toLowerCase() + "usdt";
            return (
              <div
                key={e.currency}
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
                    <p className="text-sm lg:text-lg text-gray-100 font-semibold">
                      {e.total.toFixed(4) + " " + e.currency}
                    </p>
                    <p className="text-xs font-medium text-gray-600">
                      ${e.totalUSDT}
                    </p>
                  </div>
                </div>
                <div className="hidden md:flex flex-1">
                  <div className=" text-right flex flex-1 justify-end flex-col">
                    <p className="text-sm lg:text-lg text-gray-100 font-semibold">
                      {e.available.toFixed(4) + " " + e.currency}
                    </p>
                    <p className="text-xs font-medium text-gray-600">
                      ${e.availableUSDT}
                    </p>
                  </div>
                  <div className=" text-right flex flex-1 justify-end flex-col">
                    <p className="text-sm lg:text-lg text-gray-100 font-semibold">
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
            );
          })
        ) : (
          <NoData />
        )}
      </aside>
      <Carousel
        className="w-full mt-4 relative"
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent className="">
          {overViewCards.map((e) => (
            <CarouselItem
              key={e.id}
              className="lg:basis-1/2 cursor-pointer"
              onClick={() =>
                e.url === "convert"
                  ? navigate("/trade/convert/usdt/btc?type=spot")
                  : navigate(`/trade/btcusdt?type=${e.url}`)
              }
            >
              <div className="">
                <Card className="bg-gray-900 lg:bg-gray-950 border  border-gray-700">
                  <CardContent className="flex h-30 items-center justify-between gap-10">
                    <div className="flex flex-col gap-4">
                      <h1 className="text-gray-50 font-bold text-lg">
                        {e.title}
                      </h1>
                      <p className="text-gray-700 text-md font-medium">
                        {e.description}
                      </p>
                    </div>
                    {e.image}
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute cursor-pointer -left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 border-gray-700 hover:bg-gray-700 text-white hover:text-amber-300" />
        <CarouselNext className="absolute cursor-pointer -right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 border-gray-700 hover:bg-gray-700 text-white hover:text-amber-300" />
      </Carousel>
      <aside className="border-0 lg:border lg:border-gray-700 p-4 lg:rounded-lg w-full my-4 ">
        <div className="flex w-full justify-between items-center">
          <p className="text-lg font-bold text-gray-50">Discover</p>
          <p className="flex gap-2 items-center text-xs text-gray-400">
            More <IoIosArrowForward color="#777" size={12} />
          </p>
        </div>
        <div className="flex gap-4 items-center my-4">
          <p
            onClick={() => toogleEarn(true)}
            className={` pb-2 font-semibold text-md border-b-0 border-amber-300 cursor-pointer ${isEarn ? "border-b-2 text-gray-200" : "text-gray-600 border-b-0"}`}
          >
            Earn
          </p>
          <p
            onClick={() => toogleEarn(false)}
            className={` pb-2 font-semibold text-md border-b-0 border-amber-300 cursor-pointer  ${isEarn ? "border-b-0 text-gray-600" : "border-b-2 text-gray-200"}`}
          >
            Copy Trading
          </p>
        </div>
        {isEarn ? (
          <>
            <p className="text-xs lg:text-sm font-normal text-gray-600">
              Simple & Secure. Search popular coins and start earning.
            </p>
            <div className="hidden lg:flex">
              <div className="flex flex-1 justify-between">
                <p className="text-xs text-gray-500">Coins</p>
                <p className="text-xs text-gray-500">Est.APR</p>
              </div>
              <div className="flex flex-1 justify-between">
                <p className="text-xs text-gray-500 flex-1 text-right">
                  Duration
                </p>
                <p className="text-xs text-gray-500 flex-1 text-right">
                  Action
                </p>
              </div>
            </div>
            {paginatedEarnProducts?.map((e) => {
              return (
                <div
                  className="flex justify-between items-center py-6 border-b border-gray-800 lg:border-b-0"
                  key={e.Id}
                >
                  <div className="hidden lg:flex flex-1 justify-between">
                    <div className="text-xs text-gray-500 flex-1">
                      <div className="flex gap-2 items-center">
                        {e.IsFlexible ? (
                          <img
                            src={Coins[e.FromCoin]}
                            className="rounded-full"
                            width={30}
                          />
                        ) : (
                          <PairImage
                            first={e.FromCoin}
                            second={e.ToCoin}
                            width={30}
                          />
                        )}

                        <p className="text-gray-50 lg:text-lg font-bold text-md">
                          {e.IsFlexible
                            ? e.FromCoin
                            : e.FromCoin + "-" + e.ToCoin}
                        </p>
                      </div>
                    </div>
                    <p className="text-md text-green-400 flex-1 text-right">
                      {e.MinApr}% - {e.MaxApr}%
                    </p>
                  </div>
                  <div className="hidden lg:flex flex-1 justify-between">
                    <p className="text-md text-gray-300 flex-1 text-right">
                      {e.IsFlexible ? "Flexible" : e.DurationDays + " Days"}
                    </p>
                    <p
                      className="text-sm cursor-pointer text-amber-300 flex-1 text-right"
                      onClick={() => navigate("/finance/earn")}
                    >
                      Subscribe
                    </p>
                  </div>
                  <div className="lg:hidden flex-col gap-3 lg:flex-1 flex">
                    <div className="flex gap-2 items-center justify-center">
                      {e.IsFlexible ? (
                        <img
                          src={Coins[e.FromCoin]}
                          className="rounded-full"
                          width={30}
                        />
                      ) : (
                        <PairImage
                          first={e.FromCoin}
                          second={e.ToCoin}
                          width={30}
                        />
                      )}

                      <p className="text-gray-50 font-bold text-md">
                        {e.IsFlexible
                          ? e.FromCoin
                          : e.FromCoin + "-" + e.ToCoin}
                      </p>
                    </div>
                    <p className="text-gray-600 font-medium text-sm">Est.APR</p>
                    <p className="text-gray-600 font-medium text-sm">
                      Duration
                    </p>
                  </div>

                  <div className="flex flex-col gap-3 text-right lg:hidden">
                    <button
                      className="text-sm text-amber-300 font-medium cursor-pointer"
                      onClick={() => navigate("/finance/earn")}
                    >
                      Subscribe
                    </button>
                    <p className="text-green-400 text-sm font-medium">
                      {e.MinApr}% - {e.MaxApr}%
                    </p>
                    <p className="text-gray-100 text-sm font-medium">
                      {e.IsFlexible ? "Flexible" : e.DurationDays + " Days"}
                    </p>
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <></>
        )}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-6">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-3 py-1 text-sm rounded cursor-pointer text-gray-50 disabled:opacity-40"
            >
              Prev
            </button>

            <p className="text-xs text-gray-400">
              Page {page} of {totalPages}
            </p>

            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="px-3 py-1 cursor-pointer text-sm rounded text-gray-50 disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}
      </aside>
    </Container>
  );
}
