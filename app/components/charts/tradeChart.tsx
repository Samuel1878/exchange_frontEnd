import { TradeButton } from "./components/buttons";
import CandleSticks from "./components/candleSticks";
import Header from "./components/header";

export default function ({product_id, openMobileTrade, type}) {
      return (
        <div className="space-y-1 bg-black">
            <div>
              <Header pair={product_id} />
            </div>
            <div className=" bg-gray-900 rounded-sm">
              <CandleSticks product_id={product_id} type={type}/>
            </div>

          <div className="fixed bottom-0 right-0 left-0 bg-gray-900 px-4 py-2 pb-4 md:hidden">
            <TradeButton
              action={openMobileTrade}
              textStyle="font-semibold"
              style="bg-amber-400 w-full h-10"
              label="Trade"
            />
          </div>
        </div>
      );
}