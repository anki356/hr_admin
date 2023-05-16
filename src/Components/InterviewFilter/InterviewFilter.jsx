import classes from '../Filter/Filter.module.css'
import mag from '../../assets/search2.png'
import vec from '../../assets/vector9.png'
import { useState } from 'react'
import MainTable from '../MainTable/MainTable'
import { useEffect } from 'react'
// Importing Datepicker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios'
import Cookies from 'universal-cookie'

const InterviewFilter = (props) => {

    const cookies = new Cookies();
    const [View, setView] = useState(false)
    const [View2, setView2] = useState(false)
    const [startDate, setStartDate] = useState(new Date());
    const [designationOptions, setDesignationOptions] = useState([])
    const [selectedDesignation, setSelectedDesignation] = useState('')
    const filterByDesignation = async (e) => {
        setSelectedDesignation(e.target.value)
        props.changeByDesignation(e.target.value)
    }
    useEffect(() => {
        const fetching = async () => {
            const token = cookies.get('token')
            const headers = { "Authorization": "Bearer " + token }
            axios.get("http://localhost:9000/api/getRoles", { headers }).then((response) => {
                setDesignationOptions(response.data)
            })
        }
        fetching()
    }, [])
    const tableData = props.data.map((element) => (
        {
            employee_name: element.employee_name,
            empID: element.empID,
            image: element.image
        }
    ))
    const tableData2 = props.data2.map((element) => (
        {
            employee_name: element.employee_name,
            empID: element.empID,
            image: element.image
        }
    ))

    const tableHeadings = [
        { heading: 'Interviewee Name' }
    ]
    const tableHeadingsforInterviewer = [
        { heading: 'Interviewer Name' },
        { heading: 'Interviewer ID' }
    ]

    const [state, setstate] = useState('')
    const [state2, setstate2] = useState('')
    useEffect(() => {
        props.changeDate(startDate)
    }, [startDate])
    const handleChange = (e) => {
        setView(true)
        const results = tableData.filter(post => {
            if (e.target.value === " ") return tableData
            return post.employee_name.toLowerCase().includes(e.target.value.toLowerCase()) || post.empID.includes(e.target.value)
        })
        setstate({
            query: e.target.value,
            list: results
        })
    }
    const handleChange2 = (e) => {
        setView2(true)
        const results = tableData.filter(post => {
            if (e.target.value === " ") return tableData
            return post.employee_name.toLowerCase().includes(e.target.value.toLowerCase()) || post.empID.includes(e.target.value)
        })
        setstate2({
            query: e.target.value,
            list: results
        })
    }


    function CancelView() {
        setTimeout(() => {
            setView(true)
        }, 1000);
    }
    function changeByEmployee() {
        setView(false)
        props.changeByEmployee(state.query)
    }
    function changeByInterviewer() {
        setView2(false)
        props.changeByInterviewer(state2.query)
    }
    return (

        <div className={classes.filter_box}>
            <form className={classes.input_div}>
                <label htmlFor="interviewer">Interviewer</label>
                <input value={state2.query} onChange={handleChange2} type="text" id='interviewer' placeholder='Interviewer ID , Interviewer Name..' />
                <img className={classes.img1} src={mag} alt="" onClick={(e) => changeByInterviewer()} />
                <div className={`${classes.search_table} ${View2 === true ? classes.visible : ''}`}>
                    <MainTable Inp={false} Btn={false} headings={tableHeadingsforInterviewer} data={state2.list === undefined ? tableData2 : state2.list} keys={['interviewer_name', 'interviewer_id']} />
                </div>
            </form>

            <form className={classes.input_div}>
                <label htmlFor="interviewee">Interviewee</label>
                <input value={state.query} onChange={handleChange} type="text" id='interviewee' placeholder='Interviewee Name..' />
                <img className={classes.img1} src={mag} alt="" onClick={(e) => changeByEmployee()} />
                <div className={`${classes.search_table} ${View === true ? classes.visible : ''}`}>
                    <MainTable Inp={false} Btn={false} headings={tableHeadings} data={state.list === undefined ? tableData : state.list} keys={['intervieww_name',]} />
                </div>
            </form>

            <div className={`${classes.input_div} ${classes.dp_inp}`} style={{ marginRight: '0' }}>
                <label htmlFor="date">Date</label>
                {/* <input id='date' type="date" />
        <img src={vec} className={classes.img2} alt="" /> */}
                <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                <img src={vec} className={classes.img2} alt="" />
            </div>
        </div>
    )
}

export default InterviewFilter