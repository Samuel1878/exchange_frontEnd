import { useCallback, useMemo, useRef, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useNavigate } from "react-router";
import { dropdownMenus, type menu } from "~/consts/menuLists";
import { MdKeyboardArrowUp } from "react-icons/md";

export default function VerticalNavBar({ e, i }: { e: menu; i: number }) {
  const [open, setOpen] = useState({ opening: false, value: "" });
  const navigate = useNavigate();
  const itemRef = useRef(null);
  const openHandler = () => {
    if (e.hasMore && open.opening) {
      setOpen({ opening: false, value: "" });
      return;
    } else if (e.hasMore && !open.opening) {
      setOpen({ opening: true, value: e.value });
      return;
    } else {
      navigate(`${e.value}`);
    }
  };
  return (
    <div className="flex flex-col w-full">
      <button key={i} onClick={openHandler} >
      <li
        ref={itemRef}
        className="py-5 z-30 px-7 w-full justify-between flex items-center bg-gray-900 transition-colors hover:bg-gray-800 hover:**:text-neutral-100"
      >
        <div className="flex gap-4 items-center">
          {e.icon}
          <p className="text-gray-500 font-medium text-lg capitalize">
            {e.label}
          </p>
        </div>
        {e.hasMore ? (
          open.opening ? (
            <MdKeyboardArrowUp size={23} color="#d9d9d9" />
          ) : (
            <MdKeyboardArrowDown size={23} color="#d9d9d9" />
          )
        ) : null}
      </li>
      
      </button>
    {open.opening
        ? open.value &&
          dropdownMenus[open.value]?.map((e: menu) => (
            <button key={e.value} className="py-4 px-23 flex items-start w-full hover:bg-gray-800 transition-colors hover:**:text-neutral-100">
              <p className="text-gray-500 font-medium text-lg capitalize">{e.label}</p>
            </button>
          ))
        : null}

    </div>
    
  );
}
