import React, {useEffect} from 'react';
import {GET_PASTEYS, GET_PASTEYS_ERR} from '../../actions/types';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios'
const PublicPasteys = () => {
    const mainReducer = useSelector(state => state.mainr);
    const dispatch = useDispatch((data) => (data));
    const changeLocation = (e,code) => {
        e.preventDefault()
        window.location.href = `/${code}`
    }
    useEffect(()=>{
        console.log('ae')
        axios.get('/api/get-pasteys')
            .then(res => res.data)
            .then(data => {
                dispatch({
                    payload: data.pasteys,
                    type: GET_PASTEYS
                })
            })
            .catch(err => {
                if(err.response){
                    dispatch({
                        payload: err.response.data.message,
                        type: GET_PASTEYS_ERR
                    })
                }else{
                    dispatch({
                        payload: err.message,
                        type: GET_PASTEYS_ERR
                    })
                }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    if(mainReducer.publicPasteyLoading){
        return (
            <div>Loading</div>
        )
    }
    return (
        <div>
            {mainReducer.pasteys.map((val,i)=> {
                return(
                    <div key={val._id} onClick={e => changeLocation(e,val.code)}>
                        <p>{val.title}</p>
                        <p>{val.body.substr(0,10)}</p>
                    </div>
                )
            })}
        </div>
    )
}
export default PublicPasteys