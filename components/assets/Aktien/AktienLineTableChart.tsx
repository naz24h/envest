'use client'
import { faker } from '@faker-js/faker';
import _, { replace } from 'lodash';
import React, {useEffect} from 'react';
import { useRouter  } from 'next/navigation'

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
 

const AktienLineTableChart:React.FC<{row:any, table:any}> = ({row, table}) => { 
    const router = useRouter(); 
    const { handleGetStockGraphData } = useStocks();
    

    const { stocks, setStocks, exchange } = table.getState();


    // rendom lost or profit graph data with unique key 
    const data = _.times(20, () => ({
        name: faker.date.recent().toLocaleDateString().split('/').join('.'),
        pv: faker.finance.amount(0, 100, 2)
    }));

    // 

    const handleGraphData = async () => {
        try {
            let res = await handleGetStockGraphData(row.symbol, exchange);
            console.log(res);
            return res;
        } catch (err: any) {
            console.error(err)
        }
    }


    useEffect(() => {
        
    }, [])



    const handleRedirect = () => {
        console.log('clicked');
        return router.replace('/dashboard/assets/anleihen/2')
    }


    return( 
            <LineChart 
                data={data}
                height={35} 
                width={100}   
                onClick={() => handleRedirect()}
            > 
                <Line
                    type="linear"
                    dataKey="pv"
                    stroke={Math.random() > 0.5 ? '#10B981' : '#EF4444'}
                    dot={false}
                    strokeWidth={2}
                />
            </LineChart> 
    )
}

export default AktienLineTableChart;