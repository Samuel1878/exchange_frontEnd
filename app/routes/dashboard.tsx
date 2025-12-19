import { redirect } from "react-router";
// import { useAuthStore } from "~/store/useUserDataStore";
import type { Route } from "./+types/dashboard";
import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar";
import { AppSidebar } from "~/components/dashboard/sidebar";
import React, { Activity, useEffect, useState } from "react";
import OverView from "~/components/dashboard/overview";
import FooterSection from "~/components/footer";
import SpotWallet from "~/components/dashboard/spot";
import FundingWallet from "~/components/dashboard/funding";
import FinancialWallet from "~/components/dashboard/financial";
// import { calculateUserBalances, extractNonZeroSymbols, getPrices } from "~/utils/helpers";
// import { user } from "~/consts";
import TransferDrawerDialog from "~/components/dashboard/transfer";
import { getUserDataAPI, getUserWalletAPI } from "~/api/authAPI";
import { useWalletStore } from "~/store/useUserWalletStore";

export async function clientLoader({
  params,
  request,
}: Route.ClientLoaderArgs) {
  const url = new URL(request.url);
  const type = url.searchParams.get("type");
  const loggedIn = useWalletStore.getState().isLoggedIn;
  const accessToken = useWalletStore.getState().accessToken;

  if (!loggedIn) {
    throw redirect("/login");
  }
  // const wallet = useWalletStore.getState().wallets;
  // const user = useAuthStore.getState().user;
  // const prices = extractNonZeroSymbols(wallet);
  return {type , accessToken}
  // if (prices?.length){
  //    data = await getPrices(prices)
  // }
  // return { type, user, accessToken, wallet, prices:data};
}

export default function Dashboard({ loaderData }: Route.ComponentProps) {
  const { type, accessToken} = loaderData;
  const {updateWalletsFromWalletApi} = useWalletStore()

  useEffect(() => {
    (async () => {
      if (accessToken) {
        const response = await getUserWalletAPI(accessToken);
        if (response && response?.success) {
          console.log(response);
          updateWalletsFromWalletApi(response?.data?.wallets);
        }
      }
    })();
  }, [accessToken]);


  const [openTransfer, setOpenTransfer] = useState(false);
  const toggleTransfer = () => setOpenTransfer((prev) => !prev);
  return (
    <React.Fragment>
      <SidebarProvider className="bg-gray-900 lg:bg-gray-950 relative">
        <AppSidebar />
        <main className="w-full bg-gray-900 lg:bg-gray-950 h-full relative">
          <SidebarTrigger className="text-gray-100 m-4"></SidebarTrigger>
          <Activity mode={type === "overview" ? "visible" : "hidden"}>
            <OverView />
          </Activity>
          <Activity mode={type === "spot" ? "visible" : "hidden"}>
            <SpotWallet toggleTransfer={toggleTransfer} />
          </Activity>
          <Activity mode={type === "financial" ? "visible" : "hidden"}>
            <FinancialWallet toggleTransfer={toggleTransfer} />
          </Activity>
          <Activity mode={type === "funding" ? "visible" : "hidden"}>
            <FundingWallet toggleTransfer={toggleTransfer} />
          </Activity>

          <FooterSection />
        </main>
      </SidebarProvider>
      <TransferDrawerDialog
        open={openTransfer}
        setOpen={toggleTransfer}
        wallet={type}
      />
    </React.Fragment>
  );
}
