import React from 'react'
import Heading from '../../Components/Heading/Heading'
import TileContainer from '../../UI/TileContainer/TileContainer'
import DropDownFilter from '../../Components/DropDownFilter/DropDownFilter'
import Filter from '../../Components/Filter/Filter'

// Data for Table
import Data from './data'
import MainTable from '../../Components/MainTable/MainTable'

const TimingApprovals = () => {

  // Here is our data for tile in the page
  const TileData = [
    {
      title: 'Total Expense',
      value: '₹5000',
      num: 15
    },
    {
      title: 'Pending Approvals',
      value: 42,
      num: 23
    },
    {
      title: 'On Leave',
      value: 50,
      num: 10
    },
    {
      title: 'Out From Store',
      value: 104,
      num: -23
    }
  ]

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