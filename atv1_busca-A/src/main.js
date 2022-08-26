import { readCSV } from './utils/csvReader';

import readline from 'readline';

const input = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

let finalIndex;
input.question("Digite o índice final: ", (answer) => {
	finalIndex = parseInt(answer);
	input.close();
});

let initialIndex;
input.question("Digite o índice inicial: ", (answer) => {
    initialIndex = parseInt(answer);
    input.close();
});

console.log(finalIndex);

const heuristics_data = readCSV("heuristics.csv");
const real_distances_data = readCSV("real_distances.csv");
