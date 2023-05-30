import React from 'react'
import Heading from '../../../Components/Heading/Heading'
import DetailsDivContainer from '../../../UI/DetailsDivContainers/DetailsDivContainer'
import Spl_Grade_table from '../../../Components/Spl_Grade_Table/Spl_Grade_table'
import classes from './View_Grade.module.css'

const employee_data = [
    {
        title: 'Name',
        value: 'Puneet Shrivastav'
    }
]



const View_Grade = () => {
    return (
        <React.Fragment>
            <Heading heading={'Employee Grade'} />
            <DetailsDivContainer data={employee_data} />
            
            <div className={classes.table_container}>
                <div className={classes.table_container_child}>
                    <h3 className={classes.table_heading}>System Marks</h3>
                    <Spl_Grade_table />
                </div>
                <div className={classes.table_container_child}>
                    <h3 className={classes.table_heading}>FI Marks</h3>
                    <Spl_Grade_table>
                        <div className={classes.header}>
                            <span>Total</span>
                            <span>85/100</span>
                        </div>
                        <div className={classes.header}>
                            <span>Grade</span>
                            <span>A+</span>
                        </div>
                    </Spl_Grade_table>
                </div>
            </div>
        </React.Fragment>
    )
}

export default View_Grade