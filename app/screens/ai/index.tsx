import SlotCouter from "react-slot-counter";
import { AiLists } from "~/consts/aiList";
export default function () {
  return (
    <main id={"#ai"}>
      <section className="max-w-7xl p-4 lg:hidden">
        <nav className="flex w-full justify-between my-4">
          <h3 className="text-xl font-bold">AI strategy trading</h3>
          <p className="text-xl font-bold text-amber-400">Orders</p>
        </nav>
        <div className="bg-neutral-950 rounded-xl">
          <div className="flex">
            <div className="flex flex-col justify-center items-center flex-1 gap-2">
              <p className="space-x-1">
    
                <img
                  className="inline mr-1 md:mr-2 w-4 md:w-6"
                  src="assets/icons/user.svg"
                />
                Numbers of users
              </p>
              <p className="text-xl md:text-4xl font-bold">
     
                <SlotCouter value={"337,133"} />
              </p>
            </div>
            <div className="flex flex-col justify-center items-center flex-1 my-10 gap-2 border-l-1 border-dashed border-gray-600">
              <p className="space-x-1">
             
                <img
                  className="inline mr-1 md:mr-2 w-4 md:w-6"
                  src="assets/icons/moneyBag.svg"
                  
                />
                Total earnings
              </p>
              <p className="text-xl md:text-4xl font-bold align-middle">
                
                <SlotCouter value={"125.92M"} />
              </p>
            </div>
          </div>
          <div className="flex border-t-1 border-dashed border-gray-600">
            <div className="flex flex-col justify-center items-center flex-1 py-10 gap-2">
              <p className="space-x-1 font-bold text-lg md:text-xl text-gray-500">
                  <img
                  className="inline mr-2"
                  src="assets/coins/miniBtc.png"
                  width={25}
                />
                BTC
              </p>
              <p className="text-lg md:text-2xl font-medium">
                <SlotCouter value={"105221.5"} />
              </p>
            </div>
            <div className="flex flex-col justify-center items-center flex-1 py-10">
              <p className="space-x-1 font-bold text-lg md:text-xl text-gray-500">
                <img
                  className="inline mr-2"
                  src="assets/coins/miniEth.png"
                  width={25}
                />
                ETH
              </p>
              <p className="text-lg md:text-2xl font-medium">
           
                <SlotCouter value={"3608.27"} />
              </p>
            </div>
            <div className="flex flex-col justify-center items-center py-10 flex-1">
              <p className="space-x-1 font-bold text-lg md:text-xl text-gray-500">
              
                <img
                  className="inline mr-2"
                  src="assets/coins/atom.png"
                  width={25}
                />
                ATOM
              </p>
              <p className="text-lg md:text-2xl font-medium">
            
                <SlotCouter value={"3.0561"} />
              </p>
            </div>
          </div>
        </div>
        <nav className="p-2 bg-neutral-950 my-6 rounded-md">
          <p>sam***@gmail.com just created AI strategy</p>
        </nav>
        <article>
          <h1 className="text-2xl font-bold">Avaliable AI Strategies</h1>
          <div className="my-4 flex flex-col gap-4 md:flex-row md:flex-wrap justify-center items-center">
            {AiLists.map((e) => {
              return (
                <div className="w-full bg-neutral-950 rounded-lg">
                  <div className="bg-gray-900 flex-1 flex m-2 rounded-md relative">
                    <img
                      src={e.line}
                      className="w-full max-h-20 mt-20 "
                    />
                    <div className="flex gap-2 items-center absolute top-3 left-4">
                        {e.icon}
                        <p className="text-md font-bold">{e.symbol}</p>
                  </div>
                  <p className="absolute top-15 right-5 text-md md:text-lg font-medium text-gray-500">{e.method}</p>
                  </div>
                  <div className="flex-1 flex flex-col p-1 md:p-4">
                    <div className="flex m-2">
                      <div className="flex-1 md:p-2 p-1 border-r-1 border-gray-500 border-dashed">
                        <div className="flex items-center justify-between">
                          <p className="text-gray-400 text-sm md:text-xl">Maximum Yield</p>
                          <p className="text-green-500 text-sm md:text-2xl">{e.maxYield}</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-gray-400 text-sm md:text-xl">
                            Minimum Amount
                          </p>
                          <p className="text-gray-300 text-sm md:text-2xl">
                            {e.miniAmount}
                          </p>
                        </div>
                      </div>
                      <div className="flex-1 md:p-2 p-1">
                        <div className="flex items-center justify-between">
                          <p className="text-gray-400 text-sm md:text-xl">Max Drawdown</p>
                          <p className="text-green-500 text-sm md:text-2xl">{e.maxDrawDown}</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-gray-400 text-sm md:text-xl">
                            Operating Time
                          </p>
                          <p className="text-gray-300 text-sm md:text-2xl">
                            {e.operatingTime}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mx-4 flex justify-between items-center">
                      <p className="text-lg md:text-2xl">
                        <img src="assets/icons/user.svg" className="inline" />{" "}
                        Users{"   " + e.users}
                      </p>
                      <button className="p-3 bg-amber-400 rounded-md text-gray-950 text-md md:text-lg">
                        Use Strategy
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </article>
      </section>
    </main>
  );
}
