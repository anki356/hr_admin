import classes from './Filter.module.css'
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

const Filter = (props) => {

  const cookies = new Cookies();
  const [View, setView] = useState(false)
  const [startDate, setStartDate] = useState(null);
  const[designationOptions,setDesignationOptions]=useState([])
  const[selectedDesignation,setSelectedDesignation]=useState('')
  const filterByDesignation=async(e)=>{
    setSelectedDesignation(e.target.value)
    props.changeByDesignation(e.target.value)
    }
    useEffect(() => {
      const fetching=async()=>{
        const token = cookies.get('token')
        const headers={"Authorization":"Bearer "+token}
        axios.get("http://localhost:9000/api/getRoles",{headers}).then((response)=>{
          setDesignationOptions(response.data)
        })
      }
      fetching()
  }, [])
  const tableData = props.data.length>0&&props.data.map((element) => (
    {
      employee_name: element.employee_name,
      empID: element.empID,
      image: element.image
    }
  ))

  const tableHeadings = [
    { heading: 'Employee Name' },
    { heading: 'Emp ID' }
  ]

  const [state, setstate] = useState('')
  useEffect(()=>{
    props.changeDate(startDate)
        },[startDate])
  const handleChange = (e) => {
    setView(true)
    const results = tableData.filter(post => {
      if (e.target.value === " ") return tableData
      return post.employee_name.toLowerCase().includes(e.target.value.toLowerCase())||post.empID.includes(e.target.value)
    })
    setstate({
      query: e.target.value,
      list: results
    })
  }


  function CancelView() {
    setTimeout(() => {
      setView(false)
    }, 1000);
  }
function changeByEmployee(){
  setView(false)
  props.changeByEmployee(state.query)
}
  return (

    <div className={classes.filter_box}>
      <form  className={classes.input_div}>
        <label htmlFor="Employees">Employees</label>
        <input value={state.query} onChange={handleChange} type="text" id='Employees' placeholder='Emp ID , Employee Name..' />
        <img className={classes.img1} src={mag} alt="" onClick={(e)=>changeByEmployee()} />
        <div className={`${classes.search_table} ${View === true ? classes.visible : ''}`}>
          <MainTable Inp={false} Btn={false} headings={tableHeadings} data={state.list === undefined ? tableData : state.list} keys={['employee_name', 'empID']} />
        </div>
      </form>

      <div className={classes.input_div}>
        <label htmlFor="Designation">Designation</label>
        <select
            value={selectedDesignation}
            onChange={filterByDesignation}
            id="Designation"
            >
              <option defaultValue="All Designation"></option>
            {designationOptions&&designationOptions.map((value) => <option key={value.id} value={value.role_name} >{value.role_name}</option>)}
            </select>
        <img src={vec} className={classes.img2} alt="" />
      </div>


      <div className={`${classes.input_div} ${classes.dp_inp}`} style={{ marginRight: '0' }}>
        <label htmlFor="date">Date</label>
         {/* <input id='date' type="date" />
        <img src={vec} className={classes.img2} alt="" /> */}
         <DatePicker  selected={startDate} onChange={(date) => setStartDate(date)} />
         <img src={vec} className={classes.img2} alt="" />
      </div>


    </div>
  )
}

export default Filter