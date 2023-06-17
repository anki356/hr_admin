import React, { useEffect, useState } from 'react'
import LabeledInput from '../../Components/LabeledInput/LabeledInput'
import LabeledSelect from '../../Components/LabeledSelect/LabeledSelect'

import axios from 'axios'
import Cookies from 'universal-cookie'
const AddEmployee_form2 = (props) => {
  const url = "http://localhost:9000/"

  const cookies = new Cookies();
  const token = cookies.get('token')
  const [roleData, setRoleData] = useState([])
  const [deptData, setDeptData] = useState([])
  const [sectionData, setSectionData] = useState([])
  const [supervisorData, setSupervisorData] = useState([])

  const [employeeData, setEmployeeData] = useState([])
  const [floorData, setFloorData] = useState([])
  const [storeData, setStoreData] = useState([])
  useEffect(() => {
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
  }, [])
  let dayArray = ['Sunday', 'Monday', 'TuesDay', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const selectDataType = (number) => {
    switch (number) {
      case 1:
        return roleData
      case 2:
        return deptData
      case 3:
        return floorData
      case 4:
        return storeData
      case 5:
        return sectionData
      case 6:
        return employeeData
      case 7:
        return supervisorData
      case 8:
        return dayArray.map((data) => {
          let obj = {}
          obj.name = data
          return obj
        })
      default:
        return []
    }
  }

  return (
    <React.Fragment>

      {props.formSelect.map((element, index) => (
        <LabeledSelect key={index} cls={'wd50'} required={element.required} usingid={element.value !== 'week_off'} selectedVal={element.function} value={element.value} img={false} title={element.title} id={element.title} data={selectDataType(element.num)} />
      ))}

      {props.formInput.map((element, index) => (
        <LabeledInput key={index} cls={'wd50'} required={element.required} img={false} title={element.title} value={element.value} func2={(data) => element.function(data)} type={element.type ? element.type : 'text'} id={element.title} />
      ))}

      {(props.spl_key == 8 || props.spl_key == 3) && props.spl.map((element, index) => (
        <LabeledInput key={index} cls={'wd50'} required={element.required} img={false} title={element.title} value={element.value} func2={(data) => element.function(data)} type={element.type ? element.type : 'text'} id={element.title} />
      ))}

      {props.spl_key == 9 && 
        <LabeledInput cls={'wd50'} required={props.spl[1].required} img={false} title={props.spl[1].title} value={props.spl[1].value} func2={(data) => props.spl[1].function(data)} type={props.spl[1].type ? props.spl[1].type : 'text'} id={props.spl[1].title} />
      }

    </React.Fragment>
  )
}

export default AddEmployee_form2