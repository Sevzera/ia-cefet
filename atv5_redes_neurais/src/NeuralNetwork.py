import numpy as np

class NeuralNetwork:

    # Initialize the neural network 
    # Input: learning rate, number of hidden nodes per layer ([n1, n2, ...])
    def __init__(self, learning_rate) -> None:
        self.learning_rate = learning_rate        

    def sigmoid(self, x):
        return 1 / (1 + np.exp(-x))

    def step(self, x):
        print(x)
        return 1 if x >= 0 else 0
    
    def perceptron_step(self, max_it, inputs, targets):
        weights = []
        for i in range(len(inputs)):
            weights.append(np.array([np.random.uniform(-1, 1) for i in range(len(inputs[i][0]))]))
        # print(weights, len(weights))
        
        bias = []
        for i in range(len(inputs)):
            bias.append(np.array([np.random.uniform(-1, 1) for i in range(len(inputs[i][0]))]))
        # print(bias, len(bias))

        # t = 0
        # error = 1
        # while (t < max_it and error > 0):
        #     error = 1
        #     for i in range(len(inputs)):
        #         x = inputs[i][0]                
        #         d_name = inputs[i][1]
        #         d = [d for d in targets if d[1] == d_name][0][0]
        #         print(d)
                
        #         x1 = np.dot(x, weights) + bias
        #         y = self.step(x1)
        #         # print("y = " + str(y))
        #         # print("calc = " + str(x1))
                
        #         # error += d - y
        #         # weights += self.learning_rate * error * np.transpose(x)
        #         # bias += self.learning_rate * error * 1
        #     t += 1

        return weights, bias
       