import random
import pandas as pd

from NeuralNetwork import NeuralNetwork

def define_train_test(df):
    d_label = df[6].unique()
    x_dh_aux = df.loc[df[6] == d_label[0], 0:5].values
    x_sl_aux = df.loc[df[6] == d_label[1], 0:5].values
    x_no_aux = df.loc[df[6] == d_label[2], 0:5].values

    x_dh = []
    for i in range(len(x_dh_aux)):
        x_dh.append([x_dh_aux[i], 'DH'])
    
    x_sl = []
    for i in range(len(x_sl_aux)):
        x_sl.append([x_sl_aux[i], 'SL'])
    
    x_no = []
    for i in range(len(x_no_aux)):
        x_no.append([x_no_aux[i], 'NO'])
    
    x_total = []
    x_total.extend(x_dh)
    x_total.extend(x_sl)
    x_total.extend(x_no)
    random.shuffle(x_total)

    size_train = int(len(x_total) * 0.7)

    x_test = []
    x_train = []
    x_train = x_total[:size_train]
    x_test = x_total[size_train:]

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

    # x_input_df = df.iloc[:, 0:6].values
    # x_input = []
    # for i in range(len(x_input_df)):
    #     x_input.append( [x_input_df[i].tolist(), df[6][i]] )
    # # print(x_input)


    rna = NeuralNetwork(0.1)

    weight_step, bias_step = rna.perceptron_step(100, x_train, d_target)
    print('weight_step = ' + str(weight_step))
    print('bias_step = ' + str(bias_step))
    correct_step, correct_rate_step = rna.perceptron_test_step(x_test, d_target, weight_step, bias_step)
    print('correct_step = ' + str(correct_step))
    print('correct_rate_step = ' + str(correct_rate_step))

    print('\n')

    weight_sigmoid, bias_sigmoid = rna.perceptron_sigmoid(100, x_train, d_target)
    print('weight_sigmoid = ' + str(weight_sigmoid))
    print('bias_sigmoid = ' + str(bias_sigmoid))
    correct_sigmoid, correct_rate_sigmoid = rna.perceptron_test_sigmoid(x_test,3
     d_target, weight_sigmoid, bias_sigmoid)
    print('correct_sigmoid = ' + str(correct_sigmoid))
    print('correct_rate_sigmoid = ' + str(correct_rate_sigmoid))

    pass

if __name__ == '__main__':
    main()