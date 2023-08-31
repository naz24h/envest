
import axios from '@/lib/axios';

export const verifyEmail = async(code: string, token: string) => {
 
    try{
        let res = await axios.post(`/verify-email`, {code}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res;
    } catch(e) {console.log(e);}
}