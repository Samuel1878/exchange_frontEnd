 
import FooterSection from "~/components/footer";
import { FeaturedProjects } from "data/charity/featured-projects";
import TestImage from "assets/images/binance-charity-wallet.svg";
import React, { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Checkbox } from "~/components/ui/checkbox";
import { Button } from "~/components/ui/button";
import { BTC, ETH, XRP } from "~/utils";

const randomNames = [
  "michael",
  "karen",
  "linda",
  "john",
  "david",
  "emily",
  "jessica",
  "daniel",
  "laura",
  "robert",
  "mary",
  "james",
  "patricia",
  "charles",
  "barbara",
  "thomas",
  "susan",
  "alex",
];

const maskName = (name) => {
  if (name.length <= 2) return name;
  return name[0] + "*".repeat(name.length - 2) + name[name.length - 1];
};

const getRandomPrice = (min = 10, max = 100000) =>
  (Math.random() * (max - min) + min).toFixed(3);

const DonationScrollNoCSS = () => {
  // Generate donations data once
  const donations = React.useMemo(() => {
    return Array.from({ length: 10 }).map(() => ({
      name: maskName(
        randomNames[Math.floor(Math.random() * randomNames.length)]
      ),
      price: getRandomPrice(),
    }));
  }, []);

  const scrollRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    if (!scrollRef.current) return;

    const scrollHeight = scrollRef.current.scrollHeight / 2;
    const interval = setInterval(() => {
      setScrollPosition((prev) => {
        let next = prev + 1;
        if (next >= scrollHeight) next = 0;
        return next;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="">
      <div className="grid grid-cols-3 text-sm font-semibold bg-gray-950 border-b border-gray-700 pb-5 mb-4 p-4">
        <div>Participant Users</div>
        <div className="text-center">Donation Time</div>
        <div className="text-right">Donation Amount</div>
      </div>
      <div className="relative h-96 w-full overflow-hidden bg-gray-900 text-white p-4">
        <div
          ref={scrollRef}
          className="space-y-2"
          style={{
            transform: `translateY(-${scrollPosition}px)`,
            transition: "none",
            willChange: "transform",
          }}
        >
          {[...donations, ...donations].map((don, idx) => (
            <div
              key={idx}
              className="grid grid-cols-3 border-b border-gray-700 py-2"
            >
              <div>{don.name}</div>
              <div className="text-center">
                {new Date().toLocaleTimeString()}
              </div>
              <div className="text-right">{don.price} USDT</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

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
  ],
};

const ModalBox = ({ open, onOpenChange }) => {
  const [agree, setAgree] = useState(true);
  const [selectedToken, setSelectedToken] = useState(
    allTokensData.Favorites[0]
  );
  const tokens = allTokensData;

  const handleTokenSelect = (symbol) => {
    const token = tokens.Favorites.find((t) => t.symbol === symbol);
    setSelectedToken(token);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg text-white bg-gray-900 border border-gray-800 rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Make a Donation
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Support this charity project with your donation
          </DialogDescription>
        </DialogHeader>

        {/* Donation Amount */}
        <div className="space-y-3 mt-4">
          <Label className="text-sm text-gray-300">Crypto</Label>
          <div className="flex items-center gap-2">
            <Input
              type="number"
              placeholder="0"
              className="flex-1 bg-gray-800 border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900 lg:focus:ring-gray-900 rounded-md"
            />

            {/* Token Select */}
            <Select
              value={selectedToken?.symbol}
              onValueChange={handleTokenSelect}
            >
              <SelectTrigger className="w-[150px] bg-gray-800 border-gray-700">
                <SelectValue placeholder="Select Token" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                {tokens.Favorites.map((token) => (
                  <SelectItem key={token.symbol} value={token.symbol}>
                    {token.icon}
                    {token.symbol}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-3 mt-4">
          <div className="text-center">
            <div className="flex justify-center">
              <div className="bg-gray-500 rounded-full p-3 w-12 h-12 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-3 mt-4">
          <Label className="text-sm text-gray-300">Currency</Label>
          <div className="flex items-center gap-2">
            <Input
              type="number"
              placeholder="0"
              className="flex-1 bg-gray-800 border-gray-700 focus:border-0 focus:outline-none focus:ring-2 rounded-md"
              disabled
            />

            {/* Token Select */}
            <Select value="USDT" disabled>
              <SelectTrigger className="w-[150px] bg-gray-800 border-gray-700">
                <SelectValue placeholder="Select Token" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem key={"USDT"} value={"USDT"}>
                  USDT
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Agreement */}
        <div className="mt-4 flex items-center space-x-2">
          <Checkbox checked={agree} id="agree" />
          <Label htmlFor="agree" className="text-sm text-gray-400">
            You agree to our <span className="text-white">Privacy Policy</span>
            <span>and</span>
            <span className="text-white">Terms of Use</span>
            <a href="#" className="text-blue-400 underline">
              Donation Now
            </a>
          </Label>
        </div>

        <DialogFooter className="mt-4">
          <Button
            disabled={!agree}
            className="w-full bg-yellow-400 text-black hover:bg-yellow-300 cursor-pointer"
          >
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default function CharityByDetailRoute() {
  // Chart values
  const allocated = 3304671.44;
  const pending = 39686350.09;
  const totalDonations =
    FeaturedProjects?.reduce((sum, p) => sum + p.donations, 0) || 0;
  const completed =
    FeaturedProjects?.filter((p) => p.progress === 100).length || 0;
  const total = allocated + pending;

  const allocatedPercent = (allocated / total) * 100;
  const pendingPercent = (pending / total) * 100;

  const [modalOpen, setModalOpen] = useState(false);

  const handleDonateClick = () => {
    setModalOpen(true);
  };

  // Calculate circle stroke properties
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const allocatedStrokeDashoffset =
    circumference - (allocatedPercent / 100) * circumference;
  const pendingStrokeDashoffset =
    circumference - (pendingPercent / 100) * circumference;

  return (
    <main className="bg-gray-900 lg:bg-gray-950 min-h-svh flex flex-col justify-between overflow-x-hidden">
      <section id="hero" className="flex flex-col lg:items-center flex-1">
        <article
          id="hero1"
          className="flex flex-col gap-4 lg:gap-y-8 lg:max-w-6xl xl:min-w-6xl"
        >
          <div className="lg:max-w-6xl md:max-w-7xl">
            <div className="text-gray-300 p-6 md:p-5 space-y-10">
              {/* Hero Section */}
              <div className="border border-gray-700 pb-10 px-6 md:px-10 pt-10 rounded-lg w-full shadow-lg bg-gray-800 bg-opacity-50 bg-gradient-to-b from-gray-950 via-gray-800 to-gray-900">
                <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
                  <div className="border border-gray-700 rounded-lg p-6 md:p-10 w-full">
                    <img
                      src={TestImage}
                      alt="Charity Wallet"
                      className="lg:w-full"
                    />
                  </div>
                  <div className="text-white">
                    <h1 className="text-3xl font-semibold mb-4">
                      Charity Wallet Overview
                    </h1>
                    <p className="mb-6 font-thin">
                      The Charity Wallet is a transparent and secure way to
                      manage donations for various charitable projects. It
                      allows donors to see how their contributions are allocated
                      and the impact they make.
                    </p>
                    <div className="w-full bg-gray-700 rounded-full h-4 mt-2 mb-6">
                      <div
                        className="bg-green-500 h-4 rounded-full"
                        style={{ width: "100%" }}
                      ></div>
                    </div>
                    <div className="flex flex-2 justify-between font-thin text-sm mb-4">
                      <p>$167,558.16 Raised of $50,007.75</p>
                      <p>100.00%</p>
                    </div>
                    <div className="">
                      <button
                        className="bg-amber-300 hover:bg-amber-400 text-gray-800 font-semibold py-2 px-4 rounded mt-6 w-full"
                        onClick={handleDonateClick}
                      >
                        Donate Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Section */}
              <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4 lg:gap-10 items-center">
                    <div className="space-y-2">
                      <div className="flex justify-center">
                        <div className="relative w-40 h-40">
                          <svg className="w-full h-full transform -rotate-90">
                            <circle
                              cx="80"
                              cy="80"
                              r={radius}
                              stroke="#FACC15"
                              strokeWidth="12"
                              fill="transparent"
                              strokeDasharray={circumference}
                              strokeDashoffset={allocatedStrokeDashoffset}
                            />
                            <circle
                              cx="80"
                              cy="80"
                              r={radius}
                              stroke="#22C55E"
                              strokeWidth="12"
                              fill="transparent"
                              strokeDasharray={circumference}
                              strokeDashoffset={pendingStrokeDashoffset}
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="text-white space-y-4">
                      <h3 className="text-gray-500 font-medium">
                        Total Raised
                      </h3>
                      <p className="text-sm font-bold mt-1 lg:text-lg">
                        448.88 BTC ≈ $42,991,021.52
                      </p>
                      <div className="mt-4 space-y-2">
                        <p className="flex items-center gap-2">
                          <span className="block w-3 h-3 bg-green-500 rounded"></span>
                          <span className="text-gray-500 text-sm lg:text-sm">
                            Total allocated ≈ ${allocated.toLocaleString()}
                          </span>
                        </p>
                        <p className="flex items-center gap-2">
                          <span className="block w-3 h-3 bg-yellow-400 rounded"></span>
                          <span className="text-gray-500 text-sm">
                            Total pending ≈ ${pending.toLocaleString()}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 lg:gap-20">
                    <div className="text-white space-y-4">
                      <div className="grid grid-cols-2">
                        <div className="text-sm flex justify-center items-center h-16 p-2 lg:h-24 lg:p-4">
                          <svg
                            width="100%"
                            height="100%"
                            viewBox="0 0 32 32"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M16 2.6665L22.6667 9.33317L9.33333 9.33317L16 2.6665Z"
                              fill="#F0B90B"
                            ></path>
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M24 19.9998C24 24.4181 20.4183 27.9998 16 27.9998C11.5817 27.9998 8 24.4181 8 19.9998C8 15.5816 11.5817 11.9998 16 11.9998C20.4183 11.9998 24 15.5816 24 19.9998ZM12.5719 19.9999L16.0001 23.4281L19.4282 19.9999L16.0001 16.5718L12.5719 19.9999Z"
                              fill="#F0B90B"
                            ></path>
                          </svg>
                        </div>
                        <div className="text-white p-2 lg:p-4">
                          <h3 className="text-xl font-bold lg:text-4xl">71</h3>
                          <span className="text-sm font-thin lg:text-sm lg:font-semibold lg:text-gray-400">
                            Donors
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-white space-y-4">
                      <div className="grid grid-cols-2">
                        <div className="text-sm flex justify-center items-center h-16 p-2 lg:h-24 lg:p-4">
                          <svg
                            width="100%"
                            height="100%"
                            viewBox="0 0 33 32"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M23.1667 2.6665L16.5 9.33317L9.83333 2.6665H23.1667Z"
                              fill="#F0B90B"
                            ></path>
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M16.5 27.9998C20.9183 27.9998 24.5 24.4181 24.5 19.9998C24.5 15.5816 20.9183 11.9998 16.5 11.9998C12.0817 11.9998 8.5 15.5816 8.5 19.9998C8.5 24.4181 12.0817 27.9998 16.5 27.9998ZM16.5001 23.4281L13.0719 19.9999L16.5001 16.5718L19.9282 19.9999L16.5001 23.4281Z"
                              fill="#F0B90B"
                            ></path>
                          </svg>
                        </div>
                        <div className="text-white p-2 lg:p-4">
                          <h3 className="text-xl font-bold lg:text-4xl">
                            1,000
                          </h3>
                          <span className="text-sm font-thin lg:text-sm lg:font-semibold lg:text-gray-400">
                            Beneficiaries
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm font-thin">
                    *Since the launch of the 'Web3' charity section, we, a
                    non-profit organization, are committed to leveraging web3
                    technology as the future force for justice. For every
                    donation you make, we will make it public and pledge to use
                    it solely for charitable purposes.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="text-2xl lg:text-3xl text-white font-semibold">
                    <h2>We are committed to</h2>
                  </div>
                  <div className="p-4 border border-gray-700 rounded-lg bg-gray-800 bg-opacity-50 text-white">
                    <h3 className="lg:text-xl">Protecting Children</h3>
                    <p className="mt-2 font-thin lg:font-normal lg:text-gray-400">
                      As part of our ongoing collaboration with UNICEF, we're
                      donating to safeguard the well-being of 7.5 million
                      children in Ukraine. With the escalation of the conflict,
                      the needs of children and their families also escalate.
                      These funds will be used to provide medical supplies, safe
                      drinking water, social protection, and emergency
                      educational resources.
                    </p>
                  </div>
                  <div className="p-4 border border-gray-700 rounded-lg bg-gray-800 bg-opacity-50 text-white">
                    <h3 className="lg:text-xl">Supporting Refugees</h3>
                    <p className="mt-2 font-thin lg:font-normal lg:text-gray-400">
                      We're collaborating with UNHCR to provide emergency relief
                      supplies like food, water, medical supplies, and working
                      to improve living conditions in temporary shelters. The
                      International Strategic Action Network (iSans) established
                      an organization in Poland for the first time in 2020. With
                      experience in the region, they're capable of restarting
                      actions to assist Ukrainian refugees.
                    </p>
                  </div>
                </div>
              </div>

              {/* Donors Section */}
              <div className="space-y-7">
                <h2 className="text-3xl font-bold lg:text-4xl">
                  Donors for this Project
                </h2>
                <div className="">
                  <DonationScrollNoCSS />
                </div>
              </div>
            </div>
          </div>
        </article>
      </section>

      {/* Modal */}
      <ModalBox open={modalOpen} onOpenChange={setModalOpen} />

      <FooterSection />
    </main>
  );
}
