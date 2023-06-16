import classes from './SelectTag.module.css'
import Img from '../../assets/vector9.png'
import { useState } from 'react'


const SelectTag = (props) => {
const [value,setValue]=useState('')
    const valHandler = (e) => {
        console.log(e)
        props.selectedVal(e.target.value)
    }

    const callParentFunction = (e) => {
        props.parentFunc(e.target.value)
    }

    const optionData = props.data;

    return (
        <div className={classes.select_div}>
            <img src={props.img} className={classes.select_img} alt="" />
            {optionData ?
                <select  required={props?.required} name='select'  className={classes.select} onChange={(e)=>valHandler(e)} id={props.select_id ? props.select_id :''}>
                    <option value={''}>{props.title}</option>
                    {!props.usingid ? optionData.map((val, index) => (
                        <option key={index} value={val.name}>{val.name}</option>
                    )) : optionData.map((val, index) => (
                        <option key={index} value={val.id}>{val.name}</option>
                    )) }
                </select> :
                <select   required={props?.required} onChange={(e)=>callParentFunction(e)} className={classes.select} id={props.select_id ? props.select_id :''}>
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
            }
            <img src={Img} className={classes.down_arrow} alt="down_arrow" />
        </div>
    )
}

export default SelectTag