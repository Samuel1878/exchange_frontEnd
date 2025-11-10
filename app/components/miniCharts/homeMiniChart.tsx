import { useState } from "react";
import { Link } from "react-router";
import { miniCoinList } from "~/consts/miniLists";
import { IoIosArrowForward } from "react-icons/io";
import SlotCounter from "react-slot-counter"
enum lists {
  coin = "coin",
  nft = "nft",
  // stock = "stock",
}

export default function HomeMiniChart() {
  const [focus, setFocus] = useState<lists>(lists.coin);
  return (
    <div className="bg-gray-900 flex flex-col lg:min-w-md items-center xl:min-w-lg md:bg-gray-800 md:rounded-2xl md:p-4 md:px-8 md:mx-8 lg:mx-4">
      <div className="w-full flex items-center justify-center gap-4 md:justify-between">
        <div className="flex items-center justify-center gap-4 md:justify-start">
          <button
          onClick={() => setFocus(lists.coin)}
          className={`p-2 ${focus === lists.coin ? "border-b-2 border-b-amber-300" : "border-0"}`}
        >
          <p
            className={`text-md font-bold ${focus === lists.coin ? "text-gray-50" : "text-gray-400"}`}
          >
            Top Listing
          </p>
        </button>
        <button
          onClick={() => setFocus(lists.nft)}
          className={`p-2 ${focus === lists.nft ? "border-b-2 border-b-amber-300" : "border-0"}`}
        >
          <p
            className={`text-md font-bold  ${focus === lists.nft ? "text-gray-50" : "text-gray-400"}`}
          >
            NFTs
          </p>
        </button>
        </div>
       
        <Link to={"market"} className="text-md font-thin md:flex items-center gap-2 hidden">
          View more <IoIosArrowForward size={14} color="rgba(140,140,140,.7)"/>

        </Link>
      </div>
      {lists.coin === focus ? (
        <div className="w-full">
          {miniCoinList.map((e) => {
            return (
              <div key={e.id} className="flex flex-row w-full my-5 ">
                <div className="flex flex-row flex-4 justify-between">
                  <div className="flex gap-2 items-center">
                    {e.icon}
                    <p className="text-md text-gray-50 font-bold">{e.symbol}</p>
                    <p className="text-sm font-thin capitalize">{e.name}</p>
                  </div>
                  <SlotCounter value={"$1309920"}/>
                </div>
                <div className="flex-1 flex justify-end">
                  <p className="text-green-400">+0.24%</p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div></div>
      )}
      <Link to={"market"} className="font-thin flex items-center text-sm md:hidden">
        View More <IoIosArrowForward size={14} color="rgba(140,140,140,.7)"/>

      </Link>
    </div>
  );
}
