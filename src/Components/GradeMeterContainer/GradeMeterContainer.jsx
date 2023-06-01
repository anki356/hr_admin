import React from 'react'
import GradeMeter from '../GradeMeter/GradeMeter'
import classes from './GradeMeterContainer.module.css'

const GradeMeterContainer = () => {
  return (
    <div className={classes.container}>
      <div className={classes.meter_container}>
        <GradeMeter progress={30} />
        <h3>System Marks</h3>
      </div>
      <span>And</span>
      <div className={classes.meter_container}>
        <GradeMeter progress={68} />
        <h3>FI Marks</h3>
      </div>
    </div>
  )
}

export default GradeMeterContainer