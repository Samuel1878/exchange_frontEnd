import axios from "axios";
import { LOCAL_URL } from "~/consts";
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
interface AvgPriceResponse {
  mins: number;
  price: string;
  closeTime: number;
}
export const getPriceAPI = async (
  coin_id: string
): Promise<AssetData | null> => {
  try {
    const response = await axios.get(`${LOCAL_URL}/price/${coin_id}`);
    if (response.status !== 200) return null;
    console.log(response);
    const data = await response.data;
    return data;
  } catch (error) {
    return null;
  }
};
export const getCoinDetailAPI = async (
  coin_id: string
): Promise<CoinDetail | null> => {
  try {
    const response = await axios.get(`${LOCAL_URL}/info/${coin_id}`);
    if (response.status !== 200) return null;
    const data = await response.data;
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getAvgPriceAPI = async (
  symbol: string
): Promise<AvgPriceResponse | null> => {
  try {
    const response = await axios.get(`${LOCAL_URL}/avgprice/${symbol}`);
    if (response.status !== 200) return null;
    const data = await response.data;
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getTickerPricesAPI = async (data: string[]) => {
  try {
    console.log(data);

    const response = await axios.get(
      `${"http://localhost:3000"}/tickerprices?symbols=${data}`
    );
    if (response.status !== 200) return null;
    const json = await response.data;
    return json;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const getTickerPriceAPI = async (data: string[]) => {
  try {
    console.log(data);

    const response = await axios.get(
      `${"http://localhost:3000"}/tickerprice?symbol=${data}`
    );
    if (response.status !== 200) return null;
    const json = await response.data;
    return json;
  } catch (error) {
    console.log(error);
    return null;
  }
};