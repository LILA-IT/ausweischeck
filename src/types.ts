export enum AusweisType {
  Personalausweis = "Personalausweis",
  Reisepass = "Reisepass",
}

export enum LanguageEnum {
  de = "de",
  en = "en",
}

export type Language = keyof typeof LanguageEnum | LanguageEnum;

export interface AusweisCheckResult {
  result: boolean;
  ausweis?: Ausweis;
  error?: string;
}

export interface Ausweis {
  number: string;
  type: AusweisType;
  nation?: string;
}
