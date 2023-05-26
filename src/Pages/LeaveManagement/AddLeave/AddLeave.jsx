import React,{useState,useEffect} from 'react'

import moment from 'moment'
import Cookies from 'universal-cookie'
import BottomButtonContainer from '../../../Components/BottomButtonContainer/BottomButtonContainer'
import classes from './AddLeave.module.css'
import Heading from '../../../Components/Heading/Heading'
import DetailsDivContainer from '../../../UI/DetailsDivContainers/DetailsDivContainer'
import LabeledInput from '../../../Components/LabeledInput/LabeledInput'
import InpFile from '../../../Components/InpFile/InpFile'
import axios from 'axios'
import ExpenseSearchBar from '../../../Components/ExpenseSearchBar/ExpenseSearchBar'
import { useNavigate,useLocation } from 'react-router-dom'
const AddLeave = () => {
    const navigate=useNavigate()
    const Location=useLocation()
    const url = "http://localhost:9000/"   
    const [employee_data,setEmployeeData]=useState([])
    const [from_date, setFromDate] = useState(null)
    const [to_date, setToDate] = useState(null)
   
   
    
    const [fileLabel,setFileLabel] = useState('')
const [tenure,setTenure]=useState(0)
const [searchtext, setSearchText] = useState('')
const [fieldValues, setFieldValues] = useState([]);
const [noData,setNoData]=useState(false)
const [employee_id,setEmployeeId]=useState(null)
const cookies = new Cookies()
const token = cookies.get('token')
const [amount,setAmount]=useState(0)
const [document, setDocument] = useState(null)
const [recall_head, setRecallHead] = useState(false)
const [month,setMonth]=useState(null)
const [approvalHead,setApprovalHead]=useState(false)
console.log(fieldValues)
    const searchHandler = (data) => {  
        setSearchText(data)
    
    
    }
    const newFile = (data) => {
        console.log('data in side modal', data[0])
        setDocument(data)
    }
    useEffect(()=>{
        const headers={"Authorization":"Bearer "+token}
        axios.get(url+"api/getEmployeeDetails?employee_query="+searchtext,{headers}).then((response)=>{
            if(response.data.employeesResult.length>0){

            setEmployeeId(response.data.employeesResult[0].id)
    setEmployeeData([
        {
            title:"Name",
            value:response.data.employeesResult[0].name
          },{
      title:'SuperVisor Name',
      value:response.data.headEmployeesResult[0]?.head_employee_name
          },{
            title:'Designation',
      value:response.data.employeesResult[0].role_name
          },{
            title:'Floor Name',
      value:response.data.employeesResult[0].floor_name
      
            }, {
              title: 'Gender',
              value: response.data.employeesResult[0].gender
      
            }, {
              title: 'Store name',
              value: response.data.employeesResult[0].store_name
            }, {
              title: 'Store Department',
              value: response.data.employeesResult[0].store_department_name
            }
    ])
    setNoData(false)
}
else{
setNoData(true)
}
        })
    },[searchtext])
    
      function cancel(e){
        e.preventDefault()
        setEmployeeData([])
        setSearchText('')
        setNoData(false)
        navigate(-1) 
    }
    function add(e){
        e.preventDefault()
        const headers = { "Authorization": "Bearer " + token, 'Content-Type': 'multipart/form-data' }
        axios.post(url + "api/addLeave", {
            employee_id: employee_id,
            from_date: from_date,
            to_date: to_date,
            download: document,
            recall_head: recall_head,
            head_approval: approvalHead === 'Yes' ? 1 : 0
        }, { headers }).then((response)=>{
    if(response){
        
        navigate(-1) 
    }
        })
       
    }
    
    
    const recallHandler = () => {
        setRecallHead((prevState) => {
            return !prevState
        })
    }
  return (
   <React.Fragment>
    <Heading heading={'Add Leave'} /><ExpenseSearchBar func={searchHandler} />
            {searchtext === ''&& noData ? '' :noData?<h6>NO User Found</h6>: <DetailsDivContainer data={employee_data} />}
    <form className={classes.form}>
    <div className={classes.form_input_div}>Leave From <span>
    <input value={from_date} placeholder="DD/MM/YYYY" onInput={(e) => setFromDate(e.target.value)} type="date" /></span></div>
    <div className={classes.form_input_div}>Leave to <span>
    <input type="date" placeholder="DD/MM/YYYY" value={to_date} onInput={(e) => setToDate(e.target.value)} /></span></div>
        <div className={classes.form_input_div}>
            <label htmlFor="abh">Approve By Head</label>
            <select id='abh' onChange={(e)=>setApprovalHead(e.target.value)}>
                <option selected={approvalHead===true} value={true}>Yes</option>
                <option selected={approvalHead===false} value={false}>No</option>
            </select>
        </div>
        <div className={classes.form_input_div} value={recall_head} >Recall Head<span><input type="checkbox" onChange={recallHandler} /></span></div>
        {/* <div className={classes.form_input_div}>
            <label htmlFor="month">Select Month</label>
            <select id='month' onChange={(e)=>setMonth(e.target.value)}>
            <option selected value='1'>Janaury</option>
                    <option value='2'>February</option>
                    <option value='3'>March</option>
                    <option value='4'>April</option>
                    <option value='5'>May</option>
                    <option value='6'>June</option>
                    <option value='7'>July</option>
                    <option value='8'>August</option>
                    <option value='9'>September</option>
                    <option value='10'>October</option>
                    <option value='11'>November</option>
                    <option value='12'>December</option>
            </select>
        </div> */}
        <div className={classes.file_con}>
            <h3 className={classes.file_con_label}>Attach File</h3>
            <InpFile label={fileLabel} labelFunc={setFileLabel} fileHandler={newFile} />
        </div>
       
       
   
    </form>
    <BottomButtonContainer cancel={'Cancel'} approve={'Add Leave'} func={true} cancelRequests={cancel} func2={add}/>
   </React.Fragment>
  )
}

export default AddLeave