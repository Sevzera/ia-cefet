class Chromosome:
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

    def calculateFitness (self,fitnessFunction):
        self.fitness = fitnessFunction(self.x, self.y)

    def calculateMapFitness (self, linearMappingFunction, i, N):
        self.mappedFitness = linearMappingFunction(i, N)