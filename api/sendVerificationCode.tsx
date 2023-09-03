import axios from '@/lib/axios';

export const sendVerificationCode = async(type: string, token: string) => {
    try{
        let res = await axios.get(`resend-verify/${type}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }); 
        return res;
    } catch(e) {
        console.log(e);
    }
}
