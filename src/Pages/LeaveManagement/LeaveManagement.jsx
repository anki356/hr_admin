import React, { useState } from 'react'
import Heading from '../../Components/Heading/Heading'
import TileContainer from '../../UI/TileContainer/TileContainer'
import DropDownFilter from '../../Components/DropDownFilter/DropDownFilter'
import Filter from '../../Components/Filter/Filter'

// Data for Table
import Data from './data'
import MainTable from '../../Components/MainTable/MainTable'
import AddLeaveModal from '../../Components/AllModals/AddLeaveModal'

const LeaveManagement = () => {

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
  const tableHeadings = [
    { heading: 'Employee Name' },
    { heading: 'Employee ID' },
    { heading: 'Floor' },
    { heading: 'Designation' },
    { heading: 'Department' }
  ]

  const tableKeys = [
    'name', 'id', 'floor', 'designation', 'department'
  ]

  const [newval, setNewVal] = useState(false)
  const [obj, setObj] = useState({})

  const changeModalState = ([val, element]) => {
    setNewVal(val)
    setObj(element)
  }

  return (
    <React.Fragment>
      <Heading heading={'Leave Management'} />
      <TileContainer Data={TileData} />
      <DropDownFilter title1={'Floor'} title2={'Store'}  />
      <Filter data={Data} />
      <MainTable func={changeModalState}  data={Data} height={true} Lnk={true} link1={'false'} link2={'/leave_approvals'} App_Btn={true} Btn={false} headings={tableHeadings} keys={tableKeys} />
      <AddLeaveModal value={newval} setval={setNewVal} Obj={obj} />
    </React.Fragment>
  )
}

export default LeaveManagement