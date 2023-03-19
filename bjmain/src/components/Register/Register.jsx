import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css'
import { reg_path } from '../../config';
import axios from 'axios';
import LoadingSpin from '../SmallComps/LoadingSpin/LoadingSpin';


const Register = () => {

    const [regErrors, setRegErrors] = useState('')
    const [message, setMessage] = useState(false);
    const [loading, setLoading] = useState(false);

    const Navigate = useNavigate();

    return (

            <main className={loading ? 'mainLoading' : null}>
                <form onSubmit={(e) => {
                    e.preventDefault();


                    if(e.target.password.value === e.target.password2.value) {
                        const newUser = {
                        userName: e.target.name.value,
                        password: e.target.password.value,
                        email: e.target.email.value,
                        psw: e.target.password.value,
                        status: 0,
                        score: 0,
                        money: 1000
                        }


                        const passSpace = newUser.password

                        if (passSpace.indexOf(' ') >= 0) {
                            setRegErrors("Password can't have spaces");
                            setMessage(false)
                            return;                           
                        }

                        setLoading(true)
                        axios.post(reg_path, newUser, {
                            headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json;charset=UTF-8",
                            }})
                        .then(function(response) {                    
                            setMessage(true)
                            setRegErrors('Account created . . .')
                            setTimeout(() => {
                            setLoading(false)                        
                            Navigate('/login')
                            }, 4000)
                            
                        }).catch(function(error) {
                            setLoading(false)
                            setMessage(false)                          
                            if(error.response.data.error.message === `Duplicate entry '${newUser.userName}' for key 'userName'`) {
                                setRegErrors('This name already exists . . .')
                                console.log(error.response.data.error) 
                            }else if (error.response.data.error.message === `Duplicate entry '${newUser.email}' for key 'email'`) {
                                setRegErrors('This email is already taken . . .')
                                console.log(error.response.data.error) 
                            }else if (error.response.data.error.message === `"userName" length must be less than or equal to 12 characters long`) {
                                setRegErrors('Name length must be less than or equal to 12 characters long')
                                console.log(error.response.data.error) 
                            }else if (error.response.data.error.message === `"userName" length must be at least 5 characters long`) {
                                setRegErrors('Name length must be at least 5 characters long')
                                console.log(error.response.data.error)                                
                            }else if (error.response.data.error.message === `"email" length must be less than or equal to 30 characters long`) {
                                setRegErrors('Email length must be less than or equal to 30 characters long')
                                console.log(error.response.data.error)                                
                            }else if (error.response.data.error.message === `"password" length must be at least 3 characters long`) {
                                setRegErrors('Password length must be at least 3 characters long')
                                console.log(error.response.data.error)                                
                            }else if (error.response.data.error.message === `"password" length must be less than or equal to 16 characters long`) {
                                setRegErrors('Password length must be less than or equal to 16 characters long')
                                console.log(error.response.data.error)                                
                            }else {
                                setRegErrors(error.response.data.error.message)
                                console.log(error.response.data.error)
                            }                        
                        })
                    }else {
                        setRegErrors('Passwords must match !')                    
                    }

                    
                    
                }}>
                    <div className="form_wrap">
                        <label htmlFor="name">Name</label>
                        <input type="text" required name='name' id='name' />  
                    </div>
                    <div className="form_wrap">
                        <label htmlFor="email">Email</label>
                        <input type="email" required name='email' id='email' />  
                    </div>
                    <div className="form_wrap">
                        <label htmlFor="password">Password</label>
                        <input type="password" required name='password' id='password'/>  
                    </div>
                    <div className="form_wrap">
                        <label htmlFor="password2">Please enter your password again</label>
                        <input type="password" required name='password2' id='password2' />  
                    </div>
                    <div className='form_wrap'>
                        <button className='form_but' type='submit'>
                            Register
                        </button>
                    </div>
                </form>
                  {regErrors && <div id={message ? 'reg_good' : 'reg_errors'}>{regErrors}</div> }
                  {loading && <LoadingSpin loadingClass={loading ? 'loadingOn' : 'loadingOff'} /> }
            </main>
)
}

export default Register;