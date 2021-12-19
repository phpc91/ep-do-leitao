const {
  x_ao_quadrado,
  exemplo_pdf_aula,
  exemplo_3_2_tcc_ariel,
} = require('../src/funcoes')
const {
  integral_gl,
} = require('../src/integral_gl')
const {
  integral_dupla_gl,
  nossa_integral_dupla,
} = require('../src/integral_dupla_gl')
const { GAUSS_CONSTANTS } = require('../src/constantes')

describe('todos os testes', () => {
  test('integral de x^2 entre [0,2], com 8 subintervalos', () => {
    const result = integral_gl({
      a: 0,
      b: 2,
      subintervalos: 8,
      funcao_a_integrar: x_ao_quadrado,
      coeficientes: GAUSS_CONSTANTS[0].coeficientes,
      raizes: GAUSS_CONSTANTS[0].raizes,
    })
    expect(result).toBeCloseTo(8 / 3)
  })

  test('integral dupla de y^2 log10(3x) dydx, x E [1,4]; y E [0,2]', () => {
    const result = nossa_integral_dupla({})
    expect(result).toBeCloseTo(6.76563691)
    expect(typeof result).toBe('number')
  })

  test('cubo, com n6', () => {
    const result = nossa_integral_dupla({
      ax: 0,
      bx: 1,
      ay: 0,
      by: (x) => { return x },
      funcao_a_integrar: (y) => 6 * y,
      coeficientes: GAUSS_CONSTANTS[1].coeficientes,
      raizes: GAUSS_CONSTANTS[1].raizes,
    })
    expect(typeof result).toBe('number')
    expect(result).toBeCloseTo(1)
  })
  test('cubo, com n8', () => {
    const result = nossa_integral_dupla({
      ax: 0,
      bx: 1,
      ay: 0,
      by: (x) => x,
      funcao_a_integrar: (y) => 6 * y,
      coeficientes: GAUSS_CONSTANTS[2].coeficientes,
      raizes: GAUSS_CONSTANTS[2].raizes,
    })
    expect(typeof result).toBe('number')
    expect(result).toBeCloseTo(1)
  })
  test('cubo, com n10', () => {
    const result = nossa_integral_dupla({
      ax: 0,
      bx: 1,
      ay: 0,
      by: (x) => x,
      funcao_a_integrar: (y) => 6 * y,
      coeficientes: GAUSS_CONSTANTS[3].coeficientes,
      raizes: GAUSS_CONSTANTS[3].raizes,
    })
    expect(typeof result).toBe('number')
    expect(result).toBeCloseTo(1)
  })
})
