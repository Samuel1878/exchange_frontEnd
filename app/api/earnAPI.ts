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