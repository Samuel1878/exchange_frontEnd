export interface LoginResponse {
  success: boolean;
  message: string;
  data: UserData;
  accessToken: string;
}

export interface UserData {
  Id: number;
  UserName: string;
  Email: string;
  Phone: string;
  KycStatus: string;
  AccountLevel: string;
  UserWallet: UserWallet[];
}
export interface UserWallet {
  Id: number;
  UserId: number;
  AccountTypeId: number;
  AccountBalance: string;
  AvailableBalance: string;
  LockedBalance: string;
  Status: string;
  CreatedAt: string;
  UpdatedAt: string;
  AccountType: AccountType;
  UserAsset: UserAsset[];
}
export interface AccountType {
  Id: number;
  TypeName: string;
  Description: string;
  InterestRate: string;
  CreatedAt: string;
  UpdatedAt: string;
}
export interface UserAsset {
  Id: number;
  UserId: number;
  UserAccountId: number;
  AvailableBalance: string;
  LockedBalance: string;
  Currency: string;
  CreatedAt: string | null;
  UpdatedAt: string | null;
}