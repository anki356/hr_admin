import classes from './MainTable.module.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import HoverableTableActions from '../HoverableTableActions/HoverableTableActions'

const MainTable = (props) => {

    const [rows, setRows] = useState(5)

    const tableHeadings = props.headings
    const tableData = props.data
    const newData = tableData

    const clickHandler = (element) => {
        props.func([true, element])
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


    // Table best divider for classes and all 
    const printData = (val, key, img) => {
        switch (key) {
            case 'name':
                return <><img src={img} alt="" />{val}</>

            case 'attendence':
                return setAttendence(val)
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
            default:
                return val
        }
    }

    return (
        <div className={classes.table_container}>

            <div style={{width:props.wd}} className={` ${props.height ? classes.height : ''}`}>
                <table className={`${classes.table} ${props.wd?classes.spl_t:''}`}>
                    <thead>
                        <tr>
                            {tableHeadings.map((element, index) => (
                                <th key={index}>{element.heading}</th>
                            ))}
                            {props.Btn || props.Lnk || props.Lnk2 === true ?
                                <th style={props.Btn ? { textAlign: "center" } : {}}>Action</th>
                                : null}
                        </tr>
                    </thead>
                    <tbody>


                        {tableData.map((val, index) => (
                            <tr key={index}>
                                {props.keys.map((element, index) => (
                                    <td key={index}
                                        className={runSwitch(element)}>
                                        {printData(val[element], element, val['image'])}
                                    </td>
                                ))}
                                {
                                    props.Btn === true ? <td><button onClick={() => { clickHandler(val) }}>Out</button></td> : null
                                }
                                {
                                    props.Lnk === true ?
                                        <td>
                                            <HoverableTableActions Element={val} onClickFunc={clickHandler} link1={props.link1+"/"+val.attendance_id+"/"+val.employee_id} Btn={props.App_Btn} link2={props.link2} t1={props.t1} t2={props.t2} t3={props.t3} link4={props.link4} t4={props.t4} />
                                        </td> : null
                                }
                                {
                                    props.Lnk2 === true ?
                                        <td>
                                            <Link to={props.link1} className={classes.Lnk2}>View</Link>
                                        </td> : null
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