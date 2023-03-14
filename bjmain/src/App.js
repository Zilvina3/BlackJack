import './App.css'
import { Routes, Route } from "react-router-dom"
import Home from './components/Home/Home';
import Layout from './components/Layout/Layout';
import Register from './components/Register/Register';


const routes = [
  {
  path : '/',
  element : <Layout children={<Home />} />
  },
  {
    path : '/home',
    element : <Layout children={<Home />} />
  },
  {
    path : '/register',
    element : <Layout children={<Register />} /> 
  },
  {
    path : '/login',
    element : <Layout children={<h1>login</h1>} /> 
  },
  {
    path : '*',
    element : <Layout children={<h1>this path does not exist</h1>} /> 
  }
]


function App() {
  return (
    <Routes>
      {routes.map((route, key) => {
        return(
          <Route key={key} path={route.path} element={route.element} /> 
        )      
      })}          
    </Routes>
);
}

export default App;
