import React from 'react';

interface Props {
  paths: string[][];
}

const PossiblePaths: React.FC<Props> = ({paths}) => {
  return (
    <div className="possible-paths">
      <h2>Possible Paths:</h2>
      {paths.length === 0 ? <p>No paths found.</p> :
          <ul>
            {paths.map(path => (
              <li key={path.join('-')}>{path.join(' -> ')}</li>
            ))}
          </ul>
      }
    </div>
  );
}

export default PossiblePaths;
