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
import MiniPlayer from './components/miniPlayer/'
import {withRouter} from "react-router";

class App extends React.Component{

  // static propTypes = {
  //     cookies: instanceOf(Cookies).isRequired
  // };
  constructor(props){
    super(props)
    this.state={
      songId: '',
      keywords: '',
    }
  }
  onGetSongId (id){
    this.setState({
      songId: id,
    },()=>{
      console.log(this.state.songId)
    })
  }
  onGetKeyWords (val){
    this.setState({
      keywords: val
    },()=>{
      console.log(this.state.keywords)
    })
  }


  render (){
    return (
        <div>
          <Router>
            <Switch>
              <Route path="/mainPage" component={MainPage}/>
              <Route path="/welcome" component={Welcome} />
              {/*<Route path="/home" component={()=>(<Home getKeywords={val=>{this.onGetKeyWords(val)}}/>)}/>} />*/}
              <Route path="/home" render={(props)=><Home {...props} getKeywords={val=>this.onGetKeyWords(val)}/>} />
              <Route path="/login" component={Login} />
              {/*<Route path="/search" render={<Search  getSongId={(id)=>this.onGetSongId(id)}/>} />*/}
              <Route path="/search" render={(props)=><Search {...props} keywords={this.state.keywords} getSongId={id=>this.onGetSongId(id)}/>}/>
              <Route path="/signIn" component={SignIn}/>
              <Route path="/signInPsw" component={SignInByPsw}/>
              <Route path="/phoneCaptcha" component={phoneCaptcha}/>
              <Route path="/songDetail/:id" component={SongDetail} />
              <Redirect to="/mainPage"/>
            </Switch>
          </Router>
          <MiniPlayer songId={this.state.songId}/>

        </div>

    )
  }
}
export default App;
