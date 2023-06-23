import React, { Fragment } from 'react'
import Heading from '../../Components/Heading/Heading'
import HierarchyFilter from './HierarchyFilter'
import HierarchyTable from './HierarchyTable';

import classes from './HierarchyPage.module.css'
import { useState } from 'react';

const HierarchyPage = () => {
    const [locationSelected,setLocationSelected]=useState(null)
    const [deptSelected,setDeptSeleted]=useState(null)

    const selectLocations=(value)=>{
        setLocationSelected(value)
    }
    const selectByDepartment=(value)=>{
        setDeptSeleted(value)
    }
    return (
        <Fragment>
            <Heading heading={'Hierarchy'} />
            <HierarchyFilter selectLocations={selectLocations} selectByDepartment={selectByDepartment}/>
            <div className={classes.hp_table_con}>
            <HierarchyTable locationSelected={locationSelected} deptSelected={deptSelected} />
            </div>
        </Fragment>
    )
}

export default HierarchyPage
