import React from 'react'
import BottomButtonContainer from '../../../Components/BottomButtonContainer/BottomButtonContainer'
import DetailsDiv from '../../../Components/DetailsDiv/DetailsDiv'
import Heading from '../../../Components/Heading/Heading'
import MainTable from '../../../Components/MainTable/MainTable'
import DetailsDivContainer from '../../../UI/DetailsDivContainers/DetailsDivContainer'
import classes from './SalarySummaryDetails.module.css'

const SalarySummaryDetails = () => {

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

    const fixed_data = [
        {
            title: 'Salary',
            val_a: '',
            val_b: ''
        },
        {
            title: 'Monthly Days',
            val_a: '',
            val_b: ''
        },
        {
            title: 'Working Days',
            val_a: '',
            val_b: ''
        },
        {
            title: 'Basic Pay',
            val_a: '',
            val_b: ''
        },
        {
            title: 'HR/ Conv.',
            val_a: '',
            val_b: ''
        },
        {
            title: 'Nett',
            val_a: '',
            val_b: ''
        },
        {
            title: 'Commission',
            val_a: '',
            val_b: ''
        },
        {
            title: 'Expenses',
            val_a: '',
            val_b: ''
        },
        {
            title: 'Tea',
            val_a: '',
            val_b: ''
        },
        {
            title: 'Gross Salary',
            val_a: '',
            val_b: ''
        },
        {
            title: 'ESIC',
            val_a: '',
            val_b: ''
        },
        {
            title: 'EPF',
            val_a: '',
            val_b: ''
        },
        {
            title: 'TDS',
            val_a: '',
            val_b: ''
        },
        {
            title: 'Current Advance',
            val_a: '',
            val_b: ''
        },
        {
            title: 'Previous Advance Emi',
            val_a: '',
            val_b: ''
        },
        {
            title: 'Net Pay Salary',
            val_a: '',
            val_b: ''
        },
        {
            title: 'Net Pay Incentive',
            val_a: '',
            val_b: ''
        },
    ]

    const table_headings = [
        { heading: '' },
        { heading: 'Actual Salary' },
        { heading: 'As Per Rule Salary' },
    ]

    const table_keys = ['title', 'val_a', 'val_b']


    return (
        <React.Fragment>
            <Heading heading={'Salary Summary'} />
            <DetailsDivContainer data={employee_data} />
            <br />
            <h3 className='uni_heading'>Data</h3>
            <MainTable headings={table_headings} keys={table_keys} data={fixed_data} height={true} />
            <br /><br />
            <h3 className='uni_heading'>Other Details</h3>
            <div className={classes.container}>
                {employee_data.map((val, index) => (
                    <DetailsDiv num={index} key={index} title={val.title} value={val.value} />
                ))}
            </div>
            <BottomButtonContainer cancel={'Back'} approve={'Download Summary'} />
        </React.Fragment>
    )
}

export default SalarySummaryDetails