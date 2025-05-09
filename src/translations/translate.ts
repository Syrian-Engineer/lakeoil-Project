export function translate(translations: Record<string, any>, lang: string, key: string) {
    return translations[lang]?.[key] ?? translations["en"]?.[key] ?? key;
}
  