import type { JSX } from "react"

type coinlistTypes = {
      name:string,
      symbol:string,
      icon?:JSX.Element,
      id:number
}
export const miniCoinList:coinlistTypes[] = [
      {
            id:1,
            name:"bitcoin",
            symbol:"BTC",
            icon:<img src="../../assets/coins/miniBtc.png" width={32}/>,

      },
           {
            id:2,
            name:"ethereum",
            symbol:"ETH",
            icon:<img src="../../assets/coins/miniEth.png" width={32}/>,

      },
       {
            id:3,
            name:"xrp",
            symbol:"XRP",
            icon:<img src="../../assets/coins/miniXrp.png"  width={32}/>,

      },
           {
            id:4,
            name:"lightcoin",
            symbol:"LTC",
            icon:<img src="../../assets/coins/miniLtc.png"  width={32}/>,

      },
           {
            id:5,
            name:"tron",
            symbol:"TRX",
            icon:<img src="../../assets/coins/miniTrx.png"  width={32}/>,

      },
          

]
type ailistTypes = {
      maxWinRate:string,
      symbol:string,
      icon?:JSX.Element,
      users:string,
      id:number
}
export const miniAiList:ailistTypes[] = [
      {
            id:1,
            maxWinRate:"+24%",
            symbol:"BTC/ETH",
            users:"85",
            icon:<img src="../../assets/coins/btc_eth.png" width={36}/>,

      },
           {
            id:2,
            maxWinRate:"+21%",
            symbol:"BTC/USDT",
            users:"173",
            icon:<img src="../../assets/coins/btc_usdt.png" width={36}/>,

      },
       {
            id:3,
            maxWinRate:"+14%",
            symbol:"BTC/TRX",
            users:"59",
            icon:<img src="../../assets/coins/btc_trx.png"  width={36}/>,

      },
           {
            id:4,
            maxWinRate:"+12%",
            symbol:"ETH/TRX",
            users:"112",
            icon:<img src="../../assets/coins/eth_trx.png"  width={36}/>,

      },
           {
            id:5,
            maxWinRate:"+9%",
            symbol:"XRP/SOL",
            users:"61",
            icon:<img src="../../assets/coins/xrp_sol.png"  width={36}/>,

      },
          

]