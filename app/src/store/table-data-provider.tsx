import { createContext, useState, FC, ReactNode } from "react";

interface TableDataContextType {
  tableData: any[][];
  setTableData: React.Dispatch<React.SetStateAction<any[][]>>;
}

export const TableDataContext = createContext<TableDataContextType | null>(
  null
);

export const TableDataProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [tableData, setTableData] = useState<any[][]>([]);

  return (
    <TableDataContext.Provider value={{ tableData, setTableData }}>
      {children}
    </TableDataContext.Provider>
  );
};
