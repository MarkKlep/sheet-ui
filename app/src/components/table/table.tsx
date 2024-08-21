import { useState } from "react";
import { COLUMNS, FIRST_N_ROWS } from "../../constants";
import { Row } from "./row";
import "../../styles/table.scss";

export const Table = () => {
  const [data, setData] = useState<string[][]>(
    Array(FIRST_N_ROWS).fill(Array(COLUMNS.length).fill("")),
  );
  const [focusedCell, setFocusedCell] = useState<{
    row: number;
    cell: number;
  } | null>(null);

  const handleFillCell = (
    rowIndex: number,
    cellIndex: number,
    cellData: string,
  ) => {
    const updatedTable = data.map((row, currRowIndex) =>
      rowIndex === currRowIndex
        ? row.map((cell, currCellIndex) =>
            cellIndex === currCellIndex ? cellData : cell,
          )
        : row,
    );
    setData(updatedTable);
  };

  return (
    <table>
      <thead>
        <tr>
          {COLUMNS.map((column) => (
            <td key={column}>{column}</td>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <Row
            key={rowIndex}
            row={row}
            rowIndex={rowIndex}
            focusedCell={focusedCell}
            setFocusedCell={setFocusedCell}
            handleFillCell={handleFillCell}
          />
        ))}
      </tbody>
    </table>
  );
};
