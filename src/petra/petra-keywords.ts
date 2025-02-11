// Example keywords (order matters: longer keywords must be first)

const petraKeywords = [
  "petra 00",
  "petra 0",
  "petra 8610",
  "petra 0",
  "petra 9",
  "petra 1",
];
// push "farina " to each keyword along side current strings
petraKeywords.push(...petraKeywords.map((keyword) => "farina " + keyword));

petraKeywords.sort((a, b) => b.length - a.length);
export function getPetraKeywords() {
  return petraKeywords;
}
