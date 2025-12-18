import axios from "axios";
import { ACTION_URL } from "~/consts";
import type { GetWalletResponse, UserData } from "~/utils/types";
export interface LoginResponse {
  success: boolean;
  message: string;
  data: UserData;
  accessToken: string;
}

export type payloadType = {
  UserName?: string;
  PasswordHash: string;
  Email?: string;
  Phone?: string;
  InvitationCode?: number;
};

export const registerAPI = async (data: payloadType): Promise<LoginResponse> => {
  try {
    const response = await axios.post(
      `${ACTION_URL}/api/v1/auth/register`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      return response.data;
    }
    return null;
  } catch (error: any) {
    console.log(error?.response?.data ?? error);
    return null;
  }
};

export const loginAPI = async (data: payloadType): Promise<LoginResponse> => {
  try {
    const response = await axios.post(`${ACTION_URL}/api/v1/auth/login`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) return response.data;
    return null;
  } catch (error) {
    console.log(error?.response?.data ?? error);
    return null;
  }
};

export const getUserDataAPI = async (accessToken:string) :Promise<LoginResponse | null>=> {
  try {
     const response = await axios.get(`${ACTION_URL}/api/v1/auth/profile`, {
       headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${accessToken}`,
       },
     });
     if (response.status === 200) return response.data;
     return null;
  } catch (error) {
      console.log(error?.response?.data ?? error);
        return null;
  }
};
export const getUserWalletAPI = async (accessToken:string):Promise<GetWalletResponse | null> => {
   try {
     const response = await axios.get(`${ACTION_URL}/api/v1/users/get-wallet`, {
       headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${accessToken}`,
       },
     });
     if (response.status === 200) return response.data;
     return null;
   } catch (error) {
     console.log(error?.response?.data ?? error);
     return null;
   }
}