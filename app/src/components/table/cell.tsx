import { FC, useContext, useState } from "react";
import { FocusedCellContext } from "../../store/focused-cell-provider";
import "../../styles/table.scss";

type CellProps = {
  cellData: string;
  rowIndex: number;
  cellIndex: number;
};

export const Cell: FC<CellProps> = (props) => {
  const [text, setText] = useState(props.cellData);

  const { rowIndex, cellIndex } = props;

  const { focusedCell, setFocusedCell } = useContext(FocusedCellContext)!;

  const handleInputCell = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setText(value);
  };

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
        disabled={cellIndex === 0}
        className={rowIndex + 1 === 2 ? "column-name" : ""}
        style={{ color: cellIndex === 0 ? "#000" : "" }}
        type='text'
        value={text}
        onFocus={() => setFocusedCell({ row: rowIndex, cell: cellIndex })}
        onBlur={() => setFocusedCell(null)}
        onChange={handleInputCell}
      />
    </td>
  );
};
