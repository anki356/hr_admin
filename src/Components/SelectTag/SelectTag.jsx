import classes from './SelectTag.module.css'
import Img from '../../assets/vector9.png'


const SelectTag = (props) => {
    return (
        <div className={classes.select_div}>
            <img src={props.img} className={classes.select_img} alt="" />
            <select className={classes.select}>
                <option defaultValue>{props.title}</option>
                <option value="">New Delhi</option>
                <option value="">Istanbul</option>
                <option value="">Jakarta</option>
            </select>
            <img src={Img} className={classes.down_arrow} alt="down_arrow" />
        </div>
    )
}

export default SelectTag