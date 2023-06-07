import classes from './MainTable.module.css'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import HoverableTableActions from '../HoverableTableActions/HoverableTableActions'

import DownloadIcon from '../../assets/download.png';
const MainTable = (props) => {

    // const [rows, setRows] = useState(5)
    const location = useLocation();
    const tableHeadings = props.headings
    const tableData = props.data
    const newData = tableData

    const clickHandler = (element) => {
        props.func([true, element])
    }
    const restructureLoan = (month, e) => {
        props.restructureLoan(month)

    }
    // Switch for data uploading
    const runSwitch = (element) => {
        switch (element) {
            case 'name':
                return classes.name_feild
                break;
            case 'attendence':
                return classes.attendence
                break;
            case 'load_req':
                return classes.loan_req
                break;

            default:
                return ''
                break;
        }
    }

    // Set Attendence Table Setting
    const setAttendence = (num) => {
        switch (num) {
            case 1:
                return <div className={classes.present}>Present</div>
            case 2:
                return <div className={classes.absent}>Absent</div>
            case 3:
                return <div className={classes.pending}>Pending</div>

            default:
        }
    }
    const setStatus = (num) => {
        switch (num) {
            case "Approved":
                return <div className={classes.present}>{num}</div>
            case "Rejected":
                return <div className={classes.absent}>{num}</div>
            case "Pending":
                return <div className={classes.pending}>{num}</div>
            case "Present":
                return <div className={classes.present}>{num}</div>
            case "Absent":
                return <div className={classes.absent}>{num}</div>
            case "On Leave":
                return <div className={classes.absent}>{num}</div>
            case "Paid":
                return <div className={classes.present}>{num}</div>
                case "Unpaid":
                    return <div className={classes.absent}>{num}</div>
            default:
        }
    }

    const setCorrection = (num) => {
        const ret = num === null ? 'Done' : ''
        return ret
    }

    const setLoanReq = num => {
        return <div className={classes.loan_req}>{num}</div>
    }

    const setFine = num => {
        switch (num) {
            case null:
                return <div className={classes.present}>NULL</div>

            default:
                return <div className={classes.fine_req}>{num}</div>
        }
    }

    const setApproval = num => {
        switch (num) {
            case null:
                return <div className={classes.fine_req}>Rejected</div>

            default:
                return <div className={classes.present}>Approved</div>
        }
    }
    const downloadLeaveData = (data, e) => {
        e.preventDefault()
        fetch(data)
            .then(response => {

                response.blob().then(blob => {
                    let url = window.URL.createObjectURL(blob);
                    let a = document.createElement('a');
                    a.href = url;
                    a.download = 'download'
                    a.click();

                });

            });
    }

    // Table best divider for classes and all 
    const printData = (val, key, img) => {
        switch (key) {
            case 'name':
                return <>
                    {/* <img src={img} alt="" /> */}
                    {val}</>
            case 'tenure':
                return <>
                    {/* <img src={img} alt="" /> */}
                    {val} months</>
            case 'date':
                return <>{val?.split("T")[0].split("-").reverse().join("-")}</>
            case 'status':
                return setStatus(val)
            case 'correction':
                return val === null ? setCorrection(val) : val
            case 'loan_req':
                return setLoanReq(val)
            case 'advance':
                return setLoanReq(val)
            case 'fine':
                return setFine(val)
            case 'approval':
                return setApproval(val)
            case 'document':
                console.log(val)
                return <a href="#" onClick={(event) => downloadLeaveData("http://localhost:9000/" + val, event)} >Download file</a>
            default:
                return val
        }
    }

    return (
        <div className={classes.table_container}>

            <div style={{ width: props.wd }} className={` ${props.height ? classes.height : ''}`}>
                <table className={`${classes.table} ${props.wd ? classes.spl_t : ''}`}>
                    <thead>
                        <tr>
                            {tableHeadings.map((element, index) => (
                                <th key={index}>{element.heading}</th>
                            ))}
                            {props.Btn || props.Lnk || props.Lnk2 || props.Lnk4 === true || props.Lnk06 || props.lnk05 || props.Lnk04 || props.Lnk3 ?
                                <th style={props.Btn ? { textAlign: "center" } : {}}>Action</th>
                                : null}
                        </tr>
                    </thead>
                    <tbody>


                        {tableData.length > 0 && tableData.map((val, index) => (
                            <tr key={index}>
                                {props.keys.map((element, index) => (
                                    <td key={index}
                                        className={runSwitch(element)}>
                                        {printData(val[element], element, val['image'])}
                                    </td>
                                ))}
                                {
                                    val['restructure'] === true && val['amount'] !== 0 && index !== newData.length - 1 ? <td key={index}> <a href="#" style={{color:'var(--bg)'}} onClick={(e) => restructureLoan(val['month'], e)}>Restructure</a> </td> : null
                                }
                                {
                                    props.Btn === true ? <td><button onClick={() => { clickHandler(val) }}>Out</button></td> : null
                                }
                                {
                                    props.Lnk06 === true ?
                                        <td>
                                            <HoverableTableActions Element={val} onClickFunc={clickHandler} link1={props.link1 !== false ? props.link1 + "/" + val.attendance_id + "/" + val.employee_id : false} Btn={props.App_Btn} link2={props.link2 + "/" + val.id} t1={props.t1} t2={props.t2} t3={props.t3} link4={props.link4} t4={props.t4} />
                                        </td> : null
                                }
                                {
                                    props.Lnk05 === true ?
                                        <td>
                                            <HoverableTableActions Element={val} onClickFunc={clickHandler} Btn={props.App_Btn} link1={props.link1 + "/" + val.id + "/" + val.employee_id} link2={props.link2} t1={props.t1} t2={props.t2} t3={props.t3} link4={props.link4} t4={props.t4} />
                                        </td> : null
                                }
                                {
                                    props.Lnk === true ?
                                        <td>
                                            <HoverableTableActions Element={val} onClickFunc={clickHandler} link1={props.link1 !== false ? val.status === 'Pending'||location.pathname==='/salary_details' ? props.link1 + "/" + val.attendance_id + "/" + val.employee_id : false : false} Btn={props.App_Btn} link2={props.link2 !== false ? props.link2 + "/" + val.employee_id : false} t1={props.t1} t2={props.t2} t3={props.t3} link4={props.link4 !== false ? props.link4 + "/" + val.id : false} t4={props.t4} />
                                        </td> : null
                                }
                               
                                {
                                    props.Lnk1 === true ?
                                        <td>
                                            <HoverableTableActions Element={val} onClickFunc={clickHandler} link1={props.link1 !== false ? props.link1 + "/" + val.attendance_id + "/" + val.employee_id : false} Btn={props.App_Btn} link2={props.link2 !== false ? props.link2 + "/" + val.id + "/" + val.employee_id : false} t1={props.t1} t2={props.t2} t3={props.t3} link4={props.link4} t4={props.t4} />
                                        </td> : null
                                }
                                {
                                    props.Lnk2 === true ?
                                        <td>
                                            <Link to={props.link1 + "/" + val.id} className={classes.Lnk2}>View</Link>
                                        </td> : null
                                }
                                {
                                    props.Lnk3 === true ?
                                        <td>
                                            <HoverableTableActions Element={val} onClickFunc={clickHandler} link1={val.status === 'Pending' ? props.link1 + "/" + val.id + "/" + val.employee_id : false} Btn={props.App_Btn} link2={props.link2 ? props.link2 + "/" + val.id + "/" + val.employee_id : props.link2} t1={props.t1} t2={props.t2} t3={props.t3} link4={props.link4} t4={props.t4} />
                                        </td> : null
                                }
                                {
                                    props.Lnk04 === true ?
                                        <td>
                                            <HoverableTableActions Element={val} onClickFunc={clickHandler} link1={false} Btn={props.App_Btn} link2={false} t1={props.t1} t2={props.t2} t3={props.t3} link4={true} t4={props.t4} />
                                        </td> : null
                                }
                                {
                                    props.Lnk4 === true ?
                                        <td>
                                            <HoverableTableActions Element={val} onClickFunc={clickHandler} Btn={props.App_Btn} t3={props.t3} link2={props.link2} link1={props.link1} />
                                        </td>
                                        : null
                                }

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* <input
                id='entries'
                className={props.Inp === false ? classes.none : classes.table_input}
                type="number"
                value={rows}
                min={3}
                max={tableData.length}
                onChange={(e) => { setRows(e.target.value) }} />

            <label className={classes.input_entries} htmlFor="entries">Entries</label> */}
        </div>
    )
}

export default MainTable