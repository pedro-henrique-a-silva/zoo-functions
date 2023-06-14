const getOpeningHours = require('../src/getOpeningHours');

describe('Testes da função getOpeningHours', () => {
  //   Teste não passando argumentos. Deverá retornar o objeto:

  it('Se recebe o retorno esperado caso não receba nenhum parametro', () => {
    const expected = {
      Tuesday: { open: 8, close: 6 },
      Wednesday: { open: 8, close: 6 },
      Thursday: { open: 10, close: 8 },
      Friday: { open: 10, close: 8 },
      Saturday: { open: 8, close: 10 },
      Sunday: { open: 8, close: 8 },
      Monday: { open: 0, close: 0 },
    };
    const actual = getOpeningHours();
    expect(actual).toStrictEqual(expected);
  });

  it('Verifica se o retorno está correto de acordo com o parametro passado', () => {
    const zooClosed = 'The zoo is closed';
    const zooOpened = 'The zoo is open';
    const listParameter = [
      ['Monday', '09:00-AM', zooClosed],
      ['Tuesday', '08:00-AM', zooOpened],
      ['Wednesday', '10:00-PM', zooClosed],
      ['Saturday', '07:00-PM', zooOpened],
      ['Thursday', '09:00-PM', zooClosed],
      ['Tuesday', '12:00-PM', zooOpened],
      ['Tuesday', '12:00-AM', zooClosed],
    ];

    listParameter.forEach((dataTest) => {
      const actual = getOpeningHours(...dataTest);
      const [, , expected] = dataTest;
      expect(actual).toBe(expected);
    });
  });

  it('Verifica se valida os dias da semana no formato certo', () => {
    expect(() => {
      getOpeningHours('segunda', '09:00-AM');
    }).toThrow('The day must be valid. Example: Monday');
    expect(() => {
      getOpeningHours('Tuesday', '09:00-AM');
    }).not.toThrow();
    expect(() => {
      getOpeningHours('Tuesdayses', '09:00-AM');
    }).toThrow('The day must be valid. Example: Monday');
  });

  it('Verifica se a hora está no formato correto', () => {
    const listParameter = [
      ['Monday', '09:DD-AM', 'The minutes should represent a number'],
      ['Monday', 'SS:00-AM', 'The hour should represent a number'],
      ['Monday', '120:10-AM', 'The hour must be between 0 and 12'],
      ['Monday', '12:100-AM', 'The minutes must be between 0 and 59'],
      ['Monday', '12:00-AG', 'The abbreviation must be \'AM\' or \'PM\''],
    ];

    listParameter.forEach((dataTest) => {
      const actual = () => {
        getOpeningHours(...dataTest);
      };
      const [, , expected] = dataTest;
      expect(actual).toThrow(expected);
    });
  });
});
