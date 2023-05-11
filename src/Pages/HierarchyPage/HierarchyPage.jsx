import React, { Fragment } from 'react'
import Heading from '../../Components/Heading/Heading'
import HierarchyFilter from './HierarchyFilter'
import HierarchyTable from './HierarchyTable';

import classes from './HierarchyPage.module.css'

const HierarchyPage = () => {
    return (
        <Fragment>
            <Heading heading={'Hierarchy'} />
            <HierarchyFilter />
            <div className={classes.hp_table_con}>
            <HierarchyTable />
            </div>
        </Fragment>
    )
}

export default HierarchyPage
