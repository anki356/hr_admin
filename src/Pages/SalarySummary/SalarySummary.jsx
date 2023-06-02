import React, { useState,useEffect } from 'react'
import Heading from '../../Components/Heading/Heading'
import TileContainer from '../../UI/TileContainer/TileContainer'
import DropDownFilter from '../../Components/DropDownFilter/DropDownFilter'
import Filter from '../../Components/Filter/Filter'
import classes from './sd.module.css'
// Data for Table
import useHttp from '../../Hooks/use-http'
import Data from './data'
import MainTable from '../../Components/MainTable/MainTable'
import moment from 'moment'
import axios from 'axios'
import Cookies from 'universal-cookie'
Cookies
const SalarySummary = () => {
  const cookies =new Cookies()
  const token = cookies.get('token')
  const headers = { "Authorization": "Bearer " + token }
  const url="http://localhost:9000/"
  // Here is our data for tile in the page
  const [date,setDate]=useState(new Date())
 const [data,setData]=useState([])
  const [limit,setLimit]=useState(10)
  const [offset,setOffset]=useState(0)
  const[salary,setSalary]=useState([])
  const[isView,setIsView]=useState(false)
  const { sendRequest: fetchSalary } = useHttp()
const [TileData,setTileData]=useState([])
  const [employeeFilter, setEmployeeFilter] = useState({
    employee_query:'',
    floor_name:"",
    role_name:"",
    store_name:""
  })
  // Here is our data for tile in the page
  
  useEffect(()=>{
    axios.get(url+"api/getCountSalary?month="+(date.getMonth()-1)+"&status='Pending'",{headers}).then((response)=>{
      axios.get(url+"api/getCountSalary?month="+(date.getMonth()-1)+"&status='Pending'&type='PF'",{headers}).then((responseOne)=>{
        axios.get(url+"api/getCountSalary?month="+(date.getMonth()-1)+"&status='Pending'&type='Cash'",{headers}).then((responseTwo)=>{
          let from_date=moment()
          axios.get(url+"api/getTotalFines?from_date="+from_date.format("YYYY-MM-DD")+"&to_date="+from_date.add(1,'d').format("YYYY-MM-DD"),{headers}).then((responseThird)=>{
            if(responseThird.data[0].amount===null){
              responseThird.data[0].amount=0
            }
            from_date=moment().subtract(1,'d')
            axios.get(url+"api/getTotalFines?from_date="+from_date.format("YYYY-MM-DD")+"&to_date="+from_date.add(1,'d').format("YYYY-MM-DD"),{headers}).then((responseFourth)=>{
              if(responseFourth.data[0].amount===null){
                responseFourth.data[0].amount=0
              }
               setTileData ( [
                {
                  title: 'Pending Salary Employee Count',
                  value: response.data[0].count_id,
                  
                },
                {
                  title: 'Pending  Salary PF Employee Count',
                  value: responseOne.data[0].count_id
                },
                {
                  title: 'Pending  Salary Cash Employee Count',
                  value: responseTwo.data[0].count_id
                },
                {
                  title: 'Total Fines',
                  value: responseThird.data[0].amount,
                  num:responseThird.data[0].amount- responseFourth.data[0].amount
                }
              ])
     
            })
          })
        })
      })
    })
  },[])
useEffect(()=>{
  const listSalary=(Salary)=>{
    Salary.forEach((data)=>{
      data.month_days=moment().daysInMonth()
    })
    setSalary(Salary)
  }
  if(date!==null){

    fetchSalary({url:url+"api/getAllSalary?month="+(date.getMonth()-1)},listSalary)
  }
},[date])
  // Table Headings, Data and Keys
  const tableHeadings=[
    {heading:'Employee Name'},
    {heading:'Employee ID'},
    {heading:'Min Wages'},
    {heading:'Total Days In Month'},
    {heading:'Days Wages Paid'},
    {heading:'Basic'},
    {heading:'HRA'},
    {heading:'Incentive'},
    {heading:'ESI'},
    {heading:'EPF'},
    {heading:'Gross Salary Payable'}
  ]

  const tableKeys = [
    'employee_name','empID','min_wages_as_per_rule','month_days','days_shown','basic_salary','hra','cash_incentive','esi','pf','net_payable_salary'
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
  
  const changeDate=(data)=>{
   
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
      useEffect(() => {
        const handleKeyPress = (event) => {
          if (event.ctrlKey && event.key === 'v') {
           setIsView(true)
            // Perform some action here
          }
        };
    
        // Add the event listener when the component mounts
        document.addEventListener('keydown', handleKeyPress);
    
        // Clean up the event listener when the component unmounts
        return () => {
          document.removeEventListener('keydown', handleKeyPress);
        };
      }, []);
  return (
    <React.Fragment>
      <Heading heading={'Salary Summary'} />
      <TileContainer Data={TileData} />
      <DropDownFilter title1={'Floor'} title2={'Store'} selectByFloor={selectByFloor}  selectByStore={selectByStore}    />
      <Filter data={data}  changeDate={changeDate} changeByDesignation={changeByDesignation} changeByEmployee={changeByEmployee}/>
      <div className={classes.whole_table_c}>
      <MainTable wd={'3000px'} data={salary} height={true} Lnk2={isView} headings={tableHeadings} keys={tableKeys} link1={'/salary_summary_details'} link2={false} />
      </div>
    </React.Fragment>
  )
}

export default SalarySummary