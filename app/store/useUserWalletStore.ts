
// import { create } from "zustand";

// import type{ WalletBalance, WalletType, UserInfo ,UserData, UserWallet} from "~/utils/types";
// import { mapWallet } from "~/utils/walletMappers";

// interface WalletState {
//   user: UserInfo | null;
//   wallets: Record<WalletType, WalletBalance>;
//   totalUSDT: number;
//     isLoggedIn:boolean;
//     accessToken:string;
//   hydrateFromApi: (data: UserData, accessToken:string) => void;
//   updateUser: (data: UserData) => void;
//   updateWallets: (data: UserWallet[]) => void;

//   reset: () => void;
// }

// const emptyWallet = (type: WalletType): WalletBalance => ({
//   walletType: type,
//   assets: [],
//   walletUSDT: 0,
// });

// const buildWallets = (data: UserWallet[]) => {
//   const wallets = {
//     SPOT: emptyWallet("SPOT"),
//     FUNDING: emptyWallet("FUNDING"),
//     FINANCIAL: emptyWallet("FINANCIAL"),
//   };

//   data?.forEach((w) => {
//     const mapped = mapWallet(w);
//     wallets[mapped.walletType] = mapped;
//   });

//   const totalUSDT = Object.values(wallets).reduce(
//     (sum, w) => sum + w.walletUSDT,
//     0
//   );

//   return { wallets, totalUSDT };
// };

// export const useWalletStore = create<WalletState>((set) => ({
//   user: null,
//     isLoggedIn:false,
//     accessToken:null,
//     wallets: {
//     SPOT: emptyWallet("SPOT"),
//     FUNDING: emptyWallet("FUNDING"),
//     FINANCIAL: emptyWallet("FINANCIAL"),
//   },

//   totalUSDT: 0,

//   hydrateFromApi: (data, accessToken) =>
//     set(() => {
//       const { wallets, totalUSDT } = buildWallets(data?.UserWallet);

//       return {
//         user: {
//           id: data.Id,
//           username: data.UserName,
//           email: data.Email,
//           phone: data.Phone,
//           kycStatus: data.KycStatus,
//           accountLevel: data.AccountLevel,
//           createdAt: data.CreatedAt,
//           kyc: data.KycVerifications?.[0] || null,
//         },
//         isLoggedIn:true,
//         accessToken:accessToken,
//         wallets,
//         totalUSDT,
//       };
//     }),

//   updateUser: (data) =>
//     set((s) => ({
//       ...s,
//       user: {
//         id: data.Id,
//         username: data.UserName,
//         email: data.Email,
//         phone: data.Phone,
//         kycStatus: data.KycStatus,
//         accountLevel: data.AccountLevel,
//         createdAt: data.CreatedAt,
//         kyc: data.KycVerifications?.[0] || null,
//       },
//     })),

//   updateWallets: (data) =>
//     set((s) => {
//       const { wallets, totalUSDT } = buildWallets(data);
//       return {
//         ...s,
//         wallets,
//         totalUSDT,
//       };
//     }),

//   reset: () =>
//     set({
//       user: null,
//       wallets: {
//         SPOT: emptyWallet("SPOT"),
//         FUNDING: emptyWallet("FUNDING"),
//         FINANCIAL: emptyWallet("FINANCIAL"),
//       },
//       totalUSDT: 0,
//       isLoggedIn:false,
//       accessToken:null
//     }),
// }));
import { create } from "zustand";
import type {
  WalletBalance,
  WalletType,
  UserInfo,
  UserData,
  ApiWallet,
} from "~/utils/types";

import {persist} from "zustand/middleware"
import { mapWalletApiToStore } from "~/utils/walletMappers";

interface WalletState {
  // ─── DATA ───────────────────────────────
  user: UserInfo | null;
  wallets: Record<WalletType, WalletBalance>;
  totalUSDT: number;
    totalAvailableUSDT:number;
    totalLockedUSDT:number;
    isLoggedIn:boolean;
    accessToken:string;
  // ─── ACTIONS ────────────────────────────
  hydrateFromApi: (data: UserData, accessToken:string) => void;
  updateWalletsFromWalletApi: (wallets: ApiWallet[]) => void;
  reset: () => void;
}

const emptyWallet = (type: WalletType): WalletBalance => ({
  walletType: type,
  assets: [],
  totalAvailableUSDT: 0,
  totalLockedUSDT:0,
  totalUSDT:0
});
export const useWalletStore = create<WalletState>()(
  persist(
    (set) => ({
      // ─── STATE ─────────────────────────────
      user: null,

      wallets: {
        SPOT: emptyWallet("SPOT"),
        FUNDING: emptyWallet("FUNDING"),
        FINANCIAL: emptyWallet("FINANCIAL"),
      },

      totalUSDT: 0,
      totalAvailableUSDT: 0,
      totalLockedUSDT: 0,

      isLoggedIn: false,
      accessToken: null,

      // ─── ACTIONS ───────────────────────────
      hydrateFromApi: (data, accessToken) =>
        set((s) => ({
          ...s,
          user: {
            id: data.Id,
            username: data.UserName,
            email: data.Email,
            phone: data.Phone,
            kycStatus: data.KycStatus,
            accountLevel: data.AccountLevel,
            createdAt: data.CreatedAt,
            kyc: data.KycVerifications?.[0] || null,
          },
          isLoggedIn: true,
          accessToken,
        })),

      updateWalletsFromWalletApi: (walletsApi) =>
        set((s) => {
          const wallets = {
            SPOT: emptyWallet("SPOT"),
            FUNDING: emptyWallet("FUNDING"),
            FINANCIAL: emptyWallet("FINANCIAL"),
          };

          walletsApi.forEach((w) => {
            const mapped = mapWalletApiToStore(w);
            wallets[mapped.walletType] = mapped;
          });

          const totalAvailableUSDT = Object.values(wallets).reduce(
            (sum, w) => sum + w.totalAvailableUSDT,
            0
          );

          const totalLockedUSDT = Object.values(wallets).reduce(
            (sum, w) => sum + w.totalLockedUSDT,
            0
          );

          return {
            ...s,
            wallets,
            totalAvailableUSDT,
            totalLockedUSDT,
            totalUSDT: totalAvailableUSDT + totalLockedUSDT,
          };
        }),

      reset: () =>
        set({
          user: null,
          wallets: {
            SPOT: emptyWallet("SPOT"),
            FUNDING: emptyWallet("FUNDING"),
            FINANCIAL: emptyWallet("FINANCIAL"),
          },
          totalUSDT: 0,
          totalAvailableUSDT: 0,
          totalLockedUSDT: 0,
          isLoggedIn: false,
          accessToken: null,
        }),
    }),
    {
      name: "wallet-store", // 🔑 localStorage key

      version: 1,

      // Persist only needed fields
      partialize: (state) => ({
        user: state.user,
        wallets: state.wallets,
        totalUSDT: state.totalUSDT,
        totalAvailableUSDT: state.totalAvailableUSDT,
        totalLockedUSDT: state.totalLockedUSDT,
        isLoggedIn: state.isLoggedIn,
        accessToken: state.accessToken,
      }),
    }
  )
);

// export const useWalletStore = create<WalletState>((set) => ({
//   user: null,

//   wallets: {
//     SPOT: emptyWallet("SPOT"),
//     FUNDING: emptyWallet("FUNDING"),
//     FINANCIAL: emptyWallet("FINANCIAL"),
//   },

//   totalUSDT: 0,
//   totalAvailableUSDT:0,
//   totalLockedUSDT:0,
//   accessToken:null,
//   isLoggedIn:false,

//   hydrateFromApi: (data, accessToken) =>
//     set((s) => {
//       return {
//         ...s,
//         user: {
//           id: data.Id,
//           username: data.UserName,
//           email: data.Email,
//           phone: data.Phone,
//           kycStatus: data.KycStatus,
//           accountLevel: data.AccountLevel,
//           createdAt: data?.CreatedAt,
//           kyc: data.KycVerifications?.[0] || null,
//         },
//         isLoggedIn:true,
//         accessToken:accessToken
//       };
//     }),

//   updateWalletsFromWalletApi: (walletsApi) =>
//     set((s) => {
//       const wallets = {
//         SPOT: emptyWallet("SPOT"),
//         FUNDING: emptyWallet("FUNDING"),
//         FINANCIAL: emptyWallet("FINANCIAL"),
//       };

//       walletsApi.forEach((w) => {
//         const mapped = mapWalletApiToStore(w);
//         wallets[mapped.walletType] = mapped;
//       });

//       return {
//         ...s,
//         wallets,
//         totalUSDT: Object.values(wallets).reduce(
//           (sum, w) => sum + w.totalAvailableUSDT + w.totalLockedUSDT,
//           0
//         ),
//         totalAvailableUSDT: Object.values(wallets).reduce(
//           (sum, w) => sum + w.totalAvailableUSDT,
//           0
//         ),
//         totalLockedUSDT: Object.values(wallets).reduce(
//           (sum, w) => sum + w.totalLockedUSDT,
//           0
//         ),
//       };
//     }),

//   reset: () =>
//     set({
//       user: null,
//       wallets: {
//         SPOT: emptyWallet("SPOT"),
//         FUNDING: emptyWallet("FUNDING"),
//         FINANCIAL: emptyWallet("FINANCIAL"),
//       },
//       totalUSDT: 0,
//       totalAvailableUSDT:0,
//       totalLockedUSDT:0,
//       isLoggedIn:false,
//       accessToken:null
//     }),
// }));
