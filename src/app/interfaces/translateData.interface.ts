export interface TranslateData {
  text: string,
  lang: string,
  isTranslateTextInput: boolean,
}

export interface TranslateDataRequest {
  text: string,
  sourceLanguageCode: string,
  targetLanguageCode: string,
}
