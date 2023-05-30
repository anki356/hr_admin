import classes from './Grade.module.css'
import React, { useEffect, useState } from 'react'
import Heading from '../../Components/Heading/Heading'
import TileContainer from '../../UI/TileContainer/TileContainer'
import DropDownFilter from '../../Components/DropDownFilter/DropDownFilter'
import Filter from '../../Components/Filter/Filter'

import Pagination from '../../Components/Pagination/Pagination'
// Data for Table

import MainTable from '../../Components/MainTable/MainTable'
import axios from 'axios'
import Cookies from 'universal-cookie'
import moment from 'moment'
const Grade = () => {
  const url = "http://localhost:9000/"
const [Data,setData]=useState([])
const [date, setDate] = useState(new Date())
  const [limit, setLimit] = useState(10)
  const [offset, setOffset] = useState(0)
  const cookies = new Cookies();
  const token = cookies.get('token')
  const [TileData, setTileData] = useState([])
  const [employeeFilter, setEmployeeFilter] = useState({
    employee_query: '',
    floor_name: "",
    role_name: "",
    store_name: ""
  })
  useEffect(()=>{
    const headers = { "Authorization": "Bearer " + token }
let from_date=moment()
from_date=from_date.startOf('month')
let to_date=moment().endOf('month').add(1,'d')
axios.get(url+"api/getGrades?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + to_date.format("YYYY-MM-DD") + "&limit=" + limit + "&offset=" + offset,{headers}).then((response)=>{
  response.data.forEach((data)=>{
    data.out_of_40=data.grade_1st_avg+data.grade_2nd_avg+data.grade_3rd_avg+data.grade_4th_avg
  data.out_of_60=(data.WD_Grade+data.COM_Grade+data.Fine_Marks)*2})
setData(response.data)
})
axios.get(url+"api/calculateAverageGrade",{headers}).then((response)=>{
  axios.get(url+"api/isGraded",{headers}).then((responseOne)=>{
    axios.get(url+"api/getTotalEmployees",{headers}).then((responseTwo)=>{ 
      let from_date_out=moment()
      axios.get("http://localhost:9000/api/getTotalOutSessions?from_date=" + from_date_out.format("YYYY-MM-DD") + "&to_date=" + from_date_out.add(1, 'd').format("YYYY-MM-DD"), { headers }).then((responseThird) => {
setTileData( [
  {
    title: 'Average Employee',
    value: response.data,
  },
  {
    title: 'Grade Employee',
    value: responseOne.data[0].count_id
  },
  {
    title: 'Left Grade Employee',
    value: responseTwo.data[0].count_id-responseOne.data[0].count_id,
   
  },
  {
    title: 'Out From Store',
    value: responseThird.data[0].count_id,
    
  }
])
})
})
})
})
  },[])
  

  // Table Headings, Data and Keys
  const tableHeadings=[
    {heading:'Employee Name'},
    {heading:'Employee ID'},
    {heading:'Designation'},
    {heading:'WD Grade'},
    {heading:'COM Grade'},
    {heading:'Fine Marks'},
    {heading:'Out of 60'},
    {heading:'Behavior With Customer'},
    {heading:'Behavior With Staff/Head'},
    {heading:'Counter Clearance'},
    {heading:'Presentation'},
    {heading:'Out Of 40'},
    {heading:'Out Of 100'},
    {heading:'Final Grade'}
  ]

  const tableKeys = [
    'employee_name','empID','role_name','WD_Grade','COM_Grade','Fine_Marks','out_of_60','grade_1st_avg','grade_2nd_avg','grade_3rd_avg','grade_4th_avg','out_of_40','Total','Grade_Equivalent'
  ]
  useEffect(() => {
    const headers = { "Authorization": "Bearer " + token }
    let from_date = moment(date).startOf('month')
  let to_date=moment(date).endOf('month').add(1,'d')
  console.log(from_date,to_date)
    let getString = url + "api/getGrades?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + to_date.format("YYYY-MM-DD") + "&limit=" + limit + "&offset=" + offset
    if (employeeFilter.employee_query != '') {
      getString += "&employee_query=" + employeeFilter.employee_query
    }
    if (employeeFilter.role_name != '') {
      getString += '&role_name=' + employeeFilter.role_name
    }
    if (employeeFilter.floor_name != '') {
      getString += "&floor_name=" + employeeFilter.floor_name
    }
    if (employeeFilter.store_name != '') {
      getString += "&store_name=" + employeeFilter.store_name
    }
    axios.get(getString,{headers}).then((response)=>{
      response.data.forEach((data)=>{
        data.out_of_40=data.grade_1st_avg+data.grade_2nd_avg+data.grade_3rd_avg+data.grade_4th_avg
      data.out_of_60=(data.WD_Grade+data.COM_Grade+data.Fine_Marks)*2})
    setData(response.data)
    })
   
  
  }, [date, limit, offset, employeeFilter])
  const selectByStore = (data) => {
  
    setEmployeeFilter((prevState) => {
      return { ...prevState, store_name: data }
    })
  
  }
  const selectByFloor = async (data) => {
  
    setEmployeeFilter((prevState) => {
      return { ...prevState, floor_name: data }
    })
  }
  
  const changeDate = (data) => {
    setDate(data)
  }
  const changeByEmployee = (data) => {
  
    // if(data.charAt(0)!=='1')
    //  {
  
    setEmployeeFilter((prevState) => {
      return { ...prevState, employee_query: data }
    })
  }
  const changeByDesignation = (data) => {
  
    setEmployeeFilter((prevState) => {
      return { ...prevState, role_name: data }
    })
  
  }
  const selectEntries = (data) => {
    setLimit(data)
  }
  const selectPage = (data) => {
    console.log(data)
    setOffset((data - 1) * limit)
  }
  return (
    <React.Fragment>
      <Heading heading={'Grade'}  />
      <TileContainer Data={TileData} />
      <DropDownFilter selectByFloor={selectByFloor} selectByStore={selectByStore}  title1={'Floor'} title2={'Store'} />
      <Filter data={Data} changeDate={changeDate} changeByDesignation={changeByDesignation} changeByEmployee={changeByEmployee} />
      <div className={classes.whole_table_c}
      >
        <MainTable data={Data} height={true} Lnk06={true} headings={tableHeadings} keys={tableKeys} link1={false} link2={'/view_grade'} wd={'2700px'} />
      </div>
      <Pagination selectEntries={selectEntries} selectPage={selectPage} />
    </React.Fragment>
  )
}
// else if(error!==null &loading){
  <React.Fragment>
    <h1>Loading</h1>
    </React.Fragment>

export default Grade