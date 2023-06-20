import React, { useEffect, useState } from 'react'
import BottomButtonContainer from '../../../Components/BottomButtonContainer/BottomButtonContainer'
import Heading from '../../../Components/Heading/Heading'
import LabeledInput from '../../../Components/LabeledInput/LabeledInput'
import classes from './AddRoles.module.css'
import axios from 'axios'
import Cookies from 'universal-cookie'

import { useNavigate, useParams } from 'react-router-dom'
import SwitchButton from '../../../Components/SwitchButton/SwitchButton'
const AddRoles = () => {
    const [role_name, setRoleName] = useState(null)
    const [floor_name, setFloorName] = useState(null)
    const [store_name, setStoreName] = useState(null)
    const [password, setPassword] = useState(null)
    const [username, setUsername] = useState(null)
    const [floorOptions, setFloorOptions] = useState([])
    const [storesOptions, setStoreOptions] = useState([])
    const url = "http://localhost:9000/"
    const cookies = new Cookies();
    const token = cookies.get('token')
    const navigate = useNavigate()
    useEffect(() => {
        const headers = { "Authorization": "Bearer " + token }
        axios.get(url + "api/getFloors", { headers }).then((response) => {
            setFloorOptions(response.data)
        })
        axios.get(url + "api/getStores", { headers }).then((response) => {
            setStoreOptions(response.data)
        })
    }, [])
    const inputs = [
        {
            title: 'Role',
            id: 'role',
            ph: '',
            value: role_name,
            func: setRoleName,
            required: true
        },
        {
            title: 'Password',
            id: 'password',
            ph: '',
            value: password,
            func: setPassword,
            required: false
        },
        {
            title: 'Username',
            id: 'username',
            ph: '',
            value: username,
            func: setUsername,
            required: false
        },

    ]
    function add(e) {
        const headers = { "Authorization": "Bearer " + token }
        e.preventDefault()
        axios.post(url + "api/addRole", {
            role_name: role_name,
            floor_id: floor_name,
            store_id: store_name,
        }, { headers }).then((response) => {
            if (response) {
                if (username !== undefined && username !== null && username !== '' && password !== undefined && password !== null && password !== '') {

                    axios.post(url + "api/auth/register", {
                        role: role_name,
                        username: username,
                        password: password
                    }, { headers }).then((responseOne) => {
                        if (responseOne) {
                            navigate(-1)
                        }
                    })
                }
            }
        })
    }
    console.log(store_name)
    console.log(floor_name)
    function cancel() {
        navigate(-1)
    }
    return (
        <React.Fragment>
            <Heading heading='Add Role' />
            <form onSubmit={add}>
                <div className={classes.container}>
                    {inputs.map((element, index) => (
                        <LabeledInput required={element.required} title={element.title} value={element.value} key={index} ph={element.ph} id={element.id} cls={true} img={false} func2={(data) => element.func(data)} />
                    ))}
                    <div className={classes.store_div}>
                        <label htmlFor='floor'>Floor</label>
                        <select name="floor" onChange={(e) => setFloorName(e.target.value)} id="floor">
                            {floorOptions.map((val, index) => (
                                <option key={index} selected={floor_name === val.id} value={val.id}>{val.name}</option>
                            ))}

                        </select>
                    </div>
                    <div className={classes.store_div}>
                        <label htmlFor='Store'>Store</label>
                        <select name="Store" onChange={(e) => setStoreName(e.target.value)} id="Store">
                            {storesOptions.map((val, index) => (
                                <option key={index} selected={store_name === val.id} value={val.id}>{val.name}</option>
                            ))}

                        </select>
                    </div>
                </div>
                <div className={classes.switch_container}>
                    <h2>Permissions</h2>
                    <SwitchButton label={'Attendance'} />
                    <SwitchButton label={'Timming Approval'} />
                    <SwitchButton label={'Interview'} />
                    <SwitchButton label={'Employee Detail'} />
                    <SwitchButton label={'Salary'} />
                    <SwitchButton label={'Fine Management'} />
                </div>
                <div className={classes.btn_container}>
                    <button className={classes.cancel} onClick={(event) => cancel(event)}>Cancel</button>
                    <button type={'submit'} className={classes.accept} >Add Role</button>
                </div>
            </form>

        </React.Fragment>
    )
}

export default AddRoles