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


    // rendom lost or profit graph data with unique key 
    const data = _.times(20, () => ({
        name: faker.date.recent().toLocaleDateString().split('/').join('.'),
        pv: faker.finance.amount(0, 100, 2)
    }));

    // 

    const handleGraphData = async () => {
        try {
            let res = await handleGetStockGraphData(row.Code, exchange, '1h');
            console.log(res);
            setGraphData(res);
            setStocks((prev: any) => ({
                ...prev,
                [row.Code]: {
                    ...prev[row.Code],
                    graphData: res
                }
            }));
        } catch (err: any) {
            console.error(err)
        }
    }


    useEffect(() => {
        handleGraphData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



    const handleRedirect = () => {
        console.log('clicked');
        return router.replace('/dashboard/assets/anleihen/2')
    }


    return (
        <LineChart
            data={graphData}
            height={400}
            width={400}
            onClick={() => handleRedirect()}
        >
            <Line
                type="linear"
                dataKey="close"
                stroke={Math.random() > 0.5 ? '#10B981' : '#EF4444'}
                dot={false}
                strokeWidth={2}
            />
        </LineChart>
    )
}

export default AktienLineTableChart;