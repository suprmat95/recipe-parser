import {expect} from 'chai';
import {parse} from '../src/index';

describe('recipe parser deu', () => {
  it('returns an object', () => {
    expect(typeof parse('1 tasse Wasser', 'deu')).to.equal('object');
  });

  describe('translates the quantity', () => {
    it('of "1 tealöffel wasser"', () => {
      expect(parse('1 teelöffel Wasser', 'deu').quantity).to.equal(1);
    });
    it('of "1,5 teelöffel Wasser"', () => {
      expect(parse('1,5 teelöffel Wasser', 'deu').quantity).to.equal(1.5);
    });
    it('of "1 1/2 teelöffel Wasser"', () => {
      expect(parse('1 1/2 teelöffel Wasser', 'deu').quantity).to.equal(1.5);
    });
    it('of "1/3 teelöffel Wasser"', () => {
      expect(parse('1/3 cup Wasser', 'deu').quantity).to.equal(0.333);
    });
    it('of "1/2 teelöffel Wasser"', () => {
      expect(parse('1/2 teelöffel Wasser', 'deu').quantity).to.equal(0.5);
    });
    it('of "10 1/2 teelöffel Wasser"', () => {
      expect(parse('10 1/2 teelöffel Wasser', 'deu').quantity).to.equal(10.5);
    });
    it('of "about 1/2 teelöffel Wasser"', () => {
      expect(parse('about 1/2 teelöffel Wasser', 'deu').quantity).to.equal(0.5);
    });

    describe('translates the quantity from string to number', () => {
      it('ein teelöffel Wasser"', () => {
        expect(parse('ein teelöffel Wasser', 'deu').quantity).to.equal(1);
      });

      it('ein teelöffel Wasser"', () => {
        expect(parse('eine teelöffel Wasser', 'deu').quantity).to.equal(1);
      });

      it('ein teelöffel Wasser"', () => {
        expect(parse('einen teelöffel Wasser', 'deu').quantity).to.equal(1);
      });
      it('zwanzig teelöffel Wasser"', () => {
        expect(parse('zwanzig teelöffel Wasser', 'deu').quantity).to.equal(20);
      });
      it('fünf teelöffel Wasser"', () => {
        expect(parse('fünf teelöffel Wasser', 'deu').quantity).to.equal(5);
      });
    });

    describe('translates the quantity range', () => {
      const expectation = {
        ingredient: 'Wasser',
        maxQty: 20,
        minQty: 10,
        quantity: 10,
        symbol: 'TL',
        unit: 'Teelöffel',
        unitPlural: 'Teelöffel',
      };
      it('of "10-20 teelöffel Wasser"', () => {
        expect(parse('10-20 teelöffel Wasser', 'deu')).to.deep.equal(
          expectation,
        );
      });
      it('of "10 - 20 teelöffel Wasser"', () => {
        expect(parse('10 - 20 teelöffel Wasser', 'deu')).to.deep.equal(
          expectation,
        );
      });
      it('of "10 to 20 teelöffel Wasser"', () => {
        expect(parse('10 bis 20 teelöffel Wasser', 'deu')).to.deep.equal(
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
          expect(parse(`${element} teelöffel Wasser`, 'deu').quantity).to.equal(
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
        '10⅖',
        '11⅗',
        '12⅘',
        '13⅙',
        '14⅚',
        '15⅛',
        '16⅜',
        '17⅝',
        '18⅞',
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
          expect(parse(`${element} teelöffel Wasser`, 'deu').quantity).to.equal(
            expectedAmount,
          );
        });
      }
    });

    it("doesn't freak out if a strange unicode character is present", () => {
      expect(parse('1/3 tasse confectioners’ zucker', 'deu')).to.deep.equal({
        quantity: 0.333,
        unit: 'Tasse',
        unitPlural: 'Tassen',
        symbol: null,
        ingredient: 'confectioners’ zucker',
        minQty: 0.333,
        maxQty: 0.333,
      });
    });
  });

  describe('translates the literal units', () => {
    it('of "1 tasse Wasser"', () => {
      expect(parse('1 tasse Wasser', 'deu').unit).to.equal('Tasse');
    });
    it('of "1 unze Wasser"', () => {
      expect(parse('1 unze Wasser', 'deu').unit).to.equal('Unze');
    });
    it('of "1 pfund Wasser"', () => {
      expect(parse('1 pfund Wasser', 'deu').unit).to.equal('Pfund');
    });
    it('of "1 esslöffel Wasser"', () => {
      expect(parse('1 esslöffel Wasser', 'deu').unit).to.equal('Esslöffel');
    });
    it('of "1 teelöffel Wasser"', () => {
      expect(parse('1 teelöffel Wasser', 'deu').unit).to.equal('Teelöffel');
    });
    it('of "1 gramm Wasser"', () => {
      expect(parse('1 gramm Wasser', 'deu').unit).to.equal('Gramm');
    });
    it('of "1 kilogramm Wasser"', () => {
      expect(parse('1 kilogramm Wasser', 'deu').unit).to.equal('Kilogramm');
    });
    it('of "1 liter Wasser"', () => {
      expect(parse('1 liter Wasser', 'deu').unit).to.equal('Liter');
    });
    it('of "1 milligramm Wasser"', () => {
      expect(parse('1 milligramm Wasser', 'deu').unit).to.equal('Milligramm');
    });
    it('of "1 milliliter Wasser"', () => {
      expect(parse('1 milliliter Wasser', 'deu').unit).to.equal('Milliliter');
    });
    it('of "1 packung Würst"', () => {
      expect(parse('1 packung Würst', 'deu').unit).to.equal('Pack');
    });
    it('"1 Prise Wasser"', () => {
      expect(parse('1 Prise salt', 'deu').unit).to.equal('Prise');
    });
    it('"1 (14.5 oz) dose tomatoes"', () => {
      expect(parse('1 (14.5 oz) dose tomatoes', 'deu')).to.deep.equal({
        unit: 'Dose',
        unitPlural: 'Dosen',
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
          'deu',
        ),
      ).to.deep.equal({
        unit: 'Pfund',
        unitPlural: 'Pfund',
        symbol: 'lb',
        quantity: 25,
        ingredient:
          'beef stew chunks (or buy a roast and chop into small cubes)',
        minQty: 25,
        maxQty: 25,
      });
    });
    it('"parses ingredient with range: 1 bis 2 Apfel"', () => {
      expect(parse('1 bis 2 Apfel', 'deu')).to.deep.equal({
        unit: null,
        unitPlural: null,
        symbol: null,
        quantity: 1,
        ingredient: 'Apfel',
        minQty: 1,
        maxQty: 2,
      });
    });
    it('"parses ingredient with range: 1 - 2 Apfel"', () => {
      expect(parse('1 - 2 Apfel', 'deu')).to.deep.equal({
        unit: null,
        unitPlural: null,
        symbol: null,
        quantity: 1,
        ingredient: 'Apfel',
        minQty: 1,
        maxQty: 2,
      });
    });
    it('"parses ingredient with range: 1-2 Apfel"', () => {
      expect(parse('1-2 Apfel', 'deu')).to.deep.equal({
        unit: null,
        unitPlural: null,
        symbol: null,
        quantity: 1,
        ingredient: 'Apfel',
        minQty: 1,
        maxQty: 2,
      });
    });
    it('"1 Stück Käse"', () => {
      expect(parse('1 Stück Käse', 'deu')).to.deep.equal({
        unit: 'Stück',
        unitPlural: 'Stücke',
        symbol: null,
        quantity: 1,
        ingredient: 'Käse',
        minQty: 1,
        maxQty: 1,
      });
    });
  });

  it('translates unit when no unit provided', () => {
    expect(parse('1 tortilla', 'deu')).to.deep.equal({
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
    expect(parse('Powdered Sugar', 'deu')).to.deep.equal({
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
    it('"1 unze Wasser"', () => {
      expect(parse('1 oz Wasser', 'deu').unit).to.equal('Unze');
      expect(parse('1 oz. Wasser', 'deu').unit).to.equal('Unze');
      expect(parse('2 unzen Wasser', 'deu').unit).to.equal('Unze');
    });
    it('"1 pfund Wasser"', () => {
      expect(parse('1 lb Wasser', 'deu').unit).to.equal('Pfund');
      expect(parse('1 lb. Wasser', 'deu').unit).to.equal('Pfund');
      expect(parse('2 lbs Wasser', 'deu').unit).to.equal('Pfund');
      expect(parse('2 pfund Wasser', 'deu').unit).to.equal('Pfund');
    });
    it('"1 esslöffel Öl"', () => {
      expect(parse('1 el Öl', 'deu').unit).to.equal('Esslöffel');
      expect(parse('1 EL Öl', 'deu').unit).to.equal('Esslöffel');
      expect(parse('1 El Öl', 'deu').unit).to.equal('Esslöffel');
      expect(parse('1 el. Öl', 'deu').unit).to.equal('Esslöffel');
      expect(parse('2 esslöffel Öl', 'deu').unit).to.equal('Esslöffel');
      expect(parse('1 esslöffel Öl', 'deu').unit).to.equal('Esslöffel');
    });
    it('"1 teelöffel Wasser"', () => {
      expect(parse('1 tl Wasser', 'deu').unit).to.equal('Teelöffel');
      expect(parse('1 tl. Wasser', 'deu').unit).to.equal('Teelöffel');
      expect(parse('1 TL Wasser', 'deu').unit).to.equal('Teelöffel');
      expect(parse('2 teelöffel Wasser', 'deu').unit).to.equal('Teelöffel');
    });
    it('"1 Gramm Wasser"', () => {
      expect(parse('1 g Wasser', 'deu').unit).to.equal('Gramm');
      expect(parse('1 g. Wasser', 'deu').unit).to.equal('Gramm');
      expect(parse('2 Gramm Wasser', 'deu').unit).to.equal('Gramm');
    });
    it('"1 Kilogramm Wasser"', () => {
      expect(parse('1 kg Wasser', 'deu').unit).to.equal('Kilogramm');
      expect(parse('1 kg. Wasser', 'deu').unit).to.equal('Kilogramm');
      expect(parse('2 Kilogramm Wasser', 'deu').unit).to.equal('Kilogramm');
    });
    it('"1 liter Wasser"', () => {
      expect(parse('1 l Wasser', 'deu').unit).to.equal('Liter');
      expect(parse('1 L. Wasser', 'deu').unit).to.equal('Liter');
      expect(parse('2 liter Wasser', 'deu').unit).to.equal('Liter');
    });
    it('"1 Milligramm Wasser"', () => {
      expect(parse('1 mg Wasser', 'deu').unit).to.equal('Milligramm');
      expect(parse('1 mg. Wasser', 'deu').unit).to.equal('Milligramm');
      expect(parse('1 Milligramm Wasser', 'deu').unit).to.equal('Milligramm');
    });
    it('"1 Milliliter Wasser"', () => {
      expect(parse('1 ml Wasser', 'deu').unit).to.equal('Milliliter');
      expect(parse('1 ml. Wasser', 'deu').unit).to.equal('Milliliter');
      expect(parse('1 Milliliter Wasser', 'deu').unit).to.equal('Milliliter');
    });
    it('"1 prise Salz"', () => {
      expect(parse('1 prise Salz', 'deu').unit).to.equal('Prise');
      expect(parse('2 prisen Salz', 'deu').unit).to.equal('Prise');
      expect(parse('2 prise/n Salz', 'deu').unit).to.equal('Prise');
      expect(parse('2 prise(n) Salz', 'deu').unit).to.equal('Prise');
    });
  });

  describe('translates the ingredient von', () => {
    it('"1 teelöffel Wasser"', () => {
      expect(parse('1 teelöffel von Wasser', 'deu').ingredient).to.equal(
        'Wasser',
      );
    });
    it('"1 teelöffel milk"', () => {
      expect(parse('1 teelöffel von milk', 'deu').ingredient).to.equal('milk');
    });
    it('"1 teelöffel von milk"', () => {
      expect(parse('1 teelöffel von milk', 'deu').ingredient).to.equal('milk');
    });
    it('"1 teelöffel von milk"', () => {
      expect(
        parse('1 teelöffel von powdered sugar', 'deu').ingredient,
      ).to.equal('powdered sugar');
    });
  });
});
