import FooterSection from "~/components/footer";
import type { Route } from "./+types/[type]";
import { ArrowUpDown } from "lucide-react";
import React from "react";


export async function clientLoader({ params }: Route.LoaderArgs) {
    const CryptoName = params.type;
    if (!CryptoName) {
        throw new Response("Not Found", { status: 404 });
    }

    return { CryptoName };

}

export async function clientAction({ params }: Route.ClientActionArgs) {
    try {

    } catch (error) {


    }
}
const getProgressColor = (currentPrice: number, lowPrice: number, highPrice: number) => {
    console.log("Low Price:", lowPrice);
    console.log("Current Price:", currentPrice);
    console.log("High Price:", highPrice);

    // Calculate the midpoint between low and high
    const midpoint = (lowPrice + highPrice) / 2;

    if (currentPrice < midpoint) return 'from-red-600 to-red-600';
    return 'from-green-500 to-green-400';
};

const ProgressComponent = () => {
    const lowPrice = 94000.73;
    const highPrice = 53.10;
    const currentPrice = 96254.76;

    // Calculate progress percentage
    const progress = ((currentPrice - lowPrice) / (highPrice - lowPrice)) * 100;

    return (
        <div className="flex flex-1 justify-between items-center gap-4">
            <p className="text-sm text-gray-600 whitespace-nowrap">Low: ${lowPrice.toLocaleString()}</p>
            <div className="flex-1">
                <div
                    className="h-1 bg-green-700 rounded-full overflow-hidden"
                >
                    <div
                        className={`h-full bg-gradient-to-r ${getProgressColor(currentPrice, lowPrice, highPrice)} transition-all duration-300`}
                        style={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
                    />
                </div>
            </div>
            <p className="text-sm text-gray-600 whitespace-nowrap">High: ${highPrice.toLocaleString()}</p>
        </div>
    );
}
const cryptocurrencies = [
    {
        symbol: "BTC",
        name: "Bitcoin",
        description: "Bitcoin is one of the most popular cryptocurrencies in the market. First introduced in 2009 by Satoshi Nakamoto, Bitcoin continues to be the top cryptocurrency by market capitalization. Bitcoin paved the way for many existing altcoins in the market and marked a pivotal moment for digital payment solutions. Bitcoin recorded a new all-time high of $111,970 in May 2025, pushing the crypto market capitalization to an impressive $3.5 trillion.",
        additionalInfo: "As the world's first cryptocurrency, Bitcoin has come a long way in terms of its value. Bitcoin crossed $108K, reaching an all-time high in December 2024. There is no physical BTC token so Bitcoin operates as a digital currency. Bitcoin transactions are fully transparent and can't be censored, providing a global, censorship-resistant medium for financial exchange. It's a financial system backed by decentralized network of computers, known as 'nodes', instead of centralized banking or governmental entity, thereby promoting 'decentralization'."
    },
    {
        symbol: "ETH",
        name: "Ethereum",
        description: "Ethereum is a decentralized blockchain platform that enables smart contracts and decentralized applications (dApps) to be built and run without any downtime, fraud, control, or interference from a third party. Ethereum is the second-largest cryptocurrency by market capitalization and has played a significant role in the development of decentralized finance (DeFi).",
        additionalInfo: "Ethereum introduced the concept of smart contracts, which are self-executing contracts with the terms of the agreement directly written into code. The Ethereum network transitioned from Proof-of-Work to Proof-of-Stake in 2022 through 'The Merge', significantly reducing its energy consumption. Ethereum's native cryptocurrency, Ether (ETH), is used to power transactions and computational services on the network."
    }
];
export default function ByMarketPrice({ loaderData }: Route.ComponentProps) {
    const borrowingPeriods = [7, 15, 30, 45, 60, 90, 180];
    return (
        <main className="bg-gray-900 lg:bg-gray-950 overflow-x-hidden">
            <section
                id="hero"
                className="flex flex-col lg:items-center"
            >
                <article id="hero1" className="flex flex-col gap-4 lg:gap-y-8 lg:max-w-6xl xl:min-w-6xl">
                    <div className="lg:max-w-6xl md:max-w-7xl">
                        <div className="text-gray-300 p-6 md:p-5 space-y-7">
                            <div className="flex flex-col lg:flex-row lg:items-center md:items-start lg:justify-between lg:gap-6">
                                <div className="space-y-2 mb-4 lg:space-x-7 lg:w-3/6">
                                    <div className="space-y-2 mb-4 lg:space-x-7">
                                        <h1 className="text-2xl text-white">Bitcoin Price (BTC)</h1>
                                        <div className="lg:flex lg:items-center lg:gap-4">
                                            <h4>BTC to <span className="text-green-500">USD</span>:</h4>
                                            <p className="text-sm font-thin">1 Bitcoin equals $96,254.76 USD<span className="text-red-600">-5.84%</span>1D</p>
                                        </div>
                                    </div>
                                    <div className="text-xl font-bold lg:text-xl space-y-4">
                                        <h1>Bitcoin Chart Performance</h1>
                                    </div>
                                    <div className="space-y-7">
                                        <p className="text-sm text-gray-600">24h Low & High</p>
                                        <ProgressComponent />
                                        <div className="flex flex-2 justify-between">
                                            <p className="text-sm text-gray-600">All Time High</p>
                                            <p className="text-sm text-red-600">$1,920.14</p>
                                        </div>
                                        <div className="flex flex-2 justify-between">
                                            <p className="text-sm text-gray-600">Price Change (1h)</p>
                                            <p className="text-sm text-red-600">-0.18%</p>
                                        </div>
                                        <div className="flex flex-2 justify-between">
                                            <p className="text-sm text-gray-600">Market Cap</p>
                                            <p className="text-sm text-red-600">-0.18%</p>
                                        </div>
                                        <div className="flex flex-2 justify-between">
                                            <p className="text-sm text-gray-600">24h Trading Volume</p>
                                            <p className="text-sm text-red-600">-0.18%</p>
                                        </div>
                                        <div className="flex flex-2 justify-between">
                                            <p className="text-sm text-gray-600">24h Volume / Market Cap</p>
                                            <p className="text-sm text-red-600">-0.18%</p>
                                        </div>
                                        <div className="flex flex-2 justify-between">
                                            <p className="text-sm text-gray-600">Circulating Supply</p>
                                            <p className="text-sm text-red-600">-0.18%</p>
                                        </div>
                                    </div>
                                    <div className="text-xl font-bold lg:text-xl space-y-4 mt-6">
                                        <h1>Bitcoin Market Stats</h1>
                                    </div>
                                    <div className="space-y-7">
                                        <div className="flex flex-2 justify-between">
                                            <p className="text-sm text-gray-600">Popularity</p>
                                            <p className="text-sm ">High</p>
                                        </div>
                                        <div className="flex flex-2 justify-between">
                                            <p className="text-sm text-gray-600">Market Rank</p>
                                            <p className="text-sm">1</p>
                                        </div>
                                        <div className="flex flex-2 justify-between">
                                            <p className="text-sm text-gray-600">Market Cap</p>
                                            <p className="text-sm">$1,920.14B</p>
                                        </div>
                                        <div className="flex flex-2 justify-between">
                                            <p className="text-sm text-gray-600">24h Trading Volume</p>
                                            <p className="text-sm">$128.98B</p>
                                        </div>
                                        <div className="flex flex-2 justify-between">
                                            <p className="text-sm text-gray-600">24h Volume / Market Cap</p>
                                            <p className="text-sm">0.0672</p>
                                        </div>
                                        <div className="flex flex-2 justify-between">
                                            <p className="text-sm text-gray-600">Circulating Supply</p>
                                            <p className="text-sm">19.95M BTC</p>
                                        </div>
                                    </div>

                                </div>
                                <div className="border border-gray-700 rounded-lg p-4 lg:p-6 w-full md:w-[400px]">
                                    <div className="flex flex-col-2 gap-4 justify-between lg:items-center lg:flex-row">
                                        <button>Buy BTC</button>
                                        {/* <button>Sell BTC</button> */}
                                    </div>
                                    <div className="border border-gray-700 rounded-lg p-4 lg:p-6 mt-4 lg:space-y-5">
                                        <div className="flex flex-col-2 justify-between lg:items-center lg:flex-row">
                                            <p>You Buy</p>
                                            <p className="border-none rounded bg-gray-950 text-gray-100 w-[100px] justify-center items-center align-middle p-1 lg:bg-gray-900">BTC</p>
                                        </div>
                                        <input type="text" className="w-full border-gray-300 rounded-md px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-900 lg:focus:ring-gray-950" />
                                    </div>
                                    <div className="pt-4 lg:pt-6 text-sm font-thin">
                                        <p className="p-2 flex"><ArrowUpDown className="border-none mr-2 rounded-2xl p-1 bg-gray-950" />1 BTC ≈ USD $96,254.76</p>
                                    </div>
                                    <div className="border border-gray-700 rounded-lg p-4 lg:p-6 mt-4 lg:space-y-5">
                                        <div className="flex flex-col-2 justify-between lg:items-center lg:flex-row">
                                            <p>You Spend</p>
                                            <p className="border-none rounded bg-gray-950 text-gray-100 w-[100px] justify-center items-center align-middle p-1 lg:bg-gray-900">USD</p>
                                        </div>
                                        <input type="text" className="w-full border-gray-300 rounded-md px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-900 lg:focus:ring-gray-950" />
                                    </div>
                                    {/* <div className="text-center mt-6 text-gray-900 font-bold">
                                        <button className="bg-amber-300 w-full p-3 rounded">Buy BTC</button>
                                    </div> */}
                                </div>
                            </div>
                            <div className="space-y-2 mb-4 lg:space-x-7">
                                <div className="text-2xl font-bold lg:text-2xl space-y-4">
                                    <h1>Price of Bitcoin Today</h1>
                                    <p className="text-sm font-thin">The live price of Bitcoin
                                        is $96,254.76 per (BTC / USD) with a current market cap of
                                        $1,920.14B USD. 24-hour trading volume is $128.98B USD.
                                        BTC to USD price is updated in real-time.
                                        Bitcoin is -5.84% in the last 24 hours with a circulating supply of 19.95M.
                                    </p>
                                </div>
                            </div>
                            <div className="space-y-2 mb-4 lg:space-x-7">
                                <div className="text-xl font-bold lg:text-xl space-y-4">
                                    <h1>BTC Price History USD</h1>
                                </div>
                                <table className="min-w-full text-sm">
                                    <thead className="text-sm font-thin text-gray-400">
                                        <tr className="text-sm font-thin">
                                            <th className="text-left px-4 py-2">Date Comparison</th>
                                            <th className="text-right px-4 py-2">Amount Change	</th>
                                            <th className="text-right px-4 py-2">% Change</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {borrowingPeriods.map((period) => (
                                            <tr key={period} className="text-amber-50 border-gray-700 even:bg-gray-800 hover:bg-gray-700 hover:rounded" >
                                                <td className="items-center px-4 py-3">
                                                    {period} Days Ago
                                                </td>
                                                <td className="text-right px-4 py-3">
                                                    $-5,970.81
                                                </td>
                                                <td className="text-right px-4 py-3"> -0.249%
                                                </td>
                                            </tr>
                                        ))}


                                    </tbody>
                                </table>
                            </div>
                            <div className="space-y-2 mb-4 lg:space-y-7">
                                {cryptocurrencies
                                    .filter(crypto => crypto.symbol === loaderData.CryptoName)
                                    .map((crypto) => (
                                        <div key={crypto.symbol}>
                                            <h1 className="text-xl text-white">What is {crypto.name} ({crypto.symbol})?</h1>
                                            <p>{crypto.description}</p>
                                            <p>{crypto.additionalInfo}</p>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </article>
            </section>
            <FooterSection />
        </main>
    )
}