import numpy as np
import matplotlib.pyplot as plt

from Individual import Individual

# Definindo variaveis globais
MAX_IT = 50
N = 50
N1 = 50
N2 = 0
BETA = 0.1
NC = BETA * N #  Define o número de clones a ser gerado para cada anticorpo
RO = 0.1 # Parâmetro da equação de mutação
MUTATION_RATE = 0.1 # Taxa de mutação

def fitnessFunction(x, y):
    result = (
        np.sin(x) * np.exp((1 - np.cos(y))**2) +
        np.cos(y) * np.exp((1 - np.sin(x))**2) +
        (x - y)**2
    )
    return round(result, 2)

def cloneAntibodies(P):
    C = []
    for p in P:
        for i in range(int(NC)):
            r = Individual(p.x, p.y)
            C.append(r)
    return C

def generateIndividuals():
    S = []
    for i in range(N):
        S.append(Individual(np.random.uniform(-10, 10), np.random.uniform(-10, 10)))
    return S

def clonalgOPT():
    P = generateIndividuals()
    t = 1
    while t <= MAX_IT:
        for p in P:
            p.calculateFitness(fitnessFunction)
        P.sort(key=lambda x: x.fitness, reverse=True)
        P1 = P[:N1]
        C = cloneAntibodies(P1)
        for c in C:
            c.tryToMutate(RO, MUTATION_RATE)
            c.calculateFitness(fitnessFunction)
        C.sort(key=lambda x: x.fitness, reverse=False)
        P2 = C[:N1]
        P = P2
        t = t + 1
    return P

antibody_population = clonalgOPT()
print("Best solution: ", antibody_population[0])