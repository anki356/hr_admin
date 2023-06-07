import React, { useEffect, useState } from 'react'
import classes from './OSD_Charts.module.css'
import Areachart2 from '../../Report/Charts/Areachart2/Areachart2'
import Donutchart from '../../Report/Charts/Donutchart/Donutchart'

import useHttp from '../../../Hooks/use-http'
import Cookies from 'universal-cookie'
import moment from 'moment'
import axios from 'axios'

const OSD_Charts = (props) => {
  const url = "http://localhost:9000/"
  var cookies=new Cookies()
  var token=cookies.get('token')
  const { sendRequest: fetchAttendance } = useHttp()
  const [month,setMonth]=useState(new Date().getMonth()+1)
  const [series,setSeries]=useState(0)
  useEffect(()=>{
    const listWorkingdays = (attendance) => {
      setSeries(attendance.length)
    }
    let year=new Date().getFullYear()
    let from_date = moment([year,month-1])
    let end_date = moment([year,month-1]).add(1,'M')
    fetchAttendance({ url: url + "api/getAttendance?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + end_date.format("YYYY-MM-DD") + "&employee_id=" + props.emp_id + "&status='Present'" }, listWorkingdays)
   
  },[])
  useEffect(()=>{
    let year=new Date().getFullYear()
    let from_date = moment([year,month-1,])
    let no_of_days=from_date.daysInMonth()
    const listWorkingdays = (attendance) => {
      console.log(attendance.length)
      setSeries(attendance.length/no_of_days)
    }
    
    
   
    let end_date = moment([year,month-1,]).add(1,'M')
    fetchAttendance({ url: url + "api/getAttendance?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + end_date.format("YYYY-MM-DD") + "&employee_id=" + props.emp_id + "&status='Present'" }, listWorkingdays)
   
  },[month])
  console.log(series)
  return (
    <div className={classes.container}>
      <div className={classes.container3}>
          <div className={classes.circle_div1}>
            % of Attendence
            <select id='gMonth1' onChange={(e)=>setMonth(e.target.value)}>
              <option value=''>--Select Month--</option>
              <option selected={month===1} value='1'>Janaury</option>
              <option selected={month===2} value='2'>February</option>
              <option selected={month===3}value='3'>March</option>
              <option selected={month===4} value='4'>April</option>
              <option selected={month===5} value='5'>May</option>
              <option selected={month===6} value='6'>June</option>
              <option selected={month===7} value='7'>July</option>
              <option selected={month===8} value='8'>August</option>
              <option selected={month===9} value='9'>September</option>
              <option selected={month===10} value='10'>October</option>
              <option selected={month===11} value='11'>November</option>
              <option  selected={month===12} value='12'>December</option>
            </select>
          </div>
          <div className={classes.circle_div2}><Donutchart series={Math.round((series*100).toFixed(2))}/></div>
          <div className={classes.circle_div3}>
            <div className={classes.circle_div3_div}>
              <span>{series!==undefined?(series*100).toFixed(2):0}%</span>
              <div className={`${classes.circle_div3_inner_div}`}>
                <div className={`${classes.colored}`}></div> Present
              </div>
            </div>
            <div className={classes.circle_div3_div}>
              <span>{series!=undefined?(100-(series*100)).toFixed(2):100}%</span>
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
