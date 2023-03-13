import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './Home.css'




const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const Home = () => {

    const [time, setDateState] = useState('')

    const tim = new Date();
        setInterval(() => setDateState({
            hours: tim.getHours(),
            minutes: tim.getMinutes(),
            seconds: tim.getSeconds(),
            month: monthNames[tim.getMonth()],
            day: tim.getDay()
        }), 1000);


    return (
        <div className="home_wrap">
            <h1>Welcome !</h1>
            <h2>
            <Link className="home_reg" to='/register' >Register </Link>
             or
            <Link className="home_log" to='/login'> Login </Link>
             </h2>       
             <h2>Create or join room to play . . . </h2>
             <div className="time">
                {time &&  <span>{time.hours + ' : ' + time.minutes + ' : ' + time.seconds}<h3>{time.month + ' ' + time.day}</h3></span>}
             </div>
            
        </div>
    )
}

export default Home;