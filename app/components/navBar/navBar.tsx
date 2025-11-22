import Hamburger from "hamburger-react";
import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate, useNavigation } from "react-router";
import { topNavMenu, verticalNavMenu } from "~/consts/menuLists";
import gsap from "gsap";
import { BiDownload } from "react-icons/bi";
import { MdKeyboardArrowDown } from "react-icons/md";
import VerticalNavBar from "./verticalNavBar";
import { RiGlobalFill } from "react-icons/ri";
import HorizonalNavBar from "./horizonalNavBar";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const menuRef = useRef(null);
  const navRef = useRef(null);
  const toggleMenu = () => setIsOpen((prev) => !prev);
  const navigate = useNavigate();
  useEffect(() => {
    if (!menuRef.current) return;
    if (isOpen) {
      gsap.to(menuRef.current, {
        duration: 0.7,
        translateY: 20,
        ease: "power2.out",
        opacity: 1,
        display: "flex",
      });
    } else {
      gsap.to(menuRef.current, {
        duration: 0.4,
        translateY: -2,
        opacity: 0,
        ease: "power2.in",
        onComplete: () => {
          if (menuRef.current) {
            menuRef.current.style.display = "none";
          }
        },
      });
    }
  }, [isOpen]);
  const resizeHandler = () => {
    if (window.innerWidth > 1024) {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  });
  return (
    <header className="top-0 right-0 left-0 bg-gray-900 lg:bg-gray-950 z-100 min-h-16 flex w-full">
      <nav className="flex w-full justify-between items-center relative px-2 pl-3 md:px-4 lg:px-8 xl:px-12">
        <div className="flex flex-row gap-2 lg:gap-4 items-center">
          <Link to="/" onClick={() => setIsOpen(false)}>
            <img src="../../assets/logo.png" className="w-30 z-50 lg:w-32" />
          </Link>

          <ul className="flex-row items-center space-x-3 hidden lg:flex lg:ml-6">
            <HorizonalNavBar />
          </ul>
        </div>

        <div className="flex gap-4 lg:items-center xl:gap-5">
          <div className="lg:flex hidden gap-3 ">
            <button className="bg-gray-800 p-1 px-4 rounded-md">
              <p className="text-gray-50 font-medium text-md">Log In</p>
            </button>
            <button className="bg-amber-300 p-1 px-4 rounded-md">
              <p className="text-gray-950 font-medium text-md">Sign Up</p>
            </button>
          </div>
          <div className="h-5 w-0.5 hidden xl:block  bg-gray-600 mx-2" />
          <button
            onClick={() => navigate("#download")}
            className="hidden xl:flex items-center justify-center"
          >
            <BiDownload size={30} />
          </button>
          <button
            // onClick={() => navigate("#download")}
            className="hidden xl:flex items-center justify-center"
          >
            {/* <RiGlobalFill size={30}/> */}
            <img src="../assets/icons/lang.svg" className="w-8 h-8" />
          </button>
          <div className="flex-row flex gap-2 items-center lg:hidden">
            <Hamburger
              toggled={isOpen}
              toggle={setIsOpen}
              color="#fff"
              size={23}
              distance="lg"
            />
          </div>
        </div>

        <ul
          id="toggleNav"
          ref={menuRef}
          className="z-30 border-b-2 border-gray-400 rounded-b-2xl h-screen overflow-y-auto pt-2 hidden md:h-screen flex-col overflow-hidden absolute left-0 right-0 top-10 bg-gray-900 opacity-0"
        >
          <div className="flex-row px-7 flex gap-4 my-8 justify-around items-center w-full">
            <button className="flex justify-center items-center rounded-lg bg-gray-700 w-full h-10">
              <p className="text-neutral-50 text-lg font-medium">Log In</p>
            </button>
            <button className="flex justify-center items-center rounded-lg bg-amber-300 w-full h-10">
              <p className="text-neutral-950 text-lg font-medium">Sign Up</p>
            </button>
          </div>
          {verticalNavMenu?.map((e, i) =>
            VerticalNavBar({ e: e, i: i, toggleMenu: toggleMenu })
          )}
          <div className="h-full w-full pb-20" onClick={toggleMenu} />
        </ul>
      </nav>
    </header>
  );
}
