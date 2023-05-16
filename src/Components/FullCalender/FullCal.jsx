import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import './FullCal.css'
import classes from './FullCal.module.css'

const FullCal = (props) => {

  const renderTileColor = (event) => {
    switch (event.backgroundColor) {
      case 'Present':
        return classes.tile_color_present 
      case 'Absent':
        return classes.tile_color_absent
      case 'Pending':
        return classes.tile_color_pending
      default:
        return 'none'
    }
  }

  const showAlert = (title) => {
    alert(title)
  }

  function renderEventContent(eventInfo) {
    return (
      <div className={`eventdiv ${classes.tile}`} onMouseOver={()=>{showAlert(eventInfo.event.title)}}>
        <div className={`${classes.tile_color_div} ${renderTileColor(eventInfo)}`}></div>
        <span>{eventInfo.event.title}</span>
      </div>
    )
  }  

  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      events={props.event}
      eventContent={renderEventContent}
    />
  )
}

export default FullCal