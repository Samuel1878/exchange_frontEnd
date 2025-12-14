export interface LoginResponse {
  success: boolean;
  message: string;
  data: UserData;
  accessToken: string;
}

export interface UserData {
  UserName: string;
  Email: string;
  PasswordHash: string;
  Phone: string;
  KycStatus: "pending" | "verified" | string;
  AccountLevel: "basic" | "vip" | string;
  InvitationCode: string | null;
  CreatedAt: string; // ISO date
  UpdatedAt: string; // ISO date
  Id: number;
  UserWallet?: UserWallet[];
}

export interface UserWallet {
  Id: number;
  UserId: number;
  WalletType: "financial" | "spot" | "funding" | string;
  Status: "active" | "disabled" | string;
  CreatedAt: string;
  UpdatedAt: string;
  UserAsset: UserAsset[];
}

export interface UserAsset {
  Id: number;
  UserId: number;
  UserAccountId: number;
  AvailableBalance: string;
  LockedBalance: string;
  Currency: string;
  CreatedAt: string;
  UpdatedAt: string;
};


export interface AssetBalance {
  currency:string;
  balance:number;
  valueUSDT:number;
};
export interface WalletBalance{
  walletType:string;
  walletUSDT:number;
  assets:AssetBalance[];
};
export interface UserBalanceResult {
  totalUSDT :number;
  walletTotals:Record<string, number>;
  walletDetails:WalletBalance[]
}

export interface EarnProductsType {
  Id: number;

  FromCoin: string;
  ToCoin: string;

  MinAmount: string;
  MaxAmount: string;

  MinApr: number;
  MaxApr: number;

  DurationDays: number;
  RiskLevel: "low" | "medium" | "high";

  IsActive: boolean;
  IsFlexible: boolean;

  CreatedBy: string;
  CreatedAt: string; // ISO 8601 datetime
  UpdatedAt: string; // ISO 8601 datetime
}
export interface WalletAddressItem {
  Id: number;
  UserId: number;
  CoinName: string;
  NetWork: string;
  Address: string;
  Status: string;
  CreatedAt: string | null;
  UpdatedAt: string | null;
  NetworkName?:string
}

export interface WalletAddressResponse {
  data: WalletAddressItem[];
  total: number;
  page: number;
  Limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrePage: boolean;
}


export interface DepositForm {
  DepositAmount: number;
  CoinName: string;
  NetWork: string;
  NetWorkName: string;
}

export type WithdrawalRequest = {
  WithdrawalAmount: number;
  Currency: string;
  WithdrawalMethod: string;
  ToAddress: string;
  NetworkFee: number;
};

export type TransferPayload = {
  FromAccountType: string;
  FromCurrency: string;
  ToAccountType:string;
  ToCurrency: string;
  ToAmount: number;
};
export type ConvertRequest = {
  FromCoin: string;
  FromAmount: number;
  ToCoin: string;
  ToAmount: number;
  WalletType:string;
};
export type Network = {
  name: string;
  fee: number;
  mini:number
};

export type NetworksMap = Record<string, Network[]>;
