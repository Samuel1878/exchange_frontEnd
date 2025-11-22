import axios from "axios";

export const orderBookSnapAPI = async(product_id:string) => {
    try {
         return await axios.get(
           ``
         ).catch(()=>null).then((data)=> data)
         
    } catch (error) {
        return null
    }
 
};
