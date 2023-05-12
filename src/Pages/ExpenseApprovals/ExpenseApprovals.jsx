import React,{useState,useEffect} from 'react'
import Heading from '../../Components/Heading/Heading'
import TileContainer from '../../UI/TileContainer/TileContainer'
import DropDownFilter from '../../Components/DropDownFilter/DropDownFilter'
import Filter from '../../Components/Filter/Filter'
import Cookies from 'universal-cookie'
import useHttp from '../../Hooks/use-http'
// Data for Table
import axios from 'axios'
import moment from 'moment/moment'
import MainTable from '../../Components/MainTable/MainTable'

const ExpenseApprovals = () => {
  const url="http://localhost:9000/"
  const [Data,setData]=useState([])
  const [date,setDate]=useState(new Date())
  const [limit,setLimit]=useState(10)
  const [offset,setOffset]=useState(0)
  const [employeeFilter, setEmployeeFilter] = useState({
    employee_query:'',
    floor_name:"",
    role_name:"",
    store_name:""
  })
  const cookies = new Cookies();
  const { sendRequest: fetchExpenses } = useHttp()
  // Here is our data for tile in the page
  useEffect(()=>{
    const token = cookies.get('token')
    const headers={"Authorization":"Bearer "+token}
    let from_date=moment(date)
    const listExpenses = (expenses) => {
      setData(expenses)
    }
    fetchExpenses({url:url+"api/getExpenses?from_date="+from_date.format("YYYY-MM-DD")+"&to_date="+from_date.add(1,'d').format("YYYY-MM-DD")+"&limit="+limit+"&offset="+offset},listExpenses)
  },[])
  useEffect(()=>{
    // let token=localStorage.getItem('token')
    // if(token===null){
    // navigate('/login')
    // }
    // const headers={"Authorization":"Bearer "+token}
    let from_date=moment(date)
    
  let getString=url+"api/getExpenses?from_date="+from_date.format("YYYY-MM-DD")+"&to_date="+from_date.add(1,'d').format("YYYY-MM-DD")+"&limit="+limit+"&offset="+offset
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
        
      const listExpenses = (expenses) => {
        setData(expenses)
      }
      fetchExpenses({ url: getString }, listExpenses) 
      
      
      // axios.get(getString,{headers}).then((response)=>{
      //       setData(response.data)
      //   })
  },[date,limit,offset,employeeFilter])
  const selectEntries=(data)=>{
    setLimit(data)
        }
        const selectPage=(data)=>{
          console.log(data)
            setOffset((data-1)*limit)
        }
  
  const changeDate=(data)=>{
    setLimit(10)
    setOffset(0)
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
// if(!loading){
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
  const TileData = [
    {
      title: 'Total Expense',
      value: '₹2000',
      num: 15
    },
    {
      title: 'Pending Approvals',
      value: 22,
      num: 12
    },
    {
      title: 'Total Emp. Granted',
      value: 1,
      num: -1
    },
    {
      title: 'Out From Store',
      value: 23,
      num: 12
    }
  ]

  // Table Headings, Data and Keys
  const tableHeadings=[
    {heading:'Employee Name'},
    {heading:'Employee ID'},
    {heading:'Expense'},
    {heading:'Expense Type'},
    {heading:'Request Date'}
  ]

  const tableKeys = [
    'employee_name','empID','amount','category_name','date'
  ]

  return (
    <React.Fragment>
      <Heading heading={'Expense Approvals'} />
      <TileContainer Data={TileData} />
      <DropDownFilter title1={'Floor'} title2={'Store'} d3={true} title3={'Expense Type'} selectByFloor={selectByFloor}  selectByStore={selectByStore} />
      <Filter data={Data}  changeDate={changeDate} changeByDesignation={changeByDesignation} changeByEmployee={changeByEmployee}/>
      <MainTable data={Data} height={true} Btn={false} headings={tableHeadings} keys={tableKeys} Lnk={true} link2={'/expense_details'} link1={'/expense_approval'} />
    </React.Fragment>
  )
}

export default ExpenseApprovals