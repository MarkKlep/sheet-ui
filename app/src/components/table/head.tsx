import { FC } from "react";
import { COLUMNS } from "../../constants";
import { Cell } from "./cell";
import "../../styles/table-head.scss";

type HeadProps = {
  focusedCell: { row: number; cell: number } | null;
  setFocusedCell: (cell: { row: number; cell: number } | null) => void;
  handleFillCell: (
    rowIndex: number,
    cellIndex: number,
    cellData: string,
  ) => void;
};

export const Head: FC<HeadProps> = (props) => {
  const { focusedCell, setFocusedCell, handleFillCell } = props;

  return (
    <thead>
      <tr>
        {COLUMNS.map((_, index) => (
          <Cell
            key={index}
            cellData={String.fromCharCode(65 + index)}
            rowIndex={0}
            cellIndex={index}
            focusedCell={focusedCell}
            setFocusedCell={setFocusedCell}
            handleFillCell={handleFillCell}
          />
        ))}
      </tr>

      <tr className='columnsRow'>
        {COLUMNS.map((column, index) => (
          <Cell
            key={column}
            cellData={column}
            rowIndex={1}
            cellIndex={index}
            focusedCell={focusedCell}
            setFocusedCell={setFocusedCell}
            handleFillCell={handleFillCell}
          />
        ))}
      </tr>
    </thead>
  );
};
