import type { JSX } from "react"

type coinlistTypes = {
      name:string,
      symbol:string,
      icon?:JSX.Element
}
export const miniCoinList:coinlistTypes[] = [
      {
            name:"bitcoin",
            symbol:"BTC",
            icon:<img src="../../assets/coins/miniBtc.png" width={32}/>,

      },
           {
            name:"ethereum",
            symbol:"ETH",
            icon:<img src="../../assets/coins/miniEth.png" width={32}/>,

      },
       {
            name:"xrp",
            symbol:"XRP",
            icon:<img src="../../assets/coins/miniXrp.png"  width={32}/>,

      },
           {
            name:"lightcoin",
            symbol:"LTC",
            icon:<img src="../../assets/coins/miniBnb.png"  width={32}/>,

      },
           {
            name:"tron",
            symbol:"TRX",
            icon:<img src="../../assets/coins/miniSol.png"  width={32}/>,

      },
          

]