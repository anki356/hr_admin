import React from 'react'
import LabeledInput from '../../Components/LabeledInput/LabeledInput'
import InpFile from '../../Components/InpFile/InpFile'
import classes from './AddEmployee.module.css'
const AddEmployee_form3 = () => {
  return (
    <React.Fragment>
      <LabeledInput cls={'wd50'} img={false} title={'Aadhar Card'} id={'aadhar_card'} />
      <LabeledInput cls={'wd50'} img={false} title={'Mode Of Pay'} id={'mod_of_pay'} />
      <LabeledInput cls={'wd50'} img={false} title={'PAN No.'} id={'pan_no'} />
      <LabeledInput cls={'wd50'} img={false} title={'Fine Management'} id={'fine_management'} />
      <LabeledInput cls={'wd50'} img={false} title={'Bank Name'} id={'bank_name'} func2={(data)=>props.changeBankName(data)}  />
      <LabeledInput cls={'wd50'} img={false} title={'Branch'} id={'branch'} func2={(data)=>props.changeBranch(data)} />
      <LabeledInput cls={'wd50'} img={false} title={'IFSC Code'} id={'ifsc_code'} func2={(data)=>props.changeIFSC(data)}/>
      <LabeledInput cls={'wd50'} img={false} title={'Account No.'} id={'account_no'} func2={(data)=>props.changeAcountNo(data)} />
      <div className={classes.af}>
        <h5>Attach File</h5>
        <div>
        <InpFile />
        </div>
      </div>
    </React.Fragment>
  )
}

export default AddEmployee_form3