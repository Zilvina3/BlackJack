import './NavBar.css'
import { Link } from 'react-router-dom'

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
        </nav>
    )
}

export default NavBar;