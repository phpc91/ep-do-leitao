const { GAUSS_CONSTANTS } = require('./constantes')
const { exemplo_pdf_aula } = require('./funcoes')

module.exports = {
  integral_dupla_gl,
}

/*
formula geral

integral de a,b (integral c,d ( f(x,y) dy) dx)
0.25 * (b - a) * (d - c) * Somatório_i=1_a_GrauLegendre(coeficiente_x[i] * Somatório_j=1_a_graulegendre(coeficiente_y[j] * funcao_a_integrar(x_i, y_j)))
*/

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
function integral_dupla_gl({
  ax,
  bx,
  ay,
  by,
  coeficientes,
  raizes,
  subintervalos = 16,
  funcao_a_integrar
}) {
  const num_subintervalos = Number(subintervalos)
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
    const qx_1 = (pontos_a_percorrer_x[i + 1] - pontos_a_percorrer_x[i]) / 2
    const qx_2 = (pontos_a_percorrer_x[i + 1] + pontos_a_percorrer_x[i]) / 2
    const qy_1 = (pontos_a_percorrer_y[i + 1] - pontos_a_percorrer_y[i]) / 2
    const qy_2 = (pontos_a_percorrer_y[i + 1] + pontos_a_percorrer_y[i]) / 2

    let resultado_parcial_x = 0
    for (let i_x = 0; i_x < raizes.length; i_x++) {
      const raiz_ajustada_x = qx_1 * raizes[i_x] + qx_2
      // resultado_parcial_x += coeficientes[i_x] * resultado_loop_y

      let resultado_parcial_y = 0
      for (let i_y = 0; i_y < raizes.length; i_y++) {
        const raiz_ajustada_y = qy_1 * raizes[i_y] + qy_2
        resultado_parcial_y += coeficientes[i_y] * funcao_a_integrar(raiz_ajustada_x, raiz_ajustada_y)
      }
      // resultado_parcial_y = resultado_parcial_y * largura_passo_y / 2

      resultado_parcial_x += coeficientes[i_x] * resultado_parcial_y
    }
    resultado_final += resultado_parcial_x
  }
  resultado_final = resultado_final * 0.25 * largura_passo_x * largura_passo_y
  console.log(resultado_final)
  return resultado_final
}

integral_dupla_gl({
  ax: 1,
  bx: 4,
  ay: 0,
  by: 2,
  coeficientes: GAUSS_CONSTANTS[0].coeficientes,
  raizes: GAUSS_CONSTANTS[0].raizes,
  num_subintervalos: process.argv.slice(2)[0],
  funcao_a_integrar: exemplo_pdf_aula,
})
