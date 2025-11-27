// import { createSlice } from "@reduxjs/toolkit";
// import type { RootState } from "../store";
// import type { PayloadAction } from "@reduxjs/toolkit";
// // Define a type for the slice state
// interface AuthState {
//   isAuthenticated: boolean;
//   fetchingToken: boolean;
//   userToken: string | null;
// }

// // Define the initial state using that type
// const initialState: AuthState = {
//   isAuthenticated: false,
//   fetchingToken: true,
//   userToken: null,
// };

// const AuthSlice = createSlice({
//   name: "auth",
//   // `createSlice` will infer the state type from the `initialState` argument
//   initialState,
//   reducers: {
//     login: (state, action: PayloadAction<string>) => {
//       ((state.isAuthenticated = true),
//         (state.fetchingToken = false),
//         (state.userToken = action.payload));
//     },
//     logout: (state) => {
//       ((state.isAuthenticated = false),
//         (state.fetchingToken = false),
//         (state.userToken = null));
//     },
//   },
// });

// export const { login, logout } = AuthSlice.actions;
// // export const selectIsAuthenticated = (state:RootState) => state.auth.isAuthenticated;
// // export const selectUserToken = (state:RootState) => state.auth.userToken;
// // export const fetchingToken = (state:RootState) => state.auth.fetchingToken;

// // Other code such as selectors can use the imported `RootState` type
// // export const selectCount = (state: RootState) => state.counter.value

// export default AuthSlice.reducer;
