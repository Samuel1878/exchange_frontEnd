import axios from "axios";

export const orderBookSnapAPI = async(product_id:string) => {
    try {
         return await axios.get(
           `https://api.binance.com/api/v3/depth?symbol=${product_id }&limit=7`
         ).catch(()=>null).then((data)=> data)
         
    } catch (error) {
        return null
    }
 
};
