import React from 'react';

interface Graph {
    [key: string]: string[];
}

interface Props {
    graph: Graph;
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
