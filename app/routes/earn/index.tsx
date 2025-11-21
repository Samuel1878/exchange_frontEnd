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
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTrigger } from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import type { Route } from "./+types";
import { useFetcher, useNavigate } from "react-router";
import { useState } from "react";

// Import images properly
import miniUsdt from "assets/coins/miniUsdt.png";
import miniBtc from "assets/coins/miniBtc.png";
import miniEth from "assets/coins/miniEth.png";
import miniXrp from "assets/coins/miniXrp.png";
import miniLtc from "assets/coins/miniLtc.png";
import btcEth from "assets/coins/btc_eth.png";

const AdvancedEarnCaredData = [
    {
        id: 1,
        tokenImage: miniUsdt,
        tokenName: "USDT",
        tokenType: "RWUSD | Locked",
        lockupPeriod: "30 Days",
        lockupName: "Locked",
        minimumDeposit: "50 USDT",
        apr: "8% ~ 12%",
        productType: "HOT",
    },
    {
        id: 2,
        tokenImage: miniBtc,
        tokenName: "BTC",
        tokenType: "RWBTC | Locked",
        lockupPeriod: "60 Days",
        lockupName: "Locked",
        minimumDeposit: "0.001 BTC",
        apr: "6% ~ 10%",
        productType: "HOT",
    },
    {
        id: 3,
        tokenImage: miniEth,
        tokenName: "ETH",
        tokenType: "RWETH | Locked",
        lockupPeriod: "45 Days",
        lockupName: "Locked",
        minimumDeposit: "0.01 ETH",
        apr: "7% ~ 11%",
        productType: "HOT",
    },
    {
        id: 4,
        tokenImage: miniXrp,
        tokenName: "XRP",
        tokenType: "XRPSDT | Flexible",
        lockupPeriod: "-",
        lockupName: "Flexible",
        minimumDeposit: "50 USDT",
        apr: "8.5% ~ 12.5%",
        productType: "New",
    },
    {
        id: 5,
        tokenImage: miniLtc,
        tokenName: "LTC",
        tokenType: "RWLTC | Locked",
        lockupPeriod: "30 Days",
        lockupName: "Locked",
        minimumDeposit: "0.1 LTC",
        apr: "9% ~ 13%",
        productType: "New",
    },
    {
        id: 6,
        tokenImage: btcEth,
        tokenName: "BTC-ETH",
        tokenType: "RWBCH | Locked",
        lockupPeriod: "60 Days",
        lockupName: "Locked",
        minimumDeposit: "0.01 BTC",
        apr: "7.5% ~ 11.5%",
        productType: "HOT",
    }
];

export async function clientAction({ request, params }: Route.ClientActionArgs) {
    try {
        const formData = await request.formData();
        const search = formData.get("search") as string;
        const duration = formData.get("duration") as string;

        console.log("Filter form submitted:", { search, duration });

        return {
            success: true,
            filters: { search, duration }
        };
    } catch (error) {
        console.error("Error processing filter form:", error);
        return {
            success: false,
            error: "Failed to apply filters"
        };
    }
}

const FilterModal = () => {
    const fetcher = useFetcher();
    const [search, setSearch] = useState("");
    const [duration, setDuration] = useState("");

    const handleReset = () => {
        setSearch("");
        setDuration("");
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        fetcher.submit(e.currentTarget as HTMLFormElement);

    };

    return (
        <div className="lg:hidden">
            <Dialog>
                <DialogTrigger asChild>
                    <button className="flex items-center gap-2 p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors text-white">
                        <Funnel size={20} />
                    </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] bg-gray-800 text-white border border-gray-700">
                    <fetcher.Form method="post" onSubmit={handleSubmit}>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-3">
                                <Label htmlFor="search" className="text-white">Search Coins</Label>
                                <div className="relative w-full flex items-center">
                                    <input
                                        id="search"
                                        name="search"
                                        type="text"
                                        placeholder="Search Coins"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="w-full py-2 px-10 text-gray-300 bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent rounded-lg transition-all duration-200"
                                    />
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                                </div>
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="duration" className="text-white">Duration</Label>
                                <Select
                                    name="duration"
                                    value={duration}
                                    onValueChange={setDuration}
                                >
                                    <SelectTrigger
                                        id="duration"
                                        className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-4 text-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent hover:bg-gray-600"
                                    >
                                        <SelectValue placeholder="Select Range" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-gray-800 border border-gray-700 text-white">
                                        <SelectItem value="all" className="hover:bg-gray-700 rounded cursor-pointer">
                                            All Durations
                                        </SelectItem>
                                        <SelectItem value="flexible" className="hover:bg-gray-700 rounded cursor-pointer">
                                            Flexible
                                        </SelectItem>
                                        <SelectItem value="locked" className="hover:bg-gray-700 rounded cursor-pointer">
                                            Locked
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={handleReset}
                                    className="bg-gray-600 border-gray-600 text-white hover:bg-gray-500"
                                >
                                    Reset
                                </Button>
                            </DialogClose>
                            <DialogClose asChild>
                                <Button
                                    type="submit"
                                    className="bg-amber-300 text-gray-950 hover:bg-amber-300"
                                    disabled={fetcher.state === "submitting"}
                                >
                                    {fetcher.state === "submitting" ? "Applying..." : "Confirm"}
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </fetcher.Form>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default function EarnIndex({ loaderData }: Route.ComponentProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [durationFilter, setDurationFilter] = useState("all");

    const navigate = useNavigate();
    const filteredProducts = AdvancedEarnCaredData.filter((product) => {
        const matchesSearch = product.tokenName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.tokenType.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesDuration = durationFilter === "all" ||
            (durationFilter === "flexible" && product.lockupName === "Flexible") ||
            (durationFilter === "locked" && product.lockupName === "Locked");

        return matchesSearch && matchesDuration;
    });

    return (
        <main className="bg-gray-900 lg:bg-gray-950 min-h-screen overflow-x-hidden">
            <section id="hero" className="flex flex-col lg:items-center">
                <article id="hero1" className="flex flex-col gap-4 lg:gap-y-8 lg:max-w-6xl w-full">
                    <div className="w-full">
                        <div className="text-gray-300 p-6 md:p-5 space-y-10">
                            <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
                                <div className="p-4 md:p-8">
                                    <h1 className="text-2xl md:text-5xl font-bold text-white">Advanced Earn</h1>
                                    <p className="text-sm md:text-lg mt-4 text-gray-300">
                                        Benefit from our innovative products that are designed to help navigate the various market scenarios.
                                    </p>
                                    <p className="text-sm font-thin md:text-sm mt-2 text-gray-400">
                                        *Advanced Earn products involve higher risks. See our
                                        <span className="text-amber-400"> FAQ </span>
                                        for more information.
                                    </p>
                                </div>
                                <div className="hidden lg:flex items-center justify-center">
                                    <img
                                        src={AdvancedImage}
                                        alt="Advanced Earn"
                                        className="w-full max-w-md h-auto"
                                    />
                                </div>
                            </div>

                            <div className="space-y-6">
                                <Carousel
                                    opts={{
                                        align: "start",
                                        loop: true,
                                    }}
                                    className="w-full relative"
                                >
                                    <CarouselContent>
                                        {AdvancedEarnCaredData.map((item) => (
                                            <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/3">
                                                <div className="p-1">
                                                    <Card className="bg-gray-800 border border-gray-700 hover:border-gray-600 cursor-pointer transition-all duration-200 w-full h-full"
                                                        onClick={() => navigate(`${item.tokenName}`)}
                                                    >
                                                        <CardContent className="p-4 flex flex-col justify-between h-32">
                                                            <div className="text-sm text-white relative">
                                                                <div className="absolute -top-10 items-end -right-4">
                                                                    {item.productType === "HOT" && (
                                                                        <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-2xl">HOT</span>
                                                                    )}
                                                                    {item.productType === "New" && (
                                                                        <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-2xl">New</span>
                                                                    )}
                                                                </div>
                                                                <div className="grid grid-cols-2 gap-2 mb-3">
                                                                    <div className="flex flex-row gap-2 items-center">
                                                                        <img
                                                                            src={item.tokenImage}
                                                                            alt={item.tokenName}
                                                                            width={32}
                                                                            height={32}
                                                                            className="rounded-full"
                                                                        />
                                                                        <div>
                                                                            <p className="font-semibold">{item.tokenName}</p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="text-right">
                                                                        <p className="text-xs text-gray-400">{item.lockupName}</p>
                                                                        <p className="font-semibold text-sm">{item.lockupPeriod}</p>
                                                                    </div>
                                                                </div>
                                                                <div className="grid grid-cols-2 gap-2">
                                                                    <div className="text-start">
                                                                        <p className="text-xs text-gray-400">Minimum Deposit</p>
                                                                        <p className="font-semibold text-sm">{item.minimumDeposit}</p>
                                                                    </div>
                                                                    <div className="text-right">
                                                                        <p className="text-xs text-gray-400">APR</p>
                                                                        <p className="font-semibold text-sm text-green-400">{item.apr}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                </div>
                                            </CarouselItem>
                                        ))}
                                    </CarouselContent>
                                    <CarouselPrevious className="absolute -left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 border-gray-700 hover:bg-gray-700 text-white" />
                                    <CarouselNext className="absolute -right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 border-gray-700 hover:bg-gray-700 text-white" />
                                </Carousel>
                            </div>
                            <div className="space-y-6 text-white">
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
                            <div className="space-y-6 text-white">
                                <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                                    {/* Search Input */}
                                    <div className="relative w-full lg:w-96 flex items-center">
                                        <input
                                            type="text"
                                            placeholder="Search Coins"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="w-full py-2 px-10 text-gray-300 bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent rounded-lg transition-all duration-200"
                                        />
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                                    </div>

                                    {/* Duration Filter and Modal */}
                                    <div className="w-full lg:w-auto flex gap-2">
                                        <div className="hidden lg:block">
                                            <Select
                                                value={durationFilter}
                                                onValueChange={setDurationFilter}
                                            >
                                                <SelectTrigger className="w-full lg:w-48 bg-gray-800 border border-gray-600 rounded-lg py-2 px-4 text-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent hover:bg-gray-700">
                                                    <SelectValue placeholder="Select Range" />
                                                </SelectTrigger>
                                                <SelectContent className="bg-gray-800 border border-gray-700 text-white">
                                                    <SelectItem value="all" className="hover:bg-gray-700 rounded cursor-pointer">
                                                        All Durations
                                                    </SelectItem>
                                                    <SelectItem value="flexible" className="hover:bg-gray-700 rounded cursor-pointer">
                                                        Flexible
                                                    </SelectItem>
                                                    <SelectItem value="locked" className="hover:bg-gray-700 rounded cursor-pointer">
                                                        Locked
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <FilterModal />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h2 className="text-xl font-bold mb-4">Explore Our Advanced Earn Products</h2>

                                    {/* Results Count */}
                                    <div className="text-sm text-gray-400">
                                        Showing {filteredProducts.length} of {AdvancedEarnCaredData.length} products
                                    </div>

                                    <div className="hidden lg:grid grid-cols-5 text-sm font-semibold bg-gray-800 py-4 px-6 rounded-lg text-gray-400">
                                        <div>Coin</div>
                                        <div className="text-center">APR</div>
                                        <div className="text-center">Duration</div>
                                        <div className="text-center">Type</div>
                                        <div className="text-center">Action</div>
                                    </div>

                                    {filteredProducts.length === 0 ? (
                                        <div className="text-center py-8 text-gray-400">
                                            No products found matching your filters.
                                        </div>
                                    ) : (
                                        filteredProducts.map((item) => (
                                            <div
                                                key={item.id}
                                                className="grid grid-cols-2 lg:grid-cols-5 p-4 lg:p-6 rounded-xl gap-4 bg-gray-800 lg:hover:bg-gray-700 transition-colors"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={item.tokenImage}
                                                        alt={item.tokenName}
                                                        width={40}
                                                        height={40}
                                                        className="rounded-full"
                                                    />
                                                    <div className="flex flex-col">
                                                        <span className="font-semibold">{item.tokenName}</span>
                                                        <span className="text-xs text-gray-400">{item.tokenType}</span>
                                                    </div>
                                                </div>
                                                <div className="text-right lg:text-center text-green-400 font-semibold">
                                                    {item.apr}
                                                </div>
                                                <div className="hidden lg:block text-center text-gray-300">
                                                    {item.lockupPeriod}
                                                </div>
                                                <div className="hidden lg:block text-center">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${item.lockupName === 'Flexible'
                                                        ? 'bg-blue-500/20 text-blue-400'
                                                        : 'bg-amber-500/20 text-amber-400'
                                                        }`}>
                                                        {item.lockupName}
                                                    </span>
                                                </div>
                                                <div className="col-span-2 lg:col-span-1 flex justify-end lg:justify-center">
                                                    <button
                                                        className="w-full lg:w-auto bg-amber-300 hover:bg-amber-300 text-gray-900 font-medium py-2 px-6 rounded-lg transition-colors cursor-pointer"
                                                        onClick={() => navigate(`${item.tokenName}`)}
                                                    >
                                                        Subscribe
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                            <div className="space-y-6 text-white">
                                <div>
                                    <h2 className="text-2xl font-bold mb-6">Why Choose Advanced Earn?</h2>
                                    <ul className="grid md:grid-cols-2 gap-4 text-gray-300">
                                        <li className="flex items-start gap-3">
                                            <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                                            <span>Competitive Interest Rates: Benefit from some of the best rates in the market.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                                            <span>Flexible Options: Choose between flexible and locked products to suit your investment style.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                                            <span>User-Friendly Platform: Easy to navigate and manage your investments.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                                            <span>Secure and Reliable: Your assets are protected with industry-leading security measures.</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                        </div>
                    </div>
                </article>
            </section>
            <FooterSection />
        </main>
    );
}