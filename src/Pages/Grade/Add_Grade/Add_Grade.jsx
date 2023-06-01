import React from 'react'
import Heading from '../../../Components/Heading/Heading'
import ExpenseSearchBar from '../../../Components/ExpenseSearchBar/ExpenseSearchBar'
import DetailsDivContainer from '../../../UI/DetailsDivContainers/DetailsDivContainer'
import GradeRangeSlider from '../../../Components/GradeRangeSlider/GradeRangeSlider'
import BottomButtonContainer from '../../../Components/BottomButtonContainer/BottomButtonContainer'

const data = [
    {title:'Name',
value:'Puneet shrivastav'}
]

const Add_Grade = () => {
  return (
    <React.Fragment>
        <Heading heading={'Add Grade'} />
        <ExpenseSearchBar />
        <DetailsDivContainer data={data} />
        <GradeRangeSlider label={'Behaviour With Customer'} />
        <GradeRangeSlider label={'Behaviour With Staff/Head'} />
        <GradeRangeSlider label={'Counter Clearnace'} />
        <br />
        <BottomButtonContainer cancel={'Cancel'} approve={'Save'}  />
    </React.Fragment>
  )
}

export default Add_Grade
