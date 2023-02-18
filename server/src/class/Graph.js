const ErrorMessage = require("../lib/error-message")

class Graph {
  constructor(data) {
    this.adjacencyList = {};
    for (let key in data) {
      this.adjacencyList[key] = data[key];
    }
  }

  updateNode(key, newValue) {
    if (!this.adjacencyList[key]) {
      throw new ErrorMessage(200, `Node ${key} does not exist in the graph`)
    }
    this.adjacencyList[key] = newValue;
    return this.adjacencyList
  }

  addNode(key, value) {
    if (this.adjacencyList[key]) {
      throw new ErrorMessage(200, `Node ${key} already exists in the graph`)
    }
    this.adjacencyList[key] = value;
    return this.adjacencyList
  }

  deleteNode(key) {
    if (!this.adjacencyList[key]) {
      throw new ErrorMessage(200, `Node ${key} does not exist in the graph`)
    }
    delete this.adjacencyList[key];
    for (let k in this.adjacencyList) {
      let index = this.adjacencyList[k].indexOf(key);
      if (index !== -1) {
        this.adjacencyList[k].splice(index, 1);
      }
    }
    return this.adjacencyList
  }
}


class PathGenerator {
  constructor(graph) {
    this.graph = graph;
  }

  getAllPathsFromNode(startNode) {

    if(!this.graph.adjacencyList[startNode]) {
      throw new ErrorMessage(200, `Node ${startNode} has no path or it does not exists in the graph`);
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