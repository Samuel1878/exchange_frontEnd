
import { useEffect, useState } from "react";
import FooterSection from "~/components/footer";
import OrderCenter from "~/components/wallet/OrderCenter";
import FinancialAccount from "~/components/wallet/FinancialAccount";
import AssetOverview from "~/components/wallet/AssetOverview";
import {
  ArrowLeftFromLine,
  ArrowRightFromLine,
  ArrowLeftRight,
  BadgeDollarSign,
  Bolt,
  ChartCandlestick,
  FileText,
  Ticket,
  Wallet,
} from "lucide-react";
import { RiNotionFill } from "react-icons/ri";
import SpotAccount from "~/components/wallet/SpotAccount";
import Transfer from "~/components/wallet/Transfer";
import AssetAccount from "~/components/wallet/AssetAccount";
import Nfts from "~/components/wallet/Nfts";

export default function WalletOverview() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedToken, setSelectedToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [userSelectedTab, setUserSelectedTab] = useState("overview");
  const [isTransferring, setIsTransferring] = useState(false);
  const tabs = [
    { id: "overview", label: "Asset overview", icon: <Wallet size={18} /> },
    { id: "spot", label: "Spot Account", icon: <Bolt size={18} /> },
    { id: "fiat", label: "Fiat currency account", icon: <Ticket size={18} /> },
    {
      id: "financial",
      label: "Financial Account",
      icon: <ChartCandlestick size={18} />,
    },
    {
      id: "asset",
      label: "Asset Account",
      icon: <BadgeDollarSign size={18} />,
    },
    { id: "order", label: "Order center", icon: <FileText size={18} /> },
    { id: "nfts", label: "Nfts", icon: <RiNotionFill size={18} /> },
    { id: "transfer", label: "Transfer", icon: <ArrowLeftRight size={18} /> },
  ];
  const MobileView = [
    { id: "overview", label: "Asset overview" },
    { id: "spot", label: "Spot Account" },
    { id: "financial", label: "Financial Account" },
  ];
  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };
  const handleTransferClick = (token: any) => {
    setSelectedToken(token);
    setActiveTab("transfer");
    setIsTransferring(true);
  };
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);

      if (mobile) {
        setActiveTab("overview");
        setIsTransferring(false);
      } else {
        setActiveTab(userSelectedTab);
        setIsTransferring(false);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [userSelectedTab]);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };
  const handleExitTransfer = () => {
    setIsTransferring(false);
    setActiveTab("overview");
  };
  return (
    <main className="bg-gray-900 lg:bg-gray-950 overflow-x-hidden min-h-screen">
      <section id="hero" className="flex flex-col lg:items-center">
        <article
          id="hero1"
          className="flex flex-col gap-4 lg:gap-y-8 lg:max-w-6xl xl:min-w-6xl"
        >
          <div className="lg:max-w-7xl md:max-w-6xl">
            <div className="text-gray-300 p-6 md:p-5 space-y-10">
              <div className="hidden sm:hidden md:hidden lg:flex  flex-row gap-6 ">
                {/* Sidebar */}
                <div
                  className={`transition-all py-4 duration-300 ${isSidebarCollapsed ? "w-16" : "basis-1/6"}`}
                >
                  <div
                    className={`${isSidebarCollapsed ? "space-y-2" : "space-y-4"} mb-6 flex flex-col`}
                  >
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => {
                          setActiveTab(tab.id);
                          setLoading(true);
                          setTimeout(() => {
                            setLoading(false);
                          }, 10000);
                        }}
                        className={`px-4 flex gap-2 py-4 rounded-md font-medium transition-colors ${
                          activeTab === tab.id
                            ? "bg-amber-300 text-gray-900"
                            : "bg-gray-900 text-gray-300 hover:bg-gray-800"
                        } ${isSidebarCollapsed ? "justify-center" : ""}`}
                        title={isSidebarCollapsed ? tab.label : ""}
                      >
                        {tab.icon}
                        {!isSidebarCollapsed && (
                          <span className="whitespace-nowrap text-sm">
                            {tab.label}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Toggle Button and Content Area */}
                <div className="flex-1 relative">
                  {/* Toggle Button */}
                  <div className="border-l border-gray-500 relative h-16 lg:h-auto mb-6 lg:mb-0">
                    <button
                      onClick={toggleSidebar}
                      className="absolute -left-3 top-1/2 -translate-y-1/2 bg-amber-300 rounded-full p-2 text-gray-700 border border-gray-700 hover:bg-amber-300 transition-colors duration-200 z-10"
                    >
                      {isSidebarCollapsed ? (
                        <ArrowRightFromLine size={16} />
                      ) : (
                        <ArrowLeftFromLine size={16} />
                      )}
                    </button>
                  </div>

                  {/* Main Content */}
                  <div className="w-full">
                    <div className="border-l border-gray-700 p-5">
                      <div className="">
                        {activeTab === "overview" && <AssetOverview />}
                        {activeTab === "financial" && (
                          <FinancialAccount
                            onTransferClick={handleTransferClick}
                          />
                        )}
                        {activeTab === "order" && <OrderCenter />}
                        {activeTab === "spot" && (
                          <SpotAccount
                            setActiveTab={setActiveTab}
                            selectedToken={selectedToken}
                            onTransferClick={handleTransferClick}
                          />
                        )}
                        {activeTab === "fiat" && (
                          <div className="text-center py-8">
                            <h3 className="text-xl font-semibold text-amber-300 mb-2">
                              Fiat Currency Account
                            </h3>
                            <p className="text-gray-400">
                              Fiat account features coming soon...
                            </p>
                          </div>
                        )}
                        {activeTab === "asset" && (
                          <AssetAccount
                            setActiveTab={setActiveTab}
                            selectedToken={selectedToken}
                          />
                        )}
                        {activeTab === "nfts" && <Nfts />}
                        {activeTab === "transfer" && (
                          <Transfer
                            setActiveTab={setActiveTab}
                            selectedToken={selectedToken}
                            onExitTransfer={handleExitTransfer}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile View */}
              <div className="lg:hidden">
                {!isTransferring && (
                  <div className="flex flex-col-3 gap-4">
                    {MobileView.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => handleTabClick(tab.id)}
                        className={`px-3 py-1 ${
                          activeTab === tab.id
                            ? "text-gray-100 border-b-2 border-b-amber-300"
                            : "hover:text-gray-100"
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                )}

                <div className="space-y-6 mt-6">
                  {activeTab === "overview" && <AssetOverview />}
                  {activeTab === "financial" && (
                    <FinancialAccount onTransferClick={handleTransferClick} />
                  )}
                  {activeTab === "spot" && (
                    <SpotAccount
                      setActiveTab={setActiveTab}
                      selectedToken={selectedToken}
                      onTransferClick={handleTransferClick}
                    />
                  )}
                  {activeTab === "transfer" && (
                    <Transfer
                      setActiveTab={setActiveTab}
                      selectedToken={selectedToken}
                      onExitTransfer={handleExitTransfer}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </article>
      </section>
      <FooterSection />
    </main>
  );
}
