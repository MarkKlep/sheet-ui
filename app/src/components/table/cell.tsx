import { FC } from "react";

type CellProps = {
  cellData: string;
  rowIndex: number;
  cellIndex: number;
  focusedCell: { row: number; cell: number } | null;
  setFocusedCell: (cell: { row: number; cell: number } | null) => void;
  handleFillCell: (
    rowIndex: number,
    cellIndex: number,
    cellData: string,
  ) => void;
};

export const Cell: FC<CellProps> = (props) => {
  const {
    cellData,
    rowIndex,
    cellIndex,
    focusedCell,
    setFocusedCell,
    handleFillCell,
  } = props;

  return (
    <td
      className={
        focusedCell?.row === rowIndex && focusedCell?.cell === cellIndex
          ? "focused-cell"
          : ""
      }
    >
      <input
        type='text'
        value={cellData}
        onFocus={() => setFocusedCell({ row: rowIndex, cell: cellIndex })}
        onBlur={() => setFocusedCell(null)}
        onChange={(e) => handleFillCell(rowIndex, cellIndex, e.target.value)}
      />
    </td>
  );
};
