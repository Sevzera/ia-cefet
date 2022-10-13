import pandas as pd

def main():
    df_path = 'data/'
    df = pd.read_csv(df_path + 'column_3C.dat', sep=' ', header=None)
    print(df)
    pass

if __name__ == '__main__':
    main()