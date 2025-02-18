import { getPetraKeywords } from "./petra-keywords";

/**
 * Process a product string by “underscoring” a product name (a keyword)
 * when needed. In our domain the product name might include a number.
 *
 * In particular, consider these two cases:
 *
 *   1. "Farina Petra 10 g"
 *      → No change because the only number ("10") belongs to the quantity.
 *
 *   2. "Farina Petra 10 10 g"
 *      → The first "10" is meant to be part of the name.
 *         The function returns "Farina_Petra_10 10 g".
 *
 * If no quantity is detected at the end, the function falls back on
 * replacing any found keyword (from a predefined list) with its underscored version,
 * without changing the order of the words.
 *
 * @param str The input product string.
 * @param units An array of valid unit strings (e.g. ["g", "kg", "ml", "l"]).
 * @returns The processed string.
 */
export function petraPreprocessing(
  str: string,
  units: string[],
  _keywords?: string[]
): string {
  // Get keywords list
  const keywords = _keywords || getPetraKeywords();

  units;

  str = str.trim().replace(/^(-)/, "").toLowerCase();

  // Replace any matching keyword with its underscored version
  for (const keyword of keywords) {
    if (str.includes(keyword)) {
      str = str.replace(keyword, keyword.replace(/ /g, "_"));
      break;
    }
  }

  return str;
}

export function petraPostprocessing(str: string): string {
  return str.replace(/_/g, " ");
}
