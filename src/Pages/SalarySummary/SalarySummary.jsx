import React from 'react'
import Heading from '../../Components/Heading/Heading'
import TileContainer from '../../UI/TileContainer/TileContainer'
import DropDownFilter from '../../Components/DropDownFilter/DropDownFilter'
import Filter from '../../Components/Filter/Filter'
import classes from './sd.module.css'
// Data for Table
import Data from './data'
import MainTable from '../../Components/MainTable/MainTable'

const SalarySummary = () => {

  // Here is our data for tile in the page
  const TileData = [
    {
      title: 'Total Expense',
      value: '₹5000',
      num: 15
    },
    {
      title: 'Pending Approvals',
      value: 42,
      num: 23
    },
    {
      title: 'On Leave',
      value: 50,
      num: 10
    },
    {
      title: 'Out From Store',
      value: 104,
      num: -23
    }
  ]

  // Table Headings, Data and Keys
  const tableHeadings=[
    {heading:'Employee Name'},
    {heading:'Employee ID'},
    {heading:'UAN no.'},
    {heading:'EPF no.'},
    {heading:'Father Name'},
    {heading:'Month Days'},
    {heading:'Working Days'},
    {heading:'Net Pay'},
    {heading:'Commission'},
    {heading:'Expanses'},
    {heading:'Tea'},
    {heading:'Gross Salary'},
    {heading:'ESIC'},
    {heading:'EPF'},
    {heading:'TDS Net Pay'},
    {heading:'Current Advance 22'},
    {heading:'Previous Advance EMI'},
    {heading:'Net Pay Salary'},
    {heading:'Net Pay Incentive'},
    {heading:'Previous Advance'},
    {heading:'CUTT/PMC From Basic'},
    {heading:'Net Advance'},
    {heading:'Total Days Paid'},
    {heading:'Gross Salary'},
    {heading:'Advance'},
    {heading:'Date of Birth'},
    {heading:'Date of Joining'},
    {heading:'ESI Insurance Number'},
    {heading:'Basic Salary'},
    {heading:'HRS/ Conv  Rate'},
    {heading:'New Gross w.e.f APR 2020'},
    {heading:'Total Days In Month'},
    {heading:'Days Wages Paid'},
    {heading:'Basic'},
    {heading:'DA_Arrear'},
    {heading:'HRA'},
    {heading:'Conv.'},
    {heading:'Incentive'},
    {heading:'Gross Salary Payable'},
    {heading:'ESI'},
    {heading:'EPF'},
    {heading:'TDS'},
    {heading:'Total'},
    {heading:'Net Wages Paid'},
    {heading:'Day of Absent'},
    {heading:'Designation'},
    {heading:'Section'},
    {heading:'Weekly Holiday'},
    {heading:'Incentive'},
    {heading:'Gross Salary Payable'},
    {heading:'Total Working Year'},
  ]

  const tableKeys = [
    'name','id','uan_no','epf_no','father_name','total_salary'
  ]

  return (
    <React.Fragment>
      <Heading heading={'Salary Summary'} />
      <TileContainer Data={TileData} />
      <DropDownFilter title1={'Floor'} title2={'Store'}  />
      <Filter data={Data} />
      <div className={classes.whole_table_c}>
      <MainTable wd={'8000px'} data={Data} height={true} Lnk={true} headings={tableHeadings} keys={tableKeys} link1={'/salary_summary_details'} link2={''} />
      </div>
    </React.Fragment>
  )
}

export default SalarySummary