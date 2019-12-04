import React from 'react';

const Buttons = (props) => {
    return (
        <div className="buttons-container">
            {props.children}
        </div>
    )
}

export default Buttons