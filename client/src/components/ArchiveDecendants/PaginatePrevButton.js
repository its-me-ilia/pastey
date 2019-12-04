import React from 'react';

const PaginatePreviousButton = ({pageNum}) => {
    const handleRedirect = () => {
        window.location.href = `/public-pasteys/?page=${pageNum}`
    }
    return (
        <div className="previousbtn-container">
            <button onClick={handleRedirect} className="previous-btn">უკან</button>
        </div>
    )
}

export default PaginatePreviousButton