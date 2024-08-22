import { FC } from "react";

type DropdownListProps = {
  list: string[];
  handler: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const DropdownList: FC<DropdownListProps> = (props) => {
  const { list, handler } = props;

  return (
    <label>
      Select an excel sheet:
      <select onChange={handler}>
        {list.map((item, index) => (
          <option key={item + index} value={item}>
            {item}
          </option>
        ))}
      </select>
    </label>
  );
};
