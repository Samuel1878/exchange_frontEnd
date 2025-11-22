
import FooterSection from "~/components/footer";
import AllMarketTickerProvider from "~/context/socketContext/AllMarketTickerContext";
import MarketView from "~/components/marketView";

export default function Dashboard() {
    return (
      <AllMarketTickerProvider>
        <main className="bg-gray-900 lg:bg-gray-950 flex flex-col min-h-svh overflow-hidden justify-between">
          <MarketView/>
          <FooterSection />
        </main>
      </AllMarketTickerProvider>
    );
}