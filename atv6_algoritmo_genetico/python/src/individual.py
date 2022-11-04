import numpy as np

class Individual:
    def __init__(self, x, y):
        self.x = x
        self.y = y
        self.fitness = None
        self.mappedFitness = None

    def __str__(self):
        return (
            "x: " + str(self.x) + "     " +
            "y: " + str(self.y) + "     " +
            "Fitness: " + str(self.fitness) + "     " +
            "Mapped Fitness: " + str(self.mappedFitness)
        )

    def calculateFitness(self, fitnessFunction):
        self.fitness = fitnessFunction(self.x, self.y)

    def calculateMapFitness(self, linearMappingFunction, i, N):
        self.mappedFitness = linearMappingFunction(i, N)

    def tryToMutate(self, local_search):
        if np.random.rand() < 0.1:
            xNeg = self.x - (self.x*local_search)
            xPos = self.x + (self.x*local_search)
            self.x = round(np.random.uniform(xNeg, xPos), 5)
        if np.random.rand() < 0.1:
            yNeg = self.y - (self.y*local_search)
            yPos = self.y + (self.y*local_search)
            self.y = round(np.random.uniform(yNeg, yPos), 5)
