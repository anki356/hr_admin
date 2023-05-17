import classes from './SelectTag.module.css'
import Img from '../../assets/vector9.png'


const SelectTag = (props) => {

    const valHandler = (e) => {
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
                <select className={classes.select} onChange={valHandler} id={props.select_id ? props.select_id :''}>
                    <option defaultValue>{props.title}</option>
                    {optionData.map((val, index) => (
                        <option key={index} value={val.name}>{val.name}</option>
                    ))}
                </select> :
                <select onChange={callParentFunction} className={classes.select} id={props.select_id ? props.select_id :''}>
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