import fs from "fs";
import { generateNodes } from "./src/nodeHandler.js";
import { consoleInput } from "./src/utils/consoleInput.js";
import { search } from "./src/searchHandler.js";

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

/* Definindo inicio e fim */
const firstIndex = consoleInput("Digite o node inicial: ");
const finalIndex = consoleInput("Digite o node final: ");

/* Buscando caminho */
const [queue, cost] = search(nodes, firstIndex - 1, finalIndex - 1);

/* Imprimindo caminho */
console.log("QUEUE:");
queue.forEach((node) => {
	console.log(node.node_name);
});
console.log("FINAL COST: " + cost);
