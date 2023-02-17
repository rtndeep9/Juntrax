import React from 'react';


interface Props {
    graph: string;
}

const ViewDAG: React.FC<Props> = ({ graph }) => {
    return (
        <div className="view-dag">
            <p>Directed Acyclic Graph</p>
            <pre style={{ whiteSpace: 'unset' }}>{JSON.stringify(graph, null, 2)}</pre>
        </div>
    )
}

export default ViewDAG;
