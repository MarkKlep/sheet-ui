import { FC, useState } from "react";
import { Row } from "./row";
import { TableButton } from "../ui/table-button";
import "../../styles/table.scss";

type TableProps = {
  tableData: any[][];
};

export const Table: FC<TableProps> = (props) => {
  const [revealedRows, setRevealedRows] = useState(13);

  const { tableData } = props;

  const handleRevealAll = () => {
    setRevealedRows(tableData.length);
  };

  const handleRevealMore = () => {
    setRevealedRows((prev) => Math.min(prev + 10, tableData.length));
  };

  const handleRevealLess = () => {
    setRevealedRows((prev) => Math.max(prev - 10, 13));
  };

  return (
    <table>
      {tableData
        .map((row, rowIndex) => (
          <Row key={rowIndex} row={row} rowIndex={rowIndex} />
        ))
        .slice(0, revealedRows)}
      <tr>
        <td colSpan={tableData[0].length} className='reveal-button-container'>
          <div>
            <TableButton onClick={handleRevealMore}>Show More</TableButton>
            <TableButton onClick={handleRevealLess}>Show Less</TableButton>
            <TableButton onClick={handleRevealAll}>Show All</TableButton>
          </div>
        </td>
      </tr>
    </table>
  );
};
