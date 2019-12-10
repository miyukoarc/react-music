import React from 'react';
// import logo from './logo.svg';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import routes from './router/router'
import './App.css';

// import Login from './components/login/index'
// import Welcome from './components/welcome/index'

class App extends React.Component{
  render (){
    // debugger
    return (

      // <Router>
      //   <div>
      //   <Link to="/welcome">欢迎</Link>
      //   <Link to="/login">登录</Link>
      //   <div>
      //     {console.log(<Route path="/welcome" component={Welcome} />)}
          
      //     <Route path="/login" component={Login}/>
      //   </div>
      // </div>
      // </Router>
      
      <Router>
        <div>
              <div>
                <Switch>
                {
                  routes.map((item,index)=>{
                  if(item.exact===true){
                    return (
                          <Route exact path={item.path} component={item.component} key={index} ></Route>
                    )
                  } else {
                    return (<Route path={item.path} component={item.component} key={index} ></Route>)
                  }
                  console.log(item)
                })
                }
                </Switch>

              </div>
              
        </div>
      </Router>        
        
    )
  }
}
export default App;
