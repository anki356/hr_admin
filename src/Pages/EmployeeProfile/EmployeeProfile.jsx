import React,{useState,useEffect} from 'react'
import classes from './EmployeeProfile.module.css'
import DetailsDiv from '../../Components/DetailsDiv/DetailsDiv'
import Heading from '../../Components/Heading/Heading'
import MainTable from '../../Components/MainTable/MainTable'
import advance_data from './advance_data'
import loan_data from './loan_data'
import EmployeeActualProfile from './EmployeeActualProfile/EmployeeActualProfile'
import EmployeeBarGraph from './EmployeeBarGraph/EmployeeBarGraph'
import DownloadDocuments from './Tables/DownloadDocuments/DownloadDocuments'
import IncrementHistory from './Tables/IncementHistory/IncrementHistory'
import SalaryHistory from './Tables/SalaryHistory/SalaryHistory'


import Cookies from 'universal-cookie'
import { Route, useParams } from 'react-router-dom'
const url="http://localhost:9000/"
import axios from 'axios'
const documents_table_headings = [
    {heading:'Document name'},
    {heading:'Upload Date'},
    {heading:''},
    {heading:'Option'}
]
const documents_table_keys = ['type' , 'created_on' , '' , 'file_name' ]
const personal_details = [
    {
        title: 'Date Of Birth',
        value: '13/08/2022'
    },
    {
        title: 'Fathers Name',
        value: 'Rajendera Shrivastav'
    },
    {
        title: 'Qualification',
        value: 'BCA'
    },
    {
        title: 'Gender',
        value: 'male'
    },
    {
        title: 'Floor',
        value: '1st Floor'
    },
    {
        title: 'Marital Status',
        value: 'Unmarried'
    }
]
const job_details = [
    {
        title: 'Department',
        value: 'Kids'
    },
    {
        title: 'Designation',
        value: 'Front-End Developer'
    },
    {
        title: 'Hired by',
        value: 'Rohan D Mishra'
    },
    {
        title: 'Head Employee',
        value: 'Akash D Mishra'
    },
    {
        title: 'Hiring Date',
        value: '20/04/2023'
    },
    {
        title: 'Consultancy',
        value: 'Contractual Based'
    },
    {
        title: 'Job Location',
        value: 'Narang Lagpat Nagar'
    },
    {
        title: 'Supervisior',
        value: 'Anil D Mishra'
    },
    {
        title: 'EPF/ESI no.',
        value: 'AKSDJHJ525ASD'
    }
]
const advance_table_headings = [
    { heading: 'Advance Amount' },
    { heading: 'Approval' },
    { heading: 'Status' }
]
const advance_table_keys = ['amount' , 'advance_status'  , 'payment_status' ]
const loan_table_headings = [
    {heading:'EMI'},
    {heading:'Approval'},
    {heading:'Month'},
    {heading:'Status'},
    {heading:'Restructure'},
]
const loan_table_keys = ['amount' , 'loan_status' , 'month' , 'status', ]

const EmployeeProfile = () => {
    const cookies = new Cookies();
    const monthArray=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
    const [personalDetails,setPersonalDetails]=useState([])
    const [localAddress,setLocalAddress]=useState('')
    const [permanentAddress,setPermanentAddress]=useState('')
    const[jobDetails,setJobDetails]=useState([])
    const[documentsDetails,setDocumentsDetails]=useState([])
    const[documentsData,setDocumentsData]=useState([])
    const[advanceData,setAdvanceData]=useState([])
    const[loanData,setLoanData]=useState([])
    const[loanEMIData,setEMILoanData]=useState([])
const [loanId,setLoanId]=useState('')
const [IncrementData,setIncrementData]=useState([])
const [salaryData,setSalaryData]=useState([])
const restructureLoan=(month)=>{
   
    const token=localStorage.getItem('token')
    const headers={"Authorization":"Bearer "+token}
    axios.post("http://localhost:9000/api/restructureLoans",{
        loan_id:loanId,
        month:month
    },{headers}).then(()=>{

    })

}
const {id}=useParams()
useEffect(()=>{
     const token = cookies.get('token')
 const headers={"Authorization":"Bearer "+token}
    axios.get("http://localhost:9000/api/getEmployeeDetails?id="+id,{headers}).then((response)=>{
      
    axios.get("http://localhost:9000/api/getStoreIncharge?store_id="+response.data.employeesResult[0].store_id,{headers}).then((storeInchargeResult)=>{
    setPersonalDetails([
        {
            title: 'Date Of Birth',
            value: response.data.employeesResult[0]?.dob?.split("T")[0].split("-").reverse().join("-")
        },
        {
            title: 'Fathers Name',
            value: response.data.employeesResult[0]?.father_name
        },
        {
            title: 'Qualification',
            value: response.data.employeesResult[0]?.qualification
        },
        {
            title: 'Gender',
            value: response.data.employeesResult[0]?.gender
        },
        {
            title: 'Floor',
            value: response.data.employeesResult[0]?.floor_name
        },
        {
            title: 'Marital Status',
            value:  response.data.employeesResult[0]?.marital_status
        }
    
    ])
    setLocalAddress(response.data.employeesResult[0]?.local_address)
    setPermanentAddress(response.data.employeesResult[0]?.permanent_address)
    setJobDetails([
        {
            title: 'Department',
            value: response.data.employeesResult[0]?.store_department_name
        },
        {
            title: 'Designation',
            value: response.data.employeesResult[0]?.role_name
        },
        {
            title: 'Hired by',
            value: response.data.headEmployeesResult[0].hired_by_employee_name
        },
        {
            title: 'Head Employee',
            value: response.data.headEmployeesResult[0].head_employee_name
        },
        {
            title: 'Hiring Date',
            value:  response.data.employeesResult[0]?.hiring_date_time.split("T")[0].split("-").reverse().join("-")
        },
        {
            title: 'Consultancy',
            value: response.data.employeesResult[0].lead_from
        },
        {
            title: 'Job Location',
            value: response.data.employeesResult[0].location
        },
        {
            title: 'Supervisor Name',
            value: storeInchargeResult.data[0].name
        },
        {
            title: 'EPF No',
            value: response.data.employeesResult[0].epf_no
        },
        {
            title: 'ESI No',
            value: response.data.employeesResult[0].esi_no
        },{
            title: 'UAN NO',
            value: response.data.employeesResult[0].uan_no
        }
    ])
    setDocumentsDetails([
        {
            title: 'Aadhar Card',
            value: response.data.employeesResult[0]?.aadhar_no
        },
        {
            title: 'Pan NO',
            value: response.data.employeesResult[0]?.pan_no
        },
        {
            title: 'Fine Management',
            value: response.data.employeesResult[0].fine_management===1?'Yes':'No'
        },   
        {
            title: 'Bank Name',
            value: response.data.employeesResult[0].bank_name
        }  ,   
        {
            title: 'Branch',
            value: response.data.employeesResult[0].branch
        } ,   
        {
            title: 'IFSC',
            value: response.data.employeesResult[0].ifsc
        } ,   
        {
            title: 'Account Number',
            value: response.data.employeesResult[0].account_number
        }  
    ])
    const data=response.data.documentResult
    if(data.length>0&& data!==undefined&&data!==null)
    {

    
    data[0].created_on=data[0].created_on.split("T")[0].split("-").reverse().join("-")
    setDocumentsData(data)
    }
    const dataSecond=response.data.advanceResult
    dataSecond.forEach((data)=>{
        if(data.advance_status==='Approved'){
            data.advance_status=data.status_date.split("T")[0].split("-").reverse().join("-")
        }
    })
    setAdvanceData(dataSecond)
    
    setLoanData(response.data.loanResult)
    let loanThirdData=response.data.loanResult
    setLoanId(loanThirdData[0].id)
    let array=[]
   loanThirdData.forEach((data)=>{
if(data.status==='Paid'){
data.restructure=false
}
else{
data.restructure=true
}
   })
  
    console.log(loanThirdData)
    setEMILoanData(loanThirdData)
  })

})

axios.get(url+"api/getSalaryIncrement?employee_id="+id,{headers}).then((response)=>{
    setIncrementData(response.data)
    })
    axios.get(url+"api/getSalaryHistory?employee_id="+id,{headers}).then((response)=>{
        setSalaryData(response.data)
        }) 
   },[])
    return (
        <React.Fragment>
            <Heading heading={'Employee Profile'} />
            <div className={`${classes.container} uni_container`}>
                <div className={classes.container_left}>
                    <EmployeeActualProfile />
                </div>
                <div className={classes.container_right}>
                    <h3 className='uni_heading'>Personal Details</h3>
                    <div className={classes.wrap}>
                        {personalDetails.map((val, index) => (
                            <DetailsDiv cls={true} num={index} title={val.title} value={val.value} />
                        ))}
                        <div className={classes.w100_div}>
                            Local Address
                            <span>
                              {localAddress}
                            </span>
                        </div>
                        <div className={classes.w100_div}>
                            Permanent Address
                            <span>
                                {permanentAddress}
                            </span>
                        </div>
                    </div>

                    <h3 className='uni_heading'>Job Details</h3>
                    <div className={classes.wrap}>
                        {jobDetails.map((val, index) => (
                            <DetailsDiv cls={true} num={index} title={val.title} value={val.value} />
                        ))}
                    </div>



                    <h3 className='uni_heading'>Documents & Bank Details</h3>
                    <div className={classes.wrap}>
                        {documentsDetails.map((val, index) => (
                            <DetailsDiv cls={true} num={index} title={val.title} value={val.value} />
                        ))}
                    </div>
                </div>
            </div>
            <h3 className='uni_heading'>Download Documents</h3>
           
            <MainTable headings={documents_table_headings} keys={documents_table_keys} data={documentsData}  />
            <br />
            <br />
            <h3 className='uni_heading'>Advance & Loan Emi</h3>
            <h4 className={classes.h4_heading}>Advance</h4>
            <MainTable headings={advance_table_headings} keys={advance_table_keys} data={advanceData}  />
            <br />
            <br />
            <h4 className={classes.h4_heading}>Loan</h4>
            <div className={classes.container}>
                <div>Loan Amount</div>
                <div>{loanData[0]?.loan_amount}</div>
                <div>Tenure</div>
                <div>{loanData[0]?.tenure}</div>
                <div>Approval Status</div>
                <div>{loanData[0]?.loan_status}</div>
                <div>Month</div>
                <div>{monthArray[loanData[0]?.month]}</div>
            </div>
                              
<MainTable  restructureLoan={restructureLoan} headings={loan_table_headings} keys={loan_table_keys} data={loanEMIData}   />
            <br /><br />
            <IncrementHistory data={IncrementData} />

            <br /><br />
            <SalaryHistory  data={salaryData} />
        </React.Fragment>
    )
}

export default EmployeeProfile