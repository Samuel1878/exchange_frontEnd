import FooterSection from "~/components/footer";
import BlogImage from "assets/images/smart-arbirage-2.svg"
import miniBtc from "assets/coins/miniBtc.png";
import { Badge } from "~/components/ui/badge";
import { ReceiptText } from "lucide-react";
import { Link, useNavigate } from "react-router";
export default function ICOIndex() {
    const navigate = useNavigate();
    return (
        <main className="bg-gray-900 lg:bg-gray-950 min-h-screen overflow-x-hidden">
            <section id="hero" className="flex flex-col lg:items-center">
                <article id="hero1" className="flex flex-col gap-4 lg:gap-y-8 lg:max-w-6xl w-full">
                    <div className="w-full">
                        <div className="text-gray-300 p-6 md:p-5 space-y-10">

                            <div className="grid">
                                <div className="text-white text-xl font-bold lg:text-2xl">
                                    <h1 className="py-3 lg:py-7">What is an Initial Coin Offering (ICO)?</h1>
                                    <p className="text-sm font-thin lg:text-lg lg:font-medium lg:text-gray-500">
                                        An Initial Coin Offering (ICO) is a fundraising mechanism in the cryptocurrency industry, akin to an Initial Public Offering (IPO) in the traditional financial sector.
                                        Companies aiming to gather resources for the creation of a new coin, application, or service can launch an ICO.
                                        Participants interested in the project can acquire tokens during the ICO and receive a new cryptocurrency token issued by the company.
                                        This token may have utility related to the product or service the company provides or represent a stake in the company or project.

                                    </p>
                                </div>

                            </div>
                            <div className="space-y-6 text-white">
                                <div className="border-gray-800 border rounded-2xl bg-gray-800 lg:bg-gray-950">
                                    <div className="grid grid-cols-3 gap-5 p-4">
                                        <div className="text-white col-span-3 lg:col-span-1">
                                            <img src={BlogImage} alt="" className="w-[400px]" />
                                        </div>
                                        <div className="text-white col-span-3 lg:col-span-2 mt-10 lg:mt-0 space-y-4 lg:py-7">
                                            <h1 className="lg:text-2xl lg:font-bold">New projects coming soon.Stay tuned!</h1>
                                            <p className="text-sm font-semibold lg:text-xl">Subscribe to BTC Simple Earn</p>
                                            <div className="grid gap-4 lg:grid-cols-2 lg:justify-center items-center">
                                                <div className="text-gray-400 text-sm">
                                                    <p>Get <span className="text-green-300">0.16% APR </span>and auto-join each Launchpool!</p>
                                                </div>
                                                <div className="lg:justify-self-center-safe">
                                                    <button className="text-gray-950 cursor-pointer bg-amber-300 text-center py-2 rounded-2xl w-full lg:pr-7 lg:mr-7 lg:p-3"
                                                        onClick={() => navigate(`/finance/earn/BTC`)}
                                                    >Subscribe</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="space-y-6 text-white">
                                    <div className="grid lg:grid-cols-2 gap-4">
                                        <div className="border border-gray-800 rounded-2xl text-white p-4 bg-gray-800 lg:bg-gray-950">
                                            <div className="relative py-4">
                                                <div className="absolute -top-4 items-end -right-4">
                                                    <span className="bg-gray-800 rounded-tr-lg rounded-bl-lg text-white text-xs font-semibold px-4 py-2">Distributed</span>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={miniBtc}
                                                        alt="btc "
                                                        width={40}
                                                        height={40}
                                                        className="rounded-full"
                                                    />
                                                    <div className="flex flex-col">
                                                        <span className="font-semibold">ALLO <Badge className="bg-gray-600 rounded text-xs">HoDLer Airdrops</Badge></span>
                                                        <span className="text-xs text-gray-400">15,000,000 ALLo</span>
                                                    </div>

                                                </div>
                                                <div className="py-3">
                                                    <hr className="text-gray-800 border-gray-600 lg:hidden" />
                                                </div>
                                                <div className="text-white lg:py-3">
                                                    <div className="flex justify-between">
                                                        <div className="text-gray-400 text-sm">
                                                            <p>Average Airdrop</p>
                                                        </div>
                                                        <div className="text-gray-400">
                                                           <Link to={'/ico/announcement/BTC'}>
                                                                <ReceiptText />
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-white py-4">
                                                    <div className="flex justify-between">
                                                        <div className="text-gray-400 text-sm">
                                                            <div className="flex items-center gap-3">
                                                                <img
                                                                    src={miniBtc}
                                                                    alt="btc "
                                                                    width={20}
                                                                    height={20}
                                                                    className="rounded-full"
                                                                />
                                                                <div className="flex flex-col">
                                                                    <span className="text-sm text-white">Per BNB</span>
                                                                </div>

                                                            </div>
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <p className="text-sm">0.9121 ALLO</p>
                                                            <p className="text-gray-400 text-sm font-thin">≈$0.11255</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="border border-gray-800 rounded-2xl text-white p-4 bg-gray-800 lg:bg-gray-950">
                                            <div className="relative py-4">
                                                <div className="absolute -top-4 items-end -right-4">
                                                    <span className="bg-gray-800 rounded-tr-lg rounded-bl-lg text-white text-xs font-semibold px-4 py-2">Distributed</span>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={miniBtc}
                                                        alt="btc "
                                                        width={40}
                                                        height={40}
                                                        className="rounded-full"
                                                    />
                                                    <div className="flex flex-col">
                                                        <span className="font-semibold">ALLO <Badge className="bg-gray-600 rounded text-xs">HoDLer Airdrops</Badge></span>
                                                        <span className="text-xs text-gray-400">15,000,000 ALLo</span>
                                                    </div>

                                                </div>
                                                <div className="py-3">
                                                    <hr className="text-gray-800 border-gray-600 lg:hidden" />
                                                </div>
                                                <div className="text-white lg:py-3">
                                                    <div className="flex justify-between">
                                                        <div className="text-gray-400 text-sm">
                                                            <p>Average Airdrop</p>
                                                        </div>
                                                        <div className="text-gray-400">
                                                            <Link to={'/ico/announcement/BTC'}>
                                                                <ReceiptText />
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-white py-4">
                                                    <div className="flex justify-between">
                                                        <div className="text-gray-400 text-sm">
                                                            <div className="flex items-center gap-3">
                                                                <img
                                                                    src={miniBtc}
                                                                    alt="btc "
                                                                    width={20}
                                                                    height={20}
                                                                    className="rounded-full"
                                                                />
                                                                <div className="flex flex-col">
                                                                    <span className="text-sm text-white">Per BNB</span>
                                                                </div>

                                                            </div>
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <p className="text-sm">0.9121 ALLO</p>
                                                            <p className="text-gray-400 text-sm font-thin">≈$0.11255</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-6 text-white">
                                    <div className="text-center">
                                        <button className="text-amber-300 cursor-pointer">View More</button>
                                    </div>
                                </div>
                                <div className="space-y-6 text-gray-400 text-sm font-thin">
                                    <p>* By participating, you agree to the <span className="text-amber-300">Terms and Conditions</span> and <span className="text-amber-300">Risk Warning</span> of Launchpool and HODLer Airdrops.</p>

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