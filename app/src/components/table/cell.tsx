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

    //cellType === "number"
    if (cellType === "number") {
      const isValid = /^\d*(\.\d+)?$/.test(cellValue);
      setInvalidData(!isValid);
      setCellData(cellValue);
    }
    //cellType === "boolean"
    else if (cellType === "boolean") {
      if (inputType === "checkbox") {
        setCellData(e.target.checked);
        return;
      }

      //!!!cell was a checkbox but user starts inputing some text data
      setInvalidData(true);
      setCellData(cellValue);
    }
    //cellType === "string"
    else {
      setCellData(cellValue);
    }
  };

  const handleBlurCell = () => {
    const cellType = inputRef.current?.getAttribute("data-type");

    //cell is a checkbox but user input there some text -> outofix when focus is demolished
    if (cellType === "boolean" && inputType === "text") {
      setInputType("checkbox");
      setInvalidData(false);
    }

    setFocusedCell(null);
  };

  const handleFocusCell = () => {
    setFocusedCell({ row: rowIndex, cell: cellIndex });
  };

  const handleKeyDownKeys = () => {
    setInputType("text");
  };

  const cellStyles = [
    focusedCell?.row === rowIndex && focusedCell?.cell === cellIndex
      ? "focused-cell"
      : "",
    focusedCell?.row === rowIndex && cellIndex === 0 ? "highlighted-row" : "",
    focusedCell?.cell === cellIndex && rowIndex === 0 ? "highlighted-col" : "",
    invalidData &&
    focusedCell?.row === rowIndex &&
    focusedCell?.cell === cellIndex
      ? "inputing-invalid-data"
      : "",
    invalidData ? "invalid-cell" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <td className={cellStyles}>
      <input
        ref={inputRef}
        className={rowIndex + 1 === 2 ? "column-name" : ""}
        style={{ color: cellIndex === 0 ? "#000" : "" }}
        onFocus={handleFocusCell}
        onBlur={handleBlurCell}
        type={inputType}
        {...(inputType === "checkbox" && { checked: cellData as boolean })}
        {...(inputType === "checkbox" && {
          onKeyDown: handleKeyDownKeys,
        })}
        value={cellData as string}
        onChange={handleInputCell}
        data-type={cellDataType}
      />

      {rowIndex + 1 === 2 && cellIndex > 0 && (
        <div className='sort-item'>123</div>
      )}
    </td>
  );
};
