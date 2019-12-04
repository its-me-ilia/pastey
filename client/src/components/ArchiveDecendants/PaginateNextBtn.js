import React from 'react';

const PaginateNextButton = ({pageNum}) => {
    const handleRedirect = () => {
        window.location.href = `/public-pasteys/?page=${pageNum}`
    }
    return (
        <div className="nextbtn-container">
            <button onClick={handleRedirect} className="nextbtn">შემდეგი</button>
        </div>
    )
}

export default PaginateNextButton