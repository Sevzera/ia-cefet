import numpy as np

class NeuralNetwork:

    # Initialize the neural network 
    # Input: learning rate, number of hidden nodes per layer ([n1, n2, ...])
    def __init__(self, learning_rate) -> None:
        self.learning_rate = learning_rate        

    def sigmoid(x):
        return 1 / (1 + np.exp(-x))

    def step(x):
        return 1 if x >= 0 else 0
    
    def perceptron_step(self, max_it, inputs, targets):
        weights = []
        bias = []
        t = 1
        error = 1
        while t < max_it and error > 0:
            error = 0
            for i in range(len(inputs)):
                output = self.step(np.dot(weights, inputs[i]) + bias)
                error += abs(targets[i] - output)
                weights += self.learning_rate * (error) * inputs[i]
                bias += self.learning_rate * (error)
            t += 1
        return weights, bias

    def perceptron_sigmoid(self, max_it, inputs, targets):
        weights = []
        bias = []
        t = 1
        error = 1
        while t < max_it and error > 0:
            error = 0
            for i in range(len(inputs)):
                output = self.sigmoid(np.dot(weights, inputs[i]) + bias)
                error += abs(targets[i] - output)
                weights += self.learning_rate * (error) * inputs[i]
                bias += self.learning_rate * (error)
            t += 1
        return weights, bias