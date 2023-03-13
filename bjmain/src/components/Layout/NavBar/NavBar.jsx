import './NavBar.css'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

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


const NavBar = () => {

    const [onlineCount, setOnlineCount] = useState(0);

    useEffect(() => {
        fetch('http://localhost:8080/v1/users/count',{
    method: 'GET'
    })
    .then(res => res.json())
    .then(res => {
    setOnlineCount(res[0].count)
    })
    })

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
        </nav>
    )
}

export default NavBar;