import pandas as pd

from NeuralNetwork import NeuralNetwork

def define_train_test(df):
    d_label = df[6].unique()
    x_dh = df.loc[df[6] == d_label[0], 0:5].values
    x_sl = df.loc[df[6] == d_label[1], 0:5].values
    x_n = df.loc[df[6] == d_label[2], 0:5].values

    x_train_dh_size = int(len(x_dh) * 0.7)
    x_train_sl_size = int(len(x_sl) * 0.7)
    x_train_n_size = int(len(x_n) * 0.7)

    x_train_dh = x_dh[0:x_train_dh_size]
    x_train_sl = x_sl[0:x_train_sl_size]
    x_train_n = x_n[0:x_train_n_size]

    x_test_dh = x_dh[x_train_dh_size:]
    x_test_sl = x_sl[x_train_sl_size:]
    x_test_n = x_n[x_train_n_size:]

    x_train = []
    x_train.extend(x_train_dh)
    x_train.extend(x_train_sl)
    x_train.extend(x_train_n)

    x_test = []
    x_test.extend(x_test_dh)
    x_test.extend(x_test_sl)
    x_test.extend(x_test_n)

    return x_train, x_test

def main():
    df_path = 'data/'
    df = pd.read_csv(df_path + 'column_3C.dat', sep=' ', header=None)
    # print(df)
    
    x_train, x_test = define_train_test(df)

    d_target_name = df[6].unique()
    d_target = []
    for i in reversed(range(d_target_name.size)):
        aux = []
        for j in reversed(range(d_target_name.size)):
            if(i == j): aux.append(1)
            else: aux.append(0)
        d_target.append( [aux, d_target_name[i]] )
    # print(d_target)

    rna = NeuralNetwork(0.1)

    weight_step, bias_step = rna.perceptron_step(10, x_train, d_target)
    print('weight_step = ' + str(weight_step))
    print('bias_step = ' + str(bias_step))
    correct_step, correct_rate_step = rna.perceptron_test_step(x_train, d_target, weight_step, bias_step)
    print('correct_step = ' + str(correct_step))
    print('correct_rate_step = ' + str(correct_rate_step))

    print('\n')

    weight_sigmoid, bias_sigmoid = rna.perceptron_sigmoid(10, x_test, d_target)
    print('weight_sigmoid = ' + str(weight_sigmoid))
    print('bias_sigmoid = ' + str(bias_sigmoid))
    correct_sigmoid, correct_rate_sigmoid = rna.perceptron_test_sigmoid(x_test, d_target, weight_sigmoid, bias_sigmoid)
    print('correct_sigmoid = ' + str(correct_sigmoid))
    print('correct_rate_sigmoid = ' + str(correct_rate_sigmoid))

    pass

if __name__ == '__main__':
    main()