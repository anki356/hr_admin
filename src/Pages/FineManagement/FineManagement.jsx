import React, { useState, useEffect } from 'react'
import Heading from '../../Components/Heading/Heading'
import TileContainer from '../../UI/TileContainer/TileContainer'
import DropDownFilter from '../../Components/DropDownFilter/DropDownFilter'
import Filter from '../../Components/Filter/Filter'
// Data for Table
import Data from './data'
import MainTable from '../../Components/MainTable/MainTable'
import AddFineModal from '../../Components/AllModals/AddFineModal'
import Cookies from 'universal-cookie'
import useHttp from '../../Hooks/use-http'
import moment from 'moment'
import axios from 'axios'

import Pagination from '../../Components/Pagination/Pagination'
// Table Headings, Data and Keys
const tableHeadings = [
  { heading: 'Employee Name' },
  { heading: 'Employee ID' },
  { heading: 'Floor' },
  { heading: 'Store' },
  { heading: 'Fine Date' },
  { heading: 'Fine' },
  {heading:'Request Status'}

]

const tableKeys = [
  'employee_name', 'empID', 'floor_name','store_name', 'date', 'amount','status'
]

const FineManagement = () => {

  const [newval, setNewVal] = useState(false)
  const [obj, setObj] = useState({})
  const [SuperVisor, setSuperVisor] = useState(null)
  const url = "http://localhost:9000/"
  // Here is our data for tile in the page
  const [date, setDate] = useState(null)
  const [data, setData] = useState([])
  const [limit, setLimit] = useState(10)
  const [offset, setOffset] = useState(0)
  const [employeeFilter, setEmployeeFilter] = useState({
    employee_query: '',
    floor_name: "",
    role_name: "",
    store_name: ""
  })
  const cookies = new Cookies();
  const token = cookies.get('token')
  const { sendRequest: fetchPendingAttendance } = useHttp()
  const [TileData, setTileData] = useState([])
  function OverAllData() {
    const token = cookies.get('token')
    const headers = { "Authorization": "Bearer " + token }
    let from_date = moment(date)
   
    
    axios.get("http://localhost:9000/api/getTotal?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + from_date.add(1, 'd').format("YYYY-MM-DD") + "&status='Present'", { headers }).then((response) => {
      const todayPresent = response.data[0]?.count_id
      from_date = moment(date).subtract(1, 'd')
      axios.get("http://localhost:9000/api/getTotal?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + from_date.add(1, 'd').format("YYYY-MM-DD") + "&status='Present'", { headers }).then((response) => {
        const yesterdayPresent = response.data[0]?.count_id
        from_date = moment(date)
        axios.get("http://localhost:9000/api/getTotal?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + from_date.add(1, 'd').format("YYYY-MM-DD") + "&status='Absent'", { headers }).then((response) => {
          const todayAbsent = response.data[0]?.count_id
          from_date = moment(date).subtract(1, 'd')
          axios.get("http://localhost:9000/api/getTotal?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + from_date.add(1, 'd').format("YYYY-MM-DD") + "&status='Absent'", { headers }).then((response) => {
            const yesterdayAbsent = response.data[0]?.count_id
            from_date = moment(date)
            axios.get("http://localhost:9000/api/getTotal?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + from_date.add(1, 'd').format("YYYY-MM-DD") + "&status='On Leave'", { headers }).then((response) => {
              const todayLeave = response.data[0]?.count_id
              from_date = moment(date).subtract(1, 'd')
              axios.get("http://localhost:9000/api/getTotal?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + from_date.add(1, 'd').format("YYYY-MM-DD") + "&status='On Leave'", { headers }).then((response) => {
                const yesterdayLeave = response.data[0]?.count_id
                let from_date_out = moment()
                axios.get("http://localhost:9000/api/getTotalOutSessions?from_date=" + from_date_out.format("YYYY-MM-DD") + "&to_date=" + from_date_out.add(1, 'd').format("YYYY-MM-DD"), { headers }).then((response) => {
                  let totalOut = response.data[0]?.count_id
                  setTileData([{
                    title: "Total Present",
                    value: todayPresent,
                    num: todayPresent - yesterdayPresent,
                    para: "Day"
                  }, {
                    title: "Total Absent",
                    value: todayAbsent,
                    num: todayAbsent - yesterdayAbsent,
                    para: "Day"
                  }, {
                    title: "Total On Leave",
                    value: todayLeave,
                    num: todayLeave - yesterdayLeave,
                    para: "Day"
                  }, {
                    title: "Total Outs",
                    value: totalOut,
                    para: "Hour"
                  }])
                })
              })
            })
          })
        })
      })
    })
  }
  useEffect(() => {
    OverAllData()
    console.log(TileData)
  }, [])
  useEffect(() => {
    let from_date = moment(date)
//getFine
if(employeeFilter.store_name!=''){
  let getString = url + "api/getFines?store_name="+employeeFilter.store_name+"&limit="+limit+"&offset="+offset
  if(employeeFilter.employee_query!=''){
    getString+="&employee_query="+employeeFilter.employee_query
}
    if(employeeFilter.role_name!=''){
      getString+='&role_name='+employeeFilter.role_name
    }
    if(employeeFilter.floor_name!=''){
      getString+="&floor_name="+employeeFilter.floor_name
    }
   
    if(date!=null){
      let from_date=moment(date)
      getString+="&from_date="+from_date.format("YYYY-MM-DD")+"&to_date="+from_date.add(1,'d').format("YYYY-MM-DD")
    }
    const listAttendance = (attendance) => {
      setData(attendance)
    }
    fetchPendingAttendance({ url: getString }, listAttendance)
  }


  }, [date, limit, offset, employeeFilter])
  // Table Headings, Data and Keys
  const changeByEmployee = (data) => {
    setEmployeeFilter((prevState) => {
      return { ...prevState, employee_query: data }
    })
  }
  const changeByDesignation = (data) => {

    setEmployeeFilter((prevState) => {
      return { ...prevState, role_name: data }
    })

  }
  // if(!loading){
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

  const selectEntries = (data) => {
    setLimit(data)
  }
  const selectPage = (data) => {
    console.log(data)
    setOffset((data - 1) * limit)
  }

  const changeDate = (data) => {
    
    setDate(data)
  }


  const changeModalState = ([val, element]) => {
    const headers = { "Authorization": "Bearer " + token }
    axios.get(url + "api/getEmployeeDetails?id=" + element.employee_id, { headers }).then((response) => {
      setSuperVisor(response.data.headEmployeesResult[0]?.head_employee_name)
    })
    setNewVal(val)
    setObj(element)
  }


  return (
    <React.Fragment>
      <Heading heading={'Fine Management'} Btn_link={'/add_fine'} Btn={'Fine'} />
      <TileContainer Data={TileData} />
      <DropDownFilter title1={'Floor'} title2={'Store'} selectByFloor={selectByFloor} selectByStore={selectByStore} />
      <Filter data={data} changeDate={changeDate} changeByDesignation={changeByDesignation} changeByEmployee={changeByEmployee} />
      <MainTable func={changeModalState} Lnk3={true} link1={'/fine_approvals'} link2={'/fine_details'} link4={false} App_Btn={false} data={data} height={true} Btn={false} headings={tableHeadings} keys={tableKeys}/>
      <AddFineModal value={newval} setval={setNewVal} Obj={obj} SuperVisor={SuperVisor} reloadFunc={OverAllData} />
      <Pagination selectEntries={selectEntries} selectPage={selectPage} />
    </React.Fragment>
  )
}
// else if(error!==null &loading){
  <React.Fragment>
    <h1>Loading</h1>
    </React.Fragment>


export default FineManagement