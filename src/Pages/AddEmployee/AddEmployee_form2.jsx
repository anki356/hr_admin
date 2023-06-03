import React, { useEffect, useState } from 'react'
import LabeledInput from '../../Components/LabeledInput/LabeledInput'
import LabeledSelect from '../../Components/LabeledSelect/LabeledSelect'

import axios from 'axios'
import Cookies from 'universal-cookie'
const AddEmployee_form2 = (props) => {
  const url = "http://localhost:9000/"
 
  const cookies = new Cookies();
  const token = cookies.get('token')
  const [roleData,setRoleData]=useState([])
  const [deptData, setDeptData] = useState([])
  const [sectionData,setSectionData]=useState([])
  const [supervisorData,setSupervisorData]=useState([])
  
  const [employeeData, setEmployeeData] = useState([])
  const[floorData,setFloorData]=useState([])
  const[storeData,setStoreData]=useState([])
  useEffect(()=>{
    const headers = { "Authorization": "Bearer " + token }
    axios.get(url + "api/getRoles", { headers }).then((response) => {
      response.data = response.data.filter((data) => data.name !== 'Super Admin' && data.name !== 'Admin')
      response.data = response.data.filter((data, index, self) => {
          let indexOne = self.findIndex((dataOne) => dataOne.name === data.name)
          console.log(indexOne)
          if (indexOne === index) {
              return data
          }
      })

      setRoleData(response.data)
  })
  axios.get(url + "api/getEmployeesBasedOnRole?role_name='Floor Incharge'&role_name='Store Incharge'", { headers }).then((response) => {
    setEmployeeData(response.data)
})
  axios.get(url + "api/getEmployeesBasedOnRole?role_name='Store Incharge'", { headers }).then((response) => {
    setSupervisorData(response.data)
})
  axios.get(url + "api/getDepartments", { headers }).then((response) => {
    setDeptData(response.data)
})
axios.get(url + "api/getStoreDep", { headers }).then((response) => {
  setSectionData(response.data)
})
axios.get(url + "api/getFloors", { headers }).then((response) => {
  setFloorData(response.data)
})
axios.get(url + "api/getStores", { headers }).then((response) => {
  setStoreData(response.data)
})
  },[])
  return (
    <React.Fragment>
       <LabeledSelect cls={'wd50'} usingid={true} selectedVal={props.changeDesignation} img={false} title={'Designation'} id={'designation'} data={roleData}  />
       <LabeledSelect cls={'wd50'} usingid={true} selectedVal={props.changeDepartment} img={false} title={'Department'} id={'department'} data={deptData}  />
       <LabeledSelect cls={'wd50'} usingid={true} selectedVal={props.changeFloor} img={false} title={'Floor'} id={'floor'} data={floorData}  />
       <LabeledSelect cls={'wd50'} usingid={true} selectedVal={props.changeStore} img={false} title={'Store'} id={'store'} data={storeData}  />
       <LabeledSelect cls={'wd50'} usingid={true} selectedVal={props.changeSection} img={false} title={'Section'} id={'section'} data={sectionData}  />
       <LabeledSelect cls={'wd50'} usingid={true} selectedVal={props.changeHeadEmployee} img={false} title={'Head Employee'} id={'section'} data={employeeData}  />
       <LabeledSelect cls={'wd50'} usingid={true} selectedVal={props.changeHiredBy} img={false} title={'Hired By'} id={'section'} data={employeeData}  />
      <LabeledInput cls={'wd50'} img={false} title={'Hiring Form'} id={'hiring_form'} func2={(data)=>props.changeHiringFrom(data)} />
      <LabeledInput cls={'wd50'} img={false} type={'date'} title={'Lead Date'} id={'lead_date'} func2={(data)=>props.changeLeadDate(data)} />
      <LabeledSelect cls={'wd50'} usingid={true} selectedVal={props.changeSupervisor} img={false} title={'Supervisor'} id={'section'} data={supervisorData}  />
      <LabeledInput cls={'wd50'} img={false} title={'Job Location'} id={'job_location'} func2={(data)=>props.changeJobLocation(data)} />
      <LabeledInput cls={'wd50'} img={false} title={'Qualification'} id={'qualification'} func2={(data)=>props.changeQualification(data)} />
      <LabeledInput cls={'wd50'} img={false} title={'EPF'} id={'epf'} func2={(data)=>props.changePF(data)} />
      <LabeledInput cls={'wd50'} img={false} title={'ESI No.'} id={'esi_no'} func2={(data)=>props.changeESI(data)} />
    </React.Fragment>
  )
}

export default AddEmployee_form2