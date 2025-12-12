import axios from "axios";
import { ACTION_URL } from "~/consts";
import type { WalletAddressResponse } from "~/utils/types";

export const getWalletAddress = async (
    accessToken
): Promise< WalletAddressResponse| null> => {
  try {
    const response = await axios.get(
      `${ACTION_URL}/api/v1/users/wallet-address`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            `Bearer ${accessToken}`,
        },
      }
    );
    if (response.status !== 200) return null;
    const data = await response.data;
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
