import React from 'react'
import LabeledInput from '../../Components/LabeledInput/LabeledInput'

const AddEmployee_form1 = () => {
  return (
    <React.Fragment>
      <LabeledInput cls={'wd50'} img={false} title={'Name'} id={'name'} />
      <LabeledInput cls={'wd50'} img={false} title={'Father Name'} id={'father_name'} />
      <LabeledInput cls={'wd50'} img={false} title={'Aadhar No.'} id={'aadhar_no'} />
      <LabeledInput cls={'wd50'} img={false} title={'Pan No.'} id={'pan_no'} />
      <LabeledInput cls={'wd50'} img={false} title={'Address'} id={'address'} />
      <LabeledInput cls={'wd50'} img={false} title={'Local Address'} id={'local_address'} />
      <LabeledInput cls={'wd50'} img={false} title={'Emergency Mobile No.'} id={'emergency'} />
      <LabeledInput cls={'wd50'} img={false} title={'Mobile No.'} id={'number'} />
      <LabeledInput cls={'wd50'} img={false} title={'Date of Birthday'} id={'dob'} />
      <LabeledInput cls={'wd50'} img={false} title={'Maritial Status'} id={'marital_status'} />
    </React.Fragment>
  )
}

export default AddEmployee_form1