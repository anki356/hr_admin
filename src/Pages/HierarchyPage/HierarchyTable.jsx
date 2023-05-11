import React from 'react'
import { Tree, TreeNode } from 'react-organizational-chart';
import classes from './HierarchyPage.module.css'
import user from '../../assets/User_fill.png'
import img from '../../assets/hcimg.png'

const Card = () => {
    return (
        <div className={classes.hierarchy_card}>
            <img src={img} alt="" />
            <h4>Puneet Shrivastav</h4>
            <p>Admin</p>
            <p>Location : Store 1 4th Floor</p>
            <div className={classes.hc_no_of_child}>
                3 <img src={user} alt="" />
            </div>
        </div>
    );
}

const HierarchyTable = () => {
    return (
        <div className={classes.hierarchy_table}>
            <Tree label={<div className={classes.ht_nodes}><Card /> <span>Admin</span></div>}>
                <TreeNode label={<div className={classes.ht_nodes}><Card /> <span>Sales</span></div>}>
                    <TreeNode label={<div className={classes.ht_nodes}><Card /></div>} />
                    <TreeNode label={<div className={classes.ht_nodes}><Card /></div>} />
                    <TreeNode label={<div className={classes.ht_nodes}><Card /></div>} />
                </TreeNode>
                <TreeNode label={<div className={classes.ht_nodes}><Card /></div>}></TreeNode>
                <TreeNode label={<div className={classes.ht_nodes}><Card /></div>}></TreeNode>
            </Tree>

        </div>
    )
}

export default HierarchyTable
