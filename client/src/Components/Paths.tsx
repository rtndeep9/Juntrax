import React from 'react'

const Paths = ({paths}) => {
  return (
    <div style={{flex: 1, flexDirection: 'row'}}>
      {paths.map( (path, index) => {
        return (
            <li>{path} {index !== paths.length - 1 && (
            <span>{`->`}</span>
            )}</li>
        )
        }
      )}
    </div>
  )
}

export default Paths