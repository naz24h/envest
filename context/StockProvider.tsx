'use client'
import { logout } from '@/api/logout';
import axios from 'axios';
import _ from 'lodash';
import * as React from 'react';
 




export const StockContext = React.createContext < any > (null);

 
export const StockContextProvider = ({children}: {children: React.ReactNode}) => {

    const [exchanges, setExchanges] = React.useState([]);
    const [symbol, setSymbol] = React.useState([]);
    const [stock, setStock] = React.useState([]);
 
    // get exchange list
    React.useEffect(() => {
        if(_.size(exchanges) === 0){
            (async () => {
                try{
                    await axios.get('/api/get-exchanges')
                    .then((res) => {
                        setExchanges(res.data.data)
                    })
                }catch(err: any){
                    console.error(err)
                }
            })()
        }
    }, [exchanges])


    // get symbols list
    const handleGetSymbols = async (exchanges: string) => {
        console.log(exchanges);
        try{
            await axios.get('/api/get-symbols?exchange='+exchanges)
            .then((res) => { 
                setSymbol(res.data)
            })
        }catch(err: any){
            console.error(err)
        }
    }

    return(
        <StockContext.Provider value={{
            exchanges, 
            setExchanges, 
            symbol, 
            setSymbol, 
            stock, 
            setStock,
            handleGetSymbols
        }}>
            {children}
        </StockContext.Provider>
    )
}

export const useStocks = () => React.useContext(StockContext);