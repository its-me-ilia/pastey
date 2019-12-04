import React, {useEffect, useState, useCallback}  from 'react';
import PasteyVal from './PasteyDecendants/PasteyValue';
import Buttons from './PasteyDecendants/Buttons';
import Download from './PasteyDecendants/DownloadBtn';
import Print from './PasteyDecendants/PrintBtn';
import Raw from './PasteyDecendants/RawBtn';
import ReportForm from './PasteyDecendants/ReportForm';
import ReportBtn from './PasteyDecendants/ReportBtn';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios'
import { INIT_PASTEY, INIT_PASTEY_ERR } from '../actions/types'
const Pastey = (props) => {
    const [isReportOpened, setReportOpened] = useState(false);
    const dispatch = useDispatch((data) => (data));
    const pasteyReducer = useSelector((state) => state.pasteyr);
    const {match: {params: {code}}} = props
    const fetchPastey = async () => {
        try{
            const response = await axios.get(`/api/pasteys/${code}`);
            const { pastey }= response.data
            dispatch({
                type: INIT_PASTEY,
                payload: pastey
            })
            document.title = pastey.title
        }catch(error){
            if(error.response){
                dispatch({
                    type: INIT_PASTEY_ERR,
                    payload: error.response.data.message
                })  
            }else{
                dispatch({
                    type: INIT_PASTEY_ERR,
                    payload: error.message
                })
            }
        }
    }
    const handleReportOpening = useCallback(()=> {
        setReportOpened(!isReportOpened);
    }, [setReportOpened, isReportOpened])
    useEffect(()=>{
       fetchPastey();
    }, [])
    return (
        <div>
            <PasteyVal body={pasteyReducer.pastey.body} />
            { isReportOpened ? <ReportForm handleReportOpening={handleReportOpening} code={code} /> : null }
            <Buttons>
                <Download code={code}/>
                <Print code={code}/>
                <Raw code={code} />
                { !isReportOpened ? <ReportBtn handleReportOpening={handleReportOpening} /> : null }
            </Buttons>
        </div>
    )
}

export default Pastey