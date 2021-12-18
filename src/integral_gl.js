const { GAUSS_CONSTANTS } = require('./constantes')
const {
  exemplo_3_2_tcc_ariel,
  exemplo_pdf_aula,
  x_ao_quadrado,
} = require('./funcoes')

module.exports = {
  integral_gl,
}

/**
 * Calcula integral usando quadratura de gauss
 * OBS: USAR DOUBLE
 * 
 * @param {Number} a limite inferior de x
 * @param {Number} b limite superior de x
 * @param {Number} subintervalos numero de subintervalos
 * @param {Function} funcao_a_integrar função a ser integrada
 * @param {Array<Number>} [coeficientes] lista injetada de pesos
 * @param {Array<Number>} [raizes] lista injetada de raizes
 * 
 * @returns {Number} resultado da aprox. de gauss de uma integral
 */
function integral_gl({
  a,
  b,
  subintervalos = 8,
  funcao_a_integrar,
  coeficientes = null,
  raizes = null,
}) {
  const num_subintervalos = Number(subintervalos)
  if (num_subintervalos < 1) return 'erro: n deve ser maior que 1'
  const pontos_a_percorrer = [a]
  const largura_passo = (b - a) / num_subintervalos
  let resultado_final = 0
  let coef_legendre = coeficientes
  let raiz_legendre = raizes

  if (!coeficientes && !raizes) {
    const sorteio = Math.floor(Math.random() * GAUSS_CONSTANTS.length)
    const constants = GAUSS_CONSTANTS[sorteio]

    coef_legendre = constants.coeficientes
    raiz_legendre = constants.raizes
  }
  console.log(`Usando dados do polinômio de Legendre de grau ${raiz_legendre.length}`)

  // prepara os pontos a percorrer
  for (let j = 1; j < num_subintervalos + 1; j++) {
    pontos_a_percorrer[j] = pontos_a_percorrer[j - 1] + largura_passo
  }

  for (let i = 0; i < num_subintervalos; i++) {
    const q_1 = (pontos_a_percorrer[i + 1] - pontos_a_percorrer[i]) / 2
    const q_2 = (pontos_a_percorrer[i + 1] + pontos_a_percorrer[i]) / 2

    let resultado_parcial = 0
    for (let i = 0; i < raiz_legendre.length; i++) {
      const raiz_ajustada = q_1 * raiz_legendre[i] + q_2
      resultado_parcial += coef_legendre[i] * funcao_a_integrar(raiz_ajustada)
    }
    resultado_parcial = resultado_parcial * largura_passo / 2
    resultado_final += resultado_parcial
  }

  console.log(resultado_final)
  return resultado_final
}

integral_gl({
  a: 0,
  b: 2,
  subintervalos: process.argv.slice(2)[0],
  funcao_a_integrar: x_ao_quadrado,
  coeficientes: GAUSS_CONSTANTS[0].coeficientes,
  raizes: GAUSS_CONSTANTS[0].raizes,
})
