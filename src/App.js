import React from 'react';
import Home from './components/home'
// import routes from './router/router'
// import logo from './logo.svg';
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
// import './App.css';

// import Login from './components/login/index'
// import Welcome from './components/welcome/index'

// let routes = [
//   {
//     path: '/login',
//     exact: true,
//     component: Login
//   },
//   {
//     path: '/welcome',
//     component: Welcome
//   }
// ]
class App extends React.Component{
  render (){
    return (<Home></Home>)
  }
}
export default App;
