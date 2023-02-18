const { Graph, PathGenerator } = require("../class/Graph");
const ErrorResponse = require('../lib/error-response')

const generatePaths = (req, res) => {
    try {
        const { data, startNode } = req.body;
        console.log("Request", req.body)

        const graph = new Graph(data);
        const pathGenerator = new PathGenerator(graph);
        const paths = pathGenerator.getAllPathsFromNode(startNode);

        const result = {
          success: true,
          message: 'Path Generated',
          paths,
          graph: graph.adjacencyList
        }
        res.json(result);
    } catch (error) {
        ErrorResponse(error, res)
    }
}

const addNode = (req, res) => {
    const { key, value, dag } = req.body;

    try {
      const graph = new Graph(dag);
      const updatedGraph = graph.addNode(key, value);
      const result = {
        success: true,
        message: `Node ${key} added successfully`,
        graph: updatedGraph
      }
      res.json(result);
    } catch (error) {
      ErrorResponse(error, res)
    }
}

const updateNode = (req, res) => {
  const { key } = req.params;
  const { value, dag } = req.body;

  try {
    const graph = new Graph(dag);
    const updatedGraph = graph.updateNode(key, value);
    const result = {
      success: true,
      message: `Node ${key} updated successfully`,
      graph: updatedGraph
    }
    res.json(result);
  } catch (error) {
    ErrorResponse(error, res)
  }
}

const deleteNode = (req, res) => {
  const { key } = req.params;
  const { dag } = req.body;

  try {
    const graph = new Graph(dag);
    const updatedGraph = graph.deleteNode(key);
    const result = {
      success: true,
      message: `Node ${key} deleted successfully`,
      graph: updatedGraph
    }
    res.json(result);
  } catch (error) {
    ErrorResponse(error, res)
  }
}

module.exports = {
    generatePaths,
    addNode,
    updateNode,
    deleteNode
}