import React from 'react'
import BottomButtonContainer from '../../../Components/BottomButtonContainer/BottomButtonContainer'
import ExtraDetails from '../../../Components/ExtraDetails/ExtraDetails'
import Heading from '../../../Components/Heading/Heading'
import LabeledInput from '../../../Components/LabeledInput/LabeledInput'
import DetailsDivContainer from '../../../UI/DetailsDivContainers/DetailsDivContainer'
import classes from './AddExpense.module.css'
import ExpenseSearchBar from '../../../Components/ExpenseSearchBar/ExpenseSearchBar'

const AddExpense = () => {

    const employee_data = [{
        "title": "Electrician",
        "value": "Royall"
    }, {
        "title": "Construction Manager",
        "value": "Sayer"
    }, {
        "title": "Electrician",
        "value": "Aliza"
    }, {
        "title": "Engineer",
        "value": "Jemie"
    }, {
        "title": "Subcontractor",
        "value": "Jacklin"
    }, {
        "title": "Subcontractor",
        "value": "Garold"
    }, {
        "title": "Engineer",
        "value": "Dorry"
    }, {
        "title": "Construction Expeditor",
        "value": "Matias"
    }, {
        "title": "Subcontractor",
        "value": "Genevieve"
    }, {
        "title": "Construction Foreman",
        "value": "Catlin"
    }]



    return (
        <React.Fragment>
            <Heading heading={'Add Expense'} />
            <ExpenseSearchBar />
            <DetailsDivContainer data={employee_data} />
            <div className='uni_container'>
                <div className={classes.inner_container}>
                    <LabeledInput id={'category'} ph={'Category'} title={'Category'} />
                    <LabeledInput id={'time'} ph={'Time'} title={'Time'} />
                    <LabeledInput mr={true} id={'date'} ph={'Date'} title={'Date'} />
                </div>
                <textarea type="text" className={classes.add_expense_textarea} />
            </div>
            <BottomButtonContainer cancel={'Cancel'} approve={'Add Expense'}  />
        </React.Fragment>
    )
}

export default AddExpense