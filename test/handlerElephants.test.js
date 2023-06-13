const handlerElephants = require('../src/handlerElephants');

describe('Testes da função HandlerElephants', () => {
  it('Recebendo nenhum parametro, deve returnar undefined', () => {
    expect(handlerElephants()).toBeUndefined();
  });

  it('Recebendo um parametro que não seja uma string retorna a uma mensagem de erro', () => {
    const expected = 'Parâmetro inválido, é necessário uma string';

    expect(handlerElephants(3)).toStrictEqual(expected);
    expect(handlerElephants([3])).toStrictEqual(expected);
    expect(handlerElephants({ number: 3 })).toStrictEqual(expected);
  });

  it('Recebendo o parametro correto, retorna os valores certos', () => {
    //   Para o argumento count deve retornar o número inteiro 4;
    expect(handlerElephants('count')).toBe(4);
    // Para o argumento names deve retornar um array de nomes que possui o nome Jefferson;
    expect(handlerElephants('names')).toStrictEqual(['Ilana', 'Orval', 'Bea', 'Jefferson']);
    // Para o argumento averageAge deve retornar um número próximo a 10.5;
    expect(handlerElephants('averageAge')).toBeCloseTo(10.5, 1);
    // Para o argumento location deve retornar a string NW;
    expect(handlerElephants('location')).toBe('NW');
    // Para o argumento popularity deve retornar um número igual ou maior a 5;
    expect(handlerElephants('popularity')).toBeGreaterThanOrEqual(5);
    // Para o argumento availability deve retornar um array de dias da semana que não contém Monday;
    expect(handlerElephants('availability')).toStrictEqual(['Friday', 'Saturday', 'Sunday', 'Tuesday']);
    expect(handlerElephants('elefante')).toBeNull();
  });
});
