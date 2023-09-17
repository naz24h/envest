import { useStocks } from '@/context/StockProvider';
import _ from 'lodash';
import { useEffect, useState } from 'react';

const PriceColumn = ({row, table}) => {
    const { handleGetStockDataLive} = useStocks();
    const [liveStock, setLiveStock] = useState({}); 

    const { stocks, setStocks, exchange } = table.getState();


    // const getStockLiveData = async (code) => {
        
    //         console.log({
    //             stocks,
    //             row
    //         }); 

    //         const res = await handleGetStockDataLive(code, exchange);
            
    //         setLiveStock(res); 
 
    //         setStocks(prev =>  {
    //             if(prev[code]) {
    //                 return {
    //                     ...prev,
    //                     [code]: {
    //                         ...prev[code],
    //                         live: res
    //                     }
    //                 }
    //             } else {
    //                 return {
    //                     ...prev,
    //                     [code]: {
    //                         live: res
    //                     }
    //                 }
    //             }
    //         })
    // } 
 
    useEffect(()=> { 

        (async () => {
            if(
                _.isEmpty(stocks) || !stocks[row.Code] || (stocks[row.Code] && !stocks[row.Code].live)) {
                const res = await handleGetStockDataLive(row.Code, exchange);
                setLiveStock(res);
                setStocks(prev => ({...prev, [row.Code]: {
                    ...prev[row.Code],
                    live: res,
                }}))
            }else{
                setLiveStock(stocks[row.Code].live);
            }
        }) ()
         
    }, [row])

    return(
      <div className='w-72'>
            {liveStock && _.includes(['na', 'NA','n/a', 'N/A'], liveStock.open) ? 
                <span className="text-gray-500"> -- </span> :
                <span className="text-gray-500 "> <span className='font-medium'>{liveStock.open}</span> {row.Currency}</span>
            }
      </div>
    )
}

export default PriceColumn;