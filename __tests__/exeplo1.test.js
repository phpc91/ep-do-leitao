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
} = require('../src/integral_dupla_gl')
const { GAUSS_CONSTANTS } = require('../src/constantes')

describe('todos os testes', () => {
  test('integral de x^2 entre [0,2], com 8 subintervalos', () => {
    const result = integral_gl(0, 2, 8, x_ao_quadrado, GAUSS_CONSTANTS[0].coeficientes, GAUSS_CONSTANTS[0].raizes)
    expect(result).toBeCloseTo(8 / 3)
  })

  test('integral dupla de y^2 log10(3x) dydx, x E [1,4]; y E [0,2]', () => {
    const result = integral_dupla_gl({
      ax: 1,
      bx: 4,
      coeficientes_x: GAUSS_CONSTANTS[0].coeficientes,
      raizes_x: GAUSS_CONSTANTS[0].raizes,
      ay: 0,
      by: 2,
      coeficientes_y: GAUSS_CONSTANTS[0].coeficientes,
      raizes_y: GAUSS_CONSTANTS[0].raizes,
      // num_subintervalos: 32,
      funcao_a_integrar: exemplo_pdf_aula,
    })
    expect(typeof result).toBe('number')
  })
})
