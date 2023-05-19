import React,{useEffect,useState} from 'react'
import { Tree, TreeNode } from 'react-organizational-chart';
import classes from './HierarchyPage.module.css'
import user from '../../assets/User_fill.png'
import img from '../../assets/hcimg.png'

import Cookies from 'universal-cookie'
import axios from 'axios'
const url = "http://localhost:9000/"
const Card = (props) => {
    
    return (
        <div className={classes.hierarchy_card}>
            <img src={url+props?.data?.photo} alt="" />
            <h4>{props?.data?.employee_name}</h4>
            <p>{props.role_name}</p>
            {/* <p>Location : Store 1 4th Floor</p> */}
            <div className={classes.hc_no_of_child}>
                3 <img src={user} alt="" />
            </div>
        </div>
    );
}

const HierarchyTable = () => {
    const[super_admin,setSuperAdmin]=useState([])
   const [admin,setAdmin]=useState([])
    const cookies = new Cookies();
    const token = cookies.get('token')
    useEffect(()=>{
        const headers={"Authorization":"Bearer "+token}
axios.get(url+"api/getEmployeesBasedOnRole?role_name='Super Admin'",{headers}).then((response)=>{
setSuperAdmin(response.data)
})
axios.get(url+"api/getEmployeesBasedOnRole?role_name='Admin'",{headers}).then((response)=>{
    setAdmin(response.data)
    })
    },[])
    
    return (
        <div className={classes.hierarchy_table}>
            <Tree label={<div className={classes.ht_nodes}><Card data={super_admin[0]} role_name="Super Admin" /> <span>Super Admin</span></div>}>
               { admin.map((val)=>{
                    return <TreeNode label={<div className={classes.ht_nodes}><Card data={val} role_name="Admin" /> <span>Admin</span></div>}></TreeNode>
                })}
                
                
            </Tree>

        </div>
    )
}

export default HierarchyTable
