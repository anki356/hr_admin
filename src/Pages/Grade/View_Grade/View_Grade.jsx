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
                    <h3 className={classes.table_heading}>Some Random Handing</h3>
                    <Spl_Grade_table />
                </div>
                <div className={classes.table_container_child}>
                    <h3 className={classes.table_heading}>Some Random Handing</h3>
                    <Spl_Grade_table />
                </div>
            </div>
        </React.Fragment>
    )
}

export default View_Grade