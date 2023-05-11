import classes from './AllModals.module.css'
import Modal from '../Modal/MOdal'
import { useState, useEffect } from 'react'
import Close from '../../assets/close.png'

const DownloadSalarySlip = (props) => {

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
                <h3>Download Salary Slip</h3>
                <div onClick={closeHandler}><img src={Close} alt="" /></div>
            </div>
            <div className={classes.modal_data}>
                <div className={classes.modal_data_div}>Name <span>{props.Obj.name}</span></div>
                <div className={classes.modal_data_div}>Floor <span>{props.Obj.floor}</span></div>
                <div className={classes.modal_data_div}>Floor Incharge<span>Anil D Mishra</span></div>
                <div className={classes.modal_data_div}>Select Month
                    <div className={classes.modal_input_container}>
                        <input type="radio" name="inp" id="inp1" />
                        <label htmlFor="inp1">1 month</label>

                        <input type="radio" name="inp" id="inp2" />
                        <label htmlFor="inp2">3 Months</label>

                        <input type="radio" name="inp" id="inp3" />
                        <label htmlFor="inp3">6 Months</label>

                        <input type="radio" name="inp" id="inp4" />
                        <label htmlFor="inp4">12  Months</label>
                    </div>
                </div>
            </div>
            <div className={classes.modal_btn_container}>
                <button className={classes.modal_btn1} onClick={closeHandler}>Cancel</button>
                <button className={classes.modal_btn2}>Send Approvals To Admin</button>
            </div>
        </Modal>
    )
}

export default DownloadSalarySlip