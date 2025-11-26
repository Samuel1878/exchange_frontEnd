"use client"
import { Bell, Megaphone, Users } from "lucide-react";
import type { Route } from "./+types/home";
import SlotCouter from "react-slot-counter";
import { AiLists } from "~/consts/aiList";
import { ChartContainer, ChartTooltipContent, type ChartConfig } from "~/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import React, { useEffect, useRef, useState } from "react";
import { Badge } from "~/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "~/components/ui/accordion";
export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Ai Strategy" },
    { name: "description", content: "Welcome" },
  ];
}
const chartData = [
  { mobile: 150 },
  { mobile: 250 },
  { mobile: 300 },
  { mobile: 350 },
  { mobile: 400 },
  { mobile: 1140 },
]
const chartConfig = {
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig
const Chart = () => {
  return (
    <>
      <ChartContainer config={chartConfig}>
        <AreaChart
          accessibilityLayer
          data={chartData}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <defs>
            <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="var(--color-mobile)"
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor="var(--color-mobile)"
                stopOpacity={0.1}
              />
            </linearGradient>
          </defs>
          <Area
            dataKey="mobile"
            type="natural"
            fill="url(#fillMobile)"
            fillOpacity={0.4}
            stroke="var(--color-mobile)"
            stackId="a"
          />
        </AreaChart>
      </ChartContainer>
    </>
  )
}
const LoginTab = [
  { symbol: "working", label: "Working" },
  { symbol: "finished", label: "Finished" },
]
const Working = () => {
  const [loading, setLoading] = useState(false)
  const [apiData, setApiData] = useState("");
  return (
    <>
      <div className="space-y-7 p-2">
        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center my-4 h-52">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
            <span className="mt-3 text-gray-400">Loading content...</span>
          </div>
        )}

        {/* API Data Display */}
        {!loading && (
          <>
            {apiData ? (
              <div className="mt-4 p-3 bg-gray-800 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">API Data:</h3>
                <pre className="text-sm overflow-auto">
                  {JSON.stringify(apiData, null, 2)}
                </pre>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center my-8 h-52">
                <svg width="94" height="70" viewBox="0 0 94 70" fill="none" xmlns="http://www.w3.org/2000/svg" className="svg-class">
                  <path d="M10.4531 10.9219H66.021V44.3999C66.021 53.3608 66.021 57.8412 64.2771 61.2638C62.7432 64.2744 60.2955 66.7221 57.2849 68.2561C53.8623 70 49.3819 70 40.421 70H16.8531C14.6129 70 13.4928 70 12.6372 69.564C11.8845 69.1805 11.2726 68.5686 10.8891 67.8159C10.4531 66.9603 10.4531 65.8402 10.4531 63.6V10.9219Z" fill="white" fillOpacity="0.04"></path>
                  <path d="M10.922 69.9994C4.88993 69.9994 0 65.1094 0 59.0774H47.0402C47.0402 69.9994 57.4936 69.9994 57.4936 69.9994H10.922Z" fill="url(#paint0_linear_17615_36895)"></path>
                  <path d="M21.3751 -4.86374e-05C15.3431 -4.86374e-05 10.4531 4.88989 10.4531 10.9219H66.0211C66.0211 -4.86374e-05 76.4745 -4.86374e-05 76.4745 -4.86374e-05H21.3751Z" fill="url(#paint1_linear_17615_36895)"></path>
                  <rect x="18.8242" y="18.6667" width="25.2954" height="3.5" rx="1.75" fill="white" fillOpacity="0.06"></rect>
                  <rect x="18.8242" y="30.9166" width="17.6479" height="3.50001" rx="1.75001" fill="white" fillOpacity="0.06"></rect>
                  <rect x="18.8242" y="43.1665" width="23.5306" height="3.50001" rx="1.75001" fill="white" fillOpacity="0.06"></rect>
                  <path fillRule="evenodd" clipRule="evenodd" d="M84.7764 40.6118C84.7764 48.657 78.2813 55.1788 70.2691 55.1788C62.2569 55.1788 55.7617 48.657 55.7617 40.6118C55.7617 32.5667 62.2569 26.0449 70.2691 26.0449C78.2813 26.0449 84.7764 32.5667 84.7764 40.6118ZM79.5444 40.8507C79.5444 46.1262 75.2852 50.4028 70.0313 50.4028C64.7774 50.4028 60.5183 46.1262 60.5183 40.8507C60.5183 35.5752 64.7774 31.2986 70.0313 31.2986C75.2852 31.2986 79.5444 35.5752 79.5444 40.8507Z" fill="#FCD535"></path>
                  <path d="M70.0306 50.4028C75.2845 50.4028 79.5436 46.1262 79.5436 40.8507C79.5436 35.5752 75.2845 31.2986 70.0306 31.2986C64.7767 31.2986 60.5176 35.5752 60.5176 40.8507C60.5176 46.1262 64.7767 50.4028 70.0306 50.4028Z" fill="#FCD535" fillOpacity="0.1"></path>
                  <path fillRule="evenodd" clipRule="evenodd" d="M84.4642 55.6269L80.3984 51.4324L81.544 50.3283L85.6098 54.5229L84.4642 55.6269Z" fill="#FCD535"></path>
                  <path fillRule="evenodd" clipRule="evenodd" d="M88.0506 54.7156C87.6005 54.2637 87.0105 54.0377 86.4205 54.0377C85.8305 54.0377 85.2406 54.2637 84.7904 54.7156C84.3403 55.1676 84.1152 55.76 84.1152 56.3524C84.1152 56.9448 84.3403 57.5372 84.7904 57.9892L90.0632 63.2836C90.5133 63.7356 91.1033 63.9616 91.6933 63.9616C92.2832 63.9616 92.8732 63.7356 93.3233 63.2836C93.7735 62.8316 93.9985 62.2392 93.9985 61.6468C93.9985 61.0544 93.7735 60.462 93.3233 60.01L88.0506 54.7156Z" fill="#FCD535"></path>
                  <defs>
                    <linearGradient id="paint0_linear_17615_36895" x1="32.2204" y1="59.0774" x2="32.2204" y2="69.9994" gradientUnits="userSpaceOnUse">
                      <stop stopColor="white" stopOpacity="0.08"></stop>
                      <stop offset="1" stopColor="white" stopOpacity="0.04"></stop>
                    </linearGradient>
                    <linearGradient id="paint1_linear_17615_36895" x1="47.4526" y1="10.9219" x2="47.4526" y2="-4.86374e-05" gradientUnits="userSpaceOnUse">
                      <stop stopColor="white" stopOpacity="0.04"></stop>
                      <stop offset="1" stopColor="white" stopOpacity="0.08"></stop>
                    </linearGradient>
                  </defs>
                </svg>
                <span className="mt-3 text-gray-400">No data available</span>
              </div>
            )}
          </>
        )}
      </div>
    </>
  )
}
const Finished = () => {
  const [loading, setLoading] = useState(false)
  const [apiData, setApiData] = useState("");
  return (
    <>
      <div className="space-y-7 p-2">
        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center my-4 h-52">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
            <span className="mt-3 text-gray-400">Loading content...</span>
          </div>
        )}

        {/* API Data Display */}
        {!loading && (
          <>
            {apiData ? (
              <div className="mt-4 p-3 bg-gray-800 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">API Data:</h3>
                <pre className="text-sm overflow-auto">
                  {JSON.stringify(apiData, null, 2)}
                </pre>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center my-8 h-52">
                <svg width="94" height="70" viewBox="0 0 94 70" fill="none" xmlns="http://www.w3.org/2000/svg" className="svg-class">
                  <path d="M10.4531 10.9219H66.021V44.3999C66.021 53.3608 66.021 57.8412 64.2771 61.2638C62.7432 64.2744 60.2955 66.7221 57.2849 68.2561C53.8623 70 49.3819 70 40.421 70H16.8531C14.6129 70 13.4928 70 12.6372 69.564C11.8845 69.1805 11.2726 68.5686 10.8891 67.8159C10.4531 66.9603 10.4531 65.8402 10.4531 63.6V10.9219Z" fill="white" fillOpacity="0.04"></path>
                  <path d="M10.922 69.9994C4.88993 69.9994 0 65.1094 0 59.0774H47.0402C47.0402 69.9994 57.4936 69.9994 57.4936 69.9994H10.922Z" fill="url(#paint0_linear_17615_36895)"></path>
                  <path d="M21.3751 -4.86374e-05C15.3431 -4.86374e-05 10.4531 4.88989 10.4531 10.9219H66.0211C66.0211 -4.86374e-05 76.4745 -4.86374e-05 76.4745 -4.86374e-05H21.3751Z" fill="url(#paint1_linear_17615_36895)"></path>
                  <rect x="18.8242" y="18.6667" width="25.2954" height="3.5" rx="1.75" fill="white" fillOpacity="0.06"></rect>
                  <rect x="18.8242" y="30.9166" width="17.6479" height="3.50001" rx="1.75001" fill="white" fillOpacity="0.06"></rect>
                  <rect x="18.8242" y="43.1665" width="23.5306" height="3.50001" rx="1.75001" fill="white" fillOpacity="0.06"></rect>
                  <path fillRule="evenodd" clipRule="evenodd" d="M84.7764 40.6118C84.7764 48.657 78.2813 55.1788 70.2691 55.1788C62.2569 55.1788 55.7617 48.657 55.7617 40.6118C55.7617 32.5667 62.2569 26.0449 70.2691 26.0449C78.2813 26.0449 84.7764 32.5667 84.7764 40.6118ZM79.5444 40.8507C79.5444 46.1262 75.2852 50.4028 70.0313 50.4028C64.7774 50.4028 60.5183 46.1262 60.5183 40.8507C60.5183 35.5752 64.7774 31.2986 70.0313 31.2986C75.2852 31.2986 79.5444 35.5752 79.5444 40.8507Z" fill="#FCD535"></path>
                  <path d="M70.0306 50.4028C75.2845 50.4028 79.5436 46.1262 79.5436 40.8507C79.5436 35.5752 75.2845 31.2986 70.0306 31.2986C64.7767 31.2986 60.5176 35.5752 60.5176 40.8507C60.5176 46.1262 64.7767 50.4028 70.0306 50.4028Z" fill="#FCD535" fillOpacity="0.1"></path>
                  <path fillRule="evenodd" clipRule="evenodd" d="M84.4642 55.6269L80.3984 51.4324L81.544 50.3283L85.6098 54.5229L84.4642 55.6269Z" fill="#FCD535"></path>
                  <path fillRule="evenodd" clipRule="evenodd" d="M88.0506 54.7156C87.6005 54.2637 87.0105 54.0377 86.4205 54.0377C85.8305 54.0377 85.2406 54.2637 84.7904 54.7156C84.3403 55.1676 84.1152 55.76 84.1152 56.3524C84.1152 56.9448 84.3403 57.5372 84.7904 57.9892L90.0632 63.2836C90.5133 63.7356 91.1033 63.9616 91.6933 63.9616C92.2832 63.9616 92.8732 63.7356 93.3233 63.2836C93.7735 62.8316 93.9985 62.2392 93.9985 61.6468C93.9985 61.0544 93.7735 60.462 93.3233 60.01L88.0506 54.7156Z" fill="#FCD535"></path>
                  <defs>
                    <linearGradient id="paint0_linear_17615_36895" x1="32.2204" y1="59.0774" x2="32.2204" y2="69.9994" gradientUnits="userSpaceOnUse">
                      <stop stopColor="white" stopOpacity="0.08"></stop>
                      <stop offset="1" stopColor="white" stopOpacity="0.04"></stop>
                    </linearGradient>
                    <linearGradient id="paint1_linear_17615_36895" x1="47.4526" y1="10.9219" x2="47.4526" y2="-4.86374e-05" gradientUnits="userSpaceOnUse">
                      <stop stopColor="white" stopOpacity="0.04"></stop>
                      <stop offset="1" stopColor="white" stopOpacity="0.08"></stop>
                    </linearGradient>
                  </defs>
                </svg>
                <span className="mt-3 text-gray-400">No data available</span>
              </div>
            )}
          </>
        )}
      </div>
    </>
  )
}
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
const DonationScrollNoCSS = () => {
  const donations = React.useMemo(() => {
    return Array.from({ length: 10 }).map(() => ({
      name: maskName(randomNames[Math.floor(Math.random() * randomNames.length)]),
    }));
  }, []);

  const [scrollIndex, setScrollIndex] = useState(0);
  const itemHeight = 24;

  useEffect(() => {
    const interval = setInterval(() => {
      setScrollIndex(prev => {
        let next = prev + 1;
        if (next >= donations.length) next = 0;
        return next;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [donations.length]);

  return (
    <div className="flex items-center gap-4 text-white px-6 py-3 lg:bg-gray-950">

    
      <h1 className="lg:text-2xl text-sm font-bold whitespace-nowrap">
        Recommended investment
      </h1>

      
      <div className="flex items-center gap-2 overflow-hidden h-[24px]">

     
        <Bell size={18} />

        
        <div className="h-[24px] overflow-hidden">
          <div
            style={{
              transform: `translateY(-${scrollIndex * itemHeight}px)`,
              transition: "transform 0.6s ease-in-out",
            }}
          >
            {[...donations, ...donations].map((don, idx) => (
              <p
                key={idx}
                style={{ height: "24px", lineHeight: "24px" }}
                className="text-sm whitespace-nowrap m-0 p-0"
              >
                Users {don.name} Created AI strategy trading
              </p>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};



export default function AI() {
  const [open, setOpen] = useState(false);
  const [selectedTradingBot, setSelectedTradingBot] = useState(null);
  const [activeTab, setActiveTab] = useState("working");
  const [loading, setLoading] = useState(false)
  const handleRowClick = (token: any) => {

    setOpen(true);
  };
  return (
    <main className="bg-gray-900 lg:bg-gray-950 min-h-screen overflow-x-hidden">
      <section id="hero" className="flex flex-col lg:items-center">
        <article id="hero1" className="flex flex-col gap-4 lg:gap-y-8 lg:max-w-6xl w-full">
          <div className="w-full">
            <div className="text-gray-300 p-6 md:p-5 space-y-10">
              <div className="grid gap-4 lg:grid-cols-2">
                <div className="text-2xl lg:text-4xl font-extrabold text-white space-y-4 lg:space-y-10">
                  <h1>Trading Bots</h1>
                  <p className="text-sm text-gray-400">Deploy bots for seamless crypto trading automation.Discover and replicate top strategies on Binance.</p>
                  <div className="flex gap-4">
                    <div className="grid gap-3 text-sm text-gray-400">
                      <p>Active Strategies</p>
                      <p>131,181</p>
                    </div>
                    <div className="grid gap-3 text-sm text-gray-400">
                      <p>Total Value</p>
                      <p>$4.4B</p>
                    </div>
                  </div>
                </div>
                <div className="text-white">
                  <div className="bg-gray-800 lg:bg-gray-900  rounded-2xl p-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-white text-sm my-8 grid gap-10 lg:text-xl">
                        <p>Discover Our Trading Bots</p>
                        <div className="text-amber-300 lg:text-sm">
                          <p>Learn More</p>
                        </div>
                      </div>
                      <div className="px-8">
                        <img src="../../assets/images/smart-arbirage-2.svg" alt="" width={200} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="">
                <DonationScrollNoCSS />
              </div>
              <div className="grid lg:grid-cols-3 gap-4  text-white">
                <div className="border border-gray-800 p-4 rounded-2xl space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="grid gap-2 text-white">
                      <h1>BTCUSDC</h1>
                      <div className="flex flex-row gap-2">
                        <p className="text-xs text-gray-400 px-1 border-r border-gray-600">Perp</p>
                        <p className="text-xs text-gray-400 px-1 border-r border-gray-600"><span className="text-green-300">Long 10x</span></p>
                        <p className="text-xs text-gray-400 px-1 flex justify-center"><Users size={15} />10</p>
                      </div>
                    </div>
                    <div className="text-gray-950 justify-self-end-safe">
                      <button className="text-center bg-amber-300 px-4 py-2 rounded"
                        onClick={() => handleRowClick()}
                      >Copy</button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 ">
                    <div className="text-sm">
                      <div className="grid gap-2">
                        <p className="text-gray-400">PNL(USD)</p>
                        <div className="text-xl text-green-300 font-bold">
                          <h1>+9,243.58</h1>
                        </div>
                      </div>
                    </div>
                    <div className="">
                      <Chart />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="text-sm grid gap-2">
                      <p className="text-xs text-gray-400">ROI</p>
                      <p>+16.80%</p>
                    </div>
                    <div className="text-sm grid gap-2 justify-center">
                      <p className="text-xs text-gray-400">Runtime</p>
                      <p>5 d 3h 17m</p>
                    </div>
                    <div className="text-sm grid gap-2 justify-end">
                      <p className="text-xs text-gray-400">Min Investment</p>
                      <p>4,294.00 USDC</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-sm grid gap-2">
                      <p className="text-xs text-gray-400">24/Total Matched Trades</p>
                      <p>278/2351</p>
                    </div>
                    <div className="text-sm grid gap-2 justify-self-end-safe">
                      <p className="text-xs text-gray-400">7D MDD</p>
                      <p>9.08%</p>
                    </div>
                  </div>
                  <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent className="max-w-lg text-white bg-gray-900 border border-gray-800 rounded-2xl">
                      <DialogHeader>
                        <DialogTitle className="text-xl font-semibold">Collateralized Borrowing</DialogTitle>
                        <DialogDescription className="text-gray-400 text-xs">
                          You are using a shared parameter. As market conditions differ, these parameters cannot guarantee the same results.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4">
                        <div className="grid gap-3 text-gray-400 text-sm">
                          <div className="grid gap-3">
                            <div className="flex gap-2 items-center">
                              <h1 className="text-white text-xl">BTCUSDC</h1>
                              <Badge className="bg-gray-800 rounded">Perp</Badge>
                              <p className="text-green-300">888888.6</p>
                              <p className="text-green-300">+0.54%</p>
                            </div>
                            <div className="flex flex-row gap-2">
                              <p className="text-xs text-gray-400 px-1 border-r border-gray-600">Perp</p>
                              <p className="text-xs text-gray-400 px-1 border-r border-gray-600"><span className="text-green-300">Long 10x</span></p>
                              <p className="text-xs text-gray-400 px-1 flex justify-center"><Users size={15} />10</p>
                            </div>
                          </div>
                          <div className="text-white text-sm space-y-2">
                            <h1 className="font-semibold">Basic info</h1>
                            <div className="flex flex-row justify-between">
                              <p className="text-xs text-gray-400">Runtime</p>
                              <p>5d 5h 17m</p>
                            </div>
                            <div className="flex flex-row justify-between">
                              <p className="text-xs text-gray-400">Direction</p>
                              <p>Long</p>
                            </div>
                            <div className="flex flex-row justify-between">
                              <p className="text-xs text-gray-400">24H/Total Matched Trades</p>
                              <p>227/2364</p>
                            </div>
                            <div className="flex flex-row justify-between">
                              <p className="text-xs text-gray-400">7D MDD</p>
                              <p>9.08%</p>
                            </div>
                            <div className="flex flex-row justify-between">
                              <p className="text-xs text-gray-400">Price Range(USDC)</p>
                              <p>78,888.0 - 92,888.0</p>
                            </div>
                            <div className="flex flex-row justify-between">
                              <p className="text-xs text-gray-400">Number of Grids / Mode</p>
                              <p>169 / Arithmetic</p>
                            </div>
                            <div className="flex flex-row justify-between">
                              <p className="text-xs text-gray-400">Profit/grid(fees deducted)</p>
                              <p>0.04% - 0.06%</p>
                            </div>
                          </div>
                        </div>
                        <div className="text-gray-400 text-sm space-y-2">
                          <h1 className="text-white font-semibold">Investment</h1>
                          <div className="">
                            <input type="text" placeholder="Please enter your login password" className="w-full border-gray-800 lg:border-gray-800 border rounded-md px-3 py-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-800 lg:focus:ring-gray-900" />
                          </div>
                          <div className=""></div>
                          <div className="space-y-2">
                            <div className="flex flex-row justify-between">
                              <p className="text-xs text-gray-400">Available</p>
                              <p>0.00 USDC</p>
                            </div>
                            <div className="flex flex-row justify-between">
                              <p className="text-xs text-gray-400">Est. Liq. Price (Long)</p>
                              <p>-</p>
                            </div>
                            <div className="flex flex-row justify-between">
                              <p className="text-xs text-gray-400">Qty/Order</p>
                              <p>-</p>
                            </div>
                            <div className="flex flex-row justify-between">
                              <p className="text-xs text-gray-400">Total Investment</p>
                              <p>-</p>
                            </div>
                            <div className="flex flex-row justify-between">
                              <p className="text-xs text-gray-400">Margin Mode</p>
                              <p>Cross</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <DialogFooter className="mt-4">
                        <Button className="w-full bg-yellow-400 text-black hover:bg-yellow-300 cursor-pointer">
                          Confirm
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="border border-gray-800 p-4 rounded-2xl space-y-4">
                  <div className="grid grid-cols-2 gap-3 justify-between">
                    <div className="grid gap-2 text-white">
                      <h1>BTCUSDC</h1>
                      <div className="flex flex-row gap-2">
                        <p className="text-xs text-gray-400 px-1 border-r border-gray-600">Perp</p>
                        <p className="text-xs text-gray-400 px-1 border-r border-gray-600"><span className="text-green-300">Long 10x</span></p>
                        <p className="text-xs text-gray-400 px-1 flex justify-center"><Users size={15} />10</p>
                      </div>
                    </div>
                    <div className="text-gray-950 justify-self-end-safe">
                      <button className="text-center bg-amber-300 px-4 py-2 rounded">Copy</button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 ">
                    <div className="text-sm">
                      <div className="grid gap-2">
                        <p className="text-gray-400">PNL(USD)</p>
                        <div className="text-xl text-green-300 font-bold">
                          <h1>+9,243.58</h1>
                        </div>
                      </div>
                    </div>
                    <div className="">
                      <Chart />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="text-sm grid gap-2">
                      <p className="text-xs text-gray-400">ROI</p>
                      <p>+16.80%</p>
                    </div>
                    <div className="text-sm grid gap-2 justify-center">
                      <p className="text-xs text-gray-400">Runtime</p>
                      <p>5 d 3h 17m</p>
                    </div>
                    <div className="text-sm grid gap-2 justify-end">
                      <p className="text-xs text-gray-400">Min Investment</p>
                      <p>4,294.00 USDC</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-sm grid gap-2">
                      <p className="text-xs text-gray-400">24/Total Matched Trades</p>
                      <p>278/2351</p>
                    </div>
                    <div className="text-sm grid gap-2 justify-self-end-safe">
                      <p className="text-xs text-gray-400">7D MDD</p>
                      <p>9.08%</p>
                    </div>
                  </div>
                </div>
                <div className="border border-gray-800 p-4 rounded-2xl space-y-4">
                  <div className="grid grid-cols-2 gap-3 justify-between">
                    <div className="grid gap-2 text-white">
                      <h1>BTCUSDC</h1>
                      <div className="flex flex-row gap-2">
                        <p className="text-xs text-gray-400 px-1 border-r border-gray-600">Perp</p>
                        <p className="text-xs text-gray-400 px-1 border-r border-gray-600"><span className="text-green-300">Long 10x</span></p>
                        <p className="text-xs text-gray-400 px-1 flex justify-center"><Users size={15} />10</p>
                      </div>
                    </div>
                    <div className="text-gray-950 justify-self-end-safe">
                      <button className="text-center bg-amber-300 px-4 py-2 rounded">Copy</button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 ">
                    <div className="text-sm">
                      <div className="grid gap-2">
                        <p className="text-gray-400">PNL(USD)</p>
                        <div className="text-xl text-green-300 font-bold">
                          <h1>+9,243.58</h1>
                        </div>
                      </div>
                    </div>
                    <div className="">
                      <Chart />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="text-sm grid gap-2">
                      <p className="text-xs text-gray-400">ROI</p>
                      <p>+16.80%</p>
                    </div>
                    <div className="text-sm grid gap-2 justify-center">
                      <p className="text-xs text-gray-400">Runtime</p>
                      <p>5 d 3h 17m</p>
                    </div>
                    <div className="text-sm grid gap-2 justify-end">
                      <p className="text-xs text-gray-400">Min Investment</p>
                      <p>4,294.00 USDC</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-sm grid gap-2">
                      <p className="text-xs text-gray-400">24/Total Matched Trades</p>
                      <p>278/2351</p>
                    </div>
                    <div className="text-sm grid gap-2 justify-self-end-safe">
                      <p className="text-xs text-gray-400">7D MDD</p>
                      <p>9.08%</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <h1 className="text-white font-semibold text-2xl">AI strategy knowledge</h1>
                <Accordion
                  type="single"
                  collapsible
                  className="w-full"
                  defaultValue="item-1"
                >
                  <AccordionItem value="item-1" className="border-gray-800">
                    <AccordionTrigger className="text-white">What is an infinite grid</AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-4 text-balance">
                      <p>
                        The design of the infinite grid is to capture every possible arbitrage opportunity in the long-term slow bull market.
                      </p>
                      <p>
                        Therefore, the infinite grid discards the upper limit of the grid. In the rising market, you can profit from buying low and selling high through market fluctuations and the rising price of holdings.
                      </p>
                      <p>
                        The lower limit of the grid will protect you from excessive buying in a declining market, and no new orders will be placed below the lowest price and below.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2" className="border-gray-800">
                    <AccordionTrigger className="text-white">What is ChatGPT prediction </AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-4 text-balance">
                      <p>
                        Based on ChatGPT quantitative trading assistant, processing billions of data, strategy optimization, fearless of bull and bear markets, customize your own trading strategy, and continue to realize 'floating profit'
                      </p>
                      <p>
                        All orders are carefully packaged and fully insured. Track your
                        shipment in real-time through our dedicated tracking portal.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3" className="border-gray-800">
                    <AccordionTrigger className="text-white">What is martingale </AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-4 text-balance ">
                      <p>
                        In long and medium-term investment trading, compared with simply holding digital currencies, the Martingale strategy is more flexible.
                        It obtains the lowest price in every fluctuation of digital currencies and waits for the price to rise before selling.
                        It is a strategy that is more suitable for digital currencies.
                      </p>

                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4" className="border-gray-800">
                    <AccordionTrigger className="text-white">What is Heaven and Earth grid </AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-4 text-balance ">
                      <p>
                        Heaven and Earth grid is a spot grid strategy, which is an automated trading strategy of buying low and selling high in a specific price range.
                        The system will help build a series of buying and selling prices.
                      </p>

                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
              <div className="">
                <div className="flex flex-row justify-around space-x-4 w-max">
                  {LoginTab.map(({ symbol, label }) => (
                    <button
                      key={symbol}
                      onClick={() => {
                        setLoading(true);
                        setActiveTab(symbol);
                        setTimeout(() => {
                          setLoading(false);
                        }, 10000); // 60 seconds = 60000 milliseconds
                      }}

                      className={`px- py-1 ${activeTab === symbol
                        ? "text-gray-100 border-b-2 border-b-amber-300"
                        : "hover:text-gray-100"
                        }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                <div className="space-y-7">
                  {loading ? (
                    <div className="flex flex-col items-center justify-center my-4 h-52">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
                      <span className="mt-3 text-gray-400">Loading content...</span>
                    </div>
                  ) : (
                    <>
                      {activeTab === "working" && <Working />}
                      {activeTab === "finished" && <Finished />}


                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </article>
      </section>
    </main>
  );


}
