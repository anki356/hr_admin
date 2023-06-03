import React, { useState } from 'react'
import LabeledInput from '../../Components/LabeledInput/LabeledInput'
import InpFile from '../../Components/InpFile/InpFile'
import classes from './AddEmployee.module.css'
import LabeledSelect from '../../Components/LabeledSelect/LabeledSelect'

const selectData = [
  {
    id:1,
    name:'Trial'
  },
  {
    id:2,
    name:'Permanent'
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

const AddEmployee_form3 = (props) => {

  const [arr, setArr] = useState([])
console.log(arr)
  const [fileLabel, setFileLabel] = useState([])
  const increaseFile = () => {
    const newFileInput = {
      id: arr.length + 1,
    };
  
    setArr(prevInputs => [...prevInputs, newFileInput]);
  }
  const newLabel = (data, index) => {
   console.log(index)
    var array=fileLabel
      array[index]=data
  setFileLabel([...array])
          
          
      
  
  
}

  return (
    <React.Fragment>
      {/* <LabeledInput cls={'wd50'} img={false} title={'Aadhar Card'} id={'aadhar_card'} /> */}

      {/* <LabeledInput cls={'wd50'} img={false} title={'PAN No.'} id={'pan_no'} /> */}
      
      <LabeledSelect title={'Fine Management'} select_id='fine_management' data={[{'name':'Yes'},{'name':'No'}]} cls={true} selectedVal={(data)=>props.changeFineMgmt(data)} />
      <LabeledInput cls={'wd50'} img={false} title={'Bank Name'} id={'bank_name'} func2={(data) => props.changeBankName(data)} />
      <LabeledInput cls={'wd50'} img={false} title={'Branch'} id={'branch'} func2={(data) => props.changeBranch(data)} />
      <LabeledInput cls={'wd50'} img={false} title={'IFSC Code'} id={'ifsc_code'} func2={(data) => props.changeIFSC(data)} />
      <LabeledInput cls={'wd50'} img={false} title={'Account No.'} id={'account_no'} func2={(data) => props.changeAcountNo(data)} />
      <LabeledInput cls={'wd50'} img={false} title={'Min Wages'} id={'min_wages'} func2={(data) => props.changeMInWages(data)}/>
      <LabeledInput cls={'wd50'} img={false} title={'UAN No'} id={'uan_no'} func2={(data) => props.changeUAN(data)}/>
      <LabeledInput cls={'wd50'} img={false} title={'Base Salary'} id={'base_salary'} func2={(data) => props.changeBaseSalary(data)}/>
      <LabeledSelect title={'Employee Type'} select_id='emp_type' data={selectData} cls={true} selectedVal={props.chanageEmpType} />
      <LabeledSelect title={'Mode of Pay'} select_id='mode' data={selectData2} cls={true} selectedVal={props.changeModeOfPay} />
      {/* <div className={classes.af}>
        <h5>Attach File</h5>
        <div>
          <InpFile />
        </div>
      </div> */}
      <div className={classes.inp_con}>
        {arr.map((element) => (
          <div className={classes.file_div} key={element.id} >
            <h5 >Upload Additional Document {element.id}</h5>
           {element.id-1===0?
            <label htmlFor="">Photo</label>
           :<label htmlFor="">Other Documents</label>} 
            <InpFile label={fileLabel[element.id-1]} key={element.id} labelFunc={(data) => newLabel(data, element.id-1)} fileHandler={(data) => props.newFile(data,element.id-1)} id={element.id}/>
          </div>
        ))}
      </div>
      <button className={classes.add_inp} onClick={increaseFile}>Add File</button>
    </React.Fragment>
  )
}

export default AddEmployee_form3