import React from 'react';

interface Props {
  node: string;
  handleKey: (event: React.ChangeEvent<HTMLInputElement>) => void;
  nodeValue: string;
  handleValue: (event: React.ChangeEvent<HTMLInputElement>) => void;
  addNode: () => void;
  updateNode: () => void;
  deleteNode: () => void;
}

const EditDAG: React.FC<Props> = ({ node, handleKey, nodeValue, handleValue, addNode, updateNode, deleteNode }) => {
  return (
    <div className="create-dag">
      <div>
        <div className="form-group">
            <label htmlFor="graph-json">Key:</label>
            <input id="graph-json" value={node} onChange={handleKey} placeholder="5"/>
        </div>
        <div className="form-group">
            <label htmlFor="graph-json">Value:</label>
            <input id="graph-json" value={nodeValue} onChange={handleValue} placeholder="[1,2,3]"/>
        </div>
      </div>
      <div className="button-group">
        <button onClick={addNode}>Add</button>
        <button onClick={updateNode}>Update</button>
        <button onClick={deleteNode}>Delete</button>
      </div>
    </div>
  );
};

export default EditDAG;
