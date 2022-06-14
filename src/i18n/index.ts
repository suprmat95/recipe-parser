import {LangDeu} from './lang.deu';
import {LangEng} from './lang.eng';
import {LangIta} from './lang.ita';

export type SupportedLanguages = 'eng' | 'ita' | 'deu';

export const i18nMap = {
  deu: LangDeu,
  eng: LangEng,
  ita: LangIta,
};
