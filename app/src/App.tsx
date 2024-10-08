import { useState, useContext, useMemo } from "react";
import { TableDataContext } from "./store/table-data-provider";
import * as XLSX from "xlsx";
import { formTable } from "./utilities/table-content";
import { Table } from "./components/table/table";
import { DropdownList } from "./components/ui/dropdown-list";
import { Panel } from "./components/ui/panel";
import { XLSXLoader } from "./components/ui/xlsx-loader";
import "./App.css";

function App() {
  const [sheets, setSheets] = useState<string[]>([]);
  const [workbook, setWorkbook] = useState<XLSX.WorkBook | null>(null);

  const { tableData, setTableData } = useContext(TableDataContext)!;

  const memoizedSheets = useMemo(() => sheets, [sheets]);
  const memoizedTableData = useMemo(() => tableData, [tableData]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      const wb = XLSX.read(event.target!.result, { type: "binary" });
      setWorkbook(wb);

      const sheetNames = wb.SheetNames;
      setSheets(sheetNames);
    };

    reader.readAsBinaryString(file);
  };

  const handlePickSheet = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sheetName = e.target.value;

    if (workbook) {
      const sheet = workbook.Sheets[sheetName];
      const sheetData = XLSX.utils.sheet_to_json<{ [key: string]: any }>(sheet);

      //form table
      const loadedTable = formTable(sheetData);
      setTableData(loadedTable);
    }
  };

  return (
    <div className='App'>
      <Panel>
        <XLSXLoader handler={handleFileUpload} />
        {memoizedSheets.length > 0 && (
          <DropdownList list={memoizedSheets} handler={handlePickSheet} />
        )}
      </Panel>

      {memoizedTableData.length === 0 ? (
        <p>No data to display</p>
      ) : (
        <Table tableData={memoizedTableData} />
      )}
    </div>
  );
}

export default App;
