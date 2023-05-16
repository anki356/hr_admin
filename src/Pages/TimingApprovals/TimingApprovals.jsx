import React, { useEffect, useState } from 'react'
import Heading from '../../Components/Heading/Heading'
import TileContainer from '../../UI/TileContainer/TileContainer'
import DropDownFilter from '../../Components/DropDownFilter/DropDownFilter'
import Filter from '../../Components/Filter/Filter'
import moment from 'moment/moment'

import useHttp from '../../Hooks/use-http'
import axios from 'axios'
import Pagination from '../../Components/Pagination/Pagination'
import Cookies from 'universal-cookie'

// Data for Table

import MainTable from '../../Components/MainTable/MainTable'

const TimingApprovals = () => {
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
  // Here is our data for tile in the page
  useEffect(() => {
  const token = cookies.get('token')
    const headers = { "Authorization": "Bearer " + token }
    let from_date = moment(date)
    const listAttendance = (attendance) => {
      setData(attendance)
    }
    fetchPendingAttendance({ url: url + "api/getAttendanceCorrectionRequests?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + from_date.add(1, 'd').format("YYYY-MM-DD") + "&limit=" + limit + "&offset=" + offset + "&type='For Some Work'" }, listAttendance)
  },[])
  // Table Headings, Data and Keys
  const tableHeadings=[
    {heading:'Employee Name'},
    {heading:'Employee ID'},
    {heading:'Attendence'},
    {heading:'Floor'}
  ]

  const tableKeys = [
    'name','id','attendence','floor'
  ]

  return (
    <React.Fragment>
      <Heading heading={'Timming Approvals'} />
      <TileContainer Data={TileData} />
      <DropDownFilter title1={'Floor'} title2={'Store'} />
      <Filter data={Data} />
      <MainTable data={Data} height={true} Lnk={true} headings={tableHeadings} keys={tableKeys} link1={'/timing_approve'} link2={'/'} />
    </React.Fragment>
  )
}

export default TimingApprovals