import { expect } from "chai";

// use petra parser
import {
  petraParse as parse,
  petraMultiLineParse as multiLineParse,
} from "../../src/petra/petra-parser";

describe("split on separator", () => {
  it('"3-4 noci - quattro noci - quattro noci"', () => {
    expect(
      multiLineParse("12-3 noci - quattro noci - quattro noci", "ita")[0]
    ).to.deep.equal({
      unit: null,
      unitPlural: null,
      symbol: null,
      ingredient: "noci",
      quantity: 3,
      minQty: 3,
      maxQty: 3,
    });
  }),
    it('"INGREDIENTI per 4 persone - quattro noci - quattro noci"', () => {
      expect(
        multiLineParse(
          "INGREDIENTI per 4 persone - quattro noci - quattro noci",
          "ita"
        )[0]
      ).to.deep.equal({
        unit: null,
        unitPlural: null,
        symbol: null,
        ingredient: "noci",
        quantity: 4,
        minQty: 4,
        maxQty: 4,
      });
    }),
    it('"ingredienti per 4 persone - quattro noci - quattro noci"', () => {
      expect(
        multiLineParse(
          "ingredienti per 4 persone - quattro noci - quattro noci",
          "ita"
        )[0]
      ).to.deep.equal({
        unit: null,
        unitPlural: null,
        symbol: null,
        ingredient: "noci",
        quantity: 4,
        minQty: 4,
        maxQty: 4,
      });
    }),
    it('"- quattro noci - quattro noci"', () => {
      expect(
        multiLineParse("- quattro noci - quattro noci", "ita")[0]
      ).to.deep.equal({
        unit: null,
        unitPlural: null,
        symbol: null,
        ingredient: "noci",
        quantity: 4,
        minQty: 4,
        maxQty: 4,
      });
    }),
    it('"quattro noci - quattro noci e cinque mele"', () => {
      expect(
        multiLineParse("quattro noci - quattro noci e cinque mele", "ita")[2]
      ).to.deep.equal({
        unit: null,
        unitPlural: null,
        symbol: null,
        ingredient: "mele",
        quantity: 5,
        minQty: 5,
        maxQty: 5,
      });
    }),
    it('"quattro noci - quattro noci"', () => {
      expect(
        multiLineParse("quattro noci - quattro noci", "ita")[0]
      ).to.deep.equal({
        unit: null,
        unitPlural: null,
        symbol: null,
        ingredient: "noci",
        quantity: 4,
        minQty: 4,
        maxQty: 4,
      });
    }),
    it('"tre noci - 8 noci"', () => {
      expect(multiLineParse("tre noci - quattro noci", "ita")[0]).to.deep.equal(
        {
          unit: null,
          unitPlural: null,
          symbol: null,
          ingredient: "noci",
          quantity: 3,
          minQty: 3,
          maxQty: 3,
        }
      );
    });
  it('"👉 tre noci 👉 8 noci"', () => {
    expect(
      multiLineParse("👉 tre noci 👉 quattro noci", "ita")[0]
    ).to.deep.equal({
      unit: null,
      unitPlural: null,
      symbol: null,
      ingredient: "noci",
      quantity: 3,
      minQty: 3,
      maxQty: 3,
    });
  });
  it('"👉🏻 tre noci 👉 8 noci"', () => {
    expect(
      multiLineParse("👉🏻 tre noci 👉 quattro noci", "ita")[0]
    ).to.deep.equal({
      unit: null,
      unitPlural: null,
      symbol: null,
      ingredient: "noci",
      quantity: 3,
      minQty: 3,
      maxQty: 3,
    });
  });
});
describe("recipe parser ita", () => {
  it("returns an object", () => {
    expect(typeof parse("1 tazza acqua", "ita")).to.equal("object");
  });
  describe("translates the unit", () => {
    it('of "qb  di acqua"', () => {
      expect(parse("qb di acqua", "ita").unit).to.equal("q.b.");
      expect(parse("qb di acqua", "ita").quantity).to.equal(0);
    });
    it('of "quanto basta  acqua"', () => {
      expect(parse("quanto basta di acqua", "ita").unit).to.equal("q.b.");
    });
    it('of "Quanto basta  acqua"', () => {
      expect(parse("Quanto basta di acqua", "ita").unit).to.equal("q.b.");
    });
    it('of "Quanto Basta  acqua"', () => {
      expect(parse("Quanto Basta di acqua", "ita").unit).to.equal("q.b.");
    });
    it('of "q.b.   di farina"', () => {
      expect(parse("q.b. di farina", "ita").ingredient).to.equal("farina");
    });
    it('of "q.b.  di farina"', () => {
      expect(parse("q.b. di farina", "ita").unit).to.equal("q.b.");
    });
    it('of "q.b. farina"', () => {
      expect(parse("q.b. farina", "ita").ingredient).to.equal("farina");
    });
    it('of "grammi farina"', () => {
      expect(parse("grammi farina", "ita").unit).to.equal("grammo");
    });
    it('of "grammi  farina"', () => {
      expect(parse("grammi  farina", "ita").ingredient).to.equal("farina");
    });
    it('of "Q.B. di acqua"', () => {
      expect(parse("Q.B. di acqua", "ita").unit).to.equal("q.b.");
    });
    it('of "acqua quanto basta"', () => {
      expect(parse("acqua quanto basta", "ita").unit).to.equal("q.b.");
    });

    it('of "QB di acqua"', () => {
      expect(parse("QB di acqua", "ita").unit).to.equal("q.b.");
    });
    it('of "QB. di acqua"', () => {
      expect(parse("QB. di acqua", "ita").unit).to.equal("q.b.");
    });
    it('of "Q.B di acqua"', () => {
      expect(parse("Q.b di acqua", "ita").unit).to.equal("q.b.");
    });
    it('of "1 cucchiao acqua"', () => {
      expect(parse("1 cucchiao acqua", "ita").quantity).to.equal(1);
    });
    it('of "1.5 cucchiao acqua"', () => {
      expect(parse("1.5 cucchiao acqua", "ita").quantity).to.equal(1.5);
    });
    it('of "1 1/2 cucchiao acqua"', () => {
      expect(parse("1 1/2 cucchiao acqua", "ita").quantity).to.equal(1.5);
    });
    it('of "1/3 cucchiao acqua"', () => {
      expect(parse("1/3 cucchiao acqua", "ita").quantity).to.equal(0.33);
    });
    it('of "1/2 cucchiao acqua"', () => {
      expect(parse("1/2 cucchiao acqua", "ita").quantity).to.equal(0.5);
    });
    it('of "10 1/2 cucchiao acqua"', () => {
      expect(parse("10 1/2 cucchiao acqua", "ita").quantity).to.equal(10.5);
    });
    it('of "about 1/2 cucchiao acqua"', () => {
      expect(parse("about 1/2 cucchiao acqua", "ita").quantity).to.equal(0.5);
    });

    describe("translates the quantity from string to number", () => {
      it("Un cucchiaio d'acqua", () => {
        expect(parse("Un cucchiaio d'acqua", "ita").quantity).to.equal(1);
      });
      it("Un cucchiaio d'acqua", () => {
        expect(parse("Un cucchiaio d'acqua", "ita").quantity).to.equal(1);
      });
      it("mezzo cucchiaio d'acqua", () => {
        expect(parse("mezzo cucchiaio d'acqua", "ita").quantity).to.equal(0.5);
      });
      it("meta cucchiaio d'acqua", () => {
        expect(parse("meta cucchiaio d'acqua", "ita").quantity).to.equal(0.5);
      });
      it("Venti cucchiai d'acqua\"", () => {
        expect(parse("Venti cucchiai d'acqua", "ita").quantity).to.equal(20);
      });
      it("cinque cucchiai d'acqua\"", () => {
        expect(parse("cinque cucchiai d'acqua", "ita").quantity).to.equal(5);
      });
      it("ventuno cucchiai d'acqua\"", () => {
        expect(parse("ventuno cucchiai d'acqua", "ita").quantity).to.equal(21);
      });
      it("mezzo spicchio d'aglio\"", () => {
        expect(parse("mezzo spicchio d'aglio", "ita").quantity).to.equal(0.5);
      });
      it("cento grammi d'aglio\"", () => {
        expect(parse("cento grammi d'aglio", "ita").quantity).to.equal(100);
      });
      it("cento-due grammi d'aglio\"", () => {
        expect(parse("cento-due grammi d'aglio", "ita").quantity).to.equal(102);
      });
      it("due-cento grammi d'aglio\"", () => {
        expect(parse("due-cento grammi d'aglio", "ita").quantity).to.equal(200);
      });
      it("due-mila grammi d'aglio\"", () => {
        expect(parse("due-mila grammi d'aglio", "ita").quantity).to.equal(2000);
      });
      it('due grammi farina"', () => {
        expect(parse("due grammi farina", "ita").quantity).to.equal(2);
      });
    });

    //  describe('translates the quantity range', () => {
    //    it('of "10-20 cucchiao acqua"', () => {
    //      expect(parse('10-20 cucchiao acqua', 'ita').quantity).to.equal('10-20');
    //    });
    //    it('of "10 - 20 cucchiao acqua"', () => {
    //      expect(parse('10 - 20 cucchiao acqua', 'ita').quantity).to.equal('10-20');
    //    });
    //    it('of "10 to 20 cucchiao acqua"', () => {
    //      expect(parse('10 to 20 cucchiao acqua', 'ita').quantity).to.equal('10-20');
    //    });
    //  });

    describe("of unicode fractions", () => {
      const unicodeAmounts = [
        "¼",
        "½",
        "¾",
        "⅐",
        "⅑",
        "⅒",
        "⅓",
        "⅔",
        "⅕",
        "⅖",
        "⅗",
        "⅘",
        "⅙",
        "⅚",
        "⅛",
        "⅜",
        "⅝",
        "⅞",
      ];
      const unicodeExpectedAmounts = [
        0.25, 0.5, 0.75, 0.14, 0.11, 0.1, 0.33, 0.66, 0.2, 0.4, 0.6, 0.8, 0.16,
        0.83, 0.12, 0.37, 0.62, 0.87,
      ];

      for (let u = 0; u < unicodeAmounts.length; u++) {
        const element = unicodeAmounts[u];
        const expectedAmount = unicodeExpectedAmounts[u];
        it(`${element} to ${expectedAmount}`, () => {
          expect(parse(`${element} cucchiao acqua`, "ita").quantity).to.equal(
            expectedAmount
          );
        });
      }

      const mixedValues = [
        "1¼",
        "2½",
        "3¾",
        "4⅐",
        "5⅑",
        "6⅒",
        "7⅓",
        "8⅔",
        "9⅕",
        "10⅖",
        "11⅗",
        "12⅘",
        "13⅙",
        "14⅚",
        "15⅛",
        "16⅜",
        "17⅝",
        "18⅞",
      ];
      const mixedExpectedValues = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
      ];

      for (let u = 0; u < mixedValues.length; u++) {
        const element = mixedValues[u];
        const expectedAmount =
          Number(mixedExpectedValues[u]) + Number(unicodeExpectedAmounts[u]);
        it(`${element} to ${expectedAmount}`, () => {
          expect(parse(`${element} cucchiao acqua`, "ita").quantity).to.equal(
            expectedAmount
          );
        });
      }
    });

    it("doesn't freak out if a strange unicode character is present", () => {
      expect(parse("1/3 tazza zucchero a velo", "ita")).to.deep.equal({
        quantity: 0.33,
        unit: "tazza",
        unitPlural: "tazze",
        symbol: null,
        ingredient: "zucchero a velo",
        minQty: 0.33,
        maxQty: 0.33,
      });
    });
  });

  describe("translates the literal units", () => {
    it('of "1 tazza acqua"', () => {
      expect(parse("1 tazza acqua", "ita").unit).to.equal("tazza");
    });
    it('of "1 litro acqua"', () => {
      expect(parse("1 litro acqua", "ita").unit).to.equal("litro");
    });
    it('of "1 lt acqua"', () => {
      expect(parse("1 lt acqua", "ita").unit).to.equal("litro");
    });
    it('of "1 kg acqua"', () => {
      expect(parse("1 kg acqua", "ita").unit).to.equal("chilogrammo");
    });
    it('of "1 L acqua"', () => {
      expect(parse("1 L acqua", "ita").unit).to.equal("litro");
    });
    it('of "1 L. acqua"', () => {
      expect(parse("1 L. acqua", "ita").unit).to.equal("litro");
    });
    it('of "1 cucchiaio acqua"', () => {
      expect(parse("1 cucchiaio acqua", "ita").unit).to.equal("cucchiaio");
    });
    it('of "1 cucchiaio acqua"', () => {
      expect(parse("1 cucchiaio acqua", "ita").unit).to.equal("cucchiaio");
    });
    it('of "1 grammo acqua"', () => {
      expect(parse("1 grammo acqua", "ita").unit).to.equal("grammo");
    });
    it('of "1 chilogrammo acqua"', () => {
      expect(parse("1 chilogrammo acqua", "ita").unit).to.equal("chilogrammo");
    });
    it('of "1 litro acqua"', () => {
      expect(parse("1 litro acqua", "ita").unit).to.equal("litro");
    });
    it('of "1 milligrammo acqua"', () => {
      expect(parse("1 milligrammo acqua", "ita").unit).to.equal("milligrammo");
    });
    it('of "1 millilitro acqua"', () => {
      expect(parse("1 millilitro acqua", "ita").unit).to.equal("millilitro");
    });
    it('of "1 l cipolla"', () => {
      expect(parse("1 l cipolla", "ita").unit).to.equal("litro");
    });
    it('of "1 cipolla intera"', () => {
      expect(parse("1 cipolla intera", "ita").unit).to.equal(null);
    });
    it('of "1 spicchio agilio"', () => {
      expect(parse("1 spicchio  agilio", "ita").unit).to.equal("spicchio");
    });
    it('of "1 bustina aglio"', () => {
      expect(parse("1 bustina aglio", "ita").unit).to.equal("bustina");
    });
    it('of "1 pacco salsicce"', () => {
      expect(parse("1 pacco salsicce", "ita").unit).to.equal("pacco");
    });
    it('"1 pizzico sale"', () => {
      expect(parse("1 pizzico sale", "ita").unit).to.equal("pizzico");
    });
    it('"1 foglia prezzemolo"', () => {
      expect(parse("1 foglia prezzemolo", "ita").unit).to.equal("foglia");
    });
    it('"1 mazzetto prezzemolo"', () => {
      expect(parse("1 mazzetto prezzemolo", "ita").unit).to.equal("mazzetto");
    });
    it('"1 vasetto yogurt"', () => {
      expect(parse("1 vasetto yogurt", "ita").unit).to.equal("vasetto");
    });
    it('"1 (14.5 oz) lattina pommodori"', () => {
      expect(parse("1 (14.5 oz) lattina pommodori", "ita")).to.deep.equal({
        unit: "lattina",
        unitPlural: "lattine",
        symbol: null,
        quantity: 1,
        ingredient: "pommodori (14.5 oz)",
        minQty: 1,
        maxQty: 1,
      });
    });
    //  it('"parses ingredient with range: 1 to 2 petto di pollo"', () => {
    //    expect(parse('1 to 2 petto di pollo', 'ita')).to.deep.equal({
    //      unit: null,
    //      unitPlural: null,
    //      symbol: null,
    //      quantity: '1-2',
    //      ingredient: 'petto di pollo',
    //      minQty: '1',
    //      maxQty: '2',
    //    });
    //  });
    //  it('"parses ingredient with range: 1 - 2  petto di pollo"', () => {
    //    expect(parse('1 - 2 petto di pollo', 'ita')).to.deep.equal({
    //      unit: null,
    //      unitPlural: null,
    //      symbol: null,
    //      quantity: '1-2',
    //      ingredient: 'petto di pollo',
    //      minQty: '1',
    //      maxQty: '2',
    //    });
    //  });
    //  it('"parses ingredient with range: 1-2 petto di pollo"', () => {
    //    expect(parse('1-2 petto di pollo', 'ita')).to.deep.equal({
    //      unit: null,
    //      unitPlural: null,
    //      symbol: null,
    //      quantity: '1-2',
    //      ingredient: 'petto di pollo',
    //      minQty: 1,
    //      maxQty: 2,
    //    });
    //  });
    it('"1 (16 oz) scatola pasta"', () => {
      expect(parse("1 (16 oz) scatola pasta", "ita")).to.deep.equal({
        unit: "scatola",
        unitPlural: "scatole",
        symbol: null,
        quantity: 1,
        ingredient: "pasta (16 oz)",
        minQty: 1,
        maxQty: 1,
      });
    });
    it('"1 fetta di formaggio"', () => {
      expect(parse("1 fetta di formaggio", "ita")).to.deep.equal({
        unit: "fetta",
        unitPlural: "fette",
        quantity: 1,
        symbol: null,
        ingredient: "formaggio",
        minQty: 1,
        maxQty: 1,
      });
    });
    it('"1 spicchio d\'aglio"', () => {
      expect(parse("1 spicchio d'aglio", "ita")).to.deep.equal({
        unit: "spicchio",
        unitPlural: "spicchi",
        quantity: 1,
        symbol: null,
        ingredient: "aglio",
        minQty: 1,
        maxQty: 1,
      });
    });
    describe('" check the correct symbol"', () => {
      it('"grammi di farina"', () => {
        expect(parse("grammi di farina", "ita")).to.deep.equal({
          unit: "grammo",
          unitPlural: "grammi",
          quantity: 0,
          symbol: "g",
          ingredient: "farina",
          minQty: 0,
          maxQty: 0,
        });
      });
      it('"100 grammi di farina"', () => {
        expect(parse("100 grammi di farina", "ita")).to.deep.equal({
          unit: "grammo",
          unitPlural: "grammi",
          quantity: 100,
          symbol: "g",
          ingredient: "farina",
          minQty: 100,
          maxQty: 100,
        });
      });
      it('"1 spicchio d\'aglio"', () => {
        expect(parse("1 spicchio d'aglio", "ita")).to.deep.equal({
          unit: "spicchio",
          unitPlural: "spicchi",
          quantity: 1,
          symbol: null,
          ingredient: "aglio",
          minQty: 1,
          maxQty: 1,
        });
      });
      it('"1 kilogrammo d\'aglio"', () => {
        expect(parse("1 kilogrammo d'aglio", "ita")).to.deep.equal({
          unit: "chilogrammo",
          unitPlural: "chilogrammi",
          quantity: 1,
          symbol: "kg",
          ingredient: "aglio",
          minQty: 1,
          maxQty: 1,
        });
      });
      it('"1 cucchiaino riso"', () => {
        expect(parse("1 cucchiaino riso", "ita")).to.deep.equal({
          unit: "cucchiaino",
          unitPlural: "cucchiaini",
          quantity: 1,
          symbol: "cc",
          ingredient: "riso",
          minQty: 1,
          maxQty: 1,
        });
      });
      it('"100 litri di latte"', () => {
        expect(parse("100 litri di latte", "ita")).to.deep.equal({
          unit: "litro",
          unitPlural: "litri",
          quantity: 100,
          symbol: "lt",
          ingredient: "latte",
          minQty: 100,
          maxQty: 100,
        });
      });
      it('"100 milligrammi di olio"', () => {
        expect(parse("100 milligrammi di olio", "ita")).to.deep.equal({
          unit: "milligrammo",
          unitPlural: "milligrammi",
          quantity: 100,
          symbol: "mg",
          ingredient: "olio",
          minQty: 100,
          maxQty: 100,
        });
      });
      it('"100 rotoli di olio"', () => {
        expect(parse("100 rotoli di olio", "ita")).to.deep.equal({
          unit: "rotolo",
          unitPlural: "rotoli",
          quantity: 100,
          symbol: null,
          ingredient: "olio",
          minQty: 100,
          maxQty: 100,
        });
      });
      it('"100 bicchierini di olio"', () => {
        expect(parse("100 bicchierino di olio", "ita")).to.deep.equal({
          unit: "bicchierino",
          unitPlural: "bicchierini",
          quantity: 100,
          symbol: null,
          ingredient: "olio",
          minQty: 100,
          maxQty: 100,
        });
      });
      it('"Un filo d\'olio"', () => {
        expect(parse("Un filo d'olio", "ita")).to.deep.equal({
          unit: "filo",
          unitPlural: "fili",
          quantity: 1,
          symbol: null,
          ingredient: "olio",
          minQty: 1,
          maxQty: 1,
        });
      });
      it('"Un ciuffo di prezzemolo"', () => {
        expect(parse("Un ciuffo di prezzemolo", "ita")).to.deep.equal({
          unit: "ciuffo",
          unitPlural: "ciuffi",
          quantity: 1,
          symbol: null,
          ingredient: "prezzemolo",
          minQty: 1,
          maxQty: 1,
        });
      });
      it('"100 millilitri di latte"', () => {
        expect(parse("100 millilitri di latte", "ita")).to.deep.equal({
          unit: "millilitro",
          unitPlural: "millilitri",
          quantity: 100,
          symbol: "ml",
          ingredient: "latte",
          minQty: 100,
          maxQty: 100,
        });
      });
      it('"quanto basta  di latte"', () => {
        expect(parse("quanto basta  di latte", "ita")).to.deep.equal({
          unit: "q.b.",
          unitPlural: "q.b.",
          quantity: 0,
          symbol: null,
          ingredient: "latte",
          minQty: 0,
          maxQty: 0,
        });
      });
      it('"Quanto Basta  di latte"', () => {
        expect(parse("quanto basta  di latte", "ita")).to.deep.equal({
          unit: "q.b.",
          unitPlural: "q.b.",
          quantity: 0,
          symbol: null,
          ingredient: "latte",
          minQty: 0,
          maxQty: 0,
        });
      });
      it('"qb  di latte"', () => {
        expect(parse("quanto basta  di latte", "ita")).to.deep.equal({
          unit: "q.b.",
          unitPlural: "q.b.",
          quantity: 0,
          symbol: null,
          ingredient: "latte",
          minQty: 0,
          maxQty: 0,
        });
      });
      it('"q.b. di latte"', () => {
        expect(parse("q.b.  di latte", "ita")).to.deep.equal({
          unit: "q.b.",
          unitPlural: "q.b.",
          quantity: 0,
          symbol: null,
          ingredient: "latte",
          minQty: 0,
          maxQty: 0,
        });
      });
      it('"q.b. latte"', () => {
        expect(parse("q.b.  latte", "ita")).to.deep.equal({
          unit: "q.b.",
          unitPlural: "q.b.",
          quantity: 0,
          symbol: null,
          ingredient: "latte",
          minQty: 0,
          maxQty: 0,
        });
      });
    });
  });

  it("translates unit when no unit provided", () => {
    expect(parse("1 tortilla", "ita")).to.deep.equal({
      unit: null,
      unitPlural: null,
      symbol: null,
      ingredient: "tortilla",
      quantity: 1,
      minQty: 1,
      maxQty: 1,
    });
  });
  it("test order and case sensitive", () => {
    expect(parse("100 ml. tortilla ", "ita")).to.deep.equal({
      unit: "millilitro",
      unitPlural: "millilitri",
      symbol: "ml",
      ingredient: "tortilla",
      quantity: 100,
      minQty: 100,
      maxQty: 100,
    });
    expect(parse("100 mg. tortilla ", "ita")).to.deep.equal({
      unit: "milligrammo",
      unitPlural: "milligrammi",
      symbol: "mg",
      ingredient: "tortilla",
      quantity: 100,
      minQty: 100,
      maxQty: 100,
    });
    expect(parse("100 g. tortilla ", "ita")).to.deep.equal({
      unit: "grammo",
      unitPlural: "grammi",
      symbol: "g",
      ingredient: "tortilla",
      quantity: 100,
      minQty: 100,
      maxQty: 100,
    });
    expect(parse("1 g. d' acqua", "ita")).to.deep.equal({
      unit: "grammo",
      unitPlural: "grammi",
      symbol: "g",
      ingredient: "acqua",
      quantity: 1,
      minQty: 1,
      maxQty: 1,
    });
    expect(parse("100 g. di tortilla ", "ita")).to.deep.equal({
      unit: "grammo",
      unitPlural: "grammi",
      symbol: "g",
      ingredient: "tortilla",
      quantity: 100,
      minQty: 100,
      maxQty: 100,
    });
    expect(parse("100 G. di tortilla ", "ita")).to.deep.equal({
      unit: "grammo",
      unitPlural: "grammi",
      symbol: "g",
      ingredient: "tortilla",
      quantity: 100,
      minQty: 100,
      maxQty: 100,
    });
    expect(parse("100 G di tortilla ", "ita")).to.deep.equal({
      unit: "grammo",
      unitPlural: "grammi",
      symbol: "g",
      ingredient: "tortilla",
      quantity: 100,
      minQty: 100,
      maxQty: 100,
    });
    expect(parse("q.b. di sale", "ita")).to.deep.equal({
      unit: "q.b.",
      unitPlural: "q.b.",
      symbol: null,
      ingredient: "sale",
      quantity: 0,
      minQty: 0,
      maxQty: 0,
    });
    expect(parse("100 gr. tortilla ", "ita")).to.deep.equal({
      unit: "grammo",
      unitPlural: "grammi",
      symbol: "g",
      ingredient: "tortilla",
      quantity: 100,
      minQty: 100,
      maxQty: 100,
    });
    expect(parse("tortilla 100 gr", "ita")).to.deep.equal({
      unit: "grammo",
      unitPlural: "grammi",
      symbol: "g",
      ingredient: "tortilla",
      quantity: 100,
      minQty: 100,
      maxQty: 100,
    });
    expect(parse("basilico quanto basta", "ita")).to.deep.equal({
      unit: "q.b.",
      unitPlural: "q.b.",
      symbol: null,
      ingredient: "basilico",
      quantity: 0,
      minQty: 0,
      maxQty: 0,
    });
    expect(parse("basilico q.b.", "ita")).to.deep.equal({
      unit: "q.b.",
      unitPlural: "q.b.",
      symbol: null,
      ingredient: "basilico",
      quantity: 0,
      minQty: 0,
      maxQty: 0,
    });
    expect(parse("basilico QB", "ita")).to.deep.equal({
      unit: "q.b.",
      unitPlural: "q.b.",
      symbol: null,
      ingredient: "basilico",
      quantity: 0,
      minQty: 0,
      maxQty: 0,
    });
    expect(parse("basilico millilitri 100", "ita")).to.deep.equal({
      unit: "millilitro",
      unitPlural: "millilitri",
      symbol: "ml",
      ingredient: "basilico",
      quantity: 100,
      minQty: 100,
      maxQty: 100,
    });
  });
  it("doesn't explode when no unit and no quantity provided", () => {
    expect(parse("zucchero a velo", "ita")).to.deep.equal({
      unit: "q.b.",
      unitPlural: "q.b.",
      symbol: null,
      ingredient: "zucchero a velo",
      quantity: 0,
      minQty: 0,
      maxQty: 0,
    });
  });
  it("test noci", () => {
    expect(parse("quattro noci", "ita")).to.deep.equal({
      unit: null,
      unitPlural: null,
      symbol: null,
      ingredient: "noci",
      quantity: 4,
      minQty: 4,
      maxQty: 4,
    });
    expect(parse("una noce", "ita")).to.deep.equal({
      unit: null,
      unitPlural: null,
      symbol: null,
      ingredient: "noce",
      quantity: 1,
      minQty: 1,
      maxQty: 1,
    });
    expect(parse("100 gr di noci", "ita")).to.deep.equal({
      unit: "grammo",
      unitPlural: "grammi",
      symbol: "g",
      ingredient: "noci",
      quantity: 100,
      minQty: 100,
      maxQty: 100,
    });
  });
  describe("translates the abbreviated units of", () => {
    it('"1 tazza acqua"', () => {
      expect(parse("1 tazza acqua", "ita").unit).to.equal("tazza");
      expect(parse("2 tazzine acqua", "ita").unit).to.equal("tazza");
      expect(parse("2 tazze acqua", "ita").unit).to.equal("tazza");
    });
    it('"1 litro acqua"', () => {
      expect(parse("1 l acqua", "ita").unit).to.equal("litro");
      expect(parse("1 litri acqua", "ita").unit).to.equal("litro");
    });
    it('"1 grammo acqua"', () => {
      expect(parse("1 gr acqua", "ita").unit).to.equal("grammo");
      expect(parse("2 g acqua", "ita").unit).to.equal("grammo");
      expect(parse("2 g. acqua", "ita").ingredient).to.equal("acqua");
    });
    it('"1 chilogrammo acqua"', () => {
      expect(parse("1 kg acqua", "ita").unit).to.equal("chilogrammo");
      expect(parse("2 KG acqua", "ita").unit).to.equal("chilogrammo");
      expect(parse("1 kilogrammo acqua", "ita").unit).to.equal("chilogrammo");
      expect(parse("2 Kilogrammo acqua", "ita").unit).to.equal("chilogrammo");
      expect(parse("acqua KILOGRAMMO 2", "ita").unit).to.equal("chilogrammo");
      expect(parse("acqua KILOGRAMMO due", "ita").unit).to.equal("chilogrammo");
    });
    it('"1 tazza acqua"', () => {
      expect(parse("1 tazza acqua", "ita").unit).to.equal("tazza");
      expect(parse("1 tazzina acqua", "ita").unit).to.equal("tazza");
      expect(parse("2 tazzine acqua", "ita").unit).to.equal("tazza");
      expect(parse("2 Tazza acqua", "ita").unit).to.equal("tazza");
    });
    it('"1 millilitro acqua"', () => {
      expect(parse("1 ml acqua", "ita").unit).to.equal("millilitro");
      expect(parse("1 ml. acqua", "ita").unit).to.equal("millilitro");
      expect(parse("1 millilitro acqua", "ita").unit).to.equal("millilitro");
      expect(parse("1 Millilitro acqua", "ita").unit).to.equal("millilitro");
    });
    it('"1 cucchiaio acqua"', () => {
      expect(parse("2 cucchiai acqua", "ita").unit).to.equal("cucchiaio");
      expect(parse("1 Cucchiaio acqua", "ita").unit).to.equal("cucchiaio");
      expect(parse("2 cucchiai acqua", "ita").unit).to.equal("cucchiaio");
    });
    it('"1 cucchiaino acqua"', () => {
      expect(parse("1 Cucchiaino acqua", "ita").unit).to.equal("cucchiaino");
      expect(parse("1 cucchiaino acqua", "ita").unit).to.equal("cucchiaino");
      expect(parse("2 Cucchiaini acqua", "ita").unit).to.equal("cucchiaino");
      expect(parse("2 cucchiaini acqua", "ita").unit).to.equal("cucchiaino");
    });
    it('"1 grammo acqua"', () => {
      expect(parse("1 g acqua", "ita").unit).to.equal("grammo");
      expect(parse("1 g. acqua", "ita").unit).to.equal("grammo");
      expect(parse("2 grammi acqua", "ita").unit).to.equal("grammo");
    });
    it('"1 chilogrammo acqua"', () => {
      expect(parse("1 kg acqua", "ita").unit).to.equal("chilogrammo");
      expect(parse("1 kg. acqua", "ita").unit).to.equal("chilogrammo");
      expect(parse("2 chilogrammi acqua", "ita").unit).to.equal("chilogrammo");
    });
    it('"1 litro acqua"', () => {
      expect(parse("1 l acqua", "ita").unit).to.equal("litro");
      expect(parse("1 l. acqua", "ita").unit).to.equal("litro");
      expect(parse("2 litri acqua", "ita").unit).to.equal("litro");
    });
    it('"1 milligrammo acqua"', () => {
      expect(parse("1 mg acqua", "ita").unit).to.equal("milligrammo");
      expect(parse("1 mg. acqua", "ita").unit).to.equal("milligrammo");
      expect(parse("1 milligrammo acqua", "ita").unit).to.equal("milligrammo");
    });
    it('"1 millilitro acqua"', () => {
      expect(parse("1 ml acqua", "ita").unit).to.equal("millilitro");
      expect(parse("1 ml. acqua", "ita").unit).to.equal("millilitro");
      expect(parse("1 millilitro acqua", "ita").unit).to.equal("millilitro");
    });
    it('"1 pizzico acqua"', () => {
      expect(parse("2 pizzichi sale", "ita").unit).to.equal("pizzico");
    });
    it('"1 cubetto di ghiaccio"', () => {
      expect(parse("2 cubetto di ghiaccio", "ita").unit).to.equal("cubetto");
    });
  });

  describe("translates the ingredient of", () => {
    it('"1 cucchiaio d\'acqua"', () => {
      expect(parse("1 cucchiaio d'acqua", "ita").ingredient).to.equal("acqua");
    });
    it('"1 spicchio d\'aglio"', () => {
      expect(parse("1 cucchiaio d'acqua", "ita").ingredient).to.equal("acqua");
    });
    it('"1 cucchiaio di latte"', () => {
      expect(parse("1 cucchiaio di latte", "ita").ingredient).to.equal("latte");
    });
    it('"1 cucchiaio acqua"', () => {
      expect(parse("1 cucchiaio acqua", "ita").ingredient).to.equal("acqua");
    });
    it('"1 cucchiaio latte"', () => {
      expect(parse("1 cucchiaio latte", "ita").ingredient).to.equal("latte");
    });
  });

  describe("translates the ingredient of", () => {
    it('"1 g di latte"', () => {
      expect(parse("1 g di  latte", "ita").ingredient).to.equal("latte");
    });
    it('"1 kg di latte"', () => {
      expect(parse("1 kg di  latte", "ita").ingredient).to.equal("latte");
    });
    it('"250 kg di farina"', () => {
      expect(parse("250 kg di farina", "ita").ingredient).to.equal("farina");
    });
    it('"dieci kg  farina"', () => {
      expect(parse("dieci kg farina", "ita").ingredient).to.equal("farina");
    });
    it('"dieci kg farina"', () => {
      expect(parse("dieci kg farina", "ita").ingredient).to.equal("farina");
    });
    it('"3 g spaghetti"', () => {
      expect(parse("3 g spaghetti", "ita").ingredient).to.equal("spaghetti");
    });
    it('"3 mg spamghetti"', () => {
      expect(parse("3 mg spamghetti", "ita").ingredient).to.equal("spamghetti");
    });
  });
  describe("translates q.b. without quantity of", () => {
    it('"latte"', () => {
      expect(parse("latte", "ita").unit).to.equal("q.b.");
    });
    it('"farina"', () => {
      expect(parse("farina", "ita").unit).to.equal("q.b.");
    });
    it('"250 kg di farina"', () => {
      expect(parse("250 kg di farina", "ita").quantity).to.equal(250);
    });
  });
  describe("translates bug with g", () => {
    it('"sgombro 300 g"', () => {
      expect(parse("sgombro 300 g", "ita").ingredient).to.equal("sgombro");
    });
    it('"lamle 300 ml"', () => {
      expect(parse("lamle 300 ml", "ita").ingredient).to.equal("lamle");
    });
    it('"lamge 300 mg"', () => {
      expect(parse("lamge 300 mg", "ita").ingredient).to.equal("lamge");
    });
    it('"lamge 1/3 mg"', () => {
      expect(parse("lamge 1/3  mg", "ita").quantity).to.equal(0.33);
    });
    it('"guanciale 100 g"', () => {
      expect(parse("guanciale 100 g", "ita").ingredient).to.equal("guanciale");
    });
    it('"Guanciale 100 g"', () => {
      expect(parse("Guanciale 100 g", "ita").ingredient).to.equal("guanciale");
    });
    it('"cuangiale 100 g"', () => {
      expect(parse("cuangiale 100 g", "ita").ingredient).to.equal("cuangiale");
    });
  });
});

describe('handles special "Farina" and "Petra" numeric references in real-world examples', () => {
  it('parses "farina petra 8610 500g" correctly', () => {
    expect(parse("farina petra 8610 500 g", "ita")).to.deep.equal({
      quantity: 500,
      unit: "grammo",
      unitPlural: "grammi",
      symbol: "g",
      ingredient: "farina petra 8610",
      minQty: 500,
      maxQty: 500,
    });
  });

  it('parses "farina petra 00 1kg" correctly', () => {
    expect(parse("farina petra 00 1 kg", "ita")).to.deep.equal({
      quantity: 1,
      unit: "chilogrammo",
      unitPlural: "chilogrammi",
      symbol: "kg",
      ingredient: "farina petra 00",
      minQty: 1,
      maxQty: 1,
    });
  });

  it('parses "petra 0 3 cucchiai" correctly', () => {
    expect(parse("petra 0 3 cucchiai", "ita")).to.deep.equal({
      quantity: 3,
      unit: "cucchiaio",
      unitPlural: "cucchiai",
      symbol: null,
      ingredient: "petra 0",
      minQty: 3,
      maxQty: 3,
    });
  });

  it('parses "petra 9 250ml" correctly', () => {
    expect(parse("petra 9 250 ml", "ita")).to.deep.equal({
      quantity: 250,
      unit: "millilitro",
      unitPlural: "millilitri",
      symbol: "ml",
      ingredient: "petra 9",
      minQty: 250,
      maxQty: 250,
    });
  });

  it('parses "farina petra 1 100g" correctly', () => {
    expect(parse("farina petra 1 100 g", "ita")).to.deep.equal({
      quantity: 100,
      unit: "grammo",
      unitPlural: "grammi",
      symbol: "g",
      ingredient: "farina petra 1",
      minQty: 100,
      maxQty: 100,
    });
  });

  it('parses "petra 8610 2 barattoli" correctly', () => {
    expect(parse("petra 8610 2 barattoli", "ita")).to.deep.equal({
      quantity: 2,
      unit: "barattolo",
      unitPlural: "barattoli",
      symbol: null,
      ingredient: "petra 8610",
      minQty: 2,
      maxQty: 2,
    });
  });

  it('parses "farina petra 00 750g" correctly', () => {
    expect(parse("farina petra 00 750 g", "ita")).to.deep.equal({
      quantity: 750,
      unit: "grammo",
      unitPlural: "grammi",
      symbol: "g",
      ingredient: "farina petra 00",
      minQty: 750,
      maxQty: 750,
    });
  });

  it('parses "petra 00 4 pezzi" correctly', () => {
    expect(parse("petra 00 4 pezzi", "ita")).to.deep.equal({
      quantity: 4,
      unit: "pezzo",
      unitPlural: "pezzi",
      symbol: null,
      ingredient: "petra 00",
      minQty: 4,
      maxQty: 4,
    });
  });

  it('parses "farina petra 9 5 litri" correctly', () => {
    expect(parse("farina petra 9 5 litri", "ita")).to.deep.equal({
      quantity: 5,
      unit: "litro",
      unitPlural: "litri",
      symbol: "lt",
      ingredient: "farina petra 9",
      minQty: 5,
      maxQty: 5,
    });
  });

  it('parses "petra 1 20g" correctly', () => {
    expect(parse("petra 1 20 g", "ita")).to.deep.equal({
      quantity: 20,
      unit: "grammo",
      unitPlural: "grammi",
      symbol: "g",
      ingredient: "petra 1",
      minQty: 20,
      maxQty: 20,
    });
  });
});
