import React from 'react';

const PaginateButton = ({pageNum}) => {
    const handleRedirect = () => {
        window.location.href = `/public-pasteys/?page=${pageNum}`
    }
    return (
        <div className='inactive-btn-container'>
            <button onClick={handleRedirect} className='inactive-btn'>{pageNum}</button>
        </div>
    )
}

export default PaginateButton;