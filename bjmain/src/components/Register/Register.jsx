import { useState } from 'react';
import './Register.css'
import { reg_path } from '../../config';
import axios from 'axios';


const Register = () => {

    const [regErrors, setRegErrors] = useState('')
    const [message, setMessage] = useState(false);


    return (

            <main>
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

                        axios.post(reg_path, newUser, {
                            headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json;charset=UTF-8",
                            }})
                        .then(function(response) {
                            setMessage(true)
                            setRegErrors('Account created . . .')
                        }).catch(function(error) {
                            setMessage(false)
                            if(error.response.data.error.message === `Duplicate entry '${newUser.userName}' for key 'userName'`) {
                                setRegErrors('This username already exists . . .')
                                console.log(error.response.data.error) 
                            }else if (error.response.data.error.message === `Duplicate entry '${newUser.email}' for key 'email'`) {
                                setRegErrors('This email is already taken . . .')
                                console.log(error.response.data.error) 
                            }    
                            else {
                                setRegErrors(error.response.data.error.message)
                                console.log(error.response.data.error) 
                            }                        
                        })
                    }else {
                        setRegErrors('Passwords must match !')                    
                    }

                    
                    
                }}>
                    <div className="reg_wrap">
                        <label htmlFor="name">Name</label>
                        <input type="text" name='name' id='name' />  
                    </div>
                    <div className="reg_wrap">
                        <label htmlFor="email">Email</label>
                        <input type="email" name='email' id='email' />  
                    </div>
                    <div className="reg_wrap">
                        <label htmlFor="password">Password</label>
                        <input type="text" name='password' id='password'/>  
                    </div>
                    <div className="reg_wrap">
                        <label htmlFor="password2">Please enter your password again</label>
                        <input type="text" name='password2' id='password2' />  
                    </div>
                    <div className='reg_wrap'>
                        <button className='reg_but' type='submit'>
                            Register
                        </button>
                    </div>
                </form>
                  {regErrors && <div className={message ? 'reg_good' : 'reg_errors'}>{regErrors}</div> }
            </main>
)
}

export default Register;