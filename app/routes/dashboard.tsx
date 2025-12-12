import { redirect } from "react-router";
import { useAuthStore } from "~/store/useUserDataStore";
import type { Route } from "./+types/dashboard";
import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar";
import { AppSidebar } from "~/components/dashboard/sidebar";
import React, { Activity, useState } from "react";
import OverView from "~/components/dashboard/overview";
import FooterSection from "~/components/footer";
import SpotWallet from "~/components/dashboard/spot";
import FundingWallet from "~/components/dashboard/funding";
import FinancialWallet from "~/components/dashboard/financial";
import { calculateUserBalances } from "~/utils/helpers";
// import { user } from "~/consts";
import TransferDrawerDialog from "~/components/dashboard/transfer";

export async function clientLoader({
  params,
  request,
}: Route.ClientLoaderArgs) {
  const url = new URL(request.url);
  const type = url.searchParams.get("type");
  const loggedIn = useAuthStore.getState().isLoggedIn;
  const user = useAuthStore.getState().user;
  if (!loggedIn) {
    throw redirect("/login");
  }
  return { type, user };
}
export default function Dashboard({ loaderData }: Route.ComponentProps) {
  const { type, user } = loaderData;
  const {accessToken} = useAuthStore()
  console.log("user", accessToken);
  const [openTransfer, setOpenTransfer] = useState(false);
    const { walletDetails, walletTotals, totalUSDT } = calculateUserBalances(
      user,
      { USDT: 1, BTC: 9400, ETH: 3220 }
    );
    const toggleTransfer = () => setOpenTransfer((prev)=>!prev)
  return (
    <React.Fragment>
      <SidebarProvider className="bg-gray-900 lg:bg-gray-950 relative">
        <AppSidebar />
        <main className="w-full bg-gray-900 lg:bg-gray-950 h-full relative">
          <SidebarTrigger className="text-gray-100 m-4"></SidebarTrigger>
          <Activity mode={type === "overview" ? "visible" : "hidden"}>
            <OverView walletTotals={walletTotals} totalUSDT={totalUSDT} />
          </Activity>
          <Activity mode={type === "spot" ? "visible" : "hidden"}>
            <SpotWallet
              walletDetails={walletDetails}
              walletTotals={walletTotals}
              toggleTransfer={toggleTransfer}
            />
          </Activity>
          <Activity mode={type === "funding" ? "visible" : "hidden"}>
            <FundingWallet
              walletDetails={walletDetails}
              walletTotals={walletTotals}
              toggleTransfer={toggleTransfer}
            />
          </Activity>
          <Activity mode={type === "financial" ? "visible" : "hidden"}>
            <FinancialWallet
              walletDetails={walletDetails}
              walletTotals={walletTotals}
              toggleTransfer={toggleTransfer}
            />
          </Activity>
          <FooterSection />
        </main>
      </SidebarProvider>
      <TransferDrawerDialog
        open={openTransfer}
        setOpen={toggleTransfer}
        wallet={type}
        walletDetails={walletDetails}
      />
    </React.Fragment>
  );
}
