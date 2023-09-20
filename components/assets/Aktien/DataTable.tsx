'use client'
import React from 'react';
import {
    useReactTable,
    flexRender,
    getCoreRowModel,
    VisibilityTableState,
    ColumnOrderTableState,
    ColumnPinningTableState,
    FiltersTableState,
    SortingTableState,
    ExpandedTableState,
    GroupingTableState,
    ColumnSizingTableState,
    PaginationTableState,
    RowSelectionTableState,
    ColumnDef,

    getPaginationRowModel,
    PaginationState,
} from '@tanstack/react-table';
import ReactPaginate from 'react-paginate';

// TABLE PROPS
interface DataTableProps {
    tableData: any[];
    tableColumns: any[];
    tableTitle: string;
    hiddenColumns?: string[];
    _state?: {
        [key: string]: any;
    },

    classes?: {
        table?: string;
        tableHead?: string;
        tableBody?: string;
        tableRow?: string;
        tableCell?: string;
    }
}

// TABLE STATE
interface TableStateType extends Partial<
    VisibilityTableState &
    ColumnOrderTableState &
    ColumnPinningTableState &
    FiltersTableState &
    SortingTableState &
    ExpandedTableState &
    GroupingTableState &
    ColumnSizingTableState &
    PaginationTableState &
    RowSelectionTableState
> {
    tableTitle: string;
    stocks: any;
    pagination: PaginationState;
    setStocks: any;
}


const DataTable: React.FC<DataTableProps> = ({
    tableData,
    tableColumns,
    tableTitle,
    hiddenColumns,
    classes,
    _state = {},
}) => {
    const [stocks, setStocks] = React.useState(new Object()); 

    const [{ pageIndex, pageSize }, setPagination] = React.useState<PaginationState>({ pageIndex: 0, pageSize: 10 });

    // default column definition
    const defaultColumn = React.useMemo<ColumnDef<typeof tableData[0] & { className?: string }>[]>(() => [...tableColumns], [tableColumns]);

    const [columns, setColumns] = React.useState<ColumnDef<typeof tableData[0]>[]>(defaultColumn);

    // on pagination change update table data
    React.useEffect(() => {
        setColumns(defaultColumn);
    }, [defaultColumn])


    // TABLE STATE
    const state: TableStateType = {
        tableTitle,
        stocks: stocks,
        setStocks: setStocks,
        pagination: { pageIndex, pageSize },
        ..._state,
    }

    // TABLE INSTANCE
    const table = useReactTable({
        data: tableData,
        columns: columns,
        state, 
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(), 
    });




    // TABLE RENDER
    return (
        <div className='py-5'>
            {/* table container */}
            <div className='w-100 overflow-auto pb-5'>
                <table className={`table-auto w-100 ${classes?.table ?? ''}`}>
                    <thead className={`sticky w-100 top-0 left-0 ${classes?.tableHead ?? ''}`}>
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr
                                key={headerGroup.id}
                                className={`w-full ${classes?.tableRow ?? ''}`}
                            >
                                {headerGroup.headers.map(header => (
                                    <th
                                        key={header.id}
                                        className={`w-full py-3 text-left px-1.5 border-y border-[#D9D9D9] text-[#062137] ${classes?.tableCell ?? ''}`}
                                    >

                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody className={`w-full ${classes?.tableBody ?? ''}`}>
                        {table.getRowModel().rows.map(row => (
                            <tr
                                key={row.id}
                                className={`w-full hover:bg-[#E7EEF0]/20  ${classes?.tableRow ?? ''}`}
                            >
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id} className={`py-1.5 px-1.5 text-[#062137] border-b border-[#E7EEF0]/70 ${classes?.tableCell ?? ''}`}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


            <div className="h-2" />
             <div className='flex flex-wrap items-center justify-between gap-10'>
                <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500"> Rows per page: </span>
                        <select
                            value={table.getState().pagination.pageSize}
                            onChange={e => {
                                table.setPageSize(Number(e.target.value))
                            }}
                            className='px-2 py-1.5 border border-gray-300 rounded-md text-sm text-gray-500 hover:border-gray-400 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary'
                        >
                            {[10, 20, 30, 40, 50].map(pageSize => (
                                <option key={pageSize} value={pageSize}>
                                    {pageSize} 
                                </option>
                            ))}
                        </select>
                    </div>


                    <ReactPaginate
                        previousLabel={'previous'}
                        nextLabel={'next'}
                        breakLabel={'...'}
                        breakClassName={'break-me'}
                        pageCount={table.getPageCount()}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={(e) => table.setPageIndex(e.selected)}
                        containerClassName={'flex items-center justify-center gap-2'}
                        pageLinkClassName='flex items-center border px-2 justify-center min-w-[32px] w-fit h-8 rounded-md hover:bg-slate-100'
                        pageClassName='bg-transparent'
                        activeLinkClassName={'bg-primary text-primary-100'}
                        nextLinkClassName='flex items-center border px-2 justify-center min-w-[32px] w-fit h-8 rounded-md hover:bg-slate-100'
                        previousLinkClassName='flex items-center border px-2 justify-center min-w-[32px] w-fit h-8 rounded-md hover:bg-slate-100'
                        disabledLinkClassName={'opacity-50 cursor-not-allowed'}
                    />
             </div>
        </div>
    )

}

export default DataTable;