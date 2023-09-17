import Image from "next/image"
import IconButton from "../../ui/IconButton"
import Status from "../../ui/badge/Status"
import Icon from "../../ui/Icon"
import AktienLineTableChart from "./AktienLineTableChart"


export const AktienTableColumns = [
    {
        header: 'Name',
        id: 'name',
        accessor: 'name',
        cell: ({ row }: { row: any }) => {
            const data = row.original;
            return (
                <div className='flex items-center gap-3 w-[300px] max-w-[350px]'>
                    <Image
                        src="/brand-icons/BC.png"
                        alt="Amazon"
                        width={30}
                        height={30}
                        loading="lazy"
                    />

                    <div>
                        <p className='font-medium'>
                            {data.Name}
                        </p>
                        <p className='text-xs text-gray-500'>BC10</p>
                    </div>
                </div>
            )
        }
    },
    {
        header: 'Pries',
        id: 'pries',
        accessor: 'pries',
        cell: ({ row }: { row: any }) => {
            return (
                <div className='w-[200px]'>
                    80.13 €
                </div>
            )
        }
    },
    {
        header: 'Änderung',
        id: 'anderung',
        accessor: 'anderung',
        cell: ({ row }: { row: any }) => {
            return (
                <div className='w-[200px] font-medium flex items-center space-x-2 text-red-500'>
                    <Icon name="clock" className="w-1.5 h-1.5 stroke-red-500" />
                    <span>13% </span>
                </div>
            )
        }
    },
    {
        header: 'Market Cup',
        id: 'market_cup',
        accessor: 'market_cup',
        cell: ({ row }: { row: any }) => {
            return (
                <div className='w-[200px] text-[#374856]'>
                    -
                </div>
            )
        }
    },
    {
        header: 'Preischarts',
        id: 'preischarts',
        accessor: 'preischarts',
        cell: ({ row }: { row: any }) => {
            return (
                <div className='w-[250px]'>
                    <AktienLineTableChart />
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
