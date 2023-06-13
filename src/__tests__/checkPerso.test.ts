import { checkPerso } from '../index';

// Ausweisnummer von https://upload.wikimedia.org/wikipedia/commons/f/f4/Personalausweis_%282021%29.png (2019 and later)
// Ausweisnummer von https://upload.wikimedia.org/wikipedia/commons/0/04/Muster_des_Personalausweises_RS.jpg (2010 - 2019)

describe('checkPerso', () => {
  test('should return false if the number is too short', () => {
    expect(checkPerso('123')).toMatchObject({
      result: false,
      error: 'Personalausweisnummer muss mindestens 10 Zeichen lang sein',
    });
  });

  test('should return false if the number is not valid', () => {
    expect(checkPerso('L01X00T472')).toMatchObject({
      result: false,
      error: 'Prüfsumme stimmt nicht überein',
    });
  });

  test('should return true if the number is valid (2010 - 2019)', () => {
    expect(checkPerso('T220001293')).toMatchObject({
      result: true,
      ausweis: {
        nummer: 'T22000129',
        type: 'Personalausweis',
      },
    });
  });

  test('should return true if the number is valid (2019 and later)', () => {
    expect(checkPerso('L01X00T471')).toMatchObject({
      result: true,
      ausweis: {
        nummer: 'L01X00T47',
        type: 'Personalausweis',
      },
    });
  });
});
