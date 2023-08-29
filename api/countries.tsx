import axios from '@/lib/axios'

export const getCountries = async() => { 
    try{ 
        let res = await axios.get('/get-countries') 
        return res?.data?.data?.countries
    }
    catch(e) {console.log(e);} 
}
