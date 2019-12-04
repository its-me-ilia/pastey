import React from 'react';

const PasteyCreatedAt = (props) => {
    return (
        <div style={{textAlign: "right"}}>
            <p>{new Date(props.createdAt).toLocaleDateString()} {new Date(props.createdAt).toLocaleTimeString()}</p>
        </div>
    )
}

export default PasteyCreatedAt;