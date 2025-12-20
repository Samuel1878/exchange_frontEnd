import { useState } from "react";
import Loan from "assets/images/loan-banner_1.svg";
import VipLoan from "assets/images/vip_banner.svg";
import { Link, useNavigate } from "react-router";
import SlotCounter from "react-slot-counter";
import FAQ from "~/components/homeComponents/f&q";
import FooterSection from "~/components/footer";
import { BiTimer } from "react-icons/bi";
import { GrTransaction } from "react-icons/gr";
import { FaSackDollar } from "react-icons/fa6";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "~/components/ui/select";
import { Checkbox } from "~/components/ui/checkbox";
import { BTC, ETH, loanBanner1, vip_banner, XRP } from "~/utils";
import { NoData } from "~/components/loading/noData";

import { useWalletStore } from "~/store/useUserWalletStore";
import { NoRecordFound } from "~/components/loading/noRecordFound";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "~/components/ui/input-group";
import { SearchIcon } from "lucide-react";
import { FlexibleFAQList } from "~/consts/faqLists";

const allTokensData = {
  Favorites: [
    {
      symbol: "BTC",
      name: "Bitcoin",
      price: "$103,592.27",
      change: "-1.49%",
      high: "$605,400",
      low: "$ 102,476.09",
      vol: "22.38K",
      turnover: "$2,322,487.86K",
      icon: (
        <img src={BTC} width={32} className="rounded-full overflow-hidden" />
      ),
    },
    {
      symbol: "ETH",
      name: "Ethereum",
      price: "$3,453.40",
      change: "-2.75%",
      high: "$34,300",
      low: "$ 102,476.09",
      vol: "22.38K",
      turnover: "$2,322,487.86K",
      icon: (
        <img src={ETH} width={32} className="rounded-full overflow-hidden" />
      ),
    },
    {
      symbol: "XRP",
      name: "XRP",
      price: "$150.10",
      change: "+0.55%",
      high: "$5,3000",
      low: "$ 102,476.09",
      vol: "22.38K",
      turnover: "$2,322,487.86K",
      icon: (
        <img src={XRP} width={32} className="rounded-full overflow-hidden" />
      ),
    },
    {
      symbol: "ETH",
      name: "Ethereum",
      price: "$3,453.40",
      change: "-2.75%",
      high: "$34,300",
      low: "$ 102,476.09",
      vol: "22.38K",
      turnover: "$2,322,487.86K",
      icon: (
        <img src={ETH} width={32} className="rounded-full overflow-hidden" />
      ),
    },
    {
      symbol: "XRP",
      name: "XRP",
      price: "$150.10",
      change: "+0.55%",
      high: "$5,3000",
      low: "$ 102,476.09",
      vol: "22.38K",
      turnover: "$2,322,487.86K",
      icon: (
        <img src={XRP} width={32} className="rounded-full overflow-hidden" />
      ),
    },
  ],
};

export default function FlexibleLoan() {
  const accessToken = useWalletStore.getState().accessToken;
  const isLoggedIn = useWalletStore.getState().isLoggedIn;
  const navigate = useNavigate();
  const tokens = allTokensData;
  const [activeTab, setActiveTab] = useState("Borrowing_Order");
  const [selectedToken, setSelectedToken] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState(90);
  const [agree, setAgree] = useState(true);
const [query ,setQuery] = useState("")
  const borrowingPeriods = [7, 15, 30, 45, 60, 90, 180];
  const handleRowClick = (token) => {
    setSelectedToken(token);
    setOpen(true);
  };
  const handleConfirm = () => {
    setOpen(false);
    navigate(`/token/${selectedToken.symbol}`);
  };
  const onCheckedChange = () => {
    setOpen(false);
  };
  return (
    <main className="bg-gray-900 lg:bg-gray-950">
    <section id="hero" className="flex flex-col lg:items-center">
      <article id="hero1" className="flex flex-col gap-4 lg:gap-y-8">
        <div className="text-gray-300 space-y-10">
          <div className="flex flex-col lg:items-center md:items-start lg:flex-row lg:justify-between lg:gap-6">
            <div className="space-y-2 mb-4 lg:space-x-7">
              <h1 className="text-lg lg:text-2xl text-amber-300 font-extrabold font-sans">
                FLEXIBLE RATE LOAN
              </h1>
              <h2 className="text-2xl font-bold lg:text-3xl text-amber-50 xl:py-4 mb-4">
                Borrow for Spot/Margin/Futures Trading or staking to earn high
                APY.
              </h2>
              <p className="text-xs text-gray-100 flex">
                <BiTimer className="mr-2" size={15} />
                Repay at any time
              </p>
              <p className="text-xs text-gray-100 flex">
                <GrTransaction className="mr-2" size={15} />
                No transaction fee
              </p>
              <p className="text-xs text-gray-100 flex">
                <FaSackDollar className="mr-2" size={15} />
                Quickly arrive at the account with the fair interest rate.
              </p>

              <button className="cursor-pointer bg-amber-300 text-sm font-semibold text-gray-800 py-1.5 px-2 lg:p-2 mt-4 rounded-sm lg:w-1/3">
                Borrow Now
              </button>
            </div>
            <div className="block sm:block my-4 lg:my-0 lg:space-y-2 md:space-y-2">
              <div
                className="flex flex-2 border items-center border-amber-300 p-4 gap-2 rounded-2xl"
                style={{ backgroundColor: "rgba(240, 185, 11,.03)" }}
              >
                <div className="md:p-4">
                  <p className="text-lg font-bold mb-1">Fixed Rate Loans</p>
                  <span className="text-sm">
                    Create a borrow requset order with your preferred duration
                    and interest rate.
                  </span>
                  <p className="text-amber-300 mt-2 font-semibold text-sm">
                    <Link to="/finance/fixedLoan">Explore Now</Link>
                  </p>
                </div>
  
                  <img
                    src={loanBanner1}
                    alt=""
                    className="lg:w-[180px] w-[100px]"
                  />
        
              </div>
            </div>
          </div>
          {isLoggedIn ? (
            <aside className="my-4 w-full">
              <h1 className="text-gray-50 text-2xl font-bold mb-6">
                Asset Overview
              </h1>
              <div className="flex flex-col gap-4 items-center md:flex-row ">
                <div className="flex-1 p-4 border border-gray-800 rounded-2xl min-h-75 w-full">
                  <p className="text-lg text-gray-500 font-normal">
                    Total Debt Amount(USD)
                  </p>
                  <p className="text-lg">≈ 0</p>
                  <div className="mt-4">
                    <div className="text-gray-500 flex justify-between text-sm pb-2 border-b border-b-gray-700">
                      <div className="flex-1 justify-between flex">
                        <p className="">Asset</p>
                        <p className="text-right flex-1">Amount</p>
                      </div>
                      <p className="flex-1 text-right">Equity Value (USD)</p>
                    </div>
                    <div className="flex items-center justify-center flex-col pt-10">
                      <NoRecordFound />
                      <div className="text-gray-500 text-sm">
                        No Records Found
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex-1 p-4 border border-gray-800 rounded-2xl min-h-75 w-full">
                  <p className="text-lg text-gray-500 font-normal">
                    Total Collateral Amount(USD)
                  </p>
                  <p className="text-lg">≈ 0</p>
                  <div className="mt-4 h-full">
                    <div className="text-gray-500 flex justify-between text-sm pb-2 border-b border-b-gray-700">
                      <div className="flex-1 justify-between flex">
                        <p className="">Asset</p>
                        <p className="text-right flex-1">Amount</p>
                      </div>
                      <p className="flex-1 text-right">Equity Value (USD)</p>
                    </div>
                    <div className="flex items-center justify-center flex-col pt-10">
                      <NoRecordFound />
                      <div className="text-gray-500 text-sm">
                        No Records Found
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          ) : null}
          <div className="mt-10 md:mt-14 lg:mt-20">
            <div className="flex flex-col gap-2 mb-6 md:mb-10 lg:mb-12 md:flex-row md:justify-between md:items-center">
              <h1 className="text-2xl font-bold">Borrow Market</h1>
              <InputGroup className="w-full md:w-100 h-10 border-gray-700">
                <InputGroupInput
                  type="search"
                  className="text-gray-200"
                  placeholder="Search..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <InputGroupAddon>
                  <SearchIcon />
                </InputGroupAddon>
              </InputGroup>
            </div>

            <table className="w-full">
              <thead className="text-gray-600 text-xs font-thin">
                <tr className="">
                  <th className="text-left ">Loanable Coin</th>
                  <th className="text-right">Hourly Interest Rate</th>
                  <th className="text-right">Annually Interest Rate</th>
                  <th className="hidden md:block text-right pr-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {tokens.Favorites.map((e) => (
                  <tr
                    key={e.symbol}
                    className="cursor-pointer border-b text-sm md:text-md lg:text-lg border-gray-800 lg:border-gray-900  hover:bg-gray-800 lg:hover:bg-gray-900"
                    onClick={() => handleRowClick(e)}
                  >
                    <td className="flex items-center space-x-2 py-4">
                      {/* <span>{e.icon}</span> */}
                      <span>
                        <span className="font-semibold">{e.symbol}</span>{" "}
                        {e.name}
                      </span>
                    </td>
                    <td className="text-right">0.0000012 %</td>
                    <td className={`text-right`}>0.55534 %</td>
                    <td className="hidden md:block font-medium py-4 text-amber-300 text-right pr-3">
                      Borrow
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Shadcn Dialog */}
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogContent className="max-w-lg text-white bg-gray-900 border border-gray-800 rounded-2xl">
                <DialogHeader>
                  <DialogTitle className="text-xl font-semibold">
                    Collateralized Borrowing
                  </DialogTitle>
                  <DialogDescription className="text-gray-400">
                    Synchronous borrowing limit based on personal asset
                    situation
                  </DialogDescription>
                </DialogHeader>

                {/* Verification Quantity */}
                <div className="space-y-3 mt-4">
                  <Label className="text-sm text-gray-300">
                    Verification Quantity
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      placeholder="0"
                      className="flex-1 bg-gray-800 border border-gray-700 focus:border-0 focus:outline-none focus:ring-2 rounded:md"
                    />

                    {/* Token Select */}
                    <Select
                      value={selectedToken?.symbol}
                      onValueChange={setSelectedToken}
                    >
                      <SelectTrigger className="w-[150px] bg-gray-800 border-gray-700">
                        <SelectValue placeholder="Select Token" />
                      </SelectTrigger>
                      <SelectContent>
                        {tokens.Favorites.map((e) => (
                          <SelectItem value={e.symbol}>
                            {e.icon}
                            {e.symbol}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="text-xs text-gray-400 flex justify-between">
                    <span>Verifiable Amount: 0 {selectedToken?.symbol}</span>
                  </div>
                </div>
                <div className="space-y-3 mt-4">
                  <Label>
                    Evaluate after entering the amount of capital verification
                  </Label>
                  <Input
                    type="number"
                    className="bg-gray-800 border-gray-700"
                    placeholder="Available Quantity"
                    disabled
                  />
                </div>

                {/* Borrowing Period */}
                <div className="mt-6 space-y-2">
                  <Label className="text-sm text-gray-300">
                    Borrowing Period
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {borrowingPeriods.map((d) => (
                      <Button
                        key={d}
                        variant={days === d ? "default" : "outline"}
                        onClick={() => setDays(d)}
                        className={
                          days === d
                            ? "bg-yellow-400 text-black hover:text-gray-950 hover:bg-yellow-500 cursor-pointer"
                            : "bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-gray-50 cursor-pointer"
                        }
                      >
                        {d}Days
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Interest Details */}
                <div className="mt-6 space-y-1 text-sm text-gray-300">
                  <div className="flex justify-between">
                    <span>Daily Interest Rate</span>
                    <span>0.00%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Coin Interest</span>
                    <span>0 {selectedToken?.symbol}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Service Charge</span>
                    <span>0 {selectedToken?.symbol}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-white">
                    <span>Estimated Amount Due</span>
                    <span>0 {selectedToken?.symbol}</span>
                  </div>
                </div>

                {/* Agreement */}
                <div className="mt-4 flex items-center space-x-2">
                  <Checkbox checked={agree} id="agree" />
                  <Label htmlFor="agree" className="text-sm text-gray-400">
                    I have read and agree to{" "}
                    <a href="#" className="text-blue-400 underline">
                      Borrowing Service Agreement
                    </a>
                  </Label>
                </div>

                <DialogFooter className="mt-4">
                  <Button
                    disabled={!agree}
                    className="w-full bg-yellow-400 text-black hover:bg-yellow-300 cursor-pointer"
                  >
                    Confirm Borrow
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <FAQ list={FlexibleFAQList} />
      </article>
    </section>

     </main>
  );
}
