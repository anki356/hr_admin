import React, { useState,useEffect } from 'react'
import BottomButtonContainer from '../../../Components/BottomButtonContainer/BottomButtonContainer'
import DragAndDrop from '../../../Components/DragAndDrop/DragAndDrop'
import Heading from '../../../Components/Heading/Heading'
import LabeledInputContainer from '../../../Components/LabeledInputContainer/LabeledInputContainer'
import DetailsDivContainer from '../../../UI/DetailsDivContainers/DetailsDivContainer'
import classes from './AttendenceApproval.module.css'
import { useNavigate,useParams } from 'react-router-dom';
import useHttp from '../../../Hooks/use-http'
const AttendenceApproval = () => {

const [employee_data,setEmployeeData]=useState([])
const {employee_id,attendance_id}=useParams()
const { sendRequest: fetchEmployee } = useHttp()
useEffect(()=>{
  const url="http://localhost:9000/"
  // if(token===null){
  // navigate('/login')
  // }
  const headers={"Authorization":"Bearer "+token}
  const listEmployee = (employeeData) => {
    console.log("Here",employeeData.employeesResult)
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

    },{
      title:'Gender',
value:employeeData.employeesResult[0].gender

    },{
      title:'Store name',
      value:employeeData.employeesResult[0].store_name
    },{
      title:'Store Department',
      value:employeeData.employeesResult[0].store_department_name
    }])
  }
  fetchEmployee({ url: url+"api/getEmployeeDetails?id="+employee_id }, listEmployee)
},[])
console.log(employee_data)
  return (
    <React.Fragment>
      <Heading heading={'Attendence Approval'} />
      <DetailsDivContainer data={employee_data} />
      <DragAndDrop uploadFile={uploadFile} />
      <LabeledInputContainer />
      <BottomButtonContainer cancel={'Reject'} approve={'Approve Attendence'} />
    </React.Fragment>
  )
}

export default AttendenceApproval