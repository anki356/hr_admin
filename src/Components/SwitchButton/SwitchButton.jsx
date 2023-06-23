import React, { useState } from 'react'
import classes from "./SwitchButton.module.css";

const SwitchButton = (props) => {

    const [isTrue, setIsTrue] = useState(false)

    const toggleSwitch = () => {
        //Setter Function ( use your set function here ) 
        // props.func(!isTrue)

        setIsTrue(!isTrue)
    }

    return (
        <div className={classes.button_container}>
            <div className={`${classes.button} ${isTrue === true ? classes.button_bg : ''}`} onClick={toggleSwitch} >
                <div className={`${classes.button_handler} ${isTrue === true ? classes.button_handler_true : ''}`}></div>
            </div>
            <h5 onClick={toggleSwitch}>{props.label}</h5>
        </div>
    )
}

export default SwitchButton
