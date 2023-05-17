import React, { useState } from 'react'
import BottomButtonContainer from '../../../Components/BottomButtonContainer/BottomButtonContainer'
import ExtraDetails from '../../../Components/ExtraDetails/ExtraDetails'
import Heading from '../../../Components/Heading/Heading'
import LabeledInput from '../../../Components/LabeledInput/LabeledInput'
import DetailsDivContainer from '../../../UI/DetailsDivContainers/DetailsDivContainer'
import classes from './AddExpense.module.css'
import ExpenseSearchBar from '../../../Components/ExpenseSearchBar/ExpenseSearchBar'
import SelectTag from '../../../Components/SelectTag/SelectTag'
import Img from '../../../assets/shop.png'
const AddExpense = () => {

    const [time, setTime] = useState('')
    const [date, setDate] = useState('')
    const [text, setText] = useState('')
    const [searchtext, setSearchText] = useState('')

    const timeHandler = (data) => { console.log('time', data); }
    const dateHandler = (data) => { console.log('date', data); }
    const searchHandler = (data) => { console.log('searchkey', data); setSearchText(data) }

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
            <ExpenseSearchBar func={searchHandler} />
            {searchtext === '' ? '' : <DetailsDivContainer data={employee_data} />}
            <div className='uni_container'>
                <div className={classes.inner_container}>
                    <div className={classes.add_expense_seleecct_container}>
                        <label htmlFor="slt">Category</label>
                        <SelectTag select_id={'slt'} title={'Category'} img={Img} />
                    </div>
                    <LabeledInput func2={timeHandler} id={'time'} ph={'Time'} title={'Time'} img={false} type={'time'} />
                    <LabeledInput func2={dateHandler} mr={true} id={'date'} ph={'Date'} title={'Date'} type={'date'} img={false} />
                </div>
                <textarea type="text" className={classes.add_expense_textarea} />
            </div>
            <BottomButtonContainer cancel={'Cancel'} approve={'Add Expense'} />
        </React.Fragment>
    )
}

export default AddExpense