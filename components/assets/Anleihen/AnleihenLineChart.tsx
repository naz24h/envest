'use client'
import _ from 'lodash';
import React from 'react';
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

import {faker} from '@faker-js/faker'; 
import dayjs from 'dayjs';





const AnleihenLineChart = ({data, change}: {data: any[], change: number | string}) => {
    
    // rendom lost or profit graph data with unique key
    // const data = _.times(20, () => ({ 
    //     name: dayjs(faker.date.anytime()).format('HH:mm'),
    //     pv: faker.finance.amount(0, 100, 2)
    // }));


     

    return(
        <ResponsiveContainer width="100%" height="100%">
            <LineChart 
                data={data}
                height={100} 
                width={100}   
            >
                <CartesianGrid 
                    strokeDasharray="3 0" 
                    vertical={false} 
                    stroke="#E7EEF0"
                />
                <XAxis 
                    dataKey="name" 
                    tickLine={false}  
                    axisLine={false}
                    tick={{ fill: '#B6B6B6', fontSize: 13 }}
                    padding={{ right: 30 }}
                />
                <YAxis
                    tickLine={false} 
                    tickCount={7}
                    tickFormatter={(value) => `${value} €`}  
                    orientation="right"
                    axisLine={false}
                    domain={['dataMin', 'dataMax']} 
                    tick={{ 
                        fill: '#B6B6B6', 
                        fontSize: 13
                    }} 
                    width={50}
                    
                />
                <Tooltip
                    contentStyle={{
                        borderRadius: '10px',
                        border: 'none',
                        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                        padding: '10px 15px',
                        fontSize: '13px',
                        lineHeight: '18px',
                        color: '#4F4F4F',
                        fontWeight: 500,
                        fontFamily: 'Inter',
                        backgroundColor: '#fff',
                    }}

                    labelStyle={{
                        fontSize: '13px',
                        lineHeight: '18px',
                        color: '#4F4F4F',
                        fontWeight: 500,
                        fontFamily: 'Inter',
                    }}

                   // show full data
                    formatter={(value, name) => [`${value} €`, name]} 
                />
                <Line
                    type="linear"
                    dataKey="open"
                    stroke={Number(change) < 0 ? '#EF4444' : '#10B981' }
                    dot={false}
                    strokeWidth={2}
                />
            </LineChart>
        </ResponsiveContainer>
    )

}

export default AnleihenLineChart;