import React, {useEffect} from 'react';
import RecentPublicPasteys from './MainDecendants/RecentPublicPasteys'
import AddPastey from './MainDecendants/AddPastey';
import PasteyForm from './MainDecendants/PasteyForm';
const Main = () =>{
    useEffect(()=>{
        document.title = 'მთავარი'
    }, [])
    return (
        <div>
            <RecentPublicPasteys />
            <AddPastey>
                <PasteyForm />
            </AddPastey>
        </div>
    )
}

export default Main;