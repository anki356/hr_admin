import React, { useEffect, useState } from 'react'
import Heading from '../../Components/Heading/Heading'
import TileContainer from '../../UI/TileContainer/TileContainer'
import DropDownFilter from '../../Components/DropDownFilter/DropDownFilter'
import Filter from '../../Components/Filter/Filter'

// Data for Table
import Data from './data'
import MainTable from '../../Components/MainTable/MainTable'
import AddLoanModal from '../../Components/AllModals/AddLoanModal'
import AddBonusModal from '../../Components/AllModals/AddBonusModal'
import Cookies from 'universal-cookie'
import axios from 'axios'
import useHttp from '../../Hooks/use-http'
import moment from 'moment'
import Pagination from '../../Components/Pagination/Pagination'

// Here is our data for tile in the page
const TileData = [
  {
    title: 'Total Employee',
    value: '130',
    num: 2
  },
  {
    title: 'Trails Employee',
    value: 9,
    num: 2
  },
  {
    title: 'Total Depart.',
    value: 8,
    num: 3
  },
  {
    title: 'Out From Store',
    value: 23,
    num: -12
  }
]

// Table Headings, Data and Keys
const tableHeading = [
  { heading: 'Employee' },
  { heading: 'Basic Salary' },
  { heading: 'Financial Year' },
  { heading: 'Status' },
  { heading: 'Amount' },
  { heading: 'Pay Date' },
]
const tableKeys = ['employee', 'basic_salary', 'financial_year', 'status', 'amount', 'pay_date']


const Bonus = () => {
  const [newval, setNewVal] = useState(false)
  const [obj, setObj] = useState({})

  const changeModalState = ([val, element]) => {
    setNewVal(val)
    setObj(element)
  }

  const url = "http://localhost:9000/"
  // Here is our data for tile in the page
  const [date, setDate] = useState(new Date())
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
  const { sendRequest: fetchPendingAttendance } = useHttp()
  const [TileData, setTileData] = useState([])
  useEffect(() => {
  const token = cookies.get('token')
    const headers = { "Authorization": "Bearer " + token }
    let from_date = moment(date)
    const listAttendance = (attendance) => {
      setData(attendance)
    }
    fetchPendingAttendance({ url: url + "api/getAttendanceCorrectionRequests?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + from_date.add(1, 'd').format("YYYY-MM-DD") + "&limit=" + limit + "&offset=" + offset + "&type='Out For Some Work'" }, listAttendance)
    from_date = moment(date)
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
    console.log(TileData)
  },[])
  useEffect(() => {
    let from_date = moment(date)

    let getString = url + "api/getAttendanceCorrectionRequests?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + from_date.add(1, 'd').format("YYYY-MM-DD") + "&limit=" + limit + "&offset=" + offset + "&type='Out For Some Work'"
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

    const listAttendance = (attendance) => {
      setData(attendance)
    }
    fetchPendingAttendance({ url: getString }, listAttendance)


    // axios.get(getString,{headers}).then((response)=>{
    //       setData(response.data)
    //   })
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
    setLimit(10)
    setOffset(0)
    setDate(data)
  }


  return (
    <React.Fragment>
      <Heading heading={'Bonus'} />
      <TileContainer Data={TileData} />
      <DropDownFilter title1={'Floor'} title2={'Store'} selectByFloor={selectByFloor} selectByStore={selectByStore} />
      <Filter data={data} changeDate={changeDate} changeByDesignation={changeByDesignation} changeByEmployee={changeByEmployee} />
      <MainTable func={changeModalState} Lnk={true} link1={'false'}  link2={'/bonus_approvals'} App_Btn={true} data={Data} height={true} Btn={false} headings={tableHeading} keys={tableKeys} t3={'Add Bonus'} t2={'Approve'} />
<Pagination selectEntries={selectEntries} selectPage={selectPage} />

      <AddBonusModal value={newval} setval={setNewVal} Obj={obj} />
    </React.Fragment>
  )
}

export default Bonus