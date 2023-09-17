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
    const baseUrl = ApiConfig.baseUrl 
    
  const symbolExchange = `${symbol}.${exchange}`;
    
  const url = `${baseUrl}/public/live/${symbolExchange}?apitoken=${ApiConfig.apiKey}`
 
   
  try{
      const response = await axios.get(url)
      const data = await response.data
      return NextResponse.json(data)
  }catch(error:any){
    console.log(error);
  } 
} 