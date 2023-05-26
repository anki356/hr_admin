import React,{useState,useEffect} from 'react'

import moment from 'moment'
import Cookies from 'universal-cookie'
import BottomButtonContainer from '../../../Components/BottomButtonContainer/BottomButtonContainer'
import classes from './AddFine.module.css'
import Heading from '../../../Components/Heading/Heading'
import DetailsDivContainer from '../../../UI/DetailsDivContainers/DetailsDivContainer'
import LabeledInput from '../../../Components/LabeledInput/LabeledInput'
import InpFile from '../../../Components/InpFile/InpFile'
import axios from 'axios'
import ExpenseSearchBar from '../../../Components/ExpenseSearchBar/ExpenseSearchBar'
import { useNavigate,useLocation } from 'react-router-dom'

import useHttp from '../../../Hooks/use-http'
const AddLoan = () => {
    const navigate=useNavigate()
    const Location=useLocation()
    const url = "http://localhost:9000/"   
    const [employee_data,setEmployeeData]=useState([])
    const [fileLabel,setFileLabel] = useState('') 
    const [fine, setFine] = useState('')
    const [text, setText] = useState('')
const [searchtext, setSearchText] = useState('')
const [fieldValues, setFieldValues] = useState([]);
const [noData,setNoData]=useState(false)
const [employee_id,setEmployeeId]=useState(null)
const cookies = new Cookies()
const token = cookies.get('token')
const [recall_head, setRecallHead] = useState(false)
const [approvalHead,setApprovalHead]=useState(false)
console.log(fieldValues)
    const searchHandler = (data) => {  
        setSearchText(data)
    
    
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
  
      function cancel(){
      
        setEmployeeData([])
        setSearchText('')
        setNoData(false)
        navigate(-1) 
    }
    const formData = {
        employee_id: employee_id,
        amount: fine,
        reason: text
    }
    const reqConfig = {
        url: 'http://localhost:9000/api/addFine',
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: formData
    }
    const { isLoading, sendRequest } = useHttp()

    const formHandler = (e) => {
        e.preventDefault()
        sendRequest(reqConfig)
        setText('')
        cancel()
        setEmployeeData([])
    }



    
    
    const recallHandler = () => {
        setRecallHead((prevState) => {
            return !prevState
        })
    }
  return (
   <React.Fragment>
    <Heading heading={'Add Fine'} /><ExpenseSearchBar func={searchHandler} />
            {searchtext === ''&& noData ? '' :noData?<h6>NO User Found</h6>: <DetailsDivContainer data={employee_data} />}
    <form className={classes.form}>
        
        <div className={classes.form_input_div}>
        Fine<span><input type="text" value={fine} onChange={e => setFine(e.target.value)} /></span>
        </div>
        <div className={classes.form_input_div}>
        Reason<span><textarea onChange={e => setText(e.target.value)} value={text} placeholder='Type Here...'></textarea></span>
        </div>
        <div className={classes.form_input_div}>
            <label htmlFor="abh">Approve By Head</label>
            <select id='abh' onChange={(e)=>setApprovalHead(e.target.value)}>
                <option selected={approvalHead===true} value={true}>Yes</option>
                <option selected={approvalHead===false} value={false}>No</option>
            </select>
        </div>
        <div className={classes.form_input_div} value={recall_head} >Recall Head<span><input type="checkbox" onChange={recallHandler} /></span></div>
       
        
       
        
    </form>
    <BottomButtonContainer cancel={'Cancel'} approve={'Add Fine'} func={true} cancelRequests={cancel} func2={formHandler}/>
   </React.Fragment>
  )
}

export default AddLoan