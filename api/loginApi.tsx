import axios from '@/lib/axios';

export const loginWithUsernameAndPassword = async(data: any) => {
    try{
        let res = await axios.post('/login', data)
        console.log(res);
        return res;
    } catch(e) {console.log(e);}
}
