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
const SalarySummaryDetails = () => {
    const [employee_data,setEmployeeData]=useState([])
   
    const [fixed_data, setFixedData]=useState([])
    const { sendRequest: fetchSalary } = useHttp()
    const {id}=useParams()

    const navigate=useNavigate()
useEffect(()=>{
    const url="http://localhost:9000/"
    // if(token===null){
    // navigate('/login')
    // }
    
    
      const listSalary=(Salary)=>{
       if(Salary[0].esi!==null){
        setFixedData([
            {
                "title": 'Salary',
                "val_a": Salary[0].net_salary,
                "val_b":Salary[0].net_payable_salary
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
                "val_a": Salary[0].net_salary,
                "val_b": Salary[0].net_salary
            },
            {
                "title": 'ESIC',
                "val_a": Salary[0].esi,
                "val_b": Salary[0].esi
            },
            {
                "title": 'EPF',
                "val_a": Salary[0].pf,
                "val_b": Salary[0].esi
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
                "val_a": '',
                "val_b": Salary[0].net_payable_salary
            },
            {
                "title": 'Net Pay Incentive',
                "val_a": '',
                "val_b": Salary[0].cash_incentive
            },
        ])
       }
       else{
        setFixedData([
            {
                "title": 'Salary',
                "val_a": Salary[0].net_salary,
                "val_b":Salary[0].net_payable_salary
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
                "val_a": Salary[0].net_salary,
                "val_b": Salary[0].net_salary
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
                "val_a": '',
                "val_b": Salary[0].net_payable_salary
            },
            {
                "title": 'Net Pay Incentive',
                "val_a": '',
                "val_b": Salary[0].cash_incentive
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
              title: 'Store name',
              value: Salary[0].store_name
            }, {
              title: 'Store Department',
              value: Salary[0].store_department_name
            }])
            
    
      }
      fetchSalary({url:url+"api/getSalary?id="+id},listSalary)
},[])
console.log(fixed_data)

  
    const table_headings = [
        { heading: '' },
        { heading: 'Actual Salary' },
        { heading: 'As Per Rule Salary' },
    ]

    const table_keys = ['title', 'val_a', 'val_b']

function cancelRequests(){
    navigate(-1)
}
function download(){

}

    return (
        <React.Fragment>
            <Heading heading={'Salary Summary'} />
            <DetailsDivContainer data={employee_data} />
            <br />
            <h3 className='uni_heading'>Data</h3>
            <MainTable headings={table_headings} keys={table_keys} data={fixed_data} height={true} />
            <br /><br />
            <h3 className='uni_heading'>Other Details</h3>
            <div className={classes.container}>
                {employee_data.map((val, index) => (
                    <DetailsDiv num={index} key={index} title={val.title} value={val.value} />
                ))}
            </div>
            <BottomButtonContainer func={true} cancel={'Cancel'} approve={'Download Summary'} cancelRequests={cancelRequests} func2={download} />
        </React.Fragment>
    )
}

export default SalarySummaryDetails