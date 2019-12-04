import React from 'react';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {RAW_REDIR_ERR} from '../../actions/types';
const RawBtn = (props) => {
    const dispatch = useDispatch((data) => (data));
    const handleRaw = async () => {
        try{
            const res = await axios.get(`/api/pasteys/${props.code}/raw-redir`);
            window.location.href = res.data.location;
        }catch(err){
            if(err.response){
                dispatch({
                    type: RAW_REDIR_ERR,
                    payload: err.response.data.message
                }) 
            }
            else{
                dispatch({
                    type: RAW_REDIR_ERR,
                    payload: err.message
                })
            }         
        }
    }
    return(
        <div className="rawbtn-container">
            <button className="rawBtn" onClick={handleRaw}>სუფთა ტექსტი</button>
        </div>
    )
}

export default RawBtn