import React, { useEffect, useState } from 'react'
import BottomButtonContainer from '../../../Components/BottomButtonContainer/BottomButtonContainer'
import ExtraDetails from '../../../Components/ExtraDetails/ExtraDetails'
import Heading from '../../../Components/Heading/Heading'
import LabeledInput from '../../../Components/LabeledInput/LabeledInput'
import DetailsDivContainer from '../../../UI/DetailsDivContainers/DetailsDivContainer'
import classes from './AddTransfer.module.css'
import ExpenseSearchBar from '../../../Components/ExpenseSearchBar/ExpenseSearchBar'
import SelectTag from '../../../Components/SelectTag/SelectTag'
import Img from '../../../assets/shop.png'
import Cookies from 'universal-cookie'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import useHttp from '../../../Hooks/use-http'
useHttp
const AddTransfer = () => {
  const cookies = new Cookies()
  const token = cookies.get('token')
  const navigate=useNavigate()
    const [employee_data,setEmployeeData]=useState([])
    const [time, setTime] = useState('')
    const [date, setDate] = useState('')
    const [text, setText] = useState('')
    const [notes,setNotes]=useState('')
    const [noData,setNoData]=useState(false)
    const [floors, setFloors] = useState([])
    const [stores, setStores] = useState([])
    const [storeDepartments, setStoreDepartments] = useState([])
    const [selectedFloor, setSelectedFloor] = useState('')
    const [selectedStore, setSelectedStore] = useState('')
    const [selectedStoreDepartments, setSelectedStoreDepartments] = useState('')
    const [floor_id_from, setFloorIdFrom] = useState('')
    const [store_id_from, setStoreIdFrom] = useState('')
    const [store_department_id_from, setStoreDeptIdFrom] = useState('')

    const [searchtext, setSearchText] = useState('')
    const [categories,setCategories]=useState([])
    const [subCategories,setSubCategories]=useState([])
    const [category,setCategory]=useState(null)
    const [subCategory,setSubCategory]=useState(null)
    const [amount,setAmount]=useState(null)
    const { sendRequest: fetchFloors } = useHttp()
    const { sendRequest: fetchStores } = useHttp()
    const { sendRequest: fetchStoreDepartments } = useHttp()

const [employee_id,setEmployeeId]=useState(null)
    const url = "http://localhost:9000/"
    
    const searchHandler = (data) => {  
        const headers={"Authorization":"Bearer "+token}
        axios.get(url+"api/getEmployeeDetails?employee_query="+data,{headers}).then((response)=>{
            if(response.data.employeesResult.length>0){
            setEmployeeId(response.data.employeesResult[0].id)
            setEmployeeData([
                {
                    title:"Name",
                    value:response.data.employeesResult[0].name
                  },
                {
                    title:"Employee ID",
                    value:response.data.employeesResult[0].empID
                  },
                  {
              title:'SuperVisor Name',
              value:response.data.headEmployeesResult[0]?.head_employee_name
                  },{
                    title:'Designation',
              value:response.data.employeesResult[0].role_name
                  },,{
                    title:'Department',
              value:response.data.employeesResult[0].department_name
                  },{
                    title:'Floor Name',
              value:response.data.employeesResult[0].floor_name
              
                    }, {
                      title: 'Gender',
                      value: response.data.employeesResult[0].gender
              
                    }, {
                      title: 'Store name',
                      value: response.data.employeesResult[0].store_name
                    }, {
                      title: 'Store Department',
                      value: response.data.employeesResult[0].store_department_name
                    }
            ])
    setNoData(false)
            }
            else{
                setNoData(true)
            }
           setFloorIdFrom( response.data.employeesResult[0].floor_id)
           setStoreIdFrom(response.data.employeesResult[0].store_id)
           setStoreDeptIdFrom(response.data.employeesResult[0].store_department_id)
    
        })
    
    
    }

     useEffect(()=>{
        const listFloors = (floors) => {
            setFloors(floors)
          }
        fetchFloors({ url: 'http://localhost:9000/api/getFloors' }, listFloors)
        const listStores = (stores) => {
            setStores(stores)
          }
        fetchStores({ url: 'http://localhost:9000/api/getStores' }, listStores)
        const listStoreDepartments = (storeDepartments) => {
            setStoreDepartments(storeDepartments)
          }
        fetchStoreDepartments({ url: 'http://localhost:9000/api/getStoreDep' }, listStoreDepartments)

     },[])
function add(){
    const headers={"Authorization":"Bearer "+token}
    axios.post(url+"api/addTransferWithStoreId",{
        "employee_id":employee_id,
        "floor_id_to":selectedFloor,
        "floor_id_from":floor_id_from,
        "department_to":selectedStoreDepartments,
        "department_from":store_department_id_from,
        "store_id_from":store_id_from,
        "store_id_to":selectedStore
    },{headers}).then((response)=>{
if(response){
    navigate(-1) 
}
    })
   
}
function cancel(){
    const navigate=useNavigate()
    navigate(-1) 
}




    return (
        <React.Fragment>
            <Heading heading={'Add Transfer'} />
            <ExpenseSearchBar func={searchHandler} />
            {searchtext === ''&& noData ? '' :noData?<h6>NO User Found</h6>: <DetailsDivContainer data={employee_data} />}
            <div className='uni_container'>
                <div className={classes.inner_container}>
                    <div className={classes.add_expense_seleecct_container}>
                        <label htmlFor="slt">Change Floor</label>
                        <SelectTag usingid={true} data={floors} title={'Floor'} selectedVal={setSelectedFloor} img={Img} />
                    </div>
                    <div className={classes.add_expense_seleecct_container}>
                    <label htmlFor="slt">Change Store</label>
                        <SelectTag  usingid={true}data={stores} title={'Store'} selectedVal={setSelectedStore} img={Img} />
                    </div>
                    <div className={classes.add_expense_seleecct_container}>
                    <label htmlFor="slt"> Change Department</label>
                        <SelectTag  usingid={true} data={storeDepartments} title={'Store Departments'} selectedVal={setSelectedStoreDepartments} img={Img} />
                    </div>
                   
                </div>
               
            </div>
            <BottomButtonContainer cancel={'Cancel'} approve={'Add Transfer'} func={true} func1={cancel} func2={add}/>
        </React.Fragment>
    )
}

export default AddTransfer