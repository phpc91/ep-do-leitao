"""
Aluno: Pedro Gabriel Padilha Gandara Mendes
NUSP: 7627714
"""

import constantes
import funcoes
from integral_dupla_gl import integral_dupla_gauss_legendre


def init():
    print("Esse código calcula a integral dupla de qualquer " +
          "função usando os polinômios Legendre e a quadratura de Gauss")
    print("Exemplos disponíveis:")
    print("1.1) Cubo de aresta 1\n" +
          "1.2) Tetraedro limitado pelos pontos (0,0,1), (0,1,0), (1,0,0)")
    print("2.1) Região no 1oQ limitada por x, y e y=1 - x^2 dydx")
    print("2.2) Região no 1oQ limitada por x, y e y=1 - x^2 dxdy")
    print("3.1) Área da superficie e^(y/x)")
    print("3.2) Volume abaixo da superfície e^(y/x)")
    print("4) Volume de sólido de revolução")

    numero_exemplo = input(
        "Qual exemplo gostaria de executar? (1.1/1.2/2.1/2.2/3.1/3.2/4) ")

    graus_diferentes = False
    nx_diferente_ny = input(
        "Deseja utilizar graus de polinômios de Legendre diferentes " +
        "para cada eixo (x,y)? (S/N) ")
    if (nx_diferente_ny == 'S' or nx_diferente_ny == 's'):
        graus_diferentes = True
        nx = input(
            "Qual grau do polinômio de Legendre deseja utilizar " +
            "para o eixo X? (6/8/10/outro) ")
        if (nx == 'outro'):
            pesos_x = input(
                "Insira no formato de lista ([valor1,valor2,...]) " +
                "os pesos do polinômio de Legendre a ser aplicado no eixo X: ")
            nos_x = input(
                "Insira no formato de lista ([valor1,valor2,...]) " +
                "os nós do polinômio de Legendre a ser aplicado no eixo X: ")
        else:
            pesos_x = constantes.LEGENDRE.get("grau" + nx).get('pesos')
            nos_x = constantes.LEGENDRE.get("grau" + nx).get('nos')

        ny = input(
            "Qual grau do polinômio de Legendre deseja utilizar " +
            "para o eixo Y? (6/8/10/outro) ")
        if (ny == 'outro'):
            pesos_y = input(
                "Insira no formato de lista ([valor1,valor2,...]) " +
                "os pesos do polinômio de Legendre a ser aplicado no eixo Y: ")
            nos_y = input(
                "Insira no formato de lista ([valor1,valor2,...]) " +
                "os nós do polinômio de Legendre a ser aplicado no eixo Y: ")
        else:
            pesos_y = constantes.LEGENDRE.get("grau" + ny).get('pesos')
            nos_y = constantes.LEGENDRE.get("grau" + ny).get('nos')

    else:
        grau_legendre = input("Qual grau do polinômio de Legendre " +
                              "deseja utilizar? (6/8/10/outro) ")
        if (grau_legendre == 'outro'):
            pesos_x = input(
                "Insira separado por VÍRGULA (valor1,valor2,...) os pesos" +
                "(em decimal) do polinômio de Legendre a ser utilizado: ")
            pesos_x = list(map(float, pesos_x.split(',')))
            nos_x = input(
                "Insira separado por VÍRGULA (valor1,valor2,...) os nós" +
                "(em decimal) do polinômio de Legendre a ser utilizado: ")
            nos_x = list(map(float, nos_x.split(',')))
            pesos_y = pesos_x
            nos_y = nos_x
        else:
            pesos_x = constantes.LEGENDRE.get(
                "grau" + grau_legendre).get('pesos')
            nos_x = constantes.LEGENDRE.get(
                "grau" + grau_legendre).get('nos')
            pesos_y = pesos_x
            nos_y = nos_x

    if (numero_exemplo == '1.1'):
        a = 0
        b = 1
        c = 0
        c_texto = c
        d = funcoes.limite_superior_y_1_1
        d_texto = 'x'
        funcao_a_integrar = funcoes.primitiva_do_cubo

    elif (numero_exemplo == '1.2'):
        a = 0
        b = 1
        c = 0
        c_texto = c
        d = funcoes.limite_superior_y_1_2
        d_texto = 'x'
        funcao_a_integrar = funcoes.primitiva_do_tetraedro

    elif (numero_exemplo == '2.1'):
        a = 0
        b = 1
        c = 0
        c_texto = c
        d = funcoes.limite_superior_y_2_1
        d_texto = '1 - x^2'
        funcao_a_integrar = funcoes.primitiva_exemplo_2

    elif (numero_exemplo == '2.2'):
        a = 0
        b = 1
        c = 0
        c_texto = c
        d = funcoes.limite_superior_y_2_2
        d_texto = 'srqt(1 - y)'
        funcao_a_integrar = funcoes.primitiva_exemplo_2

    elif (numero_exemplo == '3.1'):
        a = 0.1
        b = 0.5
        c = funcoes.limite_inferior_y_3
        c_texto = 'x^3'
        d = funcoes.limite_superior_y_3
        d_texto = 'x^2'
        funcao_a_integrar = funcoes.area_exemplo_3

    elif (numero_exemplo == '3.2'):
        a = 0.1
        b = 0.5
        c = funcoes.limite_inferior_y_3
        c_texto = 'x^3'
        d = funcoes.limite_superior_y_3
        d_texto = 'x^2'
        funcao_a_integrar = funcoes.volume_exemplo_3

    elif (numero_exemplo == '4'):
        print("\nNão implementado :( \n")
        return

    print("\n\nExecutando Integral dupla de GL")
    print("Exemplo ", numero_exemplo)
    print("limites: \n\ta: ", a, "\n\tb: ",
          b, "\n\tc: ", c_texto, "\n\td: ", d_texto)
    if (graus_diferentes):
        print("grau do polinômio de legendre em X: ", len(nos_x))
        print("grau do polinômio de legendre em Y: ", len(nos_y))
    else:
        print("grau do polinômio de Legendre: ", len(nos_x))
    resultado = integral_dupla_gauss_legendre(
        a,
        b,
        c,
        d,
        pesos_x,
        nos_x,
        pesos_y,
        nos_y,
        funcao_a_integrar,
    )

    print("==========\n\nResultado: ", resultado, "\n\n")
    return resultado


init()
