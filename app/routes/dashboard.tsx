import { redirect } from "react-router";
import { useAuthStore } from "~/store/useUserDataStore";
import type { Route } from "./+types/dashboard";
import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar";
import { AppSidebar } from "~/components/dashboard/sidebar";
import React, { Activity, useEffect, useState } from "react";
import OverView from "~/components/dashboard/overview";
import FooterSection from "~/components/footer";
import SpotWallet from "~/components/dashboard/spot";
import FundingWallet from "~/components/dashboard/funding";
import FinancialWallet from "~/components/dashboard/financial";
import { calculateUserBalances } from "~/utils/helpers";
// import { user } from "~/consts";
import TransferDrawerDialog from "~/components/dashboard/transfer";
import { getUserDataAPI } from "~/api/authAPI";

export async function clientLoader({
  params,
  request,
}: Route.ClientLoaderArgs) {
  const url = new URL(request.url);
  const type = url.searchParams.get("type");
  const loggedIn = useAuthStore.getState().isLoggedIn;
  const accessToken = useAuthStore.getState().accessToken;

  if (!loggedIn) {
    throw redirect("/login");
  }
  const user = useAuthStore.getState().user;
  return { type, user, accessToken };
}
export default function Dashboard({ loaderData }: Route.ComponentProps) {
  const { type, user, accessToken } = loaderData;
  const setUser = useAuthStore.getState().setUser;
  useEffect(() => {
    (async () => {
      if (accessToken) {
        const response = await getUserDataAPI(accessToken);
        if (response && response?.success) {
          console.log(response);
          setUser(response?.data);
        }
      }
    })();
  }, [accessToken]);

  const wallet = useAuthStore.getState().wallet;
  const [openTransfer, setOpenTransfer] = useState(false);
  const { walletDetails, walletTotals, totalUSDT } = calculateUserBalances(
    wallet,
    { USDT: 1, BTC: 9400, ETH: 3220 }
  );
  const toggleTransfer = () => setOpenTransfer((prev) => !prev);
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
