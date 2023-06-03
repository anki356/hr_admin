import React, { useState } from 'react'
import LabeledInput from '../../Components/LabeledInput/LabeledInput'
import InpFile from '../../Components/InpFile/InpFile'
import classes from './AddEmployee.module.css'
import LabeledSelect from '../../Components/LabeledSelect/LabeledSelect'

const selectData = [
  {
    id:1,
    name:'Trail'
  },
  {
    id:2,
    name:'Make Permenant'
  },
]
const selectData2 = [
  {
    id:1,
    name:'PF'
  },
  {
    id:2,
    name:'Cash'
  },
]

const AddEmployee_form3 = () => {

  const [arr, setArr] = useState([])

  const increaseFile = () => {
    const newFileInput = {
      id: arr.length + 1,
    };

    setArr(prevInputs => [...prevInputs, newFileInput]);
  }

  return (
    <React.Fragment>
      {/* <LabeledInput cls={'wd50'} img={false} title={'Aadhar Card'} id={'aadhar_card'} /> */}
      <LabeledInput cls={'wd50'} img={false} title={'Mode Of Pay'} id={'mod_of_pay'} />
      {/* <LabeledInput cls={'wd50'} img={false} title={'PAN No.'} id={'pan_no'} /> */}
      <LabeledInput cls={'wd50'} img={false} title={'Fine Management'} id={'fine_management'} />
      <LabeledInput cls={'wd50'} img={false} title={'Bank Name'} id={'bank_name'} func2={(data) => props.changeBankName(data)} />
      <LabeledInput cls={'wd50'} img={false} title={'Branch'} id={'branch'} func2={(data) => props.changeBranch(data)} />
      <LabeledInput cls={'wd50'} img={false} title={'IFSC Code'} id={'ifsc_code'} func2={(data) => props.changeIFSC(data)} />
      <LabeledInput cls={'wd50'} img={false} title={'Account No.'} id={'account_no'} func2={(data) => props.changeAcountNo(data)} />
      <LabeledInput cls={'wd50'} img={false} title={'Min Wages'} id={'min_wages'} />
      <LabeledSelect title={'Employee Type'} select_id='emp_type' data={selectData} cls={true} />
      <LabeledSelect title={'Mode of Pay'} select_id='mode' data={selectData2} cls={true} />
      {/* <div className={classes.af}>
        <h5>Attach File</h5>
        <div>
          <InpFile />
        </div>
      </div> */}
      <div className={classes.inp_con}>
        {arr.map((element, index) => (
          <div className={classes.file_div}>
            <h5 >Upload Additional Document {element.id}</h5>
            <InpFile label={`Upload Document ${element.id}`} />
          </div>
        ))}
      </div>
      <button className={classes.add_inp} onClick={increaseFile}>Add File</button>
    </React.Fragment>
  )
}

export default AddEmployee_form3