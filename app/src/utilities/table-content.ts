type TableRow = {
  [key: string]: string;
};

export function formTable(sheetData: any): any[][] {
  const columns = Object.keys(sheetData[0]);

  const tableAlphabeticNumiration = [
    "",
    ...columns.map((_, index) => String.fromCharCode(65 + index)),
  ];
  const tableHeader = [1, ...columns];
  const tableContent = sheetData.map((row: TableRow, index: number) => [
    index + 2,
    ...columns.map((col) => (row[col] === undefined ? "" : row[col])),
  ]);

  const table = [tableAlphabeticNumiration, tableHeader, ...tableContent];
  return table;
}
