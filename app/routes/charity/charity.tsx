
import FooterSection from "~/components/footer";
import CharittyImage from "assets/images/charity.png";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import { FeaturedProjects } from "~/consts/charity";
const randomNames = [
  "michael",
  "karen",
  "linda",
  "john",
  "david",
  "emily",
  "jessica",
  "daniel",
  "laura",
  "robert",
  "mary",
  "james",
  "patricia",
  "charles",
  "barbara",
  "thomas",
  "susan",
  "alex",
];
const maskName = (name) => {
  if (name.length <= 2) return name;
  return name[0] + "*".repeat(name.length - 2) + name[name.length - 1];
};
const getRandomPrice = (min = 10, max = 100000) =>
  (Math.random() * (max - min) + min).toFixed(3);
const DonationScrollNoCSS = () => {
  // Generate donations data once
  const donations = React.useMemo(() => {
    return Array.from({ length: 10 }).map(() => ({
      name: maskName(
        randomNames[Math.floor(Math.random() * randomNames.length)]
      ),
      price: getRandomPrice(),
    }));
  }, []);
  // We duplicate the list to scroll continuously without gaps
  const scrollRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  useEffect(() => {
    const scrollHeight = scrollRef.current.scrollHeight / 2;
    const interval = setInterval(() => {
      setScrollPosition((prev) => {
        let next = prev + 1;
        if (next >= scrollHeight) next = 0;
        return next;
      });
    }, 30); // Change scroll speed here (ms)
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="">
      <div className="grid grid-cols-3 text-sm font-semibold bg-gray-950 border-b border-gray-700 pb-5 mb-4 p-4">
        <div>Participant Users</div>
        <div className="text-center">Donation Time</div>
        <div className="text-right">Donation Amount</div>
      </div>
      <div className="relative h-96 w-full overflow-hidden bg-gray-900 text-white p-4">
        <div
          ref={scrollRef}
          className="space-y-2"
          style={{
            transform: `translateY(-${scrollPosition}px)`,
            transition: "none",
            willChange: "transform",
          }}
        >
          {[...donations, ...donations].map((don, idx) => (
            <div
              key={idx}
              className="grid grid-cols-3 border-b border-gray-700 py-2"
            >
              <div>{don.name}</div>
              <div className="text-center">
                {new Date().toLocaleTimeString()}
              </div>
              <div className="text-right">{don.price} USDT</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function CharityRoute() {
  const navigate = useNavigate();
  return (
    <main className="bg-gray-900 lg:bg-gray-950 overflow-x-hidden">
      <section id="hero" className="flex flex-col lg:items-center">
        <article
          id="hero1"
          className="flex flex-col gap-4 lg:gap-y-8 lg:max-w-6xl xl:min-w-6xl"
        >
          <div className="lg:max-w-6xl md:max-w-7xl">
            <div className=" text-gray-300 p-6 md:p-5 space-y-10">
              <div className="flex flex-col lg:flex-row lg:items-center md:items-start lg:justify-between lg:gap-6 space-y-7 lg:space-y-2 lg:space-x-10">
                <div className="space-y-7 mb-4 lg:mb-0 lg:w-1/2">
                  <img src={CharittyImage} alt="" className="lg:w-full" />
                </div>
                <div className="space-y-7 mb-4">
                  <h1 className="text-4xl font-bold lg:text-4xl">
                    Web3 Solutions for Social Change
                  </h1>
                  <p className="text-sm font-thin lg:text-xl lg:font-semibold lg:text-gray-400">
                    We are the '' charity organization, a non-profit
                    organization committed to leveraging web3 technology as the
                    future force for justice.
                  </p>
                </div>
              </div>
              <div className="flex flex-col lg:flex-row lg:items-center md:items-start lg:justify-between lg:gap-6 space-y-7 lg:space-x-10">
                <div className="space-y-7 mb-4 lg:mb-0 lg:w-1/2 bg-gradient-to-br from-gray-800 to-gray-900 rounded p-4 border-l-4 lg:border-l-4 border-amber-300">
                  <h2 className="text-2xl font-bold lg:text-3xl">
                    Our Commitments
                  </h2>
                  <p className="text-sm font-thin lg:text-sm lg:font-semibold lg:text-gray-400">
                    We enable Web3 as a driver of social transformation by
                    making its education and research accessible to all, and
                    advancing global solutions for local humanitarian impact.
                  </p>
                </div>
                <div className="space-y-7 mb-4 lg:mb-0 lg:w-1/2 bg-gradient-to-br from-gray-800 to-gray-900 rounded p-4 border-l-4 lg:border-l-4 border-amber-300">
                  <h2 className="text-2xl font-bold lg:text-3xl">Our Impact</h2>
                  <p className="text-sm font-thin lg:text-sm lg:font-semibold lg:text-gray-400">
                    To date, we have helped over 2 million people in more than
                    54 countries by committing more than $23 million to fund 32
                    projects. Because we believe Web 3 should be built by and
                    benefit all.
                  </p>
                </div>
              </div>
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 p-6 max-w-6xl mx-auto">
                <div className="lg:w-1/3 lg:my-30 flex justify-center">
                  <div className="relative w-full max-w-md aspect-square">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full shadow-2xl"></div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center space-x-0 space-y-2">
                      <div className="items-center text-center space-y-2 mb-4">
                        <h3 className="text-3xl font-bold text-white">
                          2,085,823
                        </h3>
                        <p className="text-sm font-thin text-gray-300">
                          Total Beneficiaries
                        </p>
                      </div>
                      <div className="items-center text-center space-y-2 mb-4">
                        <h3 className="text-3xl font-bold text-white">
                          12,452
                        </h3>
                        <p className="text-sm font-thin text-gray-300">
                          Amount Donations
                        </p>
                      </div>
                      <div className="items-center text-center space-y-2 mb-4">
                        <h3 className="text-3xl font-bold text-white">
                          1,519 <span className="text-lg">BTC</span>
                        </h3>
                        <p className="text-sm font-thin text-gray-300">
                          Bitcoin Donations Raised
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:w-2/3">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                    <h1 className="text-3xl font-bold text-white mb-4 md:mb-0">
                      Our Approach
                    </h1>
                    {/* <button className="bg-gradient-to-r from-amber-300 to-amber-400 hover:from-amber-300 hover:to-amber-400 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl">
                      Donate Now
                    </button> */}
                  </div>

                  <hr className="border-gray-700 mb-8" />

                  <div className="grid gap-8 lg:grid-cols-2">
                    <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition-colors duration-300">
                      <h2 className="text-xl font-bold text-white mb-3 flex items-center">
                        <span className="w-3 h-3 bg-blue-500 rounded-full mr-3"></span>
                        Direct Giving
                      </h2>
                      <p className="text-gray-300 lg:font-semibold lg:text-gray-400">
                        We transfer your donation directly to the end
                        beneficiary - meaning 100% of your money goes to those
                        who need it most.
                      </p>
                    </div>

                    <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-green-500 transition-colors duration-300">
                      <h2 className="text-xl font-bold text-white mb-3 flex items-center">
                        <span className="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
                        Transparency
                      </h2>
                      <p className="text-gray-300 lg:font-semibold lg:text-gray-400">
                        We revolutionize global giving by making it more
                        transparent to address challenges facing the social
                        sector such as corruption, lack of trust in nonprofits,
                        high global transfer fees, inefficient processes and
                        lack of accountability in donor spending.
                      </p>
                    </div>

                    <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-purple-500 transition-colors duration-300">
                      <h2 className="text-xl font-bold text-white mb-3 flex items-center">
                        <span className="w-3 h-3 bg-purple-500 rounded-full mr-3"></span>
                        Transformative Tech
                      </h2>
                      <p className="text-gray-300 lg:font-semibold lg:text-gray-400">
                        Conducting in-depth research to explore the potential of
                        Web3 technologies for social good.
                      </p>
                    </div>

                    <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-yellow-500 transition-colors duration-300">
                      <h2 className="text-xl font-bold text-white mb-3 flex items-center">
                        <span className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></span>
                        Research
                      </h2>
                      <p className="text-gray-300 lg:font-semibold lg:text-gray-400">
                        To better understand and support Web 3 solutions, we
                        invest in the innovation, research and development of
                        it.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-7">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                  <h1 className="text-3xl font-bold text-white mb-4 md:mb-0">
                    Featured News and Projects
                  </h1>

                  <Link
                    to="/charity/projects"
                    className="bg-gradient-to-r text-center from-amber-300 to-amber-400 hover:from-amber-300 hover:to-amber-400 text-gray-800 font-semibold py-3 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    View All
                  </Link>
                </div>
                <hr className="border-gray-700 mb-8" />
                <div className="overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] touch-pan-x pb-6">
                  <div className="flex space-x-4 w-max">
                    {FeaturedProjects.map((f) => (
                      <div
                        className="w-65 flex-shrink-0 rounded-lg shadow p-4 hover:border-amber-300 border border-gray-700 transition-colors duration-300 cursor-pointer"
                        key={f.id}
                        onClick={() => navigate(`projects/${f.id}`)}
                      >
                        <div className="relative rounded-lg overflow-hidden mb-4">
                          <img
                            src={f.imageUrl}
                            className="w-full h-36 object-cover"
                            alt={f.title}
                          />
                          <div className="absolute bottom-2 right-2 flex items-center space-x-2 bg-transparent bg-opacity-50 text-white text-xs rounded px-2 py-1 font-semibold select-none">
                            <div className="flex items-center space-x-1">
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M5.121 17.804A13.937 13.937 0 0112 15c3.148 0 6.06 1.175 8.293 3.27"
                                ></path>
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M12 11c-1.657 0-3-1.343-3-3m0 6a3 3 0 006 0m3-3a3 3 0 10-6 0"
                                ></path>
                              </svg>
                              <span>{f.donations}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <svg
                                className="w-4 h-4"
                                fill="currentColor"
                                stroke="none"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M12 1C6.486 1 2 5.486 2 11c0 3.347 1.916 6.269 4.81 7.725L4.18 23l5.559-2.022A8.957 8.957 0 0012 20c5.514 0 10-4.486 10-9s-4.486-10-10-10z" />
                              </svg>
                              <span>{f.beneficiaries}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-green-600 font-semibold text-sm">
                            {f.status}
                          </span>
                          <span className="text-gray-400 text-sm font-semibold">
                            {f.progress}%
                          </span>
                        </div>
                        <h3 className="font-bold text-lg mb-1">{f.title}</h3>
                        <p className="text-gray-400 text-sm">{f.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="space-y-7">
                <h2 className="text-3xl font-bold lg:text-4xl">
                  Donors for this Project
                </h2>
                <div className="">
                  <DonationScrollNoCSS />
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
