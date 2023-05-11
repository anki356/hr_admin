import React from 'react'
import Heading from '../../Components/Heading/Heading'
import classes from './roles.module.css'

// Data for Table
import Data from './data'
import MainTable from '../../Components/MainTable/MainTable'
import { Link } from 'react-router-dom'

const Roles = () => {

  // Table Headings, Data and Keys
  const tableHeadings=[
    {heading:'Role'},
    {heading:'Store'},
    {heading:'Floor'},
    {heading:'Permission Modules'}
  ]

  const tableKeys = [
    'role','store','floor','permission_modules'
  ]

  return (
    <React.Fragment>
      <Heading heading={'Roles'} Btn={'Add Role'} Btn_link={'/add_roles'} />
      <MainTable data={Data} height={true} Lnk={true} headings={tableHeadings} keys={tableKeys} link1={'/det'} link2={'/edit_roles'}t1='View Details' t2='Edit' />
    </React.Fragment>
  )
}

export default Roles