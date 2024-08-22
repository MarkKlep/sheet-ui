import { FC, ReactNode } from "react";
import "../../styles/panel.scss";

type PanelProps = {
  children: ReactNode;
};

export const Panel: FC<PanelProps> = ({ children }) => {
  return <div className='panel'>{children}</div>;
};
