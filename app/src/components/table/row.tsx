import { FC } from "react";
import { Cell } from "./cell";

type RowProps = {
  row: string[];
  rowIndex: number;
  focusedCell: { row: number; cell: number } | null;
  setFocusedCell: (cell: { row: number; cell: number } | null) => void;
  handleFillCell: (
    rowIndex: number,
    cellIndex: number,
    cellData: string,
  ) => void;
};

export const Row: FC<RowProps> = (props) => {
  const { row, rowIndex, focusedCell, setFocusedCell, handleFillCell } = props;

  return (
    <tr>
      {row.map((cellData, cellIndex) => (
        <Cell
          key={cellIndex}
          cellData={cellData}
          rowIndex={rowIndex}
          cellIndex={cellIndex}
          focusedCell={focusedCell}
          setFocusedCell={setFocusedCell}
          handleFillCell={handleFillCell}
        />
      ))}
    </tr>
  );
};
