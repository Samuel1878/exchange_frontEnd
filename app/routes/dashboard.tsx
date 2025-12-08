import { redirect } from "react-router";
import { useAuthStore } from "~/store/useUserDataStore";
import type { Route } from "./+types/dashboard";
import {

  SidebarProvider,
  SidebarTrigger,
} from "~/components/ui/sidebar";
import { AppSidebar } from "~/components/sidebar";
import AssetOverview from "~/components/wallet/AssetOverview";
import { useState } from "react";
import { RiLayoutRightLine } from "react-icons/ri";

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
      <SidebarProvider
        className="bg-gray-900 lg:bg-gray-950 relative"
        open={openSidebar}
      >
        <AppSidebar></AppSidebar>

        <main className="w-full bg-gray-900 lg:bg-gray-950 h-full relative">
          <button
            onClick={() => setOpenSidebar((prev) => !prev)}
            className="absolute text-gray-50 p-2"
          >
            <RiLayoutRightLine size={28} />
          </button>
          {type === "overview" && <AssetOverview />}
        </main>
      </SidebarProvider>
    );
}