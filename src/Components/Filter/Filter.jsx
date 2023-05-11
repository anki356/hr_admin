import classes from './Filter.module.css'
import mag from '../../assets/search2.png'
import vec from '../../assets/vector9.png'
import { useState } from 'react'
import MainTable from '../MainTable/MainTable'
const Filter = (props) => {

  const [View, setView] = useState(false)

  const tableData = props.data.map((element) => (
    {
      name: element.name,
      id: element.id,
      image: element.image
    }
  ))

  const tableHeadings = [
    { heading: 'Employee Name' },
    { heading: 'Emp ID' }
  ]

  const [state, setstate] = useState('')

  const handleChange = (e) => {
    setView(true)
    const results = tableData.filter(post => {
      if (e.target.value === " ") return tableData
      return post.name.toLowerCase().includes(e.target.value.toLowerCase())
    })
    setstate({
      query: e.target.value,
      list: results
    })
  }


  function CancelView() {
    setTimeout(() => {
      setView(false)
    }, 1000);
  }

  return (

    <div className={classes.filter_box}>
      <form  className={classes.input_div}>
        <label htmlFor="Employees">Employees</label>
        <input value={state.query} onChange={handleChange} type="text" id='Employees' placeholder='Emp ID , Employee Name..' />
        <img className={classes.img1} src={mag} alt="" />
        <div className={`${classes.search_table} ${View === true ? classes.visible : ''}`}>
          <MainTable Inp={false} Btn={false} headings={tableHeadings} data={state.list === undefined ? tableData : state.list} keys={['name', 'id']} />
        </div>
      </form>

      <div className={classes.input_div}>
        <label htmlFor="Designation">Designation</label>
        <select id="Designation">
          <option defaultValue>Select one</option>
          <option value="1">New Delhi</option>
          <option value="2">Istanbul</option>
          <option value="3">Jakarta</option>
        </select>
        <img src={vec} className={classes.img2} alt="" />
      </div>


      <div className={classes.input_div} style={{ marginRight: '0' }}>
        <label htmlFor="date">Date</label>
        <input id='date' type="date" />
        <img src={vec} className={classes.img2} alt="" />
      </div>


    </div>
  )
}

export default Filter