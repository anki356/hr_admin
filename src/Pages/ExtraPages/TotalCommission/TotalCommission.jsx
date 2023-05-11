import React from 'react'
import BottomButtonContainer from '../../../Components/BottomButtonContainer/BottomButtonContainer'
import Heading from '../../../Components/Heading/Heading'
import MainTable from '../../../Components/MainTable/MainTable'
import DetailsDivContainer from '../../../UI/DetailsDivContainers/DetailsDivContainer'
import data from './data'

const TotalCommission = () => {

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

  const tableKeys = ['date','day','commission','time']
  const tableHeading = [
    {heading:'Date'},
    {heading:'Day'},
    {heading:'Commission'},
    {heading:'Time'},
  ]

  return (
    <React.Fragment>
      <Heading heading={'Total Commission'} />
      <DetailsDivContainer data={employee_data} />
      <br />
      <h3 className='uni_heading'>Commission Table</h3>
      <MainTable height={true} headings={tableHeading} keys={tableKeys} data={data}  />
      <BottomButtonContainer cancel={'Back'} approve={'Download Summary'}  />
    </React.Fragment>
  )
}

export default TotalCommission

