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
import PhoneCaptcha from './components/phoneCaptcha/'
import MiniPlayer from './components/miniPlayer/'


class App extends React.Component{
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
          <Router >
            <Switch>
              <Route exact path="/mainPage" component={(props)=><MainPage {...props}/>}/>
              <Route exact path="/welcome" component={(props)=><Welcome {...props}/>}/>
              {/*<Route path="/home" component={()=>(<Home getKeywords={val=>{this.onGetKeyWords(val)}}/>)}/>} />*/}
              <Route exact path="/home" component={(props)=><Home {...props} getKeywords={val=>this.onGetKeyWords(val)}/>} />
              <Route exact path="/login" component={(props)=><Login {...props}/>}/>
              {/*<Route path="/search" render={<Search  getSongId={(id)=>this.onGetSongId(id)}/>} />*/}
              <Route exact path="/search" render={(props)=><Search {...props} keywords={this.state.keywords} getSongId={id=>this.onGetSongId(id)}/>}/>
              <Route exact path="/signIn" component={(props)=><SignIn {...props} />}/>
              <Route exact path="/signInPsw" component={(props)=><SignInByPsw {...props}/>}/>
              <Route exact path="/phoneCaptcha" component={(props)=><PhoneCaptcha {...props}/>}/>
              <Route exact path="/songDetail/:id" component={(props)=><SongDetail {...props}/>} />
              <Redirect to="/mainPage"/>
            </Switch>
          </Router>
          <MiniPlayer songId={this.state.songId}/>
        </div>

    )
  }
}
export default App;
