
import axios from "axios";
import { ACTION_URL } from "~/consts";
import { useAuthStore } from "~/store/useUserDataStore";

export const api = axios.create({
  baseURL:ACTION_URL,
});

// api.interceptors.request.use((config) => {
//   const token = useAuthStore.getState().accessToken;
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// // src/api/axios.ts
// import axios,{ AxiosError, type AxiosRequestConfig, type InternalAxiosRequestConfig } from "axios";
// import { useAuthStore } from "~/store/useUserDataStore";

// const ACTION_URL =
//   process.env.REACT_APP_ACTION_URL ?? "http://150.95.82.150:4000";

// const api = axios.create({
//   baseURL: ACTION_URL,
//   headers: {
//     "Content-Type": "application/json",
//     Accept: "application/json",
//   },
//   withCredentials: true, // if your refresh token is httpOnly cookie / backend expects credentials
// });

// /**
//  * Refresh token queueing logic:
//  * - while refresh is in progress, other requests wait for it
//  * - on refresh success: re-run original requests
//  */
// let isRefreshing = false;
// let refreshPromise: Promise<string | null> | null = null;
// const subscribers: Array<(token: string | null) => void> = [];

// function subscribeToken(cb: (token: string | null) => void) {
//   subscribers.push(cb);
// }

// function onRefreshed(token: string | null) {
//   subscribers.forEach((cb) => cb(token));
//   subscribers.length = 0;
// }

// async function refreshAccessToken(): Promise<string | null> {
//   // reuse existing refresh while ongoing
//   if (refreshPromise) return refreshPromise;

//   const refreshCall = (async () => {
//     try {
//       // If your refresh uses cookie, endpoint may not need body.
//       const resp = await axios.post(
//         `${ACTION_URL}/api/v1/auth/refresh`,
//         {},
//         { withCredentials: true }
//       );
//       // expecting { accessToken: "...", refreshToken?: "..." }
//       const newAccessToken = resp.data?.accessToken ?? null;
//       if (newAccessToken) {
//         useAuthStore.getState().setToken(newAccessToken);
//       }
//       return newAccessToken;
//     } catch (err) {
//       // refresh failed -> clear auth
//       useAuthStore.getState().logout();
//       return null;
//     } finally {
//       refreshPromise = null;
//       isRefreshing = false;
//     }
//   })();

//   refreshPromise = refreshCall;
//   isRefreshing = true;
//   return refreshCall;
// }

// api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
//   const token = useAuthStore.getState().accessToken;
//   if (token && config.headers) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// /**
//  * Response interceptor:
//  * - on 401: try to refresh once, then retry the request
//  */
// api.interceptors.response.use(
//   (res) => res,
//   async (error: AxiosError) => {
//     const originalRequest = error.config as AxiosRequestConfig & {
//       _retry?: boolean;
//     };

//     if (!originalRequest || !error.response) throw error;

//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       if (!isRefreshing) {
//         // start refresh
//         refreshAccessToken().then((token) => onRefreshed(token));
//       }

//       // wait for refresh to finish
//       return new Promise((resolve, reject) => {
//         subscribeToken(async (token) => {
//           if (token) {
//             // set new header and retry
//             if (originalRequest.headers)
//               originalRequest.headers.Authorization = `Bearer ${token}`;
//             try {
//               const retryRes = await api.request(originalRequest);
//               resolve(retryRes);
//             } catch (e) {
//               reject(e);
//             }
//           } else {
//             // refresh failed, propagate original error
//             reject(error);
//           }
//         });
//       });
//     }

//     throw error;
//   }
// );

// export default api;
