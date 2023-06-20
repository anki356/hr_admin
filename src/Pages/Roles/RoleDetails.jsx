import React, { useState, useEffect } from 'react'

import Heading from '../../Components/Heading/Heading'


import Cookies from 'universal-cookie'
import useHttp from '../../Hooks/use-http'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'




const RoleDetails = () => {
  const cookies = new Cookies();
  const navigate = useNavigate()
  const token = cookies.get('token')
 
  const url = "http://localhost:9000/"

  const [data, setData] = useState([])
  const { sendRequest: fetchRoleDetails } = useHttp()
 const {id}=useParams()
  useEffect(() => {
    const listRole = (Role) => {
    setData(Role)
    }
    fetchRoleDetails({ url: url + "api/getRoleData?id="+id }, listRole)
    
  }, [])

 
 
  
  
  return (
    <React.Fragment>
      <Heading heading={'View Details'} />
      
      <div className='uni_container'>
        <h3 className='uni_heading'>Role Information</h3>
        <div >
          <h5 style={{marginTop:'20px',fontSize:'16px'}}>Username</h5>
          <div>
           {data[0]?.username}
          </div>
        </div>
        <div >
          <h5 style={{marginTop:'20px',fontSize:'16px'}}>Role Name</h5>
          <div>
           {data[0]?.role_name}
          </div>
        </div>
        <div >
          <h5 style={{marginTop:'20px',fontSize:'16px'}}>Floor Name</h5>
          <div>
           {data[0]?.floor_name}
          </div>
        </div>
        <div >
          <h5 style={{marginTop:'20px',fontSize:'16px'}}>location Name</h5>
          <div>
           {data[0]?.location_name}
          </div>
        </div>
       
        {/* <div >
          <h5 style={{marginTop:'20px',fontSize:'16px'}}>Reasons & Remarks</h5>
          <div>
           {reason}
          </div>
        </div>
        <div >
          <h5 style={{marginTop:'20px',fontSize:'16px'}}>Status</h5>
          <div>
           {status}
          </div>
        </div> */}
      </div>
      
      {/* <div className={classes.container}>
        <div>
          <div>Loan Amount</div>
          <div>{loanData[0]?.amount}</div>
        </div>
        <div>
          <div>Tenure</div>
          <div>{loanData[0]?.tenure}</div>
        </div>
        <div>
          <div>Approval Status</div>
          <div>{loanData[0]?.status}</div>
        </div>
        <div>
          <div>Month</div>
          <div>{monthArray[loanEMIData[0]?.month]}</div>
        </div>
      </div> */}

      <br />
     
     
    </React.Fragment>
  )
}

export default RoleDetails 