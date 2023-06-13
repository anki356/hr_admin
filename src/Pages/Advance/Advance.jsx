import React, { useState, useEffect } from 'react'
import Heading from '../../Components/Heading/Heading'
import TileContainer from '../../UI/TileContainer/TileContainer'
import DropDownFilter from '../../Components/DropDownFilter/DropDownFilter'
import Filter from '../../Components/Filter/Filter'
import moment from 'moment/moment'
import useHttp from '../../Hooks/use-http'
import axios from 'axios'
import Pagination from '../../Components/Pagination/Pagination'
import Cookies from 'universal-cookie'
// Data for Table
import Data from './data'
import MainTable from '../../Components/MainTable/MainTable'
import AddAdvanceModal from '../../Components/AllModals/AddAdvanceModal'

const Advance = () => {
  const url = "http://localhost:9000/"
  
  // Here is our data for tile in the page
  const [date, setDate] = useState(null)
  const [data, setData] = useState([])
  const [limit, setLimit] = useState(10)
  const [offset, setOffset] = useState(0)
  const [employeeFilter, setEmployeeFilter] = useState({
    employee_query: '',
    floor_name: "",
    role_name: "",
    store_name: ""
  })
  const cookies = new Cookies();
  const { sendRequest: fetchAdvance } = useHttp()
  const [TileData, setTileData] = useState([])

  const [SuperVisor, setSuperVisor] = useState(null)
  const token = cookies.get('token')
  // Here is our data for tile in the page
  
  useEffect(() => {

    const headers = { "Authorization": "Bearer " + token }
   
    let from_date = moment()
    axios.get(url + "api/getTotalAdvanceGranted?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + from_date.add(1, 'd').format("YYYY-MM-DD"), { headers }).then((response) => {

      from_date = moment().subtract(1, 'd')
      axios.get(url + "api/getTotalAdvanceGranted?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + from_date.add(1, 'd').format("YYYY-MM-DD"), { headers }).then((responseOne) => {

        from_date = moment()
        axios.get(url + "api/getTotalEmployeesGranted?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + from_date.add(1, 'd').format("YYYY-MM-DD"), { headers }).then((responseTwo) => {
          from_date = moment().subtract(1, 'd')
          axios.get(url + "api/getTotalEmployeesGranted?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + from_date.add(1, 'd').format("YYYY-MM-DD"), { headers }).then((responseThird) => {

            from_date = moment()
            axios.get(url + "api/getTotalUnpaidAdvance?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + from_date.add(1, 'd').format("YYYY-MM-DD"), { headers }).then((responseFourth) => {



              let from_date_out = moment()
              axios.get("http://localhost:9000/api/getTotalOutSessions?from_date=" + from_date_out.format("YYYY-MM-DD") + "&to_date=" + from_date_out.add(1, 'd').format("YYYY-MM-DD"), { headers }).then((responseSixth) => {
                let totalOut = responseSixth.data[0]?.count_id
                response.data[0].amount = response.data[0].amount === null ? 0 : response.data[0].amount
                responseOne.data[0].amount = responseOne.data[0].amount === null ? 0 : responseOne.data[0].amount

                setTileData([
                  {
                    title: 'Total Advance ',
                    value: response.data[0].amount,
                    num: response.data[0].amount - responseOne.data[0].amount
                  },
                  {
                    title: 'Total Emp Granted',
                    value: responseTwo.data[0].count_id
                    ,
                    num: responseTwo.data[0].count_id
                      - responseThird.data[0].count_id
                  },
                  {
                    title: 'Pending Payments Emp',
                    value: responseFourth.data[0].count_id,

                  },
                  {
                    title: 'Out From Store',
                    value: totalOut
                  }
                ])
              })
            })
          })
        })
      })
    })

  }, [])
  useEffect(() => {
    // let token=localStorage.getItem('token')
    // if(token===null){
    // navigate('/login')
    // }
    // const headers={"Authorization":"Bearer "+token}
    //getAdvances
    if(employeeFilter.store_name!=''){
      let getString = url + "api/getAdvances?store_name="+employeeFilter.store_name+"&limit="+limit+"&offset="+offset
      if(employeeFilter.employee_query!=''){
        getString+="&employee_query="+employeeFilter.employee_query
    }
        if(employeeFilter.role_name!=''){
          getString+='&role_name='+employeeFilter.role_name
        }
        if(employeeFilter.floor_name!=''){
          getString+="&floor_name="+employeeFilter.floor_name
        }
       
        if(date!=null){
          let from_date=moment(date)
          getString+="&from_date="+from_date.format("YYYY-MM-DD")+"&to_date="+from_date.add(1,'d').format("YYYY-MM-DD")
        }
       
        const listAdvance = (advance) => {
          setData(advance)
        }
        fetchAdvance({ url: getString }, listAdvance)

      }  
  

    // axios.get(getString,{headers}).then((response)=>{
    //       setData(response.data)
    //   })
  }, [date, limit, offset, employeeFilter])



  // Table Headings, Data and Keys
  const tableHeadings = [
    { heading: 'Employee Name' },
    { heading: 'Employee ID' },
    { heading: 'Floor' },
    { heading: 'Store' },
    { heading: 'Designation' },
    { heading: 'Advance' },
    {heading:'Request Status'}
  ]

  const tableKeys = [
    'employee_name', 'empID', 'floor_name', 'store_name','role_name', 'amount','status'
  ]
  const [newval, setNewVal] = useState(false)
  const [obj, setObj] = useState({})

  const changeModalState = ([val, element]) => {
    const headers = { "Authorization": "Bearer " + token }
    axios.get(url + "api/getEmployeeDetails?id=" + element.employee_id, { headers }).then((response) => {
      setSuperVisor(response.data.headEmployeesResult[0]?.head_employee_name)
    })
    setNewVal(val)
    setObj(element)
  }
  const selectByStore = (data) => {

    setEmployeeFilter((prevState) => {
      return { ...prevState, store_name: data }
    })

  }
  const selectByFloor = async (data) => {

    setEmployeeFilter((prevState) => {
      return { ...prevState, floor_name: data }
    })
  }

  const changeDate = (data) => {
    setLimit(10)
    setOffset(0)
    setDate(data)
  }
  const changeByEmployee = (data) => {

    // if(data.charAt(0)!=='1')
    //  {

    setEmployeeFilter((prevState) => {
      return { ...prevState, employee_query: data }
    })
  }
  const changeByDesignation = (data) => {

    setEmployeeFilter((prevState) => {
      return { ...prevState, role_name: data }
    })

  }
  const selectEntries = (data) => {
    setLimit(data)
  }
  const selectPage = (data) => {
    console.log(data)
    setOffset((data - 1) * limit)
  }


  return (
    <React.Fragment>
      <Heading heading={'Advance'}  Btn_link={'/add_advance'} Btn={'Advance'}  />
      <TileContainer Data={TileData} />
      <DropDownFilter title1={'Floor'} title2={'Store'}
        selectByFloor={selectByFloor} selectByStore={selectByStore} />
      <Filter data={data} changeDate={changeDate} changeByDesignation={changeByDesignation} changeByEmployee={changeByEmployee} />
      <MainTable func={changeModalState} Lnk3={true} link1={'/advance_approvals'} link2={'/advance_details'} link4={false} App_Btn={false} data={data} height={true} Btn={false} headings={tableHeadings} keys={tableKeys}  />

      <Pagination selectEntries={selectEntries} selectPage={selectPage} />
    </React.Fragment>
  )
}
// else if(error!==null &loading){
<React.Fragment>
  <h1>Loading</h1>
</React.Fragment>
export default Advance