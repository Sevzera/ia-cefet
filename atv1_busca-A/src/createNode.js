const createNode = (heuristic) => {
	return {
		heuristic,
		neighbors: [],
		visited: false,
	};
};
