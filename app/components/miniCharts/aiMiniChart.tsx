import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router";
import { miniAiList } from "~/consts/miniLists";
import { HiUsers } from "react-icons/hi2";
import SlotCounter from "react-slot-counter";
export default function AiMiniChart() {
  return (
    <div className="bg-gray-900 flex flex-col lg:min-w-md items-center xl:min-w-lg md:bg-gray-800 md:rounded-2xl md:p-4 md:px-8 md:mx-8 lg:mx-4">
      <div className="w-full flex items-center justify-between">
        <p className="text-gray-50">Top AI quantitative strategy</p>
        <Link
          to={"ai"}
          className="font-thin hidden md:flex items-center text-sm text-gray-400"
        >
          View More <IoIosArrowForward size={14} color="rgba(140,140,140,.7)" />
        </Link>
      </div>
      {miniAiList.map((e) => {
        return (
          <div key={e.id} className="flex flex-row w-full my-5 ">
            <div className="flex flex-row flex-4 justify-between">
              <div className="flex gap-2 items-center">
                {e.icon}
                <p className="text-md text-gray-50 font-bold">{e.symbol}</p>
              </div>
              <div className="flex items-center gap-2 justify-between">
                <p>
                  {" "}
                  <SlotCounter value={e.users} />
                </p>
                <HiUsers color="#d9d9d9" />
              </div>
            </div>
            <div className="flex-1 flex justify-end">
              <p className="text-green-400">{e.maxWinRate}</p>
            </div>
          </div>
        );
      })}
      <Link to={"ai"} className="font-thin flex items-center text-sm md:hidden text-gray-400">
        View More <IoIosArrowForward size={14} color="rgba(140,140,140,.7)" />
      </Link>
    </div>
  );
}
