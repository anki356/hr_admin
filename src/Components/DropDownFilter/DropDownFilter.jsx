import SelectTag from '../SelectTag/SelectTag'
import classes from './DropDownFilter.module.css'
import Img from '../../assets/shop.png'
import { Link } from 'react-router-dom'
import useHttp from '../../Hooks/use-http'
import { useEffect, useState } from 'react'

const DropDownFilter = (props) => {

  // These for fetching data from api
  const [stores, setStores] = useState([])
  const [floors, setFloors] = useState([])

  // These for selected value from select tag
  const [selectedFloor, setSelectedFloor] = useState('')
  const [selectedStore, setSelectedStore] = useState('')

  const sumUp = {
    store: selectedStore,
    floor: selectedFloor
  }

  // Used for making an object
  console.log(sumUp);


  const { sendRequest: fetchStores } = useHttp()
  const { sendRequest: fetchFloors } = useHttp()


  useEffect(() => {
    const listStores = (stores) => {
      setStores(stores)
    }
    const listFloors = (floors) => {
      setFloors(floors)
    }
    fetchStores({ url: 'http://localhost:4000/api/getStores' }, listStores)
    fetchFloors({ url: 'http://localhost:4000/api/getFloors' }, listFloors)
  }, [])

  return (
    <div style={props.mb ? { marginBottom: '0px' } : {}} className={classes.DropDownFilter}>
      <div className={classes.DropDownFilter_left}>
        <SelectTag data={floors} title={props.title1} selectedVal={setSelectedFloor} img={Img} />
        <SelectTag data={stores} selectedVal={setSelectedStore} title={props.title2} img={Img} />
      </div>

      {
        props.Btn ?
          <div className={classes.DropDownFilter_right}>
            <Link to={props.Lnk ? props.Lnk : '/'} className={classes.DropDownFilter_Btn}>{props.Btn}</Link>
          </div> :
          ''
      }
      {
        props.d3 &&
        <SelectTag title={props.title3} img={Img} />
      }
      
    </div>
  )
}

export default DropDownFilter