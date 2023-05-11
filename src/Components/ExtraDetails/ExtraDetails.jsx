import classes from './ExtraDetails.module.css'
import ExtraDetailsDiv from './ExtraDetailsDiv'

const ExtraDetails = (props) => {

  const div_data = [
    {
      title: 'Category',
      value: 'Lunch'
    },
    {
      title: 'Time',
      value: '01:00 PM'
    },
    {
      title: 'Date',
      value: '15/08/22'
    },
    {
      title: 'Expense',
      value: '₹50'
    }
  ]
  return (
    <div className={`uni_container ${classes.container}`}>
      <h3 className='uni_heading'>{props.heading? props.heading:'Expense Details'}</h3>
      <div className={classes.inner_container}>
        <div className={classes.inner_container_first}>
          {div_data.map((element, index) => (
          <ExtraDetailsDiv title={element.title} value={element.value} index={index} />
          ))}
        </div>
        <div className={classes.inner_container_second}>
          <h5 style={{marginTop:'20px',fontSize:'16px'}}>Reasons & Remarks</h5>
          <div>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore excepturi, porro nobis similique amet tenetur? Quod dolore, itaque deleniti ut ratione obcaecati ex quia necessitatibus explicabo nisi atque delectus possimus voluptas rem fugit error eum?
          </div>
        </div>
        {props.status &&
        <div className={classes.inner_container_third}>
          Status : <span>{props.status}</span>
        </div>
}
      </div>
    </div>
  )
}

export default ExtraDetails