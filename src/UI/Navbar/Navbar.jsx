import classes from './Navbar.module.css'
import Img from '../../assets/logo.png'
import Mag from '../../assets/mag.png'
import I1 from '../../assets/clock.png'
import I2 from '../../assets/data.png'
import Bell from '../../assets/noti.png'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const Navbar = (props) => {

  // Used for navigation
  const navigate = useNavigate()

  // Token validation 
  const token = localStorage.getItem('token')

  const sidebarHandler = () => {
    props.onSideberBtn(true)
  }

  const date = new Date()

  const dayFunc = () => {
    const val = date.getDay()

    switch (val) {
      case 0:
        return 'Sunday'
      case 1:
        return 'Monday'
      case 2:
        return 'Tuesday'
      case 3:
        return 'Wednesday'
      case 4:
        return 'Thursday'
      case 5:
        return 'Friday'
      case 6:
        return 'Saturday'
    }

  }

  useEffect(()=>{
    if (!token) {
      navigate('/admin_login')
    }
  },[])

  return (
    <nav className={classes.navbar}>
      <div className={classes.nav_logo}>
        <img src={Img} alt="" />
      </div>
      <div className={classes.navbar_sidediv}>
        <div className={classes.searchbar_container}>
          <input type="text" placeholder='Emp ID , Employee Name..' />
          <img src={Mag} alt="" />
        </div>
        <div className={classes.nav_divs_container}>
          <div className={classes.nav_div}>
            <img src={I2} alt="" />
            <span>{dayFunc()}, {date.getDate()} {date.toLocaleString('default', { month: 'long' })} {date.getFullYear()}</span>
          </div>
          <div className={classes.nav_div}>
            <img src={I1} alt="" />
            <span>{date.toLocaleTimeString()}</span>
          </div>
          <div className={classes.notification_bell}>
            <img src={Bell} alt="" />
          </div>
          <button onClick={sidebarHandler} className={classes.sidebar_open_btn}>
            <div></div>
            <div></div>
            <div></div>
          </button>
        </div>
      </div>
    </nav>

  )
}

export default Navbar