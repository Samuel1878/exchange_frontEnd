import FooterSection from "~/components/footer";
import FlexibleImage from "assets/images/simple-earn-v2.svg";
import LockedImage from "assets/images/bnb-staking-v2.svg";
import AdvancedImage from "assets/images/high-yield-2.svg";
import { Card, CardContent } from "~/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "~/components/ui/carousel";
import { Funnel, Search } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
const AdvancedEarnCaredData = [
    {
        id: 1,
        tokenImage: <img src="../../assets/coins/miniUsdt.png" width={32} />,
        tokenName: "USDT",
        tokenType: "RWUSD | Flexible",
        lockupPeriod: "30 Days",
        lockupName: "Locked",
        minimumDeposit: "50 USDT",
        apr: "8% ~ 12%",
        productType: "HOT",
    },
    {
        id: 2,
        tokenImage: <img src="../../assets/coins/miniBtc.png" width={32} />,
        tokenName: "BTC",
        tokenType: "RWBTC | Flexible",
        lockupPeriod: "60 Days",
        lockupName: "Locked",
        minimumDeposit: "0.001 BTC",
        apr: "6% ~ 10%",
        productType: "HOT",
    },
    {
        id: 3,
        tokenImage: <img src="../../assets/coins/miniEth.png" width={32} />,
        tokenName: "ETH",
        tokenType: "RWETH | Flexible",
        lockupPeriod: "45 Days",
        lockupName: "Locked",
        minimumDeposit: "0.01 ETH",
        apr: "7% ~ 11%",
        productType: "HOT",
    },
    {
        id: 4,
        tokenImage: <img src="../../assets/coins/miniXrp.png" width={32} />,
        tokenName: "XRP",
        tokenType: "XRPSDT | Flexible",
        lockupPeriod: "30 Days",
        lockupName: "Flexible",
        minimumDeposit: "50 USDT",
        apr: "8.5% ~ 12.5%",
        productType: "New",
    },
    {
        id: 5,
        tokenImage: <img src="../../assets/coins/miniLtc.png" width={32} />,
        tokenName: "LTC",
        tokenType: "RWLTC | Flexible",
        lockupPeriod: "30 Days",
        lockupName: "Locked",
        minimumDeposit: "0.1 LTC",
        apr: "9% ~ 13%",
        productType: "New",
    },
    {
        id: 6,
        tokenImage: <img src="../../assets/coins/btc_eth.png" width={32} />,
        tokenName: "BTC/ETH",
        tokenType: "RWBCH | Flexible",
        lockupPeriod: "60 Days",
        lockupName: "Locked",
        minimumDeposit: "0.01 BTC",
        apr: "7.5% ~ 11.5%",
        productType: "HOT",
    }
];
export default function EarnIndex() {
    return (
        <main className="bg-gray-900 lg:bg-gray-950 overflow-x-hidden">
            <section
                id="hero"
                className="flex flex-col lg:items-center"
            >
                <article id="hero1" className="flex flex-col gap-4 lg:gap-y-8 lg:max-w-6xl">
                    <div className="lg:max-w-6xl">
                        <div className="text-gray-300 p-6 md:p-5 space-y-10">
                            <div className="grid lg:grid-cols-2 gap-2">
                                <div className="p-4 md:p-8">
                                    <h1 className="text-2xl md:text-5xl font-bold text-white">Advanced Earn</h1>
                                    <p className="text-sm md:text-lg mt-4">
                                        Benefit from our innovative products that are designed to help navigate the various market scenarios.
                                    </p>
                                    <p className="text-sm font-thin md:text-sm mt-2">*Advanced Earn products involve higher risks. See our
                                        <span className="text-amber-400"> FAQ </span>
                                        for more information.
                                    </p>
                                </div>
                                <div className="items-center hidden lg:flex justify-center">
                                    <img src={AdvancedImage} alt="Advanced Earn" className="w-100 h-auto" />
                                </div>
                            </div>
                            <div className="space-y-7 ">
                                <div className="">
                                    <Carousel
                                        opts={{
                                            align: "start",
                                        }}
                                        className="w-full"
                                    >
                                        <CarouselContent>
                                            {AdvancedEarnCaredData.map((item, index) => (
                                                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/3">
                                                    <div className="p-1">
                                                        <Card className="bg-gray-900 border border-gray-700 lg:bg-gray-950 cursor-pointer transition-all duration-200 w-full">
                                                            <CardContent className="h-22 flex flex-col justify-between">
                                                                <div className="text-sm text-white">
                                                                    <div className="grid grid-cols-2 gap-2">
                                                                        <div className="flex flex-row gap-2">
                                                                            <div>{item.tokenImage}</div>
                                                                            <div>
                                                                                <p className="font-semibold">{item.tokenName}</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="text-right">
                                                                            <p className="text-xs text-gray-400">{item.lockupName}</p>
                                                                            <p className="font-semibold">{item.lockupPeriod}</p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="mt-4 grid grid-cols-2 gap-2">
                                                                        <div className="text-start">
                                                                            <p className="text-xs text-gray-400">Minimum Deposit</p>
                                                                            <p className="font-semibold">{item.minimumDeposit}</p>
                                                                        </div>
                                                                        <div className="text-right">
                                                                            <p className="text-xs text-gray-400">APR</p>
                                                                            <p className="font-semibold">{item.apr}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </CardContent>
                                                        </Card>
                                                    </div>
                                                </CarouselItem>
                                            ))}
                                        </CarouselContent>
                                        <CarouselPrevious className="-left-7 bg-gray-900 border-gray-900" />
                                        <CarouselNext className="-right-7 bg-gray-900 border-gray-900" />
                                    </Carousel>
                                </div>
                            </div>
                            <div className="space-y-7 text-white">
                                <div className="grid lg:grid-cols-2 gap-4 items-center">
                                    <div className="flex justify-center">
                                        <img src={FlexibleImage} alt="Flexible Earn" className="w-40 lg:w-40 h-auto" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold mb-4">Flexible Earn</h2>
                                        <p className="text-sm md:text-sm font-thin">
                                            Enjoy the freedom to deposit and withdraw your assets at any time while earning competitive interest rates. Perfect for those who value liquidity and flexibility in their investment strategy.
                                        </p>
                                    </div>
                                </div>
                                <div className="grid lg:grid-cols-2 gap-4 items-center">
                                    <div className="order-2 lg:order-1">
                                        <h2 className="text-2xl font-bold mb-4">Locked Earn</h2>
                                        <p className="text-sm md:text-sm font-thin">
                                            Maximize your returns by committing your assets for a fixed period. Our Locked Earn products offer higher interest rates in exchange for locking your funds, making them ideal for investors looking for stable and predictable income.
                                        </p>
                                    </div>
                                    <div className="flex justify-center order-1 lg:order-2">
                                        <img src={LockedImage} alt="Locked Earn" className="w-40 lg:w-40 h-auto" />
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-7 text-white">
                                <div className="flex flex-col-2 lg:flex-row gap-4">
                                    <div className="relative w-10/3 lg:w-2/4 flex items-center">
                                        <input
                                            type="text"
                                            placeholder="Search Coins"
                                            className="w-full py-1 lg:py-2 px-10 text-gray-300 bg-gray-700 lg:bg-gray-950 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent rounded-lg placeholder-right transition-all duration-200" />
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                                    </div>
                                    <div className="w-full lg:w-1/3">
                                        <button className="flex-1 lg:hidden bg-gray-900 hover:bg-gray-900 text-gray-300 py-2 lg:py-3 px-4 rounded-lg transition-colors duration-200 font-medium">
                                            <Funnel />
                                        </button>
                                        <div className="hidden lg:block">
                                            <Select>
                                                <SelectTrigger className="w-full lg:h-10 lg:w-[200px] bg-gray-900 border border-gray-700 rounded-lg py-2 px-4 text-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent hover:bg-gray-800">
                                                    <SelectValue placeholder="Select Range" />
                                                </SelectTrigger>
                                                <SelectContent className="bg-gray-900 border border-gray-700 text-white">
                                                    <SelectItem value="all" className="hover:bg-gray-800 rounded cursor-pointer">
                                                        All Durations
                                                    </SelectItem>
                                                    <SelectItem value="hot" className="hover:bg-gray-800 rounded cursor-pointer">
                                                        Flexible
                                                    </SelectItem>
                                                    <SelectItem value="new" className="hover:bg-gray-800 rounded cursor-pointer">
                                                        Locked
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-4 text-white">
                                    <h2 className="text-lg font-bold mb-2">Explore Our Advanced Earn Products</h2>
                                    <div className="grid grid-cols-2 lg:grid-cols-5 text-sm font-semibold bg-gray-900 lg:bg-gray-950 pb-5 mb-4 p-4 text-gray-400">
                                        <div>Coin</div>
                                        <div className="text-end lg:text-center">APR</div>
                                        <div className="hidden lg:block text-center ">Duration</div>
                                        <div className="hidden lg:block text-center">Settlement Date</div>
                                    </div>
                                    {AdvancedEarnCaredData.map((t) => (
                                                    <div key={t.id} className="grid grid-cols-2 lg:grid-cols-5 p-4 py-2 rounded-2xl gap-2 mt-3 lg:hover:bg-gray-900">
                                                        <div className="flex flex-col-2 gap-2">
                                                            <div className="">
                                                                {t.tokenImage}
                                                            </div>
                                                            <div className="flex flex-col">
                                                                <span>{t.tokenName}</span>  
                                                            </div>
                                                        </div>
                                                        <div className="text-end lg:text-center">{t.apr}</div>
                                                        <div className="hidden lg:block text-center">{t.lockupName}</div>
                                                        <div className="hidden lg:block text-center">{t.lockupPeriod}</div>
                                                        <div className="text-right">
                                                            <div className="hidden lg:inline-block">
                                                                <button
                                                                    className="bg-amber-300 p-2 rounded text-gray-950 font-normal hover:bg-amber-300 transition-colors cursor-pointer"
                                                                    
                                                                >
                                                                    Subscribe
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                </div>
                            </div>
                            {/* <div className="space-y-7 text-white">
                                <div className="flex flex-row gap-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <div>
                                        <h2 className="text-2xl font-bold mb-2">Important Notice</h2>
                                        <p className="text-sm md:text-sm font-thin">
                                            Advanced Earn products carry a higher level of risk compared to traditional savings or investment products. Please ensure you fully understand the terms, conditions, and potential risks involved before participating. For more details, refer to our FAQ section.
                                        </p>
                                    </div>
                                </div>
                            </div> */}
                            <div className="space-y-7 text-white">
                                <div>
                                    <h2 className="text-2xl font-bold mb-4">Why Choose Advanced Earn?</h2>
                                    <ul className="list-disc list-inside space-y-2 text-sm md:text-sm font-thin">
                                        <li>Competitive Interest Rates: Benefit from some of the best rates in the market.</li>
                                        <li>Flexible Options: Choose between flexible and locked products to suit your investment style.</li>
                                        <li>User-Friendly Platform: Easy to navigate and manage your investments.</li>
                                        <li>Secure and Reliable: Your assets are protected with industry-leading security measures.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
            </section>
            {/* <FAQ /> */}
            <FooterSection />
        </main>
    );
}