import { useEffect, useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { Link, useNavigate } from "react-router";
import { dropdownMenus, topNavMenu, type menu } from "~/consts/menuLists";

export default function HorizonalNavBar() {
  const [open, setOpen] = useState({ open: true, value: "" });
  const navigate = useNavigate();


  return topNavMenu?.map((e, i) => {
    const handler = () => {
       if (open.open && e.hasMore) {
        setOpen({open:false, value:""});
        return
       } else if (!open.open && e.hasMore){
        setOpen({open:true, value:e.value})
        return
       } else {
        navigate(e.value)
       }
    
    }
    return (
      <button
        key={i}
        onClick={handler}
        className="relative"
        onMouseEnter={() => setOpen({ open: true, value: e.value })}
        onMouseLeave={() => setOpen({ open: false, value: "" })}
      >
        <li className="py-6 px-4 flex hover:**:text-amber-300">
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
                  <div className="bg-gray-900 p-6 absolute w-md flex flex-col items-start -left-10 rounded-b-xl">
                        {
                          dropdownMenus[e.value]?.map((data:menu, i)=> (
                              <li  key={i} className="flex my-4 gap-4 hover:**:first:text-amber-300 hover:**:not-first:text-gray-400">
                                    {data.icon}
                                    <div className="flex flex-col items-start gap-y-1 **:-mt-2">
                                          <p className="text-gray-100 text-lg font-bold">{data.label}</p>
                                          <p className="text-gray-500 text-sm font-medium">{data.description}</p>
                                    </div>
                              </li>
                          ))    
                        }
                  </div>
            ):null
        }
      </button>
    );
  });
}
