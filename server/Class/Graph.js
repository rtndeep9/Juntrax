class Graph {
  constructor(data) {
    this.adjacencyList = {};
    for (let key in data) {
      this.adjacencyList[key] = data[key];
    }
  }
}


class PathGenerator {
  constructor(graph) {
    this.graph = graph;
  }

  getAllPathsFromNode(startNode) {

    if(!this.graph.adjacencyList[startNode]) {
      throw new Error(`Node ${startNode} has no path or it does not exists in the graph`);
    }

    const stack = [[startNode]];
    const paths = [];

    while (stack.length > 0) {
      const path = stack.pop();
      const node = path[path.length - 1];

      if (!this.graph.adjacencyList[node]) {
        paths.push(path);
      } else {
        for (let child of this.graph.adjacencyList[node]) {
          stack.push([...path, child]);
        }
      }
    }

    return paths;
  }
}


module.exports = { Graph, PathGenerator };