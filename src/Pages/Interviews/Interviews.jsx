import React, { useEffect } from 'react'
import Heading from '../../Components/Heading/Heading'
import TileContainer from '../../UI/TileContainer/TileContainer'
import DropDownFilter from '../../Components/DropDownFilter/DropDownFilter'
import Filter from '../../Components/Filter/Filter'
import moment from 'moment/moment'
import useHttp from '../../Hooks/use-http'
import axios from 'axios'
import Pagination from '../../Components/Pagination/Pagination'
import Cookies from 'universal-cookie'
import Data from './data'
import MainTable from '../../Components/MainTable/MainTable'
import InterviewModal from '../../Components/AllModals/InterviewModal'
import { useState } from 'react'
import InterviewFilter from '../../Components/InterviewFilter/InterviewFilter'

const Interviews = () => {
  const url = "http://localhost:9000/"
  // Here is our data for tile in the page
  const [date, setDate] = useState(new Date())
  const [data, setData] = useState([])
  const [interviewData,setInterviewData]=useState([])
  const [limit, setLimit] = useState(10)
  const [offset, setOffset] = useState(0)
  const [total,setTotal]=useState(0)
  const [employeeFilter, setEmployeeFilter] = useState({
    interviewer_name: '',
    floor_name: "",
    interviewee_name: "",
    location_name: ""
  })
  const cookies = new Cookies();
  const { sendRequest: fetchInterview } = useHttp()
  const [TileData, setTileData] = useState([])
  useEffect(() => {
    const token = cookies.get('token')
    const headers = { "Authorization": "Bearer " + token }
    let from_date = moment()
    axios.get(url+"api/getEmployeesBasedOnRole?role_name='Floor Incharge'&role_name='location Incharge'",{headers}).then((response)=>{
setInterviewData(response.data)
    })
    const listInterview = (interview) => {

      interview.forEach((data) => {
        data.date_time = data.date_time.split("T")[0].split("-").reverse().join("-")
      })
      setData(interview)
    }
    fetchInterview({ url: url + "api/getInterview?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + from_date.add(1, 'd').format("YYYY-MM-DD") + "&limit=" + limit + "&offset=" + offset  }, listInterview)
    from_date = moment()
    const listTotal = (interview) => {

     
      setTotal(interview.length)
    }
    fetchInterview({ url: url + "api/getInterview?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + from_date.add(1, 'd').format("YYYY-MM-DD")   }, listTotal)
    from_date = moment()
    axios.get(url + "api/getTotalInterviews?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + from_date.add(1, 'd').format("YYYY-MM-DD"), { headers }).then((response) => {

      from_date = moment().subtract(1, 'd')
      axios.get(url + "api/getTotalInterviews?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + from_date.add(1, 'd').format("YYYY-MM-DD"), { headers }).then((responseOne) => {

        from_date = moment()
        axios.get(url + "api/getTotalInterviews?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + from_date.add(1, 'd').format("YYYY-MM-DD") + "&status='Trial'", { headers }).then((responseTwo) => {
          from_date = moment().subtract(1, 'd')
          axios.get(url + "api/getTotalInterviews?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + from_date.add(1, 'd').format("YYYY-MM-DD") + "&status='Trial'", { headers }).then((responseThird) => {

            from_date = moment()
            axios.get(url + "api/getTotalInterviews?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + from_date.add(1, 'd').format("YYYY-MM-DD") + "&status='Rejected'", { headers }).then((responseFourth) => {
              from_date = moment().subtract(1, 'd')
              axios.get(url + "api/getTotalInterviews?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + from_date.add(1, 'd').format("YYYY-MM-DD") + "&status='Rejected'", { headers }).then((responseFifth) => {

                from_date = moment()
                
                axios.get(url + "api/getTotalInterviews?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + from_date.add(1, 'd').format("YYYY-MM-DD") + "&status='Permanent'", { headers }).then((responseSixth) => {
                  from_date = moment().subtract(1, 'd')
                  axios.get(url + "api/getTotalInterviews?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + from_date.add(1, 'd').format("YYYY-MM-DD") + "&status='Permanent'", { headers }).then((responseSeventh) => {
                  setTileData([
                    {
                      title: 'Total Interviews',
                      value: response.data[0].count_id ,
                      num:   response.data[0].count_id - responseOne.data[0].count_id 
                    },
                    {
                      title: 'Total Trials',
                      value: responseTwo.data[0].count_id
                      ,
                      num: responseTwo.data[0].count_id
                        - responseThird.data[0].count_id
                    },
                    {
                      title: 'Total Rejected',
                      value: responseFourth.data[0].count_id,
                      num: responseFourth.data[0].count_id
                      - responseFifth.data[0].count_id
                    },
                    {
                      title: 'Total Permanent',
                      value: responseSixth.data[0].count_id,
                      num: responseSixth.data[0].count_id
                      - responseSeventh.data[0].count_id
                    }
                  ])
                })
              })
            })
          })
        })
      })
    })

    })
  }, [])
  useEffect(() => {
    let from_date = moment(date)

    let getString = url + "api/getInterview?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + from_date.add(1, 'd').format("YYYY-MM-DD") + "&limit=" + limit + "&offset=" + offset+ "&status='Pending'"
    if (employeeFilter.interviewer_name != '') {
      getString += "&interviewer_name=" + employeeFilter.interviewer_name
    }
    if (employeeFilter.interviewee_name != '') {
      getString += '&interviewee_name=' + employeeFilter.interviewee_name
    }
    if (employeeFilter.floor_name != '') {
      getString += "&floor_name=" + employeeFilter.floor_name
    }
    if (employeeFilter.location_name != '') {
      getString += "&location_name=" + employeeFilter.location_name
    }

    const listInterview = (interview) => {

      interview.forEach((data) => {
        data.date_time = data.date_time.split("T")[0].split("-").reverse().join("-")
      })
      setData(interview)
    }
    fetchInterview({ url: getString }, listInterview)
    from_date = moment(date)

  getString = url + "api/getInterview?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + from_date.add(1, 'd').format("YYYY-MM-DD") +  "&status='Pending'"
    if (employeeFilter.interviewer_name != '') {
      getString += "&interviewer_name=" + employeeFilter.interviewer_name
    }
    if (employeeFilter.interviewee_name != '') {
      getString += '&interviewee_name=' + employeeFilter.interviewee_name
    }
    if (employeeFilter.floor_name != '') {
      getString += "&floor_name=" + employeeFilter.floor_name
    }
    if (employeeFilter.location_name != '') {
      getString += "&location_name=" + employeeFilter.location_name
    }

    const listTotal = (interview) => {

      
      setTotal(interview.length)
    }
    fetchInterview({ url: getString }, listTotal)
  }, [date, limit, offset, employeeFilter])
  const selectBylocation = (data) => {

    setEmployeeFilter((prevState) => {
      return { ...prevState, location_name: data }
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
  const changeByInterviewer = (data) => {

    // if(data.charAt(0)!=='1')
    //  {

    setEmployeeFilter((prevState) => {
      return { ...prevState, interviewer_name: data }
    })
  }
  const changeByInterviewee = (data) => {

    setEmployeeFilter((prevState) => {
      return { ...prevState, interviewee_name: data }
    })

  }
  const selectEntries = (data) => {
    setLimit(data)
  }
  const selectPage = (data) => {
    console.log(data)
    setOffset((data - 1) * limit)
  }
  // Table Headings, Data and Keys
  const tableHeadings = [
    { heading: 'Interviewee' },
    { heading: 'Interview Date' },
    { heading: 'Interviewer' },
    { heading: 'Reference' },
    { heading: 'Remarks' },
    { heading: 'Status' },
  ]

  const tableKeys = [
    'employee_name', 'date_time', 'interviewer_name', 'reference', 'remarks', 'status'
  ]

  const [newval, setNewVal] = useState(false)
  const [obj, setObj] = useState({})

  const changeModalState = ([val, element]) => {
   
    setNewVal(val)
    setObj(element)
  }
console.log(Data)
  return (
    <React.Fragment>
      <Heading heading={'Interviews'} Btn={'Interview'} Btn_link={'/add_interview'} />
      <TileContainer Data={TileData} />
      <InterviewFilter data={data} data2={interviewData} changeDate={changeDate} changeByInterviewee={changeByInterviewee} changeByInterviewer={changeByInterviewer} />
      <MainTable func={changeModalState} Lnk4={true} link1={false} t3={'Interview Details'} App_Btn={true}  height={true} headings={tableHeadings} keys={tableKeys} link2={false}  data={data} />
      <InterviewModal value={newval} setval={setNewVal} Obj={obj}  />
      <Pagination selectEntries={selectEntries} selectPage={selectPage} offset={offset} limit={limit} total={total} />
    </React.Fragment>
  )
}
// else if(error!==null &loading){
  <React.Fragment>
    <h1>Loading</h1>
    </React.Fragment>


export default Interviews