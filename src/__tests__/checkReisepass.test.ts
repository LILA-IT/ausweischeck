import { checkReisepass } from '../index';

// Reisepassnummer von https://upload.wikimedia.org/wikipedia/commons/3/37/Mustermann_Reisepass_2017.jpg (2017 and later)
// Reisepassnummer von https://upload.wikimedia.org/wikipedia/commons/9/9e/Mustermann_Reisepass_2007.jpg (pre 2017)

describe('checkReisepass', () => {
  test('should return false if the number is too short', () => {
    expect(checkReisepass('123')).toMatchObject({
      result: false,
      error: 'Reispassnummer muss mindestens 11 Zeichen lang sein',
    });
  });

  test('should return false if the number is not valid', () => {
    expect(checkReisepass('C01X00T479D')).toMatchObject({
      result: false,
      error: 'Prüfsumme stimmt nicht überein',
    });
  });

  test('should return true if the number is valid (pre 2017)', () => {
    expect(checkReisepass('C01X0006H1D')).toMatchObject({
      result: true,
      ausweis: {
        nummer: 'C01X0006H',
        type: 'Reisepass',
      },
    });
  });

  test('should return true if the number is valid (2017 and later)', () => {
    expect(checkReisepass('C01X00T478D')).toMatchObject({
      result: true,
      ausweis: {
        nummer: 'C01X00T47',
        type: 'Reisepass',
      },
    });
  });
});
