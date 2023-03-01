import React from 'react'

const Popup = ({ message, onClose }) => {
  return (
    <div className="popup">
    <div className="popup-content">
      <p>{message}</p>
      <div className='popup-button'>
      <button onClick={onClose}>Close</button>
      </div>
    </div>
    </div>    
  )
}

export default Popup