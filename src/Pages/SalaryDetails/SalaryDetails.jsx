import React, { useState } from 'react'
import Heading from '../../Components/Heading/Heading'
import TileContainer from '../../UI/TileContainer/TileContainer'
import DropDownFilter from '../../Components/DropDownFilter/DropDownFilter'
import Filter from '../../Components/Filter/Filter'

// Data for Table
import Data from './data'
import MainTable from '../../Components/MainTable/MainTable'
import DownloadSalarySlip from '../../Components/AllModals/DownloadSalarySlip'

const SalaryDetails = () => {

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
    {heading:'Floor'},
    {heading:'Monthly Salary'},
    {heading:'Total Salary'}
  ]

  const tableKeys = [
    'name','id','floor', 'montly_salary','total_salary'
  ]

  const [newval, setNewVal] = useState(false)
  const [obj,setObj] = useState({})

  const changeModalState = ([val , element]) => {
    setNewVal(val)
    setObj(element)
  }

  return (
    <React.Fragment>
      <DownloadSalarySlip value={newval} setval={setNewVal} Obj={obj} />
      <Heading heading={'Salary Details'} />
      <TileContainer Data={TileData} />
      <DropDownFilter title1={'Floor'} title2={'Store'}  />
      <Filter data={Data} />
      <MainTable func={changeModalState} data={Data} height={true} Lnk={true} headings={tableHeadings} keys={tableKeys} link1={'/salary_slip'} link2={'/salary_certificate'} t1={'Make salary slip'} t2={'Make certificate'} link3={'false'} t3={'Download salary slip'} link4={'/overall_salary_details'} t4={'View Salary Details'} App_Btn={true} />
    </React.Fragment>
  )
}

export default SalaryDetails