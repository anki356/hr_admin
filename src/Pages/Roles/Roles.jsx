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
    { heading: 'Floor' }
  ]

  const tableKeys = [
    'name', 'store_name', 'floor_name'
  ]

  return (
    <React.Fragment>
      <Heading heading={'Roles'} Btn={'Role'} Btn_link={'/add_roles'} />
      <MainTable data={roles} Lnk4={true} headings={tableHeadings} keys={tableKeys}  link2={'/edit_roles'} t1='View Details' t2='Edit'  link1={'/role_details'} />
    </React.Fragment>
  )
}

export default Roles