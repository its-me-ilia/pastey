import React, {
    useState,
    useEffect,
} from 'react';
import Error from './Error';
import axios from 'axios';

const Print = (props) => {
    const [pastey, setPastey] = useState({});
    const [error, setError] = useState('')
    const getPastey = async () => {
        try {
            console.log(props)
            const response = await axios.get(`/api/pasteys/${props.match.params.code}/print`);
            const data = response.data.pastey;
            setPastey(data)
            document.title = data.title
            window.print()
        } catch (err) {
            if(err.response){
                setError(err.response.data.message)
            }else{
                setError(err.message)
            }
        }
    }
    useEffect(() => {
        getPastey();
    }, []);
    return (
        <div className="print-wrapper" style={{width: '100vw', height: '100vh'}}>
            <div>{pastey.body}</div>
            {error ? <Error class="printErr" error={error} /> : null}
        </div>
    )
}

export default Print