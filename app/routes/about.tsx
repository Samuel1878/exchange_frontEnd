import FooterSection from "~/components/footer";

export default function About() {
    return (
        <main className="bg-gray-900 lg:bg-gray-950 min-h-screen overflow-x-hidden">
            <section id="hero" className="flex flex-col lg:items-center">
                <article id="hero1" className="flex flex-col gap-4 lg:gap-y-8 lg:max-w-6xl w-full">
                    <div className="w-full">
                        <div className="text-gray-300 p-6 md:p-5 space-y-10">
                            <div className="grid lg:grid-cols-2 gap-4">
                                <div className="">
                                    <img src="../../assets/images/global-pc-2.png" alt="" />
                                </div>
                                <div className="text-4xl text-white font-bold space-y-3 py-8">
                                    <h1>Welcome to Web3</h1>
                                    <p className="text-sm text-gray-400">
                                        At Web3, we believe that everyone should have the freedom to earn, hold, spend, share and give their money - no matter who you are or where you come from.
                                    </p>
                                </div>
                            </div>
                            <div className="space-y-6 text-gray-400">
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="">
                                        <div className="grid lg:flex  gap-3 lg:grid-cols-2 text-sm">
                                            <svg className="bn-svg size-[40px] text-IconNormal md:size-[56px] lg:size-[80px]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M15 3.5a5.502 5.502 0 00-5.302 4.032 7.502 7.502 0 016.77 6.77A5.502 5.502 0 0015 3.5zM14.5 15a5.5 5.5 0 10-11 0 5.5 5.5 0 0011 0zm-8 0L9 17.5l2.5-2.5L9 12.5 6.5 15zM9 4H4v5l5-5zm11 16h-5l5-5v5z" fill="currentColor"></path></svg>
                                            <div className="lg:p-4 space-y-2">
                                                <p className="text-white lg:text-xl">$65bn</p>
                                                <p className="text-xs lg:text-sm">Average daily volume</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="">
                                        <div className="grid lg:flex gap-3 lg:grid-cols-2 text-sm">
                                            <svg className="bn-svg size-[40px] text-IconNormal md:size-[56px] lg:size-[80px]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-4l4 4-4 4-4-4 4-4z" fill="currentColor"></path></svg>
                                            <div className="lg:p-4 space-y-2">
                                                <p className="text-white lg:text-xl">300bn</p>
                                                <p className="text-xs lg:text-sm">Spot transactions in 2025</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="">
                                        <div className="grid lg:flex lg:grid-cols-2 text-sm">
                                            <svg className="bn-svg size-[40px] text-IconNormal md:size-[56px] lg:size-[80px]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M21.002 17v-5a9.113 9.113 0 00-.055-1 9.001 9.001 0 00-17.945 1v5h5v-6H5.578a6.502 6.502 0 0112.848 0h-2.424v6h.899a6.988 6.988 0 01-3.289 1.814 2 2 0 10.217 2A9.007 9.007 0 0019.486 17h1.516z" fill="currentColor"></path></svg>
                                            <div className="lg:p-4 space-y-2">
                                                <p className="text-white lg:text-xl">24/7</p>
                                                <p className="text-xs lg:text-sm">Customer Support in 40 languages</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-6 text-gray-400">
                                <div className="text-2xl text-white font-bold space-y-2">
                                    <h1>Our Mission</h1>
                                    <p className="text-sm text-gray-400">
                                        Today, Web3 is the world’s leading blockchain ecosystem, with a product suite that includes the largest digital asset exchange. Our mission is to be the infrastructure provider for crypto in tomorrow’s world.
                                    </p>
                                </div>
                            </div>
                            <div className="space-y-6 text-gray-400">
                                <h1 className="text-2xl text-white font-bold">Our Ecosystem</h1>
                                <p>Our platform is trusted by millions worldwide, and features an unmatched portfolio of financial product offerings.</p>
                                <div className="grid lg:grid-cols-3 gap-4">
                                    <div className="border border-gray-800 rounded-2xl">
                                        <div className="grid gap-4 p-4">
                                            <div className="w-[50px]">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="css-1k2b5vm"><path d="M21.5 8.5a6 6 0 11-12 0 6 6 0 0112 0z" fill="#76808F"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M8.5 9.5a6 6 0 110 12 6 6 0 010-12zm0 8.5L6 15.5 8.5 13l2.5 2.5L8.5 18z" fill="url(#spot-g_svg__paint0_linear)"></path><path d="M9 3H3v6l6-6z" fill="url(#spot-g_svg__paint1_linear)"></path><path d="M15 21h6v-6l-6 6z" fill="url(#spot-g_svg__paint2_linear)"></path><defs><linearGradient id="spot-g_svg__paint0_linear" x1="8.5" y1="21.5" x2="8.5" y2="9.5" gradientUnits="userSpaceOnUse"><stop stop-color="#F0B90B"></stop><stop offset="1" stop-color="#F8D33A"></stop></linearGradient><linearGradient id="spot-g_svg__paint1_linear" x1="6" y1="9" x2="6" y2="3" gradientUnits="userSpaceOnUse"><stop stop-color="#F0B90B"></stop><stop offset="1" stop-color="#F8D33A"></stop></linearGradient><linearGradient id="spot-g_svg__paint2_linear" x1="18" y1="21" x2="18" y2="15" gradientUnits="userSpaceOnUse"><stop stop-color="#F0B90B"></stop><stop offset="1" stop-color="#F8D33A"></stop></linearGradient></defs></svg>
                                            </div>
                                            <h1 className="text-white text-xl">Binance Exchange</h1>
                                            <p>
                                                Binance Exchange is the largest crypto exchange by trade volume.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="border border-gray-800 rounded-2xl">
                                        <div className="grid gap-4 p-4">
                                            <div className="w-[50px]">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="css-1k2b5vm"><path transform="matrix(1 0 0 -1 3 21)" fill="url(#nft-marketplace-g_svg__paint0_linear_10143_17)" d="M0 0h18v18H0z"></path><path d="M4 12l8-8 8 8-8 8-8-8z" fill="#76808F"></path><path d="M8 8v8h8V8H8z" fill="url(#nft-marketplace-g_svg__paint1_linear_10143_17)"></path><path d="M9.5 12l2.5 2.5 2.5-2.5L12 9.5 9.5 12zM5 16l3 3H5v-3zM5 8l3-3H5v3zM16 5h3v3l-3-3zM16 19h3v-3l-3 3z" fill="#76808F"></path><defs><linearGradient id="nft-marketplace-g_svg__paint0_linear_10143_17" x1="9" y1="0" x2="9" y2="18" gradientUnits="userSpaceOnUse"><stop stop-color="#F0B90B"></stop><stop offset="1" stop-color="#F8D33A"></stop></linearGradient><linearGradient id="nft-marketplace-g_svg__paint1_linear_10143_17" x1="12" y1="16" x2="12" y2="8" gradientUnits="userSpaceOnUse"><stop stop-color="#F0B90B"></stop><stop offset="1" stop-color="#F8D33A"></stop></linearGradient></defs></svg>
                                            </div>
                                            <h1 className="text-white text-xl">Binance NFT</h1>
                                            <p>
                                                Binance Exchange is the largest crypto exchange by trade volume.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="border border-gray-800 rounded-2xl">
                                        <div className="grid gap-4 p-4">
                                            <div className="w-[50px]">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="css-1k2b5vm"><path d="M13.22 2.556l-1.221 1.22-1.22-1.22a3.615 3.615 0 00-5.112 5.111L11.999 14l6.332-6.332a3.615 3.615 0 10-5.112-5.112z" fill="url(#charity-g_svg__paint0_linear)"></path><path d="M9.536 15.036L3 8.5v3.929a5 5 0 001.464 3.535L11 22.5v-3.929a5 5 0 00-1.464-3.536zM14.464 15.036L21 8.5v3.929a5 5 0 01-1.465 3.535L13 22.5v-3.929a5 5 0 011.464-3.536z" fill="#76808F"></path><defs><linearGradient id="charity-g_svg__paint0_linear" x1="11.999" y1="14" x2="11.999" y2="1.497" gradientUnits="userSpaceOnUse"><stop stop-color="#F0B90B"></stop><stop offset="1" stop-color="#F8D33A"></stop></linearGradient></defs></svg>
                                            </div>
                                            <h1 className="text-white text-xl">Web3 Charity</h1>
                                            <p>
                                                Binance Exchange is the largest crypto exchange by trade volume.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-6 text-gray-400">
                                <div className="grid gap-4 lg:grid-cols-2">
                                    <h1 className="text-2xl text-white font-bold lg:hidden">Putting Our Users First</h1>
                                    <div className="">
                                        <img src="../../assets/images/trusted-section.svg" alt="" />
                                    </div>
                                    <div className="space-y-5 lg:py-10">
                                        <h1 className="text-2xl lg:text-3xl text-white font-bold hidden lg:block">Putting Our Users First</h1>
                                        <p>
                                            Users are at the heart of everything we do. From the beginning, we’ve made user protection our top priority. That is why we’ve embedded state-of-the-art security measures and strict data privacy controls across the entire Web3 ecosystem.

                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-6 text-gray-400">
                                <div className="grid gap-4 lg:grid-cols-2">
                                    <h1 className="text-2xl text-white font-bold lg:hidden">Working with Regulators</h1>
                                    <div className="space-y-5 lg:py-10">
                                        <h1 className="text-2xl lg:text-3xl text-white font-bold hidden lg:block">Working with Regulators</h1>
                                        <p className="hidden lg:block">
                                            We’re also committed to meeting the highest standards for regulatory compliance to maintain our responsibility to our users and further build a sustainable path forward for the blockchain industry.
                                        </p>
                                    </div>
                                    <div className="">
                                        <img src="../../assets/images/fair-m.svg" alt="" />
                                        <p className="lg:hidden">
                                            We’re also committed to meeting the highest standards for regulatory compliance to maintain our responsibility to our users and further build a sustainable path forward for the blockchain industry.
                                        </p>
                                    </div>

                                </div>
                            </div>
                             <div className="space-y-6 text-gray-400">
                                <div className="grid gap-4 lg:grid-cols-2">
                                   
                                    <div className="space-y-4">
                                         <h1 className="text-2xl text-white font-bold">Working at Web3</h1>
                                        <img src="../../assets/images/grow.svg" alt="" />
                                    </div>
                                    <div className="space-y-5 lg:py-50 justify-center">
                                        
                                        <p>
                                            At Web3, we give people the freedom to own their decisions, collaborate openly, and serve our users with passion and integrity. Join the Web3 team today and work with some of the world’s most talented, hardworking, and passionate people.

                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
            </section>
            <FooterSection />
        </main>
    )
}