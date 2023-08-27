'use client'
import  React from 'react';
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
 } from '@tanstack/react-table';

// TABLE PROPS
interface DataTableProps {
    tableData: any[];
    tableColumns: any[]; 
    tableTitle: string;
    hiddenColumns?: string[];

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
}


const DataTable:React.FC<DataTableProps> = ({
    tableData,
    tableColumns,
    tableTitle,
    hiddenColumns,
    classes
}) => {
 
    

    // default column definition
    const defaultColumn = React.useMemo< ColumnDef<typeof tableData[0] & {className?:string}> [] > ( () => [...tableColumns], [tableColumns]);

    const [columns, setColumns] = React.useState<ColumnDef<typeof tableData[0]> []>(defaultColumn);

    // TABLE STATE
    const state: TableStateType = {
        tableTitle
    }

    // TABLE INSTANCE
    const table = useReactTable({
        data: tableData,
        columns: columns,
        state,
        getCoreRowModel: getCoreRowModel(),
    });


    // TABLE RENDER
    return(
        <div className='py-5'>
            {/* table container */}
            <div className='w-100 overflow-auto'>
                <table className={`sticky w-100 ${classes?.table ?? ''}`}>
                    <thead className={`${classes?.tableHead ?? ''}`}>
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
        </div>
    )

}

export default DataTable;