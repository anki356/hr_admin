import React, { useState } from 'react'
import classes from './NotificationBox.module.css'
import img from '../../../assets/notification.png'
const NotificationBox = (props) => {

    const [modalVisibility, setModalVisibility] = useState(false)

    return (

        <React.Fragment>
            <div style={props.visibility === true ? { display: 'block' } : { display: 'none' }} onClick={e => props.overlayFunc(!props.visibility)} className={classes.overlay}></div>
            <div style={props.visibility === true ? { display: 'block' } : { display: 'none' }} className={classes.notification_box}>
                <div className={classes.notification_div}>
                    <img src={img} alt="notification icon" />
                    <h3>Don’t Forget To Grade Your Employee Every Week</h3>
                    <button onClick={()=>setModalVisibility(!modalVisibility)}>View</button>
                </div>
            </div>

            <div style={modalVisibility === true ? { display: 'block' } : { display: 'none' }} className={classes.notification_modal}>
                <h3>Don’t Forget To Grade Your Employee Every Week</h3>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, eligendi sunt. Expedita architecto quos consequatur dolorum mollitia aliquid aperiam sequi maxime placeat quasi libero laborum illum iusto ab, eum natus rem cumque numquam dicta totam.
                </p>
                <button onClick={()=>setModalVisibility(!modalVisibility)} >Okay</button>
            </div>
        </React.Fragment>
    )
}

export default NotificationBox
