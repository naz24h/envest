import DataTable from "../ui/table/DataTable";
import { AnleihenTableColumns } from "./AnleihenTableColumns";


const AnleihenTable = () => {
    return(
        <DataTable
            tableData={["1", "2", "3" ,"4", "5", "6", "7", "8", "9", "10"]} 
            tableColumns={AnleihenTableColumns}
            tableTitle='Anleihen'
        />
    )
};

export default AnleihenTable;