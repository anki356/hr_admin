import classes from './AddBonus.module.css'
import React, { useState, useEffect } from 'react'
import InpFile from '../../../Components/InpFile/InpFile'
import Cookies from 'universal-cookie'
import axios from 'axios'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'

import BottomButtonContainer from '../../../Components/BottomButtonContainer/BottomButtonContainer'
import LabeledInput from '../../../Components/LabeledInput/LabeledInput'
import DetailsDivContainer from '../../../UI/DetailsDivContainers/DetailsDivContainer'
import ExpenseSearchBar from '../../../Components/ExpenseSearchBar/ExpenseSearchBar'
import Heading from '../../../Components/Heading/Heading'
const AddBonus = (props) => {
    const url = "http://localhost:9000/"
    const cookies = new Cookies();
    const token = cookies.get('token')


    const [searchtext, setSearchText] = useState('')
    const [bonus, setBonus] = useState(null)
    const [document, setDocument] = useState(null)
    const [fileLabel, setFileLabel] = useState('')
    const [noData, setNoData] = useState(false)
    const [employee_id, setEmployeeId] = useState(null)
    const [employee_data, setEmployeeData] = useState([])
    const navigate = useNavigate()
    const cancel = () => {

        navigate(-1)
    }
    const searchHandler = (data) => {

        const headers = { "Authorization": "Bearer " + token }
        axios.get(url + "api/getEmployeeDetails?employee_query=" + data, { headers }).then((response) => {
            if (response.data.employeesResult.length > 0) {

                setEmployeeId(response.data.employeesResult[0].id)
                setEmployeeData([
                    {
                        title: "Name",
                        value: response.data.employeesResult[0].name
                    },
                    {
                        title: "Employee ID",
                        value: response.data.employeesResult[0].empID
                    },
                    {
                        title: 'SuperVisor Name',
                        value: response.data.headEmployeesResult[0]?.head_employee_name
                    }, {
                        title: 'Designation',
                        value: response.data.employeesResult[0].role_name
                    }, , {
                        title: 'Department',
                        value: response.data.employeesResult[0].department_name
                    }, {
                        title: 'Floor Name',
                        value: response.data.employeesResult[0].floor_name

                    }, {
                        title: 'Gender',
                        value: response.data.employeesResult[0].gender

                    }, {
                        title: 'location name',
                        value: response.data.employeesResult[0].location_name
                    }, {
                        title: 'location Department',
                        value: response.data.employeesResult[0].location_department_name
                    }
                ])
                setNoData(false)
            }
            else {
                setNoData(true)
            }
        })
    }
    const newLabel = (data) => {
        setFileLabel(data.target.value)
    }

    const newFile = (data) => {
        console.log('data in side modal', data[0])
        setDocument(data)
    }

    const recallHandler = () => {
        setRecallHead((prevState) => {
            return !prevState
        })
    }


    function add(e) {
        e.preventDefault();

        // console.log(document);

        const headers = { "Authorization": "Bearer " + token, 'Content-Type': 'multipart/form-data' }
        axios.post(url + "api/addBonus", {
            employee_id: employee_id,
            amount: bonus,
            download: document
        }, { headers }).then((response) => {
            if (response) {
                setBonus('')
                setDocument('')

                setFileLabel('')
                cancel()
            }
        })
    }



    return (
        <React.Fragment>
            <Heading heading={'Add Bonus'} /><ExpenseSearchBar func={searchHandler} />
            {searchtext === '' && noData ? '' : noData ? <h6>NO User Found</h6> : <DetailsDivContainer data={employee_data} />}
            <form className={classes.form} onSubmit={add}>
                <div className={classes.form_input_div}  >
                   <label htmlFor='emp_bonus'>Bonus Amount</label>
                        <input type="number" id='emp_bonus' required={true} value={bonus} onChange={(e) => setBonus(e.target.value)} />
                    </div>
                <div className={classes.file_con}>
                    <h3 className={classes.file_con_label}>Attach File</h3>
                    <InpFile label={fileLabel} labelFunc={setFileLabel} required={true} fileHandler={newFile} />
                </div>
                <div className={classes.btn_container}>

                    <button className={classes.cancel} onClick={(event) => cancel(event)}>Cancel</button>
                    <button type={'submit'} className={classes.accept} >Add Bonus</button>
                </div>


            </form>


        </React.Fragment>

    )
}

export default AddBonus