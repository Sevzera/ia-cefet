import numpy as np

class Individual:
    def __init__(self, x, y):
        self.x = x
        self.y = y
        self.fitness = None

    def __str__(self):
        return (
            "x: " + str(self.x) + "     " +
            "y: " + str(self.y) + "     " +
            "Fitness: " + str(self.fitness)
        )

    def calculateFitness(self, fitnessFunction):
        self.fitness = fitnessFunction(self.x, self.y)

    def tryToMutate(self, local_search, mutate_rate):
        if np.random.rand() < mutate_rate:
            xNeg = self.x - (self.x*local_search)
            xPos = self.x + (self.x*local_search)
            self.x = round(np.random.uniform(xNeg, xPos), 5)
        if np.random.rand() < mutate_rate:
            yNeg = self.y - (self.y*local_search)
            yPos = self.y + (self.y*local_search)
            self.y = round(np.random.uniform(yNeg, yPos), 5)
