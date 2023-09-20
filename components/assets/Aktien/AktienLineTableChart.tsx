'use client'
import { faker } from '@faker-js/faker';
import _, { replace } from 'lodash';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation'

import {
    LineChart, 
    Line, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    Legend, 
    ResponsiveContainer
} from 'recharts';
import { useStocks } from '@/context/StockProvider';


// CHART PROPS


const AktienLineTableChart: React.FC<{ row: any, table: any }> = ({ row, table }) => {
    const router = useRouter();
    const { handleGetStockGraphData } = useStocks();
    const [graphData, setGraphData] = React.useState<any>([]);


    const { stocks, setStocks, exchange } = table.getState();

    const stock = stocks[row.Code]?.live;
    const stockColor = stock?.change > 0 ? '#10B981' : '#EF4444';


    // rendom lost or profit graph data with unique key 
    const data = _.times(20, () => ({
        name: faker.date.recent().toLocaleDateString().split('/').join('.'),
        pv: faker.finance.amount(0, 100, 2)
    }));

    // 

    const handleGraphData = async () => {
        try {
            let res = await handleGetStockGraphData({symbol: row.Code, exchange: exchange, interval: '1h'});
         
            setGraphData(_.orderBy(_.filter(res, (item: any) => item.open !== null ), ['date'], ['desc']));
            setStocks((prev: any) => ({
                ...prev,
                [row.Code]: {
                    ...prev[row.Code],
                    graphData: _.orderBy(_.filter(res, (item: any) => item.open !== null ), ['date'], ['desc'])
                }
            }));
        } catch (err: any) {
            console.error(err)
        }
    }


    useEffect(() => {
        handleGraphData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [row])



    const handleRedirect = () => {
       
        return router.replace('/dashboard/assets/anleihen/2')
    }


    return (
      <ResponsiveContainer width="100%" height="100%"> 
        <LineChart  
            data={graphData}  
        >  
        {/* hide */}
            <YAxis 
                hide={true}
                tickLine={false}
                tickCount={1}
                axisLine={false}
                tick={false}

                domain={['dataMin', 'dataMax']} 
            />


            <Line
                type="linear"
                dataKey="open"
                stroke={stockColor}
                dot={false}
                strokeWidth={1}
            />
        </LineChart>     
      </ResponsiveContainer>
    )
 
}

export default AktienLineTableChart;