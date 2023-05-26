import React, { useEffect, useState } from 'react'
import BottomButtonContainer from '../../../Components/BottomButtonContainer/BottomButtonContainer'
import Heading from '../../../Components/Heading/Heading'
import LabeledInput from '../../../Components/LabeledInput/LabeledInput'
import classes from './AddInterview.module.css'
import axios from 'axios'
import SelectTag from '../../../Components/SelectTag/SelectTag'
import Cookies from 'universal-cookie'
import Img from '../../../assets/shop.png'
import { useNavigate } from 'react-router-dom'
import LabeledSelect from '../../../Components/LabeledSelect/LabeledSelect'
import InpFile from '../../../Components/InpFile/InpFile'
const AddInterview = () => {
    const url = "http://localhost:9000/"
    const navigate = useNavigate()
    const cookies = new Cookies();
    const token = cookies.get('token')
    const [name, setName] = useState([])
    const [father_name, setfatherName] = useState([])
    const [designation, setDesignation] = useState([])
    const [hired_by, setHiredBy] = useState([])
    const [reference, setReference] = useState([])

    const [interviewData, setInterviewData] = useState([])
    const [interviewDate, setInterviewDate] = useState([])
    const [interviewer, setInterviewer] = useState([])
    const [salary, setSalary] = useState([])
    const [dept, setDept] = useState([])
    const [exp, setExp] = useState([])

    const [employeeData, setEmployeeData] = useState([])
    const [roleData, setRoleData] = useState([])
    const [deptData, setDeptData] = useState([])

    useEffect(() => {
        const headers = { "Authorization": "Bearer " + token }

        axios.get(url + "api/getEmployeesBasedOnRole?role_name='Floor Incharge'&role_name='Store Incharge'", { headers }).then((response) => {
            setInterviewData(response.data)
        })
        axios.get(url + "api/getEmployeesBasedOnRole?role_name='Floor Incharge'&role_name='Store Incharge'&role_name='Salesman'", { headers }).then((response) => {
            setEmployeeData(response.data)
        })
        axios.get(url + "api/getRoles", { headers }).then((response) => {
            response.data = response.data.filter((data) => data.role_name !== 'Super Admin' && data.role_name !== 'Admin')
            response.data = response.data.filter((data, index, self) => {
                let indexOne = self.findIndex((dataOne) => dataOne.role_name === data.role_name)
                console.log(indexOne)
                if (indexOne === index) {
                    return data
                }
            })

            setRoleData(response.data)
        })
        axios.get(url + "api/getStoreDep", { headers }).then((response) => {
            setDeptData(response.data)
        })
    }, [])

    const inputs = [
        {
            title: 'Name',
            id: 'name',
            ph: '',
            func2: 'setName'
        },
        {
            title: 'Father Name',
            id: 'father_name',
            ph: '',
            func2: 'setFatherName'
        },
        {
            title: 'Designation Interview For',
            id: 'designation_interview_for',
            ph: '',
            func2: 'setDesignation'
        },
        {
            title: 'Hired By',
            id: 'hired_by',
            ph: '',
            func2: 'setHiredBy'
        },
        {
            title: 'Reference',
            id: 'reference',
            ph: '',
            func2: 'reference'

        },
        {
            title: 'Interview Date',
            id: 'interview_date',
            ph: '',
            func2: 'setInterviewDate',
            type: 'date'
        },
        {
            title: 'Interviewer Name',
            id: 'interviewer name',
            ph: '',
            func2: 'setInterviewerName'
        },
        {
            title: 'Salary Expectation',
            id: 'salary_expectation',
            ph: '',
            func2: 'setSalary'
        },
        {
            title: 'Department',
            id: 'department',
            ph: '',
            func2: 'setDept'
        },
        {
            title: 'Experience',
            id: 'experience',
            ph: '',
            func2: 'setExp'
        },
    ]
    function add() {

    }
    function cancel() {
        navigate(-1)
    }
    return (
        <React.Fragment>
            <Heading heading={'Add Interview'} />
            <div className={classes.container}>
                {inputs.map((element, index) => {
                    return element.title !== 'Interviewer Name' && element.title !== 'Reference' & element.title !== 'Designation Interview For' & element.title !== 'Hired By' && element.title !== 'Department' ? <LabeledInput func2={element.func2} title={element.title} id={element.id} key={index} cls={true} img={false} /> : element.title !== 'Reference' && element.title !== 'Designation Interview For' && element.title !== 'Hired By' && element.title !== 'Department' ? <LabeledSelect cls={true} mr={true} parentFunc={element.func2} img={Img} select_id='interviewer' title={'Interviewer'} data={interviewData} /> : element.title !== 'Designation Interview For' && element.title !== 'Hired By' && element.title !== 'Department' ? <LabeledSelect cls={true} mr={true} parentFunc={element.func2} img={Img} select_id='reference' title={'Reference'} data={employeeData} /> : element.title !== 'Hired By' && element.title !== 'Department' ?

                        <LabeledSelect cls={true} mr={true} parentFunc={element.func2} select_id='designation_interview_for' title={'Designation Interview For'} data={roleData} spl_name={'role_name'} />
                        //  <select onChange={(e) => element.func2(e.target.value)} id='designation_interview_for' placeholder={'Designation Interview For'}  > {roleData.map((val, index) => (
                        //     <option key={index} value={val.id}>{val.role_name}</option>
                        // ))}</select> 

                        : element.title !== 'Department' ? <LabeledSelect cls={true} mr={true} parentFunc={element.func2} img={Img} select_id='hired_by' title={'Hired By'} data={interviewData} /> : <LabeledSelect cls={true} mr={true} parentFunc={element.func2} img={Img} select_id='department' title={'Department'} data={deptData} />
                }


                )}
                <div className={classes.input_div}>
                    <label htmlFor="remarks">Remarks</label>
                    <textarea id="remarks"></textarea>
                </div>

                <div className={classes.file_div }>
                    <h5 >Upload Document</h5>
                    <InpFile />
                </div>
                {/* <div className={classes.input_div}>
                    <label htmlFor="file">Attach File</label>
                    <input type="file" id='file' />
                </div> */}
            </div>
            <BottomButtonContainer approve='Add Interview' cancel='Back' func2={add} func={true} cancelRequests={cancel} />
        </React.Fragment>
    )
}

export default AddInterview