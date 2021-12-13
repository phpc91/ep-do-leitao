import { GAUSS_CONSTANTS } from "./constants"

export function integralDupla(min, max, steps) {
  let raizesEpesos = GAUSS_CONSTANTS.n6

  if (steps === 8) raizesEpesos = GAUSS_CONSTANTS.n8
  else if (steps === 10) raizesEpesos = GAUSS_CONSTANTS.n10

  // Parâmetro iniciais, ajuste do intervalo de integração para[-1, 1]
  const h1 = (min - max) / 2
  const h2 = (min + max) / 2
  let result = 0
  const steps2 = steps

  for (let i in steps2 + 1) {
    let result2 = 0
    const { x } = h1 * raizesEpesos + h2
    const limiteSuperiorIntegral = 
  }
}


// # Implementação da Quadratura de Gauß para cálculo de integrais duplas iteradas, conforme descrito em
// # Burden, R.L. & Faires, J.D. (2008) 8ª edição, Análise Numérica, p.224
// def int_dupla_gauss(a, b, n):

//     # Primeiro laço, integração em x
// for i in range(1, m + 1):
//         # Inicializa o valor inicial da variável auxiliar da integral
// JX = 0
//         # obtém o valor da raíz xj ajustada ao intervalo
// x = h1 * aux.get(i)[0] + h2
//         # limites inferior e superior da integral em y, prepara para integrar em y
// c1 = c(x)
// d1 = d(x)
// k1 = (d1 - c1) / 2
// k2 = (d1 + c1) / 2
//         # Segundo laço para cada valor de x obtido acima, integra - se para todos os y do intevalo de integração
// for j in range(1, n + 1):
//             # obtém o valor da raíz xj ajustada ao intervalo
// y = k1 * aux.get(j)[0] + k2
//             # calcula o valor da f nas razes obtidas acima
// Q = f(x, y)
//             # Armazena o valor parcial da integral
// J = JX + aux.get(j)[1] * Q
// J = J + aux.get(i)[1] * k1 * JX
//     # Devolve o valor da aproximação calculada
// J = h1 * J
// print("Para n=" + str(n) + " Valor da integral:" + str(J))
