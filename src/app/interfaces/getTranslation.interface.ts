export interface GetTranslationInterface {
  translations: Array<TranslationItem>
}

export interface TranslationItem {
  detectedLanguageCode: string,
  text: string,
}
