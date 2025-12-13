import axios from "axios";
import { ACTION_URL } from "~/consts";
import type { DepositForm, TransferPayload, WalletAddressResponse } from "~/utils/types";

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


export const sumbitDepositForm = async (data:DepositForm, accessToken) => {
  try{
    const response = await axios.post(
      `${ACTION_URL}/api/v1/users/add-deposit`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (response.status !==200) return null;
    const d = await response.data;
    return d
  } catch (error){
    console.log(error);
    return null
  }
}
export const getDepositHis = async (accessToken) => {
  try {
    const response = await axios.get(
      `${ACTION_URL}/api/v1/users/deposits`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (response.status !== 200) return null;
    const d = await response.data;
    return d;
  } catch (error) {
     console.log(error);
     return null;
  }
}

export const transferAPI = async (data:TransferPayload, accessToken)=>{
    try {
      const response = await axios.post(`${ACTION_URL}/api/v1/users/wallet-transfer`, data,{
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.status !== 200) return null;
      const d = await response.data;
      return d;
    } catch (error) {
      console.log(error);
      return null;
    }
}
