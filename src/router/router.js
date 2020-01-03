import Login from '../components/login/index'
import Welcome from '../components/login/index'
import {Redirect, Route, Switch} from "react-router";
import MainPage from "../components/mainPage";
import Home from "../components/main";
import Search from "../components/search";
import SignIn from "../components/signIn";
import SignInByPsw from "../components/signInPassword";
import phoneCaptcha from "../components/phoneCaptcha";
import SongDetail from "../components/songDetail";
import {BrowserRouter as Router} from "react-router-dom";
import React from "react";
import {withRouter} from "react-router";


class Routers extends React.Component{
    constructor (props){
        super(props)
        this.state={
            songId: '',
            keywords: ''
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
            </div>

        )
    }
}
export default withRouter(Routers)
