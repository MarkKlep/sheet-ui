import { COLUMNS, FIRST_N_ROWS } from "../constants";

export function genTableContent() {
  const table = Array(FIRST_N_ROWS).fill(Array(COLUMNS.length).fill(""));

  // numberedTable = table + numbered column
  const numberedTable = Array(FIRST_N_ROWS)
    .fill(null)
    .map((_, index) => [String(index), ...table[index]]);

  // init data(names of columns) to numberedTable
  numberedTable[0] = [
    "",
    ...COLUMNS.map((_, index) => String.fromCharCode(65 + index)),
  ];
  numberedTable[1] = [1, ...COLUMNS];

  return numberedTable;
}
