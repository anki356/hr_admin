import React from 'react'
import BottomButtonContainer from '../../../Components/BottomButtonContainer/BottomButtonContainer'
import ExtraDetails from '../../../Components/ExtraDetails/ExtraDetails'
import Heading from '../../../Components/Heading/Heading'
import MainTable from '../../../Components/MainTable/MainTable'
import DetailsDivContainer from '../../../UI/DetailsDivContainers/DetailsDivContainer'
import data from './data'

const TimingApprove = () => {

    const employee_data = [{
        "title": "Electrician",
        "value": "Royall"
    }, {
        "title": "Construction Manager",
        "value": "Sayer"
    }, {
        "title": "Electrician",
        "value": "Aliza"
    }, {
        "title": "Engineer",
        "value": "Jemie"
    }, {
        "title": "Subcontractor",
        "value": "Jacklin"
    }, {
        "title": "Subcontractor",
        "value": "Garold"
    }, {
        "title": "Engineer",
        "value": "Dorry"
    }, {
        "title": "Construction Expeditor",
        "value": "Matias"
    }, {
        "title": "Subcontractor",
        "value": "Genevieve"
    }, {
        "title": "Construction Foreman",
        "value": "Catlin"
    }]

    const tableHeadings = [
        {heading:'Document Name'}
    ]
    const tableKeys = ['document']


    return (
        <React.Fragment>
            <Heading heading={'Timing Approval'} />
            <DetailsDivContainer data={employee_data} />
            <ExtraDetails heading='Timing Details' />
            <h3 className='uni_heading'>Attach File</h3>
            <MainTable headings={tableHeadings} keys={tableKeys} data={data} height={true} />
            <BottomButtonContainer cancel={'Reject'} approve={'Approve Attendence'}  />
        </React.Fragment>
    )
}

export default TimingApprove