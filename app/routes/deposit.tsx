import FooterSection from "~/components/footer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { useState, useEffect } from "react";
import miniUsdt from "assets/coins/usdt_circle.png";
import miniBtc from "assets/coins/miniBtc.png";
import miniEth from "assets/coins/miniEth.png";
import miniusdc from "assets/coins/usdc.jpg";
import HomeStart from "assets/images/how-buy-step3.svg";
import HomeStart2 from "assets/images/how-step1.svg";
import HomeStart3 from "assets/images/how-step2.svg";
import HeaderImage from "assets/images/vip-ins-dark.svg";
import { QRCodeSVG } from "qrcode.react";
import { useNavigate } from "react-router";
interface LoaderDataParams {
  type: string | null;
}

export async function clientLoader({
  params,
}: {
  params: { type?: string };
}): Promise<LoaderDataParams> {
  return { type: params.type || null };
}
interface Asset {
  symbol: string;
  name: string;
  coin: string;
  network: string;
}
interface Tab {
  label: string;
  name: string;
}
const availableAssets: Asset[] = [
  {
    symbol: "USDT",
    name: "USDT-TRC20",
    network: "Tron(TRC20)",
    coin: miniUsdt,
  },
  { symbol: "BTC", name: "BTC", network: "Bitcoin", coin: miniBtc },
  { symbol: "ETH", name: "ETH", network: "Tron(TRC20)", coin: miniEth },
  {
    symbol: "USDTERC",
    name: "USDT-ERC20",
    network: "Ethereum(ERC20)",
    coin: miniUsdt,
  },
  { symbol: "USDC", name: "USDC", network: "Ethereum(ERC20)", coin: miniusdc },
  { symbol: "USDTBEP", name: "USDT-BEP20", network: "BSC-USD", coin: miniUsdt },
];
const addressData = [
  { symbol: "USDT", network: "Tron(TRC20)", address: "TRXsdfsdfdsfsdsfsdfsfd" },
  {
    symbol: "ETH",
    network: "Ethereum(ERC20)",
    address: "ETxsadfasfsdfsafddsfdfs;",
  },
  { symbol: "BTC", network: "Bitcoin", address: "BTcsdafasdfsdfsdfdsfds" },
  {
    symbol: "USDTERC",
    network: "Ethereum(ERC20)",
    address: "0x453lfkaasfsadfsdfsf",
  },
  {
    symbol: "USDC",
    network: "Ethereum(ERC20)",
    address: "0x5342533lfkaasfsadfsdfsf",
  },
  { symbol: "USDTBEP", network: "BSC-USD", address: "0xsadfsdfsdfsdfsfsadf" },
];
const TabMenu: Tab[] = [
  { name: "Deposit", label: "deposit" },
  { name: "Withdraw", label: "withdraw" },
];
const Withdraw = () => {
  const [selectedCurrency, setSelectedCurrency] = useState("USDT");
  const [spendselectedCurrency, setSpendSelectedCurrency] = useState("USDT");
  const [receivedselectedCurrency, setReceivedSelectedCurrency] =
    useState("BTC");
  const [depositAddress, setDepositAddress] = useState("");
  const [selectedNetwork, setSelectedNetwork] = useState("");
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const selected = addressData.find(
      (item) => item.symbol === selectedCurrency
    );
    if (selected) {
      setDepositAddress(selected.address);
      setSelectedNetwork(selected.network);
    }
  }, [selectedCurrency]);

  const handleCurrencyChange = (value: string) => {
    setSelectedCurrency(value);
  };
  const spenhandleCurrencyChanges = (value: string) => {
    setSpendSelectedCurrency(value);
  };
  const receivedhandleCurrencyChange = (value: string) => {
    setReceivedSelectedCurrency(value);
  };
  return (
    <>
      <div className="p-4 border rounded-2xl border-gray-800 w-full">
        <h1>Spend</h1>
        <div className="flex justify-between py-4">
          <div className="text-white">
            <input
              type="text"
              placeholder="Enter Amount"
              className="w-full border-gray-300 rounded-md px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-900 lg:focus:ring-gray-950"
            />
          </div>
          <div className="text-white">
            <Select
              value={spendselectedCurrency}
              onValueChange={spenhandleCurrencyChanges}
            >
              <SelectTrigger
                className="w-full bg-gray-900 border lg:bg-gray-950 lg:border-gray-950 border-gray-900 rounded-lg py-4 px-3 text-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900 hover:bg-gray-900"
                aria-label="Select Currency"
              >
                <SelectValue placeholder="Select Currency" />
              </SelectTrigger>
              <SelectContent
                className="bg-gray-800 border  border-gray-700 text-white hover:bg-gray-900 w-full min-w-[var(--radix-select-trigger-width)]"
                position="popper"
                align="end"
                sideOffset={5}
              >
                {availableAssets.map((c) => (
                  <SelectItem
                    key={c.symbol}
                    value={c.symbol}
                    className=" rounded cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={c.coin}
                        alt={c.symbol}
                        width={20}
                        height={20}
                        className="rounded-full"
                      />
                      <p className=" hover:text-gray-950 text-sm"> {c.name}</p>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="p-4 border rounded-2xl border-gray-800">
        <h1>Receive</h1>
        <div className="flex justify-between py-4">
          <div className="text-white">
            <input
              type="text"
              value={0}
              className="w-full border-gray-300 rounded-md px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-900 lg:focus:ring-gray-950"
            />
          </div>
          <div className="text-white">
            <Select
              value={receivedselectedCurrency}
              onValueChange={receivedhandleCurrencyChange}
            >
              <SelectTrigger
                className="w-full bg-gray-900 border lg:bg-gray-950 lg:border-gray-950 border-gray-900 rounded-lg py-4 px-3 text-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900 hover:bg-gray-900"
                aria-label="Select Currency"
              >
                <SelectValue placeholder="Select Currency" />
              </SelectTrigger>
              <SelectContent
                className="bg-gray-800 border  border-gray-700 text-white hover:bg-gray-900"
                position="popper"
                align="end"
                sideOffset={5}
              >
                {availableAssets.map((c) => (
                  <SelectItem
                    key={c.symbol}
                    value={c.symbol}
                    className=" rounded cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={c.coin}
                        alt={c.symbol}
                        width={20}
                        height={20}
                        className="rounded-full"
                      />
                      <p className=" hover:text-gray-950 text-sm"> {c.name}</p>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      {/* <div className="p-4 border rounded-2xl border-gray-800">
                <label className="block text-sm font-medium mb-2">Select Currency</label>
                <Select value={selectedCurrency} onValueChange={handleCurrencyChange}>
                    <SelectTrigger
                        className="w-full bg-gray-900 border-gray-900 lg:bg-gray-950 border lg:border-gray-950 text-gray-300 rounded-lg py-7 px-3 focus:outline-none focus:ring-2 focus:ring-gray-900 hover:bg-gray-900"
                        aria-label="Select Currency"
                    >
                        <SelectValue placeholder="Select Currency" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border border-gray-700  hover:bg-gray-950 text-white">
                        {availableAssets.map((c) => (
                            <SelectItem
                                key={c.symbol}
                                value={c.symbol}
                                className="hover:bg-gray-700 rounded cursor-pointer transition-colors"
                            >
                                <div className="flex items-center gap-2">

                                    <img
                                        src={c.coin}
                                        alt={c.symbol}
                                        width={30}
                                        height={30}
                                        className="rounded-full"
                                    />
                                    <p className=" hover:text-gray-950 text-sm"> {c.name} <span className="text-gray-400">{c.network}</span></p>
                                </div>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

            </div> */}
      {login ? (
        <div className="lg:bg-gray-950 p-4 rounded-lg">
          <div className="space-y-2">
            <div className="text-white">
              <input
                type="text"
                placeholder="Enter Your Wallet Address"
                className="w-full border-gray-800 lg:border-gray-800 border rounded-md px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-800 lg:focus:ring-gray-900"
              />
            </div>
            <div className="text-white p-4">
              <button className="text-gray-950 bg-amber-300 w-full p-3 rounded-2xl">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-white p-4">
          <button
            className="text-gray-950 bg-amber-300 w-full p-3 rounded-2xl"
            onClick={() => navigate(`/login`)}
          >
            Buy Now
          </button>
        </div>
      )}
    </>
  );
};
const Deposit = () => {
  const [selectedCurrency, setSelectedCurrency] = useState("USDT");
  const [spendselectedCurrency, setSpendSelectedCurrency] = useState("BTC");
  const [receivedselectedCurrency, setReceivedSelectedCurrency] =
    useState("ETH");
  const [depositAddress, setDepositAddress] = useState("");
  const [amount, setAmount] = useState("100");
  const [login, setLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [conversionRate, setConversionRate] = useState<number>(0);
  const bearerToken = "ukowire8eam8bzqv98ab";
  const navigate = useNavigate();
  interface ConversionResponse {
    success: boolean;
    result?: number;
    error?: string;
  }
  useEffect(() => {
    const fetchConversionRate = async () => {
      if (!spendselectedCurrency || !receivedselectedCurrency || !bearerToken)
        return;

      setLoading(true);

      try {
        const response = await fetch(
          `https://api.freecryptoapi.com/v1/getConversion?from=${spendselectedCurrency}&to=${receivedselectedCurrency}&amount=${amount}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${bearerToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: ConversionResponse = await response.json();

        setConversionRate(data.result);
      } catch (err) {
        console.error("Error fetching conversion rate:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchConversionRate();
  }, [spendselectedCurrency, receivedselectedCurrency, bearerToken, amount]);
  useEffect(() => {
    const currentAsset = addressData.find(
      (a) => a.symbol === receivedselectedCurrency
    );
    setDepositAddress(currentAsset.address);
  });
  const spenhandleCurrencyChanges = (value: string) => {
    setSpendSelectedCurrency(value);
  };
  const receivedhandleCurrencyChange = (value: string) => {
    setReceivedSelectedCurrency(value);
  };
  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };
  return (
    <>
      <div className="p-4 border rounded-2xl border-gray-800 w-full">
        <h1>Spend</h1>
        <div className="flex justify-between py-4">
          <div className="text-white">
            <input
              type="text"
              placeholder="Enter Amount"
              className="w-full border-gray-300 rounded-md px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-900 lg:focus:ring-gray-950"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="text-white">
            <Select
              value={spendselectedCurrency}
              onValueChange={spenhandleCurrencyChanges}
            >
              <SelectTrigger
                className="w-full bg-gray-900 border lg:bg-gray-950 lg:border-gray-950 border-gray-900 rounded-lg py-4 px-3 text-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900 hover:bg-gray-900"
                aria-label="Select Currency"
              >
                <SelectValue placeholder="Select Currency" />
              </SelectTrigger>
              <SelectContent
                className="bg-gray-800 border  border-gray-700 text-white hover:bg-gray-900 w-full"
                position="popper"
                align="end"
                sideOffset={5}
              >
                {availableAssets.map((c) => (
                  <SelectItem
                    key={c.symbol}
                    value={c.symbol}
                    className=" rounded cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={c.coin}
                        alt={c.symbol}
                        width={20}
                        height={20}
                        className="rounded-full"
                      />
                      <p className=" hover:text-gray-950 text-sm"> {c.name}</p>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="p-4 border rounded-2xl border-gray-800">
        <h1>Receive</h1>
        <div className="flex justify-between py-4">
          <div className="text-white">
            <input
              type="text"
              value={conversionRate}
              className="w-full border-gray-300 rounded-md px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-900 lg:focus:ring-gray-950"
            />
          </div>
          <div className="text-white">
            <Select
              value={receivedselectedCurrency}
              onValueChange={receivedhandleCurrencyChange}
            >
              <SelectTrigger
                className="w-full bg-gray-900 border lg:bg-gray-950 lg:border-gray-950 border-gray-900 rounded-lg py-4 px-3 text-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900 hover:bg-gray-900"
                aria-label="Select Currency"
              >
                <SelectValue placeholder="Select Currency" />
              </SelectTrigger>
              <SelectContent
                className="bg-gray-800 border  border-gray-700 text-white hover:bg-gray-900"
                position="popper"
                align="end"
                sideOffset={5}
              >
                {availableAssets.map((c) => (
                  <SelectItem
                    key={c.symbol}
                    value={c.symbol}
                    className=" rounded cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={c.coin}
                        alt={c.symbol}
                        width={20}
                        height={20}
                        className="rounded-full"
                      />
                      <p className=" hover:text-gray-950 text-sm"> {c.name}</p>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      {/* <div className="p-4 border rounded-2xl border-gray-800">
                <label className="block text-sm font-medium mb-2">Select Currency</label>
                <Select value={selectedCurrency} onValueChange={handleCurrencyChange}>
                    <SelectTrigger
                        className="w-full bg-gray-900 border-gray-900 lg:bg-gray-950 border lg:border-gray-950 text-gray-300 rounded-lg py-7 px-3 focus:outline-none focus:ring-2 focus:ring-gray-900 hover:bg-gray-900"
                        aria-label="Select Currency"
                    >
                        <SelectValue placeholder="Select Currency" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border border-gray-700  hover:bg-gray-950 text-white">
                        {availableAssets.map((c) => (
                            <SelectItem
                                key={c.symbol}
                                value={c.symbol}
                                className="hover:bg-gray-700 rounded cursor-pointer transition-colors"
                            >
                                <div className="flex items-center gap-2">

                                    <img
                                        src={c.coin}
                                        alt={c.symbol}
                                        width={30}
                                        height={30}
                                        className="rounded-full"
                                    />
                                    <p className=" hover:text-gray-950 text-sm"> {c.name} <span className="text-gray-400">{c.network}</span></p>
                                </div>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

            </div> */}
      {login ? (
        <div className="bg-gray-950 p-4 rounded-lg">
          <div className="space-y-2">
            <div className="flex flex-col items-center space-y-3 p-4 bg-gray-950 rounded-lg">
              <span className="text-sm text-gray-400">Scan QR Code</span>
              <div className="bg-white p-2 rounded">
                <QRCodeSVG
                  value={depositAddress}
                  size={128}
                  bgColor="#ffffff"
                  fgColor="#000000"
                  level="M"
                />
              </div>
              <span className="text-xs text-gray-400 text-center">
                Scan to deposit funds
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Deposit Address:</span>
              <div className="flex items-center gap-2">
                <span className="text-white font-mono text-sm">
                  {depositAddress}
                </span>
                <button
                  onClick={() => navigator.clipboard.writeText(depositAddress)}
                  className="text-blue-400 hover:text-blue-300 text-sm"
                >
                  Copy
                </button>
              </div>
            </div>
            <div className="text-white p-4">
              <button className="text-gray-950 bg-amber-300 w-full p-3 rounded-2xl">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-white p-4">
          <button
            className="text-gray-950 bg-amber-300 w-full p-3 rounded-2xl"
            onClick={() => navigate(`/login`)}
          >
            Buy Now
          </button>
        </div>
      )}
    </>
  );
};
export default function AnnouncementPage({
  loaderData,
}: {
  loaderData: LoaderDataParams;
}) {
  const [activeTab, setActiveTab] = useState("deposit");
  const [loading, setLoading] = useState(false);

  return (
    <main className="bg-gray-900 lg:bg-gray-950 min-h-screen overflow-x-hidden">
      <section id="hero" className="flex flex-col lg:items-center">
        <article
          id="hero1"
          className="flex flex-col gap-4 lg:gap-y-8 lg:max-w-6xl w-full"
        >
          <div className="w-full">
            <div className="text-gray-300 p-6 md:p-5 space-y-10">
              <div className="grid lg:grid-cols-2 gap-4">
                <div className="text-white text-2xl space-y-7 lg:text-4xl lg:font-bold">
                  <h1>Buy BTC with USD</h1>
                  <div className="space-y-7">
                    <img src={HeaderImage} alt="" className="w-80" />
                  </div>
                </div>

                {/* Currency Selection */}
                <div className="text-white space-y-4 border p-4 border-gray-800 rounded-2xl">
                  <div className="flex flex-row justify-around space-x-4">
                    {TabMenu.map(({ label, name }) => (
                      <button
                        key={label}
                        onClick={() => {
                          setActiveTab(label);
                        }}
                        className={`px-3 py-1 ${
                          activeTab === label
                            ? "text-gray-100 border-b-2 border-b-amber-300"
                            : "hover:text-gray-100"
                        }`}
                      >
                        {name}
                      </button>
                    ))}
                  </div>
                  <div className="space-y-7">
                    {loading ? (
                      <div className="flex flex-col items-center justify-center my-4 h-52">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
                        <span className="mt-3 text-gray-400">
                          Loading content...
                        </span>
                      </div>
                    ) : (
                      <>
                        {activeTab === "deposit" && <Deposit />}
                        {activeTab === "withdraw" && <Withdraw />}
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="space-y-7 text-white">
                <div className="grid gap-4 lg:grid-cols-3">
                  <div className="border border-gray-800 rounded-2xl p-4">
                    <div className="space-y-4">
                      <img src={HomeStart2} alt="" width={80} />
                    </div>
                    <div className="space-y-4 py-3 font-semibold">
                      <h1>1.Enter Amount & Select Payment</h1>
                      <p className="text-sm font-thin">
                        Enter the amount, select the available payment method,
                        and choose the payment network.
                      </p>
                    </div>
                  </div>
                  <div className="border border-gray-800 rounded-2xl p-4">
                    <div className="space-y-4">
                      <img src={HomeStart3} alt="" width={80} />
                    </div>
                    <div className="space-y-4 py-3 font-semibold">
                      <h1>2.Confirm Order</h1>
                      <p className="text-sm font-thin">
                        Confirmation of transaction detail information,
                        including trading pair quotes, fees, and other
                        explanatory tips.
                      </p>
                    </div>
                  </div>
                  <div className="border border-gray-800 rounded-2xl p-4">
                    <div className="space-y-4">
                      <img src={HomeStart} alt="" width={80} />
                    </div>
                    <div className="space-y-4 py-3 font-semibold">
                      <h1>3.Receive Crypto</h1>
                      <p className="text-sm font-thin">
                        After successful payment, the purchased crypto will be
                        deposited into your Spot or Funding Wallet.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-7 text-white">
                <div className="grid gap-4 lg:grid-cols-2">
                  <div className="border border-gray-800 text-white p-4 rounded-2xl space-y-7">
                    <h1 className="space-y-4">BTC to USD</h1>
                    <div className="flex flex-row justify-between">
                      <p>0.5 BTC</p>
                      <p>42,182.94 USD</p>
                    </div>
                    <div className="flex flex-row justify-between">
                      <p>1 BTC</p>
                      <p>84,365.88 USD</p>
                    </div>
                    <div className="flex flex-row justify-between">
                      <p>5 BTC</p>
                      <p>421,829.40 USD</p>
                    </div>
                    <div className="flex flex-row justify-between">
                      <p>10 BTC</p>
                      <p>843,658.81 USD</p>
                    </div>
                    <div className="flex flex-row justify-between">
                      <p>50 BTC</p>
                      <p>4.22M USD</p>
                    </div>
                    <div className="flex flex-row justify-between">
                      <p>100 BTC</p>
                      <p>8.44M USD</p>
                    </div>
                    <div className="flex flex-row justify-between">
                      <p>500 BTC</p>
                      <p>42.18M USD</p>
                    </div>
                    <div className="flex flex-row justify-between">
                      <p>1000 BTC</p>
                      <p>84.37M USD</p>
                    </div>
                  </div>
                  <div className="border border-gray-800 text-white p-4 rounded-2xl space-y-7">
                    <h1 className="space-y-4">BTC to USD</h1>
                    <div className="flex flex-row justify-between">
                      <p>0.5 USD</p>
                      <p>0.0000059 BTC</p>
                    </div>
                    <div className="flex flex-row justify-between">
                      <p>1 USD</p>
                      <p>0.0000119 BTC</p>
                    </div>
                    <div className="flex flex-row justify-between">
                      <p>5 USD</p>
                      <p>0.0000593 BTC</p>
                    </div>
                    <div className="flex flex-row justify-between">
                      <p>10 USD</p>
                      <p>0.0001185 BTC</p>
                    </div>
                    <div className="flex flex-row justify-between">
                      <p>50 USD</p>
                      <p>0.0005927 BTC</p>
                    </div>
                    <div className="flex flex-row justify-between">
                      <p>100 USD</p>
                      <p>0.0011853 BTC</p>
                    </div>
                    <div className="flex flex-row justify-between">
                      <p>500 USD</p>
                      <p>0.0059266 BTC</p>
                    </div>
                    <div className="flex flex-row justify-between">
                      <p>1000 USD</p>
                      <p>0.0118531 BTC</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </section>
      <FooterSection />
    </main>
  );
}
