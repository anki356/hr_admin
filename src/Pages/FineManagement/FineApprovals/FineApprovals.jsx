import React,{ useState, useEffect } from 'react'
import BottomButtonContainer from '../../../Components/BottomButtonContainer/BottomButtonContainer'
import Heading from '../../../Components/Heading/Heading'
import LabeledInput from '../../../Components/LabeledInput/LabeledInput'
import MainTable from '../../../Components/MainTable/MainTable'
import AdditionalInfoContainer from '../../../UI/AdditionalInfoContainer/AdditionalInfoContainer'
import DetailsDivContainer from '../../../UI/DetailsDivContainers/DetailsDivContainer'
import Cookies from 'universal-cookie'
import useHttp from '../../../Hooks/use-http'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const FineApprovals = () => {

  const url = "http://localhost:9000/"
  const cookies = new Cookies();
  const navigate = useNavigate()
  const token = cookies.get('token')
  const [data, setData] = useState([])
  const { sendRequest: fetchEmployeeDetails } = useHttp()
  const { sendRequest: fetchLeave } = useHttp()
  const { id, employee_id } = useParams()
  const [div_data, setDivData] = useState([])
  const [leave_info, setLeaveInfo] = useState(null)
  const [from_date, setFromDate] = useState(null)
  const [to_date, setToDate] = useState(null)
  const [reason, setReason] = useState(null)
  const [fineHistoryData, setFineHistoryData] = useState([])

  useEffect(() => {
    const listEmployeeDetails = (employeeDetails) => {
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
    }
    fetchEmployeeDetails({ url: url + "api/getEmployeeDetails?id=" + employee_id }, listEmployeeDetails)
    const listLeave = (leaveDetails) => {
      setLeaveInfo([
        {
          title: 'Fine Amount',
          value: leaveDetails[0].amount
        },
        {
          title: 'Reason',
          value: leaveDetails[0].reason
        },
        {
          title: 'Recall Head',
          value: leaveDetails[0].recall_head === 1 ? 'Yes' : 'No'
        },
        {
          title: 'Head Approval',
          value: leaveDetails[0].head_approval === 1 ? 'Yes' : 'NO'
        }
      ])
      setData([{
        document: leaveDetails[0].file_upload_id
      }])
    }
    fetchLeave({ url: url + "api/getFine?id=" + id }, listLeave)
    const headers = { "Authorization": "Bearer " + token }
    axios.get(url+"api/getFineHistory?employee_id="+employee_id, { headers }).then((response)=>{
      response.data.forEach((data)=>{
data.status_date=data.status_date?.split("T")[0].split("-").reverse().join("-")
      })
      setFineHistoryData(response.data)
    })
  }, [])
  // console.log(data)
  const tableHeading = [{ heading: 'Documents' }]
  const tableKeys = ['document']
  function approve() {
    const headers = { "Authorization": "Bearer " + token }
    axios.patch(url + "api/updateFineApproval/" + id, {

      "status": "Approved",
      "rejection_reason": null

    }, { headers }).then((response) => {
      if (response) {
        navigate(-1)
      }
    })

  }
  function cancel() {
    const headers = { "Authorization": "Bearer " + token }
    axios.patch(url + "api/updateFineApproval/" + id, {

      "status": "Rejected",
      "rejection_reason": reason

    }, { headers }).then((response) => {
      if (response) {
        navigate(-1)
      }
    })


  }
  const historyTableHeadings = [
    {heading:'Amount'},
      {heading:'Request Date'},
      {heading:'Status'},
      {heading:'Status date'},
  ]
  const historyTableKeys = ['amount' , 'date','approval','status_date']
  return (
    <React.Fragment>
      <Heading heading={'Fine Approvals'} />
      <DetailsDivContainer data={div_data} />
      <div className='uni_container'>
        <h3 className='uni_heading'>Advance Information</h3>
        <AdditionalInfoContainer data={leave_info} />
        <LabeledInput cls={true} id={'val'} title={'Reason If Rejected'} img={false} func2={setReason} />
      </div>
      <MainTable headings={historyTableHeadings} keys={historyTableKeys} data={fineHistoryData} height={true} />
      <BottomButtonContainer cancel={'Reject'} approve={'Approve'} func={true} cancelRequests={cancel} func2={approve} />
    </React.Fragment>
  )
}

export default FineApprovals