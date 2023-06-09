import React,{useState,useEffect} from 'react'
import BottomButtonContainer from '../../../Components/BottomButtonContainer/BottomButtonContainer'
import ExtraDetails from '../../../Components/ExtraDetails/ExtraDetails'
import Heading from '../../../Components/Heading/Heading'
import MainTable from '../../../Components/MainTable/MainTable'
import DetailsDivContainer from '../../../UI/DetailsDivContainers/DetailsDivContainer'
import data from './data'
import { useNavigate, useParams } from 'react-router-dom';
import useHttp from '../../../Hooks/use-http'
import axios from 'axios'
import moment from 'moment'

import Cookies from 'universal-cookie'
const ExpenseApproval = () => {
    const [expenseHistoryData,setExpenseHistorydata]=useState([])
    const cookies = new Cookies()
    const token = cookies.get('token')
    const navigate=useNavigate()
  const [date,setDate]=useState('')
  const [employee_data,setEmployeeData]=useState([])
  const [expenseData,setExpenseData]=useState([])
const {employee_id,id}=useParams()
const { sendRequest: fetchEmployee } = useHttp()

const[empId,setEmpId]=useState(null)
    // const employee_data = [{
    //     "title": "Electrician",
    //     "value": "Royall"
    // }, {
    //     "title": "Construction Manager",
    //     "value": "Sayer"
    // }, {
    //     "title": "Electrician",
    //     "value": "Aliza"
    // }, {
    //     "title": "Engineer",
    //     "value": "Jemie"
    // }, {
    //     "title": "Subcontractor",
    //     "value": "Jacklin"
    // }, {
    //     "title": "Subcontractor",
    //     "value": "Garold"
    // }, {
    //     "title": "Engineer",
    //     "value": "Dorry"
    // }, {
    //     "title": "Construction Expeditor",
    //     "value": "Matias"
    // }, {
    //     "title": "Subcontractor",
    //     "value": "Genevieve"
    // }, {
    //     "title": "Construction Foreman",
    //     "value": "Catlin"
    // }]
    useEffect(()=>{
        const url="http://localhost:9000/"
        // if(token===null){
        // navigate('/login')
        // }
        const headers={"Authorization":"Bearer "+token}
        const listEmployee = (employeeData) => {
          setEmployeeData([{
            title:"Name",
            value:employeeData.employeesResult[0].name
          },{
      title:'SuperVisor Name',
      value:employeeData.headEmployeesResult[0].head_employee_name
          },{
            title:'Designation',
      value:employeeData.employeesResult[0].role_name
          },{
            title:'Floor Name',
      value:employeeData.employeesResult[0].floor_name
      
            }, {
              title: 'Gender',
              value: employeeData.employeesResult[0].gender
      
            }, {
              title: 'location name',
              value: employeeData.employeesResult[0].location_name
            }, {
              title: 'location Department',
              value: employeeData.employeesResult[0].location_department_name
            }])
            setEmpId(employeeData.employeesResult[0].empID)
      
          }
          fetchEmployee({ url: url + "api/getEmployeeDetails?id=" + employee_id }, listEmployee)
          axios.get(url + "api/getExpenseDataByExpenseId?id=" + id, { headers }).then((response) => {
           setExpenseData(response.data)
          })
          axios.get(url+"api/getExpenseHistory?id="+employee_id, { headers }).then((response)=>{
            response.data.forEach((data)=>{
data.status_date=data.status_date?.split("T")[0].split("-").reverse().join("-")
            })
            setExpenseHistorydata(response.data)
          })
      
      
        }, [])
    const tableHeadings = [
      {heading:'Amount'},
        {heading:'Request Date'},
        {heading:'Expense Type'},
        {heading:'Status'},
        {heading:'Status date'},
    ]
    const tableKeys = ['amount' , 'date','category_name','approval','status_date']
    function cancelRequests(){
        const url="http://localhost:9000/"
        const headers={"Authorization":"Bearer "+token}
        axios.patch(url+"api/updateExpenseStatus/"+id,{"status":"Rejected"},{headers}).then((response)=>{
          if(response){
            navigate("/expense_approvals") 
          }
        })
        
        
      }
      async function approveRequests(){
        //   const dateSet=date
        // const dateTime=dateSet+"T"+time
        // setDate(dateTime)
        const url="http://localhost:9000/" 
        const headers={"Authorization":"Bearer "+token}
        axios.patch(url+"api/updateExpenseStatus/"+id,{"status":"Approved"},{headers}).then((response)=>{
          if(response){
            navigate("/expense_approvals") 
          }
        })
         
        
        }

    return (
        <React.Fragment>
            <Heading heading={'Expense Details'} />
            <DetailsDivContainer data={employee_data} />
            <ExtraDetails status={'Pending'} data={expenseData} employee_id={employee_id}/>
            <h3 className='uni_heading'>Expense History</h3>
            <MainTable headings={tableHeadings} keys={tableKeys} data={expenseHistoryData} height={true} />
            <BottomButtonContainer func={true} cancel={'Reject'} approve={'Approve Expense'} cancelRequests={cancelRequests} func2={approveRequests} />
        </React.Fragment>
    )
}

export default ExpenseApproval