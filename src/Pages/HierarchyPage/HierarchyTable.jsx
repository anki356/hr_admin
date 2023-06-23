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
            {/* <img src={url+props?.data?.photo} alt="" /> */}
             <h4>{props?.data?.name}</h4>
            {/* <p>{props.role_name}</p> */} 
            {/* <p>Location : location 1 4th Floor</p> */}
            <div className={classes.hc_no_of_child}>
                3 <img src={user} alt="" />
            </div>
        </div>
    );
}

const EmployeeNode = (props) => {
    return (
      <>
      
        {props.data.employees.map((element, index) => (
          
          <TreeNode
            key={index}
            label={
              <div className={classes.ht_nodes}>
                <Card data={element} />
                <span>{props.data.role_name}</span>
              </div>
            }
          >
            {props.data.children.map((el, idx) => (
              <EmployeeNode key={idx} data={el} />
            ))}
          </TreeNode>
        ))}
      </>
    );
  };
const HierarchyTable = (props) => {
    const[super_admin,setSuperAdmin]=useState([])
   const [admin,setAdmin]=useState([])
   const [officeHierarchy,setOfficeHierarchy]=useState([])
   const[storeHierarchy,setStoreHierarchy]=useState([])
   const[warehouseHierarchy,setWareHouseHierarchy]=useState([])

    const cookies = new Cookies();
    const token = cookies.get('token')
    useEffect(()=>{
      setOfficeHierarchy([])
      setStoreHierarchy([])
      setWareHouseHierarchy([])
      console.log(props.locationSelected)
      const headers={"Authorization":"Bearer "+token}
      if(props.deptSelected===null){
        switch (props.locationSelected) {
  
          case "1":
            axios.get(url+"api/getHierarchy?location_id=1",{headers}).then((response)=>{
          
              setOfficeHierarchy(response.data)
              
              })
        
            break;
          case "2":
            axios.get(url+"api/getHierarchy?location_id=2",{headers}).then((response)=>{
          
              setStoreHierarchy(response.data)
              
              })
        
            break;
          case "3":
            axios.get(url+"api/getHierarchy?location_id=3",{headers}).then((response)=>{
          
              setWareHouseHierarchy(response.data)
              
              })
        
            break;
        
          default:
            break;
        }
      }
      else{
        setOfficeHierarchy([])
        setStoreHierarchy([])
        setWareHouseHierarchy([])
        const headers={"Authorization":"Bearer "+token}
        var officeDepartments=[3,7,9,13,14,15,6]
        var storeDepartments=[1,4,5,14,16,17]
  var warehouseDepartments=[5,11,12,14,18]
  console.log(officeDepartments.includes(Number(props.deptSelected)))
       if(officeDepartments.includes(Number(props.deptSelected))){
        if(props.locationSelected==='1'||props.locationSelected===null){
  
          axios.get(url+"api/getHierarchy?location_id=1&department_id="+props.deptSelected,{headers}).then((response)=>{
      
            setOfficeHierarchy(response.data)
            })
        }
       }
        if (storeDepartments.includes(Number(props.deptSelected))){
          if(props.locationSelected==='2'||props.locationSelected===null){
            axios.get(url+"api/getHierarchy?location_id=2&department_id="+props.deptSelected,{headers}).then((response)=>{
      
              setStoreHierarchy(response.data)
              })
          }
       }
       if (warehouseDepartments.includes(Number(props.deptSelected))){
        if(props.locationSelected==='3'||props.locationSelected===null){
          axios.get(url+"api/getHierarchy?location_id=3&department_id="+props.deptSelected,{headers}).then((response)=>{
    
            setWareHouseHierarchy(response.data)
            })
        }
     }
      }

    },[props.locationSelected,props.deptSelected])
    useEffect(()=>{
   
    },[props.deptSelected])
    useEffect(()=>{
        const headers={"Authorization":"Bearer "+token}
axios.get(url+"api/getHierarchy?location_id=1",{headers}).then((response)=>{
  
setOfficeHierarchy(response.data)
})
axios.get(url+"api/getHierarchy?location_id=2",{headers}).then((response)=>{
  
setStoreHierarchy(response.data)
})
axios.get(url+"api/getHierarchy?location_id=3",{headers}).then((response)=>{
  
setWareHouseHierarchy(response.data)
})


    },[])
//     useEffect(()=>{
//         const headers={"Authorization":"Bearer "+token}
// axios.get(url+"api/getEmployeesBasedOnRole?role_name='Super Admin'",{headers}).then((response)=>{
// setSuperAdmin(response.data)
// })
// axios.get(url+"api/getEmployeesBasedOnRole?role_name='Admin'",{headers}).then((response)=>{
//     setAdmin(response.data)
//     })
//     },[])
console.log(officeHierarchy)
    return (
        <div className={classes.hierarchy_table}>
            <Tree label={<div className={classes.ht_nodes}><Card data={super_admin[0]} role_name="Super Admin" /> <span>Super Admin</span></div>}
            
            
            >
              
              <TreeNode
            
            label={
              <div className={classes.ht_nodes}>
              
                <span>{'Office'}</span>
               
              </div>
              
            }
          >
             { officeHierarchy&&officeHierarchy.map((val,index)=>{
                return(
                
                 <EmployeeNode key={index} data={val}></EmployeeNode>
                 
                )
                 
                                    
                                })}
            </TreeNode>
            <TreeNode
            
            label={
              <div className={classes.ht_nodes}>
              
                <span>{'Store'}</span>
               
              </div>
            }
          >
             { storeHierarchy&&storeHierarchy.map((val,index)=>{
return(

 <EmployeeNode key={index} data={val}></EmployeeNode>
 
)
 
                    
                })}
            </TreeNode>
            <TreeNode
            
            label={
              <div className={classes.ht_nodes}>
              
                <span>{'Warehouse'}</span>
                
              </div>
            }
          >
            { warehouseHierarchy&&warehouseHierarchy.map((val,index)=>{
return(

 <EmployeeNode key={index} data={val}></EmployeeNode>
 
)
 
                    
                })}
            </TreeNode>
             
                
                
            </Tree>

        </div>
    )
}

export default HierarchyTable
