import axios from '@/lib/axios'
import loadConfig from 'next/dist/server/config';

export const loginWithUsernameAndPassword = async(data: any) => {
    try{
        let res = await axios.post('/login', data)
        return res;
    } catch(e) {console.log(e);}
}
