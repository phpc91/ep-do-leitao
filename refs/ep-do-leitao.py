from itertools import combinations
# Essa biblioteca é nativa do próprio python, ela não é científica
# puramente lida com operações de natureza iterativa


def legendre(x, n):
    """
      Calcula o valor do polinômio de Legendre de qualquer grau
      utilizando a fórmula de Bonnet:
      $$ (n + 1) P_{n+1}(x) = (2n + 1) x P_n(x) - n P_{n-1}(x) $$
      ---------------------------------------------------------
      Params:
      x: (float) Ponto da reta real no qual o polinômio será calculado.
      n: (int) Grau do polinômio.
    """

    if n == 0:
        return 1
    elif n == 1:
        return x
    else:
        return ((2 * n - 1) * x * legendre(x, n - 1)
                - (n - 1) * legendre(x, n - 2)) / n


"""
Como encontrar as raízes do polinômio de legendre?
Eu sei que o polinômio de legendre se torna estritamente
crescente e maior do que 1 no ponto x=1 para qualquer n,
sei que as raízes são mais ou menos igualmente espaçadas,
simétricas e que são em total n+1 raízes.
Então basta que eu caminhe de 0 a 1, com passo = n + round(n/2).
Com isso encontro os pontos em que a função troca de sinal
e a partir destes pontos aplico o método da dicotomia até
que a precisão se faça suficiente.
quando n é impar o zero é uma raíz. Quando n é par não.
"""
# n = int(input("Diga quantos nós devem existir: "))
# precisao_da_aproximacao =
# float(input("Diga qual a aproximação [ex: 0.000001]: "))
n = 6
precisao_da_aproximacao = 1e-16
# Garantimos que caso a função seja impar o 0 estará entre suas raízes
if n % 2 != 0:
    raiz = 1
else:
    raiz = 0

# print(legendre(0.9739065285171717200779640, 10))


def troca_sinal_legendre(legendre, n):
    """
    Função que analisa o polinômio de legendre em busca
    de pontos em que ocorre a troca_sinal, para posteriormente
    refinar o resultado.
    Trata-se de uma aplicação do método da dicotomia
    """
    # Evitamos a divisão por zero no passo do range
    if n == 0:
        k = 1
    else:
        k = n + round(n / 2)
        # Intervalo do passo do range
        # criamos a variável para armazenar os pontos
        # em que a troca de sinais ocorre
        troca_sinal = []
        # criamos uma variável temporária para comparar
        # o sinal da função a cada ponto
        temp0 = legendre(x=(0) / k, n=n)
        for i in range(0, k):
            temp1 = legendre(x=(i + 1) / k, n=n)
            if temp1 * temp0 < 0:
                troca_sinal.append([i / k, (i + 1) / k])
            temp0 = temp1
        return troca_sinal


troca_sinal = troca_sinal_legendre(legendre, n)


def dicotomia(intervs, n, legendre):
    """
    Essa função foi escrita para refinar o método da dicotomia
    quando recebe uma lista com pares de intervalos, e executa
    o método sobre o polinômio de legendre
    """
    for i in intervs:
        valor_medio = (i[0] + i[1]) / 2
        if legendre(valor_medio, n) * legendre(i[0], n) < 0:
            i[1] = valor_medio
    else:
        i[0] = valor_medio


"""
Vamos fazer algumas iterações de refino
e ver o que acontece a fim de conferir o
aumento da precisão
"""
dicotomia(troca_sinal, n, legendre)
dicotomia(troca_sinal, n, legendre)
dicotomia(troca_sinal, n, legendre)


def confere_precisao(troca_sinal, precisao_da_aproximacao, dicotomia):
    """
    Como foram feitos espaçamentos regulares, a precisão
    será igual para todos os termos e,para poupar
    processamento, será analisado apenas
    um dos valores de x[j].
    Esta função repete o método da dicotomia até que se
    alcance a precisão pretendida.
    """

    precisao = (troca_sinal[0][1] - troca_sinal[0][0]) / 2
    while precisao > precisao_da_aproximacao:
        dicotomia(troca_sinal, n, legendre)
        precisao = (troca_sinal[0][1] - troca_sinal[0][0]) / 2


# confere_precisao(troca_sinal, precisao_da_aproximacao, dicotomia)
"""
Agora vamos nos preocupar em calcular as raízes, a começar por
organizar as raizes.
"""


def completa_raizes(raiz):
    raizes = []
    for i in range(len(troca_sinal)):
        raizes.append(-(troca_sinal[-i-1][0] + troca_sinal[-i-1][1]) / 2)
    if raiz == 1:
        raizes.append(0)
    for i in range(len(troca_sinal)):
        raizes.append((troca_sinal[i][0] + troca_sinal[i][1]) / 2)
    return raizes


raiz = completa_raizes(raiz)
# Armazenamos os valores numa variável
# Começamos a tratar a precisão aqui
precisao_invertida = int(1/precisao_da_aproximacao)
# Vamos tratar nossa variável pra ela nos arredondar
# as casas decimais que queremos
valor_round = 0
# Inicio meu contador
while precisao_invertida >= 0.1:
    precisao_invertida = precisao_invertida/10
    valor_round = valor_round + 1
# Aplicamos o arredondamento às raízes
for i in range(len(raiz)):
    raiz[i] = round(raiz[i], valor_round)
print(f"""Temos aqui todas as raízes para aplicar no polinômio{raiz}""")


# -------------------------------
# Hora de calcular os pesos. Bora nessa
# intervalo de integração
a, b = -1, 1


def pesos_from_hell(raiz, n, a, b):
    pesos = []
    for w in range(n):
        cte = 1
        raiztemp = []
        integral = 0
        for g in range(n - 1):
            raiztemp.append(raiz[w - g - 1])
            cte = cte * (raiz[w] - raiztemp[g])
            for g in range(n):
                termo = ((b ** (n - g)) - (a ** (n - g))) / (n - g)
            if g % 2 == 1:
                termo = termo * -1
            soma = 0
            for i in combinations(raiztemp, g):
                mult = 1
                for j in i:
                    mult = mult * j
                soma += mult
            # soma está check
            integral += soma * termo
        pesos.append(integral / cte)

    return pesos


pesos = pesos_from_hell(raiz, n, a, b)
for i in range(len(pesos)):
    pesos[i] = round(pesos[i], valor_round)

print(
    f"""Temos aqui todos os pesos para aplicar no maldito polinômio {pesos}""")
# def const_pesos(troca_sinal)

"""
function integralDupla = (n, peso = [], nó = [], funcao_a_integrar = () => {}) => {
  let result
  for (let i; i <= n; i++) {
    result += peso[i] * integralDeDentro(n, nó[i], funcao_a_integrar)
  }

  return result
}

integralDeDentro = (n, nó_atual, funcao_a_integrar) => {
  calcular novos_pesos = [], novos_nós = []
  let result
  for (let j; j <= n; j++) {
    result += novos_pesos[i] * função_a_integrar(nó_atual, novos_nós[j])
  }
}
"""

# Implementação da Quadratura de Gauß para cálculo de integrais
# duplas iteradas, conforme descrito em
# Burden, R. L. & Faires, J. D. (2008) 8ª edição, Análise Numérica, p.224

"""
def int_dupla_gauss(a, b, n):

    # De acordo com o grau do polinômio de Legendre escolhido,
    # cria uma cópia do dicionário contendo
    # as respectivas raizes xi e pesos wi
    aux = {
        1: raizes,
        2: [],
        3: [],
    }

    # Parâmetro iniciais, ajuste do intervalo de integração para [-1,1]
    h1 = (b-a)/2
    h2 = (b+a) / 2
    J = 0
    m = n
    # Primeiro laço, integração em x
    for i in range(1, m+1):
        # Inicializa o valor inicial da variável auxiliar da integral
        JX = 0
        # obtém o valor da raíz xj ajustada ao intervalo
        x = h1*aux.get(i)[0]+h2
        # limites inferior e superior da integral em y,
        # prepara para integrar em y
        # parametros de entrada do exemplo
        c1 = c(x)
        d1 = d(x)
        k1 = (d1-c1) / 2
        k2 = (d1+c1) / 2
        # Segundo laço para cada valor de x obtido acima,
        # integra-se para todos os y do intevalo de integração
        for j in range(1, n+1):
            # obtém o valor da raíz xj ajustada ao intervalo
            y = k1*aux.get(j)[0]+k2
            # calcula o valor da f nas razes obtidas acima
            Q = f(x, y)
            # Armazena o valor parcial da integral
            J = JX + aux.get(j)[1]*Q
            J = J + aux.get(i)[1] * k1 * JX
    # Devolve o valor da aproximação calculada
    J = h1*J
    print("Para n="+str(n) + " Valor da integral:"+str(J))
"""
