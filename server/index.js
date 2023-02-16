const express = require('express');
const cors = require('cors')
const port = 3000;

const {Graph, PathGenerator} = require('./Class/Graph');

const app = express();

app.use(express.json());
app.use(cors())

app.post('/paths', (req, res) => {
 try {
    const { data, startNode } = req.body;
    console.log("Request", req.body)

    if(!startNode) {
      startNode = 1
    }
  
    const graph = new Graph(data);
    const pathGenerator = new PathGenerator(graph);
    const paths = pathGenerator.getAllPathsFromNode(startNode);
  
    console.log("Paths", paths)
    res.json(paths);
 } catch (err) {
    console.log("Error",err.stack)
    res.status(500).json({
        message: err.message,
    })
 }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
