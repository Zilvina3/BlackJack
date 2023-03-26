import './App.css'
import { Routes, Route } from "react-router-dom"
import Home from './components/Home/Home';
import Layout from './components/Layout/Layout';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Rooms from './components/Rooms/Rooms';






// {
//   path : '/rooms',
//   element : <Layout children={<Rooms />} /> 
// },


function App() {

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
        path : '/rooms',
        element : <Layout children={<Rooms />} /> 
      },
      {
        path : '/login',
        element : <Layout children={<Login />} /> 
      },
      {
        path : '*',
        element : <Layout children={<h1>this path does not exist</h1>} /> 
      }
  ]


  return (
    <Routes>
      {routes.map((route, key) => {
        return(
          <Route key={key}
          path={route.path}
          element={route.element}
           /> 
        )      
      })}          
    </Routes>
);
}

export default App;
