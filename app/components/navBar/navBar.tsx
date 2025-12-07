
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";

import React from "react";
import Hamburger from "hamburger-react";
import { Link, useNavigate } from "react-router";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import {
  dropdownMenus,
  topNavMenu,
  verticalNavMenu,
  type menu,
} from "~/consts/menuLists";
import { BiDownload } from "react-icons/bi";
import VerticalNavBar from "./verticalNavBar";
import { X } from "lucide-react";
import { LangIcon, Logo } from "~/utils";

export default function NavigationBar() {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const toggleMenu = () => setIsOpen((prev) => !prev);
  const navigate = useNavigate();
  const resizeHandler = () => {
    if (window.innerWidth > 1024) {
      setIsOpen(false);
    }
  };
  React.useEffect(() => {
    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  });
  return (
    <nav className="top-0 right-0 left-0 bg-gray-900 lg:bg-gray-950 z-100 min-h-16 flex w-full justify-between px-2 pl-3 md:px-4 lg:px-8 xl:px-10">
      <NavigationMenu viewport={false} className="bg-gray-900 lg:bg-gray-950">
        <div className="flex flex-row gap-2 lg:gap-4 items-center lg:mr-6">
          <Link
            to="/"
            // onClick={() => setIsOpen(false)}
          >
            <img src={Logo} className="w-30 z-50 lg:w-32" />
          </Link>
        </div>
        <NavigationMenuList className="hidden lg:flex">
          {topNavMenu.map((e, idx) => (
            <NavigationMenuItem
              className="bg-gray-900 lg:bg-gray-950 hover:bg-gray-950 cursor-pointer"
              key={idx}
            >
              {e.hasMore ? (
                <>
                  <NavigationMenuTrigger className="bg-gray-950 text-gray-100 lg:text-md xl:text-lg font-bold capitalize hover:bg-gray-950 focus:bg-gray-950 focus:text-amber-400">
                    {e.label}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="px-2 z-50">
                    <ul className="min-w-100 bg-gray-900">
                      {dropdownMenus[e.value]?.map((data: menu, i: number) => (
                        <li className="p-2" key={i}>
                          <NavigationMenuLink
                            // href={data.value}
                            onClick={() => navigate(data.value)}
                            asChild
                            className="bg-gray-900 hover:bg-gray-800 cursor-pointer "
                          >
                            {/* <Link to={data.value}> */}
                            <div
                              key={i}
                              className="flex flex-row items-center py-3  gap-4 hover:**:first:text-amber-300 hover:**:not-first:text-gray-300"
                            >
                              {data.icon}
                              <div className="flex flex-col items-start gap-y-1">
                                <p className="text-gray-100 text-lg font-bold">
                                  {data.label}
                                </p>
                                <p className="text-gray-500 text-sm font-medium">
                                  {data.description}
                                </p>
                              </div>
                            </div>
                            {/* </Link> */}
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </>
              ) : (
                <NavigationMenuLink
                  onClick={() => navigate(e.value)}
                  className="py-6 px-4 flex hover:**:text-amber-300 hover:bg-gray-950 "
                >
                  <div className="text-gray-100 lg:text-md xl:text-lg font-bold capitalize focus:text-amber-400">
                    {e.label}
                  </div>
                </NavigationMenuLink>
              )}
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
      <div className="lg:items-center flex gap-5 xl:gap-6">
        <div className="flex gap-3 items-center ">
          <button
            className="bg-gray-800 h-8 px-4 rounded-sm cursor-pointer hidden lg:flex items-center justify-center"
            onClick={() => navigate("login")}
          >
            
            <p className="text-gray-50 font-medium text-sm">Log In</p>
          </button>
          <button
            className="bg-amber-300 h-8 px-4 rounded-sm cursor-pointer"
            onClick={() => navigate("register")}
          >
            <p className="text-gray-800 font-medium text-sm">Sign Up</p>
          </button>
        </div>
        <div className="h-5 w-0.5 hidden xl:block  bg-gray-600 mx-2" />
        <button
          onClick={() => navigate("/#download")}
          className="hidden xl:flex items-center justify-center cursor-pointer"
        >
          <BiDownload size={30} color="#fff" />
        </button>
        <button
          // onClick={() => navigate("#download")}
          className="hidden xl:flex items-center justify-center cursor-pointer"
        >
          {/* <RiGlobalFill size={30}/> */}
          <img src={LangIcon} className="w-8 h-8" />
        </button>
        <div className="flex-row flex gap-2 items-center lg:hidden cursor-pointer">
          <Hamburger
            toggled={isOpen}
            toggle={setIsOpen}
            color="#fff"
            size={23}
            distance="lg"
          />
        </div>
      </div>

      <Drawer open={isOpen} direction="top" onClose={() => setIsOpen(false)}>
        <DrawerContent className="bg-gray-900">
          <DrawerClose className="top-4 right-6  absolute">
            <X color="#fff" />
          </DrawerClose>
          <DrawerHeader>
            <div className="h-5"></div>
            <DrawerTitle></DrawerTitle>
            <div className="flex-row px-7 flex gap-4 my-4 justify-around items-center w-full ">
              <button
                className="flex justify-center items-center rounded-lg bg-gray-700 w-full h-10"
                onClick={() => navigate("login")}
              >
                <p className="text-neutral-50 text-lg font-medium">Log In</p>
              </button>
              <button
                className="flex justify-center items-center rounded-lg bg-amber-300 w-full h-10"
                onClick={() => navigate("register")}
              >
                <p className="text-neutral-950 text-lg font-medium">Sign Up</p>
              </button>
            </div>
          </DrawerHeader>
          <DrawerDescription className="h-dvh overflow-y-auto px-4">
            {verticalNavMenu?.map((e, i) => (
              <VerticalNavBar key={i} e={e} i={i} toggleMenu={toggleMenu} />
            ))}
          </DrawerDescription>
        </DrawerContent>
      </Drawer>
    </nav>
  );
}
