import React from 'react'
import BottomButtonContainer from '../../../Components/BottomButtonContainer/BottomButtonContainer'
import ExtraDetails from '../../../Components/ExtraDetails/ExtraDetails'
import Heading from '../../../Components/Heading/Heading'
import MainTable from '../../../Components/MainTable/MainTable'
import DetailsDivContainer from '../../../UI/DetailsDivContainers/DetailsDivContainer'
import data from './data'

const Correction = () => {

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
        { heading: 'Employee Name' },
        { heading: 'Emp ID' },
        { heading: 'Request Date' },
        { heading: 'Expense Type' },
        { heading: 'Approval' }
    ]
    const tableKeys = ['name', 'emp_id', 'req_date', 'expense_type', 'approval']

    const tableHeadings2 = [
        { heading: 'Document Name' },
        { heading: 'Option' }
    ]
    const tableKeys2 = ['file_name', 'file']
    const data2 = [
        {
            file_name: 'Aadhar Card',
            file: 'Download'
        },
        {
            file_name: 'Aadhar Card',
            file: 'Download'
        },
        {
            file_name: 'Aadhar Card',
            file: 'Download'
        },
        {
            file_name: 'Aadhar Card',
            file: 'Download'
        },
        {
            file_name: 'Aadhar Card',
            file: 'Download'
        }
    ]


    return (
        <React.Fragment>
            <Heading heading={'Attendance Correction'} />
            <DetailsDivContainer data={employee_data} />
            <ExtraDetails heading={'Correction'} />

            <h3 className='uni_heading'>Attached File</h3>
            <MainTable headings={tableHeadings2} keys={tableKeys2} data={data2} height={true} />
<br /><br />
            <h3 className='uni_heading'>Correction History</h3>
            <MainTable headings={tableHeadings} keys={tableKeys} data={data} height={true} />

            <BottomButtonContainer cancel={'Reject'} approve={'Approve Attendance'} />
        </React.Fragment>
    )
}

export default Correction