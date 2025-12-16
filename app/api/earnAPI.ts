import axios from "axios";
import { ACTION_URL } from "~/consts";
import type { EarnProductsType } from "~/utils/types";

export interface EarnResponseType {
    data:EarnProductsType[];
    total:number;
    page:number;
    Limit:number;
    totalPages:number;
    hasNextPage:boolean;
    hasPrePage:boolean
}

export const getEarnProductAPI = async (): Promise<EarnResponseType |null>=> {
  try {
    const response = await axios.get(
      `${ACTION_URL}/api/v1/users/get-earn-products`,
      {
        headers: {
          "Content-Type": "application/json",
        //   Authorization: `Bearer ${accessToken}`,
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
};

export const subscribeEarnProductAPI = async (
  data: {
    Amount: number;
    EarnId: number;
    FromCoin:string;
  },
  accessToken
) => {
  try {
    const response = await axios.post(`${ACTION_URL}/api/v1/users/subscribe`, 
      data, {
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
};