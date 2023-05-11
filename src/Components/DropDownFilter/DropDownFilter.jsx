import SelectTag from '../SelectTag/SelectTag'
import classes from './DropDownFilter.module.css'
import Img from '../../assets/shop.png'
import { Link } from 'react-router-dom'

const DropDownFilter = (props) => {
  return (
    <div style={props.mb? {marginBottom:'0px'}:{}} className={classes.DropDownFilter}>
      <div className={classes.DropDownFilter_left}>
        <SelectTag title={props.title1} img={Img} />
        <SelectTag title={props.title2} img={Img} />
      </div>

      {
        props.Btn ?
          <div className={classes.DropDownFilter_right}>
              <Link to={props.Lnk?props.Lnk:'/'} className={classes.DropDownFilter_Btn}>{props.Btn}</Link>
          </div> :
          ''
      }
      {
        props.d3 &&
        <SelectTag title={props.title3} img={Img} /> 
      }
    </div>
  )
}

export default DropDownFilter