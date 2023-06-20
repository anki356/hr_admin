import React, { useEffect, useState } from 'react'
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
            <img src={url + props?.data?.photo} alt="" />
            <h4>{props?.data?.employee_name}</h4>
            <p>{props.role_name}</p>
            {/* <p>Location : location 1 4th Floor</p> */}
            <div className={classes.hc_no_of_child}>
                {props.cl} <img src={user} alt="" />
            </div>
        </div>
    );
}

const HierarchyTable = () => {
    const [super_admin, setSuperAdmin] = useState([])
    const [admin, setAdmin] = useState([])

    // Locations
    const [data, setData] = useState([])

    const cookies = new Cookies();
    const token = cookies.get('token')

    const getHierarchy = async () => {
        const response = await fetch(`${url}api/getHierarchy`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        })

        const result = await response.json();
        console.log('our loc', result);
        setData(result)
    }

    useEffect(() => {
        getHierarchy();

    }, [])

    return (
        <div className={classes.hierarchy_table}>
            <Tree label={<div className={classes.ht_nodes}>
                <Card data={super_admin[0]} role_name="Super Admin" cl={data.length} /> <span>Super Admin</span></div>}>
                {/* {locations && locations.map((val, index) => {
                    return <TreeNode label={<div className={classes.ht_nodes} onClick={() => updateLocation(index)}>
                        <Card data={val.name} role_name="locations" /> <span>{val.name}</span></div>}>
                        {index == 0 ?
                            officedept.map((element, index) => (
                                <TreeNode label={<div className={classes.ht_nodes}>
                                    <Card data={element} role_name='Office Depatment' /> <span>{element}</span></div>}>
                                </TreeNode>
                            )) : ''
                        }
                        {index == 1 ?
                            storeDept.map((element, index) => (
                                <TreeNode label={<div className={classes.ht_nodes}>
                                    <Card data={element} role_name='Store Department' /> <span>{element}</span></div>}>
                                </TreeNode>
                            )) : ''
                        }
                        {index == 2 ?
                            warehouseDept.map((element, index) => (
                                <TreeNode label={<div className={classes.ht_nodes}>
                                    <Card data={element} role_name='Warehouse Department' /> <span>{element}</span></div>}>
                                </TreeNode>
                            )) : ''
                        }
                    </TreeNode>
                })} */}
                {
                    data.map((element, index) => {
                        return element?.employees?.map((ele, index) => (
                            <TreeNode label={
                                <div className={classes.ht_nodes}>
                                    <Card data={ele.name} role_name={ele.name} /> <span>{element.role_name}</span>
                                </div>}>
                                {
                                    element?.children?.map((val, index) => (
                                        val?.employees?.map((val2, index) => (
                                            <div className={classes.ht_nodes}>
                                                <Card data={val2.name} role_name={val2.name} /> <span>{val.role_name}</span>
                                            </div>
                                        ))
                                    ))
                                }
                            </TreeNode>
                        ))
                    })
                }

            </Tree>

        </div>
    )
}

export default HierarchyTable
