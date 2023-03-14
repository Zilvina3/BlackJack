import { useState } from 'react';
import './Register.css'

const Register = () => {

    const [regErrors, setRegErrors] = useState('')


    return (

            <main>
                <form onSubmit={(e) => {
                    e.preventDefault();


                    if(e.target.password.value === e.target.password2.value) {
                        const newUser = {
                        userName: e.target.name.value,
                        password: e.target.password.value
                        }
                        setRegErrors('Account created . . .')
                        console.log(newUser)
                    }else {
                        setRegErrors('Passwords must match !')
                    }

                    
                    
                }}>
                    <div className="reg_wrap">
                        <label htmlFor="name">Name</label>
                        <input type="text" name='name' id='name' />  
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
                  {regErrors && <div className='reg_errors'>{regErrors}</div> }
            </main>
)
}

export default Register;