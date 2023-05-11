import React from 'react'
import BottomButtonContainer from '../../../Components/BottomButtonContainer/BottomButtonContainer'
import Heading from '../../../Components/Heading/Heading'
import LabeledInput from '../../../Components/LabeledInput/LabeledInput'
import classes from './EditRoles.module.css'


const EditRoles = () => {

    const inputs = [
        {
            title: 'Name',
            id: 'name',
            ph: ''
        },
        {
            title: 'Floor',
            id: 'floor',
            ph: ''
        },
        {
            title: 'Password',
            id: 'password',
            ph: ''
        },
        {
            title: 'Username',
            id: 'username',
            ph: ''
        },
        {
            title: 'Role',
            id: 'role',
            ph: ''
        },
    ]

    return (
        <React.Fragment>
            <Heading heading='View Details' />
            <button className={classes.btn}>Edit This Role</button>
            <div className={classes.container}>
                {inputs.map((element, index) => (
                    <LabeledInput title={element.title} key={index} ph={element.ph} id={element.id} cls={true} img={false} />
                ))}
                <div className={classes.store_div}>
                    <label htmlFor='store'>Store</label>
                    <select name="store" id="store">
                        <option value="">store 1</option>
                        <option value="">store 2</option>
                        <option value="">store 3</option>
                        <option value="">store 4</option>
                        <option value="">store 5</option>
                    </select>
                </div>
            </div>
            <BottomButtonContainer cancel='Back' approve='Delete Role' />
        </React.Fragment>
    )
}

export default EditRoles