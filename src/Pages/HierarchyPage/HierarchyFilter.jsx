import React, { useState } from 'react'
import classes from './HierarchyPage.module.css'
import downarrow from '../../assets/vector9.png'
import search from '../../assets/search.png'
import remove from '../../assets/remove.png'
import close from '../../assets/close.png'
import SelectTag from '../../Components/SelectTag/SelectTag'

import Img from '../../assets/shop.png'
import { useEffect } from 'react'
import useHttp from '../../Hooks/use-http'
const HierarchyFilter = (props) => {
    const { sendRequest: fetchlocations } = useHttp()
    const { sendRequest: fetchDepartments } = useHttp()
    const [active, setActive] = useState(false)
    const [locations,setLocations]=useState([])
    const[departments,setDepartments]=useState([])
const selectBylocation=(data)=>{
props.selectLocations(data)
}
const selectByDepartment=(data)=>{
    props.selectByDepartment(data)
}
useEffect(()=>{
    const listlocations = (locations) => {
        setLocations(locations)
      }
      fetchlocations({ url: 'http://localhost:9000/api/getLocations' }, listlocations)
      const listDepartments = (depts) => {
        setDepartments(depts)
      }
fetchDepartments({url:'http://localhost:9000/api/getDepartments'},listDepartments)
},[])
    return (
        <div className={classes.filter_container}>
            <div className={classes.filter_component}>
                <div className={classes.filter_select_container}>
                    {/* <button onClick={()=>{setActive(!active)}}>
                        Filters
                        <img src={downarrow} alt="" />
                    </button>
                    <div style={active===true ? {display:'block'} : {display:'none'}} className={classes.filter_list_1}>
                        <div>location</div>
                        {/* <div>Categories</div> 
                        <div>Departments</div>
                       <div>Designation</div>
                        <div>Grade</div>
                        <div>Emp Id</div>
                        <div>Other</div> 
    </div> */}
     <div className={classes.filter_select_container}>
    <SelectTag usingid={true} data={locations} title={'Location'} selectedVal={selectBylocation} img={Img} />
    </div>
                </div>
                <SelectTag usingid={true} data={departments} title={'Department'} selectedVal={selectByDepartment} img={false} />        
                <div className={classes.filter_btns}>
                    <button><img src={search} alt="" /></button>
                    <button><img src={remove} alt="" /></button>
                </div>
            </div>
            <div className={classes.filter_tags_container}>
                {/* <span>Department <img src={close} alt="" /></span> */}
                {/* <span>Floor <img src={close} alt="" /></span>
                <span>Sales Section <img src={close} alt="" /></span> */}
            </div>
        </div>
    )
}

export default HierarchyFilter
