
import axios from '@/lib/axios';

export const getLoggedUser = async(token: any) => {
 
 
    try{
        let res = await axios.get('/authorization', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        
        return res;
        
    } catch(e) {console.log(e);}
}