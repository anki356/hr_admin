import classes from './AllModals.module.css'
import Modal from '../Modal/MOdal'
import { useState, useEffect } from 'react'
import Close from '../../assets/close.png'

const InterviewModal = (props) => {

    const [modal, setModal] = useState(false)

    const closeHandler = () => {
        setModal(false)
        props.setval(false)
    }

    useEffect(() => {
        setModal(props.value)
        return () => { }
    }, [props.value, props.Obj])



    return (
        <Modal wd={'470px'} isModal={modal} >
            <div className={classes.modal_header}>
                <h3>Interview Details</h3>
                <div onClick={closeHandler}><img src={Close} alt="" /></div>
            </div>
            <div className={classes.modal_data}>
                <div className={classes.modal_data_div}>Name <span>Puneet Shrivastav</span></div>
                <div className={classes.modal_data_div}>Hired By <span>Abhishek Sir</span></div>
                <div className={classes.modal_data_div}>Department <span>Kids Section</span></div>
                <div className={classes.modal_data_div}>Father Name <span>Rajender Shrivastav</span></div>
                <div className={classes.modal_data_div}>Interview Date <span>13/05/2023</span></div>
                <div className={classes.modal_data_div}>Experience <span>1.3 years</span></div>
                <div className={classes.modal_data_div}>Designation <span>Salesman</span></div>
                <div className={classes.modal_data_div}>Salary Expectation <span>25,000</span></div>
            </div>
            <div className={`${classes.modal_btn_container} ${classes.modal_btn_container_spl}`}>
                <button className={classes.modal_btn1} onClick={closeHandler}>Make Payment</button>
                <button className={classes.modal_btn1} onClick={closeHandler}>Reject</button>
                <button className={classes.modal_btn2}>Make Trail</button>
            </div>
        </Modal>
    )
}

export default InterviewModal