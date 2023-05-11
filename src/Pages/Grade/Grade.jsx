import classes from './Grade.module.css'
import React from 'react'
import Heading from '../../Components/Heading/Heading'
import TileContainer from '../../UI/TileContainer/TileContainer'
import DropDownFilter from '../../Components/DropDownFilter/DropDownFilter'
import Filter from '../../Components/Filter/Filter'

// Data for Table
import Data from './data'
import MainTable from '../../Components/MainTable/MainTable'

const Grade = () => {

  // Here is our data for tile in the page
  const TileData = [
    {
      title: 'Average Employee',
      value: 'A+',
      num: 15
    },
    {
      title: 'Grade Employee',
      value: 42,
      num: 23
    },
    {
      title: 'Left Grade Employee',
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
    {heading:'Designation'},
    {heading:'WD Grade'},
    {heading:'COM Trade'},
    {heading:'Fine Marks'},
    {heading:'Out of 60'},
    {heading:'Behavior With Customer'},
    {heading:'Behavior With Staff/Head'},
    {heading:'Counter Clearance'},
    {heading:'Presentation'},
    {heading:'Out Of 40'},
    {heading:'Out Of 100'},
    {heading:'Final Grade'}
  ]

  const tableKeys = [
    'name','id','attendence','floor'
  ]

  return (
    <React.Fragment>
      <Heading heading={'Grade'}  />
      <TileContainer Data={TileData} />
      <DropDownFilter title1={'Floor'} title2={'Store'}  />
      <Filter data={Data} />
      <div className={classes.whole_table_c}
      >
        <MainTable data={Data} height={true} Lnk={true} headings={tableHeadings} keys={tableKeys} link1={'/attendence_approval'} link2={'/attendence_history'} wd={'2700px'} />
      </div>
    </React.Fragment>
  )
}

export default Grade