import React from 'react'
import classes from './EmployeeActualProfile.module.css'
import Img from '../../../assets/dp.png'
import DetailsDiv from '../../../Components/DetailsDiv/DetailsDiv'

const EmployeeActualProfile = () => {
  return (
    <div className={classes.container}>
      <div className={classes.top_container}>
          <img src={Img} alt="dp_img" />
          <div className={classes.black_div}>Puneet Shrivastav</div>
          <div className={classes.gray_div}><span>Salesman</span> | <span>1st Floor</span></div>
          <div className={classes.black_div}>Emp Id-18/545</div>
      </div>
      <div className={classes.middle_container}>
        <h5 className={classes.theme_heading}>Employee Grade</h5>
        <div className={classes.grade}>4.5/5</div>
      </div>
      <div className={classes.middle_container}>
        <h5 className={classes.theme_heading}>Contact Details</h5>
       <DetailsDiv cls2={true} num={1} title={'Phone No.'} value={'9311676133'} />
       <DetailsDiv cls2={true} num={2} title={'Email Id'} value={'psrivastava012345@gmail.com'} />
       <DetailsDiv cls2={true} num={3} title={'Emergency No.'} value={'9311676873'} />
      </div>
    </div>
  )
}

export default EmployeeActualProfile