import React, { useState } from 'react';
import axios from 'axios';
import PossiblePaths from './Components/PossiblePaths';
import CreateDAG from './Components/CreateDAG';
import ViewDAG from './Components/ViewDAG';
import EditDAG from './Components/EditDAG';
import './App.css';

interface PathsResponse {
  paths: string[][];
  graph: string;
}

function App(): JSX.Element {

  const [graphJson, setGraphJson] = useState<string>('');
  const [startNode, setStartNode] = useState<string>('');

  const [key, setKey] = useState<string>('');
  const [value, setValue] = useState<string>('')

  const [paths, setPaths] = useState<string[][]>([]);
  const [dag, setDag] = useState<string>('');

  const handleKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKey(event.target.value);
  }

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  }

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

  const handleAddClick = async () => {
    try {
      const payload = { dag: dag, key: key, value: JSON.parse(value) };
      console.log(payload);
      const response = await axios.post<PathsResponse>('http://localhost:3000/graph/nodes', payload);
      console.log("Response", response)
      setDag(response.data.graph);
    } catch (err) {
      console.error(err);
      setDag('')
    }
  }

  const handleUpdateClick = async () => {
    try {
      const payload = { dag: dag, value: JSON.parse(value) };
      console.log(payload);
      const response = await axios.put<PathsResponse>(`http://localhost:3000/graph/nodes/${key}`, payload);
      console.log("Response", response)
      setDag(response.data.graph);
    } catch (err) {
      console.error(err);
      setDag('')
    }
  }

  const handleDeleteClick = async () => {
    try {
      const payload = { dag: dag};
      console.log("Payload", payload)
      const response = await axios.post<PathsResponse>(`http://localhost:3000/graph/nodes/delete/${key}`, payload);
      console.log("Response", response)
      setDag(response.data.graph);
    } catch (err) {
      console.error(err);
      setDag('')
    }
  }

  return (
    <div className="container">
      <div style={{textAlign: 'center', borderWidth: "1px"}}><h1>Find Paths in a Directed Acyclic Graph</h1></div>
      <div className="app-container">
        <div className='input-container'> 
          <CreateDAG
            graphJson={graphJson}
            startNode={startNode}
            handleGraph={handleGraphJsonChange}
            handleStartNode={handleStartNodeChange}
            submit={handleGetPathsClick}
          />
          <EditDAG
            node={key}
            nodeValue={value}
            handleKey={handleKeyChange}
            handleValue={handleValueChange}
            addNode={handleAddClick}
            updateNode={handleUpdateClick}
            deleteNode={handleDeleteClick}
          />
        </div>
        <div className="output-container">
          <PossiblePaths paths={paths} />
          {dag && <ViewDAG graph={dag} />}
        </div>
      </div>
    </div>
  );
}

export default App;
