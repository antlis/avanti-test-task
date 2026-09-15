/**
 * Money as shown across the cabinet, e.g. formatMoney(12000) -> "€ 12 000".
 * Uses fr-FR grouping (space thousands separator) to match the Figma design.
 */
export function formatMoney(amount: number, currency = '€'): string {
  return `${currency} ${amount.toLocaleString('fr-FR')}`
}

/**
 * Italian-style percentage, e.g. formatPercent(3.8) -> "3,8%".
 */
export function formatPercent(value: number): string {
  return `${value.toLocaleString('it-IT', { minimumFractionDigits: 1 })}%`
}
