import classes from './Sidebar.module.css'
import Img from '../../assets/logo.png'
import { Link, NavLink } from 'react-router-dom'
import Attendence from '../../assets/Widget_add.png'
import Wallet from '../../assets/Wallet_alt.png'
import Chart from '../../assets/Chart.png'
import Check from '../../assets/Check_ring.png'
import Clock from '../../assets/Clock2.png'
import Arrows from '../../assets/arrows.png'
import Tie from '../../assets/Tie.png'
import User from '../../assets/User.png'
import Report from '../../assets/Desk.png'

const Sidebar = (props) => {
  return (
    <div className={classes.sidebar}>
      <Link className={classes.navbar_logo} to='/'><img src={Img} alt="logo" />
        <button onClick={() => { props.onSideberBtn() }}>x</button>
      </Link>

      <ul className={classes.sidebar_ul}>
        <li>
          <NavLink onClick={() => { props.onSideberBtn() }} to={'/'} className={classes.sidebar_a} ><img src={Attendence} alt="" /> Attendance Approvals</NavLink>
        </li>
        <li>
          <NavLink onClick={() => { props.onSideberBtn() }} to={'/expense_approvals'} className={classes.sidebar_a}><img src={Check} alt="" />Expense Approvals</NavLink>
        </li>
        
        <li>
          <NavLink onClick={() => { props.onSideberBtn() }} to={'/employee_details'} className={classes.sidebar_a}><img src={Wallet} alt="" />Employee Details</NavLink>
        </li>
        <li>
          <NavLink onClick={() => { props.onSideberBtn() }} to={'/leave_management'} className={classes.sidebar_a}><img src={Chart} alt="" /> Leave Management</NavLink>
        </li>
        <li>
          <NavLink onClick={() => { props.onSideberBtn() }} to={'/loan_emi'} className={classes.sidebar_a}><img src={Chart} alt="" /> Loan EMI</NavLink>
        </li>
        <li>
          <NavLink onClick={() => { props.onSideberBtn() }} to={'/advance'} className={classes.sidebar_a}><img src={Chart} alt="" />Advance</NavLink>
        </li>
        <li>
          <NavLink onClick={() => { props.onSideberBtn() }} to={'/fine_management'} className={classes.sidebar_a}><img src={Chart} alt="" />Fine Management</NavLink>
        </li>
        <li>
          <NavLink onClick={() => { props.onSideberBtn() }} to={'/salary_details'} className={classes.sidebar_a}><img src={Wallet} alt="" />Salary Details</NavLink>
        </li>
        <li>
          <NavLink onClick={() => { props.onSideberBtn() }} to={'/salary_summary'} className={classes.sidebar_a}><img src={Wallet} alt="" />Salary Summary</NavLink>
        </li>
        <li>
          <NavLink onClick={() => { props.onSideberBtn() }} to={'/employee_transfer'} className={classes.sidebar_a}><img src={Arrows} alt="" />Employee Transfer</NavLink>
        </li>
        <li>
          <NavLink onClick={() => { props.onSideberBtn() }} to={'/interviews'} className={classes.sidebar_a}><img src={Tie} alt="" />Interviews</NavLink>
        </li>
        <li>
          <NavLink onClick={() => { props.onSideberBtn() }} to={'/grade'} className={classes.sidebar_a}><img src={Tie} alt="" />Grade</NavLink>
        </li>
        <li>
          <NavLink onClick={() => { props.onSideberBtn() }} to={'/timing_approvals'} className={classes.sidebar_a}><img src={Clock} alt="" />Timing Approvals</NavLink>
        </li>
        <li>
          <NavLink onClick={() => { props.onSideberBtn() }} to={'/roles'} className={classes.sidebar_a}><img src={User} alt="" />Roles</NavLink>
        </li>
        <li>
          <NavLink onClick={() => { props.onSideberBtn() }} to={'/bonus'} className={classes.sidebar_a}><img src={Report} alt="" />Bonus</NavLink>
        </li>
        <li>
          <NavLink onClick={() => { props.onSideberBtn() }} to={'/report'} className={classes.sidebar_a}><img src={Report} alt="" />Report</NavLink>
        </li>
        <li>
          <NavLink onClick={() => { props.onSideberBtn() }} to={'/hierarchy'} className={classes.sidebar_a}><img src={Report} alt="" />Hierarchy</NavLink>
        </li>
        
      </ul>
    </div>
  )
}

export default Sidebar