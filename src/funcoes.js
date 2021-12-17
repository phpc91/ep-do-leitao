module.exports = {
  exemplo_3_2_tcc_ariel,
  exemplo_pdf_aula,
  x_ao_quadrado,
}

/**
 * Calcula o quadrado de um número
 * 
 * @param {Number} x 
 * @returns {Number} x ao quadrado
 */
function x_ao_quadrado(x, y) {
  return x * x
}

/**
 * Exemplo 3.2 do TCC do Aryel, pag. 49
 * 
 * @param {Number} x
 * 
 * @returns {Number} 
 */
function exemplo_3_2_tcc_ariel(x, y) {
  return 1 / (1 + x * x)
}

/**
 * Exemplo de integral dupla pag 87 do aula_integral.pdf
 * 
 * @param {Number} x
 * @param {Number} y
 * 
 * @returns {Number}
 */
function exemplo_pdf_aula(x, y) {
  return y * y * Math.log10(3 * x)
}
