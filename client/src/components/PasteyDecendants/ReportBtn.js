import React from 'react';

const ReportBtn = ({handleReportOpening}) => {
    return(
        <div className="reportbtn-container">
            <button className="report-btn" onClick={handleReportOpening}>დარეპორტება</button>
        </div>
    )
}

export default ReportBtn;