import React from 'react';
import { BrowserRouter as Router,Switch,Route,Redirect } from 'react-router-dom';
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

import First from './components/First.js'
import Secondary from './components/Secondary.js'
import Third from './components/Third.js'

class App extends React.Component{
  constructor(props){
    super(props)
    this.state={
      songId: '',
      keywords: '',
        current: ''
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
    getNum (id){
      this.setState({
          current: id
      },()=>{
          console.log(this.state.current)
      })
    }


  render (){
    return (
        <div >
          <Router>
            <Switch>
                <Route path="/first" render={(props)=><First {...props} putFirst={id=>this.getNum(id)}/>}/>
                <Route path="/secondary" render={(props)=><Secondary {...props} putSecondary={id=>this.getNum(id)}/>}/>
                <Route path="/third" render={(props)=><Third {...props} putThird={id=>this.getNum(id)}/>}/>
                <Redirect to="/first" />
                  {/*<Route  path="/mainPage" render={(props)=><MainPage {...props}/>}/>*/}
                  {/*<Route  path="/welcome" render={(props)=><Welcome {...props}/>}/>*/}
                  {/*<Route  path="/signIn" render={(props)=><SignIn {...props} />}/>*/}
                  {/*<Route  path="/signInPsw" render={(props)=><SignInByPsw {...props}/>}/>*/}
                  {/*<Route  path="/phoneCaptcha" render={(props)=><PhoneCaptcha {...props}/>}/>*/}
                  {/*<Route  path="/home" render={(props)=><Home {...props} getKeywords={val=>this.onGetKeyWords(val)}/>} />*/}
                  {/*<Route  path="/search" render={(props)=><Search {...props} keywords={this.state.keywords} getSongId={id=>this.onGetSongId(id)}/>}/>*/}
                  {/*<Route  path="/songDetail/:id" render={(props)=><SongDetail {...props}/>} />*/}
                  {/*<Redirect to="/mainPage"/>*/}
            </Switch>
          </Router>

          {/*<MiniPlayer songId={this.state.songId}/>*/}
        </div>

    )
  }
}
export default App;
