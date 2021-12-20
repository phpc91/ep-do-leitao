import math

LEGENDRE = {
    "grau3": {
        "raizes": [-math.sqrt(0.6), 0, math.sqrt(0.6)],
        "coeficientes": [5 / 9, 8 / 9, 5 / 9],
    },
    "grau6": {
        "raizes": [
            - 0.9324695142031520278123016,
            -0.6612093864662645136613996,
            -0.2386191860831969086305017,
            0.2386191860831969086305017,
            0.6612093864662645136613996,
            0.9324695142031520278123016,
        ],
        "coeficientes": [
            0.1713244923791703450402961,
            0.3607615730481386075698335,
            0.4679139345726910473898703,
            0.4679139345726910473898703,
            0.3607615730481386075698335,
            0.1713244923791703450402961,
        ],
    },
    "grau8": {
        "raizes": [
            -0.9602898564975362316835609,
            -0.7966664774136267395915539,
            -0.5255324099163289858177390,
            -0.1834346424956498049394761,
            0.1834346424956498049394761,
            0.5255324099163289858177390,
            0.7966664774136267395915539,
            0.9602898564975362316835609,
        ],
        "coeficientes": [
            0.1012285362903762591525314,
            0.2223810344533744705443560,
            0.3137066458778872873379622,
            0.3626837833783619829651504,
            0.3626837833783619829651504,
            0.3137066458778872873379622,
            0.2223810344533744705443560,
            0.1012285362903762591525314,
        ],
    },
    "grau10": {
        "raizes": [
            -0.9739065285171717200779640,
            -0.8650633666889845107320967,
            -0.6794095682990244062343274,
            -0.4333953941292471907992659,
            -0.1488743389816312108848260,
            0.1488743389816312108848260,
            0.4333953941292471907992659,
            0.6794095682990244062343274,
            0.8650633666889845107320967,
            0.9739065285171717200779640,
        ],
        "coeficientes": [
            0.0666713443086881375935688,
            0.1494513491505805931457763,
            0.2190863625159820439955349,
            0.2692667193099963550912269,
            0.2955242247147528701738930,
            0.2955242247147528701738930,
            0.2692667193099963550912269,
            0.2190863625159820439955349,
            0.1494513491505805931457763,
            0.0666713443086881375935688,
        ],
    }
}
