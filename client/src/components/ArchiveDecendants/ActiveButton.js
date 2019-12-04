import React from 'react';

const ActiveButton = ({pageNum}) => {
    const handleRedirect = () => {
        window.location.href = `/public-pasteys/?page=${pageNum}`
    }
    return(
        <div className="active-btn-container">
            <button onClick={handleRedirect} className="active-btn">{pageNum}</button>
        </div>
    )
}

export default ActiveButton