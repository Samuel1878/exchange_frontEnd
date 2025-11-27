import { Wallet } from "lucide-react";
import { Link } from "react-router";
import { Label } from "~/components/ui/label";

export default function Login() {
    return (
        <>
            <main className="bg-gray-900 lg:bg-gray-950 min-h-screen overflow-x-hidden">
                <section id="hero" className="flex flex-col lg:items-center">
                    <article id="hero1" className="flex flex-col gap-4 lg:gap-y-8 lg:max-w-6xl w-full">
                        <div className="w-full lg:py-10">
                            <div className="text-gray-300 p-6 md:p-5 lg:space-y-10">
                                <div className="grid lg:grid-cols-2 gap-4 text-white">
                                    <div className=""></div>
                                    <div className="text-white space-y-7 lg:border p-4 lg:border-gray-800 rounded-2xl">
                                        <Link
                                            to="/"

                                        >
                                            <img src="../../assets/logo.png" className="w-40 z-50 lg:w-40" />
                                        </Link>
                                        <h1 className="text-2xl font-extrabold">Log In</h1>
                                        <div className="text-white space-y-3">
                                            <Label className="text-gray-400">Email/Phone number</Label>
                                            <input type="text" placeholder="Email/Phone (Without country code)" className="w-full border-gray-800 lg:border-gray-800 border rounded-md px-3 py-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-800 lg:focus:ring-gray-900" />
                                        </div>
                                        <div className="text-white space-y-4">
                                            <button className="text-gray-950 bg-amber-300 w-full py-3 rounded-2xl font-bold">Continue</button>
                                        </div>
                                        <div className="flex-1 relative">
                                            <div className="border-b relative border-gray-800"></div>
                                            <p className="absolute text-center text-sm left-50 top-1/2 -translate-y-1/2 bg-gray-900 lg:left-60 lg:bg-gray-950 rounded-full p-1 text-white border-gray-800 hover:bg-amber-300 transition-colors duration-200 z-10">Or</p>
                                        </div>
                                        <div className="text-white">
                                            <button className="bg-gray-900 flex justify-between w-full border py-3 border-gray-800 rounded-2xl p-2 cursor-pointer">
                                                <div className="order-first">
                                                    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="bn-svg"><g clip-path="url(#clip0_2445_976)"><path fill-rule="evenodd" clip-rule="evenodd" d="M19.68 12.1818C19.68 11.6146 19.6291 11.0691 19.5345 10.5455H12V13.64H16.3055C16.12 14.64 15.5564 15.4873 14.7091 16.0546V18.0618H17.2945C18.8073 16.6691 19.68 14.6182 19.68 12.1818Z" fill="#4285F4"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M11.9997 20C14.1597 20 15.9706 19.2836 17.2942 18.0618L14.7088 16.0545C13.9924 16.5345 13.076 16.8182 11.9997 16.8182C9.91604 16.8182 8.1524 15.4109 7.52331 13.52H4.85059V15.5927C6.16695 18.2073 8.8724 20 11.9997 20Z" fill="#34A853"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M7.52364 13.52C7.36364 13.04 7.27273 12.5273 7.27273 12C7.27273 11.4727 7.36364 10.96 7.52364 10.48V8.40729H4.85091C4.30909 9.48729 4 10.7091 4 12C4 13.2909 4.30909 14.5127 4.85091 15.5927L7.52364 13.52Z" fill="#FBBC05"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M11.9997 7.18182C13.1742 7.18182 14.2288 7.58545 15.0579 8.37818L17.3524 6.08364C15.9669 4.79273 14.156 4 11.9997 4C8.8724 4 6.16695 5.79273 4.85059 8.40727L7.52331 10.48C8.1524 8.58909 9.91604 7.18182 11.9997 7.18182Z" fill="#EA4335"></path></g><defs><clipPath id="clip0_2445_976"><rect width="16" height="16" fill="none" transform="translate(4 4)"></rect></clipPath></defs></svg>
                                                </div>
                                                <div>
                                                    Continue with Google
                                                </div>
                                                <div className=""></div>
                                            </button>
                                        </div>
                                        <div className="text-white">
                                            <button className="bg-gray-900 flex justify-between w-full border py-3 border-gray-800 rounded-2xl p-2 cursor-pointer">
                                                <div className="order-first">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                                        <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    Continue with FaceBook
                                                </div>
                                                <div className=""></div>
                                            </button>
                                        </div>
                                        <div className="text-white">
                                            <button className="bg-gray-900 flex justify-between w-full border py-3 border-gray-800 rounded-2xl p-2 cursor-pointer">
                                                <div className="order-first">
                                                   <img src="../../assets/images/trustWallet.png" alt="" width={20} />
                                                </div>
                                                <div>
                                                    Continue with TrustWallet
                                                </div>
                                                <div className=""></div>
                                            </button>
                                        </div>
                                        <div className="text-white">
                                            <button className="bg-gray-900 flex justify-between w-full border py-3 border-gray-800 rounded-2xl p-2 cursor-pointer">
                                                <div className="order-first">
                                                  <img src="../../assets/images/metamask.png" alt="" width={20} />
                                                </div>
                                                <div>
                                                    Continue with MetaMask
                                                </div>
                                                <div className=""></div>
                                            </button>
                                        </div>
                                        <div className="text-white">
                                            <button className="bg-gray-900 flex justify-between w-full border py-3 border-gray-800 rounded-2xl p-2 cursor-pointer">
                                                <div className="order-first">
                                                    <Wallet />
                                                </div>
                                                <div>
                                                    Continue with other wallet
                                                </div>
                                                <div className=""></div>
                                            </button>
                                        </div>
                                        <div className="text-amber-300 font-bold lg:text-center">
                                           <Link to={`/register`}>
                                           Create a Binance Account
                                           </Link>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </article>
                </section>
            </main>
        </>
    )
}