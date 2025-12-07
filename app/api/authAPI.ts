import axios from "axios";
import { ACTION_URL } from "~/consts";
import type { UserData } from "~/utils/types";
export interface LoginResponse {
  success: boolean;
  message: string;
  data: UserData;
  accessToken: string;
}

export type RegisterPayload = {
  UserName?: string;
  PasswordHash: string;
  Email?: string;
  Phone?: string;
  InvitationCode?: number;
};

export const registerAPI = async (data: RegisterPayload): Promise<LoginResponse> => {
  try {
    const response = await axios.post(
      `${ACTION_URL}/api/v1/auth/register`,
      data, // <-- body here
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      return response.data;
    }
    return null
  } catch (error: any) {
    console.log(error?.response?.data ?? error);
    return null
  }
};
