import pandas as pd

from NeuralNetwork import NeuralNetwork

def main():
    df_path = 'data/'
    df = pd.read_csv(df_path + 'column_3C.dat', sep=' ', header=None)
    # print(df)

    d_target_name = df[6].unique()
    d_target = []
    for i in reversed(range(d_target_name.size)):
        aux = []
        for j in reversed(range(d_target_name.size)):
            if(i == j): aux.append(1)
            else: aux.append(0)
        d_target.append( [aux, d_target_name[i]] )
    # print(d_target)

    x_input_df = df.iloc[:, 0:6].values
    x_input = []
    for i in range(len(x_input_df)):
        x_input.append( [x_input_df[i].tolist(), df[6][i]] )
    # print(x_input)

    rna = NeuralNetwork(0.1)

    weight_step, bias_step = rna.perceptron_step(10, x_input, d_target)
    print('weight_step = ' + str(weight_step))
    print('bias_step = ' + str(bias_step))
    correct_step, correct_rate_step = rna.perceptron_test_step(x_input, d_target, weight_step, bias_step)
    print('correct_step = ' + str(correct_step))
    print('correct_rate_step = ' + str(correct_rate_step))

    print('\n')

    weight_sigmoid, bias_sigmoid = rna.perceptron_step(10, x_input, d_target)
    print('weight_sigmoid = ' + str(weight_sigmoid))
    print('bias_sigmoid = ' + str(bias_sigmoid))
    correct_sigmoid, correct_rate_sigmoid = rna.perceptron_test_step(x_input, d_target, weight_sigmoid, bias_sigmoid)
    print('correct_sigmoid = ' + str(correct_sigmoid))
    print('correct_rate_sigmoid = ' + str(correct_rate_sigmoid))

    pass

if __name__ == '__main__':
    main()