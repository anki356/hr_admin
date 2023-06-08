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
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'

const AddEmployee = () => {

    const [isIdExist, setIdExist] = useState(false)
    const url = "http://localhost:9000/"
    const parameter = useParams()
    const cookies = new Cookies();
    const token = cookies.get('token')
    const headers = { "Authorization": "Bearer " + token, 'Content-Type': 'multipart/form-data' }
const [photo,setPhoto]=useState(null)
const [data,setData]=useState([])
    const getEmpData = async (EmpId) => {
        try {
            const response = await fetch(`${url}api/getEmployeeDetails?id=${EmpId}`, {
                method: 'GET',
                headers: {
                    ...headers
                }
            })

            if (!response.ok) {
                throw new Error('Something is wrong!')
            }
            const result = await response.json()
          console.log(result)
           setName(result?.employeesResult[0]?.name)
           setFatherName(result?.employeesResult[0]?.father_name)
           setAadharNo(result?.employeesResult[0]?.aadhar_no)
           setPanNo(result?.employeesResult[0]?.pan_no)
           setPermamanentAddress(result?.employeesResult[0]?.permanent_address)
           setLocalAddress(result?.employeesResult[0]?.local_address)
           setEmergencyMobileNumber(result?.employeesResult[0]?.emergency_mobile_no)
           setMobileNo(result?.employeesResult[0]?.mobile_no)
           setGender(result?.employeesResult[0]?.gender)
           setMaritalStatus(result?.employeesResult[0]?.marital_status)
           result.employeesResult[0].dob=result?.employeesResult[0]?.dob.split("T")[0]
           setDOB(result?.employeesResult[0]?.dob)
           setDesignation(result?.employeesResult[0]?.role_id)
           setDepartment(result?.employeesResult[0]?.department_id)
           setSection(result?.employeesResult[0]?.store_department_id)
           setStore(result?.employeesResult[0]?.store_id)
           setFloor(result?.employeesResult[0]?.floor_id)
           setHiredBy(result?.employeesResult[0]?.hired_by_employee_id)
           setHeadEmployee(result?.employeesResult[0]?.head_employee_id)
           setSupervisor(result?.employeesResult[0]?.supervisor_id)
           setHiringFrom(result?.employeesResult[0]?.lead_from)
           setJobLocation(result?.employeesResult[0]?.location)
           result.employeesResult[0].hiring_date_time=result?.employeesResult[0]?.hiring_date_time.split("T")[0]
           setLeadDate(result?.employeesResult[0]?.hiring_date_time)
           setESI(result?.employeesResult[0]?.esi_no)
           setEpf(result?.employeesResult[0]?.epf_no)
           setFineMgmt(result?.employeesResult[0]?.fine_management)
           setBankName(result?.employeesResult[0]?.bank_name)
           setBranch(result?.employeesResult[0]?.branch)
           setIFSC(result?.employeesResult[0]?.ifsc)
           setAcountNo(result?.employeesResult[0]?.account_number)
           setMinWages(result?.employeesResult[0]?.min_wages_as_per_rule)
           setBaseSalary(result?.employeesResult[0]?.amount)
           setUAN(result?.employeesResult[0]?.uan_no)
           setModeOfPay(result?.employeesResult[0]?.sub_type)
           setEmpType(result?.employeesResult[0]?.type)
           setQualification(result?.employeesResult[0]?.qualification)
           setData(result?.documentResult)
           setPhoto(result?.employeesResult[0]?.photo)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const EmpId = parameter?.id
        if (EmpId) {
            return getEmpData(EmpId)
        }
    }, [parameter])

   
    const navigate = useNavigate()
    const [num, setNum] = useState(1)
    const [name, setName] = useState(null)
    const [father_name, setFatherName] = useState(null)
    const [aadhar_no, setAadharNo] = useState(null)
    const [pan_no, setPanNo] = useState(null)
    const [permanent_address, setPermamanentAddress] = useState(null)
    const [local_address, setLocalAddress] = useState(null)
    const [emergency_mobile_no, setEmergencyMobileNumber] = useState(null)
    const [mobile_no, setMobileNo] = useState(null)
    const [dob, setDOB] = useState(null)
    const [marital_status, setMaritalStatus] = useState(null)
    const [gender, setGender] = useState(null)
    const [designation, setDesignation] = useState(null)
    const [department, setDepartment] = useState(null)
    const [section, setSection] = useState(null)
    const [floor, setFloor] = useState(null)
    const [store, setStore] = useState(null)

    const [head_employee, setHeadEmployee] = useState(null)
    const [hiredBy, setHiredBy] = useState(null)
    const [hiring_from, setHiringFrom] = useState(null)
    const [lead_date, setLeadDate] = useState(null)
    const [superVisor, setSupervisor] = useState(null)
    const [job_location, setJobLocation] = useState(null)
    const [esi, setESI] = useState(null)
    const [epf, setEpf] = useState(null)
    const [mode_of_pay, setModeOfPay] = useState(null)
    const [fine_mgmt, setFineMgmt] = useState(null)
    const [bank_name, setBankName] = useState(null)
    const [account_no, setAcountNo] = useState(null)
    const [branch, setBranch] = useState(null)
    const [ifsc, setIFSC] = useState(null)
    const [uan_no, setUAN] = useState(null)

    const [min_wages, setMinWages] = useState(null)
    const [base_salary, setBaseSalary] = useState(null)
    const [emp_type, setEmpType] = useState(null)
    const [qualification, setQualification] = useState(null)

    const [download, setDownload] = useState([])
    const incNum = () => {
        num < 3 ?
            setNum(prev => { return prev + 1 }) :
            id?edit():add()
    }
    const add = () => {
        console.log(lead_date)
        if (download.length > 1) {
            axios.post(url + "api/addEmployee", {
                "name": name,
                "father_name": father_name,
                "aadhar_no": aadhar_no,
                "pan_no": pan_no,
                "local_address": local_address,
                "permanent_address": permanent_address,
                "emergency_no": emergency_mobile_no,
                "phone": mobile_no,
                "dob": dob,
                "marital_status": marital_status,
                "gender": gender,
                "qualification": qualification,
                "store_department_id": section,
                "designation_id": designation,
                "department_id": department,
                "hiring_date_time": lead_date,
                "lead_from": hiring_from,
                "head_employee_id": head_employee,
                "hired_by_employee_id": hiredBy,
                "location": job_location,
                "bank_name": bank_name,
                "branch": branch,
                "ifsc": ifsc,
                "account_number": account_no,
                "epf_no": epf,
                "esi_no": esi,
                "role_id": designation,
                "uan_no": uan_no,
                "fine_management": fine_mgmt === 'Yes' ? 1 : 0,
                "min_wages_as_per_rule": min_wages,
                "sub_type": mode_of_pay,
                "type": emp_type,
                "base_salary": base_salary,
                "floor_id": floor,
                "store_id": store,
                "photo": download[0],
                "supervisor_id":superVisor,
                "document": download.filter((data, index) => {
                    return index !== 0
                })


            }, { headers }).then((response) => {
                if (response) {
                    navigate(-1)
                }
            })
        }

    }
    const decNum = () => {
        num > 1 ?
            setNum(prev => { return prev - 1 }) :
            setNum(1)
    }
    const newFile = (data, index) => {
        console.log(index)
        var array = download
        array[index] = data
        setDownload(array)

    }
    function changeName(data) {
        setName(data)
    }
    function changeFatherName(data) {
        setFatherName(data)
    }
    function changeAadharNo(data) {
        setAadharNo(data)
    }
    function changePanNo(data) {
        setPanNo(data)
    }
    function changeLocalAddress(data) {
        setLocalAddress(data)
    }
    function changePermamanentAddress(data) {
        setPermamanentAddress(data)
    }
    function changeEmergencyMobileNumber(data) {
        setEmergencyMobileNumber(data)
    }
    function changeMobileNo(data) {
        setMobileNo(data)
    }
    function changeDOB(data) {
        setDOB(data)
    }
    function changeMaritalStatus(data) {
        setMaritalStatus(data)
    }
    function changeDepartment(data) {
        setDepartment(data)
    }
    function changeDesignation(data) {
        setDesignation(data)
    }
    function changeSection(data) {
        setSection(data)
    }
    function changeHeadEmployee(data) {
        setHeadEmployee(data)
    }
    function changeHiredBy(data) {
        setHiredBy(data)
    }
    function changeHiringFrom(data) {
        setHiringFrom(data)
    }
    function changeJobLocation(data) {
        setJobLocation(data)
    }
    function changeSupervisor(data) {
        setSupervisor(data)
    }
    function changeLeadDate(data) {
        setLeadDate(data)
    }
    function changePF(data) {
        setEpf(data)
    }
    function changeESI(data) {
        setESI(data)
    }

    function changeBankName(data) {
        setBankName(data)
    }
    function changeFineMgmt(data) {
        setFineMgmt(data)
    }
    function changeAcountNo(data) {
        setAcountNo(data)
    }
    function changeModeOfPay(data) {
        setModeOfPay(data)
    }
    function changeIFSC(data) {
        setIFSC(data)
    }
    function changeBranch(data) {
        setBranch(data)
    }
    function changeMInWages(data) {
        setMinWages(data)
    }
    function chanageEmpType(data) {
        setEmpType(data)
    }
    function changeFloor(data) {
        setFloor(data)
    }
    function changeStore(data) {
        setStore(data)
    }
    function changeQualification(data) {
        setQualification(data)
    }
    function changeUAN(data) {
        setUAN(data)
    }
    function changeBaseSalary(data) {
        setBaseSalary(data)
    }


    const form1Functions = [
        {
            function: changeName,
            value: name,
            title: 'Name'
        },
        {
            function: changeFatherName,
            value: father_name,
            title: 'Father Name'
        },
        {
            function: changeAadharNo,
            value: aadhar_no,
            title: 'Aadhar No.'
        },
        {
            function: changePanNo,
            value: pan_no,
            title: 'Pan No.'
        },
        {
            function: changeLocalAddress,
            value: local_address,
            title: 'Local Address'
        },
        {
            function: changePermamanentAddress,
            value: permanent_address,
            title: 'Permanent Address'
        },
        {
            function: changeEmergencyMobileNumber,
            value: emergency_mobile_no,
            title: 'Emergency Number'
        },
        {
            function: changeMobileNo,
            value: mobile_no,
            title: 'Mobile Number'
        },
        {
            function: changeMaritalStatus,
            value: marital_status,
            title: 'Maritial Status'
        },
        {
            function: changeDOB,
            value: dob,
            title: 'DOB',
            type: 'date'
        }
    ]

    const form2Selects = [
        {
            function:changeDepartment,
            value:department,
            title:'Department',
            num:2
        },
        {
            function:changeDesignation,
            value:designation,
            title:'Designation',
            num:1
        },
        {
            function:changeHeadEmployee,
            value:head_employee,
            title:'Head Employee',
            num:6
        },
        {
            function:changeHiredBy,
            value:hiredBy,
            title:'Hired By',
            num:6
        },
        {
            function:changeSupervisor,
            value:superVisor,
            title:'Supervisor',
            num:7
        },
        {
            function:changeFloor,
            value:floor,
            title:'Floor',
            num:3
        },
        {
            function:changeStore,
            value:store,
            title:'Store',
            num:4
        },
        {
            function:changeSection,
            value:section,
            title:'Section',
            num:5
        }
    ]

    const form2Input = [
        {
            function:changeHiringFrom,
            value:hiring_from,
            title:'Hiring From'
        },
        {
            function:changeJobLocation,
            value:job_location,
            title:'Job Location'
        },
        {
            function:changeLeadDate,
            value:lead_date,
            title:'Lead Date',
            type:'date'
        },
        {
            function:changeESI,
            value:esi,
            title:'ESI'
        },
        {
            function:changePF,
            value:epf,
            title:'PF'
        },
        {
            function:changeQualification,
            value:qualification,
            title:'Qualification'
        }
    ]

    const form3Input = [
        {
            function:changeBankName,
            value:bank_name,
            title:'Bank Name'
        },
        {
            function:changeBranch,
            value:branch,
            title:'Branch'
        },
        {
            function:changeIFSC,
            value:ifsc,
            title:'IFSC',
        },
        {
            function:changeAcountNo,
            value:account_no,
            title:'Account N0.'
        },
        {
            function:changeMInWages,
            value:min_wages,
            title:'Min Wages'
        },
        {
            function:changeUAN,
            value:uan_no,
            title:'UAN No.'
        },
        {
            function:changeBaseSalary,
            value:base_salary,
            title:'Base Salary'
        },
    ]




    const renderPage = (num) => {
        switch (num) {
            case 1:
                return <AddEmployee_form1 formData={form1Functions} changeGender={setGender} genderValue={gender} />
            case 2:
                return <AddEmployee_form2 formSelect={form2Selects} formInput={form2Input} />
            case 3:
                return <AddEmployee_form3 formInput={form3Input}  changeModeOfPay={changeModeOfPay} mode_of_pay={mode_of_pay} changeFineMgmt={changeFineMgmt} fine_mgmt={fine_mgmt} newFile={newFile}  chanageEmpType={chanageEmpType} emp_type={emp_type} edit={true} data={data} photo={photo}/>

            default: return <h1>nothing</h1>
        }
    }
const edit=()=>{
    
}

    return (
        <React.Fragment>
            <Heading heading={parameter.id ? 'Edit Employee' : 'Add Employee'} />
            <StepBar value={num} />
            <div className={classes.rendered_page}>
                {renderPage(num)}
            </div>
            <BottomButtonContainer cancel={'Back'} approve={'Continue'} func={true} func2={incNum} cancelRequests={decNum} />
        </React.Fragment>
    )
}

export default AddEmployee