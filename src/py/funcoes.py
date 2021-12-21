"""
Aluno: Pedro Gabriel Padilha Gandara Mendes
NUSP: 7627714
"""

import math


def x_ao_quadrado(x, y):
    "exemplo qualquer usado para testes"
    return x * x


def y_2_log10_3x(x, y):
    "exemplo qualquer usado para testes"
    return y * y * math.log10(3 * x)


def limite_superior_y_1_1(x):
    "limite superior de y no exemplo 1.1"
    return x


def limite_superior_y_1_2(x):
    "limite superior de y no exemplo 1.2"
    return 1 - x


def primitiva_do_cubo(x, y):
    "funcao usada no exemplo 1.1"
    return 6 * y


def primitiva_do_tetraedro(x, y):
    "funcao usada no exemplo 1.2"
    return 1 - x - y


def limite_superior_y_2_1(x):
    "funcao usada no exemplo 2.1"
    return 1 - x ** 2


def limite_superior_y_2_2(y):
    "funcao usada no exemplo 2.2"
    return math.sqrt(1 - y)


def primitiva_exemplo_2(x, y):
    "funcao usada no exemplo 2"
    return 1


def limite_inferior_y_3(x):
    "funcao usada no exemplo 3"
    return x ** 3


def limite_superior_y_3(x):
    "funcao usada no exemplo 3"
    return x ** 2


def area_exemplo_3(x, y):
    "funcao usada no exemplo 3"
    return math.e ** (y/x)


def volume_exemplo_3(x, y):
    "funcao usada no exemplo 3"
    def fx_z(x, y):
        "e^(y/x) d/dx  = e^(y/x) * (-y / x^2 )"
        return (math.e ** (y / x)) * (- y / x ** 2)

    def fy_z(x, y):
        "e^(y/x) d/dy  =  e^(y/x) / x"
        return (math.e ** (y / x)) / x

    return math.sqrt((fx_z(x, y) ** 2 + fy_z(x, y) ** 2 + 1))
