import classes from './AllModals.module.css'
import Modal from '../Modal/MOdal'
import { useState, useEffect } from 'react'
import Close from '../../assets/close.png'

const AddFineModal = (props) => {

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
                <h3>Fine Slip</h3>
                <div onClick={closeHandler}><img src={Close} alt="" /></div>
            </div>
            <div className={classes.modal_data}>
                <div className={classes.modal_data_div}>Name <span>{props.Obj.name}</span></div>
                <div className={classes.modal_data_div}>Floor <span>{props.Obj.floor}</span></div>
                <div className={classes.modal_data_div}>Floor Incharge<span>Anil D Mishra</span></div>
                <div className={classes.modal_data_div}>Fine<span><input type="text" value={props.Obj.fine === null?0:props.Obj.fine} readOnly/></span></div>
                <div className={classes.modal_data_div}>Message<span><textarea placeholder='Type Here...'></textarea></span></div>
            </div>
            <div className={classes.modal_btn_container}>
                <button className={classes.modal_btn1} onClick={closeHandler}>Cancel</button>
                <button className={classes.modal_btn2}>Send Approvals To Admin</button>
            </div>
        </Modal>
    )
}

export default AddFineModal