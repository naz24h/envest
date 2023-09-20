'use client'
import { logout } from '@/api/logout';
import axios from 'axios';
import _ from 'lodash';
import * as React from 'react';
import { ApiConfig } from '@/config/apiConfig'
import dayjs from 'dayjs';




export const StockContext = React.createContext<any>(null);

const { baseUrl, apiKey } = ApiConfig

export const StockContextProvider = ({ children }: { children: React.ReactNode }) => {

    const [exchanges, setExchanges] = React.useState([]);
    const [symbol, setSymbol] = React.useState([]);
    const [stock, setStock] = React.useState([]);
    const [liveStock, setLiveStock] = React.useState([]);
    const [tableData, setTableData] = React.useState<any>([]);

    // get exchange list
    React.useEffect(() => {
        if (_.size(exchanges) === 0) {
            (async () => {
                try {
                    await axios.get(`${baseUrl}/general/exchanges?apitoken=${apiKey}`)
                        .then((res) => {
                            setExchanges(res.data)
                        })
                } catch (err: any) {
                    console.error(err)
                }
            })()
        }
    }, [exchanges])


    // get symbols list
    const handleGetSymbols = async (exchanges: string) => {
        // console.log(exchanges);
        try {
            const url = `${baseUrl}/general/symbols/${exchanges}?apitoken=${ApiConfig.apiKey}`
            await axios.get(url)
                .then((res) => {
                    setSymbol(res.data);
                })
        } catch (err: any) {
            console.error(err)
        }
    }


    // get stock live data
    const handleGetStockDataLive = async (symbol: string, exchange: string) => {
        const url = `${baseUrl}/live/${symbol}.${exchange}?apitoken=${ApiConfig.apiKey}`
        try {
            let res = await axios.get(url);
            return res.data

        } catch (err: any) {
            console.error(err)
        }
    }

    // get fundamentals data 
    const handleGetFundamentals = async (symbol: string, exchange: string) => {
        const symbolExchange = `${symbol}.${exchange}`;
    
        const url = `${baseUrl}/fundamentals/${symbolExchange}?apitoken=${ApiConfig.apiKey}` 
        try {
            let res = await axios.get(url);
            return res.data

        } catch (err: any) {
            console.error(err)
        }
    }

    // get market cap data
    const handleGetMarketCap = async (symbol: string, exchange: string, company: string) => {
        try {
            let res = await axios.get('/api/get-market-cap?symbol=' + symbol + '&exchange=' + exchange + '&company=' + company);
            return res.data
        } catch (err: any) {
            console.error(err)
        }
    }

    // get stock graph data
    const handleGetStockGraphData = async ({
        symbol, 
        exchange, 
        interval = '1h',
        start = dayjs().subtract(1, 'month').format('YYYY-MM-DD'),
        end = dayjs().format('YYYY-MM-DD')
    }: {
        symbol: string,
        exchange: string,
        interval: string,
        start: string,
        end: string 
    }) => {
        
    // const start = dayjs().subtract(1, 'month').format('YYYY-MM-DD')
    // const end = dayjs().format('YYYY-MM-DD')
        
    const url = `${baseUrl}/historicalquotes/${symbol}.${exchange}?apitoken=${ApiConfig.apiKey}&interval=${interval}&from=${start}&to=${end}`
 
        try {
            let res = await axios.get(url);
            return res.data
        } catch (err: any) {
            console.error(err)
        }
    }

    const getCompanyLogo = async (symbol: string, exchange: string) => {
        try {
            const fundamentals = await handleGetFundamentals(symbol, exchange)
 
            const logoURL = fundamentals.General.LogoURL; 
            // console.log({logoURL});
            if(logoURL){
                return {
                    logo: `${baseUrl}${logoURL}?apitoken=${ApiConfig.apiKey}` 
                }
            }else {
                return {
                    logo: null
                }
            }

        } catch (err: any) {
            console.error(err)
        }
    }



    return (
        <StockContext.Provider value={{
            exchanges,
            setExchanges,
            symbol,
            setSymbol,
            stock,
            setStock,
            liveStock,
            setLiveStock,
            handleGetSymbols,
            handleGetStockDataLive,
            handleGetFundamentals,
            handleGetMarketCap,
            getCompanyLogo,
            handleGetStockGraphData,
        }}>
            {children}
        </StockContext.Provider>
    )
}

export const useStocks = () => React.useContext(StockContext);