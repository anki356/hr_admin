import React from 'react'
import classes from './Heading.module.css'
import { Link } from 'react-router-dom'

const Heading = (props) => {
  return (
    <div className={classes.heading_container}>
      <div>
        <h2>{props.heading}</h2>
        <div className={classes.breadcrumb}>Dashboard / Attendence</div>
      </div>
      {props.Btn &&
      <Link to={props.Btn_link}><button className={classes.heading_btn}>Add Role</button></Link>}
    </div>
  )
}

export default Heading