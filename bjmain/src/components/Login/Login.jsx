import { useState } from 'react'
import { log_path } from '../../config';
import { useNavigate } from 'react-router-dom';
import LoadingSpin from '../SmallComps/LoadingSpin/LoadingSpin';
import axios from 'axios';
import './Login.css'



const Login = () => {

    const [logMessage, setLogMessage] = useState(false)
    const [error ,setError] = useState(false)
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate();

    return(
        <div>
        <main>
        <h1 className='form_header'>Login</h1>
            <form onSubmit={(e) => {
                e.preventDefault()
                console.log('log in')

                const logIn = {
                    email : e.target.email.value,
                    password: e.target.password.value
                }



                axios.post(log_path, logIn, {
                    headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    }})
                    .then((response) =>  {
                        localStorage.setItem('token', response.data.token)
                        const data = JSON.stringify(response.data)
                        localStorage.setItem('user', data);    
                        setLogMessage('Logged in successfully . . .')
                        setError(false)
                        setLoading(true)
                        setTimeout(() => {
                            navigate('/rooms')
                        }, 2000)
                    })
                    .catch((error) => {
                        console.log(error.response.data)
                        setLogMessage(error.response.data.loginError)
                        setError(true)
                        setLoading(false)
                    })
            }}>
                <div className='form_wrap'>
                    <label htmlFor="email">Email</label>
                    <input type="email" required name="email" id="email" />
                </div>
                <div className='form_wrap'>
                    <label htmlFor="password">Password</label>
                    <input type="password" required name="password" id="password" />
                </div>
                <div className='form_wrap'>
                    <button type='submit' className='form_but'>Log in</button>
                </div>
            </form>
               {loading && <LoadingSpin loadingClass={loading ? 'loadingOn' : 'loadingOff'} /> }
        </main>
        {logMessage && <div id={error ? 'logError' : 'logGood'}>{logMessage}</div> }
        </div>
    )
}

export default Login;