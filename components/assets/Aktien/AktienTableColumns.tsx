import Image from "next/image"
import IconButton from "../../ui/IconButton"
import Status from "../../ui/badge/Status"
import Icon from "../../ui/Icon"
import AktienLineTableChart from "./AktienLineTableChart"
import PriceColumn from "./PriceColumn"
import _ from "lodash"
import { useStocks } from "@/context/StockProvider"
import React from "react"


const CompanyDetails = ({ row, table }: { row: any, table: any }) => {
    const [logo, setLogo] = React.useState<any>(null);
    
    const { getCompanyLogo } = useStocks();
    const {exchange} = table.getState(); 

    React.useEffect(() => {
        (async () => {
            try{
                let data = await getCompanyLogo(row.Code, exchange);
                if(!data?.logo) return setLogo(null); 
                setLogo(data?.logo);
            }catch(err: any){
                console.error(err)
            }
        })()
    }, [row])
 

    return(
        <div className='flex items-center gap-3 w-[300px] max-w-[350px]'>
            
            {logo ? (
                <Image
                src={logo}
                alt="Amazon"
                width={30}
                height={30}
                loading="lazy"
            />
            ): (
                <Image
                    src="https://placehold.co/60x60"
                    alt="Amazon"
                    width={30}
                    height={30}
                    loading="lazy"
                    className="rounded-full"
                />
            )}
            

            <div>
                <p className='font-medium'>
                    {row.Name}
                </p>
                <p className='text-xs text-gray-500'>{row.Code}</p>
            </div>
        </div>
    )
}

export const AktienTableColumns = [
    {
        header: 'Name',
        id: 'name',
        accessor: 'name',
        cell: ({ row, table}: { row: any, table: any }) => { 
            return  <CompanyDetails row={row.original} table={table} />
        }
    },
    {
        header: 'Pries',
        id: 'pries',
        accessor: 'pries',
        cell: ({ row, table }: { row: any, table: any }) => { 
            return <PriceColumn row={row.original} table={table} />
        }
    },
    {
        header: 'Änderung',
        id: 'anderung',
        accessor: 'anderung',
        cell: ({ row, table }: { row: any, table: any }) => {
            const data = row.original;
            const {stocks} = table.getState();

            const change = stocks[data.Code]?.live?.change;

            if( change === undefined || change === 'na' || change === 'NA' || change === 'n/a' || change === 'N/A'){
                return <span className="text-gray-500 min-w-[200px]"> -- </span>
            }

        //     <div className='w-[200px] font-medium flex items-center space-x-2 text-red-500'>
        //     <Icon name="clock" className="w-1.5 h-1.5 stroke-red-500" />
        //     <span>{change}% </span>
        // </div>

            const stockColor = change > 0 ? 'stroke-green-500' : 'stroke-red-500';
            const textColor = change > 0 ? 'text-green-500' : 'text-red-500';

            return (
                <div className={`w-[200px] font-medium flex items-center space-x-2 ${textColor}`}>
                    <Icon name="clock" className={`w-1.5 h-1.5 ${stockColor}`} />
                    <span>{change}% </span>
                </div>
            )
             
        }
    },
    {
        header: 'Market Cup',
        id: 'market_cup',
        accessor: 'market_cup',
        cell: ({ row,table }: { row: any, table: any }) => {
            const data = row.original;
            const {stocks} = table.getState();

            const stock = stocks[data.Code]?.live;

            if( _.isEmpty (stock) || stock.volume === 'na' || stock.volume === 'NA' || stock.volume === 'n/a' || stock.volume === 'N/A'){
                return <span className="text-gray-500 min-w-[200px]"> -- </span>
            }
             

            const stockColor = stock.volume > 0 ? 'stroke-green-500' : 'stroke-red-500';
            const textColor = stock.volume > 0 ? 'text-green-500' : 'text-red-500';

            return (
                <div className={`w-[200px] font-medium flex items-center space-x-2 ${textColor}`}> 
                    <span>{stock.volume} </span>
                </div>
            )
        }
    },
    {
        header: 'Preischarts',
        id: 'preischarts',
        accessor: 'preischarts',
        cell: ({ row, table }: { row: any, table: any }) => {
            return (
                <div className='w-[200px] h-[60px]'>
                    <AktienLineTableChart row={row.original} table={table} />
                </div>
            )
        }
    },
    {
        header: '',
        id: 'action',
        accessor: 'action',
        cell: ({ row }: { row: any }) => {
            return (
                <div className='w-[100px]'>
                    <div>
                        <IconButton
                            icon="three-dots"
                            className="w-8 h-8 bg-transparent rounded-full hover:bg-slate-500/10 flex items-center justify-center"
                        />
                    </div>
                </div>
            )
        }
    }
]
