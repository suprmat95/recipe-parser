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
export function petraPreprocessing(str: string, units: string[]): string {
  // Build a regex to match a quantity at the end:
  //   a number (with optional decimal), optional whitespace,
  //   then one of the allowed units, then end-of-string.
  const unitsPattern = units.join("|");
  const quantityRegex = new RegExp(
    `(\\d+(?:[.,]\\d+)?)\\s*(${unitsPattern})\\s*$`,
    "i"
  );

  const quantityMatch = str.match(quantityRegex);
  if (quantityMatch && quantityMatch.index !== undefined) {
    // The entire matched quantity string (e.g. "10 g")
    const quantityPart = quantityMatch[0].trim();
    // The number part of the quantity (e.g. "10")
    const quantityNumber = quantityMatch[1];
    // The part of the string before the quantity pattern begins
    const beforeQuantity = str.slice(0, quantityMatch.index).trim();
    // Split into tokens by whitespace
    const tokens = beforeQuantity.split(/\s+/);
    // If the very last token equals the quantity number,
    // then that number is really part of the product name.
    if (tokens.length > 0 && tokens[tokens.length - 1] === quantityNumber) {
      // “Glue” all tokens with an underscore and then re-attach the quantity.
      const underscored = tokens.join("_");
      return underscored + " " + quantityPart;
    }
  }

  // If no (trailing) quantity pattern was detected—or no special case applies—
  // fall back on checking for one of our known keywords (order matters).
  const keywords = getPetraKeywords();
  for (const keyword of keywords) {
    if (str.includes(keyword)) {
      const underscoredKeyword = keyword.replace(/ /g, "_");
      return str.replace(keyword, underscoredKeyword);
    }
  }

  // If nothing matches, return the original string.
  return str;
}

export function petraPostprocessing(str: string): string {
  return str.replace(/_/g, " ");
}
