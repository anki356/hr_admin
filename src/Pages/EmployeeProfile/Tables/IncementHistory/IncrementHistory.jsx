import React from 'react'
import MainTable from '../../../../Components/MainTable/MainTable'

const IncrementHistory = () => {

    const tableHeading = [
        { heading: 'Salary' },
        { heading: 'Increment' },
        { heading: 'Date of Increment' },
        { heading: 'Approved' },
    ]

    const tableKeys = ['salary', 'increment' , 'date' , 'approved']

    const data = [
        {
            salary: 10000,
            date: '13/04/2022',
            increment:'12%',
            approved:"Done"
        },
        {
            salary: 12000,
            date: '13/04/2022',
            increment:'15%',
            approved:" "
        },
        {
            salary: 10000,
            date: '13/04/2022',
            increment:'22%',
            approved:"Done"
        },
        {
            salary: 12000,
            date: '13/04/2022',
            increment:'15%',
            approved:" "
        },
        {
            salary: 10000,
            date: '13/04/2022',
            increment:'22%',
            approved:"Done"
        },
    ]


    return (
        <React.Fragment>
            <h3 className='uni_heading'>Increment History</h3>
            <MainTable headings={tableHeading} keys={tableKeys} data={data} />
        </React.Fragment>
    )
}

export default IncrementHistory
