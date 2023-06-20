import React, { useEffect,useState } from 'react'
import BottomButtonContainer from '../../../Components/BottomButtonContainer/BottomButtonContainer'
import DetailsDiv from '../../../Components/DetailsDiv/DetailsDiv'
import Heading from '../../../Components/Heading/Heading'
import MainTable from '../../../Components/MainTable/MainTable'
import DetailsDivContainer from '../../../UI/DetailsDivContainers/DetailsDivContainer'
import classes from './SalarySummaryDetails.module.css'
import { useParams,useNavigate } from 'react-router-dom'
import useHttp from '../../../Hooks/use-http'
import moment from 'moment'
import axios from 'axios'
import Cookies from 'universal-cookie'
const SalarySummaryDetails = () => {
    const cookies = new Cookies();
    const token = cookies.get('token')
    const headers = { "Authorization": "Bearer " + token }
    const [employee_data,setEmployeeData]=useState([])
   
    const [fixed_data, setFixedData]=useState([])
    const { sendRequest: fetchSalary } = useHttp()
    const { sendRequest: fetchDownload } = useHttp()
    const {id}=useParams()

    const navigate=useNavigate()
    const url="http://localhost:9000/"
useEffect(()=>{
   
    // if(token===null){
    // navigate('/login')
    // }
    
    
      const listSalary=(Salary)=>{
       if(Salary[0].esi!==null){
        setFixedData([
            {
                "title": 'Salary',
                "val_a": Salary[0].net_salary,
                "val_b":Salary[0].net_payable_salary.toFixed(2)
            },
            {
                'title': 'Monthly Days',
                "val_a": moment().daysInMonth(),
                "val_b": moment().daysInMonth()
            },
            {
                "title": 'Working Days',
                "val_a":Salary[0].working_days ,
                "val_b": Salary[0].days_shown
            },
            {
                "title": 'Basic Pay',
                "val_a": Salary[0].amount,
                "val_b": Salary[0].min_wages_as_per_rule
            },
            {
                "title": 'Commission',
                "val_a": Salary[0].commission,
                "val_b": ''
            },
            {
                "title": 'Expenses',
                "val_a": Salary[0].expense,
                "val_b": ''
            },
            {
                "title": 'Tea',
                "val_a":  Salary[0].tea,
                "val_b": ''
            },
            {
                "title": 'Gross Salary',
                "val_a": Salary[0].net_salary.toFixed(2),
                "val_b": Salary[0].net_salary.toFixed(2)
            },
            {
                "title": 'ESIC',
                "val_a": Salary[0].esi.toFixed(2),
                "val_b": Salary[0].esi.toFixed(2)
            },
            {
                "title": 'EPF',
                "val_a": Salary[0].pf.toFixed(2),
                "val_b": Salary[0].pf.toFixed(2)
            },
           
            {
                "title": 'Current Advance',
                "val_a": Salary[0].advance,
                "val_b": ''
            },
            {
                "title": 'Loan Emi',
                "val_a": Salary[0].loan_emi,
                "val_b": ''
            },
            {
                "title": 'Net Pay Salary',
                "val_a": Salary[0].net_salary.toFixed(2),
                "val_b": Salary[0].net_payable_salary.toFixed(2)
            },
            {
                "title": 'Net Pay Incentive',
                "val_a": '',
                "val_b": Salary[0].cash_incentive.toFixed(2)
            },
        ])
       }
       else{
        setFixedData([
            {
                "title": 'Salary',
                "val_a": Salary[0].net_salary.toFixed(2),
                "val_b":Salary[0].net_payable_salary.toFixed(2)
            },
            {
                'title': 'Monthly Days',
                "val_a": moment().daysInMonth(),
                "val_b": moment().daysInMonth()
            },
            {
                "title": 'Working Days',
                "val_a":Salary[0].working_days ,
                "val_b": Salary[0].days_shown
            },
            {
                "title": 'Basic Pay',
                "val_a": Salary[0].amount,
                "val_b": Salary[0].min_wages_as_per_rule
            },
            {
                "title": 'Commission',
                "val_a": Salary[0].commission,
                "val_b": ''
            },
            {
                "title": 'Expenses',
                "val_a": Salary[0].expense,
                "val_b": ''
            },
            {
                "title": 'Tea',
                "val_a":  Salary[0].tea,
                "val_b": ''
            },
            {
                "title": 'Gross Salary',
                "val_a": Salary[0].net_salary.toFixed(2),
                "val_b": Salary[0].net_salary.toFixed(2)
            },
           
            {
                "title": 'Current Advance',
                "val_a": Salary[0].advance,
                "val_b": ''
            },
            {
                "title": 'Loan Emi',
                "val_a": Salary[0].loan_emi,
                "val_b": ''
            },
            {
                "title": 'Net Pay Salary',
                "val_a": Salary[0].net_salary.toFixed(2),
                "val_b": Salary[0].net_payable_salary.toFixed(2)
            },
            {
                "title": 'Net Pay Incentive',
                "val_a": '',
                "val_b": Salary[0].cash_incentive.toFixed(2)
            },
        ])
       }
   
        setEmployeeData([{
            title:"Name",
            value:Salary[0].employee_name
          },{
      title:'SuperVisor Name',
      value:Salary[0].head_employee_name
          },{
            title:'Designation',
      value:Salary[0].role_name
          },{
            title:'Floor Name',
      value:Salary[0].floor_name
      
            }, {
              title: 'Gender',
              value: Salary[0].gender
      
            }, {
              title: 'location name',
              value: Salary[0].location_name
            }, {
              title: 'location Department',
              value: Salary[0].location_department_name
            }])
            
    
      }
      fetchSalary({url:url+"api/getSalary?id="+id},listSalary)
      
    //   navigate(-1)
},[])
console.log(fixed_data)

  
    const table_headings = [
        { heading: '' },
        { heading: 'Actual Salary' },
        { heading: 'As Per Rule Salary' },
    ]

    const table_keys = ['title', 'val_a', 'val_b']

const Print=(e)=>{
e.preventDefault()
window.print()
}

    return (
        <React.Fragment>
            
            <Heading heading={'Salary Summary'} />
            <DetailsDivContainer data={employee_data} />
            <br />
            <h3 className='uni_heading'>Data</h3>
            <MainTable headings={table_headings} keys={table_keys} data={fixed_data}  />
            <br /><br />
            {/* <h3 className='uni_heading'>Other Details</h3>
            <div className={classes.container}>
                {employee_data.map((val, index) => (
                    <DetailsDiv num={index} key={index} title={val.title} value={val.value} />
                ))}
            </div>
            <BottomButtonContainer func={true} cancel={'Cancel'} approve={'Download Summary'} cancelRequests={cancelRequests} func2={download} /> */}
            <button className={classes.salary_history_btn} onClick={(e)=>Print(e)}>Print</button>
           </React.Fragment>
    )
}

export default SalarySummaryDetails
