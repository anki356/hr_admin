import React,{useState} from 'react'
import BottomButtonContainer from '../../../Components/BottomButtonContainer/BottomButtonContainer'
import Heading from '../../../Components/Heading/Heading'
import LabeledInput from '../../../Components/LabeledInput/LabeledInput'
import classes from './AddInterview.module.css'

const AddInterview = () => {
const [name,setName]=useState([])
const[father_name,setfatherName]=useState([])
const[designation,setDesignation]=useState([])
const[hired_by,setHiredBy]=useState([])
const[reference,setReference]=useState([])
    const inputs = [
        {
            title: 'Name',
            id: 'name',
            ph: ''
        },
        {
            title: 'Father Name',
            id: 'father_name',
            ph: ''
        },
        {
            title: 'Designation Interview For',
            id: 'designation_interview_for',
            ph: ''
        },
        {
            title: 'Hired By',
            id: 'hired_by',
            ph: ''
        },
        {
            title: 'Reference',
            id: 'reference',
            ph: ''
        },
        {
            title: 'Interview Date',
            id: 'interview_date',
            ph: ''
        },
        {
            title: 'Interviewer Name',
            id: 'interviewer name',
            ph: ''
        },
        {
            title: 'Salary Expectation',
            id: 'salary_expectation',
            ph: ''
        },
        {
            title: 'Department',
            id: 'department',
            ph: ''
        },
        {
            title: 'Experience',
            id: 'experience',
            ph: ''
        },
    ]

    return (
        <React.Fragment>
            <Heading heading={'Add Interview'} />
            <div className={classes.container}>
                {inputs.map((element, index) => (
                    <LabeledInput title={element.title} id={element.id} key={index} cls={true} img={false} />
                ))}
                <div className={classes.input_div}>
                    <label htmlFor="remarks">Remarks</label>
                    <textarea id="remarks"></textarea>
                </div>
                {/* <div className={classes.input_div}>
                    <label htmlFor="file">Attach File</label>
                    <input type="file" id='file' />
                </div> */}
            </div>
            <BottomButtonContainer approve='Add Interview' cancel='Back'  />
        </React.Fragment>
    )
}

export default AddInterview