import  { useState } from "react";
import SlotCounter from "react-slot-counter"
import { FaRegStar } from "react-icons/fa6";
import { Link, useNavigate } from "react-router";
import FooterSection from "~/components/footer";
const cryptoTabs = [
    { label: "Favorites", Id: "1" },
    { label: "Crypto", Id: "2" },
    { label: "US_stocks", Id: "3" },
    { label: "FX", Id: "4" }
];

const allTokensData = {
    Favorites: [
        { symbol: "BTC", name: "Bitcoin", price: "$103,592.27", change: "-1.49%", high: "$605,400", low: "$ 102,476.09", vol: "22.38K", turnover: "$2,322,487.86K", icon: <img src="../../assets/coins/miniBtc.png" width={32} /> },
        { symbol: "ETH", name: "Ethereum", price: "$3,453.40", change: "-2.75%", high: "$34,300", low: "$ 102,476.09", vol: "22.38K", turnover: "$2,322,487.86K", icon: <img src="../../assets/coins/miniEth.png" width={32} /> },
        { symbol: "XRP", name: "XRP", price: "$150.10", change: "+0.55%", high: "$5,3000", low: "$ 102,476.09", vol: "22.38K", turnover: "$2,322,487.86K", icon: <img src="../../assets/coins/miniXrp.png" width={32} /> },
    ],
    Crypto: [
        { symbol: "BTC", name: "Bitcoin", price: "$103,592.27", change: "-1.49%", high: "$605,400", low: "$ 102,476.09", vol: "22.38K", turnover: "$2,322,487.86K", icon: <img src="../../assets/coins/miniBtc.png" width={32} /> },
        { symbol: "ETH", name: "Ethereum", price: "$3,453.40", change: "-2.75%", high: "$34,300", low: "$ 102,476.09", vol: "22.38K", turnover: "$2,322,487.86K", icon: <img src="../../assets/coins/miniEth.png" width={32} /> },
        { symbol: "XRP", name: "XRP", price: "$150.10", change: "+0.55%", high: "$5,3000", low: "$ 102,476.09", vol: "22.38K", turnover: "$2,322,487.86K", icon: <img src="../../assets/coins/miniXrp.png" width={32} /> },
        { symbol: "LTC", name: "lightcoin", price: "$150.10", change: "+0.55%", high: "$53,400", low: "$ 102,476.09", vol: "22.38K", turnover: "$2,322,487.86K", icon: <img src="../../assets/coins/miniLtc.png" width={32} /> },
        { symbol: "TRX", name: "tron", price: "$150.10", change: "+0.55%", high: "$5,4000", low: "$ 102,476.09", vol: "22.38K", turnover: "$2,322,487.86K", icon: <img src="../../assets/coins/miniTrx.png" width={32} /> },
        { symbol: "BTC", name: "Bitcoin", price: "$103,592.27", change: "-1.49%", high: "$605,400", low: "$ 102,476.09", vol: "22.38K", turnover: "$2,322,487.86K", icon: <img src="../../assets/coins/miniBtc.png" width={32} /> },
        { symbol: "ETH", name: "Ethereum", price: "$3,453.40", change: "-2.75%", high: "$34,300", low: "$ 102,476.09", vol: "22.38K", turnover: "$2,322,487.86K", icon: <img src="../../assets/coins/miniEth.png" width={32} /> },
        { symbol: "XRP", name: "XRP", price: "$150.10", change: "+0.55%", high: "$5,3000", low: "$ 102,476.09", vol: "22.38K", turnover: "$2,322,487.86K", icon: <img src="../../assets/coins/miniXrp.png" width={32} /> },
        { symbol: "LTC", name: "lightcoin", price: "$150.10", change: "+0.55%", high: "$53,400", low: "$ 102,476.09", vol: "22.38K", turnover: "$2,322,487.86K", icon: <img src="../../assets/coins/miniLtc.png" width={32} /> },
        { symbol: "TRX", name: "tron", price: "$150.10", change: "+0.55%", high: "$5,4000", low: "$ 102,476.09", vol: "22.38K", turnover: "$2,322,487.86K", icon: <img src="../../assets/coins/miniTrx.png" width={32} /> },
    ],
    US_stocks: [
        { symbol: "TRX", name: "tron", price: "$150.10", change: "+0.55%", high: "$5951.33", low: "$ 102,476.09", vol: "22.38K", turnover: "$2,322,487.86K", icon: <img src="../../assets/coins/miniTrx.png" width={32} /> },
    ],
};


export default function Dashboard() {
    const [activeTab, setActiveTab] = useState("Favorites");
    const navigate = useNavigate();
    const tokens = allTokensData[activeTab] || [];

    return (
        <main className="bg-gray-900 lg:bg-gray-950 flex flex-col min-h-svh overflow-hidden justify-between">
            <section
                id="hero"
                className="flex flex-col lg:items-center flex-1 " 
            >
                <article id="hero1" className="flex flex-col gap-4 lg:gap-y-8 lg:max-w-6xl xl:min-w-6xl">
                    <div className="lg:max-w-6xl md:max-w-7xl">
                        <div className=" text-gray-300 p-6 md:p-5 space-y-10">
                            {/* Tabs */}
                            <h1 className="text-gray-100 font-semibold font-xl lg:text-xl">Overview</h1>
                            <div className="flex space-x-4 mb-6">
                                {cryptoTabs.map(({ label }) => (
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

                            {/* Table */}

                            <div className="overflow-x-auto">
                                <table className="min-w-full text-sm border border-gray-700">
                                    <thead className="bg-gray-800 text-gray-400">
                                        <tr>
                                            <th className="text-left px-4 py-2">Name</th>
                                            <th className="text-right px-4 py-2">Price</th>
                                            <th className="text-right px-4 py-2">24h Change</th>
                                            <th className="hidden md:table-cell text-right px-4 py-2">24h High</th>
                                            <th className="hidden md:table-cell text-right px-4 py-2">24h low</th>
                                            <th className="hidden md:table-cell text-right px-4 py-2">24h Vol</th>
                                            <th className="hidden md:table-cell text-right px-4 py-2">24h Turnover</th>
                                            <th className="hidden md:table-cell text-right px-4 py-2">Chart</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tokens.map((e) => (
                                            <tr
                                                key={e.id}
                                                className="cursor-pointer border-t border-gray-700 even:bg-gray-800 hover:bg-gray-700"
                                                onClick={() => navigate(`price/${e.symbol}`)}
                                            >
                                                <td className="flex items-center space-x-2 px-4 py-3">
                                                    <FaRegStar className="w-9 h-6" />
                                                    <span>{e.icon}</span>
                                                    <span>
                                                        <span className="font-semibold">{e.symbol}</span> {e.name}
                                                    </span>
                                                </td>
                                                <td className="text-right px-4 py-3">
                                                    <SlotCounter value={"$1309920"} />
                                                </td>
                                                <td
                                                    className={`text-right px-4 py-3 ${e.change.startsWith("+") ? "text-green-400" : "text-red-400"
                                                        }`}
                                                >
                                                    -0.249%
                                                </td>
                                                <td className="hidden md:table-cell text-right px-4 py-3">{e.high}</td>
                                                <td className="hidden md:table-cell text-right px-4 py-3">{e.low}</td>
                                                <td className="hidden md:table-cell text-right px-4 py-3">{e.vol}</td>
                                                <td className="hidden md:table-cell text-right px-4 py-3">{e.turnover}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </article>
            </section>
            <FooterSection />
        </main>

    );
}