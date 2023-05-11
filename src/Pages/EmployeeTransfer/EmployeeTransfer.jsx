import React, { useState } from 'react'
import Heading from '../../Components/Heading/Heading'
import DropDownFilter from '../../Components/DropDownFilter/DropDownFilter'
import Filter from '../../Components/Filter/Filter'

// Data for Table
import Data from './data'
import MainTable from '../../Components/MainTable/MainTable'
import EmployeeTransferModal from '../../Components/AllModals/EmployeeTransferModal'

const EmployeeTransfer = () => {

  // Table Headings, Data and Keys
  const tableHeadings=[
    {heading:'Employee Name'},
    {heading:'Employee ID'},
    {heading:'Floor'},
    {heading:'Past Department'},
    {heading:'Current Department'}
  ]

  const tableKeys = [
    'name','id','floor','past_department','current_department'
  ]

  const [newval, setNewVal] = useState(false)
  const [obj,setObj] = useState({})

  const changeModalState = ([val , element]) => {
    setNewVal(val)
    setObj(element)
  }

  return (
    <React.Fragment>
      <EmployeeTransferModal value={newval} setval={setNewVal} Obj={obj} />
      <Heading heading={'Employee Transfer'} />
      <DropDownFilter />
      <Filter data={Data} />
      <MainTable App_Btn={true} func={changeModalState}  data={Data} height={true} Lnk={true} headings={tableHeadings} keys={tableKeys} link1={'false'} t3={'Approve'} link2={'/attendence_history'} />
    </React.Fragment>
  )
}

export default EmployeeTransfer