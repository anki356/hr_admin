import React, { useEffect, useState } from 'react'
import Heading from '../../Components/Heading/Heading'
import classes from './roles.module.css'


// Data for Table
import Data from './data'
import MainTable from '../../Components/MainTable/MainTable'
import { Link } from 'react-router-dom'
import Cookies from 'universal-cookie'
import axios from 'axios'
const Roles = () => {
  const url = "http://localhost:9000/"
  const cookies = new Cookies();
  const token = cookies.get('token')
  const [roles, setRoles] = useState([])
  useEffect(() => {

    const headers = { "Authorization": "Bearer " + token }
    axios.get(url + "api/getRoles", { headers }).then((response) => {
      setRoles(response.data)
    })
  }, [])
  // Table Headings, Data and Keys
  const tableHeadings = [
    { heading: 'Role' },
    { heading: 'Store' },
    { heading: 'Floor' },
    { heading: 'Permission Modules' }
  ]

  const tableKeys = [
    'role_name', 'store_name', 'floor_name', 'permission_modules'
  ]

  return (
    <React.Fragment>
      <Heading heading={'Roles'} Btn={'Add Role'} Btn_link={'/add_roles'} />
      <MainTable data={roles} height={true} Lnk06={true} headings={tableHeadings} keys={tableKeys} link3={'/det'} link2={'/edit_roles'} t1='View Details' t2='Edit' lnk2={true} link1={'false'} />
    </React.Fragment>
  )
}

export default Roles