// export function translate(translations: Record<string, any>, lang: string, key: string) {
//     return translations[lang]?.[key] ?? translations["en"]?.[key] ?? key;
// }
  


export function translate(
    translations: Record<string, any>,
    lang: string,
    key: string
  ): { text: string; className: string } {
    const fallbackLang = "en";
    const text = translations[lang]?.[key] ?? translations[fallbackLang]?.[key] ?? key;
    const className = lang === "ar" ? "font-cario" : "";
    return { text, className };
  }