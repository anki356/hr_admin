import classes from './AttendenceApprovals.module.css'
import React,{useEffect, useState} from 'react'
import Heading from '../../Components/Heading/Heading'
import TileContainer from '../../UI/TileContainer/TileContainer'
import DropDownFilter from '../../Components/DropDownFilter/DropDownFilter'
import Filter from '../../Components/Filter/Filter'
import useGetHook from '../../Hooks/useGetHook'
import moment from 'moment/moment'
import MainTable from '../../Components/MainTable/MainTable'

import Entrypage from '../../components/entrypage/Entrypage';
import axios from 'axios'
const AttendenceApprovals = () => {
  const url="http://localhost:9000/"
  // Here is our data for tile in the page
  const [date,setDate]=useState(new Date())
 const [data,setData]=useState([])
  const [limit,setLimit]=useState(10)
  const [offset,setOffset]=useState(0)
  const [employeeFilter, setEmployeeFilter] = useState({
    employee_query:'',
    floor_name:"",
    role_name:"",
    store_name:""
  })
  // let {data,loading,error}=useGetHook(url+"api/getAttendance?from_date="+from_date.format("YYYY-MM-DD")+"&to_date="+from_date.add(1,'d').format("YYYY-MM-DD")+"&limit="+limit+"&offset="+offset+"&status='Pending'", from_date_format)
  useEffect(()=>{
    let token=localStorage.getItem('token')
    if(token===null){
    navigate('/login')
    }
    const headers={"Authorization":"Bearer "+token}
    let from_date=moment()
    
  axios.get(url+"api/getAttendance?from_date="+from_date.format("YYYY-MM-DD")+"&to_date="+from_date.add(1,'d').format("YYYY-MM-DD")+"&limit="+limit+"&offset="+offset+"&status='Pending'",{headers}).then((response)=>{
   
            setData(response.data)
        })
       
//   from_date=moment()
//   axios.get("http://localhost:3000/api/getTotalApprovals?from_date="+from_date.format("YYYY-MM-DD")+"&to_date="+from_date.add(1,'d').format("YYYY-MM-DD"),{headers}).then((response)=>{
//     setApprovedSessions(response.data[0].count_id)
//     from_date=moment().subtract(1,'d')
//   axios.get("http://localhost:3000/api/getTotalApprovals?from_date="+from_date.format("YYYY-MM-DD")+"&to_date="+from_date.add(1,'d').format("YYYY-MM-DD"),{headers}).then((responseOne)=>{
//     setApprovedSessionsNum(response.data[0].count_id-responseOne.data[0].count_id)
//     from_date=moment()
//     axios.get("http://localhost:3000/api/getTotalEmployeesApproved?from_date="+from_date.format("YYYY-MM-DD")+"&to_date="+from_date.add(1,'d').format("YYYY-MM-DD"),{headers}).then((responseSecond)=>{
//     setApprovedIndividuals(responseSecond.data[0].count_id)
//     from_date=moment().subtract(1,'d')
//   axios.get("http://localhost:3000/api/getTotalApprovals?from_date="+from_date.format("YYYY-MM-DD")+"&to_date="+from_date.add(1,'d').format("YYYY-MM-DD"),{headers}).then((responseThird)=>{

//     setApprovedIndividualsNum(responseSecond.data[0].count_id-responseThird.data[0].count_id)
//     from_date=moment(date)
//         axios.get("http://localhost:3000/api/getTotal?from_date="+from_date.format("YYYY-MM-DD")+"&to_date="+from_date.add(1,'d').format("YYYY-MM-DD")+"&status='On leave'",{headers}).then((response)=>{
//             setTotalLeave(response.data[0].count_id)
        
//         from_date=moment(date).subtract(1,'d')
//         axios.get("http://localhost:3000/api/getTotal?from_date="+from_date.format("YYYY-MM-DD")+"&to_date="+from_date.add(1,'d').format("YYYY-MM-DD")+"&status='On leave'",{headers}).then((responseTwo)=>{
//             setTotalLeaveNum(response.data[0].count_id-responseTwo.data[0].count_id)
// })
//         })
//         let from_date_out=moment()
//     axios.get("http://localhost:3000/api/getTotalOutSessions?from_date="+from_date_out.format("YYYY-MM-DD")+"&to_date="+from_date_out.add(1,'d').format("YYYY-MM-DD"),{headers}).then((responseFourth)=>{
//         setTotalOuts(responseFourth.data[0].count_id)
        
//     })

// })
//     })
//   }) 
//   })   

  },[])
  useEffect(()=>{
    let token=localStorage.getItem('token')
    if(token===null){
    navigate('/login')
    }
    const headers={"Authorization":"Bearer "+token}
    let from_date=moment(date)
    
  let getString=url+"api/getAttendance?from_date="+from_date.format("YYYY-MM-DD")+"&to_date="+from_date.add(1,'d').format("YYYY-MM-DD")+"&limit="+limit+"&offset="+offset+"&status='Pending'"
    if(employeeFilter.employee_query!=''){
      getString+="&employee_query="+employeeFilter.employee_query
}
      if(employeeFilter.role_name!=''){
        getString+='&role_name='+employeeFilter.role_name
      }
      if(employeeFilter.floor_name!=''){
        getString+="&floor_name="+employeeFilter.floor_name
      }
      if(employeeFilter.store_name!=''){
        getString+="&store_name="+employeeFilter.store_name
      }
        
      
      
      
      axios.get(getString,{headers}).then((response)=>{
            setData(response.data)
        })
  },[date,limit,offset,employeeFilter])
  const selectEntries=(data)=>{
    setLimit(data)
        }
        const selectPage=(data)=>{
            setOffset((data-1)*limit)
        }
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
  const changeDate=(data)=>{
    setDate(data)
}
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
  const changeByDesignation=(data)=>{
   
    setEmployeeFilter((prevState)=>{
    return {...prevState,role_name:data}
    })
    
  }
// if(!loading){

  return (
    <React.Fragment>
      <Heading heading={'Attendance Approvals'} />
      <TileContainer Data={TileData} />
      <DropDownFilter title1={'Floor'} title2={'Store'}  />
      <Filter data={data}  changeDate={changeDate} changeByDesignation={changeByDesignation}/>
      <MainTable data={data} height={true} Lnk={true} headings={tableHeadings} keys={tableKeys} link1={'/attendence_approval'} link2={'/attendence_history'} />
      <Entrypage selectEntries={selectEntries} selectPage={selectPage}/>
    </React.Fragment>
  )
}
// else if(error!==null &loading){
  <React.Fragment>
    <h1>Loading</h1>
    </React.Fragment>
// }
// else{
//   <React.Fragment>
//     <h1>error</h1>
//     </React.Fragment>
// }
// }

export default AttendenceApprovals