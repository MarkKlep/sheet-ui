import { useState } from "react";
import { Row } from "./row";
import { genTableContent } from "../../utilities/table-content";
import "../../styles/table.scss";

const initTable = genTableContent();

export const Table = () => {
  const [data, setData] = useState<string[][]>(initTable);
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
    </table>
  );
};
