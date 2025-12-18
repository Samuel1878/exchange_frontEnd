export interface LoginResponse {
  success: boolean;
  message: string;
  data: UserData;
  accessToken?: string;
}
export interface GetWalletResponse {
  success: boolean;
  message: string;
  data: WalletApiData;
}
export interface WalletApiData {
  wallets: ApiWallet[];
}


export type ApiWalletType = "spot" | "funding" | "financial" | string;

export interface ApiWallet {
  walletType: ApiWalletType;

  assets: ApiWalletAsset[];

  availableUSDT: number;
  lockedUSDT: number;
}

export interface ApiWalletAsset {
  asset: string;
  available: number;
  locked: number;

  availableUSDT: number;
  lockedUSDT: number;
}










export interface UserKycProfile {
  Id: number;
  UserId: number;

  FullName: string;

  DateOfBirth: string | null; // ISO date or null
  Gender: "male" | "female" | "other" | null;

  Nationality: string | null;

  IdType: string | null; // passport, national_id, driver_license, etc
  IdNumber: string | null;
  IdIssuingCountry: string | null;

  Address: string | null;
  City: string | null;
  StateProvince: string | null;
  PostalCode: string | null;
  Country: string | null;

  IdFrontImageUrl: string | null;
  IdBackImageUrl: string | null;
  SelfieImageUrl: string | null;
  ProofOfAddressUrl: string | null;

  VerificationStatus: "pending" | "approved" | "rejected";
  VerificationLevel: "basic" | "advanced" | "vip";

  SubmittedAt: string; // ISO date
  ReviewedAt: string | null;
  RejectionReason: string | null;

  LastUpdated: string; // ISO date

  IpAddress: string | null;
  DeviceInfo: string | null;

  CreatedAt: string;
  UpdatedAt: string | null;
}

export interface UserData {
  UserName: string;
  Email: string;
  PasswordHash: string;
  Phone: string;
  KycStatus: "pending" | "verified" | string;
  AccountLevel: "basic" | "vip" | string;
  InvitationCode: string | null;
  CreatedAt?: string; // ISO date
  UpdatedAt?: string; // ISO date
  Id: number;
  UserWallet?: UserWallet[];
  KycVerifications?: UserKycProfile[]
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
  AvailableBalanceUSDT?:string;
  LockedBalanceUSDT?:string;
  Currency: string;
  CreatedAt: string;
  UpdatedAt: string;
};




// export interface AssetBalance {
//   currency:string;
//   balance:number;
//   valueUSDT:number;
// };
// export interface WalletBalance{
//   walletType:string;
//   walletUSDT:number;
//   assets:AssetBalance[];
// };
// export interface UserBalanceResult {
//   totalUSDT :number;
//   walletTotals:Record<string, number>;
//   walletDetails:WalletBalance[]
// }



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




// store/types.ts
export type WalletType = "SPOT" | "FUNDING" | "FINANCIAL";


export interface AssetBalance {
  currency: string;

  available: number;
  locked: number;

  availableUSDT: number;
  lockedUSDT: number;

  total: number;
  totalUSDT: number;
}


export interface WalletBalance {
  walletType: WalletType | string;
  totalAvailableUSDT: number;
  totalLockedUSDT:number;
  assets: AssetBalance[];
  totalUSDT:number;
}

export interface UserInfo {
  id: number;
  username: string;
  email: string;
  phone: string;
  kycStatus: string;
  accountLevel: string;
  createdAt: string;
  kyc?: UserKycProfile | null
}
