import { FC } from "react";
import "../../styles/table.scss";

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
          : "" +
            " " +
            (focusedCell?.row === rowIndex && cellIndex === 0
              ? "highlighted-row"
              : "") +
            " " +
            (focusedCell?.cell === cellIndex && rowIndex === 0
              ? "highlighted-col"
              : "")
      }
    >
      <input
        className={rowIndex + 1 === 2 ? "column-name" : ""}
        style={{ color: cellIndex === 0 ? "#000" : "" }}
        type='text'
        value={cellData}
        onFocus={() => setFocusedCell({ row: rowIndex, cell: cellIndex })}
        onBlur={() => setFocusedCell(null)}
        onChange={(e) => handleFillCell(rowIndex, cellIndex, e.target.value)}
      />
    </td>
  );
};
