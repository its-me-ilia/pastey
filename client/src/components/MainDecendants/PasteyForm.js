import React, {useState} from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux'
import { ADD_PASTEY_ERR } from '../../actions/types';
const PasteyForm = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [visibility, setVisibility] = useState("true");
    const [expiration, setExpiration] = useState('permanent');
    const dispatch = useDispatch((data) => ({type: data.type, payload: data.payload}));
    const handleTitle = (e) =>{
        setTitle(e.target.value)
    }
    const handleBody = (e) => {
        setBody(e.target.value)
    }
    const handleVisibility = (e) => {
        setVisibility(e.target.value)
    }
    const handleExpiration = (e) => {
        setExpiration(e.target.value)
    }
    const handleForm = (e) => {
        e.preventDefault();
        console.log(expiration)
        axios.post('/api/add-pastey', {
            title,
            body,
            visibility,
            expiration
        })
        .then(res => res.data)
        .then(data => {
            setTitle('');
            setBody('');
            setVisibility('');
            setExpiration('');
            window.location.href = `/${data.code}`;
        })
        .catch(err => {
            if(err.response){
                dispatch({
                    type: ADD_PASTEY_ERR,
                    payload: err.response.data.message
                }) 
            }else{
                dispatch({
                    type: ADD_PASTEY_ERR,
                    payload: err.message
                })   
            }
        })

    }
    return (
        <form className="pastey-form" onSubmit={handleForm}>
            <input type="text" className="title-input" name="title" placeholder="სათაური" autoComplete="off" onChange={handleTitle} value={title} />
            <textarea rows="10" cols="30" style={{resize: "none"}} value={body} onChange={handleBody} placeholder="თქვენი ფეისთი..."></textarea>
            <select value={visibility} onChange={handleVisibility}>
                <option value="true">საჯარო</option>
                <option value="false">პერსონალური</option>
            </select>
            <select value={expiration} onChange={handleExpiration}>
                <option value="permanent">უვადო</option>
                <option value="0.4">1 საათი</option>
                <option value="1">1 დღე</option>
                <option value="7">7 დღე</option>
                <option value="31">31 დღე</option>
            </select>
            <input type="submit" className="submit-pastey" name="submitPastey" value="ჩააფეისთე" />
        </form>
    )
}

export default PasteyForm;