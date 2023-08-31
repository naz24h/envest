
import axios from '@/lib/axios';

export const getTransaction = async(token: string) => {
 
    try{
        let res = await axios.get(`/transactions`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res;
    } catch(e) {console.log(e);}
}