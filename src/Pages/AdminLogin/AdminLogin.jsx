import React, { useState } from 'react'
import classes from './AdminLogin.module.css'
import Logo from '../../assets/logo.png'
import eye_img from '../../assets/eye.png'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const AdminLogin = () => {
    
    const [viewPassword, setViewPassword] = useState(false)
    const navigate = useNavigate()
    // UserName validation
    const [enteredUsername, setEnteredUsername] = useState('')
    const [enteredUsernameTouched, setEnteredUsernameTocuhed] = useState(false)
    const changeUsernameHandler = (e) => {
        setEnteredUsername(e.target.value)
    }
    const usernameBlurHandler = (e) => {
        setEnteredUsernameTocuhed(true)
    }
    const enteredUsernameIsValid = enteredUsername.trim() !== '';
    const UserNameInputIsInValid = !enteredUsernameIsValid && enteredUsernameTouched;

    // Password Validation

    const [enteredPassoword, setEnteredPassword] = useState('');
    const [passowordTouched, setPasswordTouched] = useState(false);
    const changePasswordHandler = (e) => {
        setEnteredPassword(e.target.value)
    }
    const passwordBlurHandler = (e) => {
        setPasswordTouched(true)
    }
    const enteredPasswordIsValid = enteredPassoword.trim() !== '';
    const PasswordInputIsInValid = !enteredPasswordIsValid && passowordTouched;


    // On Form Submission

    const isformValid = !UserNameInputIsInValid && !PasswordInputIsInValid

    const formSubmissionHandler = (e) => {
        e.preventDefault();

        axios.post('http://127.0.0.1:3000/api/auth/login', {
            username: enteredUsername,
            password: enteredPassoword
        }).then((response) => {
            console.log(response.data)
            localStorage.setItem("token", response.data.token)
            if (response.data.token) {
                alert('Welcome Sir')
                setTimeout(() => {
                    navigate('/')
                }, 500);
            }
        })

        //  Reset All States
        setEnteredUsername('')
        setEnteredPassword('')
        setEnteredUsernameTocuhed(false)
        setPasswordTouched(false)

    }


    return (
        <div className={classes.container}>
            <div className={classes.first_div}>
                <img src={Logo} alt="" />
            </div>
            <form className={classes.form} onSubmit={formSubmissionHandler}>
                <div className={classes.input_div}>
                    <label htmlFor="username">Username</label>
                    <input className={UserNameInputIsInValid === true ? classes.invalid : ''} id='username' type="text" value={enteredUsername} onChange={changeUsernameHandler} onBlur={usernameBlurHandler} />
                    {<p className={`${classes.alert} ${UserNameInputIsInValid === true ? classes.invalid_p : ''}`}>Enter correct details!</p>}
                </div>
                <div className={classes.input_div}>
                    <label htmlFor="password">Password</label>
                    <input id='password' type={viewPassword === true ? "text" : "password"} className={PasswordInputIsInValid === true ? classes.invalid : ''} value={enteredPassoword} onChange={changePasswordHandler} onBlur={passwordBlurHandler} />
                    {<p className={`${classes.alert} ${PasswordInputIsInValid === true ? classes.invalid_p : ''}`}>Enter correct details!</p>}
                    <img className={classes.eye} src={eye_img} onClick={() => setViewPassword(!viewPassword)} alt="" />
                </div>
                <button type='submit' disabled={!isformValid} className={classes.login_btn}>Login</button>
            </form>
        </div>
    )
}

export default AdminLogin