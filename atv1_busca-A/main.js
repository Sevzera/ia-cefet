import fs from "fs";
import { generateNodes } from "./src/nodeHandler.js";
import { consoleInput } from "./src/utils/consoleInput.js";

/* Importando dados externos */
const heuristics_data = await JSON.parse(
	fs.readFileSync("./data/heuristics_2.json", "utf-8")
);
const real_distances_data = await JSON.parse(
	fs.readFileSync("./data/real-distances_2.json", "utf-8")
);

/* Definindo nodes */
const nodes = generateNodes(
	heuristics_data.length,
	heuristics_data,
	real_distances_data
);
// console.log(nodes);
// nodes.forEach((node) => {
// 	console.log(node.node_name + " --> Vizinhos:");
// 	node.neighbours.forEach((value, neighbours) => {
// 		console.log(neighbours.node_name, value);
// 	});
// 	console.log("\n");
// });

/* Definindo inicio e fim */
const firstIndex = consoleInput("Digite o node inicial: ");
let currentNode = nodes[firstIndex - 1];
const finalIndex = consoleInput("Digite o node final: ");
const finalNode = nodes[finalIndex - 1];

currentNode.visited = true;
let currentCost = 0;
let queue = [currentNode];
let border = currentNode.neighbours;
let leastCost = Number.MAX_SAFE_INTEGER;

while (currentNode != finalNode) {
	border.forEach((relation) => {
		const newCost = currentCost + relation.cost;
		const heuristicCost = newCost + relation.node.heuristic[finalIndex - 1];
		if (heuristicCost < leastCost && !relation.node.visited) {
			leastCost = heuristicCost;
			currentNode = relation.node;
		}
	});
	queue.push(currentNode);
	currentNode.visited = true;
	currentCost = leastCost - currentNode.heuristic[finalIndex - 1];
	leastCost = Number.MAX_SAFE_INTEGER;
	let newBorder = [...border, ...currentNode.neighbours].filter(
		(relation) => !relation.node.visited
	);
	border = newBorder;
}
console.log("\n");
console.log("QUEUE:");
queue.forEach((node) => {
	console.log(node.node_name);
});
console.log("FINAL COST: " + currentCost);
console.log("\n");

// console.log("BORDER BEFORE-------");
// border.forEach((relation) => {
// 	console.log(relation.node.node_name);
// });
// console.log("CHOSEN NODE: " + currentNode.node_name + ", NEIGHBOURS: ");
// currentNode.neighbours.forEach((relation) => {
// 	console.log(relation.node.node_name);
// });

// console.log("BORDER AFTER--------");
// border.forEach((relation) => {
// 	console.log(relation.node.node_name);
// });
