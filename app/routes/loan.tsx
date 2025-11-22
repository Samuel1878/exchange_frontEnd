import { useState } from "react";
import BackgroundSVG from "assets/images/re_1.svg";
import BackgroundSVG2 from "assets/images/re_2.svg";
import Loan from "assets/images/loan-banner_1.svg";
import VipLoan from "assets/images/vip_banner.svg"
import { Link, useNavigate } from "react-router";
import SlotCounter from "react-slot-counter"
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
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "~/components/ui/select";
import { Checkbox } from "~/components/ui/checkbox";

const allTokensData = {
    Favorites: [
        { symbol: "BTC", name: "Bitcoin", price: "$103,592.27", change: "-1.49%", high: "$605,400", low: "$ 102,476.09", vol: "22.38K", turnover: "$2,322,487.86K", icon: <img src="../../assets/coins/miniBtc.png" width={32} /> },
        { symbol: "ETH", name: "Ethereum", price: "$3,453.40", change: "-2.75%", high: "$34,300", low: "$ 102,476.09", vol: "22.38K", turnover: "$2,322,487.86K", icon: <img src="../../assets/coins/miniEth.png" width={32} /> },
        { symbol: "XRP", name: "XRP", price: "$150.10", change: "+0.55%", high: "$5,3000", low: "$ 102,476.09", vol: "22.38K", turnover: "$2,322,487.86K", icon: <img src="../../assets/coins/miniXrp.png" width={32} /> },
    ],
};
const BorrowTokensData = {
    Borrowing_Order: [],
    Complete_Order: [],
};
const BorrowTabs = [
    { label: "Borrowing_Order", Id: "1" },
    { label: "Complete_Order", Id: "2" },
];
export default function LoanTab() {
    const navigate = useNavigate();
    const tokens = (allTokensData);
    const [showModal, setShowModal] = useState(false);
    const [activeTab, setActiveTab] = useState("Borrowing_Order");
    const Borrowtokens = allTokensData[activeTab] || [];
    const [selectedToken, setSelectedToken] = useState(null);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [days, setDays] = useState(90);
    const [agree, setAgree] = useState(true);

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
    }
    return (

        <main className="bg-gray-900 lg:bg-gray-950 overflow-x-hidden">
            <section
                id="hero"
                className="flex flex-col lg:items-center"
            >
                <article id="hero1" className="flex flex-col gap-4 lg:gap-y-8 lg:max-w-6xl">
                    <div className="lg:max-w-6xl">
                        <div className="text-gray-300 p-6 md:p-5 space-y-10">
                            <div className="flex flex-col lg:items-center md:items-start lg:flex-row lg:justify-between lg:gap-6">
                                <div className="space-y-2 mb-4 lg:space-x-7">
                                    <h1 className="text-lg lg:text-2xl text-amber-300 font-extrabold font-sans">FLEXIBLE RATE LOAN</h1>
                                    <h2 className="text-xl font-bold lg:text-3xl text-amber-50 xl:py-4 font-serif">
                                        Borrow and Supply with <br />
                                        Your Chosen Fixed Interest Rate
                                    </h2>
                                    <p className="text-sm text-gray-600 flex"><BiTimer className="mr-2" />Repayment at any time, early repayment minus interest</p>
                                    <p className="text-sm text-gray-600 flex"><GrTransaction className="mr-2" />Optional multi-time staking</p>
                                    <p className="text-sm text-gray-600 flex"><FaSackDollar className="mr-2" />Quickly arrive at the account, the annualized interest rate is as low as1%</p>
                                    <button className="bg-amber-300 text-gray-800 p-2 rounded-lg lg:w-1/3">Borrow Now</button>
                                </div>
                                <div className="md:block hidden sm:block my-4 lg:my-0 lg:space-y-2 md:space-y-2">
                                    <div className="flex flex-2 border p-4 gap-2 rounded-2xl bg-blend-color-dodge">
                                        <div className="lg:p-4 md:p-4">
                                            <p>Fixed Rate Loans</p>
                                            <span>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo de</span>
                                            <p className="lg:text-amber-300">
                                                <Link to="/">Explore Now</Link>
                                            </p>
                                        </div>
                                        <div className="md:w-[200px]">
                                            <img src={Loan} alt="" className="lg:w-[200px]" />
                                        </div>
                                    </div>
                                    <div className="flex flex-2 border p-4 gap-2 rounded-2xl ">
                                        <div className="lg:p-4 md:p-4">
                                            <p>Vip Loan</p>
                                            <span>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo de</span>
                                            <p className="lg:text-amber-300">
                                                <Link to="/">
                                                    Explore Now
                                                </Link>
                                            </p>
                                        </div>
                                        <div className="md:w-[200px]">
                                            <img src={VipLoan} alt="" className="lg:w-[200px]" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full text-sm border border-gray-700">
                                    <thead className="bg-gray-800 text-gray-400">
                                        <tr>
                                            <th className="text-left px-4 py-2">Loanable Coin</th>
                                            <th className="text-right px-4 py-2">Hourly Interest Rate</th>
                                            <th className="text-right px-4 py-2">Annually Interest Rate</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tokens.Favorites.map((e) => (
                                            <tr
                                                key={e.symbol}
                                                className="cursor-pointer border-t border-gray-700 even:bg-gray-800 hover:bg-gray-700"
                                                onClick={() => handleRowClick(e)}
                                            >
                                                <td className="flex items-center space-x-2 px-4 py-3">
                                                    <span>{e.icon}</span>
                                                    <span>
                                                        <span className="font-semibold">{e.symbol}</span> {e.name}
                                                    </span>
                                                </td>
                                                <td className="text-right px-4 py-3">
                                                    <SlotCounter value={"$1309920"} />
                                                </td>
                                                <td
                                                    className={`text-right px-4 py-3 ${e.change.startsWith("-") ? "text-red-500" : "text-green-400"
                                                        }`}
                                                >
                                                    -0.249%
                                                </td>
                                            </tr>

                                        ))}
                                    </tbody>
                                </table>
                                {/* Shadcn Dialog */}
                                <Dialog open={open} onOpenChange={setOpen}>
                                    <DialogContent className="max-w-lg text-white bg-gray-900 border border-gray-800 rounded-2xl">
                                        <DialogHeader>
                                            <DialogTitle className="text-xl font-semibold">Collateralized Borrowing</DialogTitle>
                                            <DialogDescription className="text-gray-400">
                                                Synchronous borrowing limit based on personal asset situation
                                            </DialogDescription>
                                        </DialogHeader>

                                        {/* Verification Quantity */}
                                        <div className="space-y-3 mt-4">
                                            <Label className="text-sm text-gray-300">Verification Quantity</Label>
                                            <div className="flex items-center gap-2">
                                                <Input type="number" placeholder="0" className="flex-1 bg-gray-800 border border-gray-700 focus:border-0 focus:outline-none focus:ring-2 rounded:md" />

                                                {/* Token Select */}
                                                <Select value={selectedToken?.symbol} onValueChange={setSelectedToken}>
                                                    <SelectTrigger className="w-[150px] bg-gray-800 border-gray-700">
                                                        <SelectValue placeholder="Select Token" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {tokens.Favorites.map((e) => (
                                                            <SelectItem value={e.symbol}>{e.icon}{e.symbol}</SelectItem>
                                                        ))}


                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="text-xs text-gray-400 flex justify-between">
                                                <span>Verifiable Amount: 0 {selectedToken?.symbol}</span>
                                            </div>
                                        </div>
                                        <div className="space-y-3 mt-4">
                                            <Label>Evaluate after entering the amount of capital verification</Label>
                                            <Input type="number" className="bg-gray-800 border-gray-700" placeholder="Available Quantity" disabled/>
                                        </div>

                                        {/* Borrowing Period */}
                                        <div className="mt-6 space-y-2">
                                            <Label className="text-sm text-gray-300">Borrowing Period</Label>
                                            <div className="flex flex-wrap gap-2">
                                                {borrowingPeriods.map((d) => (
                                                    <Button
                                                        key={d}
                                                        variant={days === d ? "default" : "outline"}
                                                        onClick={() => setDays(d)}
                                                        className={days === d ? "bg-yellow-400 text-black hover:text-gray-950 hover:bg-yellow-500 cursor-pointer" : "bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-gray-50 cursor-pointer"}
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
                                                <a href="#" className="text-blue-400 underline">Borrowing Service Agreement</a>
                                            </Label>
                                        </div>

                                        <DialogFooter className="mt-4">
                                            <Button disabled={!agree} className="w-full bg-yellow-400 text-black hover:bg-yellow-300 cursor-pointer">
                                                Confirm Borrow
                                            </Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </div>
                            <div className="overflow-x-auto">
                                <div className="flex flex-2 gap-4">
                                    <div className="lg:space-y-4">
                                        {BorrowTabs.map(({ label }) => (
                                            <button
                                                key={label}
                                                onClick={() => setActiveTab(label)}
                                                className={`px-3 py-1 ${activeTab === label
                                                    ? "text-gray-100 border-b-2 border-b-amber-300"
                                                    : "hover:text-gray-100"
                                                    }`}
                                            >
                                                {label.replaceAll("_", " ")}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="lg:border lg:rounded lg:h-52 h-52 space-y-2 lg:space-y-4 lg:p-2">
                                    <div className="flex flex-wrap items-center justify-center p-5">
                                        {!loading ? (
                                            <svg width="94" height="70" viewBox="0 0 94 70" fill="none" xmlns="http://www.w3.org/2000/svg" className="svg-class">
                                                <path d="M10.4531 10.9219H66.021V44.3999C66.021 53.3608 66.021 57.8412 64.2771 61.2638C62.7432 64.2744 60.2955 66.7221 57.2849 68.2561C53.8623 70 49.3819 70 40.421 70H16.8531C14.6129 70 13.4928 70 12.6372 69.564C11.8845 69.1805 11.2726 68.5686 10.8891 67.8159C10.4531 66.9603 10.4531 65.8402 10.4531 63.6V10.9219Z" fill="white" fill-opacity="0.04"></path>
                                                <path d="M10.922 69.9994C4.88993 69.9994 0 65.1094 0 59.0774H47.0402C47.0402 69.9994 57.4936 69.9994 57.4936 69.9994H10.922Z" fill="url(#paint0_linear_17615_36895)"></path>
                                                <path d="M21.3751 -4.86374e-05C15.3431 -4.86374e-05 10.4531 4.88989 10.4531 10.9219H66.0211C66.0211 -4.86374e-05 76.4745 -4.86374e-05 76.4745 -4.86374e-05H21.3751Z" fill="url(#paint1_linear_17615_36895)"></path>
                                                <rect x="18.8242" y="18.6667" width="25.2954" height="3.5" rx="1.75" fill="white" fill-opacity="0.06"></rect>
                                                <rect x="18.8242" y="30.9166" width="17.6479" height="3.50001" rx="1.75001" fill="white" fill-opacity="0.06"></rect>
                                                <rect x="18.8242" y="43.1665" width="23.5306" height="3.50001" rx="1.75001" fill="white" fill-opacity="0.06"></rect>
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M84.7764 40.6118C84.7764 48.657 78.2813 55.1788 70.2691 55.1788C62.2569 55.1788 55.7617 48.657 55.7617 40.6118C55.7617 32.5667 62.2569 26.0449 70.2691 26.0449C78.2813 26.0449 84.7764 32.5667 84.7764 40.6118ZM79.5444 40.8507C79.5444 46.1262 75.2852 50.4028 70.0313 50.4028C64.7774 50.4028 60.5183 46.1262 60.5183 40.8507C60.5183 35.5752 64.7774 31.2986 70.0313 31.2986C75.2852 31.2986 79.5444 35.5752 79.5444 40.8507Z" fill="#FCD535"></path>
                                                <path d="M70.0306 50.4028C75.2845 50.4028 79.5436 46.1262 79.5436 40.8507C79.5436 35.5752 75.2845 31.2986 70.0306 31.2986C64.7767 31.2986 60.5176 35.5752 60.5176 40.8507C60.5176 46.1262 64.7767 50.4028 70.0306 50.4028Z" fill="#FCD535" fill-opacity="0.1"></path>
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M84.4642 55.6269L80.3984 51.4324L81.544 50.3283L85.6098 54.5229L84.4642 55.6269Z" fill="#FCD535"></path>
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M88.0506 54.7156C87.6005 54.2637 87.0105 54.0377 86.4205 54.0377C85.8305 54.0377 85.2406 54.2637 84.7904 54.7156C84.3403 55.1676 84.1152 55.76 84.1152 56.3524C84.1152 56.9448 84.3403 57.5372 84.7904 57.9892L90.0632 63.2836C90.5133 63.7356 91.1033 63.9616 91.6933 63.9616C92.2832 63.9616 92.8732 63.7356 93.3233 63.2836C93.7735 62.8316 93.9985 62.2392 93.9985 61.6468C93.9985 61.0544 93.7735 60.462 93.3233 60.01L88.0506 54.7156Z" fill="#FCD535"></path>
                                                <defs>
                                                    <linearGradient id="paint0_linear_17615_36895" x1="32.2204" y1="59.0774" x2="32.2204" y2="69.9994" gradientUnits="userSpaceOnUse">
                                                        <stop stop-color="white" stop-opacity="0.08"></stop>
                                                        <stop offset="1" stop-color="white" stop-opacity="0.04"></stop>
                                                    </linearGradient>
                                                    <linearGradient id="paint1_linear_17615_36895" x1="47.4526" y1="10.9219" x2="47.4526" y2="-4.86374e-05" gradientUnits="userSpaceOnUse">
                                                        <stop stop-color="white" stop-opacity="0.04"></stop>
                                                        <stop offset="1" stop-color="white" stop-opacity="0.08"></stop>
                                                    </linearGradient>
                                                </defs>
                                            </svg>
                                        ) : (
                                            <>
                                                <div className="flex flex-col items-center justify-center my-4">
                                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
                                                    <span className="mt-3 text-gray-600">Loading content...</span>
                                                </div>
                                            </>
                                        )}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
            </section>
            <FAQ />
            <FooterSection />
        </main>
    )
}