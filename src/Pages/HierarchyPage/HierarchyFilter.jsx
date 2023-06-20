import React, { useState } from 'react'
import classes from './HierarchyPage.module.css'
import downarrow from '../../assets/vector9.png'
import search from '../../assets/search.png'
import remove from '../../assets/remove.png'
import close from '../../assets/close.png'


const HierarchyFilter = () => {

    const [active, setActive] = useState(false)

    return (
        <div className={classes.filter_container}>
            <div className={classes.filter_component}>
                <div className={classes.filter_select_container}>
                    <button onClick={()=>{setActive(!active)}}>
                        Filters
                        <img src={downarrow} alt="" />
                    </button>
                    <div style={active===true ? {display:'block'} : {display:'none'}} className={classes.filter_list_1}>
                        <div>location</div>
                        <div>Categories</div>
                        <div>Departments</div>
                        <div>Designation</div>
                        <div>Grade</div>
                        <div>Emp Id</div>
                        <div>Other</div>
                    </div>
                </div>
                <div className={classes.filter_btns}>
                    <button><img src={search} alt="" /></button>
                    <button><img src={remove} alt="" /></button>
                </div>
            </div>
            <div className={classes.filter_tags_container}>
                <span>Department <img src={close} alt="" /></span>
                <span>Floor <img src={close} alt="" /></span>
                <span>Sales Section <img src={close} alt="" /></span>
            </div>
        </div>
    )
}

export default HierarchyFilter
