import fs from "fs";
import { generateNodes } from "./nodeHandler.js";
import { consoleInput } from "./utils/consoleInput.js";

    /* Importando dados externos */
const heuristics_data = await JSON.parse(
  fs.readFileSync("../data/heuristics_2.json", "utf-8")
);
const real_distances_data = await JSON.parse(
  fs.readFileSync("../data/real-distances_2.json", "utf-8")
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
// 	node.neighbours.forEach((value, neighbours) => { console.log(neighbours.node_name, value);});
// 	console.log("\n");
// });

    /* Definindo inicio e fim */
const firstIndex = consoleInput("Digite o node inicial: ");
const finalIndex = consoleInput("Digite o node final: ");
