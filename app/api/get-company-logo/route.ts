import { ApiConfig } from '@/config/apiConfig'
import axios from 'axios'
import { NextResponse } from 'next/server'

 

export const dynamic = 'force-dynamic';
// get exchange data
export async function GET (request : Request){
    // exchange id from request
    const {searchParams} = new URL(request.url);
    const symbol = searchParams.get('symbol');
    const exchange = searchParams.get('exchange');
    // const lang = searchParams.get('lang');
    const baseUrl = ApiConfig.baseUrl 
    
  const symbolExchange = `${symbol}.${exchange}`;
    
  const url = `${baseUrl}/fundamentals/${symbolExchange}?apitoken=${ApiConfig.apiKey}` 
 
   
  try{
      const response = await axios.get(url) 
      const data = await response.data

      try{ 

        if(!data.General.LogoURL){
            // return genaral data
            return new Response(JSON.stringify({logo: null}), {
              headers: {  
                'content-type': 'application/json;charset=UTF-8',
              },
            })
        }
        const logo = `${baseUrl}${data.General.LogoURL}?apitoken=${ApiConfig.apiKey}`  
         

          
      // return genaral data
      return new Response(JSON.stringify({logo: logo}), {
        headers: {  
          'content-type': 'application/json;charset=UTF-8',
        },
      })
      }catch(error:any){
        console.log(error);
      } 
  }catch(error:any){
    console.log(error);
  } 
} 