import { FC, ReactNode, MouseEventHandler } from "react";
import "../../styles/buttons.scss";

type TableButtonProps = {
  children: ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export const TableButton: FC<TableButtonProps> = ({ children, onClick }) => {
  return (
    <button className='table-button' onClick={onClick}>
      {children}
    </button>
  );
};
