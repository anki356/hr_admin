import React from 'react'
import classes from './AddLoan.module.css'
import Heading from '../../../Components/Heading/Heading'
import DetailsDivContainer from '../../../UI/DetailsDivContainers/DetailsDivContainer'
import LabeledInput from '../../../Components/LabeledInput/LabeledInput'
import InpFile from '../../../Components/InpFile/InpFile'

const AddLoan = () => {

  const employee_data = [{
        "title": "Id",
        "value": "Royall"
    }, {
        "title": "Name",
        "value": "Sayer"
    }, {
        "title": "Floor",
        "value": "Aliza"
    }, {
        "title": "Head Employee",
        "value": "Jemie"
    }]

  return (
   <React.Fragment>
    <Heading heading={'Add Loan'} />
    <DetailsDivContainer data={employee_data} />
    <form className={classes.form}>
        <LabeledInput id={'loan'} title={'Loan'}img={false} />
        <LabeledInput id={'loan_tenure'} title={'Loan Tenure'}img={false} />
        <div className={classes.form_input_div}>
            <label htmlFor="abh">Approve By Head</label>
            <select id='abh'>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
            </select>
        </div>
        <div className={classes.form_input_div}>
            <label htmlFor="month">Select Month</label>
            <select id='month'>
            <option selected value='1'>Janaury</option>
                    <option value='2'>February</option>
                    <option value='3'>March</option>
                    <option value='4'>April</option>
                    <option value='5'>May</option>
                    <option value='6'>June</option>
                    <option value='7'>July</option>
                    <option value='8'>August</option>
                    <option value='9'>September</option>
                    <option value='10'>October</option>
                    <option value='11'>November</option>
                    <option value='12'>December</option>
            </select>
        </div>
        <div className={classes.file_con}>
            <h3 className={classes.file_con_label}>Attach File</h3>
        <InpFile />
        </div>

    </form>
   </React.Fragment>
  )
}

export default AddLoan