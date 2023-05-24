import React, { useEffect, useState } from 'react'
import Heading from '../../Components/Heading/Heading'
import DropDownFilter from '../../Components/DropDownFilter/DropDownFilter'
import Filter from '../../Components/Filter/Filter'

// Data for Table
import Cookies from 'universal-cookie'

import useHttp from '../../Hooks/use-http'
import axios from 'axios'

import moment from 'moment/moment'
import MainTable from '../../Components/MainTable/MainTable'
import EmployeeTransferModal from '../../Components/AllModals/EmployeeTransferModal'

const EmployeeTransfer = () => {
  
  const url = "http://localhost:9000/"
  
  const [date, setDate] = useState(new Date())
  const [limit, setLimit] = useState(10)
  const [offset, setOffset] = useState(0)
  const cookies = new Cookies();
  const token = cookies.get('token')
  const [Data,setData]=useState([])
  const { sendRequest: fetchTransfer } = useHttp()
  
  const [employeeFilter, setEmployeeFilter] = useState({
    employee_query: '',
    floor_name: "",
    role_name: "",
    store_name: ""
  })
useEffect(()=>{
  const headers = { "Authorization": "Bearer " + token }
    let from_date = moment()
    const listTransfer = (transfer) => {

     
      setData(transfer)
    }
    fetchTransfer({ url: url + "api/getTransfer?from_date=" + from_date.subtract(10,'d').format("YYYY-MM-DD") + "&to_date=" + from_date.add(10, 'd').format("YYYY-MM-DD") + "&limit=" + limit + "&offset=" + offset }, listTransfer)
console.log(Data)
},[])
useEffect(() => {
  let from_date = moment(date)

  let getString = url + "api/getTransfer?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + from_date.add(1, 'd').format("YYYY-MM-DD") + "&limit=" + limit + "&offset=" + offset
  if (employeeFilter.employee_query != '') {
    getString += "&employee_query=" + employeeFilter.employee_query
  }
  if (employeeFilter.role_name != '') {
    getString += '&role_name=' + employeeFilter.role_name
  }
  if (employeeFilter.floor_name != '') {
    getString += "&floor_name=" + employeeFilter.floor_name
  }
  if (employeeFilter.store_name != '') {
    getString += "&store_name=" + employeeFilter.store_name
  }

  const listTransfer = (transfer) => {

   
    setData(transfer)
  }
  fetchTransfer({ url: getString }, listTransfer)

}, [date, limit, offset, employeeFilter])
const selectByStore = (data) => {

  setEmployeeFilter((prevState) => {
    return { ...prevState, store_name: data }
  })

}
const selectByFloor = async (data) => {

  setEmployeeFilter((prevState) => {
    return { ...prevState, floor_name: data }
  })
}

const changeDate = (data) => {
  setLimit(10)
  setOffset(0)
  setDate(data)
}
const changeByEmployee = (data) => {

  // if(data.charAt(0)!=='1')
  //  {

  setEmployeeFilter((prevState) => {
    return { ...prevState, employee_query: data }
  })
}
const changeByDesignation = (data) => {

  setEmployeeFilter((prevState) => {
    return { ...prevState, role_name: data }
  })

}

  // Table Headings, Data and Keys
  const tableHeadings=[
    {heading:'Employee Name'},
    {heading:'Employee ID'},
    {heading:'Floor'},
    {heading:'Past Department'},
    {heading:'Current Department'}
  ]

  const tableKeys = [
    'employee_name','empID','floor_name','department_from_name','store_dep_name'
  ]

  const [newval, setNewVal] = useState(false)
  const [obj,setObj] = useState({})

  const changeModalState = ([val , element]) => {
    setNewVal(val)
    setObj(element)
  }

  return (
    <React.Fragment>
      <EmployeeTransferModal value={newval} setval={setNewVal} Obj={obj} />
      <Heading heading={'Employee Transfer'} />
      <DropDownFilter selectByFloor={selectByFloor} selectByStore={selectByStore}  title1={'Floor'} title2={'Store'} />
      <Filter data={Data} changeDate={changeDate} changeByDesignation={changeByDesignation} changeByEmployee={changeByEmployee} />
      <MainTable App_Btn={true} func={changeModalState}  data={Data} height={true} Lnk={true} headings={tableHeadings} keys={tableKeys} link1={'false'} t3={'Approve'} link2={'/attendence_history'} />
    </React.Fragment>
  )
}

export default EmployeeTransfer