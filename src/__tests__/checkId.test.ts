// REF: checkGermanId.test.ts
import { describe, expect, test } from "vitest";

import { checkGermanId } from "../index.js";

// ID card number from https://upload.wikimedia.org/wikipedia/commons/f/f4/Personalausweis_%282021%29.png (2019 and later)
// ID card number from https://upload.wikimedia.org/wikipedia/commons/0/04/Muster_des_Personalausweises_RS.jpg (2010 - 2019)

describe("checkGermanId", () => {
  test("should return false if the number is too short (only english version)", () => {
    expect(checkGermanId("123")).toMatchObject({
      result: false,
      error: "Identity card number must be at least 10 characters long",
    });
  });

  test("should return false if the number is not valid (only english version)", () => {
    expect(checkGermanId("L01X00T472")).toMatchObject({
      result: false,
      error: "Checksum does not match",
    });
  });

  test("should return true if the number is valid (2010 - 2019)", () => {
    expect(checkGermanId("T220001293")).toMatchObject({
      result: true,
      ausweis: {
        number: "T22000129",
        type: "Personalausweis",
      },
    });
  });

  test("should return true if the number is valid (2019 and later)", () => {
    expect(checkGermanId("L01X00T471")).toMatchObject({
      result: true,
      ausweis: {
        number: "L01X00T47",
        type: "Personalausweis",
      },
    });
  });
});
