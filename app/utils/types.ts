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
  UserWallet: Wallet[];
}

export interface Wallet {
  Id: number;
  UserId: number;
  AccountTypeId: number;
  AccountBalance: string;
  AvailableBalance: string;
  LockedBalance: string;
  Currency: string;
  Status: string;
  CreatedAt: string;
  UpdatedAt: string;
  AccountType: AccountType;
}

export interface AccountType {
  Id: number;
  TypeName: string;
  Description: string;
  InterestRate: string;
  CreatedAt: string;
  UpdatedAt: string;
}
