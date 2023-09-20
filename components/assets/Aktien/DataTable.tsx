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
            <div className="flex items-center gap-2">
                <button
                    className="border rounded p-1"
                    onClick={() => table.setPageIndex(0)}
                    disabled={!table.getCanPreviousPage()}
                >
                    {'<<'}
                </button>
                <button
                    className="border rounded p-3 flex items-center justify-center hover:bg-slate-100"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    <span className='leading-[10px] text-3xl'>‹</span>
                </button>
                <button
                    className="border rounded p-3 flex items-center justify-center hover:bg-slate-100"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                  <span className='leading-[10px] text-3xl'>›</span>
                </button>
                <button
                    className="border rounded p-1"
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                    disabled={!table.getCanNextPage()}
                >
                    {'>>'}
                </button>
                <span className="flex items-center gap-1">
                    <div>Page</div>
                    <strong>
                        {table.getState().pagination.pageIndex + 1} of{' '}
                        {table.getPageCount()}
                    </strong>
                </span>
                <span className="flex items-center gap-1">
                    | Go to page:
                    <input
                        type="number"
                        defaultValue={table.getState().pagination.pageIndex + 1}
                        onChange={e => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0
                            table.setPageIndex(page)
                        }}
                        className="border p-1 rounded w-16"
                    />
                </span>
                <select
                    value={table.getState().pagination.pageSize}
                    onChange={e => {
                        table.setPageSize(Number(e.target.value))
                    }}
                >
                    {[10, 20, 30, 40, 50].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>
           
           
        </div>
    )

}

export default DataTable;