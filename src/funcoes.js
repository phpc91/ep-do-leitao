module.exports = {
  exemplo_3_2_tcc_ariel,
  x_ao_quadrado,
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

/**
 * Exemplo 3.2 do TCC do Aryel, pag. 49
 * 
 * @param {Number} x
 * 
 * @returns {Number} 
 */
function exemplo_3_2_tcc_ariel(x) {
  return 1 / (1 + x * x)
}
