import { FC } from "react";

type XLSXLoaderProps = {
  handler: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const XLSXLoader: FC<XLSXLoaderProps> = (props) => {
  const { handler } = props;

  return (
    <>
      <label htmlFor='file-input'>Upload an excel file:</label>
      <input type='file' id='file-input' onChange={handler} />
    </>
  );
};
