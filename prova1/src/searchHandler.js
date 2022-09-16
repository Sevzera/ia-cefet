export const searchAstar = (nodes, start, end) => {
	const startNode = nodes[start];
	const finalNode = nodes[end];

	let pathCost = {}; // Array de custos
	pathCost[startNode.node_name] = 0;

	let openList = []; // Lista de nodes visitados e nao expandidos
	let closedList = []; // Lista de nodes visitados e expandidos

	openList.push(startNode);

	const asciiPrevA = 64;
	do {
		// Definindo o node atual
		console.log("Definindo o node atual...");
		let currentNode = openList[0];
		for (let i = 0; i < openList.length; i++) {
			let currentNodeF =
				pathCost[currentNode.node_name] + currentNode.h_distance;
			let openListF = pathCost[openList[i].node_name] + openList[i].h_distance;

			console.log(
				`	Comparando ${String.fromCharCode(
					asciiPrevA + currentNode.node_name
				)} com ${String.fromCharCode(asciiPrevA + openList[i].node_name)}`
			);
			console.log(
				`		Custo de ${String.fromCharCode(
					asciiPrevA + currentNode.node_name
				)}: ${currentNodeF} = custo (${
					pathCost[currentNode.node_name]
				}) + heuristica (${currentNode.h_distance})` +
					"\n" +
					`		Custo de ${String.fromCharCode(
						asciiPrevA + openList[i].node_name
					)}: ${openListF} = custo (${
						pathCost[openList[i].node_name]
					}) + heuristica (${openList[i].h_distance})`
			);

			if (openListF < currentNodeF) {
				console.log(
					`		${String.fromCharCode(
						asciiPrevA + openList[i].node_name
					)} tem menor custo que ${String.fromCharCode(
						asciiPrevA + currentNode.node_name
					)}`
				);
				currentNode = openList[i];
			}
		}

		// Removendo o node atual da lista de nodes nao expandidos e adicionando a lista de nodes expandidos
		openList = openList.filter((node) => node != currentNode);
		closedList.push(currentNode);
		console.log(
			`	${String.fromCharCode(
				asciiPrevA + currentNode.node_name
			)} removido da lista de nodes nao expandidos (OpenList) e adicionado a lista de nodes expandidos (ClosedList)`
		);

		console.log(
			`\nNode expandido atual: ${String.fromCharCode(
				asciiPrevA + currentNode.node_name
			)}`
		);

		// Verificando se o node atual eh o node final e retornando o caminho
		if (currentNode == finalNode) {
			console.log(
				`\n${String.fromCharCode(
					asciiPrevA + currentNode.node_name
				)} eh o node final! Retornando caminho...`
			);
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

		console.log(
			"Verificando os vizinhos do node atual e atualizando OpenList, ClosedList e Custos..."
		);

		// Expansao do node atual
		for (let i = 0; i < currentNode.neighbors.length; i++) {
			// Definindo o vizinho atual
			let neighbor = currentNode.neighbors[i];
			console.log(
				`	Vizinho atual: ${String.fromCharCode(
					asciiPrevA + neighbor.node.node_name
				)}`
			);
			// Verificando se o node vizinho nao esta na lista de nodes expandidos
			if (!closedList.includes(neighbor.node)) {
				// Verificando se o node vizinho nao esta na lista de nodes nao expandidos
				if (!openList.includes(neighbor.node)) {
					// Definindo o node atual como o pai do node vizinho
					neighbor.node.parent = currentNode;
					// Adicionando o node vizinho na lista de nodes nao expandidos
					openList.push(neighbor.node);
					// Definindo o custo do node vizinho
					pathCost[neighbor.node.node_name] =
						pathCost[currentNode.node_name] + neighbor.g_distance;
					console.log(
						`		${String.fromCharCode(
							asciiPrevA + neighbor.node.node_name
						)} adicionado a OpenList`
					);
				}
			}

			console.log(` 		Custo: ${pathCost[neighbor.node.node_name]}`);

			// Verificando se o custo do node vizinho eh maior que o custo do node atual + a distancia do node atual para o node vizinho
			if (
				pathCost[neighbor.node.node_name] >
				pathCost[currentNode.node_name] + neighbor.g_distance
			) {
				// Definindo o node atual como o pai do node vizinho
				neighbor.node.parent = currentNode;
				// Definindo o custo do node vizinho
				pathCost[neighbor.node.node_name] =
					pathCost[currentNode.node_name] + neighbor.g_distance;
				console.log(
					`		Custo do vizinho e pai atualizado! Custo: ${
						pathCost[neighbor.node.node_name]
					} -- Pai: ${String.fromCharCode(
						asciiPrevA + neighbor.node.parent.node_name
					)}`
				);

				// Verificando se o node vizinho esta na lista de nodes expandidos
				if (closedList.includes(neighbor.node)) {
					// Removendo o node vizinho da lista de nodes expandidos
					closedList = closedList.filter((node) => node != neighbor.node);
					console.log(
						`		${String.fromCharCode(
							asciiPrevA + neighbor.node.node_name
						)} removido de ClosedList`
					);

					// Adicionando o node vizinho na lista de nodes nao expandidos
					openList.push(neighbor.node);
					console.log(
						`		${String.fromCharCode(
							asciiPrevA + neighbor.node.node_name
						)} adicionado a OpenList`
					);
				}
			}
		}
		//console.log(pathCost);
		console.log("\n");
	} while (openList.length > 0);
};
