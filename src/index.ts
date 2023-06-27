/* AusweisCheck has been created by Deniz Celebi in 2018 and modified by LILA.SCHULE GmbH in 2023
 *
 *  Version: 1.0.1
 *  Author: LILA.SCHULE GmbH, Deniz Celebi
 *
 *  Eine mini Library um Personalausweise oder Internationale Reisepässe auf // cspell:disable-line
 *  Echtheit zu überprüfen mit Hilfe der Seriennummer                        // cspell:disable-line
 *
 *  Just plain typescript lib to check the validity of German ID card and passport numbers
 *  with the help of the serial number.
 *
 *
 *  License: MIT
 */

import {
  AusweisCheckResult,
  AusweisType,
  Language,
  LanguageEnum,
} from "./types.js";

class AusweisCheck {
  private number: string;
  private language: Language;
  private alphas: Record<string, number>;

  constructor(ausweisNumber: string, language: Language = LanguageEnum.de) {
    this.number = ausweisNumber.toUpperCase();
    this.language = language;
    this.alphas = {
      "0": 0,
      "1": 1,
      "2": 2,
      "3": 3,
      "4": 4,
      "5": 5,
      "6": 6,
      "7": 7,
      "8": 8,
      "9": 9,
      A: 10,
      B: 11,
      C: 12,
      D: 13,
      E: 14,
      F: 15,
      G: 16,
      H: 17,
      I: 18,
      J: 19,
      K: 20,
      L: 21,
      M: 22,
      N: 23,
      O: 24,
      P: 25,
      Q: 26,
      R: 27,
      S: 28,
      T: 29,
      U: 30,
      V: 31,
      W: 32,
      X: 33,
      Y: 34,
      Z: 35,
    };
  }

  private checkSum(
    idNumber: string,
    checkDigit: number,
    type: AusweisType,
    nation?: string
  ): AusweisCheckResult {
    const arr = idNumber.split("");
    let iter = 7;
    const arrNumbers: number[] = [];
    let endDigits = 0;

    // Replace each character with the corresponding number and multiply it.
    for (const element of arr) {
      if (iter === 7) {
        const result = this.alphas[element] * iter;
        arrNumbers.push(result);
        iter = 3;
      } else if (iter === 3) {
        const result = this.alphas[element] * iter;
        arrNumbers.push(result);
        iter = 1;
      } else if (iter === 1) {
        const result = this.alphas[element] * iter;
        arrNumbers.push(result);
        iter = 7;
      }
    }

    // Add the last digits of the individual results
    for (let i = 0; i < 9; i++) {
      const val = String(arrNumbers[i]);
      const temp = val.substring(val.length - 1);
      endDigits += parseInt(temp, 10);
    }

    const end = endDigits % 10;
    if (end === checkDigit) {
      return {
        result: true,
        ausweis: {
          number: idNumber,
          type: type,
          nation: nation,
        },
      };
    } else {
      const error =
        this.language === LanguageEnum.de
          ? "Prüfsumme stimmt nicht überein" // cspell:disable-line
          : "Checksum does not match";
      return { result: false, error: error };
    }
  }

  get checkPerso(): AusweisCheckResult {
    // If entered identity card number has less than 10 characters cancel
    if (this.number.length < 10) {
      const error =
        this.language === LanguageEnum.de
          ? "Personalausweisnummer muss mindestens 10 Zeichen lang sein" // cspell:disable-line
          : "Identity card number must be at least 10 characters long";
      return {
        result: false,
        error: error,
      };
    }

    const checkDigit = parseInt(this.number.substring(9), 10);
    const persoNumber = this.number.substring(0, 9);
    return this.checkSum(persoNumber, checkDigit, AusweisType.EuId);
  }

  get checkReisepass(): AusweisCheckResult {
    // If entered passport number has less than 11 characters cancel
    if (this.number.length < 11) {
      const error =
        this.language === LanguageEnum.de
          ? "Reisepassnummer muss mindestens 11 Zeichen lang sein" // cspell:disable-line
          : "Passport number must be at least 11 characters long";
      return {
        result: false,
        error: error,
      };
    }

    const passNumber = this.number.substring(0, 9);
    const checkDigit = parseInt(this.number.charAt(9), 10);
    const nation = this.number.substring(10);

    return this.checkSum(passNumber, checkDigit, AusweisType.Passport, nation);
  }
}

export function checkPerso(
  idNumber: string,
  language?: Language
): AusweisCheckResult {
  return new AusweisCheck(idNumber, language).checkPerso;
}

export function checkReisepass(
  idNumber: string,
  language?: Language
): AusweisCheckResult {
  return new AusweisCheck(idNumber, language).checkReisepass;
}

// Renamed based on change to EU ID
export function checkEuId(idNumber: string): AusweisCheckResult {
  return new AusweisCheck(idNumber, "en").checkPerso;
}

export function checkGermanPassport(idNumber: string): AusweisCheckResult {
  return new AusweisCheck(idNumber, "en").checkReisepass;
}
