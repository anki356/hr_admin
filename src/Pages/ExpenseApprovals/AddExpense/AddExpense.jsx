import React, { useEffect, useState } from 'react'
import BottomButtonContainer from '../../../Components/BottomButtonContainer/BottomButtonContainer'
import ExtraDetails from '../../../Components/ExtraDetails/ExtraDetails'
import Heading from '../../../Components/Heading/Heading'
import LabeledInput from '../../../Components/LabeledInput/LabeledInput'
import DetailsDivContainer from '../../../UI/DetailsDivContainers/DetailsDivContainer'
import classes from './AddExpense.module.css'
import ExpenseSearchBar from '../../../Components/ExpenseSearchBar/ExpenseSearchBar'
import SelectTag from '../../../Components/SelectTag/SelectTag'
import Img from '../../../assets/shop.png'
import Cookies from 'universal-cookie'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const AddExpense = () => {
  const cookies = new Cookies()
  const token = cookies.get('token')
  const navigate=useNavigate()
    const [employee_data,setEmployeeData]=useState([])
    const [time, setTime] = useState('')
    const [date, setDate] = useState('')
    const [text, setText] = useState('')
    const [notes,setNotes]=useState('')
    const [noData,setNoData]=useState(false)

    const [searchtext, setSearchText] = useState('')
    const [categories,setCategories]=useState([])
    const [subCategories,setSubCategories]=useState([])
    const [category,setCategory]=useState(null)
    const [subCategory,setSubCategory]=useState(null)
    const [amount,setAmount]=useState(null)
const [employee_id,setEmployeeId]=useState(null)
    const url = "http://localhost:9000/"
    const timeHandler = (data) => { console.log('time', data);setTime(data) }
    const dateHandler = (data) => { console.log('date', data);setDate(data) }
    const amountHandler = (data) => { console.log('date', data);setAmount(data) }
    const searchHandler = (data) => {  
        const headers={"Authorization":"Bearer "+token}
        axios.get(url+"api/getEmployeeDetails?employee_query="+data,{headers}).then((response)=>{
            if(response.data.employeesResult.length>0){
            setEmployeeId(response.data.employeesResult[0].id)
    setEmployeeData([
        {
            title:"Name",
            value:response.data.employeesResult[0].name
          },{
      title:'SuperVisor Name',
      value:response.data.headEmployeesResult[0]?.head_employee_name
          },{
            title:'Designation',
      value:response.data.employeesResult[0].role_name
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
    
    
    })
}
useEffect(()=>{
    const headers={"Authorization":"Bearer "+token}
axios.get(url+"api/getCategories",{headers}).then((response)=>{
setCategories(response.data)
})
axios.get(url+"api/getSubCategories",{headers}).then((response)=>{
setSubCategories(response.data)
})
    
},[])
     
function add(){
    const headers={"Authorization":"Bearer "+token}
    axios.post(url+"api/addExpenses",{
        "employee_id":employee_id,
        "category_id":category,
        "sub_category_id":subCategory,
        "date":date +" "+ time,
        "amount":amount,
        "notes":notes,
        "status":"Pending" 
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
            <Heading heading={'Add Expense'} />
            <ExpenseSearchBar func={searchHandler} />
            {searchtext === ''&& noData ? '' :noData?<h6>NO User Found</h6>: <DetailsDivContainer data={employee_data} />}
            <div className='uni_container'>
                <div className={classes.inner_container}>
                    <div className={classes.add_expense_seleecct_container}>
                        <label htmlFor="slt">Category</label>
                        <SelectTag usingid={true} select_id={'slt'} title={'Category'} img={Img}  selectedVal={(data)=>setCategory(data)} data={categories} />
                    </div>
                    <div className={classes.add_expense_seleecct_container}>
                        <label htmlFor="slt">Sub Category</label>
                        <SelectTag usingid={true} select_id={'slt'} title={'Sub Category'} img={Img}  selectedVal={(data)=>setSubCategory(data)} data={subCategories} />
                    </div>
                    <LabeledInput func2={timeHandler} id={'time'} ph={'Time'} title={'Time'} img={false} type={'time'} />
                    <LabeledInput func2={dateHandler}  id={'date'} ph={'Date'} title={'Date'} type={'date'} img={false} />
                    <LabeledInput func2={amountHandler} mr={true} id={'amount'} ph={'Amount'} title={'Amount'} type={'text'} img={false} />
                </div>
                <textarea type="text" className={classes.add_expense_textarea}value={notes} onInput={(e)=>setNotes(e.target.value)} />
            </div>
            <BottomButtonContainer cancel={'Cancel'} approve={'Add Expense'} func={true} func1={cancel} func2={add}/>
        </React.Fragment>
    )
}

export default AddExpense