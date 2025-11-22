import { ArrowLeft, ArrowLeftRight } from "lucide-react";
import { useState } from "react";

interface TransferProps {
    setActiveTab: (tab: string) => void;
    selectedToken: any;
    onExitTransfer: () => void;
}
const currencies = [
    { code: "USDT", label: "Tether", icon: <img src="../../assets/coins/miniUsdt.png" width={30} /> },
    { code: "BTC", label: "Bitcoin", icon: <img src="../../assets/coins/miniBtc.png" width={30} /> },
    { code: "ETH", label: "Ethereum", icon: <img src="../../assets/coins/miniEth.png" width={30} /> },
];
const date = new Date();
const DepositData = [
    { time: { date }, crypto: 'usdt', bill: 'Bank card', amount: '200', status: 'processing' },
    { time: { date }, crypto: 'usdt', bill: 'Bank card', amount: '200', status: 'Review' },
    { time: { date }, crypto: 'usdt', bill: 'Bank card', amount: '200', status: 'Rejected' },
    { time: { date }, crypto: 'usdt', bill: 'Bank card', amount: '200', status: 'completed' },
];
const accounts = ["Spot Account", "Asset Account", "Margin Account"];
export default function Transfer({ setActiveTab, selectedToken, onExitTransfer }: TransferProps) {
    const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);
    const [fromAccount, setFromAccount] = useState(accounts[0]);
    const [toAccount, setToAccount] = useState(accounts[1]);
    const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
    const [showFromDropdown, setShowFromDropdown] = useState(false);
    const [showToDropdown, setShowToDropdown] = useState(false);
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);
    const swapAccounts = () => {
        setFromAccount(toAccount);
        setToAccount(fromAccount);
    };
    return (
        <div className=" text-gray-300">
            <div className="flex items-center mb-6 cursor-pointer" onClick={onExitTransfer}>
                <ArrowLeft className="mr-2" />
                <span className="text-white font-semibold">Back to Asset Overview</span>
            </div>
            <div className="flex flex-row gap-3 text-gray-300">
                <div className="border border-gray-900 p-6 rounded-2xl w-full basis-128">
                    <div className=" rounded-lg text-white font-sans space-y-4">

                        <h2 className="text-white text-lg font-normal">Transfer</h2>
                        {/* Select currency */}
                        <div className="relative">
                            <button
                                onClick={() => {
                                    setShowCurrencyDropdown(!showCurrencyDropdown);
                                    setShowFromDropdown(false);
                                    setShowToDropdown(false);
                                }}
                                className="flex justify-between items-center w-full px-4 py-2 rounded-full border border-gray-600 text-white text-sm"
                            >
                                <span className="text-gray-400">Select currency</span>
                                <div className="flex items-center space-x-2">
                                    {selectedCurrency.icon}
                                    <span className="font-semibold">{selectedCurrency.code}</span>
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        viewBox="0 0 24 24"
                                    >
                                        <polyline points="6 9 12 15 18 9" />
                                    </svg>
                                </div>
                            </button>
                            {showCurrencyDropdown && (
                                <ul className="absolute z-20 mt-2 w-full bg-gray-900 border border-gray-600 rounded-lg max-h-48 overflow-auto">
                                    {currencies.map((currency) => (
                                        <li
                                            key={currency.code}
                                            onClick={() => {
                                                setSelectedCurrency(currency);
                                                setShowCurrencyDropdown(false);
                                            }}
                                            className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-800 rounded-lg"
                                        >
                                            {currency.icon}
                                            <span>{currency.code} - {currency.label}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* From & To selection */}
                        <div className="flex items-center justify-between space-x-2">
                            {/* From */}
                            <div className="relative flex-1">
                                <button
                                    onClick={() => {
                                        setShowFromDropdown(!showFromDropdown);
                                        setShowCurrencyDropdown(false);
                                        setShowToDropdown(false);
                                    }}
                                    className="flex items-center space-x-2 px-4 py-2 rounded-full border border-gray-600 text-white text-sm w-full"
                                >
                                    <span className="text-gray-400">From</span>
                                    <span className="font-semibold">{fromAccount}</span>
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        viewBox="0 0 24 24"
                                    >
                                        <polyline points="6 9 12 15 18 9" />
                                    </svg>
                                </button>
                                {showFromDropdown && (
                                    <ul className="absolute z-20 mt-2 w-full bg-gray-900 border border-gray-600 rounded-lg max-h-40 overflow-auto">
                                        {accounts.map((account) => (
                                            <li
                                                key={account}
                                                onClick={() => {
                                                    setFromAccount(account);
                                                    setShowFromDropdown(false);
                                                    // If same as toAccount, swap automatically to avoid confusion
                                                    if (account === toAccount) {
                                                        setToAccount(fromAccount);
                                                    }
                                                }}
                                                className="px-4 py-2 cursor-pointer hover:bg-gray-800 rounded-lg"
                                            >
                                                {account}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                            {/* Swap arrow */}
                            <button
                                onClick={swapAccounts}
                                className="p-2 rounded-full text-white border border-gray-600 hover:bg-gray-800 flex items-center justify-center"
                                title="Swap"
                            >
                                <ArrowLeftRight />
                            </button>

                            {/* To */}
                            <div className="relative flex-1">
                                <button
                                    onClick={() => {
                                        setShowToDropdown(!showToDropdown);
                                        setShowCurrencyDropdown(false);
                                        setShowFromDropdown(false);
                                    }}
                                    className="flex items-center space-x-2 px-4 py-2 rounded-full border border-gray-600 text-white text-sm w-full"
                                >
                                    <span className="text-gray-400">To</span>
                                    <span className="font-semibold">{toAccount}</span>
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        viewBox="0 0 24 24"
                                    >
                                        <polyline points="6 9 12 15 18 9" />
                                    </svg>
                                </button>
                                {showToDropdown && (
                                    <ul className="absolute z-20 mt-2 w-full bg-gray-900 border border-gray-600 rounded-lg max-h-40 overflow-auto">
                                        {accounts.map((account) => (
                                            <li
                                                key={account}
                                                onClick={() => {
                                                    setToAccount(account);
                                                    setShowToDropdown(false);
                                                    // Swap if needed to avoid duplicate selections
                                                    if (account === fromAccount) {
                                                        setFromAccount(toAccount);
                                                    }
                                                }}
                                                className="px-4 py-2 cursor-pointer hover:bg-gray-800 rounded-lg"
                                            >
                                                {account}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>

                        {/* Transfer amount */}
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Transfer amount"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="w-full py-3 px-4 bg-gray-950 lg:bg-gray-900 lg:border-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 lg:focus:ring-gray-950 rounded-2xl"
                            />
                            <div className="absolute top-2 right-4 flex items-center space-x-1 text-yellow-400 cursor-pointer select-none">
                                <span>Please enter </span>
                                <span className="font-semibold" onClick={() => setAmount("0")}>
                                    Transfer all
                                </span>
                                {selectedCurrency.icon}
                            </div>
                        </div>

                        {/* Available */}
                        <p className="text-gray-400 text-sm">
                            Available <span className="text-white font-semibold">0 {selectedCurrency.code}</span>
                        </p>

                        {/* Confirm button */}
                        <button className="w-full py-3 rounded-full bg-yellow-400 text-black font-semibold">
                            Confirm transfer
                        </button>
                    </div>
                </div>
            </div>
            <div className="text-white py-4">
                <div className="lg:border p-6 lg:border-gray-600 lg:rounded-2xl">
                    <div className="">
                        <h1 className="text-xl">Transfer Record</h1>
                    </div>
                    <div className="grid grid-cols-5 p-2 text-sm font-semibold bg-gray-800  lg:bg-gray-950 pb-5 mb-4 text-gray-600 py-3">
                        <div>Time of occurrence</div>
                        <div className="text-center">Crypto</div>
                        <div className="text-center">Amount</div>
                        <div className="text-center">From</div>
                        <div className="text-center">To</div>
                    </div>
                    {loading && (
                        <div className="flex flex-col items-center justify-center my-4 h-52">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
                            <span className="mt-3 text-gray-400">Loading content...</span>
                        </div>
                    )}
                    {!loading && (
                        <>
                            {DepositData.length > 5 ? (
                                <>
                                    {DepositData.map((r) => (
                                        <div key={r.crypto} className="grid grid-cols-5 border p-2 border-gray-700 py-2 rounded-2xl gap-2 mt-3 text-center items-center">
                                            <div className="">
                                                {r.time.date.toLocaleDateString()} {r.time.date.toLocaleTimeString()}
                                            </div>
                                            <div className="text-center">{r.crypto}</div>
                                            <div className="text-center">{r.bill}</div>
                                            <div className="text-center">{r.amount}</div>
                                            <div className="text-center">-</div>
                                        </div>
                                    ))}
                                </>
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
            </div>
        </div>
    );
}