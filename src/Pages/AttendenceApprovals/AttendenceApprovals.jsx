import classes from './AttendenceApprovals.module.css'
import React,{useState} from 'react'
import Heading from '../../Components/Heading/Heading'
import TileContainer from '../../UI/TileContainer/TileContainer'
import DropDownFilter from '../../Components/DropDownFilter/DropDownFilter'
import Filter from '../../Components/Filter/Filter'
import useGetHook from '../../Hooks/useGetHook'
import moment from 'moment/moment'
import MainTable from '../../Components/MainTable/MainTable'

const AttendenceApprovals = () => {
  const url="http://localhost:4000/"
  // Here is our data for tile in the page
  const [date,setDate]=useState(new Date())
  const from_date=moment(date)
  const [limit,setLimit]=useState(10)
  const [offset,setOffset]=useState(0)
  const{data,loading,error}=useGetHook(url+"api/getAttendance?from_date="+from_date.format("YYYY-MM-DD")+"&to_date="+from_date.add(1,'d').format("YYYY-MM-DD")+"&limit="+limit+"&offset="+offset+"&status='Pending'")
  const TileData = [
    {
      title: 'Total Expense',
      value: '₹5000',
      num: 15
    },
    {
      title: 'Pending Approvals',
      value: 42,
      num: 23
    },
    {
      title: 'On Leave',
      value: 50,
      num: 10
    },
    {
      title: 'Out From Store',
      value: 104,
      num: -23
    }
  ]

  // Table Headings, Data and Keys
  const tableHeadings=[
    {heading:'Employee Name'},
    {heading:'Employee ID'},
    {heading:'Attendence'},
    {heading:'Floor'}
  ]

  const tableKeys = [
    'employee_name','empID','status','floor_name'
  ]
if(!loading){

  return (
    <React.Fragment>
      <Heading heading={'Attendance Approvals'} />
      <TileContainer Data={TileData} />
      <DropDownFilter title1={'Floor'} title2={'Store'}  />
      <Filter data={data} />
      <MainTable data={data} height={true} Lnk={true} headings={tableHeadings} keys={tableKeys} link1={'/attendence_approval'} link2={'/attendence_history'} />
    </React.Fragment>
  )
}
else if(error!==null &loading){
  <React.Fragment>
    <h1>Loading</h1>
    </React.Fragment>
}
else{
  <React.Fragment>
    <h1>error</h1>
    </React.Fragment>
}
}

export default AttendenceApprovals