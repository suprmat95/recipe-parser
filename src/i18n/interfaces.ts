export type LanguageConfig = {
  baseUnits: string;
  units: {[key: string]: string[]};
  pluralUnits: {[key: string]: string};
  symbolUnits: {[key: string]: string};
  prepositions: string[];
  joiners: string[];
  toTaste: string[];
  numbersSmall: {[key: string]: number};
  numbersMagnitude: {[key: string]: number};
  isCommaDelimited: boolean;
};
