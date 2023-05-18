import React from 'react'
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
  const employee_data = [{
    "title": "Electrician",
    "value": "Royall"
  }, {
    "title": "Construction Manager",
    "value": "Sayer"
  }, {
    "title": "Electrician",
    "value": "Aliza"
  }, {
    "title": "Engineer",
    "value": "Jemie"
  }, {
    "title": "Subcontractor",
    "value": "Jacklin"
  }, {
    "title": "Subcontractor",
    "value": "Garold"
  }, {
    "title": "Engineer",
    "value": "Dorry"
  }, {
    "title": "Construction Expeditor",
    "value": "Matias"
  }, {
    "title": "Subcontractor",
    "value": "Genevieve"
  }, {
    "title": "Construction Foreman",
    "value": "Catlin"
  }]

  // const leave_info = [
  //   {
  //     title: 'Date',
  //     value: '31 march To 3 April 2023'
  //   },
  //   {
  //     title: 'Days',
  //     value: '4 Days'
  //   },
  //   {
  //     title: 'Recall Head',
  //     value: 'Yes'
  //   },
  //   {
  //     title: 'Head Approval',
  //     value: 'Yes'
  //   }
  // ]

  const tableHeading=[{heading:'Documents'}]
  const tableKeys = ['document']

  return (
    <React.Fragment>
      <Heading heading={'Advance Approvals'} />
      <DetailsDivContainer data={employee_data} />
      <div className='uni_container'>
        <h3 className='uni_heading'>Advance Information</h3>
        <AdditionalInfoContainer data={leave_info} />
        <LabeledInput cls={true} id={'val'} title={'Reason If Rejected'} img={false} />
      </div>
      <h3 className='uni_heading'>Attached File</h3>
      <MainTable headings={tableHeading} keys={tableKeys} data={data} height={true} />
      <BottomButtonContainer cancel={'Back'} approve={'Continue'} />
    </React.Fragment>
  )
}

export default AdvanceApprovals 