import { readCSV } from './utils/csvReader.js';
import { generateNodes } from './createNode.js';
import readline from 'readline';

const heuristics_data = await readCSV("heuristics.csv");
const real_distances_data = await readCSV("real-distances.csv");
console.log(heuristics_data, real_distances_data);
const nodes = generateNodes(heuristics_data.length, heuristics_data, real_distances_data);
console.log(nodes);




// const input = readline.createInterface({
// 	input: process.stdin,
// 	output: process.stdout,
// });

// let finalIndex;
// input.question("Digite o índice final: ", (answer) => {
// 	finalIndex = parseInt(answer);
// 	input.close();
// });
// console.log(finalIndex);
