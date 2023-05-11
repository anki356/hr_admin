import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import './FullCal.css'
import classes from './FullCal.module.css'

const FullCal = (props) => {

  function renderEventContent(eventInfo) {
    return (
      <div className={`eventdiv ${classes.tile}`}>
        <div className={classes.tile_color_div}></div>
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