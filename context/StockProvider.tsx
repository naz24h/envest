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
    const [stockLive, setStockLive] = React.useState([]);
    const [tableData, setTableData] = React.useState<any[]>([]);

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

    // get stock live data
    const handleGetStockDataLive = async (symbol: string, exchange: string) => {
        try {
            await axios.get('/api/get-stocks-live?symbol=' + symbol + '&exchange=' + exchange)
                .then((res) => {
                    setStockLive(res.data);
                    return res.data;
                })
        } catch (err: any) {
            console.error(err)
        }
    }

    // get symbols list
    const handleGetSymbols = async (exchanges: string) => {
        console.log(exchanges);
        try {
            await axios.get('/api/get-symbols?exchange=' + exchanges)
                .then((res) => {
                    const data = [] as any;
                    _.forEach(res.data, async (item: any) => {
                        let stock = await handleGetStockDataLive(item.Code, item.Exchange);
                        data.push({
                            ...item,
                            liveStock: stock
                        })
                    })
                    setTableData([...data]);
                    setSymbol(res.data)
                })
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
            handleGetSymbols,
            handleGetStockDataLive,
            stockLive,
            setStockLive,
            tableData,
            setTableData
        }}>
            {children}
        </StockContext.Provider>
    )
}

export const useStocks = () => React.useContext(StockContext);