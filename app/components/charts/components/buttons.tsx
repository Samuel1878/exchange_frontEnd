export const TradeButton = ({
  label,
  action,
  style = "",
  textStyle = "",
  disabled = false
}: {
  label: string;
  action: () => void;
  style: string;
  textStyle: string;
  disabled?:boolean

}) => {
  return (
    <button
      onClick={action}
      className={`${style} flex items-center justify-center rounded-md cursor-pointer disabled:opacity-50`}
      disabled={disabled}
    >
      <p className={`${textStyle} text-md`}>{label}</p>
    </button>
  );
};

export const OrderBookFilterBtn = ({ option, toggleAction }) => {
  return (
    <button className="flex  space-x-1 rounded-lg cursor-pointer" onClick={toggleAction}>
      <div className="space-y-1">
        <div className="h-1.5 w-4  bg-gray-400" />
        <div className="h-1.5 w-4  bg-gray-400" />
        <div className="h-1.5 w-4 bg-gray-400 " />
      </div>
      <div className={` flex-col gap-1 flex`}>
        <div
          className={`w-3 flex-1 flex  bg-green-400 ${option === "both" ? "flex" : "hidden"}`}
        />
        <div
          className={`w-3 flex flex-1  bg-red-500 ${option === "both" ? "flex" : "hidden"}`}
        />
        <div
          className={`w-3 flex-1  bg-green-400 ${option === "bid" ? "flex" : "hidden"}`}
        />
        <div
          className={`w-3 flex-1  bg-red-500 ${option === "ask" ? "flex" : "hidden"}`}
        />
      </div>
    </button>
  );
};

export const OrderBookFilterBtnWeb = ({ option, setAction }) => {
  return (
    <div className="flex gap-4">
      <div
        onClick={() => setAction("both")}
        className={`flex gap-1 cursor-pointer ${option === "both" ? "opacity-100" : "opacity-30"}`}
      >
        <div className={` flex-col gap-1 flex`}>
          <div className={`w-2 flex-1 flex  bg-green-400 `} />
          <div className={`w-2 flex flex-1  bg-red-500 `} />
        </div>
        <div className="space-y-1">
          <div className="h-1 w-3  bg-gray-400" />
          <div className="h-1 w-3  bg-gray-400" />
          <div className="h-1 w-3 bg-gray-400 " />
        </div>
      </div>
      <div
        onClick={() => setAction("bid")}
        className={`flex gap-1 cursor-pointer ${option === "bid" ? "opacity-100" : "opacity-30"}`}
      >
        <div className={` flex-col gap-1 flex`}>
          <div className={`w-2 flex-1  bg-green-400 flex}`} />
        </div>
        <div className="space-y-1">
          <div className="h-1 w-3  bg-gray-400" />
          <div className="h-1 w-3  bg-gray-400" />
          <div className="h-1 w-3 bg-gray-400 " />
        </div>
      </div>

      <div
        onClick={() => setAction("ask")}
        className={`flex gap-1 cursor-pointer ${option === "ask" ? "opacity-100" : "opacity-30"}`}
      >
        <div className={` flex-col gap-1 flex`}>
          <div className={`w-2 flex-1  bg-red-500 flex}`} />
        </div>
        <div className="space-y-1">
          <div className="h-1 w-3  bg-gray-400" />
          <div className="h-1 w-3  bg-gray-400" />
          <div className="h-1 w-3 bg-gray-400 " />
        </div>
      </div>
    </div>
  );
};
