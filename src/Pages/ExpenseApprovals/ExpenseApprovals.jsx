import React from 'react'
import Heading from '../../Components/Heading/Heading'
import TileContainer from '../../UI/TileContainer/TileContainer'
import DropDownFilter from '../../Components/DropDownFilter/DropDownFilter'
import Filter from '../../Components/Filter/Filter'

// Data for Table
import Data from './data'
import MainTable from '../../Components/MainTable/MainTable'

const ExpenseApprovals = () => {

  // Here is our data for tile in the page
  const TileData = [
    {
      title: 'Total Expense',
      value: '₹2000',
      num: 15
    },
    {
      title: 'Pending Approvals',
      value: 22,
      num: 12
    },
    {
      title: 'Total Emp. Granted',
      value: 1,
      num: -1
    },
    {
      title: 'Out From Store',
      value: 23,
      num: 12
    }
  ]

  // Table Headings, Data and Keys
  const tableHeadings=[
    {heading:'Employee Name'},
    {heading:'Employee ID'},
    {heading:'Expense'},
    {heading:'Expense Type'},
    {heading:'Request Date'}
  ]

  const tableKeys = [
    'name','id','expense','expense_type','req_date'
  ]

  return (
    <React.Fragment>
      <Heading heading={'Expense Approvals'} />
      <TileContainer Data={TileData} />
      <DropDownFilter title1={'Floor'} title2={'Store'} d3={true} title3={'Expense Type'} />
      <Filter data={Data} />
      <MainTable data={Data} height={true} Btn={false} headings={tableHeadings} keys={tableKeys} Lnk={true} link2={'/expense_details'} link1={'/expense_approval'} />
    </React.Fragment>
  )
}

export default ExpenseApprovals