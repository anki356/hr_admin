import React, { useState, useEffect } from 'react'
import BottomButtonContainer from '../../../Components/BottomButtonContainer/BottomButtonContainer'
import Heading from '../../../Components/Heading/Heading'
import LabeledInput from '../../../Components/LabeledInput/LabeledInput'
import MainTable from '../../../Components/MainTable/MainTable'
import AdditionalInfoContainer from '../../../UI/AdditionalInfoContainer/AdditionalInfoContainer'
import DetailsDivContainer from '../../../UI/DetailsDivContainers/DetailsDivContainer'
import data from './data'

import Cookies from 'universal-cookie'
import useHttp from '../../../Hooks/use-http'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'


const AdvanceApprovals = () => {
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
      console.log('here is our advance details', leaveDetails)
      setLeaveInfo([
        {
          title: 'Advance Amount',
          value: leaveDetails[0].amount
        },
        {
          title: 'Repay',
          value: 'Automatically deducted'
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
    fetchLeave({ url: url + "api/getAdvance?id=" + id }, listLeave)
  }, [])
  console.log(data)
  const tableHeading = [{ heading: 'Documents' }]
  const tableKeys = ['document']

  
  function approve() {
    const headers = { "Authorization": "Bearer " + token }
    axios.patch(url + "api/updateAdvanceStatus/" + id, {

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
    axios.patch(url + "api/updateAdvanceStatus/" + id, {

      "status": "Rejected",
      "rejection_reason": reason

    }, { headers }).then((response) => {
      if (response) {
        navigate(-1)
      }
    })


  }

  return (
    <React.Fragment>
      <Heading heading={'Advance Approvals'} />
      <DetailsDivContainer data={div_data} />
      <div className='uni_container'>
        <h3 className='uni_heading'>Advance Information</h3>
        <AdditionalInfoContainer data={leave_info} />
        <LabeledInput cls={true} id={'val'} title={'Reason If Rejected'} img={false} func2={setReason} />
      </div>
      <h3 className='uni_heading'>Attached File</h3>
      <MainTable headings={tableHeading} keys={tableKeys} data={data} height={true} />
      <BottomButtonContainer cancel={'Reject'} approve={'Approve'} func={true} cancelRequests={cancel} func2={approve} />
    </React.Fragment>
  )
}

export default AdvanceApprovals 