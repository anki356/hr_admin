import React from 'react'
import Heading from '../../Components/Heading/Heading'
import TileContainer from '../../UI/TileContainer/TileContainer'
import DropDownFilter from '../../Components/DropDownFilter/DropDownFilter'
import Filter from '../../Components/Filter/Filter'

// Data for Table
import Data from './data'
import MainTable from '../../Components/MainTable/MainTable'

const EmployeeDetails = () => {

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
  const tableHeadings=[
    {heading:'Employee Name'},
    {heading:'Employee ID'},
    {heading:'Floor'},
    {heading:'Designation'},
    {heading:'Department'}
  ]

  const tableKeys = [
    'name','id','floor','designation' , 'department'
  ]

  return (
    <React.Fragment>
      <Heading heading={'Employee Details'} />
      <TileContainer Data={TileData} />
      <DropDownFilter Btn={'Add Employee'} Lnk={'/add_employee'} title1={'Floor'} title2={'Store'}   />
      <Filter data={Data} />
      <MainTable data={Data} height={true} Btn={false} headings={tableHeadings} keys={tableKeys} Lnk2={true} link1={'/employee_profile'} />
    </React.Fragment>
  )
}

export default EmployeeDetails