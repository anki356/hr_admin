import React from 'react'
import classes from './OSD_Charts.module.css'
import Areachart2 from '../../Report/Charts/Areachart2/Areachart2'
import Donutchart from '../../Report/Charts/Donutchart/Donutchart'

const OSD_Charts = () => {
  return (
    <div className={classes.container}>
      <div className={classes.container3}>
          <div className={classes.circle_div1}>
            % of Attendence
            <select id='gMonth1'>
              <option value=''>--Select Month--</option>
              <option selected value='1'>Janaury</option>
              <option value='2'>February</option>
              <option value='3'>March</option>
              <option value='4'>April</option>
              <option value='5'>May</option>
              <option value='6'>June</option>
              <option value='7'>July</option>
              <option value='8'>August</option>
              <option value='9'>September</option>
              <option value='10'>October</option>
              <option value='11'>November</option>
              <option value='12'>December</option>
            </select>
          </div>
          <div className={classes.circle_div2}><Donutchart /></div>
          <div className={classes.circle_div3}>
            <div className={classes.circle_div3_div}>
              <span>88%</span>
              <div className={`${classes.circle_div3_inner_div}`}>
                <div className={`${classes.colored}`}></div> Present
              </div>
            </div>
            <div className={classes.circle_div3_div}>
              <span>12%</span>
              <div className={classes.circle_div3_inner_div}>
                <div></div> Present
              </div>
            </div>
          </div>
        </div>
        <div className={classes.container4}>
          <div className={classes.con4_heading}>
            Overall Performence : <span>Sales</span>
          </div>
          <Areachart2 />
        </div>
    </div>
  )
}

export default OSD_Charts
