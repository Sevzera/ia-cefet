import fs from "fs";
import { generateNodes } from "./nodeHandler.js";


const heuristics_data = await JSON.parse(
	fs.readFileSync("../data/heuristics_2.json", "utf-8")
);
const real_distances_data = await JSON.parse(
	fs.readFileSync("../data/real-distances_2.json", "utf-8")
);

const nodes = generateNodes(
	heuristics_data.length,
	heuristics_data,
	real_distances_data
);
// console.log(nodes);
nodes.forEach((node) => { 
	console.log(node.node_name + " --> Vizinhos:");
	node.neighbours.forEach((value, neighbours) => { console.log(neighbours.node_name, value);});
	console.log("\n");
});

// let finalIndex;
// input.question("Digite o índice final: ", (answer) => {
// 	finalIndex = parseInt(answer);
// 	input.close();
// });

// console.log(finalIndex);
