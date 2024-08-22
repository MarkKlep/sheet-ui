import { FC } from "react";
import { Cell } from "./cell";

type RowProps = {
  row: string[];
  rowIndex: number;
};

export const Row: FC<RowProps> = (props) => {
  const { row, rowIndex } = props;

  return (
    <tr>
      {row.map((cellData, cellIndex) => (
        <Cell
          key={cellIndex}
          cellData={cellData}
          rowIndex={rowIndex}
          cellIndex={cellIndex}
        />
      ))}
    </tr>
  );
};
