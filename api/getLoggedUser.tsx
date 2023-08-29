
import axios from '@/lib/axios' 

export const getLoggedUser = async(token: string) => {
 
    try{
        let res = await axios.get('/authorization', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(res);
        return res;
    } catch(e) {console.log(e);}
}
