/**
 * Cart UI still shows demo USD-style prices. PayOS requires VND integers.
 * Convert with a fixed rate until catalog prices are migrated to VND.
 */
const USD_TO_VND = 25_000;
const MIN_VND = 2_000;

export function toPayosAmountVnd(displayTotal: number): number {
  const vnd = Math.round(displayTotal * USD_TO_VND);
  return Math.max(MIN_VND, vnd);
}
