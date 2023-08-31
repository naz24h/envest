
import axios from '@/lib/axios';

export const getUserInfo = async(token: string) => {
 
    try{
        let res = await axios.get(`/user-info`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res;
    } catch(e) {console.log(e);}
}