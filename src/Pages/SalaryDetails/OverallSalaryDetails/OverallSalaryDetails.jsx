import React, { useState } from 'react'
import Heading from '../../../Components/Heading/Heading'
import classes from './OverallSalaryDetails.module.css'
import ExtraDetailsDiv from '../../../Components/ExtraDetails/ExtraDetailsDiv'
import DropDownFilter from '../../../Components/DropDownFilter/DropDownFilter'
import MainTable from '../../../Components/MainTable/MainTable'
import data from './data'
import Vec from '../../../assets/vector9.png'
import Calendar from 'react-calendar'
import './calender.css'
import DetailsDivContainer from '../../../UI/DetailsDivContainers/DetailsDivContainer'
import CalendarBottomDiv from '../../../Components/CalendqrBottomDiv/CalendarBottomDiv'
import GroupTable from '../../../Components/GroupTable/GroupTable'
import BottomButtonContainer from '../../../Components/BottomButtonContainer/BottomButtonContainer'
import FullCalendar from '../../../Components/FullCalender/FullCal'
import FullCal from '../../../Components/FullCalender/FullCal'
import OSD_Charts from './OSD_Charts'

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


const OverallSalaryDetails = () => {

  const employee_data = [{
    "title": "Electrician",
    "value": "Royall"
  }, {
    "title": "Construction Manager",
    "value": "Sayer"
  }, {
    "title": "Electrician",
    "value": "Aliza"
  }, {
    "title": "Engineer",
    "value": "Jemie"
  }, {
    "title": "Subcontractor",
    "value": "Jacklin"
  }, {
    "title": "Subcontractor",
    "value": "Garold"
  }, {
    "title": "Engineer",
    "value": "Dorry"
  }, {
    "title": "Construction Expeditor",
    "value": "Matias"
  }, {
    "title": "Subcontractor",
    "value": "Genevieve"
  }, {
    "title": "Construction Foreman",
    "value": "Catlin"
  }]

  const tableHeadings = [
    { heading: 'Date' },
    { heading: 'Day' },
    { heading: 'Time' },
    { heading: 'No. Of Working' },
    { heading: 'Commission' },
    { heading: 'Total Fines' }
  ]

  const tableKeys = ['date', 'day', 'time', 'no_of_working', 'commission', 'total_fine']

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
      <Heading heading={'Salary Details'} />
      <DetailsDivContainer data={employee_data} />
      <br /><br />
      <div className={classes.calender_container}>

        <div className={classes.actual_calender}>
          <FullCal event={[
            { title: 'event 1', date: '2023-03-01' },
            { title: 'event 2', date: '2023-03-02' }
          ]} />
        </div>
      </div>
      <CalendarBottomDiv data={calData} />
      <OSD_Charts />
      <br />
      <h3 className='uni_heading'>Salary History</h3>
      <DropDownFilter title1={'Floor'} title2={'Store'} />
      <MainTable headings={tableHeadings} keys={tableKeys} data={data} height={true} />
      <button className={classes.salary_history_btn}>Salary Summary</button>
      <br />
      <GroupTable />
      <br /> <br />
      <BottomButtonContainer approve={'Pay Salary'} cancel={'Notify Employee'} />

    </React.Fragment>
  )
}

export default OverallSalaryDetails