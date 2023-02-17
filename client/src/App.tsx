import React, { useState } from 'react';
import axios from 'axios';
import PossiblePaths from './Components/PossiblePaths';
import CreateDAG from './Components/CreateDAG';
import ViewDAG from './Components/ViewDAG';
import './App.css';

interface Graph {
  [key: string]: string[];
}

interface PathsResponse {
  paths: string[][];
  graph: Graph;
}

function App(): JSX.Element {
  const [graphJson, setGraphJson] = useState<string>('');
  const [startNode, setStartNode] = useState<string>('');
  const [paths, setPaths] = useState<string[][]>([]);
  const [dag, setDag] = useState<Graph>({});

  const handleGraphJsonChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setGraphJson(event.target.value);
  };

  const handleStartNodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStartNode(event.target.value);
  };

  const handleGetPathsClick = async () => {
    try {
      const payload = { data: JSON.parse(graphJson), startNode: startNode };
      const response = await axios.post<PathsResponse>('http://localhost:3000/paths', payload);
      setPaths(response.data.paths);
      setDag(response.data.graph);
      setGraphJson('');
    } catch (err) {
      console.error(err);
      setPaths([]);
    }
  };

  return (
    <div className="container">
      <div style={{textAlign: 'center', borderWidth: "1px"}}><h1>Find Paths in a Directed Acyclic Graph</h1></div>
      <div className="app-container">
        <CreateDAG
          graphJson={graphJson}
          startNode={startNode}
          handleGraph={handleGraphJsonChange}
          handleStartNode={handleStartNodeChange}
          submit={handleGetPathsClick}
        />
        <div className="output-container">
          <PossiblePaths paths={paths} />
          <ViewDAG graph={dag} />
        </div>
      </div>
    </div>
  );
}

export default App;
