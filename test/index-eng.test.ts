import {expect} from 'chai';
import {parse} from '../src/index';

describe('recipe parser eng', () => {
  it('returns an object', () => {
    expect(typeof parse('1 cup water', 'eng')).to.equal('object');
  });

  describe('translates the quantity', () => {
    it('of "to taste of water"', () => {
      expect(parse('to taste of water', 'eng').unit).to.equal('t.t.');
    });
    it('of "To taste of water"', () => {
      expect(parse('To taste of water', 'eng').unit).to.equal('t.t.');
    });
    it('of "t.t. of water"', () => {
      expect(parse('t.t. of water', 'eng').unit).to.equal('t.t.');
    });
    it('of "t.t. of water"', () => {
      expect(parse('t.t. of water', 'eng').unit).to.equal('t.t.');
    });
    it('of "TT of water"', () => {
      expect(parse('TT of water', 'eng').unit).to.equal('t.t.');
    });
    it('of "TT. of water"', () => {
      expect(parse('TT. of water', 'eng').unit).to.equal('t.t.');
    });
    it('of "T.t of water"', () => {
      expect(parse('T.t of water', 'eng').unit).to.equal('t.t.');
    });
    it('of "1 teaspoon water"', () => {
      expect(parse('1 teaspoon water', 'eng').quantity).to.equal(1);
    });
    it('of "1.5 teaspoon water"', () => {
      expect(parse('1.5 teaspoon water', 'eng').quantity).to.equal(1.5);
    });
    it('of "1 1/2 teaspoon water"', () => {
      expect(parse('1 1/2 teaspoon water', 'eng').quantity).to.equal(1.5);
    });
    it('of "1/3 teaspoon water"', () => {
      expect(parse('1/3 cup water', 'eng').quantity).to.equal(0.333);
    });
    it('of "1/2 teaspoon water"', () => {
      expect(parse('1/2 teaspoon water', 'eng').quantity).to.equal(0.5);
    });
    it('of "10 1/2 teaspoon water"', () => {
      expect(parse('10 1/2 teaspoon water', 'eng').quantity).to.equal(10.5);
    });
    it('of "about 1/2 teaspoon water"', () => {
      expect(parse('about 1/2 teaspoon water', 'eng').quantity).to.equal(0.5);
    });

    it('of "1,500.50 teaspoon water"', () => {
      expect(parse('1,500.50 teaspoon water', 'eng').quantity).to.equal(1500.5);
    });

    describe('translates the quantity from string to number', () => {
      it('zero teaspoon water"', () => {
        expect(parse('zero teaspoon water', 'eng').quantity).to.equal(0);
      });
      it('one teaspoon water"', () => {
        expect(parse('one teaspoon water', 'eng').quantity).to.equal(1);
      });
      it('twenty-one teaspoon water"', () => {
        expect(parse('twenty-one teaspoon water', 'eng').quantity).to.equal(21);
      });
      it('five teaspoon water"', () => {
        expect(parse('five teaspoon water', 'eng').quantity).to.equal(5);
      });
    });

    describe('to taste detector', () => {
      it('does not detect words containing the same characters', () => {
        expect(parse('100g of butter', 'eng').unit).to.equal('gram');
        expect(parse('100g of butter', 'eng').ingredient).to.equal('butter');
      });
    });

    describe('translates the quantity range', () => {
      const expectation = {
        ingredient: 'water',
        maxQty: 20,
        minQty: 10,
        quantity: 10,
        symbol: 'tsp',
        unit: 'teaspoon',
        unitPlural: 'teaspoons',
      };
      it('of "10-20 teaspoon water"', () => {
        expect(parse('10-20 teaspoon water', 'eng')).to.deep.equal(expectation);
      });
      it('of "10 - 20 teaspoon water"', () => {
        expect(parse('10 - 20 teaspoon water', 'eng')).to.deep.equal(
          expectation,
        );
      });
      it('of "10 to 20 teaspoon water"', () => {
        expect(parse('10 to 20 teaspoon water', 'eng')).to.deep.equal(
          expectation,
        );
      });
    });

    describe('of unicode fractions', () => {
      const unicodeAmounts = [
        '¼',
        '½',
        '¾',
        '⅐',
        '⅑',
        '⅒',
        '⅓',
        '⅔',
        '⅕',
        '⅖',
        '⅗',
        '⅘',
        '⅙',
        '⅚',
        '⅛',
        '⅜',
        '⅝',
        '⅞',
      ];
      const unicodeExpectedAmounts = [
        0.25, 0.5, 0.75, 0.142, 0.111, 0.1, 0.333, 0.666, 0.2, 0.4, 0.6, 0.8,
        0.166, 0.833, 0.125, 0.375, 0.625, 0.875,
      ];

      for (let u = 0; u < unicodeAmounts.length; u++) {
        const element = unicodeAmounts[u];
        const expectedAmount = unicodeExpectedAmounts[u];
        it(`${element} to ${expectedAmount}`, () => {
          expect(parse(`${element} teaspoon water`, 'eng').quantity).to.equal(
            expectedAmount,
          );
        });
      }

      const mixedValues = [
        '1¼',
        '2½',
        '3¾',
        '4⅐',
        '5⅑',
        '6⅒',
        '7⅓',
        '8⅔',
        '9⅕',
        '10 ⅖',
        '11 ⅗',
        '12 ⅘',
        '13 ⅙',
        '14 ⅚',
        '15 ⅛',
        '16 ⅜',
        '17 ⅝',
        '18 ⅞',
      ];
      const mixedExpectedValues = [
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        '11',
        '12',
        '13',
        '14',
        '15',
        '16',
        '17',
        '18',
      ];

      for (let u = 0; u < mixedValues.length; u++) {
        const element = mixedValues[u];
        const expectedAmount =
          Number(mixedExpectedValues[u]) + Number(unicodeExpectedAmounts[u]);
        it(`${element} to ${expectedAmount}`, () => {
          expect(parse(`${element} teaspoon water`, 'eng').quantity).to.equal(
            expectedAmount,
          );
        });
      }
    });

    it("doesn't freak out if a strange unicode character is present", () => {
      expect(parse('1/3 cup confectioners’ sugar', 'eng')).to.deep.equal({
        quantity: 0.333,
        unit: 'cup',
        unitPlural: 'cups',
        symbol: 'c',
        ingredient: 'confectioners’ sugar',
        minQty: 0.333,
        maxQty: 0.333,
      });
    });

    it('correctly removes unicode value from ingredient', () => {
      expect(parse('2 ½ cup confectioners’ sugar', 'eng')).to.deep.equal({
        quantity: 2.5,
        unit: 'cup',
        unitPlural: 'cups',
        symbol: 'c',
        ingredient: 'confectioners’ sugar',
        minQty: 2.5,
        maxQty: 2.5,
      });

      expect(parse('2½ cup confectioners’ sugar', 'eng')).to.deep.equal({
        quantity: 2.5,
        unit: 'cup',
        unitPlural: 'cups',
        symbol: 'c',
        ingredient: 'confectioners’ sugar',
        minQty: 2.5,
        maxQty: 2.5,
      });
    });
  });

  describe('translates the literal units', () => {
    it('of "1 cup water"', () => {
      expect(parse('1 cup water', 'eng').unit).to.equal('cup');
    });
    it('of "1 gallon water"', () => {
      expect(parse('1 gallon water', 'eng').unit).to.equal('gallon');
    });
    it('of "1 ounce water"', () => {
      expect(parse('1 ounce water', 'eng').unit).to.equal('ounce');
    });
    it('of "1 pint water"', () => {
      expect(parse('1 pint water', 'eng').unit).to.equal('pint');
    });
    it('of "1 pound water"', () => {
      expect(parse('1 pound water', 'eng').unit).to.equal('pound');
    });
    it('of "1 quart water"', () => {
      expect(parse('1 quart water', 'eng').unit).to.equal('quart');
    });
    it('of "1 tablespoon water"', () => {
      expect(parse('1 tablespoon water', 'eng').unit).to.equal('tablespoon');
    });
    it('of "1 teaspoon water"', () => {
      expect(parse('1 teaspoon water', 'eng').unit).to.equal('teaspoon');
    });
    it('of "1 gram water"', () => {
      expect(parse('1 gram water', 'eng').unit).to.equal('gram');
    });
    it('of "1 kilogram water"', () => {
      expect(parse('1 kilogram water', 'eng').unit).to.equal('kilogram');
    });
    it('of "1 liter water"', () => {
      expect(parse('1 liter water', 'eng').unit).to.equal('liter');
    });
    it('of "1 milligram water"', () => {
      expect(parse('1 milligram water', 'eng').unit).to.equal('milligram');
    });
    it('of "1 milliliter water"', () => {
      expect(parse('1 milliliter water', 'eng').unit).to.equal('milliliter');
    });
    it('of "1 large onion"', () => {
      expect(parse('1 large onion', 'eng').unit).to.equal('large');
    });
    it('of "1 whole onion"', () => {
      expect(parse('1 whole onion', 'eng').unit).to.equal(null);
    });
    it('of "1 clove garlic"', () => {
      expect(parse('1 clove garlic', 'eng').unit).to.equal('clove');
    });
    it('of "1 bag garlic"', () => {
      expect(parse('1 bag garlic', 'eng').unit).to.equal('bag');
    });
    it('of "1 package sausage"', () => {
      expect(parse('1 package sausage', 'eng').unit).to.equal('package');
    });
    it('"1 pinch water"', () => {
      expect(parse('1 pinch salt', 'eng').unit).to.equal('pinch');
    });
    it('"1 (14.5 oz) can tomatoes"', () => {
      expect(parse('1 (14.5 oz) can tomatoes', 'eng')).to.deep.equal({
        unit: 'can',
        unitPlural: 'cans',
        symbol: null,
        quantity: 1,
        ingredient: 'tomatoes (14.5 oz)',
        minQty: 1,
        maxQty: 1,
      });
    });
    it('"25 lb beef stew chunks (or buy a roast and chop into small cubes)"', () => {
      expect(
        parse(
          '25 lb beef stew chunks (or buy a roast and chop into small cubes)',
          'eng',
        ),
      ).to.deep.equal({
        unit: 'pound',
        unitPlural: 'pounds',
        symbol: 'lb',
        quantity: 25,
        ingredient:
          'beef stew chunks (or buy a roast and chop into small cubes)',
        minQty: 25,
        maxQty: 25,
      });
    });
    it('"parses ingredient with range: 1 to 2 chicken breasts"', () => {
      expect(parse('1 to 2 chicken breasts', 'eng')).to.deep.equal({
        unit: null,
        unitPlural: null,
        symbol: null,
        quantity: 1,
        ingredient: 'chicken breasts',
        minQty: 1,
        maxQty: 2,
      });
    });
    it('"parses ingredient with range: 1 - 2 chicken breasts"', () => {
      expect(parse('1 - 2 chicken breasts', 'eng')).to.deep.equal({
        unit: null,
        unitPlural: null,
        symbol: null,
        quantity: 1,
        ingredient: 'chicken breasts',
        minQty: 1,
        maxQty: 2,
      });
    });
    it('"parses ingredient with range: 1-2 chicken breasts"', () => {
      expect(parse('1-2 chicken breasts', 'eng')).to.deep.equal({
        unit: null,
        unitPlural: null,
        symbol: null,
        quantity: 1,
        ingredient: 'chicken breasts',
        minQty: 1,
        maxQty: 2,
      });
    });
    it('"1 (16 oz) box pasta"', () => {
      expect(parse('1 (16 oz) box pasta', 'eng')).to.deep.equal({
        unit: 'box',
        unitPlural: 'boxes',
        symbol: null,
        quantity: 1,
        ingredient: 'pasta (16 oz)',
        minQty: 1,
        maxQty: 1,
      });
    });
    it('"1 slice cheese"', () => {
      expect(parse('1 slice cheese', 'eng')).to.deep.equal({
        unit: 'slice',
        unitPlural: 'slices',
        symbol: null,
        quantity: 1,
        ingredient: 'cheese',
        minQty: 1,
        maxQty: 1,
      });
    });
  });

  it('translates unit when no unit provided', () => {
    expect(parse('1 tortilla', 'eng')).to.deep.equal({
      unit: null,
      unitPlural: null,
      symbol: null,
      ingredient: 'tortilla',
      quantity: 1,
      minQty: 1,
      maxQty: 1,
    });
  });

  it("doesn't explode when no unit and no quantity provided", () => {
    expect(parse('Powdered Sugar', 'eng')).to.deep.equal({
      ingredient: 'Powdered Sugar',
      quantity: 0,
      unit: null,
      unitPlural: null,
      symbol: null,
      minQty: 0,
      maxQty: 0,
    });
  });

  describe('translates the abbreviated units of', () => {
    it('"1 cup water"', () => {
      expect(parse('1 c water', 'eng').unit).to.equal('cup');
      expect(parse('2 c. water', 'eng').unit).to.equal('cup');
      expect(parse('2 cups water', 'eng').unit).to.equal('cup');
    });
    it('"1 gallon water"', () => {
      expect(parse('1 gal water', 'eng').unit).to.equal('gallon');
      expect(parse('1 gallons water', 'eng').unit).to.equal('gallon');
    });
    it('"1 ounce water"', () => {
      expect(parse('1 oz water', 'eng').unit).to.equal('ounce');
      expect(parse('1 oz. water', 'eng').unit).to.equal('ounce');
      expect(parse('2 ounces water', 'eng').unit).to.equal('ounce');
    });
    it('"1 pint water"', () => {
      expect(parse('1 pt water', 'eng').unit).to.equal('pint');
      expect(parse('2 pts water', 'eng').unit).to.equal('pint');
      expect(parse('1 pt. water', 'eng').unit).to.equal('pint');
      expect(parse('2 pints water', 'eng').unit).to.equal('pint');
    });
    it('"1 pound water"', () => {
      expect(parse('1 lb water', 'eng').unit).to.equal('pound');
      expect(parse('1 lb. water', 'eng').unit).to.equal('pound');
      expect(parse('2 lbs water', 'eng').unit).to.equal('pound');
      expect(parse('2 pounds water', 'eng').unit).to.equal('pound');
    });
    it('"1 quart water"', () => {
      expect(parse('1 qt water', 'eng').unit).to.equal('quart');
      expect(parse('1 qt. water', 'eng').unit).to.equal('quart');
      expect(parse('1 qts water', 'eng').unit).to.equal('quart');
      expect(parse('1 quarts water', 'eng').unit).to.equal('quart');
    });
    it('"1 tablespoon water"', () => {
      expect(parse('1 tbs water', 'eng').unit).to.equal('tablespoon');
      expect(parse('1 tbsp water', 'eng').unit).to.equal('tablespoon');
      expect(parse('1 tbspn water', 'eng').unit).to.equal('tablespoon');
      expect(parse('2 tablespoons water', 'eng').unit).to.equal('tablespoon');
      expect(parse('1 Tablespoon water', 'eng').unit).to.equal('tablespoon');
      expect(parse('2 Tablespoons water', 'eng').unit).to.equal('tablespoon');
    });
    it('"1 teaspoon water"', () => {
      expect(parse('1 tsp water', 'eng').unit).to.equal('teaspoon');
      expect(parse('1 tspn water', 'eng').unit).to.equal('teaspoon');
      expect(parse('1 t water', 'eng').unit).to.equal('teaspoon');
      expect(parse('1 t. water', 'eng').unit).to.equal('teaspoon');
      expect(parse('2 teaspoons water', 'eng').unit).to.equal('teaspoon');
    });
    it('"1 gram water"', () => {
      expect(parse('1 g water', 'eng').unit).to.equal('gram');
      expect(parse('1 g. water', 'eng').unit).to.equal('gram');
      expect(parse('2 grams water', 'eng').unit).to.equal('gram');
    });
    it('"1 kilogram water"', () => {
      expect(parse('1 kg water', 'eng').unit).to.equal('kilogram');
      expect(parse('1 kg. water', 'eng').unit).to.equal('kilogram');
      expect(parse('2 kilograms water', 'eng').unit).to.equal('kilogram');
    });
    it('"1 liter water"', () => {
      expect(parse('1 l water', 'eng').unit).to.equal('liter');
      expect(parse('1 l. water', 'eng').unit).to.equal('liter');
      expect(parse('2 liters water', 'eng').unit).to.equal('liter');
    });
    it('"1 milligram water"', () => {
      expect(parse('1 mg water', 'eng').unit).to.equal('milligram');
      expect(parse('1 mg. water', 'eng').unit).to.equal('milligram');
      expect(parse('1 milligrams water', 'eng').unit).to.equal('milligram');
    });
    it('"1 milliliter water"', () => {
      expect(parse('1 ml water', 'eng').unit).to.equal('milliliter');
      expect(parse('1 ml. water', 'eng').unit).to.equal('milliliter');
      expect(parse('1 milliliters water', 'eng').unit).to.equal('milliliter');
    });
    it('"1 pinch water"', () => {
      expect(parse('2 pinches salt', 'eng').unit).to.equal('pinch');
    });
  });

  describe('translates the ingredient of', () => {
    it('"1 teaspoon water"', () => {
      expect(parse('1 teaspoon of water', 'eng').ingredient).to.equal('water');
    });
    it('"1 teaspoon  milk"', () => {
      expect(parse('1 teaspoon of milk', 'eng').ingredient).to.equal('milk');
    });
    it('"1 teaspoon  of milk"', () => {
      expect(parse('1 teaspoon of milk', 'eng').ingredient).to.equal('milk');
    });
    it('"1 teaspoon  of milk"', () => {
      expect(parse('1 teaspoon of powdered sugar', 'eng').ingredient).to.equal(
        'powdered sugar',
      );
    });
  });
});
