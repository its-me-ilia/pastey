import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DOWNLOAD_ERR } from '../../actions/types';
import FileSaver from 'file-saver';
const Download = (props) => {
    const dispatch = useDispatch((data) => (data));
    const pasteyReducer = useSelector(store => store.pasteyr)
    const handleDownload = async () => {
        try{
            console.log(props.code)
            const response = await fetch(`/api/pasteys/${props.code}/download`);
            if(response.ok){
                FileSaver.saveAs(new Blob([await response.blob()]), pasteyReducer.pastey.title)
            }else{
                //new Error it chaanacvle
                throw await response.json()
            }
            }catch(err){
                if(err.response){
                    dispatch({
                        type: DOWNLOAD_ERR,
                        payload: err.response.data.message
                    })
                }else{
                    dispatch({
                        type: DOWNLOAD_ERR,
                        payload: err.message
                    })
                }
            }
    }
    return (
        <div>
            <button onClick={handleDownload}>ჩაიწერე</button>
        </div>
    )
}

export default Download;