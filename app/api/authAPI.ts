import axios from "axios";
import { ACTION_URL } from "~/consts";
import type { UserData } from "~/utils/types";
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
