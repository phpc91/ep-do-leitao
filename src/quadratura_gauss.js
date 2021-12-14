const { GAUSS_CONSTANTS } = require('./constants')

/**
 * Calcula integral usando quadratura de gauss
 * 
 * @param {Number} a limite inferior de x
 * @param {Number} b limite superior de x
 * @param {Number} num_subintervalos numero de subintervalos
 * @param {Function} funcao_a_integrar função a ser integrada
 * @param {Array<Number>} [coeficientes] lista injetada de pesos
 * @param {Array<Number>} [raizes] lista injetada de raizes
 * 
 * @returns {Number} resultado da aprox. de gauss de uma integral
 */
function quadratura_gauss(a, b, num_subintervalos, funcao_a_integrar, coeficientes = null, raizes = null) {
  const pontos_a_percorrer = [a]
  const largura_passo = (b - a) / num_subintervalos
  let resultado_final = 0
  let coef_legendre = coeficientes
  let raiz_legendre = raizes

  if (!coeficientes && !raizes) {
    const sorteio = Math.floor(Math.random() * GAUSS_CONSTANTS.length)
    const constants = GAUSS_CONSTANTS[sorteio]
    console.log(`Usando dados do polinômio de Legendre de grau ${constants.grau}`)

    coef_legendre = constants.coeficientes
    raiz_legendre = constants.raizes
  }

  // prepara os pontos a percorrer
  for (let j = 1; j < num_subintervalos + 1; j++) {
    pontos_a_percorrer[j] = pontos_a_percorrer[j - 1] + largura_passo
  }

  for (let i = 0; i < num_subintervalos; i++) {
    const q_1 = (pontos_a_percorrer[i + 1] - pontos_a_percorrer[i]) / 2
    const q_2 = (pontos_a_percorrer[i + 1] + pontos_a_percorrer[i]) / 2

    let raizes_ajustadas = []
    for (let i = 0; i < raiz_legendre.length; i++) {
      raizes_ajustadas[i] = q_1 * raiz_legendre[i] + q_2
    }

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