import axios from '@/lib/axios';

export const registerNewUser = async(data: any) => {
    try{
        let res = await axios.post('/register', data);
        return res;
    } catch(e) {
        console.log(e);
    }
}
