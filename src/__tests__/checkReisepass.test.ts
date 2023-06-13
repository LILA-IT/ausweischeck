import { describe, expect, test } from "vitest";

import { checkReisepass } from "../index.js";

// Passport number from https://upload.wikimedia.org/wikipedia/commons/3/37/Mustermann_Reisepass_2017.jpg (2017 and later)
// Passport number from https://upload.wikimedia.org/wikipedia/commons/9/9e/Mustermann_Reisepass_2007.jpg (pre 2017)

describe("checkReisepass", () => {
  test("should return false if the number is too short (english version)", () => {
    expect(checkReisepass("123", "en")).toMatchObject({
      result: false,
      error: "Passport number must be at least 11 characters long",
    });
  });

  test("should return false if the number is not valid (english version)", () => {
    expect(checkReisepass("C01X00T479D", "en")).toMatchObject({
      result: false,
      error: "Checksum does not match",
    });
  });

  test("should return false if the number is too short (german version)", () => {
    expect(checkReisepass("123")).toMatchObject({
      result: false,
      error: "Reisepassnummer muss mindestens 11 Zeichen lang sein", // cspell:disable-line
    });
  });

  test("should return false if the number is not valid (german version)", () => {
    expect(checkReisepass("C01X00T479D")).toMatchObject({
      result: false,
      error: "Prüfsumme stimmt nicht überein", // cspell:disable-line
    });
  });

  test("should return true if the number is valid (pre 2017)", () => {
    expect(checkReisepass("C01X0006H1D")).toMatchObject({
      result: true,
      ausweis: {
        number: "C01X0006H",
        type: "Reisepass",
      },
    });
  });

  test("should return true if the number is valid (2017 and later)", () => {
    expect(checkReisepass("C01X00T478D")).toMatchObject({
      result: true,
      ausweis: {
        number: "C01X00T47",
        type: "Reisepass",
      },
    });
  });
});
