import React from 'react'
import Heading from '../../../Components/Heading/Heading'
import ExpenseSearchBar from '../../../Components/ExpenseSearchBar/ExpenseSearchBar'
import DetailsDivContainer from '../../../UI/DetailsDivContainers/DetailsDivContainer'
import GradeRangeSlider from '../../../Components/GradeRangeSlider/GradeRangeSlider'
import BottomButtonContainer from '../../../Components/BottomButtonContainer/BottomButtonContainer'
import { useState } from 'react'
import Cookies from 'universal-cookie'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Add_Grade = () => {
  const url = "http://localhost:9000/"
  const cookies = new Cookies()
  const token = cookies.get('token')
  const [searchtext, setSearchText] = useState('')
  const [noData,setNoData]=useState(false)
  const [grade_1st,setGrade1st]=useState(0)
  const [grade_2nd,setGrade2nd]=useState(0)
  const [grade_4th,setGrade4th]=useState(0)
  
  const [employee_data,setEmployeeData]=useState([])
  const navigate=useNavigate()
const [employee_id,setEmployeeId]=useState(null)
  const searchHandler = (data) => {  
    const headers={"Authorization":"Bearer "+token}
    axios.get(url+"api/getEmployeeDetails?employee_query="+data,{headers}).then((response)=>{
        if(response.data.employeesResult.length>0&&response.data.employeesResult[0].role_name==='Floor Incharge'){
        setEmployeeId(response.data.employeesResult[0].id)
        
        setEmployeeData([
            {
                title:"Name",
                value:response.data.employeesResult[0].name
              },
            {
                title:"Employee ID",
                value:response.data.employeesResult[0].empID
              },
              {
          title:'SuperVisor Name',
          value:response.data.headEmployeesResult[0]?.head_employee_name
              },{
                title:'Designation',
          value:response.data.employeesResult[0].role_name
              },,{
                title:'Department',
          value:response.data.employeesResult[0].department_name
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
  }
  function cancel(){
    navigate(-1)
  }
  function add(){
    const headers={"Authorization":"Bearer "+token}
    if(employee_id===null){
      toast("Employee Must Be Present")
  }
  
 else{
    axios.post(url+"api/addGradesForFI",{
"employee_id":employee_id,
"grade_1st":grade_1st,
"grade_2nd":grade_2nd,
"grade_4th":grade_4th
    },{headers}).then((response)=>{
      if(response){
        navigate(-1)
      }
    })
  }
  }
  return (
    <React.Fragment>
        <Heading heading={'Add Grade'} />
        <ToastContainer></ToastContainer>
        <ExpenseSearchBar func={searchHandler} />
            {searchtext === ''&& noData ? '' :noData?<h6>NO User Found</h6>: <DetailsDivContainer data={employee_data} />}
        <GradeRangeSlider label={'Behaviour With Customer'} selectValue={setGrade1st} />
        <GradeRangeSlider label={'Behaviour With Staff/Head'}selectValue={setGrade2nd} />
        <GradeRangeSlider label={'Presentation'} selectValue={setGrade4th} />
        <br />
        <BottomButtonContainer cancel={'Cancel'} approve={'Save'}  func={true} cancelRequests={cancel} func2={add} />
    </React.Fragment>
  )
}

export default Add_Grade
