import FooterSection from "~/components/footer";
import type { Route } from "./+types/[type]";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { useState, useEffect } from "react";
import miniUsdt from "assets/coins/miniUsdt.png";
import miniBtc from "assets/coins/miniBtc.png";
import miniEth from "assets/coins/miniEth.png";
import miniXrp from "assets/coins/miniXrp.png";
import miniLtc from "assets/coins/miniLtc.png";
import btcEth from "assets/coins/btc_eth.png";
import { useFetcher } from "react-router";

interface LoaderDataParams {
    type: string | null;
}

export async function clientLoader({ params }: { params: { type?: string } }): Promise<LoaderDataParams> {
    return { type: params.type || null };
}
export async function clientAction({ params, request }: Route.ClientActionArgs) {
    try {
        const formData = await request.formData();
        const intent = formData.get("intent");
        const amount = formData.get("amount");
        const asset = formData.get("asset");

        if (intent === "subscribe") {
            // Your subscription logic here
            console.log("Subscribing with:", { amount, asset });

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            return {
                success: true,
                message: "Subscription successful!",
                data: { amount, asset }
            };
        }

        return { success: false, error: "Unknown action" };
    } catch (error) {
        console.error("Error in subscription:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Subscription failed"
        };
    }
}
interface Asset {
    symbol: string;
    balance: number;
    name: string;
    coin: string;
}

export default function AnnouncementPage({ loaderData }: { loaderData: LoaderDataParams }) {
    const [selectedCurrency, setSelectedCurrency] = useState("USDT");
    const [depositAddress, setDepositAddress] = useState("");
    const [selectedNetwork, setSelectedNetwork] = useState("");
    const [isSubscribing, setIsSubscribing] = useState(false);
    const [subscriptionAmount, setSubscriptionAmount] = useState('');
    const [selectedAsset, setSelectedAsset] = useState(loaderData?.type || 'USDT');
    const [useAutoSubscribe, setUseAutoSubscribe] = useState(true);
    const [loading, setLoading] = useState(false);
    const fetcher = useFetcher();

    const availableAssets: Asset[] = [
        { symbol: 'USDT', balance: 0, name: 'Tether', coin: miniUsdt },
        { symbol: 'BUSD', balance: 800.00, name: 'Binance USD', coin: miniUsdt },
        { symbol: 'BTC', balance: 0.05, name: 'Bitcoin', coin: miniBtc },
        { symbol: 'ETH', balance: 2.5, name: 'Ethereum', coin: miniEth },
        { symbol: 'XRP', balance: 1500, name: 'Ripple', coin: miniXrp },
        { symbol: 'LTC', balance: 20, name: 'Litecoin', coin: miniLtc },
        { symbol: 'BTC-ETH', balance: 1.2, name: 'BTC-ETH Combo', coin: btcEth },
    ];

    interface DepositItem {
        crypto: string;
        amount: string;
        status: string;
        time: {
            date: Date;
        };
    }

    const DepositData: DepositItem[] = [];
    const currentAsset = availableAssets.find(a => a.symbol === selectedAsset);
    const hasZeroBalance = currentAsset?.balance === 0;

    const handleCurrencyChange = (value: string) => {
        setSelectedCurrency(value);

        setSelectedAsset(value);
    };

    const handleMaxAmount = () => {
        if (hasZeroBalance) {
            setSubscriptionAmount('0');
            return;
        }

        const maxBalance = currentAsset?.balance || 0;
        setSubscriptionAmount(maxBalance.toString());
    };

    const canSubscribe = () => {
        if (isSubscribing) return false;
        if (!subscriptionAmount) return false;
        if (hasZeroBalance) return false;

        const amount = parseFloat(subscriptionAmount);
        return !isNaN(amount) && amount > 0;
    };


    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;


        if (hasZeroBalance) {
            setSubscriptionAmount('0');
            return;
        }


        const numericValue = parseFloat(value);
        const currentBalance = currentAsset?.balance || 0;

        if (!isNaN(numericValue) && numericValue > currentBalance) {
            setSubscriptionAmount(currentBalance.toString());
            return;
        }


        if (value === '' || (!isNaN(numericValue) && numericValue >= 0)) {
            setSubscriptionAmount(value);
        }
    };

    return (
        <main className="bg-gray-900 lg:bg-gray-950 min-h-screen overflow-x-hidden">
            <section id="hero" className="flex flex-col lg:items-center">
                <article id="hero1" className="flex flex-col gap-4 lg:gap-y-8 lg:max-w-6xl w-full">
                    <div className="w-full">
                        <div className="text-gray-300 p-6 md:p-5 space-y-10">
                            <div className="grid lg:grid-cols-2 gap-4">
                                <div className="text-white text-lg space-y-4">
                                    <h1 className="lg:text-2xl font-bold">Introducing Allora ({loaderData.type}) on Web3 HoDLer Airdrops! Earn ALLO With Retroactive BNB Simple Earn Subscriptions </h1>
                                    <div className="text-sm text-gray-400 gap-2 lg:flex space-y-4">
                                        <p className="">Published on {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}</p>
                                        <p>Updated on {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}</p>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={miniBtc}
                                                alt="btc"
                                                width={20}
                                                height={20}
                                                className="rounded-full"
                                            />
                                            <div className="flex flex-col">
                                                <p className="text-sm text-white">ALLO/USDC 0.15 <span className="text-red-500">-5.3342%</span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Currency Selection */}
                                <div className="text-white space-y-4">
                                    <fetcher.Form method="post">
                                        <div className="">
                                            <Select value={selectedCurrency} onValueChange={handleCurrencyChange}>
                                                <SelectTrigger
                                                    className="w-full bg-gray-900 border border-gray-800 rounded-lg py-7 px-3 text-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900 hover:bg-gray-700"
                                                    aria-label="Select Currency"
                                                >
                                                    <SelectValue placeholder="Select Currency" />
                                                </SelectTrigger>
                                                <SelectContent className="bg-gray-800 border border-gray-700 text-white">
                                                    {availableAssets.map((c) => (
                                                        <SelectItem
                                                            key={c.symbol}
                                                            value={c.symbol}
                                                            className="hover:bg-gray-700 rounded cursor-pointer transition-colors"
                                                        >
                                                            <div className="flex items-center gap-2">

                                                                <img
                                                                    src={c.coin}
                                                                    alt={c.symbol}
                                                                    width={30}
                                                                    height={30}
                                                                    className="rounded-full"
                                                                />
                                                                <span>{c.name} ({c.symbol})</span>
                                                            </div>
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <div className="mb-4">
                                                <label className="block text-gray-300 mb-2 font-semibold">Subscription Amount</label>
                                                <div className="relative">
                                                    <input
                                                        type="number"
                                                        value={subscriptionAmount}
                                                        onChange={handleAmountChange}
                                                        name="amount"
                                                        min="0"
                                                        step="0.01"
                                                        placeholder="0.00"
                                                        disabled={hasZeroBalance}
                                                        className={`w-full bg-gray-800 border rounded-lg py-3 px-4 text-white text-lg font-semibold focus:outline-none ${hasZeroBalance
                                                            ? 'opacity-50 cursor-not-allowed border-gray-600'
                                                            : 'focus:border-gray-900 border-gray-700'
                                                            }`}
                                                    />
                                                    <div className="absolute right-10 top-1/2 transform -translate-y-1/2">
                                                        <span className={`font-semibold ${hasZeroBalance ? 'text-gray-500' : 'text-gray-400'
                                                            }`}>
                                                            {selectedAsset}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="flex justify-between text-sm mt-2">
                                                    <span className={`${hasZeroBalance ? 'text-gray-500' : 'text-gray-400'
                                                        }`}>
                                                        Available: {currentAsset?.balance} {selectedAsset}
                                                    </span>
                                                    <button
                                                        type="button"
                                                        onClick={handleMaxAmount}
                                                        disabled={hasZeroBalance}
                                                        className={`${hasZeroBalance
                                                            ? 'text-gray-500 cursor-not-allowed'
                                                            : 'text-gray-400 hover:text-amber-300'
                                                            }`}
                                                    >
                                                        MAX
                                                    </button>
                                                </div>


                                                {hasZeroBalance && (
                                                    <div className="text-red-400 text-sm mt-2 flex items-center">
                                                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                        </svg>
                                                        Insufficient balance. Please select another asset.
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
                                                    <label htmlFor="autoSubscribe" className="text-gray-300 text-sm">
                                                        I have read and agree to the Terms and Conditions
                                                    </label>
                                                </div>
                                            </div>
                                            {fetcher.data && (
                                                <div className={`mt-4 p-3 rounded ${fetcher.data.success
                                                    ? 'bg-green-900 text-green-300'
                                                    : 'bg-red-900 text-red-300'
                                                    }`}>
                                                    {fetcher.data.success ? fetcher.data.message : fetcher.data.error}
                                                </div>
                                            )}
                                            <div className="mt-6 flex items-center">
                                                <button
                                                    name="intent"
                                                    value="subscribe"
                                                    type="submit"
                                                    disabled={!canSubscribe()}
                                                    className={`w-full py-3 px-4 rounded-lg font-semibold transition duration-200 ${!canSubscribe()
                                                        ? 'bg-amber-300 text-gray-950 cursor-not-allowed opacity-50'
                                                        : 'bg-amber-300 hover:bg-amber-300 text-gray-950'
                                                        }`}
                                                >
                                                    {isSubscribing ? (
                                                        <div className="flex items-center justify-center">
                                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-950 mr-2"></div>
                                                            Processing...
                                                        </div>
                                                    ) : hasZeroBalance ? (
                                                        'Insufficient Balance'
                                                    ) : !subscriptionAmount || parseFloat(subscriptionAmount) <= 0 ? (
                                                        'Enter Amount'
                                                    ) : (
                                                        'Confirm Subscription'
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    </fetcher.Form>
                                </div>
                            </div>
                            <div className="space-y-6 text-white">
                                <div>
                                    <h2 className="text-2xl font-bold mb-6">ALLO HODLer Airdrops Details:</h2>
                                    <ul className="grid md:grid-cols-2 gap-4 text-gray-300 font-thin text-sm lg:font-medium text-gray-400">
                                        <li className="flex items-start gap-3">
                                            <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                                            <span>Token Name: Allora ({loaderData.type})</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                                            <span>Total Token Supply at Genesis: 785,499,999 ({loaderData.type})</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                                            <span>Max Token Supply: 1,000,000,000 {loaderData.type}</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                                            <span>HODLer Airdrops Token Rewards: 15,000,000 {loaderData.type} (1.50% of max total token supply)</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                                            <span>An additional 20,000,000 {loaderData.type} will be allocated to future marketing campaigns 6 months later. Details will be shown in separate announcements.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                                            <span>Circulating Supply upon Listing on Binance: 200,500,000 {loaderData.type} (20.05% of max total token supply)</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                                            <span>Listing Fee: 0</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                                            <span>Research Report: Allora ({loaderData.type}) (will be available within 48 hours of publishing this announcement) </span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                                            <span>BNB Holding Hard Cap: User’s Average BNB Holding / Total Average BNB Holding * 100% ≤ 4% (If the holding ratio is greater than 4%, the BNB holding ratio will be calculated as 4%)</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="space-y-6 text-white">
                                <h1 className="text-2xl font-bold">Introducing Web3 HODLer Airdrops:</h1>
                                <p className="text-sm font-thin lg:font-medium lg:text-gray-400">Web3 HODLer Airdrops is a program that rewards BNB holders with token airdrops based on historical snapshots of their BNB balances.
                                    By subscribing BNB to Advanced Earn, users are automatically eligible for HODLer Airdrops (as well as Advanced Earn rewards).
                                    By subscribing BNB to Advanced Earn, users are automatically eligible for HODLer Airdrops and Advanced Earn rewards.</p>
                                <p className="text-sm font-thin lg:font-medium lg:text-gray-400">Unlike other earning methods that require ongoing actions, HODLer Airdrops reward users retroactively, offering a simple way to earn additional tokens.
                                    By subscribing BNB to Simple Earn products and/or Advanced Earn, users can automatically qualify for token rewards.</p>
                            </div>
                            <div className="space-y-6 text-white">
                                <h1>Project Links:</h1>
                                <ul className="grid gap-4 text-gray-300 font-thin text-sm lg:font-medium text-gray-400">
                                    <li className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                                        <a href="https://www.allora.network/" target="_blank" className="text-amber-300">Website</a>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                                        <a href="https://research.assets.allora.network/allora.0x10001.pdf" target="_blank" className="text-amber-300">Whitepaper</a>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                                        <a href="https://x.com/AlloraNetwork" target="_blank" className="text-amber-300">X</a>
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </div>
                </article>
            </section>
            <FooterSection />
        </main>
    );
}