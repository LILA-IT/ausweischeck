export enum AusweisType {
  Personalausweis = 'Personalausweis',
  Reisepass = 'Reisepass',
}

export interface AusweisCheckResult {
  result: boolean;
  ausweis?: Ausweis;
  error?: string;
}

export interface Ausweis {
  nummer: string;
  type: AusweisType;
  nation?: string;
}
