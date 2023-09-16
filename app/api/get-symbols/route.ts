import { ApiConfig } from '@/config/apiConfig'
import axios from 'axios'
import { NextResponse } from 'next/server'




export const dynamic = 'force-dynamic';
// get exchange data
export async function GET (request : Request){
    // exchange id from request
    const {searchParams} = new URL(request.url);
    const exchange = searchParams.get('exchange')
    const baseUrl = ApiConfig.baseUrl 
    
    
  const url = `${baseUrl}/general/symbols/${exchange}?apitoken=${ApiConfig.apiKey}`
 
   
  try{
      const response = await axios.get(url)
      const data = await response.data
      return NextResponse.json(data)
  }catch(error:any){
    console.log(error);
  } 
} 