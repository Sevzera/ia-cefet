export const searchAstart = (nodes, start, end, pathCost, currentNode, border, queue) => {
    const startNode = nodes[start]
    const finalNode = nodes[end];
    
    if (border == null && queue == null && currentNode == null) {
        currentNode = startNode;
        queue = [];
        queue.push(currentNode);
        border = nodes[start].neighbours;
    }
    currentNode.visited = true;
    
    let leastCost = Number.MAX_SAFE_INTEGER;
    let newCurrentNode = currentNode;
    if (currentNode != finalNode) {
        border.forEach((borderNode) => { 
            const newCost = pathCost + borderNode.cost;
            const heuristicCost = newCost + borderNode.node.heuristic[end];
            if (heuristicCost < leastCost && !borderNode.node.visited) {
                leastCost = heuristicCost;
                newCurrentNode = borderNode.node;
            }
        });
        pathCost = leastCost - newCurrentNode.heuristic[end];
        let newQueue = queue;
        newQueue.push(newCurrentNode);
        let newBorder = [
            ...border,
            ...newCurrentNode.neighbours.filter((neighboursNode) => !neighboursNode.node.visited),
        ]
        let resultQueue;
        let resultPathCost;
        [resultQueue, resultPathCost] = searchAstart(nodes, start, end, pathCost, newCurrentNode, newBorder, newQueue);
        return [resultQueue, resultPathCost];
    }
    return [queue, pathCost];
    
    


}