import { COLUMNS, FIRST_N_ROWS } from "../constants";

export function genTableContent() {
  const table = Array(FIRST_N_ROWS).fill(Array(COLUMNS.length).fill(""));

  const numberedRows = Array(FIRST_N_ROWS)
    .fill(null)
    .map((_, index) => [String(index), ...table[index]]);

  numberedRows[0] = [
    "",
    ...COLUMNS.map((_, index) => String.fromCharCode(65 + index)),
  ];

  numberedRows[1] = [1, ...COLUMNS];

  return numberedRows;
}
