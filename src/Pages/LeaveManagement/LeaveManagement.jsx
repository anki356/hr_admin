import React, { useState,useEffect } from 'react'
import Heading from '../../Components/Heading/Heading'
import TileContainer from '../../UI/TileContainer/TileContainer'
import DropDownFilter from '../../Components/DropDownFilter/DropDownFilter'
import Filter from '../../Components/Filter/Filter'

import moment from 'moment/moment'
import useHttp from '../../Hooks/use-http'
import axios from 'axios'
import Pagination from '../../Components/Pagination/Pagination'
import Cookies from 'universal-cookie'
// Data for Table
import Data from './data'
import MainTable from '../../Components/MainTable/MainTable'
import AddLeaveModal from '../../Components/AllModals/AddLeaveModal'

const LeaveManagement = () => {
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
  const cookies = new Cookies();
  const { sendRequest: fetchLeaves } = useHttp()
  
  const [TileData ,setTileData]=useState([])
  // Here is our data for tile in the page
  useEffect(()=>{
  const token = cookies.get('token')
    const headers={"Authorization":"Bearer "+token}
    let from_date=moment()
    const listLeave = (leave) => {
      setData(leave)
    }
    fetchLeaves({ url: url+"api/getLeaves?from_date="+from_date.format("YYYY-MM-DD")+"&to_date="+from_date.add(1,'d').format("YYYY-MM-DD")+"&limit="+limit+"&offset="+offset+"&status='Pending'" }, listLeave)
    from_date=moment()
    axios.get(url+"api/getTotalEmployeesOnLeave?from_date="+from_date.format("YYYY-MM-DD")+"&to_date="+from_date.add(1,'d').format("YYYY-MM-DD"),{headers}).then((response)=>{
      let employeeOnLeave=response.data[0].count_id
      from_date=moment().subtract(1,'d')
      axios.get(url+"api/getTotalEmployeesOnLeave?from_date="+from_date.format("YYYY-MM-DD")+"&to_date="+from_date.add(1,'d').format("YYYY-MM-DD"),{headers}).then((responseOne)=>{
        let employeeOnLeaveYesterday=responseOne.data[0].count_id
        from_date=moment()
        axios.get(url+"api/getTotalLeaves?from_date="+from_date.format("YYYY-MM-DD")+"&to_date="+from_date.add(1,'d').format("YYYY-MM-DD")+"&status='Approved'",{headers}).then((responseTwo)=>{
let leavesApproved=responseTwo.data[0].count_id
from_date=moment().subtract(1,'d')
axios.get(url+"api/getTotalLeaves?from_date="+from_date.format("YYYY-MM-DD")+"&to_date="+from_date.add(1,'d').format("YYYY-MM-DD")+"&status='Approved'",{headers}).then((responseThird)=>{
  let leavesApprovedNum=responseThird.data[0].count_id
  from_date=moment()
        axios.get(url+"api/getTotalLeaves?from_date="+from_date.format("YYYY-MM-DD")+"&to_date="+from_date.add(1,'d').format("YYYY-MM-DD")+"&status='Pending'",{headers}).then((responseFourth)=>{
let leavesPending=responseFourth.data[0].count_id
from_date=moment().subtract(1,'d')
axios.get(url+"api/getTotalLeaves?from_date="+from_date.format("YYYY-MM-DD")+"&to_date="+from_date.add(1,'d').format("YYYY-MM-DD")+"&status='Pending'",{headers}).then((responseFifth)=>{
  let leavesPendingNum=responseFifth.data[0].count_id
 let from_date_out=moment()
    axios.get("http://localhost:9000/api/getTotalOutSessions?from_date="+from_date_out.format("YYYY-MM-DD")+"&to_date="+from_date_out.add(1,'d').format("YYYY-MM-DD"),{headers}).then((responseSixth)=>{ 
           let totalOut= responseSixth.data[0]?.count_id 
         setTileData( [
            {
              title: 'Total Employee',
              value: employeeOnLeave,
              num: employeeOnLeave-employeeOnLeaveYesterday
            },
            {
              title: 'Total Approved',
              value: leavesApproved,
              num: leavesApproved-leavesApprovedNum
            },
            {
              title: 'Total Pending.',
              value: leavesPending,
              num: leavesPending-leavesPendingNum
            },
            {
              title: 'Out From Store',
              value: totalOut
            }
          ])
})
          })
        })
          })
        })
      })
    })
  },[])
  useEffect(()=>{
    // let token=localStorage.getItem('token')
    // if(token===null){
    // navigate('/login')
    // }
    // const headers={"Authorization":"Bearer "+token}
    let from_date=moment(date)
    
  let getString=url+"api/getLeaves?from_date="+from_date.format("YYYY-MM-DD")+"&to_date="+from_date.add(1,'d').format("YYYY-MM-DD")+"&limit="+limit+"&offset="+offset+"&status='Pending'"
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
        
      const listLeave = (leave) => {
        setData(leave)
      }
      fetchLeaves({ url: getString }, listLeave) 
      
      
      // axios.get(getString,{headers}).then((response)=>{
      //       setData(response.data)
      //   })
  },[date,limit,offset,employeeFilter])
 

  // Table Headings, Data and Keys
  const tableHeadings = [
    { heading: 'Employee Name' },
    { heading: 'Employee ID' },
    { heading: 'Floor' },
    { heading: 'Designation' },
    { heading: 'Department' }
  ]

  const tableKeys = [
    'employee_name', 'empID', 'floor_name', 'role_name', 'department_name'
  ]
  const selectByStore=(data)=>{
   
    setEmployeeFilter((prevState)=>{
    return {...prevState,store_name:data}
    })
    
  }
  const selectByFloor=async(data) =>{
 
    setEmployeeFilter((prevState)=>{
      return {...prevState,floor_name:data}
      })
}
  const [newval, setNewVal] = useState(false)
  const [obj, setObj] = useState({})

  const changeModalState = ([val, element]) => {
    setNewVal(val)
    setObj(element)
  }
  const changeDate=(data)=>{
    setLimit(10)
    setOffset(0)
    setDate(data)
}
const changeByEmployee=(data)=>{
      
  // if(data.charAt(0)!=='1')
  //  {
    
    setEmployeeFilter((prevState)=>{
      return {...prevState,employee_query:data}
      })
    }
const changeByDesignation=(data)=>{
 
  setEmployeeFilter((prevState)=>{
  return {...prevState,role_name:data}
  })
  
}
const selectEntries=(data)=>{
  setLimit(data)
      }
      const selectPage=(data)=>{
        console.log(data)
          setOffset((data-1)*limit)
      }
  return (
    <React.Fragment>
      <Heading heading={'Leave Management'} />
      <TileContainer Data={TileData} />
      <DropDownFilter title1={'Floor'} title2={'Store'} selectByFloor={selectByFloor}  selectByStore={selectByStore}    />
      <Filter data={data}  changeDate={changeDate} changeByDesignation={changeByDesignation} changeByEmployee={changeByEmployee}/>
      <MainTable func={changeModalState}  data={data} height={true} Lnk={true} link1={'false'} link2={'/leave_approvals'} t2={'Approve'} t3={'Add Leave'} App_Btn={true} Btn={false} headings={tableHeadings} keys={tableKeys} />
      <AddLeaveModal value={newval} setval={setNewVal} Obj={obj} />
      <Pagination selectEntries={selectEntries} selectPage={selectPage} />
    </React.Fragment>
  )
}
// else if(error!==null &loading){
  <React.Fragment>
    <h1>Loading</h1>
    </React.Fragment>

export default LeaveManagement