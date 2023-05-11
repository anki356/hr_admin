import LabeledInput from '../LabeledInput/LabeledInput'
import classes from './LabeledInputContainer.module.css'

const LabeledInputContainer = () => {
  return (
    <div className='uni_container'>
        <h3 className='uni_heading'>Timing and Date Correction</h3>
        <div className={classes.input_container}>
            <LabeledInput img={false} title={'Time'} type={'time'} id={'time'} />
            <LabeledInput img={false} title={'Date'} type={'date'} id={'date'} />
        </div>
    </div>
  )
}

export default LabeledInputContainer