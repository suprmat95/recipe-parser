export const engUnits = {
  bag: ['bag', 'bags'],
  box: ['box'],
  can: ['can'],
  cup: ['cup', 'c', 'c.', 'C', 'Cups'],
  clove: ['clove'],
  gallon: ['gallon', 'gal'],
  ounce: ['ounce', 'oz', 'oz.'],
  pint: ['pint', 'pt', 'pts', 'pt.'],
  pound: ['pound', 'lb', 'lb.', 'lbs', 'lbs.', 'Lb', 'Lbs'],
  quart: ['quart', 'qt', 'qt.', 'qts', 'qts.'],
  tablespoon: ['tbs', 'tbsp', 'tbspn', 'T', 'T.', 'Tablespoons', 'Tablespoon'],
  teaspoon: ['teaspoon', 'tsp', 'tspn', 't', 't.'],
  gram: ['gram', 'g', 'g.'],
  kilogram: ['kilogram', 'kg', 'kg.', 'Kg', 'Kg.'],
  liter: ['liter', 'l', 'l.', 'lt', 'Lt', 'LT', 'L', 'L.'],
  milligram: ['milligram', 'mg', 'mg.'],
  milliliter: ['milliliter', 'ml', 'ml.', 'mL', 'mL.'],
  package: ['package', 'pkg', 'pkgs'],
  stick: ['stick', 'sticks'],
  piece: ['piece', 'pcs', 'pcs.'],
  pinch: ['pinch'],
  small: ['Small'],
  slice: ['slice'],
  medium: ['Medium'],
  large: ['large', 'Large'],
} as { [key: string]: string[] };

export const engPluralUnits = {
  cup: 'cups',
  gallon: 'gallons',
  ounce: 'ounces',
  pint: 'pints',
  pound: 'pounds',
  quart: 'quarts',
  tablespoon: 'tablespoons',
  teaspoon: 'teaspoons',
  gram: 'grams',
  kilogram: 'kilograms',
  liter: 'liters',
  milligram: 'milligrams',
  milliliter: 'milliliters',
  clove: 'cloves',
  bag: 'bags',
  box: 'boxes',
  pinch: 'pinches',
  can: 'cans',
  slice: 'slices',
  piece: 'pieces'
} as { [key: string]: string };

export const engNameToSymbol = {
  cup: 'c',
  gallon: 'gal',
  ounce: 'oz',
  pint: 'pt',
  pound: 'lb',
  quart: 'qt',
  tablespoon: 'tbs',
  teaspoon: 'tsp',
  gram: 'g',
  kilogram: 'kg',
  liter: 'lt',
  milligram: 'mg',
  milliliter: 'ml',
  clove: '',
  bag: '',
  box: '',
  pinch: '',
  can: '',
  slice: '',
  piece: ''
} as { [key: string]: string };

export const engPreposition = ['of'];


export const itaUnits = {
  barattolo: ['barattolo', 'barattoli'],
  bicchiere: ['bicchiere'],
  bottiglia: ['bottiglie', 'bottiglia'],
  bustina: ['bustina', 'bustine'],
  cubetto: ['cubetto', 'cubetti'],
  cucchiaio: ['cucchiai', 'cucchiaio'],
  cucchiaino: ['cucchiaini', 'cucchiaino'],
  confezione: ['confezioni', 'confezione'],
  grammo: ['g', 'g\\.', 'gr\\.', 'gr', 'grammi', 'grammo'],
  chilogrammo: ['kg.', 'kg', 'kilogrammo', 'chilogrammi', 'kilogrammo', 'chilogrammo'],
  fetta: ['fetta', 'fette'],
  fettina: ['fettina', 'fettine'],
  fogliolina: ['fogliolina', 'foglioline'],
  foglia: ['foglie', 'foglia'],
  foglio: ['fogli', 'foglio'],
  gambo: ['gambo', 'gambi'],
  litro: ['l\\.', 'l', 'lt', 'litro'],
  mazzo: ['mazzo', 'mazzi'],
  mazzetto: ['Mazzetto', 'mazzetti', 'mazzetto'],
  lattina: ['Lattina', 'lattina'],
  milligrammo: ['mg.', 'mg', 'milligrammo'],
  millilitro: ['ml', 'ml\\.', 'millilitro'],
  panetto: ['Panetto', 'panetti', 'panetto'],
  pacco: ['pkg', 'pkgs', 'pacchetto', 'pacco'],
  pezzo: ['pezzo', 'pcs', 'pcs.', 'pezzi'],
  pizzico: ['pizzico', 'pizzichi'],
  tazza: ['tazza', 'tazzina', 'tazzine'],
  sacco: ['sacco', 'sacchi'],
  spicchio: ['spicchio', 'spicchi'],
  scatola: ['scatola', 'scatole'],
  vasetto: ['vasetto', 'vasetti'],
  filo: ['filo'],
  ciuffo: ['ciuffo'],
  scatoletta: ['scatoletta'],
  manciata: ['manciata'],
  rametto: ['rametto', 'rametti'],
  rotolo: ['rotolo'],
  pugno: ['pugno', 'pugni'],
  bicchierino: ['bicchierino'],

  //noce: ['noce'],
} as { [key: string]: string[] };

export const itaPluralUnits = {
  barattolo: 'barattoli',
  bicchiere: 'bicchieri',
  bustina: 'bustine',
  bottiglia: 'bottiglie',
  cubetto: 'cubetti',
  gambo: 'gambi',
  tazza: 'tazze',
  quarto: 'quarti',
  cucchiaio: 'cucchiai',
  cucchiaino: 'cucchiaini',
  confezione: 'confezioni',
  grammo: 'grammi',
  chilogrammo: 'chilogrammi',
  litro: 'litri',
  milligrammo: 'milligrammi',
  millilitro: 'millilitri',
  spicchio: 'spicchi',
  scatola: 'scatole',
  pizzico: 'pizzichi',
  lattina: 'lattine',
  fetta: 'fette',
  fettina: 'fettine',
  pezzo: 'pezzi',
  panetto: 'panetti',
  foglio: 'fogli',
  fogliolina: 'foglioline',
  foglia: 'foglie',
  mazzo: 'mazzi',
  mazzetto: 'mazzetti',
  vasetto: 'vasetti',
  filo: 'fili',
  ciuffo: 'ciuffi',
  sacco: 'sacchi',
  scatoletta: 'scatolette',
  manciata: 'manciate',
  rametto: 'rametti',
  rotolo: 'rotoli',
  bicchierino: 'bicchierini',
  pugno: 'pugni'
  //noce: 'noci'
} as { [key: string]: string };

export const itaNameToSymbol = {
  bicchiere: '',
  bustina: '',
  cubetto: '',
  gambo: '',
  tazza: '',
  quarto: '',
  cucchiaio: '',
  spicchio: '',
  scatola: '',
  pizzico: '',
  lattina: '',
  fetta: '',
  pezzo: '',
  panetto: '',
  foglia: '',
  mazzetto: '',
  manciata: '',
  vasetto: '',
  grammo: 'g',
  cucchiaino: 'cc',
  chilogrammo: 'kg',
  litro: 'lt',
  milligrammo: 'mg',
  millilitro: 'ml',
} as { [key: string]: string };

export const itaPreposition = ['di', 'd\''];

export const unitsMap = new Map();
unitsMap.set("eng", [engUnits, engPluralUnits, engPreposition, engNameToSymbol]);
unitsMap.set("ita", [itaUnits, itaPluralUnits, itaPreposition, itaNameToSymbol]);

export function extractAllUnits(language: string): string[] {
  const unitData = unitsMap.get(language);
  if (!unitData) return [];

  const flattenedUnits = new Set<string>();

  for (const data of unitData) {
    if (Array.isArray(data)) {
      // If it's already an array, add all its elements
      data.forEach((unit) => flattenedUnits.add(unit));
    } else if (typeof data === "object") {
      // If it's an object (dictionary), extract all values
      Object.values(data).forEach((value: any) => {
        if (Array.isArray(value)) {
          value.forEach((unit) => flattenedUnits.add(unit));
        } else {
          flattenedUnits.add(value);
        }
      });
    }
  }

  return Array.from(flattenedUnits);
}