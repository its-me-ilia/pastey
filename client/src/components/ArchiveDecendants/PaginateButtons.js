import React from 'react';

const PagionateButtons = (props) => {
    return (
        <div className="paginate-btns-container">
            {props.children}
        </div>
    )
}

export default PagionateButtons;