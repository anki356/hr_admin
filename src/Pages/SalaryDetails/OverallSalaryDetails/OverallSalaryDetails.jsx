import React, { useState,useEffect } from 'react'
import Heading from '../../../Components/Heading/Heading'
import classes from './OverallSalaryDetails.module.css'
import ExtraDetailsDiv from '../../../Components/ExtraDetails/ExtraDetailsDiv'
import DropDownFilter from '../../../Components/DropDownFilter/DropDownFilter'
import MainTable from '../../../Components/MainTable/MainTable'
import data from './data'
import Vec from '../../../assets/vector9.png'
import Calendar from 'react-calendar'
import './calender.css'
import DetailsDivContainer from '../../../UI/DetailsDivContainers/DetailsDivContainer'
import CalendarBottomDiv from '../../../Components/CalendqrBottomDiv/CalendarBottomDiv'
import GroupTable from '../../../Components/GroupTable/GroupTable'
import BottomButtonContainer from '../../../Components/BottomButtonContainer/BottomButtonContainer'
import FullCalendar from '../../../Components/FullCalender/FullCal'
import FullCal from '../../../Components/FullCalender/FullCal'
import OSD_Charts from './OSD_Charts'

import LabeledInput from '../../../Components/LabeledInput/LabeledInput'
import { useNavigate, useParams } from 'react-router-dom';
import useHttp from '../../../Hooks/use-http'
import Cookies from 'universal-cookie'
import moment from 'moment-timezone'
import axios from 'axios'
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


const OverallSalaryDetails = () => {
  const { sendRequest: fetchSalary } = useHttp()
  const url = "http://localhost:9000/"
  const cookies = new Cookies();
  const token=cookies.get('token')
  const headers = { "Authorization": "Bearer " + token }
  const [div_data, setDivData] = useState([])
  const { sendRequest: fetchEmployeeDetails } = useHttp()
  const { sendRequest: fetchAttendance } = useHttp()
  const { sendRequest: fetchFine } = useHttp()
  const { sendRequest: fetchSalarySummary } = useHttp()
  const [ArrData , setArrData] = useState([])
  const navigate = useNavigate()
  const [attendanceData, setAttendanceData] = useState([])
  const [summaryData, setSummaryData] = useState([])
  const [no_of_working, setNOOfWorking] = useState([])
  const [off, setOff] = useState(0)
  const [totalFine, setTotalFine] = useState(0)
const [emp_id,setEmpID]=useState(null)
const [salary,setSalary]=useState([])

  const { id } = useParams()
  useEffect(()=>{

    setArrData( attendanceData.map((element, index) => {
      return {
        title: element.status,
        date: element.datetime,
        backgroundColor: element.status
      }
    }))
  },[attendanceData])
  useEffect(() => {
   
    const dayArray=['Sunday','Monday','TuesDay','Wednesday','Thursday','Friday','Saturday']
   
      const listSalarySummary=(Summary)=>{
        Summary.forEach((data)=>{

          data.date=data.check_in_datetime.split("T")[0].split("-").reverse().join("-")
          data.time=data.check_in_datetime.split("T")[1].substring(0,8)
          data.day=dayArray[moment(data.check_in_datetime).day()]
          data.commission=0
        })
  
        setSummaryData(Summary)
        
      }
      let from_date=moment().subtract(1,"M").startOf('month')
      let end_date=moment().startOf('month')
      if(emp_id!==null){

        fetchSalarySummary({url:url+"api/getSalarySummary?employee_id="+emp_id+"&from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + end_date.format("YYYY-MM-DD")},listSalarySummary)
      }
    
    
    
  }, [emp_id])
  useEffect(() => {
    const getTotalFine = (fineDetails) => {

      if (fineDetails[0].amount !== null) {
        setTotalFine(fineDetails[0].amount)
      }
    }
    const listEmployeeDetails = (employeeDetails) => {
      setDivData([{
        title: "Name",
        value: employeeDetails.employeesResult[0].name
      }, {
        title: 'SuperVisor Name',
        value: employeeDetails.headEmployeesResult[0]?.head_employee_name
      }, {
        title: 'Designation',
        value: employeeDetails.employeesResult[0].role_name
      }, {
        title: 'Floor Name',
        value: employeeDetails.employeesResult[0].floor_name

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
    const dayArray=['Sunday','Monday','TuesDay','Wednesday','Thursday','Friday','Saturday']
    const listSalary=(Salary)=>{
      setSalary(Salary)
      fetchEmployeeDetails({ url: url + "api/getEmployeeDetails?id=" + Salary[0].emp_id }, listEmployeeDetails)
      setEmpID(Salary[0].emp_id )
      const listSalarySummary=(Summary)=>{
        Summary.forEach((data)=>{

          data.date=data.check_in_datetime.split("T")[0].split("-").reverse().join("-")
          data.time=data.check_in_datetime.split("T")[1].substring(0,8)
          data.day=dayArray[moment(data.check_in_datetime).day()]
          data.commission=0
        })
  
        setSummaryData(Summary)
        
      }
      from_date=moment().subtract(1,"M").startOf('month')
      end_date=moment().startOf('month')
      if(emp_id!==null){

        fetchSalarySummary({url:url+"api/getSalarySummary?employee_id="+emp_id+"&from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + end_date.format("YYYY-MM-DD")},listSalarySummary)
      }
    }
    fetchSalary({url:url+"api/getSalary?id="+id},listSalary)
    
    const listAttendance = (attendance) => {
      setAttendanceData(attendance)
    }
    let from_date = moment().startOf('month')
    let end_date = moment().endOf('month')
    fetchAttendance({ url: url + "api/getAttendance?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + end_date.add(1, 'd').format("YYYY-MM-DD") + "&employee_id=" + emp_id }, listAttendance)
    const listWorkingdays = (attendance) => {
      setNOOfWorking(attendance.length)
    }
    from_date = moment().startOf('month')
    end_date = moment().endOf('month')
    fetchAttendance({ url: url + "api/getAttendance?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + end_date.format("YYYY-MM-DD") + "&employee_id=" + emp_id + "&status='Present'" }, listWorkingdays)
    const listAbsent = (attendance) => {
      setOff(attendance.length)
    }
    from_date = moment().startOf('month')
    end_date = moment().endOf('month')
    fetchAttendance({ url: url + "api/getAttendance?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + end_date.format("YYYY-MM-DD") + "&employee_id=" + emp_id + "&status='Absent'&status='On Leave'&status='Pending'" }, listAbsent)


    end_date = moment().endOf('month')
    fetchFine({ url: url + "api/getTotalFines?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + end_date.add(1, 'd').format("YYYY-MM-DD") + "&employee_id=" + emp_id }, getTotalFine)
    
  }, [])
  console.log(summaryData)
  const getDate = (date) => {
    const getTotalFine = (fineDetails) => {

      if (fineDetails[0].amount !== null) {
        setTotalFine(fineDetails[0].amount)
      }
    }
    var from_date = moment(date).startOf('month')
    var end_date = moment(date).endOf('month').add(1,'d')
    const listAttendance = (attendance) => {
      setAttendanceData(attendance)
    }
    fetchAttendance({ url: url + "api/getAttendance?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + end_date.format("YYYY-MM-DD") + "&employee_id=" + emp_id }, listAttendance)
    const listWorkingdays = (attendance) => {
      setNOOfWorking(attendance.length)
    }
    from_date = moment(date).startOf('month')
    end_date = moment(date).endOf('month').add(1,'d')
    fetchAttendance({ url: url + "api/getAttendance?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + end_date.format("YYYY-MM-DD") + "&employee_id=" + emp_id + "&status='Present'" }, listWorkingdays)
    const listAbsent = (attendance) => {
      setOff(attendance.length)
    }
    from_date = moment(date).startOf('month')
    end_date = moment(date).endOf('month').add(1,'d')
    fetchAttendance({ url: url + "api/getAttendance?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + end_date.format("YYYY-MM-DD") + "&employee_id=" + emp_id + "&status='Absent'&status='On Leave'&status='Pending'" }, listAbsent)
    from_date = moment(date).startOf('month')
     end_date = moment(date).endOf('month').add(1,'d')
    fetchFine({ url: url + "api/getTotalFines?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + end_date.add(1, 'd').format("YYYY-MM-DD") + "&employee_id=" + emp_id }, getTotalFine)
  }
  var calData = [
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

  const selectMonthFunc = (data) => {
    let year = new Date().getFullYear()
    var from_date = moment([year, data - 1])
    var to_date = moment([year, data])
    const listAttendance = (attendance) => {
      setAttendanceData(attendance)
    }
    fetchAttendance({ url: url + "api/getAttendance?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + to_date.format("YYYY-MM-DD") + "&employee_id=" + emp_id }, listAttendance)
  }
  const tableHeadings = [
    { heading: 'Date' },
    { heading: 'Day' },
    { heading: 'Time' },
    { heading: 'No. Of Working' },
    { heading: 'Commission' },
    { heading: 'Total Fines' }
  ]

  const tableKeys = ['date', 'day', 'time', 'no_of_shifts', 'commission', 'amount']

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

  function download(){

    navigate("/download/"+id)
    
     
 }
function pay(){
  let year=new Date().getFullYear()
  let month=salary[0].month
axios.patch(url+"api/paySalary/"+id,{
  from_date:moment.tz([year,month],"Asia/Calcutta").startOf('month'),
  to_date:moment.tz([year,month+1],"Asia/Calcutta").startOf('month'),
  employee_id:salary[0].emp_id
},{headers}).then((response)=>{
  if(response){

    navigate(-1)
  }
})
}
function cancel(){

}

  return (
    <React.Fragment>
      <Heading heading={'Salary Details'} />
      <DetailsDivContainer data={div_data} />
      <br /><br />
      <div className={classes.calender_container}>
        <div className={classes.actual_calender}>
          {/* <div className={classes.select_date_con}>
           <LabeledInput type='date' id='select_date' title='Select Date' img={false} func2={selectMonthFunc} />
          </div> */}
          <br />
          <FullCal dateFunc={getDate} event={ArrData}  />
        </div>
      </div>
      <CalendarBottomDiv data={calData} />
      <OSD_Charts emp_id={emp_id}/>
      <br />
      <h3 className='uni_heading'>Salary History</h3>
      {/* <DropDownFilter title1={'Floor'} title2={'Store'} /> */}
      <MainTable headings={tableHeadings} keys={tableKeys} data={summaryData} height={true} />
      <button className={classes.salary_history_btn} onClick={download}>Salary Summary</button>
      <br />
      <GroupTable salary={salary} />
      <br /> <br />
      {
        salary.status==='Pending'?
<BottomButtonContainer approve={'Pay Salary'} cancel={'Notify Employee'} func={true} cancelRequests={cancel} func2={pay} />:null
      }
      

    </React.Fragment>
  )
}

export default OverallSalaryDetails