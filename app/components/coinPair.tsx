import { memo } from "react";
import { Coins } from "~/utils";

interface PairImageProps {
  first: string;
  second: string;
  width: number;
}

const PairImage = memo(({ first, second, width }: PairImageProps) => {
  return (
    <div className="relative pl-5">
      <img
        src={Coins[first?.toUpperCase()]}
        className="rounded-full absolute right-1/3"
        width={width}
        alt={first}
      />
      <img
        src={Coins[second?.toUpperCase()]}
        className="rounded-full"
        width={width}
        alt={second}
      />
    </div>
  );
});

PairImage.displayName = "PairImage";

export { PairImage };
