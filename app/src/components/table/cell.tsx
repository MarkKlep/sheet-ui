import { FC, useContext, useState, useRef } from "react";
import { FocusedCellContext } from "../../store/focused-cell-provider";
import "../../styles/table.scss";

type CellProps = {
  cellData: string | number | boolean;
  rowIndex: number;
  cellIndex: number;
};

const htmlInputTypes = {
  string: "text",
  number: "text",
  boolean: "checkbox",
};

export const Cell: FC<CellProps> = (props) => {
  const { rowIndex, cellIndex } = props;

  const [cellData, setCellData] = useState(props.cellData);
  const [cellDataType] = useState(
    typeof props.cellData as "string" | "number" | "boolean"
  );
  const [inputType, setInputType] = useState(htmlInputTypes[cellDataType]);
  const [invalidData, setInvalidData] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const { focusedCell, setFocusedCell } = useContext(FocusedCellContext)!;

  const handleInputCell = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cellValue = e.target.value;
    const cellType = e.target.getAttribute("data-type");

    if (cellType === "number") {
      const isValid = /^\d*(\.\d+)?$/.test(cellValue);
      setInvalidData(!isValid);
    } else if (cellType === "boolean") {
      setCellData(e.target.checked);
      return;
    } else if (cellType === "string") {
      console.log("cellValue = ", cellValue);
      setCellData(cellValue);
      return;
    }
    console.log("-------------------------------");
  };

  const cellStyles = [
    focusedCell?.row === rowIndex && focusedCell?.cell === cellIndex
      ? "focused-cell"
      : "",
    focusedCell?.row === rowIndex && cellIndex === 0 ? "highlighted-row" : "",
    focusedCell?.cell === cellIndex && rowIndex === 0 ? "highlighted-col" : "",
    invalidData ? "invalid-data" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <td className={cellStyles}>
      <input
        ref={inputRef}
        className={rowIndex + 1 === 2 ? "column-name" : ""}
        style={{ color: cellIndex === 0 ? "#000" : "" }}
        onFocus={() => {
          setFocusedCell({ row: rowIndex, cell: cellIndex });
          console.log("inputType = ", inputType);
        }}
        onBlur={() => setFocusedCell(null)}
        type={inputType}
        {...(inputType === "checkbox" && { checked: cellData as boolean })}
        {...(inputType === "checkbox" && {
          onKeyDown: () => setInputType("text"),
        })}
        value={cellData as string}
        onChange={handleInputCell}
        data-type={cellDataType}
      />
    </td>
  );
};
