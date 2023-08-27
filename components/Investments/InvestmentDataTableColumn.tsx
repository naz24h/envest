import Image from "next/image"
import IconButton from "../ui/IconButton"
import Status from "../ui/badge/Status"


export const InvestmentDataTableColumn = [
    {
        header: 'Name / Business',
        id: 'name-business',
        accessor: 'name',
        cell: ({ row }: {row:any}) => {
            return (
                <div className='flex items-center gap-3 w-[300px]'>
                    <Image 
                        src="/brand-icons/amazon.png"
                        alt="Amazon"
                        width={30}
                        height={30}
                        loading="lazy"
                    />

                    <div>
                        <p className='font-medium'>Amazon</p>
                        <p className='text-xs text-gray-500'>Amazon</p>
                    </div>
                </div>
            )
        }
    },
    {
        header: 'Date',
        id: 'date',
        accessor: 'date',
        cell: ({ row }: {row:any}) => {
            return (
                <div className='flex items-center gap-3 w-[200px]'>
                    <p className='font-medium'>Aug 12, 2023</p>
                </div>
            )
        }
    },
    {
        header: 'Laufzeit',
        id: 'laufzeit',
        accessor: 'laufzeit',
        cell: ({ row }: {row:any}) => {
            return (
                <div className='flex items-center gap-3 w-[200px]'>
                    <p className='font-medium'>Aug 12, 2023</p>
                </div>
            )
        }
    },
    {
        header: 'Amount',
        id: 'amount',
        accessor: 'amount',
        cell: ({ row }: {row:any}) => {
            return (
                <div className='flex items-center gap-3 w-[200px] text-[#374856]'>
                    <p className='font-[600]'>+3.254,00 €</p>
                </div>
            )
        }
    },
    {
        header: 'Status',
        id: 'status',
        accessor: 'status',
        cell: ({ row }: {row:any}) => {
            return (
                <div className='flex items-center gap-3 w-[250px]'> 
                   <Status status="pending" />
                </div>
            )
        }
    },
    {
        header: '',
        id: 'action',
        accessor: 'action',
        cell: ({ row }: {row:any}) => {
            return (
                <div className='flex items-center gap-3 w-[100px]'>
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
