import React from 'react';

const PublicPastey = (props) => {
    return (
        <div style={{cursor: "pointer"}} onClick={e => props.handleClick(e, props.code)}>
            {props.children}
        </div>
    )
}

export default PublicPastey