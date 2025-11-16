import type { FunctionComponent } from "react";
import { OrderType } from "./orderBook";

interface PriceLevelRowProps {
  total: string;
  size: string;
  price: string;
  type: OrderType;
}

const PriceLevelRow: FunctionComponent<PriceLevelRowProps> = ({
  total,
  size,
  price,
  type
}) => {
  return (
    <div
      className={`flex
  justify-between
  bg-gray-900
  relative
  items-center
  after:bg-center
   h-4
      after:h-full
      after:p-1
      after:block
      after:absolute
      after:left-0
      z-0

  `}
    >
      <>
        <span className={`price text-sm ${type === OrderType.ASKS ? "text-red-500":"text-green-400"}`}>{price}</span>
        <span className="text-gray-300 text-sm md:flex">{size}</span>
        <span className="text-gray-50 hidden md:flex">{total}</span>
      </>
    </div>
  );
};

export default PriceLevelRow;
