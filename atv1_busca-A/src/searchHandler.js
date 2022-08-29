export const search = (nodes, start, end) => {
	const startNode = nodes[start]
	const finalNode = nodes[end];
	
	let pathCost = {}; // Array de custos
	pathCost[startNode.node_name] = 0;
	
	let openList = [];	 // Lista de nodes visitados e nao expandidos
	let closedList = []; // Lista de nodes visitados e expandidos

	openList.push(startNode);

	do {
		// Definindo o node atual
		console.log("Definindo o node atual...");
		let currentNode = openList[0];
		for (let i = 0; i < openList.length; i++) {
			let currentNodeF = pathCost[currentNode.node_name] + currentNode.h_distance[end];
			let openListF = pathCost[openList[i].node_name] + openList[i].h_distance[end];
			console.log(`	Comparando ${currentNode.node_name} com ${openList[i].node_name}`);
			console.log(`		Custo de ${currentNode.node_name}: ${currentNodeF} = custo (${pathCost[currentNode.node_name]}) + heuristica (${currentNode.h_distance[end]})` +
				"\n"+
				`		Custo de ${openList[i].node_name}: ${openListF} = custo (${pathCost[openList[i].node_name]}) + heuristica (${openList[i].h_distance[end]})`
			);
			if (openListF < currentNodeF) {
				console.log(`		${openList[i].node_name} tem menor custo que ${currentNode.node_name}`);
				currentNode = openList[i];
			}
		}

		// Removendo o node atual da lista de nodes nao expandidos e adicionando a lista de nodes expandidos
		openList = openList.filter((node) => node != currentNode);
		closedList.push(currentNode);
		
		console.log(`\nNode expandido atual: ${currentNode.node_name}`);

		// Verificando se o node atual eh o node final
		if (currentNode == finalNode) {
			let path = [];
			let node = currentNode;
			while (node != startNode) {
				path.push(node);
				node = node.parent;
			}
			path.push(startNode);
			path.reverse();
			return path;
		}

		// Expansao do node atual
		for (let i = 0; i < currentNode.neighbors.length; i++) {
			
			let neighbor = currentNode.neighbors[i]; // Definindo o vizinho atual
			console.log(`	Vizinho atual: ${neighbor.node.node_name}`);
			
			if (!closedList.includes(neighbor.node)) { // Verificando se o node vizinho nao esta na lista de nodes expandidos
				if (!openList.includes(neighbor.node)) { // Verificando se o node vizinho nao esta na lista de nodes nao expandidos
					neighbor.node.parent = currentNode; // Definindo o node atual como o pai do node vizinho
					openList.push(neighbor.node); // Adicionando o node vizinho na lista de nodes nao expandidos
					pathCost[neighbor.node.node_name] = pathCost[currentNode.node_name] + neighbor.g_distance; // Definindo o custo do node vizinho
				}
			}

			console.log(` 		Custo: ${pathCost[neighbor.node.node_name]}`);
			
			if (pathCost[neighbor.node.node_name] > pathCost[currentNode.node_name] + neighbor.g_distance) { // Verificando se o custo do node vizinho eh maior que o custo do node atual + a distancia do node atual para o node vizinho
				neighbor.node.parent = currentNode; // Definindo o node atual como o pai do node vizinho
				pathCost[neighbor.node.node_name] = pathCost[currentNode.node_name] + neighbor.g_distance; // Definindo o custo do node vizinho
				console.log(`		Custo do vizinho e pai atualizado! Custo: ${pathCost[neighbor.node.node_name]} -- Pai: ${neighbor.node.parent.node_name}`);
				if (closedList.includes(neighbor.node)) { // Verificando se o node vizinho esta na lista de nodes expandidos
					closedList = closedList.filter((node) => node != neighbor.node); // Removendo o node vizinho da lista de nodes expandidos
					openList.push(neighbor.node); // Adicionando o node vizinho na lista de nodes nao expandidos
				}
			}

		}
		//console.log(pathCost);
		console.log("\n");
	} while (openList.length > 0);
};
