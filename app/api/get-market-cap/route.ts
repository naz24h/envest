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
    const company = searchParams.get('company');
    const lang = searchParams.get('');
    const baseUrl = ApiConfig.baseUrl 
    
  const symbolExchange = `${symbol}.${exchange}`;
    
  const url = `${baseUrl}/fundamentals/marketcap/${symbolExchange}?apitoken=${ApiConfig.apiKey}&byname=${company}`
 
   
  try{
      const response = await axios.get(url)
      const data = await response.data
      return NextResponse.json(data)
  }catch(error:any){
    console.log(error);
  } 
} 