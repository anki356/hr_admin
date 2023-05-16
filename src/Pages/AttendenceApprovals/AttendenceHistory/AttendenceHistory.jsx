import React, { useState,useEffect } from 'react'
import Heading from '../../../Components/Heading/Heading'
import classes from './AttendenceHistory.module.css'
import ExtraDetailsDiv from '../../../Components/ExtraDetails/ExtraDetailsDiv'
import DropDownFilter from '../../../Components/DropDownFilter/DropDownFilter'
import MainTable from '../../../Components/MainTable/MainTable'
import data from './data'
import Vec from '../../../assets/vector9.png'
import Calendar from 'react-calendar'
import './calender.css'
import FullCal from '../../../Components/FullCalender/FullCal'
import CalendarBottomDiv from '../../../Components/CalendqrBottomDiv/CalendarBottomDiv'

import { useNavigate, useParams } from 'react-router-dom';
import useHttp from '../../../Hooks/use-http'
import Cookies from 'universal-cookie'
import moment from 'moment'
const Tile = ({ date, view }) => {
  
  const CurrentDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getUTCFullYear()}`
  switch (date.getDay()) {
    case 0:
      return <div className='tile green_tile'>
        <div className='tile_color_div'></div>
        <span>off</span>
      </div>
    case 6:
      return <div className='tile green_tile'>
        <div className='tile_color_div '></div>
        <span>off</span>
      </div>

    default:
      return <div className='tile'>
        <div className='tile_color_div'></div>
        <span>9hr</span>
      </div>
  }
}


const AttendenceHistory = () => {
  const url="http://localhost:9000/"
  const cookies = new Cookies();
const [div_data,setDivData]=useState([])
const { sendRequest: fetchEmployeeDetails } = useHttp()
const { sendRequest: fetchAttendance } = useHttp()
const { sendRequest: fetchFine } = useHttp()

const navigate=useNavigate()
const [attendanceData,setAttendanceData]=useState([])
const[no_of_working,setNOOfWorking]=useState([])
const [off,setOff]=useState(0)
const[totalFine,setTotalFine]=useState(0)
const {id}=useParams()
useEffect(()=>{
  const getTotalFine= (fineDetails) => {
    
    if(fineDetails[0].amount!==null){
      setTotalFine(fineDetails[0].amount)
    }
  }
  const listEmployeeDetails= (employeeDetails) => {
    setDivData([{
      title:"Name",
      value:employeeDetails.employeesResult[0].name
    },{
title:'SuperVisor Name',
value:employeeDetails.headEmployeesResult[0]?.head_employee_name
    },{
      title:'Designation',
value:employeeDetails.employeesResult[0].role_name
    },{
      title:'Floor Name',
value:employeeDetails.employeesResult[0].floor_name

      }, {
        title: 'Gender',
        value: employeeDetails.employeesResult[0].gender

      }, {
        title: 'Store name',
        value: employeeDetails.employeesResult[0].store_name
      }, {
        title: 'Store Department',
        value: employeeDetails.employeesResult[0].store_department_name
      }])
  }
  fetchEmployeeDetails({ url: url+"api/getEmployeeDetails?id="+id }, listEmployeeDetails)
  const listAttendance= (attendance) => {
setAttendanceData(attendance)
  }
let from_date=moment().startOf('month')
let end_date=moment().endOf('month')
  fetchAttendance({url: url+"api/getAttendance?from_date="+from_date.format("YYYY-MM-DD")+"&to_date="+end_date.add(1,'d').format("YYYY-MM-DD")+"&employee_id="+id},listAttendance)

  let countPresent=0
  let countAbsent=0
  attendanceData.forEach((data)=>{
    if(data.status==='Present'){
      countPresent++
    }
    else{
      countAbsent++
    }
  })

  setNOOfWorking(countPresent)
  setOff(countAbsent)
  end_date=moment().endOf('month')
  fetchFine({url:url+"api/getTotalFines?from_date="+from_date.format("YYYY-MM-DD")+"&to_date="+end_date.add(1,'d').format("YYYY-MM-DD")+"&employee_id="+id},getTotalFine)
},[])
 
console.log(div_data);
  const tableHeadings = [
    { heading: 'Date' },
    { heading: 'Day' },
    { heading: 'Time' },
    { heading: 'No. Of Working' },
    { heading: 'Attendence' },
    { heading: ' ' },
    { heading: ' ' },
  ]

  const tableKeys = ['date', 'day', 'time', 'no_of_shifts', 'status']
const newData=[]
attendanceData.forEach((data)=>{
  let obj={}
obj.date=data.datetime?.split("T")[0]
obj.time=data.datetime?.split("T")[1].substring(0,8)
let date= moment(obj.date)
obj.day=date.day()
obj.no_of_shifts=data.no_of_shifts
obj.status=data.status
newData.push(obj)
})
  const [month, setMonth] = useState(new Date())
  const [newDate, setNewDate] = useState(new Date())
  const [year, setYear] = useState(new Date().getUTCFullYear())

  const yearHandler = (e) => {
    setYear(e.target.value)
    setNewDate(new Date(e.target.value))
  }

  const monthHandler = (e) => {
    setMonth(e.target.value)
    setNewDate(new Date(e.target.value))
  }
console.log(totalFine)
  const calData = [
    {
      p: 'No. Of Working',
      h1: no_of_working,
      bg: '#96503F'
    },
    {
      p: 'Total Late Fine',
      h1: totalFine,
      bg: '#FFE247'
    },
    {
      p: 'Total Fine',
      h1: totalFine,
      bg: '#8AFF88'
    },
    {
      p: 'Total Commission',
      h1: '00',
      bg: '#C50303'
    },
    {
      p: 'Total Off',
      h1: off,
      bg: '#80A4FF'
    },
  ]

  const ArrData = attendanceData.map((element,index)=>{
    return {
      title:element.status,
      date:element.datetime,
      backgroundColor:element.status
    }
  })

  console.log(ArrData);

  return (
    <React.Fragment>
      <Heading heading={'Attendence History'} />
      <div className={classes.inner_div}>
        {div_data.map((element, index) => (<ExtraDetailsDiv title={element.title} value={element.value} index={index} />))}
      </div>
      <div className={classes.calender_container}>
        <div className={classes.actual_calender}>
        <FullCal event={ArrData} />
        </div>
      </div>
      <CalendarBottomDiv data={calData} />
      <br /> 
      <h3 className='uni_heading'>Salary History</h3>
      <DropDownFilter title4={'Select Month'}  />
      <MainTable headings={tableHeadings} keys={tableKeys} data={newData} height={true} />
    </React.Fragment>
  )
}

export default AttendenceHistory