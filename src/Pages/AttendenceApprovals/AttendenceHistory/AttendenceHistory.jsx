import React, { useState } from 'react'
import Heading from '../../../Components/Heading/Heading'
import classes from './AttendenceHistory.module.css'
import ExtraDetailsDiv from '../../../Components/ExtraDetails/ExtraDetailsDiv'
import DropDownFilter from '../../../Components/DropDownFilter/DropDownFilter'
import MainTable from '../../../Components/MainTable/MainTable'
import data from './data'
import Vec from '../../../assets/vector9.png'
import Calendar from 'react-calendar'
import './calender.css'
import FullCal from '../../../Components/FullCalender/FullCal'
import CalendarBottomDiv from '../../../Components/CalendqrBottomDiv/CalendarBottomDiv'

const Tile = ({ date, view }) => {

  const CurrentDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getUTCFullYear()}`
  switch (date.getDay()) {
    case 0:
      return <div className='tile green_tile'>
        <div className='tile_color_div'></div>
        <span>off</span>
      </div>
    case 6:
      return <div className='tile green_tile'>
        <div className='tile_color_div '></div>
        <span>off</span>
      </div>

    default:
      return <div className='tile'>
        <div className='tile_color_div'></div>
        <span>9hr</span>
      </div>
  }
}


const AttendenceHistory = () => {

  const div_data = [
    {
      title: 'Name',
      value: 'Puneet Shrivastav'
    },
    {
      title: 'Designation',
      value: 'Sales Manager'
    },
    {
      title: 'Floor',
      value: '2nd Floor'
    },
    {
      title: 'SuperVisior',
      value: 'Anil D Mishra'
    },
    {
      title: 'Department',
      value: 'kids'
    },
    {
      title: 'Gender',
      value: 'male'
    }
  ]

  const tableHeadings = [
    { heading: 'Date' },
    { heading: 'Day' },
    { heading: 'Time' },
    { heading: 'No. Of Working' },
    { heading: 'Attendence' },
    { heading: ' ' },
    { heading: ' ' },
  ]

  const tableKeys = ['date', 'day', 'time', 'no_of_working', 'attendence']

  const [month, setMonth] = useState(new Date())
  const [newDate, setNewDate] = useState(new Date())
  const [year, setYear] = useState(new Date().getUTCFullYear())

  const yearHandler = (e) => {
    setYear(e.target.value)
    setNewDate(new Date(e.target.value))
  }

  const monthHandler = (e) => {
    setMonth(e.target.value)
    setNewDate(new Date(e.target.value))
  }

  const calData = [
    {
      p: 'No. Of Working',
      h1: '29',
      bg: '#96503F'
    },
    {
      p: 'Total Late Fine',
      h1: '262',
      bg: '#FFE247'
    },
    {
      p: 'Total Fine',
      h1: '262',
      bg: '#8AFF88'
    },
    {
      p: 'Total Commission',
      h1: '00',
      bg: '#C50303'
    },
    {
      p: 'Total Off',
      h1: '03',
      bg: '#80A4FF'
    },
  ]

  return (
    <React.Fragment>
      <Heading heading={'Attendence History'} />
      <div className={classes.inner_div}>
        {div_data.map((element, index) => (<ExtraDetailsDiv title={element.title} value={element.value} index={index} />))}
      </div>
      <div className={classes.calender_container}>
        <div className={classes.actual_calender}>
        <FullCal />
        </div>
      </div>
      <CalendarBottomDiv data={calData} />
      <br /> 
      <h3 className='uni_heading'>Salary History</h3>
      <DropDownFilter title1={'Select Month'} title2={'Store'} />
      <MainTable headings={tableHeadings} keys={tableKeys} data={data} height={true} />
    </React.Fragment>
  )
}

export default AttendenceHistory