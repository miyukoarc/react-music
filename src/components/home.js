import React from 'react';
// import routes from './router/router'
// import logo from './logo.svg';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
// import './App.css';

import Login from './login/index'
import Welcome from './welcome/index'

let routes = [
  {
    path: '/login',
    exact: true,
    component: Login
  },
  {
    path: '/welcome',
    component: Welcome
  }
]
class Home extends React.Component{
  render (){
    return (
      <Router>
        <div>
          <header>
            <Link to="/welcome">欢迎</Link>
            <Link to="/login">登录</Link>
          </header>       
          
              <div>
                {

                  routes.map((item,index)=>{
                  if(item.exact){
                    return (
                      <Route exact path={item.path} component={item.component} key={index} ></Route>
                    )
                  } else {
                    return (
                      <Route path={item.path} component={item.component} key={index} ></Route>
                    )
                  }
                })

                }
              </div>
        </div>
      </Router>
    )
  }
}
export default Home;
