import React from 'react';
import { BrowserRouter as Router,Switch,Route,Link,Redirect,useParams } from 'react-router-dom';
import Welcome from './components/welcome'
import Search from './components/search'
import SongDetail from './components/songDetail'
import Home from './components/main'
import Login from './components/login'
import MainPage from './components/mainPage/'
import SignIn from './components/signIn/'
import SignInByPsw from './components/signInPassword/'
import phoneCaptcha from './components/phoneCaptcha/'

class App extends React.Component{
  render (){
    return (
      <Router>
        <Switch>
        <Route path="/mainPage" component={MainPage}/>
          <Route path="/welcome" component={Welcome} />
          <Route path="/home" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/search" component={Search} />
          <Route path="/signIn" component={SignIn}/>
          <Route path="/signInPsw" component={SignInByPsw}/>
          <Route path="/phoneCaptcha" component={phoneCaptcha}/>
          
         
          <Route path="/songDetail/:id" component={SongDetail} />
          {/* <Redirect to="/mainPage"/> */}
        </Switch>
      </Router>
    )
  }
}
export default App;
