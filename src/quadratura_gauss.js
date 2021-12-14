const { GAUSS_CONSTANTS } = require('./constants')

// adaptar pra receber n !== [6,8,10] & receber c[] (w_j = peso) e r[] (x_j = nome)
/**
 * Calcula integral usando quadratura de gauss
 * 
 * @param {Number} a limite inferior de x
 * @param {Number} b limite superior de x
 * @param {Number} n numero de subintervalos
 * @param {Function} funcao_a_integrar função a ser integrada
 * @param {Array<Number>} [pesos] lista injetada de pesos
 * @param {Array<Number>} [raizes] lista injetada de raizes
 * 
 * @returns {Number} resultado da aprox. de gauss de uma integral
 */
function quadratura_gauss(a, b, n, funcao_a_integrar, pesos = null, raizes = null) {
  const pontos_a_percorrer = [a]
  const largura_passo = (b - a) / n
  let resultado_final = 0
  let coef_legendre = [5 / 9, 8 / 9, 5 / 9]
  let raiz_legendre = [-Math.sqrt(0.6), 0, Math.sqrt(0.6)]

  // if (n === 3) {
  //   coef_legendre = [5 / 9, 8 / 9, 5 / 9]
  //   raiz_legendre = [-Math.sqrt(0.6), 0, Math.sqrt(0.6)]
  // }
  // if (n === 6) {
  //   coef_legendre = GAUSS_CONSTANTS.n6.w
  //   raiz_legendre = GAUSS_CONSTANTS.n6.x
  // }
  // if (n === 8) {
  //   coef_legendre = GAUSS_CONSTANTS.n8.w
  //   raiz_legendre = GAUSS_CONSTANTS.n8.x
  // }
  // if (n === 10) {
  //   coef_legendre = GAUSS_CONSTANTS.n10.w
  //   raiz_legendre = GAUSS_CONSTANTS.n10.x
  // }
  // if (pesos && raizes) {
  //   coef_legendre = pesos
  //   raiz_legendre = raizes
  // }

  // prepara os pontos a percorrer
  for (let j = 1; j < n + 1; j++) {
    pontos_a_percorrer[j] = pontos_a_percorrer[j - 1] + largura_passo
  }

  for (let i = 0; i < n; i++) {
    const q_1 = (pontos_a_percorrer[i + 1] - pontos_a_percorrer[i]) / 2
    const q_2 = (pontos_a_percorrer[i + 1] + pontos_a_percorrer[i]) / 2

    const raizes_ajustadas = raiz_legendre.map((raiz_atual) => q_1 * raiz_atual + q_2)

    let resultado_parcial = 0
    for (let i = 0; i < coef_legendre.length; i++) {
      resultado_parcial += coef_legendre[i] * funcao_a_integrar(raizes_ajustadas[i])
    }
    resultado_parcial = resultado_parcial * largura_passo / 2
    resultado_final += resultado_parcial
  }

  return resultado_final
}

/**
 * Calcula o quadrado de um número
 * 
 * @param {Number} x 
 * @returns {Number} x ao quadrado
 */
function x_ao_quadrado(x) {
  return x * x
}

console.log(quadratura_gauss(0, 2, 32, x_ao_quadrado))