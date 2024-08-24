import { FC, useState, memo } from "react";
import { Row } from "./row";
import { TableButton } from "../ui/table-button";
import "../../styles/table.scss";
import "../../styles/buttons.scss";

type TableProps = {
  tableData: any[][];
};

const firstNRows = 13;

const TableComponent: FC<TableProps> = (props) => {
  const { tableData } = props;

  const [revealedRows, setRevealedRows] = useState(firstNRows);

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
      {tableData.slice(0, revealedRows).map((row, rowIndex) => (
        <Row key={rowIndex} row={row} rowIndex={rowIndex} />
      ))}
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

export const Table = memo(TableComponent);
