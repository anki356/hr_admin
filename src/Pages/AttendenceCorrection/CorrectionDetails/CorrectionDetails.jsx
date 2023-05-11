import React from 'react'
import BottomButtonContainer from '../../../Components/BottomButtonContainer/BottomButtonContainer'
import DragAndDrop from '../../../Components/DragAndDrop/DragAndDrop'
import Heading from '../../../Components/Heading/Heading'
import LabeledInputContainer from '../../../Components/LabeledInputContainer/LabeledInputContainer'
import DetailsDivContainer from '../../../UI/DetailsDivContainers/DetailsDivContainer'

const CorrectionDetails = () => {

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


  return (
    <React.Fragment>
      <Heading heading={'Attendence Correction Details'} />
      <DetailsDivContainer data={employee_data} />
      <DragAndDrop />
      <LabeledInputContainer />
      <BottomButtonContainer cancel={'Reject'} approve={'Approve Attendence'} />
    </React.Fragment>
  )
}

export default CorrectionDetails