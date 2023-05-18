import classes from './AllModals.module.css'
import Modal from '../Modal/MOdal'
import { useState, useEffect } from 'react'
import Close from '../../assets/close.png'
import InpFile from '../InpFile/InpFile'
import Cookies from 'universal-cookie'
import axios from 'axios'
const AddLeaveModal = (props) => {
    const url="http://localhost:9000/"
    const cookies = new Cookies();
    const token = cookies.get('token')
    const [modal, setModal] = useState(false)
    const [from_date, setFromDate] = useState(null)
    const [to_date, setToDate] = useState(null)
    const [approval_head, setApprovalHead] = useState(null)
    const [recall_head, setRecallHead] = useState(false)
    const [document, setDocument] = useState(null)

const [SuperVisor, setSuperVisor]=useState(null)
    const closeHandler = () => {
        setModal(false)
        props.setval(false)
    }

    useEffect(() => {
        
        setModal(props.value)
        return () => { }
    }, [ props.Obj])

    useEffect(() => {
        const headers={"Authorization":"Bearer "+token}
        axios.get(url+"api/getEmployeeDetails?id="+props.Obj?.employee_id,{headers}).then((response)=>{
            setSuperVisor(response.data.headEmployeesResult[0]?.head_employee_name)
            })
        
    }, [ props.Obj])
function approveHandler(){
    const headers={"Authorization":"Bearer "+token}
        axios.post(url+"api/addLeave",{
employee_id:props.Obj.employee_id,
from_date:from_date,
to_date:to_date,
download:document,
recall_head:recall_head,
head_approval:approval_head==='Yes'?1:0

       },{headers})
}

    return (
        <Modal wd={'470px'} isModal={modal} >
            <div className={classes.modal_header}>
                <h3>Add Leave</h3>
                <div onClick={closeHandler}><img src={Close} alt="" /></div>
            </div>
            <div className={classes.modal_data}>
                <div className={classes.modal_data_div}>Name <span>{props.Obj.employee_name}</span></div>
                <div className={classes.modal_data_div}>Floor <span>{props.Obj.floor_name}</span></div>
                <div className={classes.modal_data_div}>Floor Incharge<span>{SuperVisor}</span></div>
                <div className={classes.modal_data_div}>Leave from <span><input value={from_date} placeholder="DD/MM/YYYY" onInput={(e)=>setFromDate(e.target.value)} type="date" /></span></div>
                <div className={classes.modal_data_div}>Leave to <span><input type="date" placeholder="DD/MM/YYYY" value={to_date} onInput={(e)=>setToDate(e.target.value)} /></span></div>
                <div className={classes.modal_data_div}>Approval By Head<span><input value={approval_head} onInput={(e)=>setApprovalHead(e.target.value)} type="text" /></span></div>
                <div className={classes.modal_data_div}>Attach File<span><InpFile  changeFile={(data)=>setDocument(data)} /></span></div>
                <div className={classes.modal_data_div} value={recall_head} onChecked={(e)=>setRecallHead(e.target.value)}>Recall Head<span><input type="checkbox"  /></span></div>
            </div>
            <div className={classes.modal_btn_container}>
                <button className={classes.modal_btn1} onClick={closeHandler}>Cancel</button>
                <button className={classes.modal_btn2} onClick={approveHandler}>Approve Leave</button>
            </div>
        </Modal>
    )
}

export default AddLeaveModal