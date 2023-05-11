import React from 'react'
import MainTable from '../../../../Components/MainTable/MainTable'

const SalaryHistory = () => {

    const tableHeading = [
        { heading: 'Salary Month' },
        { heading: 'EMPId' },
        { heading: 'Salary' },
        { heading: 'Status' },
        { heading: 'Salary Slip' },
    ]

    const tableKeys = ['salary_month','emp_id','salary', 'status' ]

    const data = [
        {
            salary_month:'Janurary',
            emp_id:"1244567",
            salary: 10000,
            status:'Approved',
            approved:"Done"
        },
        {
            salary_month:'Janurary',
            emp_id:"1244567",
            salary: 10000,
            status:'Approved',
            approved:"Done"
        },
        {
            salary_month:'Janurary',
            emp_id:"1244567",
            salary: 10000,
            status:'Approved',
            approved:"Done"
        },
        {
            salary_month:'Janurary',
            emp_id:"1244567",
            salary: 10000,
            status:'Approved',
            approved:"Done"
        },
        {
            salary_month:'Janurary',
            emp_id:"1244567",
            salary: 10000,
            status:'Approved',
            approved:"Done"
        },
    ]


    return (
        <React.Fragment>
            <h3 className='uni_heading'>Salary History</h3>
            <MainTable headings={tableHeading} keys={tableKeys} data={data} />
        </React.Fragment>
    )
}

export default SalaryHistory
