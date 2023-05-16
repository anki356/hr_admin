import React, { useEffect } from 'react'
import Heading from '../../Components/Heading/Heading'
import TileContainer from '../../UI/TileContainer/TileContainer'
import DropDownFilter from '../../Components/DropDownFilter/DropDownFilter'
import Filter from '../../Components/Filter/Filter'
import moment from 'moment/moment'
import useHttp from '../../Hooks/use-http'
import axios from 'axios'
import Pagination from '../../Components/Pagination/Pagination'
import Cookies from 'universal-cookie'
import Data from './data'
import MainTable from '../../Components/MainTable/MainTable'
import InterviewModal from '../../Components/AllModals/InterviewModal'
import { useState } from 'react'

const Interviews = () => {
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
  const { sendRequest: fetchInterview } = useHttp()
  const [TileData ,setTileData]=useState([])
  // Here is our data for tile in the page
  // const TileData = [
  //   {
  //     title: 'Total Expense',
  //     value: '₹5000',
  //     num: 15
  //   },
  //   {
  //     title: 'Pending Approvals',
  //     value: 42,
  //     num: 23
  //   },
  //   {
  //     title: 'On Leave',
  //     value: 50,
  //     num: 10
  //   },
  //   {
  //     title: 'Out From Store',
  //     value: 104,
  //     num: -23
  //   }
  // ]
  useEffect(()=>{
    const token = cookies.get('token')
      const headers={"Authorization":"Bearer "+token}
      let from_date=moment()
      const listInterview = (interview) => {
        console.log(interview)
        interview.interviewResult.reference=interview.refernceResult[0].reference_name
        setData(interview.interviewResult)
      }
      fetchInterview({ url: url+"api/getInterview?from_date="+from_date.format("YYYY-MM-DD")+"&to_date="+from_date.add(1,'d').format("YYYY-MM-DD")+"&limit="+limit+"&offset="+offset }, listInterview)
      from_date=moment()
      axios.get(url+"api/getTotalLoansGranted?from_date="+from_date.format("YYYY-MM-DD")+"&to_date="+from_date.add(1,'d').format("YYYY-MM-DD"),{headers}).then((response)=>{
       
        from_date=moment().subtract(1,'d')
        axios.get(url+"api/getTotalLoansGranted?from_date="+from_date.format("YYYY-MM-DD")+"&to_date="+from_date.add(1,'d').format("YYYY-MM-DD"),{headers}).then((responseOne)=>{
          
          from_date=moment()
          axios.get(url+"api/getTotalEmployeesTakenLoan?from_date="+from_date.format("YYYY-MM-DD")+"&to_date="+from_date.add(1,'d').format("YYYY-MM-DD"),{headers}).then((responseTwo)=>{
    from_date=moment().subtract(1,'d')
  axios.get(url+"api/getTotalEmployeesTakenLoan?from_date="+from_date.format("YYYY-MM-DD")+"&to_date="+from_date.add(1,'d').format("YYYY-MM-DD"),{headers}).then((responseThird)=>{
    
    from_date=moment()
          axios.get(url+"api/getTotalPendingEmis?from_date="+from_date.format("YYYY-MM-DD")+"&to_date="+from_date.add(1,'d').format("YYYY-MM-DD"),{headers}).then((responseFourth)=>{

  
    
   let from_date_out=moment()
      axios.get("http://localhost:9000/api/getTotalOutSessions?from_date="+from_date_out.format("YYYY-MM-DD")+"&to_date="+from_date_out.add(1,'d').format("YYYY-MM-DD"),{headers}).then((responseSixth)=>{ 
             let totalOut= responseSixth.data[0]?.count_id 
           setTileData( [
              {
                title: 'Total Loans Granted',
                value:  response.data[0].amount!==null?response.data[0].amount:0,
                num:response.data[0].amount!==null&&responseOne.data[0].amount? response.data[0].amount-responseOne.data[0].amount:0
              },
              {
                title: 'Total Emp Granted',
                value: responseTwo.data[0].count_id
                ,
                num: responseTwo.data[0].count_id
                -responseThird.data[0].count_id
              },
              {
                title: 'Total Pending EMI',
                value: responseFourth.data[0].count_id,
               
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
    },[])
    useEffect(()=>{
      // let token=localStorage.getItem('token')
      // if(token===null){
      // navigate('/login')
      // }
      // const headers={"Authorization":"Bearer "+token}
      let from_date=moment(date)
      
    let getString=url+"api/getInterview?from_date="+from_date.format("YYYY-MM-DD")+"&to_date="+from_date.add(1,'d').format("YYYY-MM-DD")+"&limit="+limit+"&offset="+offset
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
          
        const listInterview = (interview) => {
        
          interview.interviewResult.reference=interview.refernceResult[0].reference_name
         
          setData(interview.interviewResult)
        }
        fetchInterview({ url: getString }, listInterview) 
        
        
        // axios.get(getString,{headers}).then((response)=>{
        //       setData(response.data)
        //   })
    },[date,limit,offset,employeeFilter])
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
  
  // Table Headings, Data and Keys
  const tableHeadings=[
    {heading:'Interviewee'},
    {heading:'Interview Date'},
    {heading:'Interviewer'},
    {heading:'Reference'},
    {heading:'Remarks'},
    {heading:'Status'},
  ]

  const tableKeys = [
    'employee_name','date_time','interviewer_name','reference','remarks','status'
  ]

  const [newval, setNewVal] = useState(false)
  const [obj,setObj] = useState({})

  const changeModalState = ([val , element]) => {
    setNewVal(val)
    setObj(element)
  }

  return (
    <React.Fragment>
      <Heading heading={'Interviews'} />
      <TileContainer Data={TileData} />
      <DropDownFilter Btn='Add Interview' Lnk='/add_interview' title1={'Floor'} title2={'Store'}  selectByFloor={selectByFloor}  selectByStore={selectByStore}    />
      <Filter data={Data}   changeDate={changeDate} changeByDesignation={changeByDesignation} changeByEmployee={changeByEmployee} />
      <MainTable func={changeModalState} Lnk={true} link1={'false'} t3={'Pay Bonus'} App_Btn={true}  headings={tableHeadings} keys={tableKeys} link2={'/attendence_history'} data={data} />
      <InterviewModal value={newval} setval={setNewVal} Obj={obj}  />
      </React.Fragment>
  )
}
// else if(error!==null &loading){
  <React.Fragment>
    <h1>Loading</h1>
    </React.Fragment>

export default Interviews