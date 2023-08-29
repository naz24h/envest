
import axios from '@/lib/axios' 

export const getLoggedUser = async() => {
    try{
        let res = await axios.get('/authorization');
        console.log(res);
        return res;
    } catch(e) {console.log(e);}
}
