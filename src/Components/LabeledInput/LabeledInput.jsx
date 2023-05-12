import classes from './LabeledInput.module.css'
import vec from '../../assets/vector9.png'
import { useState } from 'react';

const LabeledInput = (props) => {
const [time,setTime]=useState(null)
  const inputType = props.type ? props.type : 'text';
  const getValue=()=>{
    if(props.type=='date')
    {
    return props.value
  }
  else if(props.type=='time'){
return time
  }
  else{
    return null
  }
}
function changetime(e){
setTime(e.target.value)
  props.timeInput()
}
  return (
    <div className={`${classes.input_div} ${props.cls?classes.wd50:''}`} style={props.mr ? { marginRight: '0' } : {}}>
      <label htmlFor={props.id}>{props.title}</label>
      <input type={inputType}  placeholder={props.ph}  id={props.id} step={1} value={getValue} disabled={props?.disabled} onChange={(e)=>changetime(e)}/>
      {props.img === false ? '' :
        <img src={vec} className={classes.img2} alt="" />
      }
    </div>

  )
}

export default LabeledInput