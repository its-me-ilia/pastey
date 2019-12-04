import React from 'react';

const PasteyVal = (props) => {
    //tu ak imushavebs erti dispatchi 2is magivrad (meore dispatchErr) mashin publicpasteydanac gaajmeine
    return(
        <React.Fragment>
            <div style={{whiteSpace: "pre"}}>
                <div>{props.body}</div>
            </div>
        </React.Fragment>
    )
}

export default PasteyVal