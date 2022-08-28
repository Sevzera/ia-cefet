export const search = (nodes, start, end) => {
	const finalNode = nodes[end];
	let currentNode = nodes[start];
	currentNode.visited = true;

	let pathCost = 0;
	let leastCost = Number.MAX_SAFE_INTEGER;
	let queue = [currentNode];
	let border = currentNode.neighbours;

	do {
		border.forEach((relation) => {
			const newCost = pathCost + relation.cost;
			const heuristicCost = newCost + relation.node.heuristic[end];
			if (heuristicCost < leastCost && !relation.node.visited) {
				leastCost = heuristicCost;
				currentNode = relation.node;
			}
		});
		pathCost = leastCost - currentNode.heuristic[end];
		leastCost = Number.MAX_SAFE_INTEGER;
		currentNode.visited = true;
		queue.push(currentNode);
		let newBorder = [
			...border,
			...currentNode.neighbours.filter((relation) => !relation.node.visited),
		];
		border = newBorder;
	} while (currentNode != finalNode);
	return [queue, pathCost];
};
