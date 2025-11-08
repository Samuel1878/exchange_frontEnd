import { useEffect, useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { Link } from "react-router";
import { dropdownMenus, topNavMenu, type menu } from "~/consts/menuLists";

export default function HorizonalNavBar() {
  const [open, setOpen] = useState({ open: true, value: "" });


  return topNavMenu?.map((e, i) => {
    return (
      <Link
        key={e.value}
        to={`/${e.value}`}
            className="relative"
        onMouseEnter={() => setOpen({ open: true, value: e.value })}
        onMouseLeave={() => setOpen({ open: false, value: "" })}
      >
        <li className="py-6 px-4 flex hover:**:text-amber-300 relative">
          <p className="text-gray-100 lg:text-md xl:text-lg font-bold capitalize">
            {e.label}
          </p>
          {e.hasMore ? (
            open.open && open.value === e.value ? (
              <MdKeyboardArrowUp size={23} color="#d9d9d9" />
            ) : (
              <MdKeyboardArrowDown size={23} color="#d9d9d9" />
            )
          ) : null}
        </li>
        {
           e.hasMore&& open.open && open.value === e.value ? (
                  <div className="bg-gray-900 p-6 absolute w-md flex flex-col -left-10 rounded-b-xl">
                        {
                          dropdownMenus[e.value]?.map((data:menu)=> (
                              <li  key={data.value} className="flex my-4 hover:**:first:text-amber-300 hover:**:not-first:text-gray-400">
                                    {data.icon}
                                    <div className="flex flex-col gap-1 ml-4 -mt-2">
                                          <p className="text-gray-100 text-lg font-bold">{data.label}</p>
            
                                          <p className="text-gray-500 text-sm font-medium">{data.description}</p>
                                    </div>
                              </li>
                          ))    
                        }
                  </div>
            ):null
        }
      </Link>
    );
  });
}
