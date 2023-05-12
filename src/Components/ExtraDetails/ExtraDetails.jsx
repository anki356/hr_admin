import classes from './ExtraDetails.module.css'
import ExtraDetailsDiv from './ExtraDetailsDiv'
import React,{useState,useEffect} from 'react'

import axios from 'axios'
const ExtraDetails = (props) => {
  

  const div_data = [
    {
      title: 'Category',
      value: props?.data[0]?.category_name
    },
    {
      title: 'Time',
      value: props?.data[0]?.date.split("T")[1].substring(0,8)
    },
    {
      title: 'Date',
      value: props?.data[0]?.date.split("T")[0].split("-").reverse().join("/")
    },
    {
      title: 'Expense',
      value: '₹'+props?.data[0]?.amount
    }
  ]
  return (
    <div className={`uni_container ${classes.container}`}>
      <h3 className='uni_heading'>{props.heading? props.heading:'Expense Details'}</h3>
      <div className={classes.inner_container}>
        <div className={classes.inner_container_first}>
          {div_data.map((element, index) => (
          <ExtraDetailsDiv title={element.title} value={element.value} index={index} />
          ))}
        </div>
        <div className={classes.inner_container_second}>
          <h5 style={{marginTop:'20px',fontSize:'16px'}}>Reasons & Remarks</h5>
          <div>
           {props?.data[0]?.notes}
          </div>
        </div>
        {props.status &&
        <div className={classes.inner_container_third}>
          Status : <span>{props.status}</span>
        </div>
}
      </div>
    </div>
  )
}

export default ExtraDetails