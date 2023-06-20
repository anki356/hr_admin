import React from 'react'
import Heading from '../../Components/Heading/Heading'
import TileContainer from '../../UI/TileContainer/TileContainer'
import DropDownFilter from '../../Components/DropDownFilter/DropDownFilter'
import Filter from '../../Components/Filter/Filter'

// Data for Table
import Data from './data'
import MainTable from '../../Components/MainTable/MainTable'

const AttendenceCorrection = () => {

  // Here is our data for tile in the page
  const TileData = [
    {
      title: 'Total Approvals',
      value: '₹2000',
      num: 15
    },
    {
      title: 'Pending Approvals',
      value: 22,
      num: 12
    },
    {
      title: 'Rejected',
      value: 1,
      num: -1
    },
    {
      title: 'Out From location',
      value: 23,
      num: 12
    }
  ]

  // Table Headings, Data and Keys
  const tableHeadings=[
    {heading:'Employee Name'},
    {heading:'Employee ID'},
    {heading:'Floor'},
    {heading:'Correction'}
  ]

  const tableKeys = [
    'name','id','floor','correction'
  ]

  return (
    <React.Fragment>
      <Heading heading={'Attendence Corrections'} />
      <TileContainer Data={TileData} />
      <DropDownFilter  />
      <Filter data={Data} />
      <MainTable data={Data} t1={'Check and Correct'} height={true} Btn={false} headings={tableHeadings} keys={tableKeys} Lnk={true} link2={'/attendence_corrections_details'} link1={'/attendence_corrections_check'} />
    </React.Fragment>
  )
}

export default AttendenceCorrection