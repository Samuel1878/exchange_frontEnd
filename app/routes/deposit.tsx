import FooterSection from "~/components/footer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { useState, useEffect } from "react";

import HomeStart from "assets/images/how-buy-step3.svg";
import HomeStart2 from "assets/images/how-step1.svg";
import HomeStart3 from "assets/images/how-step2.svg";
import HeaderImage from "assets/images/vip-ins-dark.svg";
import { QRCodeSVG } from "qrcode.react";
import { useNavigate } from "react-router";
import { useAuthStore } from "~/store/useUserDataStore";
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
import { getWalletAddress } from "~/api/walletAPI";
import type { AssetBalance, WalletAddressItem } from "~/utils/types";
import { AllCoinNames, Networks } from "~/consts/pairs";
import { Coins } from "~/utils";
import { NoData } from "~/components/loading/noData";
import FAQ from "~/components/homeComponents/f&q";
import { GoCopy } from "react-icons/go";
import {
  calculateUserBalances,
  getSortedCoinsForWithdrawls,
} from "~/utils/helpers";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const accessToken = useAuthStore.getState().accessToken;
  const isLoggedIn = useAuthStore.getState().isLoggedIn;
  if (params.type === "deposit" && isLoggedIn) {
    const response = await getWalletAddress(accessToken);
    return {
      type: params.type || null,
      walletAddress: response.data,
      isLoggedIn,
    };
  }
  return { type: params.type || null, walletAddress: null, isLoggedIn };
}
interface Tab {
  label: string;
  name: string;
}
const TabMenu: Tab[] = [
  { name: "Deposit", label: "deposit" },
  { name: "Withdraw", label: "withdraw" },
];
const Withdraw = () => {
  const [open, setOpen] = useState(false);
   const [value, setValue] = useState("");
  const user = useAuthStore.getState().user;
  const [address, setAddress] = useState("")
  const [openN, setOpenN] = useState(false);
  const [network, setNetwork] = useState("")
  const isLoggedIn = useAuthStore.getState().isLoggedIn;
  const { walletDetails, walletTotals, totalUSDT } =
    isLoggedIn && user&& calculateUserBalances(user, { USDT: 1, BTC: 9400, ETH: 3220 });
    const assetList = getSortedCoinsForWithdrawls(walletDetails)
  return (
    <>
      <div className="space-y-4 w-full">
        <div className="w-full space-y-4 mb-8">
          <p>Select coin</p>
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
                        key={w.symbol}
                        className="active:bg-gray-800 justify-between hover:bg-gray-800 flex flex-1 w-full focus:bg-gray-800 text-gray-50 text-lg font-bold"
                        value={w.symbol}
                        onSelect={(currentValue) => {
                          setValue(currentValue === value ? "" : currentValue);
                          setOpen(false);
                          setNetwork("");
                        }}
                      >
                        <CheckIcon
                          className={cn(
                            "mr-2 h-4 w-4",
                            value === w.symbol ? "opacity-100" : "opacity-0"
                          )}
                        />
                        <div className="flex gap-4 w-full items-center">
                          <img
                            src={Coins[w.symbol.toUpperCase()]}
                            className="rounded-full w-8 max-h-8"
                          />
                          <div>
                            <p>{w.symbol}</p>
                            <p className="text-gray-500 text-sm font-medium">
                              {w.name}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-md font-semibold">{w.balance}</p>
                          <p className="text-sm text-gray-600">
                            ${w.valueUSDT}
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
          <p>Withdraw to</p>
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
                    {Networks[value.toLowerCase()]?.map((n: string) => (
                      <CommandItem
                        key={n}
                        className="active:bg-gray-800 hover:bg-gray-800 focus:bg-gray-800 text-gray-50 text-lg font-bold"
                        value={n}
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
                            network === n ? "opacity-100" : "opacity-0"
                          )}
                        />
                        <div className="flex gap-4 w-full">
                          <p>{n}</p>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <p className="text-sm text-gray-600">
          CAUTION: Ensure the recipient address has been activated; otherwise,
          your withdrawl will fail.
        </p>
        {isLoggedIn && value && network && address && (
          <div className="space-y-4">
            <p>Withdraw amount</p>
            <div className="flex items-center pr-4 outline-0 border text-md hover:border-amber-300 focus-within:border-amber-300 border-gray-700 rounded-md h-12 w-full">
              <input className="w-full h-full px-4 outline-0" placeholder="Minimal 0.000001"/>
              <p className="font-bold">{value.toUpperCase()}</p>
              <button className="ml-4 text-amber-300 font-bold cursor-pointer" onClick={()=>{}}>
                MAX
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

const Deposit = ({
  data,
  isLoggedIn,
}: {
  data: WalletAddressItem[];
  isLoggedIn: boolean;
}) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [openN, setOpenN] = useState(false);
  const [network, setNetwork] = useState("");
  const groupedArray = Object.entries(
    data.reduce(
      (acc, item) => {
        (acc[item.CoinName] ||= []).push(item);
        return acc;
      },
      {} as Record<string, WalletAddressItem[]>
    )
  ).map(([coin, items]) => ({ coin, items }));

  return (
    <>
      <div className="space-y-4 w-full">
        <div>
          <p>Amount</p>
          <input className="w-full focus-within:border-amber-300 hover:border-amber-300 border border-gray-700 h-12 rounded-md outline-0 text-lg font-bold text-gray-50 px-4" />
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
                    {groupedArray.map((w) => (
                      <CommandItem
                        key={w.coin}
                        className="active:bg-gray-800 hover:bg-gray-800 focus:bg-gray-800 text-gray-50 text-lg font-bold"
                        value={w.coin}
                        onSelect={(currentValue) => {
                          setValue(currentValue === value ? "" : currentValue);
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
                    {groupedArray
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
        {isLoggedIn && value && network && (
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
            <div className="flex lg:block">
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
                className="p-1 cursor-pointer"
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
        )}
      </div>
    </>
  );
};
export default function AnnouncementPage({ loaderData }: Route.ComponentProps) {
  // const type = loaderData.type;
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { type, walletAddress, isLoggedIn } = loaderData;
  console.log(walletAddress);
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
                    {loading ? (
                      <div className="flex flex-col items-center justify-center my-4 h-52">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
                        <span className="mt-3 text-gray-400">
                          Loading content...
                        </span>
                      </div>
                    ) : (
                      <>
                        {type === "deposit" && (
                          <Deposit
                            data={walletAddress}
                            isLoggedIn={isLoggedIn}
                          />
                        )}
                        {type === "withdraw" && <Withdraw />}
                      </>
                    )}
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
                    <h1>Recent {type}</h1>
                    <NoData />

                  </div>
                </div>
              </div>
              <FAQ />
            </div>
          </div>
        </article>
      </section>
      <FooterSection />
    </main>
  );
}
