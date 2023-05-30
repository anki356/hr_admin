import React from 'react'
import classes from './Spl_Grade_table.module.css'

const Spl_Grade_table = (props) => {
    return (
        <div className={classes.table}>
            <div className={classes.header}>
                <span>Criteria</span>
                <span>Marks</span>
            </div>
            <div className={classes.body}>
                <div className={classes.body_div}>
                    <span>Value </span>
                    <span>1</span>
                </div>
                <div className={classes.body_div}>
                    <span>Value </span>
                    <span>1</span>
                </div>
                <div className={classes.body_div}>
                    <span>Value </span>
                    <span>1</span>
                </div>
            </div>
            {
                props.children
            }
        </div>
    )
}

export default Spl_Grade_table