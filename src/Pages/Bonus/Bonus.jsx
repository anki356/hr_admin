import React, { useState } from 'react'
import Heading from '../../Components/Heading/Heading'
import TileContainer from '../../UI/TileContainer/TileContainer'
import DropDownFilter from '../../Components/DropDownFilter/DropDownFilter'
import Filter from '../../Components/Filter/Filter'

// Data for Table
import Data from './data'
import MainTable from '../../Components/MainTable/MainTable'
import AddLoanModal from '../../Components/AllModals/AddLoanModal'
import AddBonusModal from '../../Components/AllModals/AddBonusModal'

const Bonus = () => {

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
  const tableHeading=[
    {heading:'Employee'},
    {heading:'Basic Salary'},
    {heading:'Financial Year'},
    {heading:'Status'},
    {heading:'Amount'},
    {heading:'Pay Date'},
  ]
  const tableKeys = ['employee','basic_salary','financial_year','status','amount','pay_date']

  const [newval, setNewVal] = useState(false)
  const [obj,setObj] = useState({})

  const changeModalState = ([val , element]) => {
    setNewVal(val)
    setObj(element)
  }

  return (
    <React.Fragment>
      <Heading heading={'Bonus'} />
      <TileContainer Data={TileData} />
      <DropDownFilter title1={'Floor'} title2={'Store'}  />
      <Filter data={Data} />
      <MainTable func={changeModalState} Lnk={true} link1={'false'} t3={'Pay Bonus'} link2={'/bonus_approvals'} App_Btn={true} data={Data} height={true} Btn={false} headings={tableHeading} keys={tableKeys} />
      

      <AddBonusModal value={newval} setval={setNewVal} Obj={obj}  />
    </React.Fragment>
  )
}

export default Bonus