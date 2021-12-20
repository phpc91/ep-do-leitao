def integral_dupla_gauss_legendre(
    ax,
    bx,
    ay,
    by,
    coeficientes_x,
    raizes_x,
    coeficientes_y,
    raizes_y,
    funcao_a_integrar
):
    """
    ax, bx são números; são os limites em x da integral
    ay, by podem ser números ou funções em x; são os limites em y da integral
    coeficientes_x são os pesos do polinômio de legendre usado no eixo X
    raizes_x são as raízes do polinômio de legendre usado no eixo X
    coeficientes_y são os pesos do polinômio de legendre usado no eixo Y
    raizes_y são as raízes do polinômio de legendre usado no eixo Y
    funcao_a_integrar é a sobre a qual queremos calcular a integral dupla
    """

    a = ax
    b = bx
    c = ay
    d = by
    soma_x_y = 0

    # loop em X
    for i in range(len(raizes_x)):
        A_i = coeficientes_x[i]
        qx_1 = (b - a) / 2
        qx_2 = (b + a) / 2
        x_i = qx_1 * raizes_x[i] + qx_2  # ajuste de variavel

        if (callable(ay)):
            c = ay(x_i)
        if (callable(by)):
            d = by(x_i)

        qy_1 = (d - c) / 2
        qy_2 = (d + c) / 2

        soma_y = 0

        # loop em Y
        for j in range(len(raizes_y)):
            B_j = coeficientes_y[j]
            y_j = qy_1 * raizes_y[j] + qy_2  # ajuste de variavel
            resultado_funcao = funcao_a_integrar(x_i, y_j)
            soma_y += B_j * resultado_funcao  # somatório de B[i] * f(x,y)

        # somatório de A[i] * resultado em Y * correção da troca de variável
        soma_x_y += A_i * soma_y * (d - c) / 2

    # resultado final é soma_x_y * correção da troca de variável
    integral_dupla = soma_x_y * (b - a) / 2
    return integral_dupla
