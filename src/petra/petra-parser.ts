// Petra version to be used in petra application
// Wrapper for the parse method

import { petraPostprocessing, petraPreprocessing } from "./petra-convert";
import { parse } from "../";
import { extractAllUnits } from "../units";

export function petraParse(recipeString: string, language: string) {
  // the unitsMap is a map of language to units. It contains an arar
  const unitsArray = extractAllUnits(language);

  recipeString = petraPreprocessing(recipeString, unitsArray);
  const result = parse(recipeString, language);

  result.ingredient = petraPostprocessing(result.ingredient);
  return result;
}

export function petraMultiLineParse(recipeString: string, language: string) {
  let ingredients = recipeString.split(/,|👉🏻|👉|\r|\n|-|;/g);
  ingredients = ingredients.filter((line) => {
    // Verifica se la riga contiene una qualsiasi delle varianti della parola "ingredienti"
    if (/ingredient[ei]/i.test(line)) {
      return false;
    }
    // Verifica se la riga contiene solo numeri
    if (/^\d+$/.test(line)) {
      return false;
    }
    // Verifica se la riga contiene solo spazi bianchi o è vuota
    if (/^\s*$/.test(line)) {
      return false;
    }
    return true;
  });
  let result = [];
  let i;
  for (var ingredient of ingredients) {
    i = petraParse(ingredient, language);
    if (i["ingredient"]) {
      result.push(i);
    }
  }
  return result;
}
