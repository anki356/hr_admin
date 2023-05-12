import classes from './SelectTag.module.css'
import Img from '../../assets/vector9.png'


const SelectTag = (props) => {

    const valHandler = (e) => {
        props.selectedVal(e.target.value)
    }

    const optionData = props.data;
    console.log('optionData', optionData);

    return (
        <div className={classes.select_div}>
            <img src={props.img} className={classes.select_img} alt="" />
            {optionData ?
                <select className={classes.select} onChange={valHandler}>
                    <option value={''} defaultValue>{props.title}</option>
                    {optionData.map((val, index) => (
                        <option key={index} value={val.name}>{val.name}</option>
                    ))}
                </select> :
                <select className={classes.select}>
                    <option defaultValue>{props.title}</option>
                    <option value="">New Delhi</option>
                    <option value="">Istanbul</option>
                    <option value="">Jakarta</option>
                </select>
            }
            <img src={Img} className={classes.down_arrow} alt="down_arrow" />
        </div>
    )
}

export default SelectTag