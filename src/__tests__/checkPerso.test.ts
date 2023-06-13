import { describe, expect, test } from "vitest";

import { checkPerso } from "../index.js";

// ID card number from https://upload.wikimedia.org/wikipedia/commons/f/f4/Personalausweis_%282021%29.png (2019 and later)
// ID card number from https://upload.wikimedia.org/wikipedia/commons/0/04/Muster_des_Personalausweises_RS.jpg (2010 - 2019)

describe("checkPerso", () => {
  test("should return false if the number is too short (english version)", () => {
    expect(checkPerso("123", "en")).toMatchObject({
      result: false,
      error: "Identity card number must be at least 10 characters long",
    });
  });

  test("should return false if the number is not valid (english version)", () => {
    expect(checkPerso("L01X00T472", "en")).toMatchObject({
      result: false,
      error: "Checksum does not match",
    });
  });

  test("should return false if the number is too short (german version)", () => {
    expect(checkPerso("123")).toMatchObject({
      result: false,
      error: "Personalausweisnummer muss mindestens 10 Zeichen lang sein", // cspell:disable-line
    });
  });

  test("should return false if the number is not valid (german version)", () => {
    expect(checkPerso("L01X00T472")).toMatchObject({
      result: false,
      error: "Prüfsumme stimmt nicht überein", // cspell:disable-line
    });
  });

  test("should return true if the number is valid (2010 - 2019)", () => {
    expect(checkPerso("T220001293")).toMatchObject({
      result: true,
      ausweis: {
        number: "T22000129",
        type: "Personalausweis",
      },
    });
  });

  test("should return true if the number is valid (2019 and later)", () => {
    expect(checkPerso("L01X00T471")).toMatchObject({
      result: true,
      ausweis: {
        number: "L01X00T47",
        type: "Personalausweis",
      },
    });
  });
});
