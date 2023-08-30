import axios from '@/lib/axios' 

export const logout = async() => {
    try{
        let res = await axios.get('/logout');
        return res;
    } catch(e) {console.log(e);}
}
