'use client'
import { InvestmentDataTableColumn } from '@/components/Investments/InvestmentDataTableColumn';
import Icon from '@/components/ui/Icon';
import DataTable from '@/components/ui/table/DataTable';
import React from 'react';


const Investments = () => {
    return (
        <div className='container py-3'>
           <div className='mt-5'>
                <h3 className='font-medium text-2xl flex items-center gap-3'>
                    <Icon name='single-line' className='w-6 h-6' />
                    My Investments
                </h3>
           </div>

            {/* table container */}
           <div>
                <DataTable
                    tableData={[
                        {id: 1},
                        {id: 2},
                        {id: 3},
                        {id: 4},
                        {id: 5},
                        {id: 6},
                        {id: 7},
                        {id: 8},
                        {id: 9},
                        {id: 10},
                    ]}
                    tableTitle='Investments'
                    tableColumns={InvestmentDataTableColumn}
                />
           </div>
        </div>
    );
}

export default Investments;