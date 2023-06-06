import React, { useState, useEffect } from 'react'
import MainTable from '../../../Components/MainTable/MainTable'
import Cookies from 'universal-cookie'
import useHttp from '../../../Hooks/use-http'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Heading from '../../../Components/Heading/Heading'
const EMIAll = () => {
const {employee_id}=useParams()
const cookies=new Cookies()
const token=cookies.get('token')
const [loanEMIData,setLoanEMIData]=useState([])
const headers = { "Authorization": "Bearer " + token }
const url = "http://localhost:9000/"
useEffect(()=>{
axios.get(url + "api/getLoansHistory?employee_id=" + employee_id,{headers}).then((response)=>{
    const monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    var loanData=response.data.map((data)=>{
        let obj={}
        obj.loan_repayment=data.loan_repayment
        return obj
    })
   
    loanData.forEach((data)=>{
        data.loan_repayment.forEach(element => {
            element.month=monthArray[element.month]
            if (element.status === 'Paid') {
                element.restructure = false
              }
              else {
                element.restructure = true
              }
        });

    })
    console.log(loanData)
    setLoanEMIData(loanData)
})
},[])
console.log(loanEMIData)
const table_headings = [
    { heading: 'Loan Amount' },
    { heading: 'Month' },
    { heading: 'Status' }
  ]
const tableKeys=['amount','month','status','restructure']
return(
    <React.Fragment>
          <Heading heading={'Loan EMI Details'} />
          {
            loanEMIData.map((data,index)=>{
                
                return<div> <span>Loan No {index+1}</span>    <MainTable headings={table_headings} keys={tableKeys} data={data.loan_repayment} height={false} /></div>
            })
          }
        
    </React.Fragment>
)


}
export default EMIAll 