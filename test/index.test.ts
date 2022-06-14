import {expect} from 'chai';
import {combine, Ingredient, prettyPrintingPress} from '../src/index';

describe('combine ingredients', () => {
  it('accepts an empty array', () => {
    expect(combine([])).to.deep.equal([]);
  });

  it('returns sorted ingredients', () => {
    const ingredientArray: Ingredient[] = [
      {
        ingredient: 'butter',
        quantity: 2,
        unit: 'tablespoon',
        symbol: 'tbs',
        minQty: 2,
        maxQty: 2,
      },
      {
        ingredient: 'apples',
        quantity: 2,
        unit: 'pound',
        symbol: 'lb',
        minQty: 2,
        maxQty: 2,
      },
    ];
    expect(combine(ingredientArray)).to.deep.equal([
      {
        ingredient: 'apples',
        quantity: 2,
        unit: 'pound',
        symbol: 'lb',
        minQty: 2,
        maxQty: 2,
      },
      {
        ingredient: 'butter',
        quantity: 2,
        unit: 'tablespoon',
        symbol: 'tbs',
        minQty: 2,
        maxQty: 2,
      },
    ]);
  });

  it('combines two ingredient objects into one', () => {
    const ingredientArray: Ingredient[] = [
      {
        ingredient: 'butter',
        quantity: 2,
        unit: 'tablespoon',
        symbol: 'tbs',
        minQty: 2,
        maxQty: 2,
      },
      {
        ingredient: 'butter',
        quantity: 2,
        unit: 'tablespoon',
        symbol: 'tbs',
        minQty: 2,
        maxQty: 2,
      },
    ];
    expect(combine(ingredientArray)).to.deep.equal([
      {
        ingredient: 'butter',
        quantity: 4,
        unit: 'tablespoon',
        symbol: 'tbs',
        minQty: 4,
        maxQty: 4,
      },
    ]);
  });

  it('combines three ingredient objects into one', () => {
    const ingredientArray: Ingredient[] = [
      {
        ingredient: 'butter',
        quantity: 2,
        unit: 'tablespoon',
        symbol: 'tbs',
        minQty: 2,
        maxQty: 2,
      },
      {
        ingredient: 'butter',
        quantity: 2,
        unit: 'tablespoon',
        symbol: 'tbs',
        minQty: 2,
        maxQty: 2,
      },
      {
        ingredient: 'butter',
        quantity: 2,
        unit: 'tablespoon',
        symbol: 'tbs',
        minQty: 2,
        maxQty: 2,
      },
    ];
    expect(combine(ingredientArray)).to.deep.equal([
      {
        ingredient: 'butter',
        quantity: 6,
        unit: 'tablespoon',
        symbol: 'tbs',
        minQty: 6,
        maxQty: 6,
      },
    ]);
  });

  it('combines four ingredient objects into two', () => {
    const ingredientArray: Ingredient[] = [
      {
        ingredient: 'butter',
        quantity: 2,
        unit: 'tablespoon',
        symbol: 'tbs',
        minQty: 2,
        maxQty: 2,
      },
      {
        ingredient: 'butter',
        quantity: 2,
        unit: 'tablespoon',
        symbol: 'tbs',
        minQty: 2,
        maxQty: 2,
      },
      {
        ingredient: 'butter',
        quantity: 2,
        unit: 'tablespoon',
        symbol: 'tbs',
        minQty: 2,
        maxQty: 2,
      },
      {
        ingredient: 'apple',
        quantity: 2,
        unit: 'pound',
        symbol: 'lb',
        minQty: 2,
        maxQty: 2,
      },
    ];
    expect(combine(ingredientArray)).to.deep.equal([
      {
        ingredient: 'apple',
        quantity: 2,
        unit: 'pound',
        symbol: 'lb',
        minQty: 2,
        maxQty: 2,
      },
      {
        ingredient: 'butter',
        quantity: 6,
        unit: 'tablespoon',
        symbol: 'tbs',
        minQty: 6,
        maxQty: 6,
      },
    ]);
  });

  it('combines 2 ingredients that have a quantity range', () => {
    const ingredientArray: Ingredient[] = [
      {
        ingredient: 'butter',
        quantity: 2,
        unit: 'tablespoon',
        symbol: 'tbs',
        minQty: 2,
        maxQty: 3,
      },
      {
        ingredient: 'butter',
        quantity: 2,
        unit: 'tablespoon',
        symbol: 'tbs',
        minQty: 1,
        maxQty: 2,
      },
    ];
    expect(combine(ingredientArray)).to.deep.equal([
      {
        ingredient: 'butter',
        quantity: 4,
        unit: 'tablespoon',
        symbol: 'tbs',
        minQty: 3,
        maxQty: 5,
      },
    ]);
  });

  it('combines 1 ingredient with no range, and 1 with a range', () => {
    const ingredientArray: Ingredient[] = [
      {
        ingredient: 'butter',
        quantity: 10,
        unit: 'tablespoon',
        symbol: 'tbs',
        minQty: 1,
        maxQty: 10,
      },
      {
        ingredient: 'butter',
        quantity: 2,
        unit: 'tablespoon',
        symbol: 'tbs',
        minQty: 2,
        maxQty: 2,
      },
    ];
    expect(combine(ingredientArray)).to.deep.equal([
      {
        ingredient: 'butter',
        quantity: 12,
        unit: 'tablespoon',
        symbol: 'tbs',
        minQty: 3,
        maxQty: 12,
      },
    ]);
  });

  it('combines 2 ingredient with a range, and 1 different ingredient without a range', () => {
    const ingredientArray: Ingredient[] = [
      {
        ingredient: 'butter',
        quantity: 10,
        unit: 'tablespoon',
        symbol: 'tbs',
        minQty: 1,
        maxQty: 10,
      },
      {
        ingredient: 'butter',
        quantity: 2,
        unit: 'tablespoon',
        symbol: 'tbs',
        minQty: 2,
        maxQty: 2,
      },
      {
        ingredient: 'apple',
        quantity: 2,
        unit: null,
        symbol: null,
        minQty: 2,
        maxQty: 2,
      },
    ];
    expect(combine(ingredientArray)).to.deep.equal([
      {
        ingredient: 'apple',
        quantity: 2,
        unit: null,
        symbol: null,
        minQty: 2,
        maxQty: 2,
      },
      {
        ingredient: 'butter',
        quantity: 12,
        unit: 'tablespoon',
        symbol: 'tbs',
        minQty: 3,
        maxQty: 12,
      },
    ]);
  });

  it('does not combine if ingredients have different units (for now)', () => {
    const ingredientArray: Ingredient[] = [
      {
        ingredient: 'butter',
        quantity: 2,
        unit: 'tablespoon',
        symbol: 'tbs',
        minQty: 2,
        maxQty: 2,
      },
      {
        ingredient: 'butter',
        quantity: 2,
        unit: 'tablespoon',
        symbol: 'tbs',
        minQty: 2,
        maxQty: 2,
      },
      {
        ingredient: 'butter',
        quantity: 1,
        unit: 'stick',
        symbol: null,
        minQty: 1,
        maxQty: 1,
      },
      {
        ingredient: 'apple',
        quantity: 2,
        unit: 'pound',
        symbol: 'lb',
        minQty: 2,
        maxQty: 2,
      },
    ];
    expect(combine(ingredientArray)).to.deep.equal([
      {
        ingredient: 'apple',
        quantity: 2,
        unit: 'pound',
        symbol: 'lb',
        minQty: 2,
        maxQty: 2,
      },
      {
        ingredient: 'butter',
        quantity: 4,
        unit: 'tablespoon',
        symbol: 'tbs',
        minQty: 4,
        maxQty: 4,
      },
      {
        ingredient: 'butter',
        quantity: 1,
        unit: 'stick',
        symbol: null,
        minQty: 1,
        maxQty: 1,
      },
    ]);
  });

  it('handles the no-unit case', () => {
    const ingredientArray: Ingredient[] = [
      {
        ingredient: 'tortilla',
        quantity: 10,
        unit: null,
        symbol: null,
        minQty: 10,
        maxQty: 10,
      },
      {
        ingredient: 'tortilla',
        quantity: 5,
        unit: null,
        symbol: null,
        minQty: 5,
        maxQty: 5,
      },
    ];
    expect(combine(ingredientArray)).to.deep.equal([
      {
        ingredient: 'tortilla',
        quantity: 15,
        unit: null,
        symbol: null,
        minQty: 15,
        maxQty: 15,
      },
    ]);
  });

  it('handles the no-unit and no-quantity case', () => {
    const ingredientArray: Ingredient[] = [
      {
        ingredient: 'Powdered Sugar',
        quantity: 0,
        unit: null,
        symbol: null,
        minQty: 0,
        maxQty: 0,
      },
      {
        ingredient: 'Powdered Sugar',
        quantity: 0,
        unit: null,
        symbol: null,
        minQty: 0,
        maxQty: 0,
      },
    ];
    expect(combine(ingredientArray)).to.deep.equal([
      {
        ingredient: 'Powdered Sugar',
        quantity: 0,
        unit: null,
        symbol: null,
        minQty: 0,
        maxQty: 0,
      },
    ]);
  });
});

describe('pretty printing press', () => {
  const ingredients: Ingredient[] = [
    {
      ingredient: 'milk',
      unit: 'cup',
      symbol: null,
      quantity: 1.5,
      minQty: 1.5,
      maxQty: 1.5,
    },
    {
      ingredient: 'milk',
      unit: 'cup',
      symbol: null,
      quantity: 0.25,
      minQty: 0.25,
      maxQty: 0.25,
    },
    {
      ingredient: 'milk',
      unit: 'cup',
      symbol: null,
      quantity: 1,
      minQty: 1,
      maxQty: 1,
    },
    {
      ingredient: 'something',
      unit: 'box',
      symbol: null,
      quantity: 2,
      minQty: 2,
      maxQty: 2,
    },
    {
      ingredient: 'milk',
      unit: 'teaspoon',
      symbol: null,
      quantity: 1.333,
      minQty: 1.333,
      maxQty: 1.333,
    },
    {
      ingredient: 'milk',
      unit: 'teaspoon',
      symbol: null,
      quantity: 1.666,
      minQty: 1.666,
      maxQty: 1.666,
    },
    {
      ingredient: 'milk',
      unit: 'teaspoon',
      symbol: null,
      quantity: 1.111,
      minQty: 1.111,
      maxQty: 1.111,
    },
    {
      ingredient: 'milk',
      unit: 'teaspoon',
      symbol: null,
      quantity: 1.166,
      minQty: 1.166,
      maxQty: 1.166,
    },
    {
      ingredient: 'milk',
      unit: 'teaspoon',
      symbol: null,
      quantity: 1.833,
      minQty: 1.1833,
      maxQty: 1.1833,
    },
    {
      ingredient: 'powdered sugar',
      unit: null,
      symbol: null,
      quantity: null,
      minQty: null,
      maxQty: null,
    },
    {
      ingredient: 'eggs',
      unit: null,
      symbol: null,
      quantity: 18,
      minQty: 18,
      maxQty: 18,
    },
    {
      ingredient: 'large eggs',
      unit: null,
      symbol: null,
      quantity: 18,
      minQty: 18,
      maxQty: 18,
    },
  ];
  const expectedOutcome = [
    '1 1/2 cups milk',
    '1/4 cup milk',
    '1 cup milk',
    '2 boxes something',
    '1 1/3 teaspoons milk',
    '1 2/3 teaspoons milk',
    '1 1/9 teaspoons milk',
    '1 1/6 teaspoons milk',
    '1 5/6 teaspoons milk',
    'powdered sugar',
    '18 eggs',
    '18 large eggs',
  ];
  for (let i = 0; i < ingredients.length; i++) {
    it(`returns expected outcome ${expectedOutcome[i]}`, () => {
      expect(prettyPrintingPress(ingredients[i], 'eng')).to.equal(
        expectedOutcome[i],
      );
    });
  }
});
