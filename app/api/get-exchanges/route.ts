import { ApiConfig } from '@/config/apiConfig'
import axios from 'axios'
import { NextResponse } from 'next/server'
 
export async function GET() {
    const { baseUrl, apiKey } = ApiConfig
    const res = await axios.get(`${baseUrl}/general/exchanges?apitoken=${apiKey}`);
    const {data} = res;
 
  return NextResponse.json({ data })
}