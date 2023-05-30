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
import SelectTag from '../SelectTag/SelectTag'
import classes2 from './InterviewFilter.module.css'
import Img from '../../assets/shop.png'


const InterviewFilter = (props) => {

    const cookies = new Cookies();
    const [View, setView] = useState(false)
    const [View2, setView2] = useState(false)
    const [startDate, setStartDate] = useState(new Date());
    const [designationOptions, setDesignationOptions] = useState([])
    const [selecteInterviwer, setSelectedInterviewer] = useState('')
   
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
    
    const tableData = props.data.map((element) => 
       {return {
            employee_name: element.employee_name
          
        }}
    )
    
   
   

    const tableHeadings = [
        { heading: 'Interviewee Name' }
    ]
    const tableHeadingsforInterviewer = [
        { heading: 'Interviewer Name' },
        { heading: 'Interviewer ID' }
    ]

    const [state, setstate] = useState({
        query:'',
        list:''
    })
    const [state2, setstate2] = useState('')
    useEffect(() => {
        props.changeDate(startDate)
    }, [startDate])
    const handleChange = (e) => {
        setView(true)
      
        const results = tableData.filter((data) => {
            if (e.target.value === " ") return tableData
            console.log(data)
            return data.employee_name?.toLowerCase()?.includes(e.target.value?.toLowerCase()) 
        })
        setstate({
            query: e.target.value,
            list: results
        })
       console.log(state.list) 
    }
    const handleChange2 = (e) => {
        setView2(true)
     
        const results = tableData.filter(post => {
            if (e.target.value === " ") return tableData
            
            return post.employee_name?.toLowerCase().includes(e.target.value?.toLowerCase()) 
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
    function changeByInterviewer(data) {
        setSelectedInterviewer(data)
        
        props.changeByInterviewer(data)
        setView(false)
    }
    function changeByInterviewee() {
       
        props.changeByInterviewee(state.query)
        setView(false)
    }
    return (

        <div className={classes.filter_box}>
            <div className={classes2.select_container}>
                <label htmlFor="interviewer">Interviewer</label>
                <SelectTag img={Img} select_id='interviewer' title={'Interviewer'}  data={props.data2} selectedVal={changeByInterviewer}/>
            </div>

            <form className={classes.input_div}>
                <label htmlFor="interviewee">Interviewee</label>
                <input value={state.query} onChange={handleChange} type="text" id='interviewee' placeholder='Interviewee Name..' />
                <img className={classes.img1} src={mag} alt="" onClick={(e) => changeByInterviewee(e)} />
                <div className={`${classes.search_table} ${View === true ? classes.visible : ''}`}>
                    <MainTable Inp={false} Btn={false} headings={tableHeadings} data={state.list === undefined ? tableData : state.list} keys={['employee_name']} />
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