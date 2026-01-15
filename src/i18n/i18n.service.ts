import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

type TranslationNamespace = 'availability-pdf';

@Injectable()
export class I18nService {
  private translations: Map<string, any> = new Map();

  constructor() {
    this.loadTranslations();
  }

  private loadTranslations() {
    const localesPath = path.join(process.cwd(), 'src', 'i18n', 'locales');
    const languages = ['hy', 'ru'];
    const namespaces: TranslationNamespace[] = ['availability-pdf'];

    languages.forEach((lang) => {
      namespaces.forEach((namespace) => {
        const filePath = path.join(localesPath, lang, `${namespace}.json`);
        try {
          const content = fs.readFileSync(filePath, 'utf-8');
          const key = `${lang}:${namespace}`;
          this.translations.set(key, JSON.parse(content));
        } catch (error) {
          console.error(`Failed to load translation file: ${filePath}`, error);
        }
      });
    });
  }

  t(
    key: string,
    lang: string = 'hy',
    namespace: TranslationNamespace = 'availability-pdf',
  ): string {
    const translationKey = `${lang}:${namespace}`;
    const translations = this.translations.get(translationKey);

    if (!translations) {
      console.warn(`Translation not found for language: ${lang}, namespace: ${namespace}`);
      return key;
    }

    const value = translations[key];
    if (!value) {
      console.warn(`Translation key not found: ${key} in ${translationKey}`);
      return key;
    }

    return value;
  }

  getTranslations(
    lang: string = 'hy',
    namespace: TranslationNamespace = 'availability-pdf',
  ): any {
    const translationKey = `${lang}:${namespace}`;
    return this.translations.get(translationKey) || {};
  }
}
