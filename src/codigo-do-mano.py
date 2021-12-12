# Implementação da Quadratura de Gauß para cálculo de integrais duplas iteradas, conforme descrito em
# Burden, R. L. & Faires, J. D. (2008) 8ª edição, Análise Numérica, p.224
def int_dupla_gauss(a, b, n):

    # De acordo com o grau do polinômio de Legendre escolhido, cria uma cópia do dicionário contendo
    # as respectivas raizes xi e pesos wi
    if n == 6:
        aux = n6.copy()
    elif n == 8:
        aux = n8.copy()
    else:
        aux = n10.copy()

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
        # limites inferior e superior da integral em y, prepara para integrar em y
        c1 = c(x)
        d1 = d(x)
        k1 = (d1-c1) / 2
        k2 = (d1+c1) / 2
        # Segundo laço para cada valor de x obtido acima, integra-se para todos os y do intevalo de integração
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
