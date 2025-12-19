import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import { FaPowerOff, FaUserCog } from "react-icons/fa";
import { GrHistory } from "react-icons/gr";
import { MdDashboard, MdSavings, MdWorkHistory } from "react-icons/md";
import { RiCopperCoinFill, RiExchange2Fill } from "react-icons/ri";
import { Link, redirect, useNavigate, useSearchParams } from "react-router";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "~/components/ui/sidebar";
import { useWalletStore } from "~/store/useUserWalletStore";
import { Logo } from "~/utils";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "type=overview",
    icon: MdDashboard,
  },
  {
    title: "Spot Wallet",
    url: "type=spot",
    icon: RiExchange2Fill,
  },
  {
    title: "Financial",
    url: "type=financial",
    icon: MdSavings,
  },
  {
    title: "Funding",
    url: "type=funding",
    icon: RiCopperCoinFill,
  },
  {
    title: "History",
    url: "type=history",
    icon: MdWorkHistory,
  },
  {
    title: "Account",
    url: "type=account",
    icon: FaUserCog,
  },
];

export function AppSidebar() {
  const {reset} = useWalletStore();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams()

  return (
    <Sidebar
      className="bg-gray-900 lg:bg-gray-950 "
      collapsible="icon"
      variant="inset"
    >
      <SidebarContent className="bg-gray-900 lg:bg-gray-950 ">
        <SidebarGroup className="cursor-pointer">
          <SidebarGroupLabel className="mb-10">
            <Link to={"/"}>
              <img src={Logo} className="h-20" />
            </Link>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem
                  key={item.title}
                  className="text-gray-100 hover:bg-gray-800 active:bg-gray-800 focus:bg-gray-800 rounded-md hover:text-amber-300"
                >
                  <SidebarMenuButton asChild className="hover:text-amber-300">
                    <div
                      onClick={() => setSearchParams(item.url)}
                      className="py-8"
                    >
                      <item.icon />
                      <span className="hover:text-amber-300 text-lg">
                        {item.title}
                      </span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter
        className="cursor-pointer bg-gray-900 lg:bg-gray-950"
        onClick={() => console.log("logout")}
      >
        <button
          className="text-red-400 font-bold cursor-pointer flex items-center justify-center gap-2"
          onClick={() => {
            reset();
            navigate("/");
          }}
        >
          <FaPowerOff />
          Log out
        </button>
      </SidebarFooter>
    </Sidebar>
  );
}
