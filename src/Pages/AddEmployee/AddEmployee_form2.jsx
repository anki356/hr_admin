import React from 'react'
import LabeledInput from '../../Components/LabeledInput/LabeledInput'

const AddEmployee_form2 = () => {
  return (
    <React.Fragment>
      <LabeledInput cls={'wd50'} img={false} title={'Designation'} id={'designation'} />
      <LabeledInput cls={'wd50'} img={false} title={'Department'} id={'department'} />
      <LabeledInput cls={'wd50'} img={false} title={'Head Employee'} id={'head_employee'} />
      <LabeledInput cls={'wd50'} img={false} title={'Hired By'} id={'hired_by'} />
      <LabeledInput cls={'wd50'} img={false} title={'Hiring Form'} id={'hiring_form'} func2={(data)=>props.changeHiringFrom(data)} />
      <LabeledInput cls={'wd50'} img={false} title={'Lead Date'} id={'lead_date'} />
      <LabeledInput cls={'wd50'} img={false} title={'SuperVisior'} id={'supervisior'} />
      <LabeledInput cls={'wd50'} img={false} title={'Job Location'} id={'job_location'} func2={(data)=>props.changeJobLocation(data)} />
      <LabeledInput cls={'wd50'} img={false} title={'EPF'} id={'epf'} func2={(data)=>props.changePF(data)} />
      <LabeledInput cls={'wd50'} img={false} title={'ESI No.'} id={'esi_no'} func2={(data)=>props.changeESI(data)} />
    </React.Fragment>
  )
}

export default AddEmployee_form2