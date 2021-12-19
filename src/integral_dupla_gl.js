const { GAUSS_CONSTANTS } = require('./constantes')
const { exemplo_pdf_aula } = require('./funcoes')

module.exports = {
  integral_dupla_gl,
  nossa_integral_dupla,
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
  subintervalos = 2,
  funcao_a_integrar
}) {
  // if (Number(nx) < 1 || Number(ny) < 1) return 'erro: nx > 1 ou ny > 1'
  const pontos_a_percorrer_x = [ax]
  const pontos_a_percorrer_y = [ay]
  const largura_passo_x = (bx - ax) / subintervalos
  const largura_passo_y = (by - ay) / subintervalos
  let resultado_final = 0

  // constroi lista de pontos a percorrer
  for (let i = 1; i < subintervalos + 1; i++) {
    pontos_a_percorrer_x[i] = pontos_a_percorrer_x[i - 1] + largura_passo_x
    pontos_a_percorrer_y[i] = pontos_a_percorrer_y[i - 1] + largura_passo_y
  }


  // metodo
  for (let i = 0; i < raizes.length; i++) {
    // i=[0,1,2]
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
        const resultado_iteracao = coeficientes[i_y] * funcao_a_integrar(raiz_ajustada_x, raiz_ajustada_y)
        // console.log({
        //   resultado_iteracao,
        //   raiz_ajustada_x,
        //   raiz_ajustada_y,
        //   formula: `${coeficientes[i_y] * (funcao_a_integrar(raiz_ajustada_x, raiz_ajustada_y))}`,
        // })
        resultado_parcial_y += resultado_iteracao
      }
      // resultado_parcial_y = resultado_parcial_y * largura_passo_y / 2

      resultado_parcial_x += coeficientes[i_x] * resultado_parcial_y
    }
    resultado_final += resultado_parcial_x
  }
  resultado_final = resultado_final * 0.25 * (bx - ax) * (by - ay)
  console.log(resultado_final)
  return resultado_final
}

// integral_dupla_gl({
//   ax: 1,
//   bx: 4,
//   ay: 0,
//   by: 2,
//   coeficientes: GAUSS_CONSTANTS[0].coeficientes,
//   raizes: GAUSS_CONSTANTS[0].raizes,
//   num_subintervalos: process.argv.slice(2)[0],
//   funcao_a_integrar: exemplo_pdf_aula,
// })

function nossa_integral_dupla({
  ax: a,
  bx: b,
  ay: ponto_c_ou_funcao_de_x, // f(x)
  by: ponto_d_ou_funcao_de_x, // f(x)
  coeficientes,
  raizes,
  funcao_a_integrar,
}) {
  let c = ponto_c_ou_funcao_de_x
  let d = ponto_d_ou_funcao_de_x
  let soma_x_y = 0
  for (let i = 0; i < raizes.length; i++) { //raizes_x (n_x)
    const A_i = coeficientes[i]

    const qx_1 = (b - a) / 2
    const qx_2 = (b + a) / 2
    const x_i = qx_1 * raizes[i] + qx_2 // ajuste de variaveis
    // console.log({ x_i, 'raiz': raizes[i] })

    if (typeof ponto_c_ou_funcao_de_x === 'function') c = ponto_c_ou_funcao_de_x(x_i)
    if (typeof ponto_d_ou_funcao_de_x === 'function') d = ponto_d_ou_funcao_de_x(x_i)
    const qy_1 = (d - c) / 2
    const qy_2 = (d + c) / 2

    let soma_y = 0
    for (let j = 0; j < raizes.length; j++) { // raizes_y (n_y)

      const B_j = coeficientes[j]
      const y_j = qy_1 * raizes[j] + qy_2 // ajuste de variaveis
      const resultado_funcao = funcao_a_integrar(x_i, y_j)
      // console.log({ y_j, 'raiz': raizes[j], resultado_funcao })
      soma_y += B_j * resultado_funcao
      // console.log({ soma_y })
    }

    soma_x_y += A_i * soma_y * (d - c) * 0.5
    // console.log({ soma_x_y })
  }

  // if (typeof ponto_c_ou_funcao_de_x === 'function') c = ponto_c_ou_funcao_de_x(a)
  // if (typeof ponto_d_ou_funcao_de_x === 'function') d = ponto_d_ou_funcao_de_x(b)

  // console.log({ '1': (b - a), '2': (d - c), soma_x_y })
  const integral_dupla = 0.5 * (b - a) * soma_x_y
  console.log(integral_dupla)
  return integral_dupla
}

// exemplo aula algo gl
// nossa_integral_dupla({
//   ax: 1,
//   bx: 4,
//   ay: 0,
//   by: 2,
//   funcao_a_integrar: (x, y) => (y ** 2) * Math.log10(3 * x),
//   coeficientes: GAUSS_CONSTANTS[3].coeficientes,
//   raizes: GAUSS_CONSTANTS[3].raizes,
// })

// exemplo aula 
// nossa_integral_dupla({
//   ax: 2,
//   bx: 6,
//   ay: 1,
//   by: 3,
//   funcao_a_integrar: (x, y) => Math.cos(x * y) * (Math.sqrt((x ** 2) + y)),
//   coeficientes: GAUSS_CONSTANTS[3].coeficientes,
//   raizes: GAUSS_CONSTANTS[3].raizes,
// })

// exemplo 2, tetraedro
// nossa_integral_dupla({
//   ax: 0,
//   bx: 1,
//   ay: 0,
//   by: (x) => (1 - x),
//   funcao_a_integrar: (x, y) => (1 - x - y),
//   coeficientes: GAUSS_CONSTANTS[3].coeficientes,
//   raizes: GAUSS_CONSTANTS[3].raizes,
// })

// cubo
// nossa_integral_dupla({
//   ax: 0,
//   bx: 2,
//   ay: 0,
//   by: (x) => x,
//   funcao_a_integrar: (x, y) => 6 * y,
//   coeficientes: GAUSS_CONSTANTS[1].coeficientes,
//   raizes: GAUSS_CONSTANTS[1].raizes,
// })

//  
// nossa_integral_dupla({
//   ax: 0,
//   bx: 1,
//   ay: 0,
//   by: (x) => (1 - x ** 2),
//   funcao_a_integrar: (x, y) => 1,
//   coeficientes: GAUSS_CONSTANTS[1].coeficientes,
//   raizes: GAUSS_CONSTANTS[1].raizes,
// })
// nossa_integral_dupla({
//   ax: 0,
//   bx: 1,
//   ay: 0,
//   by: (x) => (Math.sqrt(1 - x)),
//   funcao_a_integrar: (x, y) => 1,
//   coeficientes: GAUSS_CONSTANTS[1].coeficientes,
//   raizes: GAUSS_CONSTANTS[1].raizes,
// })

// 
// nossa_integral_dupla({
//   ax: 0,
//   bx: Math.PI / 2,
//   ay: 0,
//   by: Math.PI / 4,
//   funcao_a_integrar: (x, y) => Math.sin(x + y),
//   coeficientes: GAUSS_CONSTANTS[0].coeficientes,
//   raizes: GAUSS_CONSTANTS[0].raizes,
// })