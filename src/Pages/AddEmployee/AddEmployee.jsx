import React, { useState } from 'react'
import Heading from '../../Components/Heading/Heading'
import StepBar from '../../Components/StepBar/StepBar'
import AddEmployee_form1 from './AddEmployee_form1'
import AddEmployee_form2 from './AddEmployee_form2'
import AddEmployee_form3 from './AddEmployee_form3'
import classes from './AddEmployee.module.css'
import BottomButtonContainer from '../../Components/BottomButtonContainer/BottomButtonContainer'


const AddEmployee = () => {

    const [num, setNum] = useState(1)

    const incNum = () => {
        num<3?
        setNum(prev => {return  prev + 1 }):
        setNum(3)
    }
    const decNum = () => {
        num>1?
        setNum(prev => {return  prev - 1 }):
        setNum(1)
    }


    const renderPage = (num) => {
        switch (num) {
            case 1:
                return <AddEmployee_form1 />
            case 2:
                return <AddEmployee_form2 />
            case 3:
                return <AddEmployee_form3 />

            default: return <h1>nothinf</h1>
        }
    }


    return (
        <React.Fragment>
            <Heading heading={'Add Employee'} />
            <StepBar value={num} />
            <div className={classes.rendered_page}>
                {renderPage(num)}
            </div>
            <BottomButtonContainer cancel={'Back'} approve={'Continue'} func={true} func2={incNum} func1={decNum} />
        </React.Fragment>
    )
}

export default AddEmployee