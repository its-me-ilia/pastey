import React from 'react';
import PublicPastey from './PublicPastey';
import Title from './PublicPasteyTitle';
import { useSelector } from 'react-redux'
import Body from './PublicPasteyBody';
import CreatedAt from './PublicPasteyCreatedAt';
const PublicPasteys = () => {
    const archiveReducer = useSelector(state => state.archiver); //public pastey reducer
    const handleClick = (e, code) => {
        e.preventDefault()
        window.location.href = code 
    }
    return (
        <div>
            {archiveReducer.publicPasteys.map((val,i)=>{
                return (
                    <PublicPastey code={val.code} handleClick={handleClick} key={val._id}>
                        <Title title={val.title}/>
                        <Body body={val.body} />
                        <CreatedAt createdAt={val.createdAt} />
                    </PublicPastey>
                )
            })}
        </div>    
    )
}
export default PublicPasteys