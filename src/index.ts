/* Ausweis Check Javascript Library
 *
 *  Version: 0.0.1
 *  Autor: Deniz Celebi
 *
 *  Eine mini Library um Personalausweise oder Internationale Reisepässe auf
 *  Echtheit zu überprüfen mit Hilfe der Seriennummer
 *
 *
 *  MIT License
 *
 *  Copyright 2018 Deniz Celebi / Pixelart
 *  Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"),
 *  to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software,
 *  and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 *  WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { AusweisCheckResult, AusweisType } from './types';

class AusweisCheck {
  private nummer: string;
  private alphas: { [key: string]: number };

  constructor(ausweisnummer: string) {
    this.nummer = ausweisnummer.toUpperCase();
    this.alphas = {
      '0': 0,
      '1': 1,
      '2': 2,
      '3': 3,
      '4': 4,
      '5': 5,
      '6': 6,
      '7': 7,
      '8': 8,
      '9': 9,
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

  get checkPerso(): AusweisCheckResult {
    // Wenn eingegebene Personummer weniger als 10 Zeichen hat abbrechen
    if (this.nummer.length < 10) {
      return { result: false, error: 'Personalausweisnummer muss mindestens 10 Zeichen lang sein' };
    }

    const prufziffer = parseInt(this.nummer.substring(9), 10);
    const personummer = this.nummer.substring(0, 9);
    const arr = personummer.split('');
    let iter = 7;
    const arrZahlen: number[] = [];
    let endziffern = 0;

    // Jedes  Zeichen mit der dazugehörigen Zahl ersetzten und multiplizieren
    for (const element of arr) {
      if (iter === 7) {
        const result = this.alphas[element] * iter;
        arrZahlen.push(result);
        iter = 3;
      } else if (iter === 3) {
        const result = this.alphas[element] * iter;
        arrZahlen.push(result);
        iter = 1;
      } else if (iter === 1) {
        const result = this.alphas[element] * iter;
        arrZahlen.push(result);
        iter = 7;
      }
    }

    // Die letzten Stellen der einzelnen Ergebnisse addieren
    for (let i = 0; i < 9; i++) {
      const val = String(arrZahlen[i]);
      const temp = val.substring(val.length - 1);
      endziffern += parseInt(temp, 10);
    }

    const ende = endziffern % 10;
    if (ende === prufziffer) {
      return {
        result: true,
        ausweis: {
          nummer: personummer,
          type: AusweisType.Personalausweis,
        },
      };
    } else {
      return { result: false, error: 'Prüfsumme stimmt nicht überein' };
    }
  }

  get checkReisepass(): AusweisCheckResult {
    // Wenn eingegebene Personummer weniger als 10 Zeichen hat abbrechen
    if (this.nummer.length < 11) {
      return { result: false, error: 'Reispassnummer muss mindestens 11 Zeichen lang sein' };
    }

    const passnummer = this.nummer.substring(0, 9);
    const prufziffer = parseInt(this.nummer.charAt(9), 10);
    const nation = this.nummer.substring(10);
    const arr = passnummer.split('');
    let iter = 7;
    const arrZahlen: number[] = [];
    let endziffern = 0;

    // Jedes  Zeichen mit der dazugehörigen Zahl ersetzten und multiplizieren
    for (const element of arr) {
      if (iter === 7) {
        const result = this.alphas[element] * iter;
        arrZahlen.push(result);
        iter = 3;
      } else if (iter === 3) {
        const result = this.alphas[element] * iter;
        arrZahlen.push(result);
        iter = 1;
      } else if (iter === 1) {
        const result = this.alphas[element] * iter;
        arrZahlen.push(result);
        iter = 7;
      }
    }

    // Die letzten Stellen der einzelnen Ergebnisse addieren
    for (let i = 0; i < 9; i++) {
      const val = String(arrZahlen[i]);
      const temp = val.substring(val.length - 1);
      endziffern += parseInt(temp, 10);
    }

    const ende = endziffern % 10;
    if (ende === prufziffer) {
      return {
        result: true,
        ausweis: {
          nummer: passnummer,
          type: AusweisType.Reisepass,
          nation,
        },
      };
    } else {
      return { result: false, error: 'Prüfsumme stimmt nicht überein' };
    }
  }
}

export function checkPerso(idNumber: string): AusweisCheckResult {
  return new AusweisCheck(idNumber).checkPerso;
}

export function checkReisepass(idNumber: string): AusweisCheckResult {
  return new AusweisCheck(idNumber).checkReisepass;
}
