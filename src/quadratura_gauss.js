const { GAUSS_CONSTANTS } = require('./constantes')
const {
  exemplo_3_2_tcc_ariel,
  exemplo_pdf_aula,
  x_ao_quadrado,
} = require('./funcoes')

module.exports = {
  quadratura_gauss,
  integral_dupla,
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
function quadratura_gauss(a, b, subintervalos, funcao_a_integrar, coeficientes = null, raizes = null) {
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
      const raizes_ajustada = q_1 * raiz_legendre[i] + q_2
      resultado_parcial += coef_legendre[i] * funcao_a_integrar(raizes_ajustada)
    }
    resultado_parcial = resultado_parcial * largura_passo / 2
    resultado_final += resultado_parcial
  }

  console.log(resultado_final)
  return resultado_final
}

/**
 * Calcula o valor numérico de uma integral dupla de determinada função f(x,y)
 * 
 * @param {Number} ax limite inferior em relacao a x
 * @param {Number} bx limite superior em relacao a x
 * @param {Number} nx numero de subintervalos em relação a x
 * @param {Number} cy limite inferior em relacao a y
 * @param {Number} dy limite superior em relacao a y
 * @param {Number} ny numero de subintervalos em relação a y
 * 
 * @returns {Number} resultado numérico da integral dupla
 */
function integral_dupla({
  ax,
  bx,
  // nx,
  coeficientes_x,
  raizes_x,
  ay,
  by,
  // ny,
  coeficientes_y,
  raizes_y,
  num_subintervalos = 16,
  funcao_a_integrar
}) {
  // afinal, nx é pra ser grau de legendre ou subdivisões do intervalo?
  // if (Number(nx) < 1 || Number(ny) < 1) return 'erro: nx > 1 ou ny > 1'
  const pontos_a_percorrer_x = [ax]
  const pontos_a_percorrer_y = [ay]
  const largura_passo_x = (bx - ax) / num_subintervalos
  const largura_passo_y = (by - ay) / num_subintervalos // n sei se isso faz sentido, trocar pelo grau do polinomio
  let resultado_final = 0

  // constroi lista de pontos a percorrer
  for (let i = 1; i < num_subintervalos + 1; i++) {
    pontos_a_percorrer_x[i] = pontos_a_percorrer_x[i - 1] + largura_passo_x
    pontos_a_percorrer_y[i] = pontos_a_percorrer_y[i - 1] + largura_passo_y
  }

  for (let i = 0; i < num_subintervalos; i++) {
    // ajusta raizes em x
    const qx_1 = (pontos_a_percorrer_x[i + 1] - pontos_a_percorrer_x[i]) / 2
    const qx_2 = (pontos_a_percorrer_x[i + 1] + pontos_a_percorrer_x[i]) / 2

    let resultado_parcial_x = 0
    for (let i_x = 0; i_x < raizes_x.length; i_x++) {
      const raiz_ajustada_x = qx_1 * raizes_x[i_x] + qx_2
      // console.log({ qx_1, qx_2, raiz_ajustada_x })

      let resultado_parcial_y = 0
      for (let j = 0; j < num_subintervalos; j++) {
        const qy_1 = (pontos_a_percorrer_y[j + 1] - pontos_a_percorrer_y[j]) / 2
        const qy_2 = (pontos_a_percorrer_y[j + 1] + pontos_a_percorrer_y[j]) / 2
        // console.log({ qy_1, qy_2 })

        for (let i_y = 0; i_y < raizes_y.length; i_y++) {
          const raiz_ajustada_y = qy_1 * raizes_y[i_y] + qy_2
          // console.log({ raiz_ajustada_x, raiz_ajustada_y, coeficiente_y: coeficientes_y[i_y] })
          resultado_parcial_y += coeficientes_y[i_y] * funcao_a_integrar(raiz_ajustada_x, raiz_ajustada_y)
        }
        // console.log({ resultado_parcial_y })
        resultado_parcial_y = resultado_parcial_y * largura_passo_y / 2
      }
      resultado_parcial_x += coeficientes_x[i_x] * resultado_parcial_y
      // console.log({ resultado_parcial_x })
    }
    resultado_final += resultado_parcial_x * largura_passo_x / 2
  }
  console.log(0.25 * (bx - ax) * (by - ay) * resultado_final)
  console.log(resultado_final)
  return resultado_final

  /*
  // calcular pesos_x e raizes_x ajustadas para nx

  if (Number(nx) == Number(ny)) {
    for (let j = 0; j < (nx + 1) / 2; j++) {
      pesos_y[j] = pesos_x[j]
      raizes_y[j] = raizes_x[j]
    }
  } else {
    // calcula pesos_y e raizes_y ajustadas pra ny
  }

  // troca variaveis
  const ex1 = (bx - ax) / 2
  const ex2 = (bx + ax) / 2
  const ey1 = (by - ay) / 2
  const ey2 = (by + ay) / 2
  let soma = 0

  for (let i = 0; i < nx; i++) {
    // kx <- sinal (i - (nx + resto(nx + 1, 2)) / 2) * (resto(nx, 2) + resto(nx + 1, 2) / 2)
    // kx <- kx + i - (nx + 1) / 2
    // tx <- sinal(kx) * raizes_x[abs(kx)]
    // x <- ex1 * tx + ex2;

    // chute de interpretação do código
    let kx = (i - (nx + (nx + 1) % 2) / 2) * ((nx % 2) + ((nx + 1) % 2) / 2)
    kx += kx + i - (nx + 1) / 2
    const tx = -kx * raizes_x[Math.abs(kx)] // kx é inteiro? percorrer do outro jeito?
    const x = ex1 * tx + ex2 // ajuste da raiz no novo intervalo

    const Ax = pesos_x[kx];
    let soma_parcial = 0

    for (let j = 0; j < ny; j++) {
      // ky <- sinal (j - (ny + resto(ny + 1, 2)) / 2) * (resto(ny, 2) + resto(ny + 1, 2) / 2)
      // ky <- ky + j - (ny + 1) / 2
      // ty <- sinal(ky) * raizes_y[abs(ky)]
      // Ay <- pesos_y[ky];
      // y <- ey1 * ty + ey2;

      // soma_parcial += Ay * funcao_a_integrar(x, y)

      let ky = (j - (ny + (ny + 1) % 2) / 2) * ((ny % 2) + ((ny + 1) % 2) / 2)
      ky += j - (ny + 1) / 2
      const ty = -ky * raizes_y[Math.abs(ky)]
      const Ay = pesos_y[ky]
      const y = ey1 * ty + ey2

      soma_parcial += Ay * funcao_a_integrar(x, y)
    }
    soma += Ax * soma_parcial
  }

  const resultado = 0.25 * (bx - ax) * (by - ay) * soma

  return resultado
  */
  // preciso de uma função que faça quadratura de gauss e retorne uma função ?
  // integral de dentro insere limites q são funções

}
// console.log(quadratura_gauss(-4, 4, process.argv.slice(2)[0], exemplo_3_2_tcc_ariel, GAUSS_CONSTANTS[0].coeficientes, GAUSS_CONSTANTS[0].raizes))
integral_dupla({
  ax: 1,
  bx: 4,
  // nx: 3,
  coeficientes_x: GAUSS_CONSTANTS[0].coeficientes,
  raizes_x: GAUSS_CONSTANTS[0].raizes,
  ay: 0,
  by: 2,
  // ny: 4,
  coeficientes_y: GAUSS_CONSTANTS[0].coeficientes,
  raizes_y: GAUSS_CONSTANTS[0].raizes,
  num_subintervalos: process.argv.slice(2)[0],
  funcao_a_integrar: exemplo_pdf_aula,
})
