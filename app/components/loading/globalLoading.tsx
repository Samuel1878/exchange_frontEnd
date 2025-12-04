export default function GlobalLoader () {
    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,.4)",
          display: "flex",
          height: "full",
          justifyContent: "center",
          alignItems: "center",
          color: "#fff",
          zIndex: 9999,
        }}
        role="status"
      >
        <div className="w-full h-screen gap-1 pt-40 pb-40 relative flex items-center justify-center">
          <div className="flex flex-col items-center animate-[bounce_1s_ease-in-out_infinite_0.1s]">
            <div className="w-1 h-3 bg-green-500"></div>
            <div className="w-4 h-6 bg-green-500 rounded-xs"></div>
            <div className="w-1 h-3 bg-green-500"></div>
          </div>

          <div className="flex flex-col items-center animate-[bounce_1s_ease-in-out_infinite_0.2s]">
            <div className="w-1 h-3 bg-red-500"></div>
            <div className="w-4 h-6 bg-red-500 rounded-xs"></div>
            <div className="w-1 h-3 bg-red-500"></div>
          </div>

          <div className="flex flex-col items-center animate-[bounce_1s_ease-in-out_infinite_0.1s]">
            <div className="w-1 h-3 bg-green-500"></div>
            <div className="w-4 h-6 bg-green-500 rounded-xs"></div>
            <div className="w-1 h-3 bg-green-500"></div>
          </div>
        </div>
      </div>
    );
}