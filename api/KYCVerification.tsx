import axios from '@/lib/axios';

export const kycVerification = async(data:any , token: string) => {
 
    try{
        let res = await axios.post(`/verify-kyc`, data, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`
            }
        });
        return res;
    } catch(e) {console.log(e);}
}