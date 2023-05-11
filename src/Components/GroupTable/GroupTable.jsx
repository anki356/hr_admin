import React from 'react'
import classes from './GroupTable.module.css'

const GroupTable = () => {
    return (
        <div className={classes.container}>
            <div className={classes.table_header}>
                <div>Earning</div>
                <div>Deduction</div>
            </div>
            <div className={classes.table_body}>
                <div className={classes.table_body_div}>
                    <div className={classes.table_body_data_div}>
                        Computed Salary <span>₹14452</span>
                    </div>
                    <div className={classes.table_body_data_div}>
                        Commission <span>₹14452</span>
                    </div>
                    <div className={classes.table_body_data_div}>
                        Food Allowence <span>₹14452</span>
                    </div>
                    <div className={classes.table_body_data_div}>
                        Other <span>₹14452</span>
                    </div>
                    <div className={classes.table_body_data_div}>
                        Gross Salary <span>₹14452</span>
                    </div>
                    <div className={classes.table_body_data_div}>
                    </div>
                    <div className={classes.table_body_data_div}>
                    </div>
                    <div className={classes.table_body_data_div}>
                        Total : <span>₹14452</span>
                    </div>
                </div>
                <div className={classes.table_body_div}>
                    <div className={classes.table_body_data_div}>
                        Advance <span>₹14452</span>
                    </div>
                    <div className={classes.table_body_data_div}>
                        Adv. EMI <span>₹14452</span>
                    </div>
                    <div className={classes.table_body_data_div}>
                        Total Fine <span>₹14452</span>
                    </div>
                    <div className={classes.table_body_data_div}>
                        Advance Salary <span>₹14452</span>
                    </div>
                    <div className={classes.table_body_data_div}>
                        Other <span>₹14452</span>
                    </div>
                    <div className={classes.table_body_data_div}>
                        ESI <span>₹14452</span>
                    </div>
                    <div className={classes.table_body_data_div}>
                        PF <span>₹14452</span>
                    </div>
                    <div className={classes.table_body_data_div}>
                        <span></span> <span>₹14452</span>
                    </div>
                </div>
            </div>
            <div className={classes.table_footer}>
                <div className={classes.table_footer_data}>
                    Net Salary <span>₹15791</span>
                </div>
                <div className={classes.table_footer_data}>
                    Paid Incentive <span>₹00</span>
                </div>
                <div className={classes.table_footer_data}>
                    Remaining Advance <span>₹00</span>
                </div>
            </div>
        </div>
    )
}

export default GroupTable
