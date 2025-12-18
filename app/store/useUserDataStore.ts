// import { create } from "zustand";
// import { persist } from "zustand/middleware";
// import type { UserData, UserWallet } from "~/utils/types";

// type AuthState = {
//   user: UserData | null;
//   accessToken: string | null;
//   wallet: UserWallet[] | null;
//   isLoggedIn: boolean;
//   setToken: (token: string | null) => void;
//   setUser: (u: UserData | null) => void;
//   login: (user: UserData, accessToken: string) => void;
//   logout: () => void;
//   setUserWallet: (data:UserWallet[])=>void
// };

// export const useAuthStore = create<AuthState>()(
//   persist(
//     (set) => ({
//       user: null,
//       accessToken: null,
//       isLoggedIn: false,
//       wallet: null,
//       setToken: (token) => set({ accessToken: token, isLoggedIn: !!token }),
//       setUser: (user) =>{ 
//          const userData = {
//            UserName: user.UserName,
//            Email: user.Email,
//            PasswordHash: user.PasswordHash,
//            Phone: user.Phone,
//            KycStatus: user.KycStatus,
//            AccountLevel: user.AccountLevel,
//            InvitationCode: user.InvitationCode,
//            CreatedAt: user.CreatedAt,
//            UpdatedAt: user.UpdatedAt,
//            Id: user.Id,
//          };
//         set({ user: userData, wallet:user.UserWallet})
//       },
//       setUserWallet: (w) => set({
//         wallet:w
//       }),
//       login: (user, accessToken) => {
//         const userData = {
//           UserName: user.UserName,
//           Email: user.Email,
//           PasswordHash: user.PasswordHash,
//           Phone: user.Phone,
//           KycStatus: user.KycStatus,
//           AccountLevel: user.AccountLevel,
//           InvitationCode: user.InvitationCode,
//           CreatedAt: user.CreatedAt,
//           UpdatedAt: user.UpdatedAt,
//           Id: user.Id,
//         };
//         set({
//           user: userData,
//           wallet: user.UserWallet,
//           accessToken,
//           isLoggedIn: true,
//         });
//       },
//       logout: () =>
//         set({
//           user: null,
//           accessToken: null,
//           wallet:null,
//           isLoggedIn: false,
//         }),
//     }),
//     {
//       name: "auth-storage", // storage key
//     }
//   )
// );
