import { readCSV } from "./utils/csvReader.js";
import readline from 'readline';

const input = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

const finalIndex = input.question('Digite o índice final: ', (answer) => {
    return parseInt(answer);
});

console.log(finalIndex);

const heuristics_data = readCSV("heuristics.csv");
const real_distances_data = readCSV("real_distances.csv");
