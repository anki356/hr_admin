import classes from './AllModals.module.css'
import Modal from '../Modal/MOdal'
import { useState, useEffect } from 'react'
import Close from '../../assets/close.png'
import InpFile from '../InpFile/InpFile'

const AddLoanModal = (props) => {

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
                <h3>Add Loan</h3>
                <div onClick={closeHandler}><img src={Close} alt="" /></div>
            </div>
            <div className={classes.modal_data}>
                <div className={classes.modal_data_div}>Name <span>{props.Obj.name}</span></div>
                <div className={classes.modal_data_div}>Id <span>{props.Obj.id}</span></div>
                <div className={classes.modal_data_div}>Floor <span>{props.Obj.floor}</span></div>
                <div className={classes.modal_data_div}>Floor Incharge<span>Anil D Mishra</span></div>
                <div className={classes.modal_data_div}>Loan <span><input type="text" /></span></div>
                <div className={classes.modal_data_div}>Loan Tenure <span><input type="text" /></span></div>
                <div className={classes.modal_data_div}>Approval By Head<span><input type="text" /></span></div>
                <div className={classes.modal_data_div}>Attach File<span><InpFile /></span></div>
                <div className={classes.modal_data_div}>Recall Head<span><input type="checkbox"  /></span></div>
            </div>
            <div className={classes.modal_btn_container}>
                <button className={classes.modal_btn1} onClick={closeHandler}>Cancel</button>
                <button className={classes.modal_btn2}>Approve</button>
            </div>
        </Modal>
    )
}

export default AddLoanModal