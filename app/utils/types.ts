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
  UserWallet: UserWallet[];
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
}