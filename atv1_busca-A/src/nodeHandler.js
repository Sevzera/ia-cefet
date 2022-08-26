const createNode = (node_name, heuristic, real_distance) => {
  return {
    node_name: node_name,
    heuristic: heuristic,
    real_distance: real_distance,
    neighbours: new Map(),
    visited: false,

    setNeighbours: function (nodes) {
      for (let i = 0; i < real_distance.length; i++) {
        if (real_distance[i] != 0) {
          this.neighbours.set(nodes[i], [
            real_distance[i],
            heuristic[i],
            Number((real_distance[i] + heuristic[i]).toFixed(1)),
          ]);
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
  for (let i = 0; i < number_of_nodes; i++) {
    nodes.push(createNode(i + 1, heuristic_data[i], real_distances_data[i]));
  }
  nodes.forEach((node) => {
    node.setNeighbours(nodes);
  });
  return nodes;
};
