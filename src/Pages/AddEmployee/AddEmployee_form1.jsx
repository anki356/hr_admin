import React,{useState} from 'react'
import LabeledInput from '../../Components/LabeledInput/LabeledInput'

const AddEmployee_form1 = (props) => {
  const [name,setName]=useState(null)
    const [father_name,setFatherName]=useState(null)
    const [aadhar_no,setAadharNo]=useState(null)
    const [pan_no,setPanNo]=useState(null)
    const [permanent_address,setPermamanentAddress]=useState(null)
    const [local_address,setLocalAddress]=useState(null)
    const [emergency_mobile_no,setEmergencyMobileNumber]=useState(null)
    const [mobile_no,setMobileNo]=useState(null)
    const [dob,setDOB]=useState(null)
    const [marital_status,setMaritalStatus]=useState(null)
  return (
    <React.Fragment>
      <LabeledInput cls={'wd50'} img={false} title={'Name'} id={'name'} value={name} func2={(data)=>props.changeName(data)} />
      <LabeledInput cls={'wd50'} img={false} title={'Father Name'} id={'father_name'} value={father_name} func2={(data)=>props.changeFatherName(data)} />
      <LabeledInput cls={'wd50'} img={false} title={'Aadhar No.'} id={'aadhar_no'} value={aadhar_no} func2={(data)=>props.changeAadharNo(data)} />
      <LabeledInput cls={'wd50'} img={false} title={'Pan No.'} id={'pan_no'} value={pan_no} func2={(data)=>props.changePanNo(data)} />
      <LabeledInput cls={'wd50'} img={false} title={'Address'} id={'address'} value={permanent_address} func2={(data)=>props.changePermamanentAddress(data)} />
      <LabeledInput cls={'wd50'} img={false} title={'Local Address'} id={'local_address'} value={local_address} func2={(data)=>props.changeLocalAddress(data)} />
      <LabeledInput cls={'wd50'} img={false} title={'Emergency Mobile No.'} id={'emergency'} value={emergency_mobile_no} func2={(data)=>props.changeEmergencyMobileNumber(data)} />
      <LabeledInput cls={'wd50'} img={false} title={'Mobile No.'} id={'number'} value={mobile_no} func2={(data)=>props.changeMobileNo(data)} />
      <LabeledInput cls={'wd50'} img={false} title={'Date of Birthday'} id={'dob'} value={dob} func2={(data)=>props.changeDOB(data)} />
      <LabeledInput cls={'wd50'} img={false} title={'Maritial Status'} id={'marital_status'} value={marital_status} func2={(data)=>props.changeMaritalStatus(data)}  />
    </React.Fragment>
  )
}

export default AddEmployee_form1