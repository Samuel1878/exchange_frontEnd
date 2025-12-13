import { TitleSuffix } from "~/consts";
import type { Route } from "./+types/convert";
import { BsCurrencyExchange } from "react-icons/bs";
import { Link, useNavigate } from "react-router";
import { useCallback, useEffect, useState } from "react";
import { TbTransferVertical } from "react-icons/tb";
import { Coins } from "~/utils";
import { FaArrowRight, FaCaretDown } from "react-icons/fa";
import FooterSection from "~/components/footer";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";
import { Star, X } from "lucide-react";
import { getAvgPriceAPI } from "~/api/price";
import { AltCoins, StableCoins } from "~/consts/pairs";
import { formatPrice, priceFormatter } from "~/components/charts/util";
import { useAuthStore } from "~/store/useUserDataStore";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from "~/components/ui/dialog";
import { formatNumber } from "~/utils/helpers";
export const clientLoader = async ({ params,request }: Route.ClientLoaderArgs) => {
  const from = params.from;
  
  const to = params.to;
    const url = new URL(request.url);
  const type = url.searchParams.get("type");
  if (!from) {
    throw new Error("No Params");
  }
  if (!to) {
    return { from, to: "usdt", type };
  }
  return { from, to, type };
};

export default function Convert({ loaderData }: Route.ComponentProps) {
  const { from, to , type} = loaderData;
  const [fromCoins, setFromCoins] = useState(null);
  const [ready, setReady] = useState<boolean>(false);
  const [toCoins, setToCoins] = useState(null);
  const [toCoin, setToCoin] = useState("");
  const [fromCoin, setFromCoin] = useState("");
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [availableAmount ,setAvailableAmount] = useState("");
  const { wallet} = useAuthStore()
  const[ openPreview, setOpenPreview] = useState(false);
  const [isFromStable, setIsFromStable] = useState<boolean>(
    Object.keys(StableCoins).includes(from.toLowerCase())
  );
  const [rate, setRate] = useState(0);
  const [openDrawer, setOpenDrawer] = useState<{
    state: boolean;
    value: "from" | "to" | "";
  }>({ state: false, value: "" });
  const navigate = useNavigate();
  useEffect(() => {
    console.log("False")
    setReady(false);
    setRate(0);
    setToAmount("");
    setFromAmount("");
    setFromCoin(from);
    setToCoin(to);
    if (Object.keys(StableCoins).includes(from?.toLowerCase())) {
      setIsFromStable(true);
      setToCoins(AltCoins);
      setFromCoins(StableCoins);
      setReady(true);
      console.log("true")
      return;
    } else {
      setIsFromStable(false);
      setToCoins(StableCoins);
      setFromCoins(AltCoins);
      setReady(true);
            console.log("true");
    }
  }, [from, to]);

  const switchFnc = ({ from, to }) => {
    setFromAmount("");
    setToAmount("");
    navigate(`/trade/convert/${from}/${to}`);
  };
  useEffect(()=>{
    console.log(type)
    wallet.map((e)=>{
      if (e.WalletType === type){
        e.UserAsset.map((i)=>{
          if (i.Currency.toUpperCase() === fromCoin.toUpperCase())return setAvailableAmount(i.AvailableBalance)
        })
      return
      }
    })
  },[fromCoin, type])
    const fetchPrice = async () => {
      const pair = isFromStable
        ? toCoin.toUpperCase() + fromCoin.toUpperCase()
        : fromCoin.toUpperCase() + toCoin.toUpperCase();

      console.log("Updating rate...");
      const newRate = await getAvgPriceAPI(`${pair}`);
      setRate(newRate ? Number(newRate?.price) : 0);
      console.log("New rate:", newRate);
    };
  useEffect(() => {

    ready && fetchPrice();
  }, [fromCoin , toCoin]);

  useEffect(() => {
    if (fromAmount && Number(fromAmount) > 0 && rate !== 0) {
      setToAmount(
        (isFromStable
          ? Number(fromAmount) / rate
          : Number(fromAmount) * rate
        ).toFixed(6)
      );
    } else {
      setToAmount("");
    }
  }, [fromAmount, rate]);
  useEffect(() => {
    if (openDrawer.value === "from") {
      if (searchTerm === "") {
        setFromCoins(isFromStable ? StableCoins : AltCoins);
        return;
      }
      setFromCoins((prevCoins) => {
        const filteredCoins = {};
        Object.keys(fromCoins).forEach((key) => {
          if (key.toLowerCase().includes(searchTerm.toLowerCase())) {
            filteredCoins[key as keyof typeof StableCoins] =
              fromCoins[key as keyof typeof StableCoins];
          }
        });
        return filteredCoins;
      });
    } else if (openDrawer.value === "to") {
      if (searchTerm === "") {
        setToCoins(isFromStable ? AltCoins : StableCoins);
        return;
      }
      setToCoins((prevCoins) => {
        const filteredCoins = {};
        Object.keys(toCoins).forEach((key) => {
          if (key.toLowerCase().includes(searchTerm.toLowerCase())) {
            filteredCoins[key as keyof typeof StableCoins] =
              toCoins[key as keyof typeof StableCoins];
          }
        });
        return filteredCoins;
      });
    }
  }, [searchTerm]);
  const convertAction = async () => {

  }
  const RenderDrawerCoinItem = useCallback(
    ({
      symbol,
      name,
      onSelect,
    }: {
      symbol: string;
      name: string;
      onSelect: (symbol: string) => void;
    }) => {
      return (
        <div
          className="flex flex-row justify-between items-center p-2 rounded-md hover:bg-gray-700 cursor-pointer"
          onClick={() => onSelect(symbol)}
        >
          <div className="flex flex-row gap-2 items-center">
            <img
              src={Coins[symbol as keyof typeof AltCoins]}
              className="w-8 h-8 rounded-full"
            />
            <div className="flex flex-col">
              <p className="text-gray-50 font-bold">{symbol.toUpperCase()}</p>
              <p className="text-gray-500 text-sm font-semibold">{name}</p>
            </div>
          </div>
          <Star size={16} color="rgba(200,200,200,0.6)" />
        </div>
      );
    },
    []
  );
  const RenderDialog = useCallback( () => {
    const [expired, setExpired] = useState(false);
    useEffect(()=>{
      setExpired(false);
      const timeOut = setTimeout(()=>{
        setExpired(true)
      },15000)
      return ()=> clearTimeout(timeOut)
    },[])
    console.log("DIALOG")
    return (
      <Dialog open={openPreview} onOpenChange={setOpenPreview}>
        <DialogTrigger></DialogTrigger>
        <DialogContent className="bg-gray-800 border-0 outline-0 ring-0">
          <DialogHeader className="text-gray-50 font-bold text-lg">
            Confirm
          </DialogHeader>
          <div className="flex flex-col gap-6">
            <div className="flex items-center">
              <div className="flex flex-col gap-3 items-center flex-1">
                <img src={Coins[fromCoin.toUpperCase()]} width={40} />
                <p className="text-gray-500 font-medium">From</p>
                <p className="text-gray-50 font-bold text-lg">
                  {formatPrice(Number(fromAmount)) + " "}{" "}
                  {fromCoin.toUpperCase()}
                </p>
              </div>
              <FaArrowRight color="#888" size={20} />
              <div className="flex flex-col gap-3 items-center flex-1">
                <img src={Coins[toCoin.toUpperCase()]} width={40} />
                <p className="text-gray-500 font-medium">To</p>
                <p className="text-gray-50 font-bold text-lg">
                  {formatPrice(Number(toAmount)) + " "} {toCoin.toUpperCase()}
                </p>
              </div>
            </div>
            <div className="border border-gray-700 rounded-md p-2 flex flex-col gap-4">
              <div className="w-full flex justify-between">
                <p className="text-gray-400 text-sm md:text-md">Rate</p>
                <p className="text-gray-200 text-right font-medium text-sm md:text-md">
                  1{" "}
                  {isFromStable ? toCoin.toUpperCase() : fromCoin.toUpperCase()}{" "}
                  ≈ {priceFormatter(rate)}{" "}
                  {isFromStable ? fromCoin.toUpperCase() : toCoin.toUpperCase()}
                </p>
              </div>
              <div className="w-full flex justify-between">
                <p className="text-gray-400 text-sm md:text-md">
                  Payment Method
                </p>
                <p className="text-gray-200 text-right text-sm md:text-md font-medium capitalize">
                  {type} wallet
                </p>
              </div>
              <div className="w-full flex justify-between">
                <p className="text-gray-400 text-sm md:text-md">
                  Transaction Fees
                </p>
                <p className="text-gray-200 text-right text-sm md:text-md font-medium capitalize">
                  0 {toCoin.toUpperCase()}
                </p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <div className="w-full ">
              <div className="sapce-x-2 p-2 text-center text-gray-500">
                Exchange rate {expired?"is expired":"will expire in 15 s"}
              </div>

              <button
                onClick={() => {
                  if (expired) {
                    fetchPrice();
                    setExpired(false);
                    return;
                  }
                  convertAction();
                }}
                className="cursor-pointer font-semibold w-full h-12 bg-amber-300 flex justify-center items-center rounded-md"
              >
                {expired ? "Refresh Quote" : "Convert"}
              </button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },[openPreview, rate])
  return (
    <>
      <main className="flex items-center w-full h-full flex-col  bg-gray-900 lg:bg-gray-950 overflow-x-hidden pt-10 pb-10">
        <RenderDialog/>
        <div className="w-full p-4 lg:max-w-6xl">
          <h1 className="text-lg font-bold text-gray-100 md:text-xl lg:text-4xl">
            {TitleSuffix} Convert {fromCoin.toUpperCase()} to{" "}
            {toCoin.toUpperCase()}
          </h1>
          <p className="text-sm font-medium text-gray-400 my-3 md:text-md lg:text-lg">
            Instant Price | Guaranteed Price | Any Pair
          </p>

          <Link
            to={`/trade/${
              isFromStable ? toCoin + fromCoin : fromCoin + toCoin
            }?type=spot`}
            className="cursor-pointer flex gap-2 font-semibold text-gray-200 items-center"
          >
            <BsCurrencyExchange size={15} color="rgba(120,130,150,1)" /> Trade
            Spot
          </Link>
          <div className="flex flex-col w-full my-6 relative lg:items-center">
            <div className="w-full h-40 bg-gray-800 rounded-md p-4 lg:w-1/2 lg:bg-gray-950 lg:border-2 lg:border-gray-700 border-0">
              <div className="flex w-full justify-between items-center">
                <p className="text-xs text-gray-500 font-medium">From</p>
                <p className="text-xs text-gray-500 font-medium">
                  Availiable Balance {formatPrice(Number(availableAmount))}{" "}
                  {fromCoin.toUpperCase()}
                </p>
              </div>
              <div className="flex justify-between items-center mt-2">
                <div
                  className="flex gap-2 cursor-pointer items-center"
                  onClick={() => setOpenDrawer({ state: true, value: "from" })}
                >
                  <img
                    src={Coins[fromCoin.toUpperCase()]}
                    className="w-7 rounded-full"
                  />
                  <p className="text-gray-50 font-semibold text-lg">
                    {fromCoin.toUpperCase()}
                  </p>
                  <FaCaretDown size={40} color="#d7d7d7" />
                </div>

                <input
                  value={fromAmount}
                  onChange={(e) => setFromAmount(e.target.value)}
                  inputMode="numeric"
                  className="w-full outline-0 text-right h-18 text-gray-50 font-bold text-2xl placeholder:text-gray-600 placeholder:text-lg"
                  placeholder="0.01 - 100,000 USD"
                />
                <button
                  onClick={() => setFromAmount(availableAmount)}
                  className="pl-3 ml-3 cursor-pointer border-l-2 border-gray-700 text-amber-400 font-semibold text-sm"
                >
                  Max
                </button>
              </div>
              <div className="flex justify-end mt-2 text-xs text-gray-600">
                ≈ ${isFromStable ? fromAmount : toAmount}
              </div>
            </div>
            <div className="relative h-4 flex justify-center items-center ">
              <button
                className=" rounded-full bg-gray-900 p-3 cursor-pointer lg:rounded-2xl lg:bg-gray-950 lg:border-2 lg:border-gray-700 border-0"
                onClick={() => switchFnc({ from: to, to: from })}
              >
                <TbTransferVertical size={18} color="rgba(120,130,150,1)" />
              </button>
            </div>
            <div className="w-full h-40 bg-gray-800 rounded-md group p-4 lg:w-1/2 lg:bg-gray-950 lg:border-2 lg:border-gray-700 border-0">
              <div className="flex w-full justify-between items-center">
                <p className="text-xs text-gray-500 font-medium">To</p>
                {/* <p className="text-xs text-gray-500 font-medium">
                  Availiable Balance -- {toCoin.toUpperCase()}
                </p> */}
              </div>
              <div className="flex justify-between items-center mt-2">
                <div
                  className="flex gap-2 items-center cursor-pointer"
                  onClick={() => setOpenDrawer({ state: true, value: "to" })}
                >
                  <img
                    src={Coins[toCoin.toUpperCase()]}
                    className="w-7 rounded-full"
                  />
                  <p className="text-gray-50 font-semibold text-lg">
                    {toCoin.toUpperCase()}
                  </p>
                  <FaCaretDown size={40} color="#d7d7d7" />
                </div>
                <input
                  inputMode="numeric"
                  className="w-full outline-0 text-right h-18 text-gray-50 font-bold text-2xl placeholder:text-gray-600 placeholder:text-lg"
                  placeholder="0.01 - 100,000 USD"
                  value={toAmount}
                  onChange={(e) => setToAmount(e.target.value)}
                />
              </div>
              <div className="flex justify-end mt-2 text-xs text-gray-600">
                ≈ ${Number(isFromStable ? fromAmount : toAmount) - 0.01}
              </div>
            </div>
            <div className="flex justify-between items-center w-full lg:w-1/2 my-5">
              <p className="text-gray-500 text-sm">Rate</p>
              <p className="text-gray-500 text-sm">
                1 {isFromStable ? toCoin.toUpperCase() : fromCoin.toUpperCase()}{" "}
                ≈ {priceFormatter(rate)}{" "}
                {isFromStable ? fromCoin.toUpperCase() : toCoin.toUpperCase()}
              </p>
            </div>
            <button
              className="w-full bg-amber-300 h-12 rounded-md text-gray-900 font-semibold disabled:opacity-20 lg:w-1/2 cursor-pointer"
              disabled={!(fromAmount && Number(fromAmount) > 0)}
              onClick={() => setOpenPreview(true)}
            >
              {fromAmount && toAmount ? `Preview Convert` : "Enter an amount"}
            </button>
          </div>

          <section className="mt-10">
            <h2 className="text-gray-100 font-bold text-lg mb-4 lg:text-2xl">
              Convert other alt-coins
            </h2>
            <p className="text-gray-400 text-sm lg:text-lg">
              Easily convert {fromCoin.toUpperCase()} to a variety of
              cryptocurrencies with competitive rates and instant transactions.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
              {Object.values(AltCoins)
                .filter(
                  (c) => c.symbol.toLowerCase() !== fromCoin.toLowerCase()
                )
                .map((c, index) => (
                  <Link
                    to={`/trade/convert/${c.symbol.toLowerCase()}/usdt`}
                    key={index}
                    className="flex flex-row gap-2 items-center p-4 rounded-md hover:bg-gray-800 lg:hover:bg-gray-900 transition-colors cursor-pointer"
                  >
                    <img
                      src={Coins[c.symbol as keyof typeof AltCoins]}
                      className="w-8 h-8 rounded-full"
                    />
                    <p className="text-gray-50 font-bold">{c.symbol}</p>
                    <p className="text-gray-500 text-sm font-semibold">
                      {c.name}
                    </p>
                  </Link>
                ))}
            </div>
          </section>
          <section className="mt-10">
            <h2 className="text-gray-100 font-bold text-lg mb-4 lg:text-xl">
              How to Convert Crypto on {TitleSuffix}?
            </h2>
            <ol className="list-decimal list-inside text-gray-400 flex flex-col gap-3">
              <li>
                Choose the cryptocurrency you want to convert from and to by
                selecting them from the dropdown menus.
              </li>
              <li>
                Enter the amount of cryptocurrency you wish to convert in the
                "From" field. The equivalent amount in the "To" field will be
                calculated automatically.
              </li>
              <li>
                Click on the "Preview Convert" button to review the conversion
                details, including fees and exchange rates.
              </li>
              <li>
                If everything looks good, confirm the conversion to complete the
                process. The converted cryptocurrency will be credited to your
                account shortly.
              </li>
            </ol>
          </section>
        </div>
        <Drawer
          open={openDrawer.state}
          onOpenChange={(val) => setOpenDrawer({ state: val, value: "" })}
        >
          <DrawerContent className="bg-gray-800 min-h-2/3">
            <div className="p-4">
              <div>
                <DrawerTrigger className="absolute top-4 right-4 cursor-pointer">
                  <X size={24} color="rgba(200,200,200,1)" />
                </DrawerTrigger>
              </div>
              <DrawerTitle className="text-lg font-bold text-gray-100 mb-4">
                Select a coin to{" "}
                {openDrawer.value === "from" ? "convert from" : "convert to"}
              </DrawerTitle>
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                type="search"
                placeholder="Search coin"
                className="w-full mb-4 p-2 rounded-md outline-0 border-2 border-gray-400  text-gray-100"
              />
              <div className="flex flex-col gap-4">
                {openDrawer.value === "from"
                  ? fromCoins &&
                    Object.keys(fromCoins).map((c) => {
                      const coinData = fromCoins[c as keyof typeof StableCoins];
                      return (
                        <RenderDrawerCoinItem
                          key={c}
                          symbol={coinData.symbol}
                          name={coinData.name}
                          onSelect={(symbol) => {
                            navigate(
                              "/trade/convert/" +
                                `${symbol.toLowerCase()}/${toCoin.toLowerCase()}`
                            );
                            setOpenDrawer({ state: false, value: "" });
                          }}
                        />
                      );
                    })
                  : toCoins &&
                    Object.keys(toCoins).map((c) => {
                      const coinData = toCoins[c as keyof typeof StableCoins];
                      return (
                        <RenderDrawerCoinItem
                          key={c}
                          symbol={coinData.symbol}
                          name={coinData.name}
                          onSelect={(symbol) => {
                            navigate(
                              "/trade/convert/" +
                                `${fromCoin.toLowerCase()}/${symbol.toLowerCase()}`
                            );
                            setOpenDrawer({ state: false, value: "" });
                          }}
                        />
                      );
                    })}
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      </main>
      <FooterSection />
    </>
  );
}
