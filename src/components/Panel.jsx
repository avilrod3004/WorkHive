import React from 'react'

const Panel = ({ name }) => {
  return (
    <div className="panel">
      <div className="panel-content">
        { name }
      </div>
    </div>
  )
}

export default Panel
