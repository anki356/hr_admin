import React, { useState } from 'react'
import Heading from '../../Components/Heading/Heading'
import TileContainer from '../../UI/TileContainer/TileContainer'
import DropDownFilter from '../../Components/DropDownFilter/DropDownFilter'
import Filter from '../../Components/Filter/Filter'

// Data for Table
import Data from './data'
import MainTable from '../../Components/MainTable/MainTable'
import AddLoanModal from '../../Components/AllModals/AddLoanModal'

const LoanEmi = () => {

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
    {heading:'Loan Request'}
  ]

  const tableKeys = [
    'name','id','floor','designation' , 'loan_req'
  ]
  const [newval, setNewVal] = useState(false)
  const [obj,setObj] = useState({})

  const changeModalState = ([val , element]) => {
    setNewVal(val)
    setObj(element)
  }

  return (
    <React.Fragment>
      <Heading heading={'Loan EMI'} />
      <TileContainer Data={TileData} />
      <DropDownFilter  title1={'Floor'} title2={'Store'}  />
      <Filter data={Data} />
      <MainTable func={changeModalState} Lnk={true} link1={'false'} link2={'/loan_approvals'} App_Btn={true} data={Data} height={true} Btn={false} headings={tableHeadings} keys={tableKeys} />
      <AddLoanModal value={newval} setval={setNewVal} Obj={obj}  />
    </React.Fragment>
  )
}

export default LoanEmi