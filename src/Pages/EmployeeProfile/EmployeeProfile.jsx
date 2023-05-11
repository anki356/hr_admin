import React from 'react'
import classes from './EmployeeProfile.module.css'
import DetailsDiv from '../../Components/DetailsDiv/DetailsDiv'
import Heading from '../../Components/Heading/Heading'
import MainTable from '../../Components/MainTable/MainTable'
import advance_data from './advance_data'
import loan_data from './loan_data'
import EmployeeActualProfile from './EmployeeActualProfile/EmployeeActualProfile'
import EmployeeBarGraph from './EmployeeBarGraph/EmployeeBarGraph'
import DownloadDocuments from './Tables/DownloadDocuments/DownloadDocuments'
import IncrementHistory from './Tables/IncementHistory/IncrementHistory'
import SalaryHistory from './Tables/SalaryHistory/SalaryHistory'


const personal_details = [
    {
        title: 'Date Of Birth',
        value: '13/08/2022'
    },
    {
        title: 'Fathers Name',
        value: 'Rajendera Shrivastav'
    },
    {
        title: 'Qualification',
        value: 'BCA'
    },
    {
        title: 'Gender',
        value: 'male'
    },
    {
        title: 'Floor',
        value: '1st Floor'
    },
    {
        title: 'Marital Status',
        value: 'Unmarried'
    }
]
const job_details = [
    {
        title: 'Department',
        value: 'Kids'
    },
    {
        title: 'Designation',
        value: 'Front-End Developer'
    },
    {
        title: 'Hired by',
        value: 'Rohan D Mishra'
    },
    {
        title: 'Head Employee',
        value: 'Akash D Mishra'
    },
    {
        title: 'Hiring Date',
        value: '20/04/2023'
    },
    {
        title: 'Consultancy',
        value: 'Contractual Based'
    },
    {
        title: 'Job Location',
        value: 'Narang Lagpat Nagar'
    },
    {
        title: 'Supervisior',
        value: 'Anil D Mishra'
    },
    {
        title: 'EPF/ESI no.',
        value: 'AKSDJHJ525ASD'
    }
]
const advance_table_headings = [
    { heading: 'Advance Amount' },
    { heading: 'Approval' },
    { heading: 'Status' },
    { heading: 'Status' },
    { heading: ' ' }
]
const advance_table_keys = ['advance_date', 'approval_date', 'status', 'status']
const loan_table_headings = [
    { heading: 'Loan Amount' },
    { heading: 'Approval' },
    { heading: 'Month' },
    { heading: 'EMI Deducted' },
    { heading: 'Status' }
]
const loan_table_keys = ['loan_date', 'approval_date', 'month', 'emi_deducted', 'status']

const EmployeeProfile = () => {

    console.log(personal_details);

    return (
        <React.Fragment>
            <Heading heading={'Employee Profile'} />
            <div className={`${classes.container} uni_container`}>
                <div className={classes.container_left}>
                    <EmployeeActualProfile />
                    <EmployeeBarGraph />
                </div>
                <div className={classes.container_right}>
                    <h3 className='uni_heading'>Personal Details</h3>
                    <div className={classes.wrap}>
                        {personal_details.map((val, index) => (
                            <DetailsDiv cls={true} num={index} title={val.title} value={val.value} />
                        ))}
                        <div className={classes.w100_div}>
                            Local Address
                            <span>
                                Gol Dak Khana Building, near Gurudwara Bangla Sahib, New Delhi, Delhi 110001
                            </span>
                        </div>
                        <div className={classes.w100_div}>
                            Permanent Address
                            <span>
                                Type 4, Block C, Aram Bagh, Jhandewalan, New Delhi, Delhi 110055
                            </span>
                        </div>
                    </div>

                    <h3 className='uni_heading'>Job Details</h3>
                    <div className={classes.wrap}>
                        {job_details.map((val, index) => (
                            <DetailsDiv cls={true} num={index} title={val.title} value={val.value} />
                        ))}
                    </div>



                    <h3 className='uni_heading'>Documents & Bank Details</h3>
                    <div className={classes.wrap}>
                        {job_details.map((val, index) => (
                            <DetailsDiv cls={true} num={index} title={val.title} value={val.value} />
                        ))}
                    </div>
                </div>
            </div>
            <br />
            <DownloadDocuments />
            <br /> <br />
            <h3 className='uni_heading'>Advance & Loan Emi</h3>
            <h4 className={classes.h4_heading}>Advance</h4>
            <MainTable headings={advance_table_headings} keys={advance_table_keys} data={advance_data} height={true} />
            <br />
            <br />
            <h4 className={classes.h4_heading}>Loan</h4>
            <MainTable headings={loan_table_headings} keys={loan_table_keys} data={loan_data} height={true} />

            <br /><br />
            <IncrementHistory />

            <br /><br />
            <SalaryHistory />
        </React.Fragment>
    )
}

export default EmployeeProfile