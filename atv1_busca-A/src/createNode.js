const createNode = (heuristic) => {
	return {
		heuristic: [],
		real_distance: [],
		visited: false,


	};
};

export const generateNodes = (number_of_nodes, heuristic_data, real_distances_data) => {
	let nodes = [];
	for (let i = 0; i < number_of_nodes; i++) {
		nodes.push(createNode(heuristic_data[i], real_distances_data[i]));
	}
	return nodes;
};


