import type { FunctionComponent } from "react";

interface PriceLevelRowProps {
  total: string;
  size: string;
  price: string;
}

const PriceLevelRow: FunctionComponent<PriceLevelRowProps> = ({
  total,
  size,
  price,
}) => {
  return (
    <div
      className={`flex
  justify-around
  bg-gray-900
  relative
  after:bg-center
   h-6
      after:h-full
      after:p-1
      after:block
      after:absolute
      after:left-0
      z-0

  `}
    >
      <>
        <span className="price text-gray-50">{price}</span>
        <span className="text-gray-700">{size}</span>
        <span className="text-gray-50">{total}</span>
      </>
    </div>
  );
};

export default PriceLevelRow;
