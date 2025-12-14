
import type { Route } from "./+types/home";

import { useTranslation } from "react-i18next";
import { CiGift } from "react-icons/ci";
import { Form, useNavigate } from "react-router";
import AiMiniChart from "~/components/miniCharts/aiMiniChart";
import HomeMiniChart from "~/components/miniCharts/homeMiniChart";
import SlotCounter from "react-slot-counter";
import { reSectionList } from "~/consts/reSectionList";
import Certifications from "~/components/homeComponents/certifications";
import NewsScreen from "~/components/homeComponents/miniNews";
import DownloadSections from "~/components/homeComponents/download";
import FAQ from "~/components/homeComponents/f&q";
import FooterSection from "~/components/footer";
import NumberFlow from "@number-flow/react";
import { useEffect, useState } from "react";
import { useAuthStore } from "~/store/useUserDataStore";
import { TitleSuffix } from "~/consts";
import { FaAngleRight, FaEye, FaEyeSlash } from "react-icons/fa";
import { TradeButton } from "~/components/charts/components/buttons";
import { getUserDataAPI } from "~/api/authAPI";
import { calculateUserBalances } from "~/utils/helpers";
export function meta({}: Route.MetaArgs) {
  return [{ title: "Home" }, { name: "description", content: "Welcome" }];
}
export async function clientLoader ({params}:Route.ClientLoaderArgs){
  const accessToken = useAuthStore.getState().accessToken;
  const isLoggedIn = useAuthStore.getState().isLoggedIn;
  const setUser = useAuthStore.getState().setUser;
  if (accessToken && isLoggedIn){
  const response = await getUserDataAPI(accessToken);
    if (response && response.success) {
      setUser(response.data)
    }
  }
  return {accessToken, isLoggedIn}

}
export default function Home({loaderData}:Route.ComponentProps) {
  const { t } = useTranslation();
  const {accessToken, isLoggedIn} = loaderData;
  const [number, setNumber] = useState(85290471);
  const [volume, setVolume] = useState(10760109);
  const { wallet } = useAuthStore();
  const {totalUSDT} = calculateUserBalances(wallet, { USDT: 1, BTC: 9400, ETH: 3220 });
  const [balanceShow, setBalanceShow] = useState(true);
  const navigate = useNavigate()
  useEffect(() => {
    setTimeout(() => {
      setNumber((prev) => (prev += Math.random() * 1019));
    }, 3000);
    setTimeout(() => {
      setVolume((prev) => (prev += Math.random() * 736));
    }, 2000);
  }, []);

  return (
    <main className="bg-gray-900 lg:bg-gray-950 overflow-x-hidden">
      <section
        id="hero"
        className="flex p-4 flex-col w-full lg:flex-row lg:justify-between xl:justify-center xl:gap-x-40 "
      >
        <article
          id={"hero1"}
          className="flex flex-col items-center gap-10 my-10 md:my-7 md:items-start md:pl-8 lg:px-2"
        >
          {isLoggedIn ? (
            <div
              onClick={() => navigate("ai")}
              className="flex cursor-pointer flex-col justify-center items-start flex-wrap lg:max-w-110"
            >
              <h1 className="text-amber-300 font-extrabold text-3xl md:text-5xl lg:text-6xl leading-normal">
                AI Strategy Trading{" "}
                <span className="text-gray-50">
                  Is Now Available on {TitleSuffix}
                </span>
              </h1>
              <p className="flex gap-2 items-center text-gray-50 mt-12">
                Learn More <FaAngleRight color="#fff" />
              </p>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center gap-2 md:items-start md:gap-4">
              <h2 className="text-gray-50 font-extrabold text-2xl md:text-4xl md:font-bold ">
                MORE THAN
              </h2>
              <h2 className="text-amber-400 font-extrabold text-5xl font-serif md:text-8xl lg:text-7xl">
                25 MILLION
              </h2>
              <h2 className="text-gray-50 font-extrabold text-3xl md:text-8xl md:*:first:block">
                <span>USERS </span>
                <span>TRUST US</span>
              </h2>
            </div>
          )}
          {isLoggedIn ? (
            <div className="space-y-3 w-full">
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
                {balanceShow ? totalUSDT : "********"} USDT
              </div>
              <div className="text-gray-200 text-sm">≈ $ {totalUSDT}</div>
            </div>
          ) : (
            <div className="flex lg:justify-around justify-center gap-10 items-center w-full my-2 lg:my-6 md:justify-start md:gap-30">
              <div className="flex flex-col items-center gap-1">
                <NumberFlow
                  className="text-amber-400 text-md font-extrabold md:text-lg lg:text-2xl"
                  value={number}
                  format={{ style: "currency", currency: "USD" }}
                  transformTiming={{ duration: 750 }}
                />

                <p className="text-amber-400 text-sm font-medium md:text-md lg:text-lg">
                  Customer Assets
                </p>
              </div>
              <div className="flex flex-col items-center gap-1">
                <NumberFlow
                  className="text-amber-400 text-md font-extrabold md:text-lg lg:text-2xl"
                  value={volume}
                  format={{ style: "currency", currency: "USD" }}
                  transformTiming={{ duration: 750 }}
                />
                <p className="text-amber-400 text-sm font-medium md:text-md lg:text-lg">
                  Trading Volume
                </p>
              </div>
            </div>
          )}
          {isLoggedIn ? (
            <div className="flex w-full my-4">
              <div className="flex gap-4 w-full">
                <TradeButton
                  label="Deposit"
                  style="bg-amber-300 h-10 px-5 md:h-12 md:w-full lg:w-auto"
                  textStyle="text-gray-800 font-semibold"
                  action={() => navigate("/deposit")}
                />
                <TradeButton
                  label="Trade"
                  style="bg-gray-800 hover:bg-gray-950 lg:hover:bg-gray-900 h-10 w-full md:h-12"
                  textStyle="text-gray-100 font-semibold"
                  action={() => navigate("trade/btcusdt?type=spot")}
                />
                <TradeButton
                  label="Convert"
                  style="bg-gray-800 hover:bg-gray-950 lg:hover:bg-gray-900 h-10 w-full md:h-12"
                  textStyle="text-gray-100 font-semibold"
                  action={() => navigate("trade/convert/usdt/btc")}
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center gap-2 md:items-start">
              <div className="flex gap-2">
                <CiGift className="text-amber-400" size={19} />
                <p className="font-normal text-sm  text-gray-50">
                  Up to $100 Bonus Only Today
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Form className="hidden md:block">
                  <input
                    name="email/phone"
                    style={{
                      borderWidth: 1,
                      borderColor: "rgba(244,244,244,.3)",
                    }}
                    placeholder="Email/Phone number"
                    className="py-3 rounded-md w-76 px-3 text-gray-200 border-amber-50 focus:outline-1 focus:outline-amber-400"
                  />
                </Form>
                <button
                  className="bg-amber-300 px-14 py-3 rounded-md cursor-pointer"
                  onClick={() => navigate("/register")}
                >
                  <p className="font-medium text-md text-gray-950">Sign Up</p>
                </button>
              </div>
            </div>
          )}
        </article>
        <article id="hero2" className="md:mt-8 lg:mt-2 space-y-4">
          <HomeMiniChart />
          <AiMiniChart />
        </article>
      </section>

      <Certifications />
      <aside className="flex justify-center w-full items-center px-4 md:items-start lg:mb-10 md:justify-start md:px-8 lg:items-center lg:justify-center">
        <div className="lg:max-w-6xl ">
          <div className="flex flex-col items-center md:items-start lg:flex-row lg:justify-between lg:gap-6">
            <div className="space-y-2 mb-4">
              <p className="text-gray-50 text-2xl font-extrabold text-center md:text-start lg:text-3xl">
                FROM DECENTRALIZED TO{" "}
                <span className="block md:inline text-2xl lg:block font-extrabold text-amber-400">
                  {" "}
                  CENTRALIZED TRUST
                </span>
              </p>
              <p className="font-thin text-center md:text-start wrap-break-word text-gray-200">
                Expore the potentials to reshape your financial landscape and
                seize the future with digital assets. We gurantee the
                transactions are safe, fast and simple.
              </p>
            </div>
            <div className="my-4 lg:my-0">
              <div className="my-6 lg:my-0">
                <p className="text-light text-gray-400 text-sm text-center md:text-start">
                  Ensure your trading skills match
                </p>
                <p className="text-xl font-bold text-amber-400 text-center md:text-start">
                  Buy, sell and trade anytime, anywhere
                </p>
                <p className="text-sm font-thin text-center md:text-start">
                  With innovative products and delicated user experience
                </p>
              </div>
              <div className="flex flex-col items-center my-4 gap-4 md:flex-row md:gap-6">
                <div>
                  <p className="text-amber-400 text-md text-center md:text-start">
                    100,000/1s orders
                  </p>
                  <p className="font-thin text-center md:text-start text-gray-400">
                    Smart contract engine processing
                  </p>
                </div>
                <div className="flex flex-col items-center md:items-start ">
                  <p className="text-amber-400 text-md text-center md:text-start">
                    5 milliseconds
                  </p>
                  <p className="font-thin text-center md:text-start text-gray-400">
                    Minimum delay for per transaction
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
      <section className="my-6 px-4 md:px-8 lg:px-4 xl:px-0 lg:flex lg:flex-col xl:items-center relative ">
        <article className="flex flex-col gap-4 lg:gap-y-8 lg:max-w-6xl xl:min-w-6xl ">
          {reSectionList.map((e) => {
            const styles = {
              backgroundImage: `url(${e.bg})`,
              backgroundPosition: "center center",
              backgroundSize: "cover", // Or 'contain', or specific values
            };
            return (
              <div
                key={e.id}
                style={styles}
                className={`flex flex-col lg:gap-5 lg:max-w-4xl rounded-2xl md:flex-row p-4 lg:p-8 relative ${e.id === 2 ? "lg:self-end lg:flex-row-reverse" : "lg:self-start"}`}
              >
                <div className={`mb-3 `}>
                  <p className="text-xl text-amber-400 font-bold md:text-2xl mb-3">
                    {e.title}
                  </p>
                  <p className="text-lg text-gray-50 font-medium md:text-xl mb-2">
                    {e.label}
                  </p>
                  <p
                    className={`font-medium text-sm hidden md:block text-gray-500`}
                  >
                    {e.description}
                  </p>
                  <button
                    onClick={() => navigate(e.value)}
                    className="bg-amber-300 p-1 cursor-pointer rounded-md w-30 hidden md:block text-gray-950 mt-6 text-md font-medium"
                  >
                    Learn more
                  </button>
                </div>
                <div
                  className={`md:hidden flex flex-row justify-between items-center`}
                >
                  <p className="font-light text-sm text-gray-500">
                    {e.description}
                  </p>

                  <img
                    src={e.image}
                    className="object-fit w-25 h-20 self-end"
                  />
                </div>
                <button
                  onClick={() => navigate(e.value)}
                  className="bg-amber-300 py-1 cursor-pointer rounded-md w-30 md:hidden text-gray-950 text-sm font-normal"
                >
                  Learn more
                </button>
                {e.id === 2 ? (
                  <img
                    src={e.image}
                    className="object-fit w-25 h-20 hidden md:block md:w-45 md:h-40 self-end"
                  />
                ) : (
                  <img
                    src={e.image}
                    className="hidden md:block object-fit w-20 h-20 md:w-40 md:h-40"
                  />
                )}
              </div>
            );
          })}
        </article>
      </section>

      <NewsScreen />

      <DownloadSections />
      <FAQ />
      <aside className="flex flex-col gap-4 w-full py-6 lg:bg-gray-900 bg-gray-800 items-center justify-center lg:py-10 lg:gap-6">
        <p className="text-lg font-extrabold text-neutral-50 lg:text-3xl">
        { isLoggedIn? "Start trading now":" Start earning today"}
        </p>
        <button
          className="h-10 px-8 rounded-lg bg-amber-300 text-neutral-900 text-sm font-bold lg:px-12 cursor-pointer"
          onClick={() => isLoggedIn? navigate("/trade/"):navigate("register")}
        >
         {isLoggedIn ? "Trade Now":"Sign Up Now"}
        </button>
      </aside>

      <FooterSection />
    </main>
  );
}
