import React, { useState } from 'react'
import Heading from '../../Components/Heading/Heading'
import StepBar from '../../Components/StepBar/StepBar'
import AddEmployee_form1 from './AddEmployee_form1'
import AddEmployee_form2 from './AddEmployee_form2'
import AddEmployee_form3 from './AddEmployee_form3'
import classes from './AddEmployee.module.css'
import BottomButtonContainer from '../../Components/BottomButtonContainer/BottomButtonContainer'
import axios from 'axios'
import Cookies from 'universal-cookie'
import { useNavigate } from 'react-router-dom'
const AddEmployee = () => {
    const url = "http://localhost:9000/"
    const navigate = useNavigate()
    const cookies = new Cookies();
    const token = cookies.get('token')
    const headers = { "Authorization": "Bearer " + token, 'Content-Type': 'multipart/form-data' }
    const [num, setNum] = useState(1)
    const [name,setName]=useState(null)
    const [father_name,setFatherName]=useState(null)
    const [aadhar_no,setAadharNo]=useState(null)
    const [pan_no,setPanNo]=useState(null)
    const [permanent_address,setPermamanentAddress]=useState(null)
    const [local_address,setLocalAddress]=useState(null)
    const [emergency_mobile_no,setEmergencyMobileNumber]=useState(null)
    const [mobile_no,setMobileNo]=useState(null)
    const [dob,setDOB]=useState(null)
    const [marital_status,setMaritalStatus]=useState(null)
    const [gender,setGender]=useState(null)
    const [designation,setDesignation]=useState(null)
    const [department,setDepartment]=useState(null)
    const [section,setSection]=useState(null)
    const [floor,setFloor]=useState(null)
    const [store,setStore]=useState(null)

    const [head_employee,setHeadEmployee]=useState(null)
    const [hiredBy,setHiredBy]=useState(null)
    const [hiring_from,setHiringFrom]=useState(null)
    const [lead_date,setLeadDate]=useState(null)
    const [superVisor,setSupervisor]=useState(null)
    const [job_location,setJobLocation]=useState(null)
    const [esi,setESI]=useState(null)
    const [epf,setEpf]=useState(null)
    const [mode_of_pay,setModeOfPay]=useState(null)
    const [fine_mgmt,setFineMgmt]=useState(null)
    const [bank_name,setBankName]=useState(null)
    const [account_no,setAcountNo]=useState(null)
    const [branch,setBranch]=useState(null)
    const [ifsc,setIFSC]=useState(null)
    const [uan_no,setUAN]=useState(null)

const [min_wages,setMinWages]=useState(null)
const [base_salary,setBaseSalary]=useState(null)
const [emp_type,setEmpType]=useState(null)
const [qualification,setQualification]=useState(null)

const [download, setDownload] = useState([])
    const incNum = () => {
        num<3?
        setNum(prev => {return  prev + 1 }):
       add()
    }
    const add=()=>{
        console.log(lead_date)
        if(download.length>1){
            axios.post(url+"api/addEmployee",{
                "name":name,
                "father_name":father_name,
                "aadhar_no":aadhar_no,
                "pan_no":pan_no,
                "local_address":local_address,
                "permanent_address":permanent_address,
                "emergency_no":emergency_mobile_no,
                "phone":mobile_no,
                "dob":dob,
                "marital_status":marital_status,
                "gender":gender,
                "qualification":qualification,
                "store_department_id":section,
                "designation_id":designation,
                "department_id":department,
                "hiring_date_time":lead_date,
                "lead_from":hiring_from,
                "head_employee_id":head_employee,
                "hired_by_employee_id":hiredBy,
                "location":job_location,
                "bank_name":bank_name,
                "branch":branch,
                "ifsc":ifsc,
                "account_number":account_no,
                "epf_no":epf,
                "esi_no":esi,
                "role_id":designation,
                "uan_no":uan_no,
                "fine_management":fine_mgmt==='Yes'?1:0,
                "min_wages_as_per_rule":min_wages,
                "sub_type":mode_of_pay,
                "type":emp_type,
                "base_salary":base_salary,
                "floor_id":floor,
                "store_id":store,
                "photo":download[0],
                "document":download.filter((data,index)=>{
                    return index!==0
                })
                
                
                },{headers}).then((response)=>{
                    if(response){
                        navigate(-1)
                    }
                })
        }

    }
    const decNum = () => {
        num > 1 ?
        setNum(prev => {return  prev - 1 }):
        setNum(1)
    }
    const newFile = (data, index) => {
        console.log(index)
        var array=download
          array[index]=data
      setDownload(array)
        
      }
    function changeName(data){
setName(data)
    }
    function changeFatherName(data){
        setFatherName(data)
    }
    function changeAadharNo(data){
        setAadharNo(data)
    }
    function changePanNo(data){
        setPanNo(data)
    }
    function changeLocalAddress(data){
        setLocalAddress(data)
    }
    function changePermamanentAddress(data){
        setPermamanentAddress(data)
    }
    function changeEmergencyMobileNumber(data){
        setEmergencyMobileNumber(data)
    }
    function changeMobileNo(data){
        setMobileNo(data)
    }
    function changeDOB(data){
        setDOB(data)
    }
    function changeMaritalStatus(data){
        setMaritalStatus(data)
    }
    function changeDepartment(data){
        setDepartment(data)
    }
    function changeDesignation(data){
        setDesignation(data)
    }
    function changeHeadEmployee(data){
        setHeadEmployee(data)
    }
    function changeHiredBy(data){
        setHiredBy(data)
    }
    function changeHiringFrom(data){
    setHiringFrom(data)
    }
    function changeJobLocation(data){
        setJobLocation(data)
    }
    function changeSupervisor(data){
        setSupervisor(data)
    }
    function changeLeadDate(data){
        setLeadDate(data)
    }
    function changePF(data){
        setEpf(data)
    }
    function changeESI(data){
        setESI(data)
    }
    
    function changeBankName(data){
        setBankName(data)
    }
    function changeFineMgmt(data){
        setFineMgmt(data)
    }
    function changeAcountNo(data){
        setAcountNo(data)
    }
    function changeModeOfPay(data){
        setModeOfPay(data)
    }
    function changeIFSC(data){
        setIFSC(data)
    }
    function changeBranch(data){
        setBranch(data)
    }
    function changeMInWages(data){
        setMinWages(data)
    }
    function chanageEmpType(data){
        setEmpType(data)
    }
    









    

    const renderPage = (num) => {
        switch (num) {
            case 1:
                return <AddEmployee_form1 changeName={changeName}changeFatherName={changeFatherName} changeAadharNo={changeAadharNo} changePanNo={changePanNo} changeLocalAddress={changeLocalAddress} changePermamanentAddress={changePermamanentAddress} changeEmergencyMobileNumber={changeEmergencyMobileNumber} changeMobileNo={changeMobileNo} changeDOB={changeDOB} changeMaritalStatus={changeMaritalStatus} changeGender={setGender} />
            case 2:
                return <AddEmployee_form2 changeDepartment={changeDepartment}changeDesignation={changeDesignation} changeHeadEmployee={changeHeadEmployee} changeHiredBy={changeHiredBy} changeLeadDate={changeLeadDate} changeHiringFrom={changeHiringFrom} changeJobLocation={changeJobLocation} changeSupervisor={changeSupervisor} changeESI={changeESI} changePF={changePF} changeQualification={setQualification} changeSection={setSection} changeStore={setStore} changeFloor={setFloor} />
            case 3:
                return <AddEmployee_form3 changeAcountNo={changeAcountNo}changeBankName={changeBankName} changeBranch={changeBranch} changeIFSC={changeIFSC} changeModeOfPay={changeModeOfPay} changeFineMgmt={changeFineMgmt} newFile={newFile} changeMInWages={changeMInWages} chanageEmpType={chanageEmpType} changeBaseSalary={setBaseSalary} changeUAN={setUAN}/>

            default: return <h1>nothing</h1>
        }
    }


    return (
        <React.Fragment>
            <Heading heading={'Add Employee'} />
            <StepBar value={num} />
            <div className={classes.rendered_page}>
                {renderPage(num)}
            </div>
            <BottomButtonContainer cancel={'Back'} approve={'Continue'} func={true} func2={incNum} cancelRequests={decNum} />
        </React.Fragment>
    )
}

export default AddEmployee