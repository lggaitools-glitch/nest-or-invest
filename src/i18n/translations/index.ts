import { en } from './en';
import { ptBR } from './pt-BR';
import { es } from './es';
import type { Language, Translations } from '../types';

export const translations: Record<Language, Translations> = {
  en,
  'pt-BR': ptBR,
  es,
};

export { en, ptBR, es };
