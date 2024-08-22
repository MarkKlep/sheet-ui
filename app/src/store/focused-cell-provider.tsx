import { createContext, useState, FC, ReactNode } from "react";

type Cell = {
  row: number;
  cell: number;
};

interface IFocusedCellContext {
  focusedCell: Cell | null;
  setFocusedCell: (cell: Cell | null) => void;
}

export const FocusedCellContext = createContext<IFocusedCellContext | null>(
  null,
);

export const FocusedCellProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [focusedCell, setFocusedCell] = useState<Cell | null>(null);

  return (
    <FocusedCellContext.Provider value={{ focusedCell, setFocusedCell }}>
      {children}
    </FocusedCellContext.Provider>
  );
};
