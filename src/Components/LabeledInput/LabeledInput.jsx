import classes from './LabeledInput.module.css'
import vec from '../../assets/vector9.png'

const LabeledInput = (props) => {

  const inputType = props.type ? props.type : 'text';

  return (
    <div className={`${classes.input_div} ${props.cls?classes.wd50:''}`} style={props.mr ? { marginRight: '0' } : {}}>
      <label htmlFor={props.id}>{props.title}</label>
      <input type={inputType} placeholder={props.ph} id={props.id} />
      {props.img === false ? '' :
        <img src={vec} className={classes.img2} alt="" />
      }
    </div>

  )
}

export default LabeledInput