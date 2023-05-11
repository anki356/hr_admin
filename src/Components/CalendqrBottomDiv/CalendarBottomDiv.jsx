import React from 'react'
import classes from './CalendarBottomDiv.module.css'


const CalDiv = (props) => {
    return <div className={classes.caldiv}>
        <p>{props.p}</p>
        <h1>{props.h1}</h1>
        <div style={{ background: props.bg }}></div>
    </div>
}


const CalendarBottomDiv = (props) => {
    return (
        <div className={classes.container}>
            {props.data.map((element, index) => (
                <CalDiv p={element.p} h1={element.h1} bg={element.bg} />
            ))}
        </div>
    )
}

export default CalendarBottomDiv
