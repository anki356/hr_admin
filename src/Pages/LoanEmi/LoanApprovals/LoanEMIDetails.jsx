import React, { useState, useEffect } from 'react'
import MainTable from '../../../Components/MainTable/MainTable'
import Cookies from 'universal-cookie'
import useHttp from '../../../Hooks/use-http'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Heading from '../../../Components/Heading/Heading'
const LoanEMIDetails = () => {
const {id}=useParams()
const cookies=new Cookies()
const token=cookies.get('token')
const [loanEMIData,setLoanEMIData]=useState([])
const headers = { "Authorization": "Bearer " + token }
const url = "http://localhost:9000/"
useEffect(()=>{
axios.get(url + "api/getLoan?id=" + id,{headers}).then((response)=>{
    const monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    response.data[0].loan_repayment.forEach(element => {
        element.month=monthArray[element.month]
    });
    response.data[0].loan_repayment.forEach((data) => {
            if (data.status === 'Paid') {
              data.restructure = false
            }
            else {
              data.restructure = true
            }
          })
setLoanEMIData(response.data[0].loan_repayment)
})
},[])
const table_headings = [
    { heading: 'Loan Amount' },
    { heading: 'Month' },
    { heading: 'Status' }
  ]
const tableKeys=['amount','month','status','restructure']
return(
    <React.Fragment>
          <Heading heading={'Loan EMI Details'} />
         <MainTable headings={table_headings} keys={tableKeys} data={loanEMIData} height={false} />
    </React.Fragment>
)


}
export default LoanEMIDetails 