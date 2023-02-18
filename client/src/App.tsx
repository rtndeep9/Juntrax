import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

import PossiblePaths from './Components/PossiblePaths';
import CreateDAG from './Components/CreateDAG';
import ViewDAG from './Components/ViewDAG';
import EditDAG from './Components/EditDAG';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';


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
      if(!graphJson || !startNode){
        toast('Graph or StartNode is missing',{
          type: 'error'
        })
        return
      }

      const payload = { data: JSON.parse(graphJson), startNode: startNode };
      const response = await toast.promise(
        axios.post<PathsResponse>('http://localhost:3000/paths', payload),
        {
          pending: 'Generating Path',
          success: 'Path generated 👌',
          error: 'Path not generated'
        }
    );

      setPaths(response.data.paths);
      setDag(response.data.graph);
    } catch (err) {
      console.error(err);
      setPaths([]);
      setDag('')
    }
  };

  const handleAddClick = async () => {
    try {
      if(!dag){
        toast('Generate paths again',{
          type: 'error'
        })
        return
      }

      if(!key || !value){
        toast('Key or Value is missing',{
          type: 'error'
        })
        return
      }

      const payload = { dag: dag, key: key, value: JSON.parse(value) };
      console.log(payload);
      const response = await toast.promise(
        axios.post<PathsResponse>('http://localhost:3000/graph/nodes', payload),
        {
          pending: 'Adding Node',
          success: 'Node added 👌',
          error: 'Error adding node'
        }
    );
      console.log("Response", response)
      setDag(response.data.graph);
    } catch (err) {
      console.error(err);
      setDag('')
      setPaths([])
    }
  }

  const handleUpdateClick = async () => {
    try {
      if(!dag){
        toast('Generate paths again',{
          type: 'error'
        })
        return
      }

      if(!key || !value){
        toast('Key or Value is missing',{
          type: 'error'
        })
        return
      }

      const payload = { dag: dag, value: JSON.parse(value) };
      console.log(payload);
      const response = await toast.promise(
        axios.put<PathsResponse>(`http://localhost:3000/graph/nodes/${key}`, payload),
        {
          pending: 'Updating node',
          success: 'Node updated 👌',
          error: 'Error while updating node'
        }
    );
      console.log("Response", response)
      setDag(response.data.graph);
    } catch (err) {
      console.error(err);
      setDag('')
      setPaths([])
    }
  }

  const handleDeleteClick = async () => {
    try {

      if(!dag){
        toast('Generate paths again',{
          type: 'error'
        })
        return
      }

      if(!key){
        toast('Key missing',{
          type: 'error'
        })
        return
      }

      const payload = { dag: dag};
      console.log("Payload", payload)
      const response = await toast.promise(
        axios.post<PathsResponse>(`http://localhost:3000/graph/nodes/delete/${key}`, payload),
        {
          pending: 'Deleting node',
          success: 'Node deleted 👌',
          error: 'Error while deleting node'
        }
    );
      console.log("Response", response)
      setDag(response.data.graph);
    } catch (err) {
      console.error(err);
      setDag('')
      setPaths([])
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
      <ToastContainer 
        position="top-center"
        autoClose={1500}
        hideProgressBar={true}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default App;
