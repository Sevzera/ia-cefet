import sympy as sym
import numpy as np


class NeuralNetwork:

    # Initialize the neural network
    # Input: learning rate, number of hidden nodes per layer ([n1, n2, ...])
    def __init__(self, learning_rate) -> None:
        self.learning_rate = learning_rate

    def sigmoid(self, x):
        if len(x) > 1:
            biggest = 0
            matrix = []
            for i in range(len(x)):
                if x[i] > biggest:
                    biggest = x[i]
            for i in range(len(x)):
                if x[i] != biggest:
                    matrix.append(0)
                else:
                    matrix.append(1)
            return sym.Matrix(matrix)
        else:
            return 1 / (1 + np.exp(-x))

    def step(self, x):
        if len(x) > 1:
            return [1 if i >= 0 else 0 for i in x]
        else:
            return 1 if x >= 0 else 0

    def perceptron_test_step(self, input_t, target, w, b):
        correct = 0
        for i in range(len(input_t)):
            d_name = input_t[i][1]
            d = sym.Matrix([d for d in target if d[1] == d_name][0][0])

            x = (w * sym.Matrix(input_t[i][0])) + b
            # print ('x = ' + str(x))
            y = (sym.Matrix(self.step(sym.matrix2numpy(x))))

            e = d - y
            # print('e = ' + str(e) + ' d = ' + str(d) + ' y = ' + str(y))
            test = 0
            for err in e:
                if err != 0:
                    test = 1
            if test == 0:
                correct += 1
                print("CORRETO")

        N = len(input_t)
        correct_rate = (correct/N) * 100
        return correct, correct_rate

    def perceptron_step(self, max_it, inputs, targets):
        weights = [[np.random.uniform(0, 1) for i in range(
            len(inputs[0][0]))] for j in range(len(targets))]
        weights_M = sym.Matrix(weights)
        # print(weights, len(weights))

        bias = [np.random.uniform(0, 1) for j in range(len(targets))]
        bias_M = sym.Matrix(bias)
        # print(bias, len(bias))

        t = 0
        E = 1
        y = []
        e = []
        ve = []
        while (t < max_it and E > 0):
            E = 1
            for i in range(len(inputs)):
                x = sym.Matrix(inputs[i][0])
                d_name = inputs[i][1]
                d = sym.Matrix([d for d in targets if d[1] == d_name][0][0])
                # print('x = ' + str(x) + ' d = ' + str(d) + ' d_name = ' + str(d_name))

                x1 = (weights_M * x) + bias_M
                y.append(sym.Matrix(self.step(sym.matrix2numpy(x1))))
                # print('y = ' + str(y[i]))

                e.append(d - y[i])
                # print('e = ' + str(e[i]))

                update_w = self.learning_rate * (e[i] * x.T)
                weights_M = weights_M + update_w
                # print('weights = ' + str(weights_M))

                update_b = self.learning_rate * e[i]
                bias_M = bias_M + update_b
                # print('bias = ' + str(bias_M))

                for err in e[i]:
                    E = E + err*err
                # print('E = ' + str(E))

                # print("\n")
            ve.append(E)
            t += 1

        return weights_M, bias_M

    def perceptron_test_sigmoid(self, input_t, target, w, b):
        correct = 0
        for i in range(len(input_t)):
            d_name = input_t[i][1]
            d = sym.Matrix([d for d in target if d[1] == d_name][0][0])

            x = (w * sym.Matrix(input_t[i][0])) + b
            y = (sym.Matrix(self.sigmoid(sym.matrix2numpy(x))))

            e = d - y

            test = 0
            for err in e:
                if err != 0:
                    test = 1
            if test == 0:
                correct += 1

        N = len(input_t)
        correct_rate = (correct/N) * 100
        return correct, correct_rate

    def perceptron_sigmoid(self, max_it, inputs, targets):
        weights = [[np.random.uniform(0, 1) for i in range(
            len(inputs[0][0]))] for j in range(len(targets))]
        weights_M = sym.Matrix(weights)
        # print(weights, len(weights))

        bias = [np.random.uniform(0, 1) for j in range(len(targets))]
        bias_M = sym.Matrix(bias)
        # print(bias, len(bias))

        t = 0
        E = 1
        y = []
        e = []
        ve = []
        while (t < max_it and E > 0):
            E = 1
            for i in range(len(inputs)):
                x = sym.Matrix(inputs[i][0])
                d_name = inputs[i][1]
                d = sym.Matrix([d for d in targets if d[1] == d_name][0][0])
                # print('x = ' + str(x) + ' d = ' + str(d) + ' d_name = ' + str(d_name))

                x1 = (weights_M * x) + bias_M
                y.append(sym.Matrix(self.sigmoid(sym.matrix2numpy(x1))))
                # print('y = ' + str(y[i]))

                e.append(d - y[i])
                # print('e = ' + str(e[i]))

                update_w = self.learning_rate * (e[i] * x.T)
                weights_M = weights_M + update_w
                # print('weights = ' + str(weights_M))

                update_b = self.learning_rate * e[i]
                bias_M = bias_M + update_b
                # print('bias = ' + str(bias_M))

                for err in e[i]:
                    E = E + err*err
                # print('E = ' + str(E))

                # print("\n")
            ve.append(E)
            t += 1

        return weights_M, bias_M
