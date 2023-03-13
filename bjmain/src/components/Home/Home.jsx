import { useState } from "react";
import { Link } from "react-router-dom";
import './Home.css'




const Home = () => {

    return (
        <div className="home_wrap">
            <h1>Welcome !</h1>
            <h2>
            <Link className="home_reg" to='/register' >Register </Link>
             or
            <Link className="home_log" to='/login'> Login </Link>
             </h2>       
             <h2>Create or join room to play . . . </h2>
                        
        </div>
    )
}

export default Home;