import React, {useEffect} from 'react';
import PublicPasteys from './ArchiveDecendants/PublicPasteys'
import axios from 'axios';
import qs from 'qs';
import {useSelector,useDispatch} from 'react-redux'
import { GET_PUBLIC_PASTEYS, GET_PUBLIC_PASTEYS_ERR } from '../actions/types';
import PaginateButtonsContainer from './ArchiveDecendants/PaginateBtnsContainer';
const Archive = (props) => {
    const dispatch = useDispatch((data) => ({type: data.type, payload: data.payload}));
    const archiveReducer = useSelector(state => state.archiver)
    const fetchPublicPasteys = async () => {
        try{
            console.log(props)
            const page = await qs.parse(props.location.search, {ignoreQueryPrefix: true});
            const query = page.page || 1
            console.log('yle' + query)
            const response = await axios.get(`/api/public-pasteys/?page=${query}`);
            const {data: {pasteys,totalPages,currentPage}} = response
            dispatch({
                type: GET_PUBLIC_PASTEYS,
                payload: {
                    pasteys,
                    totalPages,
                    currentPage,
                    loading: false
                }
            })
        }catch(err){
            console.log('error caught' + JSON.stringify(err))
            if(err.response){
                dispatch({
                    type: GET_PUBLIC_PASTEYS_ERR,
                    payload: err.response.data.message
                })
            }else{
                dispatch({
                    type: GET_PUBLIC_PASTEYS_ERR,
                    payload: err.message
                })
            }
        }
    }
    useEffect(()=> {
        document.title = 'არქივი';
        console.log('Parent rendered')
        fetchPublicPasteys();
    }, []);
    if(archiveReducer.loading){
        return null
    }
    return (
        <div className="publicPasteys-wrapper">
             <PublicPasteys />
             <PaginateButtonsContainer />
        </div>
    )
}

export default Archive