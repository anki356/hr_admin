import React, { useEffect, useState } from 'react'
import BottomButtonContainer from '../../../Components/BottomButtonContainer/BottomButtonContainer'
import Heading from '../../../Components/Heading/Heading'
import LabeledInput from '../../../Components/LabeledInput/LabeledInput'
import classes from './EditRoles.module.css'
import axios from 'axios'
import Cookies from 'universal-cookie'
import { useNavigate, useParams } from 'react-router-dom'
const EditRoles = () => {
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
    const { id } = useParams()
    useEffect(() => {
        const headers = { "Authorization": "Bearer " + token }
        axios.get(url + "api/getRoleData?id=" + id, { headers }).then((response) => {
            setFloorName(response.data[0].floor_name)
            setStoreName(response.data[0].store_name)
            setUsername(response.data[0].username)
            setRoleName(response.data[0].role_name)
        })
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
    function edit() {
        const headers = { "Authorization": "Bearer " + token }
        axios.patch(url + "api/editRole/" + id, {
            role_name: role_name,
            floor_id: floor_name,
            store_id: store_name,
            username: username,
            password: password
        }, { headers }).then((response) => {
            if (response) {
                navigate(-1)
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
            <Heading heading='Edit Roles' />
            <form onSubmit={edit}>
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
                    <button type={'submit'} className={classes.accept} >Edit Role</button>
                </div>
            </form>

        </React.Fragment>
    )
}

export default EditRoles