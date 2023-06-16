import React,{useState,useEffect} from 'react'
import Heading from '../../Components/Heading/Heading'
import TileContainer from '../../UI/TileContainer/TileContainer'
import DropDownFilter from '../../Components/DropDownFilter/DropDownFilter'
import Filter from '../../Components/Filter/Filter'

import Pagination from '../../Components/Pagination/Pagination'
import Cookies from 'universal-cookie'
import useHttp from '../../Hooks/use-http'
// Data for Table
import axios from 'axios'
import moment from 'moment/moment'
// Data for Table
import Data from './data'
import MainTable from '../../Components/MainTable/MainTable'

const EmployeeDetails = () => {
  const cookies = new Cookies();
  const url="http://localhost:9000/"
  const [Data,setData]=useState([])
  const [date,setDate]=useState(null)
  const [limit,setLimit]=useState(10)
  const [offset,setOffset]=useState(0)
  const [total,setTotal]=useState(0)
 
  const [totalEmpGrantedNum,setTotalEmpGrantedNum]=useState(0)
  const [totalPending,setTotalPending]=useState(0)
  const [totalPendingNum,setTotalPendingNum]=useState(0)
  
  const [totalOuts,setTotalOuts]=useState(0)
  // Here is our data for tile in the page
  const { sendRequest: fetchEmployees } = useHttp()
  
  const [TileData ,setTileData]=useState([])
  const [employeeFilter, setEmployeeFilter] = useState({
    employee_query:'',
    floor_name:"",
    role_name:"",
    store_name:""
  })
  useEffect(()=>{
    const token = cookies.get('token')
    const headers={"Authorization":"Bearer "+token}
    let from_date=moment(date)
    // const listEmployees = (Employees) => {
    //   setData(Employees)
    // }
    // fetchEmployees({url:url+"api/getEmployees?from_date="+from_date.format("YYYY-MM-DD")+"&to_date="+from_date.add(1,'d').format("YYYY-MM-DD")+"&limit="+limit+"&offset="+offset},listEmployees)
axios.get(url+"api/getTotalEmployees",{headers}).then((response)=>{
  
  axios.get(url+"api/getTotalEmployees?type='Trial'",{headers}).then((responseOne)=>{
    axios.get(url+"api/getTotalEmployees?type='Permanent'",{headers}).then((responseTwo)=>{
      let from_date_out=moment()
      axios.get("http://localhost:9000/api/getTotalOutSessions?from_date="+from_date_out.format("YYYY-MM-DD")+"&to_date="+from_date_out.add(1,'d').format("YYYY-MM-DD"),{headers}).then((responseThird)=>{
  setTileData([
    {
      title: 'Total Employee',
      value: response.data[0].count_id
    },
    {
      title: 'Trial Employee',
      value: responseOne.data[0].count_id
    },
    {
      title: 'Total Permanent.',
      value: responseTwo.data[0].count_id
    },
    {
      title: 'Out From Store',
      value: responseThird.data[0].count_id
    } 
  ])
})
    })
  })
})
  },[])
 
  useEffect(()=>{
    if(employeeFilter.store_name!=''){
      let getString=url+"api/getEmployees?store_name="+employeeFilter.store_name+"&limit="+limit+"&offset="+offset
      if(employeeFilter.employee_query!=''){
        getString+="&employee_query="+employeeFilter.employee_query
  }
        if(employeeFilter.role_name!=''){
          getString+='&role_name='+employeeFilter.role_name
        }
        if(employeeFilter.floor_name!=''){
          getString+="&floor_name="+employeeFilter.floor_name
        }
       
        if(date!=null){
          let from_date=moment(date)
          getString+="&from_date="+from_date.format("YYYY-MM-DD")+"&to_date="+from_date.add(1,'d').format("YYYY-MM-DD")
        }
        const listEmployees = (Employees) => {
            setData(Employees)
          }
          fetchEmployees({ url: getString }, listEmployees) 
          getString=url+"api/getEmployees?store_name="+employeeFilter.store_name
      if(employeeFilter.employee_query!=''){
        getString+="&employee_query="+employeeFilter.employee_query
  }
        if(employeeFilter.role_name!=''){
          getString+='&role_name='+employeeFilter.role_name
        }
        if(employeeFilter.floor_name!=''){
          getString+="&floor_name="+employeeFilter.floor_name
        }
       
        if(date!=null){
          let from_date=moment(date)
          getString+="&from_date="+from_date.format("YYYY-MM-DD")+"&to_date="+from_date.add(1,'d').format("YYYY-MM-DD")
        }
        const listTotal = (Employees) => {
            setTotal(Employees.length)
          }
          fetchEmployees({ url: getString }, listTotal) 
      }
      // axios.get(getString,{headers}).then((response)=>{
      //       setData(response.data)
      //   })
  },[date,limit,offset,employeeFilter])
 
  const changeDate=(data)=>{
   
    setDate(data)
}
  // Table Headings, Data and Keys
  
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
  // Table Headings, Data and Keys
  const tableHeadings=[
    {heading:'Employee Name'},
    {heading:'Employee ID'},
    {heading:'Floor'},
    {heading:'Designation'},
    {heading:'Department'},
    {heading:'Store'}
  ]

  const tableKeys = [
    'name','empID','floor_name','role_name' , 'store_department_name','store_name'
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
const selectEntries=(data)=>{
  setLimit(data)
      }
      const selectPage=(data)=>{
        console.log(data)
          setOffset((data-1)*limit)
      }

  return (
    <React.Fragment>
      <Heading heading={'Employee Details'} />
      <TileContainer Data={TileData} />
      <DropDownFilter Btn={'Add Employee'} Lnk={'/add_employee'} title1={'Floor'} title2={'Store'}  selectByFloor={selectByFloor}  selectByStore={selectByStore}   />
      <Filter data={Data}  changeDate={changeDate} changeByDesignation={changeByDesignation} changeByEmployee={changeByEmployee}/>
      <MainTable data={Data} height={true} Btn={false} headings={tableHeadings} keys={tableKeys} Lnk2={true} link1={'/employee_profile'} />
      <Pagination selectEntries={selectEntries} selectPage={selectPage} />
    </React.Fragment>
  )
}
// else if(error!==null &loading){
  <React.Fragment>
    <h1>Loading</h1>
    </React.Fragment>
export default EmployeeDetails