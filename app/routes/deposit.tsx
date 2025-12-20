import FooterSection from "~/components/footer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { useState, useEffect, useCallback } from "react";

import HomeStart from "assets/images/how-buy-step3.svg";
import HomeStart2 from "assets/images/how-step1.svg";
import HomeStart3 from "assets/images/how-step2.svg";
import HeaderImage from "assets/images/vip-ins-dark.svg";
import { QRCodeSVG } from "qrcode.react";
import { useNavigate } from "react-router";

import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";

import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import type { Route } from "./+types/deposit";
import {
  getDepositHis,
  getWalletAddress,
  getWithdrawHis,
  submitWithdrawForm,
  sumbitDepositForm,
} from "~/api/walletAPI";
import type { Network, WalletAddressItem } from "~/utils/types";
import { AllCoinNames, Networks } from "~/consts/pairs";
import { Coins } from "~/utils";
import { NoData } from "~/components/loading/noData";
import FAQ from "~/components/homeComponents/f&q";
import { GoCopy } from "react-icons/go";
// import {
//   calculateUserBalances,
//   getSortedCoinsForWithdrawls,
// } from "~/utils/helpers";
import { Spinner } from "~/components/ui/spinner";
import { toast } from "sonner";
import moment from "moment";
import { getSortedCoinsForWithdrawals } from "~/utils/helpers";
import { useWalletStore } from "~/store/useUserWalletStore";
import { useUser, useWallet } from "~/utils/walletSelectors";
import { FAQList } from "~/consts/faqLists";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {


  return { type: params.type };
}
interface Tab {
  label: string;
  name: string;
}
const TabMenu: Tab[] = [
  { name: "Deposit", label: "deposit" },
  { name: "Withdraw", label: "withdraw" },
];
const Withdraw = ({ isLoggedIn, accessToken }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [address, setAddress] = useState("");
  const [openN, setOpenN] = useState(false);
  const [network, setNetwork] = useState("");
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [availableAmount, setAvailableAmount] = useState("");
  const [networkFee, setNetworkFee] = useState(0);
  const [error, setError] = useState("");
  const [miniAmount, setMiniAmount] = useState(0);
  const user = useUser();
  const spotWallet = useWallet("SPOT")
  // const {wallets, user} = useWalletStore()
  // const { walletDetails, walletTotals, totalUSDT } =
  //   isLoggedIn &&
  //   user &&
  //   calculateUserBalances(wallet, { USDT: 1, BTC: 9400, ETH: 3220 });
  const assetList = getSortedCoinsForWithdrawals(spotWallet) || null;
  useEffect(() => {
    if (value) {
      assetList
        .filter((e) => e.currency.toUpperCase() === value.toUpperCase())
        .map((e) => setAvailableAmount(e.available.toString()));
    }
  }, [value]);
  useEffect(() => {
    value &&
      Networks[value.toLowerCase()].map((e) => {
        if (e.name === network) {
          setMiniAmount(e.mini);
          setNetworkFee(e.fee);
          return;
        }
      });
  }, [network]);
  const submitAction = async () => {
    setLoading(true);
    if (
      Number(amount) < miniAmount ||
      Number(availableAmount) < Number(amount)
    ) {
      toast("Amount should within available rate");
      setLoading(false);
      return;
    }
    const response = await submitWithdrawForm(
      {
        WithdrawalAmount: Number(amount),
        Currency: value.toUpperCase(),
        WithdrawalMethod: network,
        ToAddress: address,
        NetworkFee: networkFee,
      },
      accessToken
    );
    setLoading(false);
    if (response) {
      toast("Withdrawl successfully request");
      setAmount("");
      return;
    }
    toast("Something went wrong!");
  };
  return (
    <>
      <div className="space-y-4 w-full">
        <div className="w-full space-y-4 mb-8">
          <p className="text-gray-50 text-md font-medium">Select coin</p>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full h-12 justify-between bg-gray-900 border-gray-700 hover:border-amber-300 lg:bg-gray-950 hover:bg-gray-900 hover:lg:bg-gray-950"
              >
                <div className="flex items-center gap-3">
                  {value ? (
                    <img
                      src={Coins[value.toUpperCase()]}
                      className="rounded-full w-8"
                    />
                  ) : null}
                  <p className="text-md font-medium text-gray-400">
                    {value ? value : "Search coin..."}
                  </p>
                  <p className="text-md font-semibold text-gray-500">
                    {value ? AllCoinNames[value.toLowerCase()]?.name : null}
                  </p>
                </div>
                <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="lg:w-lg md:w-xl w-xs flex flex-1 p-0 bg-gray-900 lg:bg-gray-950 border border-gray-700 outline-0 ring-0">
              <Command className="bg-gray-900 lg:bg-gray-950 border-0 outline-0 ring-0 text-gray-300">
                <CommandInput placeholder="Search coin . . ." />
                <CommandList>
                  <CommandEmpty>No Coin found.</CommandEmpty>
                  <CommandGroup className="bg-gray-900 lg:bg-gray-950 w-full">
                    {assetList?.map((w) => (
                      <CommandItem
                        key={w.currency}
                        className="active:bg-gray-800 justify-between hover:bg-gray-800 flex flex-1 w-full focus:bg-gray-800 text-gray-50 text-lg font-bold"
                        value={w.currency}
                        onSelect={(currentValue) => {
                          setValue(currentValue === value ? "" : currentValue);
                          setOpen(false);
                          setNetwork("");
                        }}
                      >
                        <CheckIcon
                          className={cn(
                            "mr-2 h-4 w-4",
                            value === w.currency ? "opacity-100" : "opacity-0"
                          )}
                        />
                        <div className="flex gap-4 w-full items-center">
                          <img
                            src={Coins[w.currency.toUpperCase()]}
                            className="rounded-full w-8 max-h-8"
                          />
                          <div>
                            <p>{w.currency.toUpperCase()}</p>
                            <p className="text-gray-500 text-sm font-medium">
                              {w.name}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-md font-semibold">{w.available}</p>
                          <p className="text-sm text-gray-600">
                            ${w.availableUSDT}
                          </p>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <div className="space-y-4">
          <p className="text-gray-50 text-md font-medium">Withdraw to</p>
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="outline-0 border text-md hover:border-amber-300 focus-within:border-amber-300 border-gray-700 rounded-md h-12 w-full px-4"
            placeholder="Enter Address"
          />
          <Popover open={openN} onOpenChange={setOpenN}>
            <PopoverTrigger asChild>
              <Button
                disabled={!value}
                variant="outline"
                role="combobox"
                aria-expanded={openN}
                className="w-full h-12 justify-between bg-gray-900 border-gray-700 hover:border-amber-300 lg:bg-gray-950 hover:bg-gray-900 hover:lg:bg-gray-950"
              >
                <div className="flex items-center gap-3">
                  <p className="text-md font-medium text-gray-400">
                    {network ? network : "Select Network..."}
                  </p>
                </div>
                <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="lg:w-lg md:w-xl w-xs flex flex-1 p-0 bg-gray-900 lg:bg-gray-950 border border-gray-700 outline-0 ring-0">
              <Command className="bg-gray-900 lg:bg-gray-950 border-0 outline-0 ring-0 text-gray-300">
                <CommandInput placeholder="Search network . . ." />
                <CommandList>
                  <CommandEmpty>No Network found.</CommandEmpty>
                  <CommandGroup className="bg-gray-900 lg:bg-gray-950">
                    {Networks[value.toLowerCase()]?.map((n: Network) => (
                      <CommandItem
                        key={n.name}
                        className="active:bg-gray-800 hover:bg-gray-800 focus:bg-gray-800 text-gray-50 text-lg font-bold"
                        value={n.name}
                        onSelect={(currentValue) => {
                          setNetwork(
                            currentValue === network ? "" : currentValue
                          );
                          setOpenN(false);
                        }}
                      >
                        <CheckIcon
                          className={cn(
                            "mr-2 h-4 w-4",
                            network === n.name ? "opacity-100" : "opacity-0"
                          )}
                        />
                        <div className="flex gap-4 w-full">
                          <p>{n.name}</p>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <p className="text-xs text-gray-600">
          CAUTION: Ensure the recipient address has been activated; otherwise,
          your withdrawl will fail.
        </p>
        {isLoggedIn && value && network && address && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-gray-50 text-md font-medium">
                Withdraw amount
              </p>
              <p className="text-gray-400 font-semibold text-sm">
                Available {availableAmount + " " + value}{" "}
              </p>
            </div>
            <div className="flex items-center pr-4 outline-0 border text-md hover:border-amber-300 focus-within:border-amber-300 border-gray-700 rounded-md h-12 w-full">
              <input
                className="w-full h-full px-4 outline-0"
                placeholder={miniAmount.toString()}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <p className="font-bold">{value.toUpperCase()}</p>
              <button
                className="ml-4 text-amber-300 font-bold cursor-pointer"
                onClick={() => setAmount(availableAmount)}
              >
                MAX
              </button>
            </div>
            <p className="text-xs text-gray-500">Network Fee: {networkFee}</p>
            <button
              onClick={submitAction}
              disabled={loading || !amount}
              className="w-full h-12 bg-amber-300 rounded-md flex items-center justify-center text-gray-950 font-semibold cursor-pointer"
            >
              {loading ? <Spinner /> : "Submit"}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

const Deposit = ({
  isLoggedIn,
  accessToken,
}: {
  // data: WalletAddressItem[];
  isLoggedIn: boolean;
  accessToken: any;
}) => {
  const navigate = useNavigate();
  const [data, setData] = useState<WalletAddressItem[]>([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [openN, setOpenN] = useState(false);
  const [network, setNetwork] = useState("");
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const groupedArray =
    data &&
    Object.entries(
      data.reduce(
        (acc, item) => {
          (acc[item.CoinName] ||= []).push(item);
          return acc;
        },
        {} as Record<string, WalletAddressItem[]>
      )
    )?.map(([coin, items]) => ({ coin, items }));

  const submit = async () => {
    setLoading(true);
    const payload = {
      DepositAmount: Number(amount),
      CoinName: value,
      NetWork: network,
      NetWorkName: network,
    };
    const response = await sumbitDepositForm(payload, accessToken);
    console.log(response);

    if (response && response?.success) {
      setAmount("");
      toast(response?.message);

      navigate("/");
    }
    setLoading(false);
  };
  useEffect(() => {
    if (isLoggedIn && accessToken) {
      (async () => {
        console.log("getting walletaddresss");
        const response = await getWalletAddress(accessToken);
        if (response) setData(response.data);
      })();
    }
  }, []);

  return (
    <>
      <div className="space-y-4 w-full">
        <div>
          <p>Amount</p>
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full focus-within:border-amber-300 hover:border-amber-300 border border-gray-700 h-12 rounded-md outline-0 text-lg font-bold text-gray-50 px-4"
          />
        </div>
        <div className="w-full">
          <p>Coin</p>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full h-12 justify-between bg-gray-900 border-gray-700 hover:border-amber-300 lg:bg-gray-950 hover:bg-gray-900 hover:lg:bg-gray-950"
              >
                <div className="flex items-center gap-3">
                  {value ? (
                    <img
                      src={Coins[value.toUpperCase()]}
                      className="rounded-full w-8"
                    />
                  ) : null}
                  <p className="text-md font-medium text-gray-50">
                    {value
                      ? AllCoinNames[value.toLowerCase()]?.symbol
                      : "Select coin..."}
                  </p>
                  <p className="text-md font-semibold text-gray-500">
                    {value ? AllCoinNames[value.toLowerCase()]?.name : null}
                  </p>
                </div>
                <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="lg:w-lg md:w-xl w-xs flex flex-1 p-0 bg-gray-900 lg:bg-gray-950 border border-gray-700 outline-0 ring-0">
              <Command className="bg-gray-900 lg:bg-gray-950 border-0 outline-0 ring-0 text-gray-300">
                <CommandInput placeholder="Search coin . . ." />
                <CommandList>
                  <CommandEmpty>No Coin found.</CommandEmpty>
                  <CommandGroup className="bg-gray-900 lg:bg-gray-950">
                    {groupedArray &&
                      groupedArray.map((w) => (
                        <CommandItem
                          key={w.coin}
                          className="active:bg-gray-800 hover:bg-gray-800 focus:bg-gray-800 text-gray-50 text-lg font-bold"
                          value={w.coin}
                          onSelect={(currentValue) => {
                            setValue(
                              currentValue === value ? "" : currentValue
                            );
                            setOpen(false);
                            setNetwork("");
                          }}
                        >
                          <CheckIcon
                            className={cn(
                              "mr-2 h-4 w-4",
                              value === w.coin ? "opacity-100" : "opacity-0"
                            )}
                          />
                          <div className="flex gap-4 w-full">
                            <img
                              src={Coins[w.coin.toUpperCase()]}
                              className="rounded-full w-8"
                            />
                            <p>{w.coin}</p>
                            <p className="text-gray-500 font-medium">
                              {AllCoinNames[w.coin.toLowerCase()]?.name}
                            </p>
                          </div>
                        </CommandItem>
                      ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <div className="w-full">
          <p>Network</p>
          <Popover open={openN} onOpenChange={setOpenN}>
            <PopoverTrigger asChild>
              <Button
                disabled={!value}
                variant="outline"
                role="combobox"
                aria-expanded={openN}
                className="w-full h-12 justify-between bg-gray-900 border-gray-700 hover:border-amber-300 lg:bg-gray-950 hover:bg-gray-900 hover:lg:bg-gray-950"
              >
                <div className="flex items-center gap-3">
                  <p className="text-md font-medium text-gray-400">
                    {network ? network : "Select Network..."}
                  </p>
                </div>
                <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="lg:w-lg md:w-xl w-xs flex flex-1 p-0 bg-gray-900 lg:bg-gray-950 border border-gray-700 outline-0 ring-0">
              <Command className="bg-gray-900 lg:bg-gray-950 border-0 outline-0 ring-0 text-gray-300">
                <CommandInput placeholder="Search Network . . ." />
                <CommandList>
                  <CommandEmpty>No Network found.</CommandEmpty>
                  <CommandGroup className="bg-gray-900 lg:bg-gray-950">
                    {groupedArray &&
                      groupedArray
                        .filter((e) => e.coin === value)
                        .map((c) =>
                          c.items
                            .filter((e) => e.CoinName === value)
                            .map((n) => (
                              <CommandItem
                                key={n.Id}
                                className="active:bg-gray-800 hover:bg-gray-800 focus:bg-gray-800 text-gray-50 text-lg font-bold"
                                value={n.NetWork}
                                onSelect={(currentValue) => {
                                  setNetwork(
                                    currentValue === network ? "" : currentValue
                                  );
                                  setOpenN(false);
                                }}
                              >
                                <CheckIcon
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    network === n.NetWork
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                <div className="flex gap-4 w-full">
                                  <p>{n.NetWork}</p>
                                  <p className="text-gray-500 font-medium">
                                    {n.NetworkName}
                                  </p>
                                </div>
                              </CommandItem>
                            ))
                        )}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        {isLoggedIn && value && network && amount && (
          <>
            <div className="flex gap-4 lg:items-center border flex-col lg:flex-row border-gray-700 p-4 rounded-md hover:border-amber-300">
              <div className="p-2 bg-gray-50 rounded-sm self-center">
                <QRCodeSVG
                  radius={0}
                  value={
                    data.filter(
                      (e) => e.CoinName === value && e.NetWork === network
                    )[0].Address
                  }
                />
              </div>
              <div className="flex justify-between w-full">
                <div className="flex flex-1 flex-col flex-wrap gap-2">
                  <p className="text-md text-gray-600">Address</p>
                  <p className="wrap-anywhere">
                    {
                      data.filter(
                        (e) => e.CoinName === value && e.NetWork === network
                      )[0].Address
                    }
                  </p>
                </div>
                <div
                  className="p-1 cursor-pointer lg:self-end"
                  onClick={() =>
                    navigator.clipboard.writeText(
                      data.filter(
                        (e) => e.CoinName === value && e.NetWork === network
                      )[0].Address
                    )
                  }
                >
                  <GoCopy size={25} />
                </div>
              </div>
            </div>
            <button
              onClick={submit}
              className="w-full h-12 text-gray-950 bg-amber-300 rounded-sm cursor-pointer flex items-center justify-center"
            >
              {!loading ? "Done" : <Spinner color="#000" />}
            </button>
          </>
        )}
      </div>
    </>
  );
};
export default function AnnouncementPage({ loaderData }: Route.ComponentProps) {
  const [history, setHisory] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {accessToken, isLoggedIn} = useWalletStore()
  const { type } = loaderData;

  const fetchDepoData = async () => {
    setLoading(true);
    const response = await getDepositHis(accessToken);
    if (response) {
      console.log(response);
      setHisory(response);
    }
    setLoading(false);
  };
  const fetchWithdrawData = async () => {
    setLoading(true);
    const response = await getWithdrawHis(accessToken);
    if (response) {
      console.log(response);
      setHisory(response);
    }
    setLoading(false);
  };
  useEffect(() => {
    type === "deposit" && accessToken && fetchDepoData();
    type === "withdraw" && accessToken && fetchWithdrawData();
  }, [type]);
  const prevHandler =() => {

  }
  const nextHandler = () => {

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
              <div className="grid lg:grid-cols-2 gap-4">
                <div className="text-white text-2xl space-y-7 lg:text-4xl lg:font-bold">
                  <h1 className="capitalize">On-Chain {type}</h1>
                  <div className="space-y-7 flex items-center justify-center">
                    <img src={HeaderImage} alt="" className="w-80" />
                  </div>
                </div>

                {/* Currency Selection */}
                <div className="text-white space-y-4 border p-4 border-gray-800 rounded-2xl">
                  <div className="flex flex-row justify-around space-x-4">
                    {TabMenu.map(({ label, name }) => (
                      <button
                        key={label}
                        onClick={() => {
                          navigate("/" + label);
                        }}
                        className={`px-3 py-1 ${
                          type === label
                            ? "text-gray-100 border-b-2 border-b-amber-300"
                            : "hover:text-gray-100"
                        }`}
                      >
                        {name}
                      </button>
                    ))}
                  </div>
                  <div className="space-y-7">
                    <>
                      {type === "deposit" && (
                        <Deposit
                          // data={walletAddress}
                          isLoggedIn={isLoggedIn}
                          accessToken={accessToken}
                        />
                      )}
                      {type === "withdraw" && (
                        <Withdraw
                          isLoggedIn={isLoggedIn}
                          accessToken={accessToken}
                        />
                      )}
                    </>
                  </div>
                </div>
              </div>
              <div className="space-y-7 text-white">
                <div className="grid gap-4 lg:grid-cols-3">
                  <div className="border border-gray-800 rounded-2xl p-4">
                    <div className="space-y-4">
                      <img src={HomeStart2} alt="" width={80} />
                    </div>
                    <div className="space-y-4 py-3 font-semibold">
                      <h1>1.Enter Amount & Select Payment</h1>
                      <p className="text-sm font-thin">
                        Enter the amount, select the available payment method,
                        and choose the payment network.
                      </p>
                    </div>
                  </div>
                  <div className="border border-gray-800 rounded-2xl p-4">
                    <div className="space-y-4">
                      <img src={HomeStart3} alt="" width={80} />
                    </div>
                    <div className="space-y-4 py-3 font-semibold">
                      <h1>2.Confirm Order</h1>
                      <p className="text-sm font-thin">
                        Confirmation of transaction detail information,
                        including trading pair quotes, fees, and other
                        explanatory tips.
                      </p>
                    </div>
                  </div>
                  <div className="border border-gray-800 rounded-2xl p-4">
                    <div className="space-y-4">
                      <img src={HomeStart} alt="" width={80} />
                    </div>
                    <div className="space-y-4 py-3 font-semibold">
                      <h1>3.Receive Crypto</h1>
                      <p className="text-sm font-thin">
                        After successful payment, the purchased crypto will be
                        deposited into your Spot or Funding Wallet.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-7 text-white">
                <div className="">
                  <div className="border border-gray-800 text-white p-4 rounded-2xl space-y-7">
                    <h1 className="text-gray-50">Recent {type}</h1>

                    {history ? (
                      <>
                        {history?.data?.map((e) => {
                          return (
                            <div className="w-full flex justify-between">
                              <div className="flex flex-col flex-1">
                                <p className="text-gray-400 text-sm font-bold">
                                  {
                                    AllCoinNames[e?.Currency?.toLowerCase()]
                                      .name
                                  }{" "}
                                  (
                                  {type === "deposit"
                                    ? e?.NetWork
                                    : e?.WithdrawalMethod}
                                  )
                                </p>
                                <div className="flex items-center gap-2">
                                  <p className="text-sm font-bold text-gray-50">
                                    {type === "deposit"
                                      ? Number(e?.DepositAmount).toFixed(4)
                                      : Number(e?.WithdrawalAmount).toFixed(4)}
                                  </p>

                                  <p className="text-sm text-gray-500">
                                    {e?.Currency}
                                  </p>
                                </div>
                              </div>
                              <div className="flex flex-1 justify-between">
                                <div>
                                  <p className={`text-sm text-gray-500`}>
                                    {moment(e?.CreatedAt).format("YYYY-MM-DD")}
                                  </p>
                                  <p className={`text-sm text-gray-500`}>
                                    {moment(e?.CreatedAt).format("hh:mm:ss")}
                                  </p>
                                </div>

                                <p
                                  className={`text-sm font-bold capitalize ${e?.Status === "pending" ? "text-amber-200" : e?.Status === "approved" ? "text-green-400" : "text-red-400"}`}
                                >
                                  {e?.Status}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                        <div
                          className="w-full flex justify-end gap-2"
                          onClick={prevHandler}
                        >
                          <button
                            disabled={history?.hasPrePage}
                            className="text-sm text-gray-400 cursor-pointer"
                          >
                            Prev
                          </button>
                          <button
                            disabled={history?.hasNextPage}
                            className="text-sm text-gray-400 cursor-pointer"
                            onClick={nextHandler}
                          >
                            Next
                          </button>
                        </div>
                      </>
                    ) : (
                      <NoData />
                    )}
                    {loading && <Spinner color="#fff" />}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </section>
      <FAQ list={FAQList} />
      <FooterSection />
    </main>
  );
}
