const createNode = (node_name, heuristic, real_distance) => {
	return {
		node_name: node_name,
		h_distance: heuristic,
		real_distance: real_distance,
		neighbors: [],
		visited: false,
        parent: null,

		setNeighbors: function (nodes) {
			for (let i = 0; i < real_distance.length; i++) {
				if (real_distance[i] != 0) {
					this.neighbors.push({
						node: nodes[i],
						g_distance: real_distance[i]
					});
				}
			}
		},
	};
};

export const generateNodes = (
	number_of_nodes,
	heuristic_data,
	real_distances_data
) => {
	let nodes = [];
	let asciiA = ('A').charCodeAt(0);
	for (let i = 0; i < number_of_nodes; i++) {
		nodes.push(createNode(i+1, heuristic_data[0][i], real_distances_data[i]));
	}
	nodes.forEach((node) => {
		node.setNeighbors(nodes);
	});
	return nodes;
};