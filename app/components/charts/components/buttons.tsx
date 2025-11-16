export const TradeButton = ({label, action, style="", textStyle=""}:{label:string, action:()=>void, style:string, textStyle:string}) => {
      return(
            <button onClick={action} className={`${style} flex items-center justify-center rounded-md`}>
                  <p className={`${textStyle} text-md`}>{label}</p>
            </button>
      )
};

export const OrderBookFilterBtn = ({option, toggleAction}) => {
      return (
        <button className="flex  space-x-1 rounded-lg" onClick={toggleAction}>
          <div className="space-y-1">
            <div className="h-1.5 w-4 rounded-xs bg-gray-400" />
            <div className="h-1.5 w-4 rounded-xs bg-gray-400" />
            <div className="h-1.5 w-4 bg-gray-400 rounded-xs" />
          </div>
          <div className={` flex-col gap-1 flex`}>
            <div
              className={`w-3 flex-1 flex rounded-xs bg-green-400 ${option === "both" ? "flex" : "hidden"}`}
            />
            <div
              className={`w-3 flex flex-1 rounded-xs bg-red-500 ${option === "both" ? "flex" : "hidden"}`}
            />
            <div
              className={`w-3 flex-1 rounded-xs bg-green-400 ${option === "bid" ? "flex" : "hidden"}`}
            />
            <div
              className={`w-3 flex-1 rounded-xs bg-red-500 ${option === "ask" ? "flex" : "hidden"}`}
            />
          </div>
        </button>
      );
}