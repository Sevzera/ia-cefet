import fs from "fs";
import { generateNodes } from "./nodeHandler.js";
import { consoleInput } from "./utils/consoleInput.js";
import { searchAstar } from "./searchHandler.js";

	/* Importando dados externos */
const heuristics_data = await JSON.parse(
	fs.readFileSync("./data/heuristics.json", "utf-8")
);
const real_distances_data = await JSON.parse(
	fs.readFileSync("./data/real-distances.json", "utf-8")
);

	/* Definindo nodes */
const nodes = generateNodes(
	real_distances_data.length,
	heuristics_data,
	real_distances_data
);
console.log(nodes);

	/* Definindo inicio e fim */
// const firstIndex = consoleInput("Digite o node inicial: ");
// const finalIndex = consoleInput("Digite o node final: ");

	/* Buscando caminho */
// const [queue, cost] = search(nodes, firstIndex - 1, finalIndex - 1);

// const path = searchAstar(nodes, firstIndex - 1, finalIndex - 1);

	/* Imprimindo caminho */
// console.log("QUEUE:");
// queue.forEach((node) => {
// 	console.log(node.node_name);
// });
// console.log(queue);
// console.log("FINAL COST: " + cost);

// let total_distance = 0;
// path.forEach((node) => { 
// 	for (let i = 0; i < node.neighbors.length; i++) {
// 		if (node.neighbors[i].node == path[path.indexOf(node) + 1]) {
// 			total_distance += node.neighbors[i].g_distance;
// 		}
// 	}
// });

// console.log(`\nPATH: ${path.map((node) => node.node_name)} -- TOTAL DISTANCE: ${total_distance}\n`);
