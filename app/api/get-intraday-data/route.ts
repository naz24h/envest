import { ApiConfig } from '@/config/apiConfig'
import axios from 'axios'
import dayjs from 'dayjs';
import { NextResponse } from 'next/server'




export const dynamic = 'force-dynamic';
// get exchange data
export async function GET (request : Request){
    // exchange id from request
    const {searchParams} = new URL(request.url);
    const symbol = searchParams.get('symbol');
    const exchange = searchParams.get('exchange');
    const interval = searchParams.get('interval') ?? '5m';
    const baseUrl = ApiConfig.baseUrl 
    
  const symbolExchange = `${symbol}.${exchange}`;

  const start = dayjs().subtract(1, 'month').format('YYYY-MM-DD')
  const end = dayjs().format('YYYY-MM-DD')
    
  const url = `${baseUrl}/historicalquotes/${symbolExchange}?apitoken=${ApiConfig.apiKey}&interval=${interval}&from=${start}&to=${end}`
 
  try{
      const response = await axios.get(url)
      const data = await response.data
      return NextResponse.json(data)
  }catch(error:any){
    console.log(error);
  } 
} 