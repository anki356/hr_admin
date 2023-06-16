import classes from './AttendenceApprovals.module.css'
import React, { useEffect, useState } from 'react'
import Heading from '../../Components/Heading/Heading'
import TileContainer from '../../UI/TileContainer/TileContainer'
import DropDownFilter from '../../Components/DropDownFilter/DropDownFilter'
import Filter from '../../Components/Filter/Filter'
import moment from 'moment/moment'
import MainTable from '../../Components/MainTable/MainTable'
import useHttp from '../../Hooks/use-http'
import axios from 'axios'
import Pagination from '../../Components/Pagination/Pagination'
import Cookies from 'universal-cookie'

const AttendenceApprovals = () => {
  const url = "http://localhost:9000/"
  // Here is our data for tile in the page
  const [date, setDate] = useState(new Date())
  const [data, setData] = useState([])
  const [limit, setLimit] = useState(10)
  const [offset, setOffset] = useState(0)
  
  const [total,setTotal]=useState(0)
  const [employeeFilter, setEmployeeFilter] = useState({
    employee_query: '',
    floor_name: "",
    role_name: "",
    store_name: ""
  })
  const cookies = new Cookies();
  const { sendRequest: fetchPendingAttendance } = useHttp()
  const [TileData, setTileData] = useState([])
  // let {data,loading,error}=useGetHook(url+"api/getAttendance?from_date="+from_date.format("YYYY-MM-DD")+"&to_date="+from_date.add(1,'d').format("YYYY-MM-DD")+"&limit="+limit+"&offset="+offset+"&status='Pending'", from_date_format)
  useEffect(() => {
    const token = cookies.get('token')
    const headers = { "Authorization": "Bearer " + token }
    let from_date = moment(date)
    const listAttendance = (attendance) => {
      setData(attendance)
    }
    fetchPendingAttendance({ url: url + "api/getAttendanceCorrectionRequests?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + from_date.add(1, 'd').format("YYYY-MM-DD") + "&limit=" + limit + "&offset=" + offset + "&type='By Mistake'" }, listAttendance)
    from_date = moment(date)
    const listTotal = (attendance) => {
      setTotal(attendance.length)
    }
    fetchPendingAttendance({ url: url + "api/getAttendanceCorrectionRequests?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + from_date.add(1, 'd').format("YYYY-MM-DD") + "&type='By Mistake'" }, listTotal)
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
    // axios.get(,{headers}).then((response)=>{

    //           setData(response.data)
    //       })

    //   from_date=moment()
    //   axios.get("http://localhost:3000/api/getTotalApprovals?from_date="+from_date.format("YYYY-MM-DD")+"&to_date="+from_date.add(1,'d').format("YYYY-MM-DD"),{headers}).then((response)=>{
    //     setApprovedSessions(response.data[0].count_id)
    //     from_date=moment().subtract(1,'d')
    //   axios.get("http://localhost:3000/api/getTotalApprovals?from_date="+from_date.format("YYYY-MM-DD")+"&to_date="+from_date.add(1,'d').format("YYYY-MM-DD"),{headers}).then((responseOne)=>{
    //     setApprovedSessionsNum(response.data[0].count_id-responseOne.data[0].count_id)
    //     from_date=moment()
    //     axios.get("http://localhost:3000/api/getTotalEmployeesApproved?from_date="+from_date.format("YYYY-MM-DD")+"&to_date="+from_date.add(1,'d').format("YYYY-MM-DD"),{headers}).then((responseSecond)=>{
    //     setApprovedIndividuals(responseSecond.data[0].count_id)
    //     from_date=moment().subtract(1,'d')
    //   axios.get("http://localhost:3000/api/getTotalApprovals?from_date="+from_date.format("YYYY-MM-DD")+"&to_date="+from_date.add(1,'d').format("YYYY-MM-DD"),{headers}).then((responseThird)=>{

    //     setApprovedIndividualsNum(responseSecond.data[0].count_id-responseThird.data[0].count_id)
    //     from_date=moment(date)
    //         axios.get("http://localhost:3000/api/getTotal?from_date="+from_date.format("YYYY-MM-DD")+"&to_date="+from_date.add(1,'d').format("YYYY-MM-DD")+"&status='On leave'",{headers}).then((response)=>{
    //             setTotalLeave(response.data[0].count_id)

    //         from_date=moment(date).subtract(1,'d')
    //         axios.get("http://localhost:3000/api/getTotal?from_date="+from_date.format("YYYY-MM-DD")+"&to_date="+from_date.add(1,'d').format("YYYY-MM-DD")+"&status='On leave'",{headers}).then((responseTwo)=>{
    //             setTotalLeaveNum(response.data[0].count_id-responseTwo.data[0].count_id)
    // })
    //         })
    //         let from_date_out=moment()
    //     axios.get("http://localhost:3000/api/getTotalOutSessions?from_date="+from_date_out.format("YYYY-MM-DD")+"&to_date="+from_date_out.add(1,'d').format("YYYY-MM-DD"),{headers}).then((responseFourth)=>{
    //         setTotalOuts(responseFourth.data[0].count_id)

    //     })

    // })
    //     })
    //   }) 
    //   })   

  }, [])
  useEffect(() => {
    // let token=localStorage.getItem('token')
    // if(token===null){
    // navigate('/login')
    // }
    // const headers={"Authorization":"Bearer "+token}
    let from_date = moment(date)

    let getString = url + "api/getAttendanceCorrectionRequests?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + from_date.add(1, 'd').format("YYYY-MM-DD") + "&limit=" + limit + "&offset=" + offset + "&type='By Mistake'"
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
    getString = url + "api/getAttendanceCorrectionRequests?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + from_date.add(1, 'd').format("YYYY-MM-DD") +  "&type='By Mistake'"
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

    const listTotal = (attendance) => {
      setData(attendance)
    }
    fetchPendingAttendance({ url: getString }, listTotal)

    // axios.get(getString,{headers}).then((response)=>{
    //       setData(response.data)
    //   })
  }, [date, limit, offset, employeeFilter])
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
  // Table Headings, Data and Keys
  const tableHeadings = [
    { heading: 'Employee Name' },
    { heading: 'Employee ID' },
    { heading: 'Attendence' },
    { heading: 'Floor' },
    {heading:'Store'},
    {heading:'Status'}
  ]

  const tableKeys = [
    'employee_name', 'empID', 'status', 'floor_name','store_name','status'
  ]
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

  return (
    <React.Fragment>
      <Heading heading={'Attendance Approvals'} />
      <TileContainer Data={TileData} />
      <DropDownFilter title1={'Floor'} title2={'Store'} selectByFloor={selectByFloor} selectByStore={selectByStore} />
      <Filter data={data} isdate={true} changeDate={changeDate} changeByDesignation={changeByDesignation} changeByEmployee={changeByEmployee} />
      <MainTable data={data} height={true} Lnk={true} headings={tableHeadings} keys={tableKeys} link1={'/attendence_approval'} link2={false} link4={false} />
      {/* <Entrypage selectEntries={selectEntries} selectPage={selectPage}/> */}
      <Pagination selectEntries={selectEntries} selectPage={selectPage} offset={offset} limit={limit} total={total} />
    </React.Fragment>
  )
}
// else if(error!==null &loading){
<React.Fragment>
  <h1>Loading</h1>
</React.Fragment>
// }
// else{
//   <React.Fragment>
//     <h1>error</h1>
//     </React.Fragment>
// }
// }

export default AttendenceApprovals