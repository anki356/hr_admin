import React, { useState, useEffect } from 'react'
import BottomButtonContainer from '../../../Components/BottomButtonContainer/BottomButtonContainer'
import DragAndDrop from '../../../Components/DragAndDrop/DragAndDrop'
import Heading from '../../../Components/Heading/Heading'
import LabeledInputContainer from '../../../Components/LabeledInputContainer/LabeledInputContainer'
import DetailsDivContainer from '../../../UI/DetailsDivContainers/DetailsDivContainer'
import classes from './AttendenceApproval.module.css'
import { useNavigate, useParams } from 'react-router-dom';
import useHttp from '../../../Hooks/use-http'
import axios from 'axios'
import moment from 'moment'

import Cookies from 'universal-cookie'
const AttendenceApproval = () => {
  const cookies = new Cookies()
  const token = cookies.get('token')

  const [inputVals, setValhandler] = useState({
    time: '',
    date: ''
  })
const navigate=useNavigate()
  const [date,setDate]=useState('')
  
const [attendanceID,setAttendanceID]=useState('')
const [formData,setFormData]=useState({"download":null,
"status":"Present",
"date_time":null,
"no_of_shifts":1,
"approval_status":"Approved"})
const [time,setTime]=useState('')
const [employee_data,setEmployeeData]=useState([])
const {employee_id,attendance_id}=useParams()
const[empId,setEmpId]=useState(null)
const { sendRequest: fetchEmployee } = useHttp()
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
    axios.get(url + "api/getAttendanceCorrectionDatabyAttendanceID?attendance_id=" + attendance_id, { headers }).then((response) => {
      let from_date = moment(response.data[0].date_time.split("T")[0])

      setDate(response.data[0].date_time.split("T")[0])

      setAttendanceID(response.data[0].attendance_id)
    })



  }, [])
  function uploadFile(photo) {
    if (photo.length > 0) {

      axios({
        method: 'get',
        url: photo[0].preview,
        responseType: 'blob'
      }).then(function (response) {
        var reader = new FileReader();
        reader.readAsDataURL(response.data);
        reader.onloadend = function () {
          var base64data = reader.result;
          setFormData((prevState) => {
            return {
              ...prevState, download: base64data
            }
          })
        }

      })
    }



}
function cancelRequests(){
  const url="http://localhost:9000/"
 
  const headers={"Authorization":"Bearer "+token}
  axios.patch(url+"api/rejectAttendance/"+attendanceID,{"approval_status":"Rejected"},{headers}).then((response)=>{
    if(response){
      navigate("/") 
    }
  })
  
  
}
async function approveRequests(){
  //   const dateSet=date
  // const dateTime=dateSet+"T"+time
  // setDate(dateTime)
  const url="http://localhost:9000/" 
 
  const headers={"Authorization":"Bearer "+token}
  axios.patch(url+"api/updateAttendance/"+attendanceID,{...formData},{headers}).then((response)=>{
    if(response){
      navigate("/") 
    }
  })
   
  
  }
function InputValHanlder(e){
  let  time=e
console.log(time)
  setFormData((prevState)=>{
    return{
      ...prevState,date_time:date+" "+time
    }
  }) 
}
console.log(date)
  return (
    <React.Fragment>
      <Heading heading={'Attendence Approval'} />
      <DetailsDivContainer data={employee_data} />
      <DragAndDrop uploadFile={uploadFile} />
      <LabeledInputContainer date={date}  func={InputValHanlder} />
      <BottomButtonContainer func={true} cancel={'Reject'} approve={'Approve Attendence'}  cancelRequests={cancelRequests} func2={approveRequests} />
    </React.Fragment>
  )
}

export default AttendenceApproval