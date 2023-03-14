import './NavBar.css'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import ADDRESS from '../../../config'

const links = [
    {
        path : '/home',
        name : 'Home'
    },
    {
        path : '/login',
        name : 'Login'
    },
    {
        path : '/register',
        name : 'Register'
    },
]


const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const NavBar = () => {

    const [onlineCount, setOnlineCount] = useState('');
    const [time, setDateState] = useState('')

    const tim = new Date();
        setInterval(() => setDateState({
            hours: tim.getHours(),
            minutes: tim.getMinutes(),
            seconds: tim.getSeconds(),
            month: monthNames[tim.getMonth()],
            day: tim.getDate()
        }), 5000);

    useEffect(() => {
        fetch(`http://${ADDRESS}:8080/v1/users/count`,{
    method: 'GET'
    })
    .then(res => res.json())
    .then(res => {
    setOnlineCount(res[0].count)
    })
    }, [])

    return(
        <nav>
            <h1 className='BlackJack'><Link title='Go to Home' className='BJhead' to={'/'}>BlackJack</Link> </h1>
            <div className='linkWrap'>
            {links.map((link, num) => {
                return(
                       <Link key={num} title={'Go to ' + link.name} to={link.path}>{link.name}</Link>              
                )
            })} 
            </div>         
            <div className='onlineCountWrap'>
                <span className='online'>Players online:</span>  <span className='count_num'>{onlineCount}</span>
            </div>
            <div className="time">
                {time ?  <span className='timer'><h3>{time.month + ' ' + time.day}</h3>{time.hours + ' : ' + time.minutes}</span> : 'Date'}
             </div>
        </nav>
    )
}

export default NavBar;