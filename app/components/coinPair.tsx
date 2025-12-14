import { Coins } from "~/utils";

export function PairImage (first:string, second:string, width:number) {
    console.log(second)

    return(
        <div className="relative pl-5">
            <img src={Coins[first?.toUpperCase()]} className="rounded-full absolute right-1/3" width={width}/>
            <img src={Coins[second?.toUpperCase()]} className="rounded-full" width={width}/>
        </div>
    )
}