import { useEffect, useState } from "react";
import { FaRankingStar } from "react-icons/fa6";
import { LOCAL_URL } from "~/consts";
import { CoinPairs } from "~/consts/pairs";
import { formatTotalPrice } from "~/utils/helpers";
export interface AssetQuote {
  price: number;
  volume_24h: number;
  volume_24h_change_24h: number;
  market_cap: number;
  market_cap_change_24h: number;
  percent_change_15m: number;
  percent_change_30m: number;
  percent_change_1h: number;
  percent_change_6h: number;
  percent_change_12h: number;
  percent_change_24h: number;
  percent_change_7d: number;
  percent_change_30d: number;
  percent_change_1y: number;
  ath_price: number | null;
  ath_date: string | null;
  percent_from_price_ath: number | null;
}

export interface AssetData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number | null;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: Record<string, AssetQuote>;
}
export interface CoinTag {
  id: string;
  name: string;
  coin_counter: number;
  ico_counter: number;
}

export interface CoinTeamMember {
  id: string;
  name: string;
  position: string;
}

export interface CoinParent {
  id: string;
  name: string;
  symbol: string;
}

export interface CoinContract {
  contract: string;
  platform: string;
  type: string;
}

export interface CoinLinks {
  explorer: string[];
  facebook: string[];
  reddit: string[];
  source_code: string[];
  website: string[];
  youtube: string[];
  medium: string[] | null;
}

export interface CoinExtendedLinkStats {
  subscribers?: number;
  contributors?: number;
  stars?: number;
}

export interface CoinExtendedLink {
  url: string;
  type: string;
  stats?: CoinExtendedLinkStats;
}

export interface CoinWhitepaper {
  link: string;
  thumbnail: string;
}

export interface CoinDetail {
  id: string;
  name: string;
  symbol: string;

  parent?: CoinParent | null;

  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;

  logo: string;
  tags: CoinTag[];
  team: CoinTeamMember[];

  description: string;
  message: string;

  open_source: boolean;
  hardware_wallet: boolean;

  started_at: string;

  development_status: string;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;

  contract: string;
  platform: string;

  contracts: CoinContract[];

  links: CoinLinks;
  links_extended: CoinExtendedLink[];

  whitepaper: CoinWhitepaper;

  first_data_at: string;
  last_data_at: string;
}

export default function CandleStickInfo({pair}:{pair: string}) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<AssetData>(null);
  const [info, setInfo] = useState<CoinDetail>(null);
  useEffect(() => {
    (async () => {
      const coin_id = CoinPairs[pair].names[0] + "-" + CoinPairs[pair].names[2];
      const response = await fetch(
        LOCAL_URL + "/price/" + coin_id.toLowerCase(),
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      response.json().then((res) => {
        setData(res);
      });
      const info_response = await fetch(
        LOCAL_URL + "/info/" + coin_id.toLowerCase(),
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      info_response.json().then((res) => {
        setInfo(res);
      });
    })();
    setLoading(false);
  }, []);
  return (
    <div className="p-4 bg-gray-900 lg:bg-gray-950 text-gray-200 text-sm overflow-y-auto h-full md:overflow-y-hidden">
      {!loading && data && info ? (
        <div className="flex flex-col md:flex-row pr-2 md:gap-4">
          <div className="flex-1 flex-col">
            <p className="font-semibold text-md mb-5 flex items-center gap-2">
              <img
                src={info?.logo}
                width={20}
                className="overflow-hidden rounded-full"
              />
              {data?.name} ({data?.symbol})
            </p>
            <div className="w-full flex justify-between items-center mb-5">
              <p className="text-gray-500 font-medium">Rank</p>
              <p className=" font-semibold flex items-baseline gap-1">
                <FaRankingStar color="yellow" size={20} />
                {"No. " + data?.rank}
              </p>
            </div>

            <div className="w-full flex justify-between items-center mb-5">
              <p className="text-gray-500 font-medium">
                Market Capitallization
              </p>
              <p className="font-semibold text-right">
                ≈ ${formatTotalPrice(data?.quotes["USD"]?.market_cap)}
              </p>
            </div>
            <div className="w-full flex justify-between items-center mb-5">
              <p className="text-gray-500 font-medium">
                Fully Diluted Market Cap
              </p>
              <p className="font-semibold text-right">
                ≈ $
                {data?.max_supply
                  ? formatTotalPrice(
                      data?.quotes["USD"]?.price * data?.max_supply
                    )
                  : "N/A"}
              </p>
            </div>
            <div className="w-full flex justify-between items-center mb-5">
              <p className="text-gray-500 font-medium">Circulating Supply</p>
              <p className=" font-semibold flex items-baseline gap-1">
                {data?.total_supply?.toLocaleString()} {data?.symbol}
              </p>
            </div>
            <div className="w-full flex justify-between items-center mb-5">
              <p className="text-gray-500 font-medium">Maximum Supply</p>
              <p className=" font-semibold flex">
                {data?.max_supply?.toLocaleString()} {data?.symbol}
              </p>
            </div>
            <div className="w-full flex justify-between items-center mb-5">
              <p className="text-gray-500 font-medium">Total Supply</p>
              <p className=" font-semibold">
                {data?.total_supply?.toLocaleString()} {data?.symbol}
              </p>
            </div>
            <div className="w-full flex justify-between items-center mb-5">
              <p className="text-gray-500 font-medium">24 Volume</p>
              <p className=" font-semibold text-right">
                ${formatTotalPrice(data?.quotes["USD"]?.volume_24h)}
                <span
                  className={`block ${data?.quotes["USD"]?.volume_24h_change_24h < 0 ? "text-red-500" : "text-green-400"} font-semibold`}
                >
                  {data?.quotes["USD"]?.volume_24h_change_24h?.toFixed(2)}%
                </span>
              </p>
            </div>
            <div className="w-full flex justify-between items-center mb-5">
              <p className="text-gray-500 font-medium">All-Time High</p>
              <p className=" font-semibold text-right">
                ${formatTotalPrice(data?.quotes["USD"]?.ath_price)}
                <span className=" font-semibold flex items-baseline gap-1">
                  {
                    new Date(data?.quotes["USD"]?.ath_date)
                      ?.toISOString()
                      .split("T")[0]
                  }
                </span>
              </p>
            </div>
            <div className="w-full flex justify-between items-center mb-5">
              <p className="text-gray-500 font-medium">Price</p>
              <p className=" font-semibold text-right">
                ${formatTotalPrice(data?.quotes["USD"]?.price)}
                <span
                  className={`block ${data?.quotes["USD"]?.percent_from_price_ath < 0 ? "text-red-500" : "text-green-400"} font-semibold`}
                >
                  {data?.quotes["USD"]?.percent_from_price_ath?.toFixed(2)}%
                </span>
              </p>
            </div>

            <div className="w-full flex justify-between items-center mb-5">
              <p className="text-gray-500 font-medium">Issue Date</p>
              <p className=" font-semibold">
                {info?.started_at?.split("T")[0]}
              </p>
            </div>
          </div>
          <div
            className="mt-6 md:mt-0 flex-1 font-medium text-gray-200 font-sm"
            id="info-description"
          >
            <p className="font-bold text-md mb-6">Links</p>
            <div className="flex w-full justify-between items-center mb-4 ">
              <p className="text-gray-500 flex">Website</p>
              <div className="flex gap-2 flex-wrap
               ">
                <a
                  target="_blank"
                  href={info?.links?.website[0] ?? null}
                  className="text-xs p-2 bg-gray-800 rounded-md"
                >
                  Official Website
                </a>
                <a
                  target="_blank"
                  href={info?.whitepaper?.link}
                  className="text-xs p-2 bg-gray-800 rounded-md"
                >
                  Whitepaper
                </a>
              </div>
            </div>
            <div className="flex w-full justify-between items-center mb-4 ">
              <p className="text-gray-500 ">Block Explorer</p>
              <div className="flex gap-2 ">
                <a
                  target="_blank"
                  href={info?.links?.explorer[0] ?? null}
                  className="text-xs p-2 bg-gray-800 rounded-md"
                >
                  blockchain.info
                </a>
              </div>
            </div>
            <div className="flex w-full justify-between items-center mb-4 flex-wrap ">
              <p className="text-gray-500 ">Research</p>
              <div className="flex gap-2 ">
               { info?.links?.youtube ?<a
                  target="_blank"
                  href={info?.links?.youtube[0]}
                  className="text-xs p-2 bg-gray-800 rounded-md"
                >
                  Youtube
                </a>:null}
                {info?.links?.reddit ?<a
                  target="_blank"
                  href={info?.links?.reddit[0]}
                  className="text-xs p-2 bg-gray-800 rounded-md"
                >
                  Reddit
                </a>:null}
               { info?.links?.source_code ?<a
                  target="_blank"
                  href={info?.links?.source_code[0]}
                  className="text-xs p-2 bg-gray-800 rounded-md"
                >
                  Source
                </a>:null}
              </div>
            </div>
                <p className="font-bold text-md mb-4 mt-8">Description</p>
                <p className="font-light text-sm">{info?.description}</p>

          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
