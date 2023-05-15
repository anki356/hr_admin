import { useNavigate } from 'react-router-dom'
import classes from './BottomButtonContainer.module.css'

const BottomButtonContainer = (props) => {

  const navigate = useNavigate();
 const  backHandler = () =>{
   return  navigate(-1)
  }

  return (
    <div className={classes.btn_container}>
      
      <button className={classes.cancel} onClick={props.func === true ? props.cancelRequests  : backHandler}>{props.cancel}</button>
      <button className={classes.accept} onClick={props.func === true ? props.func2  : ''}>{props.approve}</button>
    </div>
  )
}

export default BottomButtonContainer