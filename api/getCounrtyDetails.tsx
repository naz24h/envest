import axios from "axios";


export const getCountryDetails = async (countryCode: string) => {


    try {
        const res = await axios.get(`https://restcountries.com/v3.1/alpha/${countryCode}`)

        return res?.data[0]
        
    } catch (e) {console.log(e);}

   

}