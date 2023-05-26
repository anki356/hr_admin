import React from 'react'
import Heading from '../../../Components/Heading/Heading'
import DetailsDivContainer from '../../../UI/DetailsDivContainers/DetailsDivContainer'
import AdditionalInfoContainer from '../../../UI/AdditionalInfoContainer/AdditionalInfoContainer'
import BottomButtonContainer from '../../../Components/BottomButtonContainer/BottomButtonContainer'

// Demo Data 

const div_data = [{
    title: 'Heading 1',
    value: 'Value 1'
}]

const transfer_info = [{
    title: 'Change Floor',
    value: '1st Floor'
},
{
    title: 'Change Department',
    value: 'Men'
},
{
    title: 'Previous Department',
    value: 'Women'
},
{
    title: 'Change Store',
    value: '1st Store'
}]

const Emp_Transfer = () => {

    return (
        <React.Fragment>
            <Heading heading={'Employee Transfer'} />
            <DetailsDivContainer data={div_data} />
            <div className='uni_container'>
                <h3 className='uni_heading'>Transfer Information</h3>
                <AdditionalInfoContainer data={transfer_info}/>
            </div>
            <BottomButtonContainer cancel={'Reject'} approve={'Approve Transfer'} func={true} cancelRequests={() => { }} func2={() => { }} />
        </React.Fragment>
    )
}

export default Emp_Transfer