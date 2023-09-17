'use client'
import { logout } from '@/api/logout';
import axios from 'axios';
import _ from 'lodash';
import * as React from 'react';





export const StockContext = React.createContext<any>(null);


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
                    await axios.get('/api/get-exchanges')
                        .then((res) => {
                            setExchanges(res.data.data)
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
            await axios.get('/api/get-symbols?exchange=' + exchanges)
                .then((res) => {
                    setSymbol(res.data);
                })
        } catch (err: any) {
            console.error(err)
        }
    }


    // get stock live data
    const handleGetStockDataLive = async (symbol: string, exchange: string) => {
        try {
            let res = await axios.get('/api/get-stocks-live?symbol=' + symbol + '&exchange=' + exchange);
            return res.data

        } catch (err: any) {
            console.error(err)
        }
    }

    // get fundamentals data 
    const handleGetFundamentals = async (symbol: string, exchange: string) => {
        try {
            let res = await axios.get('/api/get-fundamentals?symbol=' + symbol + '&exchange=' + exchange);
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
    const handleGetStockGraphData = async (symbol: string, exchange: string, interval: string) => {
        try {
            let res = await axios.get('/api/get-intraday-data?symbol=' + symbol + '&exchange=' + exchange + '&interval=' + interval);
            return res.data
        } catch (err: any) {
            console.error(err)
        }
    }

    const getCompanyLogo = async (symbol: string, exchange: string) => {
        try {
            let res = await axios.get('/api/get-company-logo?symbol=' + symbol + '&exchange=' + exchange);
            return res.data

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