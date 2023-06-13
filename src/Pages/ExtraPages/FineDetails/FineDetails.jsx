import React,{useEffect} from 'react'
import BottomButtonContainer from '../../../Components/BottomButtonContainer/BottomButtonContainer'
import Heading from '../../../Components/Heading/Heading'
import MainTable from '../../../Components/MainTable/MainTable'
import DetailsDivContainer from '../../../UI/DetailsDivContainers/DetailsDivContainer'
import data from './data'
import useHttp from '../../../Hooks/use-http'
import Cookies from 'universal-cookie'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import moment from 'moment'
const FineDetails = () => {
  const [div_data, setDivData] = useState([])
  const { sendRequest: fetchEmployeeDetails } = useHttp()
  const { sendRequest: fetchFine } = useHttp()
  const[empId,setEmpId]=useState(null)
  const [fine,setFine]=useState([])
  const {id}=useParams()
  const cookies = new Cookies();
    const token = cookies.get('token')
    const headers = { "Authorization": "Bearer " + token}
  useEffect(()=>{
    const url="http://localhost:9000/"
    // if(token===null){
    // navigate('/login')
    // }
    const headers={"Authorization":"Bearer "+token}
    
    
    const listEmployee = (employeeDetails) => {
      setDivData([{
        title: "Name",
        value: employeeDetails.employeesResult[0].name
      }, {
        title: 'SuperVisor Name',
        value: employeeDetails.headEmployeesResult[0]?.head_employee_name
      }, {
        title: 'Designation',
        value: employeeDetails.employeesResult[0].role_name
      }, {
        title: 'Floor Name',
        value: employeeDetails.employeesResult[0].floor_name

      }, {
        title: 'Gender',
        value: employeeDetails.employeesResult[0].gender

      }, {
        title: 'Store name',
        value: employeeDetails.employeesResult[0].store_name
      }, {
        title: 'Store Department',
        value: employeeDetails.employeesResult[0].store_department_name
      }])
      
        setEmpId(employeeDetails.employeesResult[0].empID)
  
      }
      
      fetchEmployeeDetails({ url: url + "api/getEmployeeDetails?id=" + id }, listEmployee)
      const listFine=(Fine)=>{
        console.log(Fine)
        const dayArray=['Sunday','Monday','TuesDay','Wednesday','Thursday','Friday','Saturday']
        Fine.forEach((data)=>{
          console.log(moment())
          let day=dayArray[moment(data.date).day()]
          data.day=day
        })
        
        setFine(Fine)
        
        
      }
      fetchFine({url:url+"api/getFineHistory?employee_id="+id},listFine)
    },[])

  const tableKeys = ['date','day','amount','reason']
  const tableHeading = [
    {heading:'Date'},
    {heading:'Day'},
    {heading:'Fine'},
    {heading:'Reason'},
  ]

  return (
    <React.Fragment>
      <Heading heading={'Total Fines'} />
      <DetailsDivContainer data={div_data} />
      <br />
      <h3 className='uni_heading'>Fine Table</h3>
      <MainTable height={true} headings={tableHeading} keys={tableKeys} data={fine}  />
      <BottomButtonContainer cancel={'Back'} approve={'Download Summary'}  />
    </React.Fragment>
  )
}

export default FineDetails
