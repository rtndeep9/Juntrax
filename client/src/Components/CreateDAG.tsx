import React from 'react';

interface Props {
  graphJson: string;
  handleGraph: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  startNode: string;
  handleStartNode: (event: React.ChangeEvent<HTMLInputElement>) => void;
  submit: () => void;
}

const CreateDAG: React.FC<Props> = ({ graphJson, handleGraph, startNode, handleStartNode, submit }) => {
  return (
    <div className="create-dag">
      <div className="form-group">
        <label htmlFor="graph-json">Graph (JSON format):</label>
        <textarea id="graph-json" required value={graphJson} onChange={handleGraph} />
      </div>
      <div className="form-group">
        <label htmlFor="start-node">Start Node:</label>
        <input id="start-node" type="text" required value={startNode} onChange={handleStartNode} />
      </div>
      <div className="form-group">
        <button id="get-paths"  onClick={submit}>Get Paths</button>
      </div>
    </div>
  );
};

export default CreateDAG;
