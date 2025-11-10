import mobileScreenSvg from "assets/images/mobileScreen.svg";
import applePlay from "assets/images/apple.png";
import googlePlay from "assets/images/google.png";
import { QRCodeSVG } from "qrcode.react";

export default function DownloadSections() {
  return (
    <section id="download" className="lg:flex lg:flex-col lg:items-center">
      <div className="w-full py-8 lg:py-12 flex justify-center md:flex-row lg:max-w-6xl">
        <div className="flex flex-col items-center justify-center md:p-4 md:w-1/2">
          <h3 className="text-neutral-100 text-xl font-medium md:hidden">
            Play on the go. Anywhere, anytime.
          </h3>

          <img src={mobileScreenSvg} className="my-6 md:my-9" />

          <div className="flex flex-row gap-4 justify-center items-center md:hidden">
            <button>
              <img src={applePlay} style={{ width: 150, height: 50 }} />
            </button>
            <button style={{ width: 150, height: 50 }}>
              <img src={googlePlay} />
            </button>
          </div>
        </div>
        <div className="hidden md:flex md:w-1/2 p-8">
          <div className="flex flex-col items-center justify-around h-full">
            <h3 className="text-neutral-100 text-3xl font-mono">
              Trade on the go. <br />
              Anywhere, anytime.
            </h3>
            <div className="flex flex-row items-center gap-6">
              <div className="p-5 rounded-4xl border-neutral-700 border-2">
                <div className="bg-neutral-50 h-40 w-40 rounded-xl flex items-center justify-center">
                  <QRCodeSVG value="http://localhost:5173/" />
                </div>
              </div>
              <div className="flex flex-col">
                <p className="text-md font-light text-neutral-500">
                  Scan to Download App
                </p>
                <p className="text-lg font-normal text-neutral-100">
                  iOS and Android
                </p>
              </div>
            </div>

            <div className="flex flex-row gap-4">
              <button>
                <img src={applePlay} style={{ width: 180, height: 60 }} />
              </button>
              <button style={{ width: 180, height: 60 }}>
                <img src={googlePlay} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
