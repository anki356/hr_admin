import React, { useState, useEffect } from 'react'
import Heading from '../../Components/Heading/Heading'
import DetailsDivContainer from '../../UI/DetailsDivContainers/DetailsDivContainer'
import AdditionalInfoContainer from '../../UI/AdditionalInfoContainer/AdditionalInfoContainer'
import useHttp from '../../Hooks/use-http'
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'universal-cookie'
import axios from 'axios'
// Demo Data 

const div_data = [{
    title: 'Heading 1',
    value: 'Value 1'
}]



const EmployeeTransferDetails = () => {
    const navigate = useNavigate()
    const { sendRequest: fetchEmployee } = useHttp()
    const { sendRequest: fetchTransfer } = useHttp()
    const { employee_id, id } = useParams()
    const url = "http://localhost:9000/"
    const cookies = new Cookies();
    const token = cookies.get('token')
    const [employee_data, setEmployeeData] = useState([])
    const [transfer_info, setTransferInfo] = useState([])
    const [department_to, setDepartmentTo] = useState(null)
    const [store_to, setStoreTo] = useState(null)
    const [floor_to, setFloorTo] = useState(null)

    useEffect(() => {
        const url = "http://localhost:9000/"
        // if(token===null){
        // navigate('/login')
        // }
        const headers = { "Authorization": "Bearer " + token }
        const listEmployee = (employeeData) => {
            setEmployeeData([{
                title: "Name",
                value: employeeData.employeesResult[0].name
            }, {
                title: 'SuperVisor Name',
                value: employeeData.headEmployeesResult[0].head_employee_name
            }, {
                title: 'Designation',
                value: employeeData.employeesResult[0].role_name
            }, {
                title: 'Floor Name',
                value: employeeData.employeesResult[0].floor_name

            }, {
                title: 'Gender',
                value: employeeData.employeesResult[0].gender

            }, {
                title: 'Store name',
                value: employeeData.employeesResult[0].store_name
            }, {
                title: 'Store Department',
                value: employeeData.employeesResult[0].store_department_name
            }])
            setEmpId(employeeData.employeesResult[0].empID)

        }
        const listTransfer = (transfer) => {
            setTransferInfo([{
                title: 'Change Floor',
                value: transfer[0].floor_to_name
            },
            {
                title: 'Change Department',
                value: transfer[0].store_dep_name
            },
            {
                title: 'Previous Department',
                value: transfer[0].department_from_name
            },
            {
                title: 'Change Store',
                value: transfer[0].stores_to_name
            }])
            setFloorTo(transfer[0].floor_id_to)
            setStoreTo(transfer[0].store_id_to)
            setDepartmentTo(transfer[0].department_to)
        }

        fetchEmployee({ url: url + "api/getEmployeeDetails?id=" + employee_id }, listEmployee)
        fetchTransfer({ url: url + "api/getTransferDetails?id=" + id }, listTransfer)


    }, [])
    function cancel() {
        const headers = { "Authorization": "Bearer " + token }
        axios.patch(url + "api/updateTransfer/" + id, {
            "status": 'Rejected',

        }, { headers }).then((response) => {
            if (response) {
                navigate(-1)
            }
        })

    }
    function approve() {
        const headers = { "Authorization": "Bearer " + token }
        axios.patch(url + "api/updateTransfer/" + id, {
            "status": 'Approved',
            "employee_id": employee_id,
            "department_to": department_to,
            "floor_id_to": floor_to,
            "store_id": store_to
        }, { headers }).then((response) => {
            if (response) {
                navigate(-1)
            }
        })
    }
    return (
        <React.Fragment>
            <Heading heading={'Employee Transfer'} />
            <DetailsDivContainer data={employee_data} />
            <div className='uni_container'>
                <h3 className='uni_heading'>Transfer Information</h3>
                <AdditionalInfoContainer data={transfer_info} />
            </div>
           
        </React.Fragment>
    )
}

export default EmployeeTransferDetails