const { Graph, PathGenerator } = require("../class/Graph");

const generatePaths = (req, res) => {
    try {
        const { data, startNode } = req.body;
        console.log("Request", req.body)

        if (!startNode) {
            startNode = 1
        }

        const graph = new Graph(data);
        const pathGenerator = new PathGenerator(graph);
        const paths = pathGenerator.getAllPathsFromNode(startNode);

        console.log("Paths", paths)
        res.json({
            paths,
            graph: graph.adjacencyList
        });
    } catch (err) {
        console.log("Error", err.stack)
        res.status(500).json({
            message: err.message,
        })
    }
}

const addNode = (req, res) => {
    const { key, value, dag } = req.body;

    try {
      const graph = new Graph(dag);
      const updatedGraph = graph.addNode(key, value);
      res.status(200).json({ message: `Node ${key} added successfully`, graph: updatedGraph });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
}

const updateNode = (req, res) => {
  const { key } = req.params;
  const { value, dag } = req.body;

  try {
    const graph = new Graph(dag);
    const updatedGraph = graph.updateNode(key, value);
    res.status(200).json({ message: `Node ${key} updated successfully`, graph: updatedGraph });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}

const deleteNode = (req, res) => {
  const { key } = req.params;
  const { dag } = req.body;

  try {
    const graph = new Graph(dag);
    const updatedGraph = graph.deleteNode(key);
    res.status(200).json({ message: `Node ${key} deleted successfully`, graph: updatedGraph });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
    generatePaths,
    addNode,
    updateNode,
    deleteNode
}