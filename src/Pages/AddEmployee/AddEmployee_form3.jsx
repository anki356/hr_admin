import React, { useState } from 'react'
import LabeledInput from '../../Components/LabeledInput/LabeledInput'
import InpFile from '../../Components/InpFile/InpFile'
import classes from './AddEmployee.module.css'
import LabeledSelect from '../../Components/LabeledSelect/LabeledSelect'

const url = "http://localhost:9000/"
const selectData = [
  {
    id: 1,
    name: 'Trial'
  },
  {
    id: 2,
    name: 'Permanent'
  },
]
const selectData2 = [
  {
    id: 1,
    name: 'PF'
  },
  {
    id: 2,
    name: 'Cash'
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
    var array = fileLabel
    array[index] = data
    setFileLabel([...array])





  }

  return (
    <React.Fragment>
      {/* <LabeledInput cls={'wd50'} img={false} title={'Aadhar Card'} id={'aadhar_card'} /> */}

      {/* <LabeledInput cls={'wd50'} img={false} title={'PAN No.'} id={'pan_no'} /> */}

      <LabeledSelect required={true} title={'Fine Management'} select_id='fine_management' data={[{ 'name': 'Yes' }, { 'name': 'No' }]} cls={true} selectedVal={(data) => props.changeFineMgmt(data)} value={props.fine_mgmt} />

      {props.formInput.map((element, index) => (
        <LabeledInput disabled={element.disabled} required={element.required} key={index} cls={'wd50'} img={false} title={element.title} value={element.value} func2={(data) => element.function(data)} type={element.type ? element.type : 'text'} id={element.title} />
      ))}

      <LabeledSelect required={true} title={'Employee Type'} select_id='emp_type' data={selectData} cls={true} selectedVal={props.chanageEmpType} value={props.emp_type} />
      <LabeledSelect required={true} title={'Mode of Pay'} select_id='mode' data={selectData2} cls={true} selectedVal={props.changeModeOfPay} value={props.mode_of_pay} />
      {/* <div className={classes.af}>
        <h5>Attach File</h5>
        <div>
          <InpFile />
        </div>
      </div> */}

      <div className={classes.inp_con}>
        {props.photo ? <div>

          <a href={url + props.photo}>Preview</a>
        </div> : null}
        {props.data.map((element, index) => {
          return (
            <div>
              <a href={url + element.name}>Preview</a>
            </div>
          )
        })}
        {arr.map((element) => {
          return <div className={classes.file_div} key={element.id} >
            <h5 >Upload Additional Document {element.id}</h5>
            {element.id - 1 === 0 ?
              <label htmlFor="">Photo</label>
              : <label htmlFor="">Other Documents</label>}
            <InpFile label={fileLabel[element.id - 1]} key={element.id} labelFunc={(data) => newLabel(data, element.id - 1)} fileHandler={(data) => props.newFile(data, element.id - 1)} id={element.id} />
          </div>
        })}
      </div>



      <button type="button" className={classes.add_inp} onClick={increaseFile}>Add File</button>
    </React.Fragment>
  )
}

export default AddEmployee_form3