import React from 'react'
import Heading from '../../Components/Heading/Heading'
import TileContainer from '../../UI/TileContainer/TileContainer'
import DropDownFilter from '../../Components/DropDownFilter/DropDownFilter'
import Filter from '../../Components/Filter/Filter'

// Data for Table
import Data from './data'
import MainTable from '../../Components/MainTable/MainTable'
import InterviewModal from '../../Components/AllModals/InterviewModal'
import { useState } from 'react'

const Interviews = () => {

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
    {heading:'Interviewee'},
    {heading:'Interview Date'},
    {heading:'Interviewer'},
    {heading:'Reference'},
    {heading:'Remarks'},
    {heading:'Status'},
  ]

  const tableKeys = [
    'interviewee','interview_date','interview_date','reference','remark','status'
  ]

  const [newval, setNewVal] = useState(false)
  const [obj,setObj] = useState({})

  const changeModalState = ([val , element]) => {
    setNewVal(val)
    setObj(element)
  }

  return (
    <React.Fragment>
      <Heading heading={'Interviews'} />
      <TileContainer Data={TileData} />
      <DropDownFilter Btn='Add Interview' Lnk='/add_interview' title1={'Floor'} title2={'Store'}   />
      <Filter data={Data} />
      <MainTable func={changeModalState} Lnk={true} link1={'false'} t3={'Pay Bonus'} App_Btn={true}  headings={tableHeadings} keys={tableKeys} link2={'/attendence_history'} data={Data} />
      <InterviewModal value={newval} setval={setNewVal} Obj={obj}  />
    </React.Fragment>
  )
}

export default Interviews