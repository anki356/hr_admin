import React from 'react'
import BottomButtonContainer from '../../../Components/BottomButtonContainer/BottomButtonContainer'
import Heading from '../../../Components/Heading/Heading'
import LabeledInput from '../../../Components/LabeledInput/LabeledInput'
import MainTable from '../../../Components/MainTable/MainTable'
import AdditionalInfoContainer from '../../../UI/AdditionalInfoContainer/AdditionalInfoContainer'
import DetailsDivContainer from '../../../UI/DetailsDivContainers/DetailsDivContainer'
import data from './data'
import classes from './LeaveApprovals.module.css'

const LeaveApprovals = () => {

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

  const leave_info = [
    {
      title: 'Date',
      value: '31 march To 3 April 2023'
    },
    {
      title: 'Days',
      value: '4 Days'
    },
    {
      title: 'Recall Head',
      value: 'Yes'
    },
    {
      title: 'Head Approval',
      value: 'Yes'
    }
  ]

  const tableHeading=[{heading:'Documents'}]
  const tableKeys = ['document']

  return (
    <React.Fragment>
      <Heading heading={'Leave Approvals'} />
      <DetailsDivContainer data={employee_data} />
      <div className='uni_container'>
        <h3 className='uni_heading'>Leave Information</h3>
        <AdditionalInfoContainer data={leave_info} />
        <LabeledInput cls={true} id={'val'} title={'Reason If Rejected'} img={false} />
      </div>
      <h3 className='uni_heading'>Attached File</h3>
      <MainTable headings={tableHeading} keys={tableKeys} data={data} height={true} />
      <BottomButtonContainer cancel={'Back'} approve={'Continue'} />
    </React.Fragment>
  )
}

export default LeaveApprovals 