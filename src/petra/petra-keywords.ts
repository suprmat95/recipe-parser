// Example keywords (order matters: longer keywords must be first)

const petraKeywords = [
  "petra 00",
  "petra 1",
  "petra 3",
  "petra 5",
  "petra 9",
  "petra 1 hp",
  "petra 3 hp",
  "petra 9 hp",
  "petra 8610 hp",
  "petra 0101 hp",
  "petra 0103 hp",
  "petra 0104 hp",
  "petra 0105 hp",
  "petra 0106 hp",
  "petra 0 hp",
  "petra 0107 hp",
  "petra 1110",
  "petra 1111",
  "petra 1119",
  "petra 0415",
  "petra evolutiva 0201",
  "petra maiorca 0202",
  "petra 5046",
  "petra 5063",
  "petra 5037",
  "petra 5020",
  "petra 5078",
  "petra 5072",
  "petra 5010",
  "petra 5009",
  "petra 0102 hp",
  "petra 0001 - zero glutine 1",
  "petra 0003 - zero glutine 3",
  "petra 0005 - zero glutine 5",
  "petra 0006",
  "zero peso 0008",
  "petra 0009 - zero glutine 9",
  "petra 6379",
  "petra 6320",
  "petra 6388",
  "petra 6390",
  "petra 6384",
  "petra 6305",
  "petra 0007",
  "petra 7210",
  "petra 7230",
  "petra 7220",
  "petra 7250",
  "petra 8612",
  "petra 8610",
  "petra 5009",
  "petra 1",
  "petra 3",
  "petra 5",
  "petra 9",
  "petra 6384",
  "petra 6390",
  "petra 1111",
  "petra 1119",
  "petra 5063",
  "petra 0101 hp",
  "petra 0102 hp",
  "petra 1110",
  "241 brick",
  "0000 genesis",
  "601 brick",
  "52 brick",
  "3220 brick",
  "3400 brick",
  "430 brick",
  "3130 brick",
  "25 brick",
  "0115 brick",
];
// push "farina " to each keyword along side current strings
petraKeywords.push(...petraKeywords.map((keyword) => "farina " + keyword));

petraKeywords.sort((a, b) => b.length - a.length);
export function getPetraKeywords() {
  return petraKeywords;
}
