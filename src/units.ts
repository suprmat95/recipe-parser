export const engUnits = {
  cup: ['c', 'c.', 'C', 'Cups'],
  gallon: ['gal'],
  ounce: ['oz', 'oz.'],
  pint: ['pt', 'pts', 'pt.'],
  pound: ['lb', 'lb.', 'lbs', 'lbs.', 'Lb', 'Lbs'],
  quart: ['qt', 'qt.', 'qts', 'qts.'],
  tablespoon: ['tbs', 'tbsp', 'tbspn', 'T', 'T.', 'Tablespoons', 'Tablespoon'],
  teaspoon: ['tsp', 'tspn', 't', 't.'],
  gram: ['g', 'g.'],
  kilogram: ['kg', 'kg.', 'Kg', 'Kg.'],
  liter: ['l', 'l.', 'lt', 'Lt', 'LT', 'L', 'L.'],
  milligram: ['mg', 'mg.'],
  milliliter: ['ml', 'ml.', 'mL', 'mL.'],
  package: ['pkg', 'pkgs'],
  stick: ['sticks'],
  piece: ['pcs', 'pcs.'],
  pinch: ['pinch'],
  small: ['Small'],
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

export const engNameToSymbol= {
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
  bicchiere: ['bicchiere'],
  bustina: ['bustina', 'bustine'],
  cucchiaio: ['Cucchiaio', 'Cucchiai'],
  cucchiaino: ['Cucchiaino', 'Cucchiaini','cucchiaini'],
  grammo: ['g', 'g.', 'gr','Grammo', 'grammi', 'Grammi'],
  chilogrammo: ['kg', 'kg.', 'KG','Kg', 'Kg.', 'Chilogrammo', 'chilogrammi', 'Chilogrammi','kilogrammo', 'Kilogrammo'],
  fetta: ['fetta', 'fette'],
  foglia: ['Foglia','foglie'],
  litro: ['l', 'l.', 'L', 'L.', 'lt','Litro'],
  mazzetto: ['Mazzetto','mazzetti'],
  lattina: ['Lattina'],
  milligrammo: ['mg', 'mg.', 'Milligrammo'],
  millilitro: ['ml', 'ml.', 'mL', 'mL.', 'Millilitro'],
  panetto: ['Panetto', 'panetti'],
  pacco: ['pkg', 'pkgs', 'pacchetto','Pacchetto','Pacco'],
  pezzo: ['pcs', 'pcs.','pezzi'],
  pizzico: ['Pizzico','pizzichi'],
  tazza: [ 'Tazza', 'tazzina', 'Tazzina','tazzine'],
  spicchio: ['Spicchi'],
  scatola: ['Scatole'],
  vasetto: ['Vasetto', 'vasetti'],
} as { [key: string]: string[] };

export const itaPluralUnits = {
  bicchiere: 'bicchieri',
  bustina: 'bustine',
  tazza: 'tazze',
  quarto: 'quarti',
  cucchiaio: 'cucchiai',
  cucchiaino: 'cucchiaini',
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
  pezzo: 'pezzi',
  panetto: 'panetti',
  foglia: 'foglie',
  mazzetto: 'mazzetti',
  vasetto: 'vasetti'
} as { [key: string]: string };

export const itaNameToSymbol = {
  bicchiere: '',
  bustina: '',
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
  vasetto: '',
  grammo: 'g',
  cucchiaino: 'cc',
  chilogrammo: 'kg',
  litro: 'lt',
  milligrammo: 'mg',
  millilitro: 'ml',
} as { [key: string]: string };

export const itaPreposition = ['di','d\''];

export const  unitsMap = new Map();
unitsMap.set("eng",[engUnits,  engPluralUnits, engPreposition, engNameToSymbol]);
unitsMap.set("ita",[itaUnits,  itaPluralUnits, itaPreposition, itaNameToSymbol]);

