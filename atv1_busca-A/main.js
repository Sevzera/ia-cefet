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
// const firstIndex = consoleInput("Digite o node inicial: ");
// const currentNode = nodes[firstIndex - 1];
// const finalIndex = consoleInput("Digite o node final: ");
// const finalNode = nodes[finalIndex - 1];

const firstIndex = 6;
let currentNode = nodes[firstIndex - 1];
const finalIndex = 13;
const finalNode = nodes[finalIndex - 1];

currentNode.visited = true;
let currentCost = currentNode.heuristic[finalNode.node_name - 1];
let queue = [currentNode];
let border = currentNode.neighbours;
let leastCost = Number.MAX_SAFE_INTEGER;

while (currentNode != finalNode) {
	border.forEach((relation) => {
		const newCost =
			currentCost + relation.cost + relation.node.heuristic[finalIndex - 1];
		if (newCost < leastCost && !relation.node.visited) {
			leastCost = newCost;
			currentNode = relation.node;
		}
	});
	currentCost = leastCost;
	leastCost = Number.MAX_SAFE_INTEGER;

	console.log("BORDER BEFORE-------");
	border.forEach((relation) => {
		console.log(relation.node.node_name);
	});
	console.log("CHOSEN NODE: " + currentNode.node_name + ", NEIGHBOURS: ");
	currentNode.neighbours.forEach((relation) => {
		console.log(relation.node.node_name);
	});
	queue.push(currentNode);
	currentNode.visited = true;
	const newBorder = [...border, ...currentNode.neighbours].filter(
		(relation) => !relation.node.visited
	);
	border = newBorder;
	console.log("BORDER AFTER--------");
	border.forEach((relation) => {
		console.log(relation.node.node_name);
	});

	console.log("\n");
}
