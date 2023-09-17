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





const AktienLineChart = () => {


    // get stock data for 7 days


    
    // rendom lost or profit graph data with unique key
    const data = _.times(20, () => ({ 
        name: dayjs(faker.date.anytime()).format('HH:mm'),
        pv: faker.finance.amount(0, 100, 2)
    }));


     

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
                    tick={{ 
                        fill: '#B6B6B6', 
                        fontSize: 13
                    }} 
                    width={50}
                    
                />
                <Tooltip />
                <Line
                    type="linear"
                    dataKey="pv"
                    stroke={Math.random() > 0.5 ? '#10B981' : '#EF4444'}
                    dot={false}
                    strokeWidth={2}
                />
            </LineChart>
        </ResponsiveContainer>
    )

}

export default AktienLineChart;