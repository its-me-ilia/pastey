import React, {useState} from 'react';
import axios from 'axios';
import Error from '../Error';
const ReportForm = (props) => {
    const [sender, setSender] = useState('');
    const [subject, setSubject] = useState('');
    const [report, setReport] = useState('');
    const [error, setError] = useState('');
    const handleSender = (e) => {
        setSender(e.target.value);
    } 
    const handleSubject = (e) => {
        setSubject(e.target.value);
    }
    const handleReport = (e) => {
        setReport(e.target.value)
    }
    const handleSubmit = async (e) => {
        try{
            e.preventDefault();
            const res = await axios.post(`/api/pasteys/${props.code}/report`, {
                sender,
                subject,
                report
            })
            console.log(res);
        }catch(err){
            if(err.response){
                setError(err.response.data.message)
            }else{
                setError(err.message)
            }
        }
    }
    return (
        <div className="report-form-container">
            <form className="report-form" onSubmit={handleSubmit}>
                <h2 onClick={props.handleReportOpening} className="escape">×</h2>
                <input type="text" className="sender" placeholder="თქვენი ელ. ფოსტა" onChange={handleSender} value={sender} />
                <input type="text" className="subject" placeholder="საგანი" onChange={handleSubject} value={subject} />
                <textarea className="report" placeholder="დაწერეთ თქვენი რეპორტი" rows="10" cols="20" value={report} onChange={handleReport}></textarea>
                <input type="submit" className="report-btn" value="დაარეპორტება"/>
                <Error class="report-form-err" error={error} />
            </form>
        </div>
    )
}

export default ReportForm;