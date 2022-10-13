import numpy as np

class NeuralNetwork:

    # Initialize the neural network 
    # Input: learning rate, number of hidden nodes per layer ([n1, n2, ...])
    def __init__(self, learning_rate) -> None:
        self.learning_rate = learning_rate        

    def sigmoid(self, x):
        return 1 / (1 + np.exp(-x))

    def step(self, x):
        # print(x)
        return 1 if x >= 0 else 0
    
    def perceptron_step(self, max_it, inputs, targets):
        weights = []
        for i in range(len(inputs)):
            weights.append([np.random.uniform(-1, 1) for i in range(len(inputs[i][0]))])
        # print(weights, len(weights))
        
        bias = []
        for i in range(len(inputs)):
            bias.append(np.random.uniform(-1, 1))
        # print(bias, len(bias))

        t = 0
        E = 1
        while (t < max_it and E > 0):
            E = 1
            for i in range(len(inputs)):
                x = inputs[i][0]                
                d_name = inputs[i][1]
                d = [d for d in targets if d[1] == d_name][0][0]
                
                x1 = np.dot(x, weights[i]) + bias[i]
                y = self.step(x1)
            t += 1

        return weights, bias
       