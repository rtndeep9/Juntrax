const express = require('express');
const router = express.Router()
const { generatePaths, addNode, updateNode, deleteNode } = require('../controller/controller');

//Get all possible path 
router.post('/paths', generatePaths);

//Add node
router.post('/graph/nodes', addNode);

//Update node
router.put('/graph/nodes/:key', updateNode);

//Delete node and it's children
router.delete('/graph/nodes/:key', deleteNode);

module.exports = router;