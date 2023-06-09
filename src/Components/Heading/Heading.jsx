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
      <Link to={props.isEdit!==undefined?props.Btn_link+"/"+props.id:props.Btn_link}><button className={classes.heading_btn}>{props.isEdit!==undefined?'Edit':'Add'} {props.Btn}</button></Link>}
    </div>
  )
}

export default Heading