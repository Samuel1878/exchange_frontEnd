import type { EarnProductsType, UserData } from "~/utils/types";

export const MOBILE_WIDTH: number = 800; // px

export const ORDERBOOK_LEVELS: number = 6; // rows count

export const SERVER_URL = "150.95.26.212:22";
export const LOCAL_URL = "https://api.auno.site";

export const API_URL = "https://www.auno.site";

export const TitleSuffix = "Binance";
export const ACTION_URL = "http://150.95.82.150:4000";

export const walletTypes = [
  { type: "financial" },
  { type: "funding" },
  { type: "spot" },
];
export const user: UserData = {
  UserName: "Samuel Chost",
  Email: "samuelchost@gmail.com",
  PasswordHash: "samuellll",
  Phone: "",
  KycStatus: "verified",
  AccountLevel: "basic",
  InvitationCode: null,
  CreatedAt: "",
  UpdatedAt: "",
  Id: 92002,
  UserWallet: [
    {
      Id: 1,
      UserId: 92002,
      WalletType: "financial",
      Status: "active",
      CreatedAt: "",
      UpdatedAt: "",
      UserAsset: [
        {
          Id: 1,
          UserId: 92002,
          UserAccountId: 1,
          AvailableBalance: "10002",
          LockedBalance: "0",
          Currency: "USDT",
          CreatedAt: "",
          UpdatedAt: "",
        },
        {
          Id: 1,
          UserId: 92002,
          UserAccountId: 1,
          AvailableBalance: "1.2",
          LockedBalance: "0",
          Currency: "BTC",
          CreatedAt: "",
          UpdatedAt: "",
        },
        {
          Id: 1,
          UserId: 92002,
          UserAccountId: 1,
          AvailableBalance: "2.0121",
          LockedBalance: "0",
          Currency: "ETH",
          CreatedAt: "",
          UpdatedAt: "",
        },
      ],
    },
    {
      Id: 2,
      UserId: 92002,
      WalletType: "spot",
      Status: "active",
      CreatedAt: "",
      UpdatedAt: "",
      UserAsset: [
        {
          Id: 1,
          UserId: 92002,
          UserAccountId: 1,
          AvailableBalance: "499",
          LockedBalance: "0",
          Currency: "USDT",
          CreatedAt: "",
          UpdatedAt: "",
        },
        {
          Id: 1,
          UserId: 92002,
          UserAccountId: 1,
          AvailableBalance: "0.0023",
          LockedBalance: "0",
          Currency: "BTC",
          CreatedAt: "",
          UpdatedAt: "",
        },
        {
          Id: 1,
          UserId: 92002,
          UserAccountId: 1,
          AvailableBalance: "1",
          LockedBalance: "0",
          Currency: "ETH",
          CreatedAt: "",
          UpdatedAt: "",
        },
      ],
    },
    {
      Id: 3,
      UserId: 92002,
      WalletType: "funding",
      Status: "active",
      CreatedAt: "",
      UpdatedAt: "",
      UserAsset: [
        {
          Id: 1,
          UserId: 92002,
          UserAccountId: 1,
          AvailableBalance: "100",
          LockedBalance: "0",
          Currency: "USDT",
          CreatedAt: "",
          UpdatedAt: "",
        },
        {
          Id: 1,
          UserId: 92002,
          UserAccountId: 1,
          AvailableBalance: "0.000123",
          LockedBalance: "0",
          Currency: "BTC",
          CreatedAt: "",
          UpdatedAt: "",
        },
        {
          Id: 1,
          UserId: 92002,
          UserAccountId: 1,
          AvailableBalance: "0.009021",
          LockedBalance: "0",
          Currency: "ETH",
          CreatedAt: "",
          UpdatedAt: "",
        },
      ],
    },
  ],
};

