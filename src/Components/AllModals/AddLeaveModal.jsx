import classes from './AllModals.module.css'
import Modal from '../Modal/MOdal'
import { useState, useEffect } from 'react'
import Close from '../../assets/close.png'
import InpFile from '../InpFile/InpFile'

const AddLeaveModal = (props) => {

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
                <h3>Add Leave</h3>
                <div onClick={closeHandler}><img src={Close} alt="" /></div>
            </div>
            <div className={classes.modal_data}>
                <div className={classes.modal_data_div}>Name <span>{props.Obj.employee_name}</span></div>
                <div className={classes.modal_data_div}>Floor <span>{props.Obj.floor_name}</span></div>
                <div className={classes.modal_data_div}>Floor Incharge<span>Anil D Mishra</span></div>
                <div className={classes.modal_data_div}>Loan <span><input type="date" /></span></div>
                <div className={classes.modal_data_div}>Approval By Head<span>
                <select className={classes.modal_select} >
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                </select></span></div>
                <div className={classes.modal_data_div}>Attach File<span><InpFile /></span></div>
                <div className={classes.modal_data_div}>Recall Head<span><input type="checkbox" /></span></div>
            </div>
            <div className={classes.modal_btn_container}>
                <button className={classes.modal_btn1} onClick={closeHandler}>Cancel</button>
                <button className={classes.modal_btn2}>Approve Leave</button>
            </div>
        </Modal>
    )
}

export default AddLeaveModal