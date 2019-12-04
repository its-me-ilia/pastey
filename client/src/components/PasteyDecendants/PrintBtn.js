import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {PRINT_ERR} from '../../actions/types'
import axios from 'axios';
const PrintBtn = (props) => {
    const dispatch = useDispatch(data => (data));
    const handlePrintBtn = async () => {
        try{
            console.log(props.code)
            let response = await axios.post(`/api/pasteys/${props.code}/print-redir`);
            let { location } = response.data;
            window.location.href = location
        }catch(err){
            if(err.response){
                dispatch({
                    type: PRINT_ERR,
                    payload: err.response.data.message
                })
            }else{
                dispatch({
                    type: PRINT_ERR,
                    payload: err.response.data.message
                })
            }
        }
    }
    return (
        <div className="printbtn-container">
            <button onClick={handlePrintBtn}>ამოპრინტე</button>
        </div>
    )
}

export default PrintBtn;