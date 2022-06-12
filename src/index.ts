import * as convert from './convert';
import {SupportedLanguages, i18nMap} from './i18n';
import {repeatingFractions} from './repeatingFractions';

export interface Ingredient {
  ingredient: string;
  quantity: number | null;
  unit: string | null;
  symbol: string | null;
  minQty: number | null;
  maxQty: number | null;
}

export function toTasteRecognize(
  input: string,
  language: SupportedLanguages,
): [string, string, boolean] {
  const {toTaste} = i18nMap[language];

  for (const toTasteItem of toTaste) {
    const firstLetter = toTasteItem.match(/\b(\w)/g);

    if (firstLetter) {
      // checking the extended version
      let regEx = new RegExp(toTasteItem, 'gi');
      if (input.match(regEx)) {
        return [
          (firstLetter.join('.') + '.').toLocaleLowerCase(),
          convert.getFirstMatch(input, regEx),
          true,
        ];
      }
      const regExString = firstLetter.join('[.]?') + '[.]?';
      regEx = new RegExp('(\\b' + regExString + '\\b)', 'gi');
      // const a = input.toString().split(/[\s-]+/);
      if (input.match(regEx)) {
        return [
          (firstLetter.join('.') + '.').toLocaleLowerCase(),
          convert.getFirstMatch(input, regEx),
          false,
        ];
      }
    }
  }

  return ['', '', false];
}

function getUnit(input: string, language: SupportedLanguages): string[] {
  const {units, pluralUnits, symbolUnits} = i18nMap[language];
  const [toTaste, toTasteMatch] = toTasteRecognize(input, language);

  const res = (response: string[]) => {
    const symbol = symbolUnits[response[0]];
    response.splice(2, 0, symbol);
    return response;
  };

  if (toTaste) {
    return res([toTaste, toTaste, toTasteMatch]);
  }

  if (units[input] || pluralUnits[input]) {
    return res([input, pluralUnits[input], input]);
  }

  for (const unit of Object.keys(units)) {
    for (const shorthand of units[unit]) {
      const regex = new RegExp(
        '((?:^|\\s)' + shorthand.replace(/\./g, '\\.') + '(?:$|\\s))',
        'gi',
      );

      const match = input.match(regex);
      if (match) {
        return res([unit, pluralUnits[unit], match[0]]);
      }
    }
  }

  for (const pluralUnit of Object.keys(pluralUnits)) {
    const regex = new RegExp('(\\b' + pluralUnits[pluralUnit] + '\\b)', 'gi');
    const match = input.match(regex);
    if (match) {
      return res([pluralUnit, pluralUnits[pluralUnit], match[0]]);
    }
  }

  return [];
}

/* return the proposition if it's used before of the name of
the ingredient */
function getPreposition(input: string, language: SupportedLanguages) {
  const {prepositions} = i18nMap[language];

  for (const preposition of prepositions) {
    const regex = new RegExp('^' + preposition);
    if (convert.getFirstMatch(input, regex)) {
      return preposition;
    }
  }

  return null;
}

function convertToNumber(input: string, language: SupportedLanguages): number {
  const {isCommaDelimited} = i18nMap[language];
  if (!input) return 0;

  return +input.replace(isCommaDelimited ? /\./ : /,/, '').replace(/,/, '.');
}

export function parse(recipeString: string, language: SupportedLanguages) {
  const ingredientLine = recipeString.trim(); // removes leading and trailing whitespace

  /* restOfIngredient represents rest of ingredient line.
  For example: "1 pinch salt" --> quantity: 1, restOfIngredient: pinch salt */
  let [quantity, restOfIngredient] = convert.findQuantityAndConvertIfUnicode(
    ingredientLine,
    language,
  ) as string[];
  quantity = convert.convertFromFraction(quantity, language);

  /* extraInfo will be any info in parantheses. We'll place it at the end of the ingredient.
  For example: "sugar (or other sweetener)" --> extraInfo: "(or other sweetener)" */
  let extraInfo;
  if (convert.getFirstMatch(restOfIngredient, /\(([^\\)]+)\)/)) {
    extraInfo = convert.getFirstMatch(restOfIngredient, /\(([^\\)]+)\)/);
    restOfIngredient = restOfIngredient.replace(extraInfo, '').trim();
  }
  // grab unit and turn it into non-plural version, for ex: "Tablespoons" OR "Tsbp." --> "tablespoon"
  const [unit, unitPlural, symbol, originalUnit] = getUnit(
    restOfIngredient,
    language,
  ) as string[];

  // remove unit from the ingredient if one was found and trim leading and trailing whitespace
  let ingredient = originalUnit
    ? restOfIngredient.replace(originalUnit, '').trim()
    : restOfIngredient.replace(unit, '').trim();
  ingredient = ingredient.split('.').join('').trim();
  const preposition = getPreposition(ingredient.split(' ')[0], language);

  if (preposition) {
    const regex = new RegExp('^' + preposition);
    ingredient = ingredient.replace(regex, '').trim();
  }

  let minQty = quantity; // default to quantity
  let maxQty = quantity; // default to quantity

  // if quantity is non-nil and is a range, for ex: "1-2", we want to get minQty and maxQty
  if (quantity && quantity.includes('-')) {
    [minQty, maxQty] = quantity.split('-');
    quantity = minQty;
  }

  return {
    quantity: convertToNumber(quantity, language),
    unit: unit ? unit : null,
    unitPlural: unitPlural ? unitPlural : null,
    symbol: symbol ? symbol : null,
    ingredient: extraInfo
      ? `${ingredient} ${extraInfo}`
      : ingredient.replace(/( )*\.( )*/g, ''),
    minQty: convertToNumber(minQty, language),
    maxQty: convertToNumber(maxQty, language),
  };
}

export function combine(ingredientArray: Ingredient[]): Ingredient[] {
  const combinedIngredients = ingredientArray.reduce((acc, ingredient) => {
    const key = ingredient.ingredient + ingredient.unit; // when combining different units, remove this from the key and just use the name
    const existingIngredient = acc[key];

    if (existingIngredient) {
      return Object.assign(acc, {
        [key]: combineTwoIngredients(existingIngredient, ingredient),
      });
    } else {
      return Object.assign(acc, {[key]: ingredient});
    }
  }, {} as {[key: string]: Ingredient});

  return Object.keys(combinedIngredients)
    .reduce((acc, key) => {
      const ingredient = combinedIngredients[key];
      return acc.concat(ingredient);
    }, [] as Ingredient[])
    .sort(compareIngredients);
}

export function prettyPrintingPress(
  ingredient: Ingredient,
  language: SupportedLanguages,
): string {
  let quantityString = '';
  let unit = ingredient.unit;
  if (ingredient.quantity) {
    const whole = Math.floor(ingredient.quantity);
    const remainder =
      ingredient.quantity % 1
        ? `${(ingredient.quantity % 1).toPrecision(3)}`.split('.')[1]
        : undefined;
    if (+whole !== 0 && typeof whole !== 'undefined') {
      quantityString = `${whole}`;
    }
    if (remainder && typeof remainder !== 'undefined') {
      let fractional;
      if (repeatingFractions[remainder]) {
        fractional = repeatingFractions[remainder];
      } else {
        const fraction = '0.' + remainder;
        const len = fraction.length - 2;
        let denominator = Math.pow(10, len);
        let numerator = +fraction * denominator;

        const divisor = gcd(numerator, denominator);

        numerator /= divisor;
        denominator /= divisor;
        fractional = Math.floor(numerator) + '/' + Math.floor(denominator);
      }

      quantityString += quantityString ? ' ' + fractional : fractional;
    }
    if (
      ((+whole !== 0 && typeof remainder !== 'undefined') || +whole > 1) &&
      unit
    ) {
      const lang = i18nMap[language];
      unit = lang.pluralUnits[unit] || unit;
    }
  } else {
    return ingredient.ingredient;
  }

  return `${quantityString}${unit ? ' ' + unit : ''} ${ingredient.ingredient}`;
}

function gcd(a: number, b: number): number {
  if (b < 0.0000001) {
    return a;
  }

  return gcd(b, Math.floor(a % b));
}

// TODO: Maybe change this to existingIngredients: Ingredient | Ingredient[]
function combineTwoIngredients(
  existingIngredients: Ingredient,
  ingredient: Ingredient,
): Ingredient {
  const quantity =
    existingIngredients.quantity !== null && ingredient.quantity !== null
      ? Number(existingIngredients.quantity) + Number(ingredient.quantity)
      : null;
  const minQty =
    existingIngredients.minQty !== null && ingredient.minQty !== null
      ? Number(existingIngredients.minQty) + Number(ingredient.minQty)
      : null;
  const maxQty =
    existingIngredients.maxQty !== null && ingredient.maxQty !== null
      ? Number(existingIngredients.maxQty) + Number(ingredient.maxQty)
      : null;
  return Object.assign({}, existingIngredients, {quantity, minQty, maxQty});
}

function compareIngredients(a: Ingredient, b: Ingredient) {
  if (a.ingredient === b.ingredient) {
    return 0;
  }
  return a.ingredient < b.ingredient ? -1 : 1;
}
