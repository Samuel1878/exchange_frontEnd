import { redirect } from "react-router";
import { useAuthStore } from "~/store/useUserDataStore";
import type { Route } from "./+types/dashboard";
import {

  SidebarProvider,
  SidebarTrigger,
} from "~/components/ui/sidebar";
import { AppSidebar } from "~/components/sidebar";
import AssetOverview from "~/components/wallet/AssetOverview";
import React, { useState } from "react";
import { RiLayoutRightLine } from "react-icons/ri";
import OverView from "~/components/dashboard/overview";
import FooterSection from "~/components/footer";
import SpotAccount from "~/components/wallet/SpotAccount";
import SpotWallet from "~/components/dashboard/spot";
import FundingWallet from "~/components/dashboard/funding";
import FinancialWallet from "~/components/dashboard/financial";

export async function clientLoader ({params, request}:Route.ClientLoaderArgs) {
    
   const url = new URL(request.url);
   const type = url.searchParams.get("type");
  const loggedIn = useAuthStore.getState().isLoggedIn;
    if (!loggedIn) {
      throw redirect("/login");
    }
    return {type}

};
export default function Dashboard ({loaderData}:Route.ComponentProps) {
    const [openSidebar, setOpenSidebar] = useState(true)
    const {type} = loaderData
    return (
      <React.Fragment>
        {" "}
        <SidebarProvider
          className="bg-gray-900 lg:bg-gray-950 relative"
          // open={openSidebar}
        >
          <AppSidebar></AppSidebar>

          <main className="w-full bg-gray-900 lg:bg-gray-950 h-full relative">
            <SidebarTrigger className="text-gray-100 m-4"></SidebarTrigger>
            {/* <button
            onClick={() => setOpenSidebar((prev) => !prev)}
            className="absolute text-gray-50 p-2"
          >
            <RiLayoutRightLine size={28} />
          </button> */}
            {type === "overview" && <OverView />}
            {type === "spot" && <SpotWallet/>}
            {type === "funding" ? <FundingWallet/> :null}
            {type === "financial" ? <FinancialWallet/> :null}
            <FooterSection />
          </main>
        </SidebarProvider>
      </React.Fragment>
    );
}