import React, {useState,useEffect} from 'react';
import axios from 'axios';
import Error from './Error';
const Raw = (props) => {
    const [rawPastey, setRawPastey] = useState({})
    const [error, setError] = useState('')
    const getRawPastey = async () => {
        try{
            const res = await axios.get(`/api/pasteys/${props.match.params.code}/raw`);
            const { pastey } = res.data 
            console.log(pastey)
            setRawPastey(pastey);
        }catch(err){
            if(err.response){
                setError(err.response.data.message)
            }else{
                setError(err.message)
            }
        }
    }
    useEffect(()=>{
        getRawPastey()
    }, []);
    return (
        <div className="raw-wrapper">
            <div>{rawPastey.body}</div>
            {error ? <Error class="rawErr" error={error} /> : null}
        </div>
    )
}


export default Raw;