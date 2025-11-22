import { EqualApproximately, Eye, EyeOff, MoreVertical, SearchIcon, SquareArrowOutDownRight, SquareArrowOutUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "~/components/ui/card"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "~/components/ui/select";
import { Input } from "~/components/ui/input";
import { ScrollArea } from "~/components/ui/scroll-area"
import { Separator } from "~/components/ui/separator"
import { Button } from "~/components/ui/button";
import { ButtonGroup } from "../ui/button-group";
interface DateConfigItem {
    label: string;
    value: string;
    days: number;
}

const dateConfig: DateConfigItem[] = [
    { label: 'One Day', value: '1day', days: 1 },
    { label: 'A Week', value: '1week', days: 7 },
    { label: 'One Month', value: '1month', days: 30 },
    { label: 'One Year', value: '1year', days: 365 }
];

interface AssetData {
    name: string;
    value: string;
    today: string;
    proportion: string;
}
const allTokensData = [
    { symbol: "BTC", name: "Bitcoin", price: "0", interests: "0.00%", icon: <img src="../../assets/coins/miniBtc.png" width={40} /> },
    { symbol: "ETH", name: "Ethereum", price: "0", interests: "0.00%", icon: <img src="../../assets/coins/miniEth.png" width={40} /> },
    { symbol: "XRP", name: "XRP", price: "0", interests: "0.00%", icon: <img src="../../assets/coins/miniXrp.png" width={40} /> },
    { symbol: "LTC", name: "lightcoin", price: "0", interests: "0.00%", icon: <img src="../../assets/coins/miniLtc.png" width={40} /> },
    { symbol: "TRX", name: "tron", price: "0", interests: "0.00%", icon: <img src="../../assets/coins/miniTrx.png" width={40} /> },
];
interface SportAccountProps {
    setActiveTab: (tab: string) => void;
    selectedToken: any;
    onTransferClick: (token: any) => void;
}
const SpotAccount = ({ setActiveTab, selectedToken,onTransferClick }: SportAccountProps) => {
    const [isPriceVisible, setIsPriceVisible] = useState(true);
    const [selectedRange, setSelectedRange] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [loading, setLoading] = useState(false);
    const [apiData, setApiData] = useState(null);
    const hiddenPrice = '•••••';
    const totalPrice = '$0';
    const togglePriceVisibility = () => {
        setIsPriceVisible(!isPriceVisible);
    };
    const handleRangeChange = (value: string) => {
        setSelectedRange(value);

        const selectedConfig = dateConfig.find(item => item.value === value);
        if (selectedConfig) {
            const end = new Date();
            const start = new Date();
            start.setDate(end.getDate() - selectedConfig.days);

            const formatDate = (date: Date) => date.toISOString().split('T')[0];

            setStartDate(formatDate(start));
            setEndDate(formatDate(end));
        }
    };
    const fetchData = async (start: string, end: string) => {
        if (!start || !end) return;
        setLoading(true);
        try {
            const response = await fetch(`/api/asset-data?startDate=${start}&endDate=${end}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await response.json();
            setApiData(data);
            console.log('API Response:', data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(true);
        }
    };
    useEffect(() => {
        if (startDate && endDate) {
            fetchData(startDate, endDate);
        }
    }, [startDate, endDate]);
    return (
        <>
            <div className="lg:border border-gray-700 rounded-2xl lg:p-4 text-white">
                <div className="space-y-7 text-xl">
                    <div className="text-lg flex gap-2">
                        <h2 className="">Spot Account Valuation :{isPriceVisible ? totalPrice : hiddenPrice}&nbsp;<span className="text-sm">USDT</span></h2>
                        <span className="p-1 text-gray-500"><EqualApproximately size={20} /></span>
                        <span className="text-sm p-1 text-gray-500">{isPriceVisible ? totalPrice : hiddenPrice} USD</span>
                        <div className="">
                            <button
                                className="eye-toggle"
                                onClick={togglePriceVisibility}
                                aria-label={isPriceVisible ? 'Hide price' : 'Show price'}
                            >
                                {isPriceVisible ? (
                                    <Eye size={24} className="eye-icon open" />
                                ) : (
                                    <EyeOff size={24} className="eye-icon" />
                                )}
                            </button>
                        </div>
                    </div>

                </div>
                <div className="space-y-7 text-white py-4">
                    <div className="grid lg:grid-cols-2 gap-2">
                        <Card className="@container/card bg-opacity-50 bg-gradient-to-b from-gray-950 via-gray-800 to-gray-900 border-gray-500 text-white">
                            <CardHeader>
                                <CardDescription>Today's profit and loss</CardDescription>
                                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-2xl">
                                    <div className="flex">
                                        $1,250.00 <span className="text-sm p-2">USDT </span>
                                        <span className="p-2 text-gray-500"><EqualApproximately size={20} /></span>
                                        <span className="text-sm p-2 text-gray-500">0 USD</span>
                                    </div>
                                </CardTitle>
                            </CardHeader>
                        </Card>
                        <Card className="@container/card bg-opacity-50 bg-gradient-to-b from-gray-950 via-gray-800 to-gray-900 border-gray-500 text-white">
                            <CardHeader>
                                <CardDescription>30-day profit and loss</CardDescription>
                                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-2xl">
                                    <div className="flex">
                                        $1,250.00 <span className="text-sm p-2">USDT </span>
                                        <span className="p-2 text-gray-500"><EqualApproximately size={20} /></span>
                                        <span className="text-sm p-2 text-gray-500">0 USD</span>
                                    </div>
                                </CardTitle>
                            </CardHeader>
                        </Card>
                    </div>
                </div>
                <div className="space-y-7 p-2">
                    <div className="grid grid-cols-2 lg:flex lg:flex-row gap-3 text-white">
                        <div className="hidden lg:block">
                            <button className='lg:border-gray-900 border p-2 lg:bg-gray-900 rounded-2xl hover:bg-gray-800 transition-colors flex gap-2 text-sm'>
                                <SquareArrowOutDownRight />Buy coins quickly
                            </button>
                        </div>
                        <div className="">
                            <button className='border-gray-600 lg:border-gray-900 border p-2 lg:bg-gray-900 rounded-2xl hover:bg-gray-800 transition-colors flex gap-2 text-sm'>
                                <SquareArrowOutUpRight />Spot Transaction Record
                            </button>
                        </div>
                        <div className="justify-self-end-safe">
                            <Select value={selectedRange} onValueChange={handleRangeChange}>
                                <SelectTrigger className="w-[200px] bg-gray-900 border-gray-700 rounded-2xl ">
                                    <SelectValue placeholder="Select Range" />
                                </SelectTrigger>
                                <SelectContent className='bg-gray-900 border-gray-700 text-white'>
                                    {dateConfig.map((item) => (
                                        <SelectItem key={item.value} value={item.value}>
                                            {item.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
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
            </div>
            <div className="p-4 text-white">
                <div className="space-y-7 text-white">
                    <div className="grid grid-cols-2 justify-center items-center">
                        <div className="justify-start">
                            <h2 className="text-xl">Cryptocurrency</h2>
                        </div>
                        <div className="hidden lg:justify-end lg:flex">
                            <ButtonGroup>
                                <Input placeholder="Search..." className="flex-1 bg-gray-800 border-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 lg:focus:ring-gray-950 rounded-2xl" />
                                <Button aria-label="Search">
                                    <SearchIcon />
                                </Button>
                            </ButtonGroup>
                        </div>
                    </div>
                </div>
                <div className="space-y-7 py-4">

                    <div className="lg:p-4">
                        <div className="grid grid-cols-4 text-sm font-semibold bg-gray-800 lg:bg-gray-950 border-b border-gray-700 pb-5 mb-4 p-4 text-gray-400">
                            <div>Crypto</div>
                            <div className="text-center">Rights and interests</div>
                            <div className="text-center">Proportion</div>
                            <div className="text-right">Operation</div>
                        </div>
                        <ScrollArea className="h-72 w-full">
                            {allTokensData.map((t) => (
                                <div key={t.symbol} className="grid grid-cols-4 border p-2 border-gray-700 py-2 rounded-2xl gap-2 mt-3">
                                    <div className="flex flex-col-2 gap-2">
                                        <div className="">
                                            {t.icon}
                                        </div>
                                        <div className="flex flex-col">
                                            <span>{t.symbol}</span>
                                            <span className="text-sm text-gray-400">{t.name}</span>
                                        </div>
                                    </div>
                                    <div className="text-center">{t.price}</div>
                                    <div className="text-center">{t.interests}</div>
                                    <div className="text-right">
                                        <div className="hidden sm:hidden md:hidden lg:flex gap-2">
                                            <div className="">
                                                <button
                                                    className="bg-amber-300 p-2 rounded text-gray-900 hover:bg-amber-300 transition-colors cursor-pointer"
                                                    onClick={() => setActiveTab('transfer')}
                                                >
                                                    Trading
                                                </button>
                                            </div>
                                            <div className="">
                                                <button
                                                    className="bg-gray-900 p-2 rounded text-white hover:bg-gray-800 transition-colors cursor-pointer"
                                                    onClick={() => setActiveTab('transfer')}
                                                >
                                                    Transfer
                                                </button>
                                            </div>
                                        </div>
                                        <div className="mb-1 lg:hidden flex justify-end">
                                            <div className="relative inline-block text-left group">
                                                <button className="inline-flex justify-center w-full rounded-md border border-gray-900 shadow-sm px-4 py-2 bg-gray-900 text-sm text-gray-700 hover:bg-gray-900 focus:outline-none">
                                                    <MoreVertical />
                                                </button>

                                                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-gray-800 ring-1 ring-gray-800 ring-opacity-5 focus:outline-none opacity-0 invisible transition-all duration-200 transform -translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 z-20">
                                                    <div className="py-1 grid" role="none">
                                                        <button
                                                            className="bg-gray-800 p-2 rounded text-white hover:bg-gray-800 transition-colors cursor-pointer border-b border-gray-700 mb-2"
                                                            onClick={() => setActiveTab('transfer')}
                                                        >
                                                            Trading
                                                        </button>
                                                        <button
                                                            className="bg-gray-800 p-2 rounded text-white hover:bg-gray-800 transition-colors cursor-pointer"
                                                            onClick={() => onTransferClick(t)}
                                                        >
                                                            Transfer
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </ScrollArea>
                    </div>

                </div>
            </div>
        </>


    );
};

export default SpotAccount;
