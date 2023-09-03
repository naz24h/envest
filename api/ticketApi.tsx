
import axios from '@/lib/axios';
import { TTicketForm } from '@/types/types';
 

export const submitNewTicket = async(data:TTicketForm, token: string) => {
 
    try{
        let res = await axios.post(`/ticket/submit`, {...data}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res;
    } catch(e) {console.log(e);}
}